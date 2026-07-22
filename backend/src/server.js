import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env, validateEnv } from "./config/env.js";
import { connectMongo, disconnectMongo } from "./mongo.js";
import { seedIfEmpty } from "./data/seed-mongo.js";
import { adminRouter } from "./routes/admin.js";
import { authRouter } from "./routes/auth.js";
import { contentRouter } from "./routes/content.js";
import { coursesRouter } from "./routes/courses.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { formsRouter } from "./routes/forms.js";

validateEnv();
await connectMongo();
await seedIfEmpty();

const app = express();

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || env.clientOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "atisunya-edutech-backend" });
});

app.use("/api/auth", authRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/admin", adminRouter);
app.use("/api", contentRouter);
app.use("/api", formsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const httpServer = app.listen(env.port, () => {
  console.log(`AtiSunya backend running on http://localhost:${env.port}`);
});

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`[server] ${signal} received, shutting down gracefully...`);
  httpServer.close(async () => {
    await disconnectMongo();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
