import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Cancellation & Refund Policy" };

const sections = [
  {
    heading: "1. Cancellation",
    body: "You may cancel an enrollment before accessing any course content by contacting our support team at info@atisunya.co with your order details.",
  },
  {
    heading: "2. Refund eligibility",
    body: "Refund requests submitted within 14 days of purchase are honored in full, provided less than 25% of the course has been completed. Requests made after 14 days, or after 25% completion, are not eligible for a refund.",
  },
  {
    heading: "3. How to request a refund",
    body: "Email info@atisunya.co or call +91 80-8181-0673 with your registered email address and payment/order ID. Verified requests are processed within 7 business days.",
  },
  {
    heading: "4. Refund method",
    body: "Approved refunds are credited back to the original payment method used at checkout (card, UPI, wallet, or netbanking) via Razorpay, our payment partner. Depending on your bank, it may take 5-10 business days for the amount to reflect in your account.",
  },
  {
    heading: "5. Non-refundable cases",
    body: "Certification exam fees, once the exam voucher has been issued, and any course where more than 25% of the content has been accessed are non-refundable.",
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-display-md font-semibold text-navy">Cancellation & Refund Policy</h1>
        <p className="mt-3 text-sm text-navy-400">Last updated: August 18, 2026</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-bold text-navy">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-400">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
