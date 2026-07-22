import mongoose from "mongoose";
import path from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import { env } from "./config/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localDbPath = path.resolve(__dirname, "../data/mongo");

let memoryServer = null;

export async function connectMongo() {
  let uri = env.mongodbUri;

  if (!uri) {
    if (env.nodeEnv === "production") {
      throw new Error("MONGODB_URI is required in production.");
    }

    console.warn(
      "[mongo] MONGODB_URI not set - starting a local dev MongoDB (data persists in backend/data/mongo). " +
        "Add your Atlas connection string to backend/.env for real deployments."
    );
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    await fs.mkdir(localDbPath, { recursive: true });
    memoryServer = await MongoMemoryServer.create({
      instance: { dbPath: localDbPath, storageEngine: "wiredTiger" }
    });
    uri = `${memoryServer.getUri()}atisunya`;
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log(`[mongo] Connected (${memoryServer ? "local dev instance" : "external cluster"})`);
}

export async function disconnectMongo() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
}
