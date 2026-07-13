import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { nanoid } from "nanoid";
import { categories, courses } from "./data/seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../data");
const dbPath = path.join(dataDir, "db.json");

const initialDb = {
  courses,
  categories,
  users: [],
  contacts: [],
  quotes: [],
  newsletter: [],
  resetRequests: []
};

export async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw);
}

export async function writeDb(db) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  return db;
}

export async function insert(collection, payload) {
  const db = await readDb();
  const record = {
    id: nanoid(),
    ...payload,
    createdAt: new Date().toISOString()
  };
  db[collection].push(record);
  await writeDb(db);
  return record;
}

export async function updateById(collection, id, payload) {
  const db = await readDb();
  const index = db[collection].findIndex((record) => record.id === id);

  if (index === -1) {
    return null;
  }

  db[collection][index] = {
    ...db[collection][index],
    ...payload,
    updatedAt: new Date().toISOString()
  };
  await writeDb(db);

  return db[collection][index];
}

async function ensureDb() {
  try {
    await fs.access(dbPath);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(initialDb, null, 2));
  }
}
