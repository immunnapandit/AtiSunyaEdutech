import PDFDocument from "pdfkit";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.join(__dirname, "..", "assets", "atisunya-logo.png");

const BRAND_COLOR = "#0A165E";
const ACCENT_COLOR = "#3b5bfd";
const TEXT_COLOR = "#1f2937";
const MUTED_COLOR = "#6b7280";

export function generateCoursePlanPdf(course, res) {
  const doc = buildCoursePlanDoc(course);
  doc.pipe(res);
  doc.end();
}

export function generateCoursePlanPdfBuffer(course) {
  return new Promise((resolve, reject) => {
    const doc = buildCoursePlanDoc(course);
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.end();
  });
}

function buildCoursePlanDoc(course) {
  const doc = new PDFDocument({ size: "A4", margin: 50, bufferPages: true });

  try {
    doc.image(LOGO_PATH, 50, 34, { width: 130 });
  } catch {
    doc.fillColor(BRAND_COLOR).fontSize(18).font("Helvetica-Bold").text("AtiSunya Edutech", 50, 40);
  }

  doc
    .fillColor(MUTED_COLOR)
    .fontSize(10)
    .font("Helvetica")
    .text("COURSE PLAN", 0, 44, { align: "right", width: 545 });

  doc
    .moveTo(50, 95)
    .lineTo(545, 95)
    .strokeColor("#e5e7eb")
    .lineWidth(1)
    .stroke();

  doc.y = 115;
  doc.fillColor(TEXT_COLOR);

  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text(course.title, 50, doc.y, { width: 495 });

  doc.moveDown(0.5);

  const metaParts = [course.category, course.difficulty, course.duration].filter(Boolean);
  if (metaParts.length) {
    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor(MUTED_COLOR)
      .text(metaParts.join("   •   "));
  }

  if (course.description) {
    doc.moveDown(0.8);
    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor(TEXT_COLOR)
      .text(course.description, { width: 495 });
  }

  doc.moveDown(1.2);

  doc
    .fontSize(15)
    .font("Helvetica-Bold")
    .fillColor(BRAND_COLOR)
    .text("What You'll Cover");

  doc.moveDown(0.4);
  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .strokeColor(ACCENT_COLOR)
    .lineWidth(1.5)
    .stroke();

  doc.moveDown(0.8);

  const modules = (course.curriculum || []).filter((m) => m.title);

  modules.forEach((module, index) => {
    ensureSpace(doc, 60);

    doc
      .fontSize(12.5)
      .font("Helvetica-Bold")
      .fillColor(TEXT_COLOR)
      .text(`${index + 1}. ${module.title}`, 50, doc.y, { width: 495 });

    doc.moveDown(0.2);

    for (const lesson of module.lessons || []) {
      ensureSpace(doc, 20);
      doc
        .fontSize(10.5)
        .font("Helvetica")
        .fillColor(MUTED_COLOR)
        .text(`•  ${lesson}`, 64, doc.y, { width: 480 });
    }

    doc.moveDown(0.7);
  });

  addFooterToAllPages(doc);

  return doc;
}

function ensureSpace(doc, minHeight) {
  if (doc.y + minHeight > doc.page.height - 70) {
    doc.addPage();
  }
}

function addFooterToAllPages(doc) {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);

    const bottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;

    doc
      .moveTo(50, doc.page.height - 55)
      .lineTo(545, doc.page.height - 55)
      .strokeColor("#e5e7eb")
      .lineWidth(1)
      .stroke();

    doc
      .fontSize(8.5)
      .font("Helvetica")
      .fillColor(MUTED_COLOR)
      .text(
        "AtiSunya Edutech  |  info@atisunya.co  |  +91 80-8181-0673, +91 82991-56511",
        50,
        doc.page.height - 42,
        { width: 340, lineBreak: false }
      );

    doc
      .fontSize(8.5)
      .font("Helvetica")
      .fillColor(MUTED_COLOR)
      .text(`Page ${i - range.start + 1} of ${range.count}`, 0, doc.page.height - 42, {
        align: "right",
        width: 545,
        lineBreak: false,
      });

    doc.page.margins.bottom = bottomMargin;
  }
}
