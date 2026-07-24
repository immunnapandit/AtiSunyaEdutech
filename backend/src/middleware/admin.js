import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Admin authentication is required." });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);

    if (payload.scope !== "admin-panel") {
      return res.status(403).json({ message: "Admin access is required." });
    }

    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired admin session." });
  }
}
