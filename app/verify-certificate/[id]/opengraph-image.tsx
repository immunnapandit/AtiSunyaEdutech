import { ImageResponse } from "next/og";
import { apiRequest } from "@/lib/api";

export const alt = "AtiSunya Edutech Certificate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type VerifyResponse = {
  valid: boolean;
  certificate?: {
    certificateId: string;
    issuedAt: string;
    studentName: string;
    courseTitle: string;
  };
};

async function getCertificate(id: string) {
  try {
    const data = await apiRequest<VerifyResponse>(
      `/certificates/verify/${encodeURIComponent(decodeURIComponent(id))}`
    );
    return data.valid ? data.certificate ?? null : null;
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificate = await getCertificate(id);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fffdf9",
          backgroundImage: "linear-gradient(135deg, #fffdf9 0%, #f6e3ae 150%)",
          padding: 48,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #c99a3d",
            borderRadius: 20,
            padding: 56,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#9a1b2b", fontWeight: 700 }}>
            ATISUNYA EDUTECH
          </div>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 700, color: "#32302c", marginTop: 20 }}>
            CERTIFICATE OF COMPLETION
          </div>

          {certificate ? (
            <>
              <div style={{ display: "flex", fontSize: 20, color: "#6b6560", marginTop: 36 }}>
                This certifies that
              </div>
              <div style={{ display: "flex", fontSize: 46, fontWeight: 700, color: "#6f0f1c", marginTop: 10 }}>
                {certificate.studentName}
              </div>
              <div style={{ display: "flex", fontSize: 22, color: "#32302c", marginTop: 20 }}>
                has successfully completed
              </div>
              <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#32302c", marginTop: 8, maxWidth: 900 }}>
                {certificate.courseTitle}
              </div>
            </>
          ) : (
            <div style={{ display: "flex", fontSize: 24, color: "#6b6560", marginTop: 36 }}>
              Verified Certificate
            </div>
          )}

          <div style={{ display: "flex", fontSize: 16, color: "#6b6560", marginTop: 44, letterSpacing: 1 }}>
            Verified at atisunyaedutech.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
