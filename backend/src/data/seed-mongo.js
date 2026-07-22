import path from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  Category,
  Contact,
  Faq,
  Instructor,
  Newsletter,
  Quote,
  Testimonial,
  User
} from "../models/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentSeedPath = path.join(__dirname, "content-seed.json");
const legacyDbPath = path.resolve(__dirname, "../../data/db.json");

export async function seedIfEmpty() {
  const raw = await fs.readFile(contentSeedPath, "utf8");
  const seed = JSON.parse(raw);

  const inserted = [];

  if ((await Category.countDocuments()) === 0) {
    await Category.insertMany(seed.categories);
    inserted.push(`categories(${seed.categories.length})`);
  }

  if ((await Instructor.countDocuments()) === 0 && seed.instructors.length > 0) {
    await Instructor.insertMany(seed.instructors);
    inserted.push(`instructors(${seed.instructors.length})`);
  }

  if ((await Faq.countDocuments()) === 0 && seed.faqs.length > 0) {
    await Faq.insertMany(seed.faqs.map((faq, order) => ({ ...faq, order })));
    inserted.push(`faqs(${seed.faqs.length})`);
  }

  if ((await Testimonial.countDocuments()) === 0 && seed.testimonials.length > 0) {
    await Testimonial.insertMany(seed.testimonials);
    inserted.push(`testimonials(${seed.testimonials.length})`);
  }

  const migrated = await migrateLegacyJson();

  if (inserted.length > 0 || migrated.length > 0) {
    console.log(`[seed] Seeded: ${[...inserted, ...migrated].join(", ") || "nothing"}`);
  }
}

async function migrateLegacyJson() {
  let legacy;
  try {
    legacy = JSON.parse(await fs.readFile(legacyDbPath, "utf8"));
  } catch {
    return [];
  }

  const migrated = [];

  if ((await User.countDocuments()) === 0 && legacy.users?.length > 0) {
    await User.insertMany(
      legacy.users.map((user) => ({
        name: user.name,
        email: user.email || undefined,
        phone: user.phone || undefined,
        passwordHash: user.passwordHash || undefined,
        provider: user.provider || undefined,
        providerId: user.providerId || undefined,
        role: user.role === "admin" ? "admin" : "student",
        enrollments: (user.enrollments || []).map((enrollment) => ({
          ...enrollment,
          enrolledAt: enrollment.enrolledAt ? new Date(enrollment.enrolledAt) : new Date()
        })),
        certificates: user.certificates || [],
        createdAt: user.createdAt ? new Date(user.createdAt) : new Date()
      }))
    );
    migrated.push(`users(${legacy.users.length})`);
  }

  if ((await Contact.countDocuments()) === 0 && legacy.contacts?.length > 0) {
    await Contact.insertMany(legacy.contacts);
    migrated.push(`contacts(${legacy.contacts.length})`);
  }

  if ((await Quote.countDocuments()) === 0 && legacy.quotes?.length > 0) {
    await Quote.insertMany(legacy.quotes);
    migrated.push(`quotes(${legacy.quotes.length})`);
  }

  if ((await Newsletter.countDocuments()) === 0 && legacy.newsletter?.length > 0) {
    await Newsletter.insertMany(legacy.newsletter.filter((entry) => entry.email));
    migrated.push(`newsletter(${legacy.newsletter.length})`);
  }

  return migrated;
}
