import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.join(__dirname, "..", "assets", "atisunya-logo.png");
const SCRIPT_FONT_PATH = path.join(__dirname, "..", "assets", "fonts", "GreatVibes-Regular.ttf");

const RED_DARK = "#6f0f1c";
const RED = "#9a1b2b";
const RED_LIGHT = "#b8324a";
const GOLD_DARK = "#c99a3d";
const GOLD = "#e6bd63";
const GOLD_LIGHT = "#f6e3ae";
const CHARCOAL = "#32302c";
const MUTED = "#6b6560";
const CREAM = "#fffdf9";

export async function generateCertificatePdf(data, res) {
  const doc = await buildCertificateDoc(data);
  doc.pipe(res);
  doc.end();
}

export async function generateCertificatePdfBuffer(data) {
  const doc = await buildCertificateDoc(data);
  return new Promise((resolve, reject) => {
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    doc.end();
  });
}

async function buildCertificateDoc({
  studentName,
  courseTitle,
  certificateId,
  issuedAt,
  signatureName = "Sangeeta",
  signatureTitle = "Founder & Director",
  signatureImage = "",
  organizationName = "AtiSunya Edutech",
  verifyUrl = ""
}) {
  const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 0 });
  const { width: W, height: H } = doc.page;

  doc.registerFont("Script", SCRIPT_FONT_PATH);
  doc.rect(0, 0, W, H).fill(CREAM);

  drawRibbons(doc, W, H);
  drawSeal(doc, W * 0.815, 150);

  const xLeft = 70;

  doc.fillColor(CHARCOAL).font("Times-Bold").fontSize(38).text("CERTIFICATE", xLeft, 148);
  doc.fillColor(CHARCOAL).font("Times-Bold").fontSize(16).text("OF COMPLETION", xLeft, 191, { characterSpacing: 1.5 });

  doc.moveTo(xLeft, 222).lineTo(xLeft + 230, 222).strokeColor(RED).lineWidth(1.5).stroke();

  doc
    .fillColor(RED_DARK)
    .font("Helvetica")
    .fontSize(11.5)
    .text("This certificate is proudly presented to:", xLeft, 236);

  // GreatVibes only covers Latin script; fall back to a plain serif for names it can't render.
  const nameFont = isLatinScript(studentName) ? "Script" : "Times-BoldItalic";
  const nameSize = nameFont === "Script" ? 48 : 32;
  const nameY = nameFont === "Script" ? 256 : 268;
  doc.fillColor(CHARCOAL).font(nameFont).fontSize(nameSize).text(studentName, xLeft - 3, nameY);
  const nameWidth = Math.min(doc.widthOfString(studentName, { font: nameFont, size: nameSize }) + 20, 480);
  doc
    .moveTo(xLeft, 330)
    .lineTo(xLeft + Math.max(nameWidth, 220), 330)
    .strokeColor(RED)
    .lineWidth(1)
    .stroke();

  doc
    .fillColor(MUTED)
    .font("Helvetica")
    .fontSize(10.5)
    .text("has successfully completed the professional training course", xLeft, 348, { width: 500 });

  doc
    .fillColor(CHARCOAL)
    .font("Helvetica-Bold")
    .fontSize(14)
    .text(courseTitle, xLeft, 366, { width: 500 });

  doc
    .fillColor(MUTED)
    .font("Helvetica-Oblique")
    .fontSize(9.5)
    .text(`Issued on ${formatDate(issuedAt)} by ${organizationName}`, xLeft, 392, { width: 500 });

  // Footer: two signature-style columns (left-aligned, clear of the ribbon curl)
  const footerY = H - 128;
  const col1X = xLeft;
  const col2X = xLeft + 260;
  const colWidth = 220;

  doc.moveTo(col1X, footerY - 6).lineTo(col1X + colWidth, footerY - 6).strokeColor("#e2d9c4").lineWidth(1).stroke();
  doc.fillColor(CHARCOAL).font("Helvetica-Bold").fontSize(12).text(formatDate(issuedAt), col1X, footerY, { width: colWidth });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9.5).text("Date Issued", col1X, footerY + 18, { width: colWidth });

  if (signatureImage) {
    try {
      const imageBuffer = await fetchImageBuffer(signatureImage);
      if (imageBuffer) {
        doc.image(imageBuffer, col2X, footerY - 34, { width: 110, height: 30, fit: [110, 30] });
      }
    } catch {
      // fall back silently to printed signature name below
    }
  }

  doc.moveTo(col2X, footerY - 6).lineTo(col2X + colWidth, footerY - 6).strokeColor("#e2d9c4").lineWidth(1).stroke();
  doc.fillColor(CHARCOAL).font("Helvetica-Bold").fontSize(12).text(signatureName, col2X, footerY, { width: colWidth });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9.5).text(signatureTitle, col2X, footerY + 18, { width: colWidth });

  // Logo, QR code and certificate ID sit in the clear white strip at the very bottom
  try {
    doc.image(LOGO_PATH, xLeft, H - 74, { width: 92 });
  } catch {
    // logo asset missing — non-fatal, certificate still valid
  }

  if (verifyUrl) {
    try {
      const qrBuffer = await QRCode.toBuffer(verifyUrl, {
        margin: 0,
        width: 240,
        color: { dark: CHARCOAL, light: "#FFFFFF" }
      });
      doc.image(qrBuffer, W - 300, H - 78, { width: 54, height: 54 });
      doc.fontSize(7).font("Helvetica").fillColor(MUTED).text("Scan to verify", W - 316, H - 20, { width: 86, align: "center" });
    } catch {
      // QR generation failure should never block certificate issuance
    }
  }

  doc.fontSize(9).font("Helvetica-Bold").fillColor(RED_DARK).text(`Certificate ID: ${certificateId}`, 0, H - 40, { align: "center" });
  if (verifyUrl) {
    doc.fontSize(7.5).font("Helvetica").fillColor(MUTED).text(`Verify at ${stripProtocol(verifyUrl)}`, 0, H - 27, { align: "center" });
  }

  return doc;
}

function drawRibbons(doc, W, H) {
  doc.lineCap("butt");

  // One continuous diagonal sash: enters off-canvas top-left, arcs through the
  // top-right (where the seal sits), then sweeps down and exits off-canvas
  // bottom-right — avoids the seam a two-piece curve would leave.
  doc
    .moveTo(-60, 40)
    .bezierCurveTo(W * 0.3, -90, W * 0.62, -10, W * 0.8, 170)
    .bezierCurveTo(W * 0.92, 300, W * 1.0, 420, W + 80, H + 80)
    .lineWidth(190)
    .strokeColor(RED)
    .stroke();

  doc
    .moveTo(-60, 125)
    .bezierCurveTo(W * 0.3, -5, W * 0.62, 75, W * 0.8, 255)
    .bezierCurveTo(W * 0.92, 385, W * 1.0, 505, W + 80, H + 165)
    .lineWidth(26)
    .strokeColor(GOLD)
    .stroke();
}

function drawSeal(doc, cx, cy) {
  const outerR = 40;

  doc.circle(cx, cy, outerR).fillAndStroke(GOLD, GOLD_DARK);
  doc.circle(cx, cy, outerR - 6).lineWidth(1).strokeColor(GOLD_LIGHT).stroke();
  doc.circle(cx, cy, outerR - 12).fillAndStroke(RED_DARK, GOLD);

  drawStar(doc, cx, cy, 13, 5.5, GOLD_LIGHT);

  doc.save();
  for (let i = 0; i < 16; i += 1) {
    const angle = (Math.PI / 8) * i;
    const x1 = cx + Math.cos(angle) * (outerR - 3);
    const y1 = cy + Math.sin(angle) * (outerR - 3);
    const x2 = cx + Math.cos(angle) * (outerR + 3);
    const y2 = cy + Math.sin(angle) * (outerR + 3);
    doc.moveTo(x1, y1).lineTo(x2, y2).lineWidth(2).strokeColor(GOLD).stroke();
  }
  doc.restore();

  // Ribbon tails hanging below the medal, with a light center stripe and V-notched ends
  [-11, 11].forEach((offset) => {
    const baseX = cx + offset;
    doc
      .polygon([baseX - 9, cy + outerR - 6], [baseX + 9, cy + outerR - 6], [baseX + 12, cy + outerR + 58], [baseX, cy + outerR + 44], [baseX - 12, cy + outerR + 58])
      .fill(RED_DARK);
    doc
      .polygon([baseX - 3, cy + outerR - 4], [baseX + 3, cy + outerR - 4], [baseX + 3, cy + outerR + 42], [baseX - 3, cy + outerR + 42])
      .fill(GOLD_LIGHT);
  });
}

function drawStar(doc, cx, cy, outerR, innerR, color) {
  const points = [];
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
  }
  doc.polygon(...points).fill(color);
}

async function fetchImageBuffer(url) {
  if (!/^https?:\/\//i.test(url)) return null;
  const response = await fetch(url);
  if (!response.ok) return null;
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function stripProtocol(url) {
  return url.replace(/^https?:\/\//i, "");
}

// GreatVibes (the script font used for the recipient name) only has glyphs for
// Latin script. Names in Devanagari, Arabic, CJK, etc. would render as blank
// boxes, so those fall back to a plain serif font instead.
function isLatinScript(value) {
  return /^[ -ɏ\s]*$/.test(value);
}

function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}
