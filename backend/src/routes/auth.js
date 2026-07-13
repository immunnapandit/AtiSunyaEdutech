import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { env } from "../config/env.js";
import { readDb, writeDb } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { sendPasswordResetEmail } from "../services/notification-service.js";
import { forgotPasswordSchema, loginSchema, signupSchema, validate } from "../utils/validation.js";

export const authRouter = express.Router();

authRouter.post("/signup", validate.bind(null, signupSchema), async (req, res) => {
  const db = await readDb();
  const existingUser = db.users.find((user) => user.email === req.body.email);

  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = {
    id: nanoid(),
    name: req.body.name,
    email: req.body.email,
    passwordHash,
    role: "student",
    createdAt: new Date().toISOString(),
    enrollments: [
      { courseSlug: "full-stack-react-nextjs", progress: 68 },
      { courseSlug: "product-design-systems", progress: 32 }
    ],
    certificates: ["cloud-architecture-aws", "brand-and-visual-identity"]
  };

  db.users.push(user);
  await writeDb(db);

  const token = signToken(user);
  return res.status(201).json({ token, user: publicUser(user) });
});

authRouter.post("/login", validate.bind(null, loginSchema), async (req, res) => {
  const db = await readDb();
  const user = db.users.find((item) => item.email === req.body.email);
  const isValid = user ? await bcrypt.compare(req.body.password, user.passwordHash) : false;

  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = signToken(user);
  return res.json({ token, user: publicUser(user) });
});

authRouter.post("/forgot-password", validate.bind(null, forgotPasswordSchema), async (req, res) => {
  const db = await readDb();
  const resetRequest = {
    id: nanoid(),
    email: req.body.email,
    token: nanoid(32),
    createdAt: new Date().toISOString()
  };

  db.resetRequests.push(resetRequest);
  await writeDb(db);
  const notification = await sendPasswordResetEmail({
    email: req.body.email,
    resetToken: resetRequest.token
  });

  return res.json({
    message: "If the email exists, a reset link will be sent shortly.",
    resetToken: env.nodeEnv === "production" ? undefined : resetRequest.token,
    notification: env.nodeEnv === "production" ? undefined : notification
  });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const db = await readDb();
  const user = db.users.find((item) => item.id === req.user.sub);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.json({ user: publicUser(user) });
});

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: "7d" }
  );
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}
