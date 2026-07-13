import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "../..");
const projectRoot = path.resolve(backendRoot, "..");
const workspaceRoot = path.resolve(projectRoot, "..");

[
  path.join(workspaceRoot, ".env"),
  path.join(workspaceRoot, ".env.local"),
  path.join(projectRoot, ".env"),
  path.join(projectRoot, ".env.local"),
  path.join(backendRoot, ".env"),
  path.join(backendRoot, ".env.local")
].forEach((envPath) => dotenv.config({ path: envPath, override: true }));

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET || "local-development-secret",
  appBaseUrl: process.env.APP_BASE_URL || process.env.CLIENT_ORIGIN || "http://localhost:3000",
  graph: {
    tenantId: getEnv("GRAPH_TENANT_ID", "AZURE_TENANT_ID", "TENANT_ID"),
    clientId: getEnv("GRAPH_CLIENT_ID", "AZURE_CLIENT_ID", "CLIENT_ID"),
    clientSecret: getEnv("GRAPH_CLIENT_SECRET", "AZURE_CLIENT_SECRET", "CLIENT_SECRET"),
    fromEmail: getEnv("GRAPH_FROM_EMAIL", "FROM_EMAIL", "EMAIL"),
    adminEmail: getEnv("ADMIN_NOTIFICATION_EMAIL", "GRAPH_ADMIN_EMAIL", "GRAPH_FROM_EMAIL", "FROM_EMAIL", "EMAIL")
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET
  }
};

export function validateEnv() {
  const missingGraphKeys = [
    ["GRAPH_TENANT_ID", env.graph.tenantId],
    ["GRAPH_CLIENT_ID", env.graph.clientId],
    ["GRAPH_CLIENT_SECRET", env.graph.clientSecret],
    ["GRAPH_FROM_EMAIL", env.graph.fromEmail]
  ].filter(([, value]) => !value).map(([key]) => key);

  if (missingGraphKeys.length > 0) {
    console.warn(
      `[config] Microsoft Graph email is disabled. Missing: ${missingGraphKeys.join(", ")}`
    );
  }

  if (env.nodeEnv === "production") {
    const missingRequired = [];

    if (!process.env.JWT_SECRET) {
      missingRequired.push("JWT_SECRET");
    }

    missingRequired.push(...missingGraphKeys);

    if (missingRequired.length > 0) {
      throw new Error(`Missing production environment variables: ${missingRequired.join(", ")}`);
    }
  }
}

export function isGraphEmailConfigured() {
  return Boolean(env.graph.tenantId && env.graph.clientId && env.graph.clientSecret && env.graph.fromEmail);
}

function getEnv(...keys) {
  for (const key of keys) {
    if (process.env[key]) {
      return process.env[key];
    }
  }

  return undefined;
}
