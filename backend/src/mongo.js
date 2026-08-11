import mongoose from "mongoose";
import { env } from "./config/env.js";

let memoryServer = null;

export async function connectMongo() {
  let uri = env.mongodbUri;

  if (isPlaceholderMongoUri(uri)) {
    if (uri) {
      console.warn(
        "[mongo] Ignoring placeholder MONGODB_URI from .env. " +
          "Replace it with your real Atlas URI when you want to use MongoDB Atlas."
      );
    }
    uri = undefined;
  }

  if (!uri) {
    if (env.nodeEnv === "production") {
      throw new Error("MONGODB_URI is required in production.");
    }

    console.warn(
      "[mongo] MONGODB_URI not set - starting a temporary local dev MongoDB. " +
        "Add your Atlas connection string to backend/.env when you want persistent data."
    );
    memoryServer = await startLocalMongo();
    uri = `${memoryServer.getUri()}atisunya`;
  }

  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(uri);
  } catch (error) {
    if (error?.code === "ENOTFOUND" && uri.includes("mongodb.net")) {
      throw new Error(
        `Could not resolve MongoDB host for MONGODB_URI. Check backend/.env and replace the placeholder Atlas URI with your real connection string. Original error: ${error.message}`
      );
    }

    throw error;
  }
  console.log(`[mongo] Connected (${memoryServer ? "local dev instance" : "external cluster"})`);
}

export async function disconnectMongo() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
}

function isPlaceholderMongoUri(uri) {
  return !uri || uri.includes("user:password@cluster.mongodb.net");
}

async function startLocalMongo() {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  return MongoMemoryServer.create();
}
