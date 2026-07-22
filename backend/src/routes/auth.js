import bcrypt from "bcryptjs";
import express from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { nanoid } from "nanoid";
import { env } from "../config/env.js";
import { ResetRequest, User } from "../models/index.js";
import { requireAuth } from "../middleware/auth.js";
import { sendPasswordResetEmail } from "../services/notification-service.js";
import { forgotPasswordSchema, loginSchema, signupSchema, validate } from "../utils/validation.js";

export const authRouter = express.Router();

const googleClient = new OAuth2Client(env.googleAuth.clientId);
const microsoftJwks = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${env.microsoftAuth.tenantId}/discovery/v2.0/keys`,
  cache: true,
  rateLimit: true
});

authRouter.post("/signup", validate.bind(null, signupSchema), async (req, res) => {
  const existingUser = await findUserByIdentifier(req.body);

  if (existingUser) {
    return res.status(409).json({ message: "An account with this email or mobile number already exists." });
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email || undefined,
    phone: req.body.phone || undefined,
    passwordHash,
    role: "student"
  });

  const token = signToken(user);
  return res.status(201).json({ token, user: publicUser(user) });
});

authRouter.post("/login", validate.bind(null, loginSchema), async (req, res) => {
  const user = await findUserByIdentifier(req.body);
  const isValid = user?.passwordHash ? await bcrypt.compare(req.body.password, user.passwordHash) : false;

  if (!isValid) {
    return res.status(401).json({ message: "Invalid email, mobile number, or password." });
  }

  const token = signToken(user);
  return res.json({ token, user: publicUser(user) });
});

authRouter.post("/google", async (req, res) => {
  const { credential } = req.body || {};

  if (!env.googleAuth.clientId) {
    return res.status(500).json({ message: "Google sign-in is not configured on the server." });
  }

  if (!credential) {
    return res.status(400).json({ message: "Missing Google credential." });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.googleAuth.clientId
    });
    const payload = ticket.getPayload();

    if (!payload?.email || !payload.email_verified) {
      return res.status(400).json({ message: "Your Google account has no verified email." });
    }

    const user = await findOrCreateSocialUser({
      provider: "google",
      providerId: payload.sub,
      email: payload.email.toLowerCase(),
      name: payload.name || payload.email
    });

    const token = signToken(user);
    return res.json({ token, user: publicUser(user) });
  } catch (error) {
    console.error("Google sign-in failed:", error);
    return res.status(401).json({ message: "Google sign-in failed. Please try again." });
  }
});

authRouter.post("/microsoft", async (req, res) => {
  const { idToken } = req.body || {};

  if (!env.microsoftAuth.clientId) {
    return res.status(500).json({ message: "Microsoft sign-in is not configured on the server." });
  }

  if (!idToken) {
    return res.status(400).json({ message: "Missing Microsoft ID token." });
  }

  jwt.verify(
    idToken,
    getMicrosoftSigningKey,
    { audience: env.microsoftAuth.clientId, algorithms: ["RS256"] },
    async (error, payload) => {
      if (error) {
        console.error("Microsoft sign-in failed:", error);
        return res.status(401).json({ message: "Microsoft sign-in failed. Please try again." });
      }

      const email = payload.email || payload.preferred_username;

      if (!email) {
        return res.status(400).json({ message: "Your Microsoft account has no email available." });
      }

      try {
        const user = await findOrCreateSocialUser({
          provider: "microsoft",
          providerId: payload.oid || payload.sub,
          email: email.toLowerCase(),
          name: payload.name || email
        });

        const token = signToken(user);
        return res.json({ token, user: publicUser(user) });
      } catch (dbError) {
        console.error("Microsoft sign-in failed:", dbError);
        return res.status(500).json({ message: "Something went wrong on the server." });
      }
    }
  );
});

authRouter.post("/forgot-password", validate.bind(null, forgotPasswordSchema), async (req, res) => {
  const resetRequest = await ResetRequest.create({
    email: req.body.email || undefined,
    phone: req.body.phone || undefined,
    token: nanoid(32)
  });

  const notification = req.body.email
    ? await sendPasswordResetEmail({
        email: req.body.email,
        resetToken: resetRequest.token
      })
    : { sent: false, skipped: true, reason: "Password reset email requires an email address." };

  return res.json({
    message: "If the account exists, password reset instructions will be sent shortly.",
    resetToken: env.nodeEnv === "production" ? undefined : resetRequest.token,
    notification: env.nodeEnv === "production" ? undefined : notification
  });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.sub);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.json({ user: publicUser(user) });
});

function getMicrosoftSigningKey(header, callback) {
  microsoftJwks.getSigningKey(header.kid, (error, key) => {
    if (error) {
      return callback(error);
    }

    return callback(null, key.getPublicKey());
  });
}

async function findOrCreateSocialUser({ provider, providerId, email, name }) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (!existingUser.provider) {
      existingUser.provider = provider;
      existingUser.providerId = providerId;
      await existingUser.save();
    }

    return existingUser;
  }

  return User.create({
    name,
    email,
    provider,
    providerId,
    role: "student"
  });
}

async function findUserByIdentifier(identifier) {
  const conditions = [];

  if (identifier.email) {
    conditions.push({ email: identifier.email });
  }

  if (identifier.phone) {
    conditions.push({ phone: identifier.phone });
  }

  if (conditions.length === 0) {
    return null;
  }

  return User.findOne({ $or: conditions });
}

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email || undefined, phone: user.phone || undefined, role: user.role },
    env.jwtSecret,
    { expiresIn: "7d" }
  );
}

function publicUser(user) {
  const contact = user.email || user.phone || "";

  return {
    id: user.id,
    name: user.name,
    email: user.email || "",
    phone: user.phone || "",
    identifier: contact,
    role: user.role
  };
}
