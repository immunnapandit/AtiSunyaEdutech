"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { apiRequest } from "@/lib/api";

type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  state: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  note: string;
  paymentMethod: string;
};

type PaymentPayload = {
  orderId?: string;
  amount?: number;
  currency?: string;
  key?: string;
  mode?: string;
  callbackUrl?: string;
};

const initialValues: CheckoutFormValues = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  phoneNumber: "",
  country: "India",
  state: "",
  addressLine1: "",
  addressLine2: "",
  postalCode: "",
  note: "",
  paymentMethod: "card",
};

export function CheckoutClient({ slug, title, price }: { slug: string; title: string; price: number }) {
  const router = useRouter();
  const [values, setValues] = useState<CheckoutFormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("atisunya_token");
    if (!token) {
      router.replace(`/signup?redirect=${encodeURIComponent(`/checkout/${slug}`)}`);
    }
  }, [router, slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const token = window.localStorage.getItem("atisunya_token");
    if (!token) {
      router.push(`/signup?redirect=${encodeURIComponent(`/checkout/${slug}`)}`);
      setLoading(false);
      return;
    }

    try {
      const data = await apiRequest<{ message: string; enrolled: boolean; payment?: PaymentPayload }>(`/courses/${slug}/checkout`, {
        method: "POST",
        token,
        body: JSON.stringify({
          ...values,
          price,
        }),
      });

      if (data.enrolled) {
        setMessage(data.message || "You are already enrolled in this course.");
        router.push("/dashboard");
        return;
      }

      setMessage(data.message || "Preparing secure payment...");
      await openRazorpay(token, data.payment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enrollment failed.");
    } finally {
      setLoading(false);
    }
  }

  async function openRazorpay(token: string, payment?: PaymentPayload) {
    if (!payment?.orderId || typeof window === "undefined") {
      return;
    }

    if (!payment.key) {
      throw new Error("Payment gateway is not configured. Please contact Atisunya support.");
    }

    await loadRazorpayScript();
    const RazorpayCtor = (window as Window & { Razorpay?: new (options: Record<string, unknown>) => { open: () => void } }).Razorpay;

    if (!RazorpayCtor) {
      throw new Error("Razorpay checkout could not be loaded.");
    }

    const instance = new RazorpayCtor({
      key: payment.key,
      amount: payment.amount ?? 0,
      currency: payment.currency ?? "INR",
      name: "Atisunya Edutech",
      description: `Enrollment for ${title}`,
      order_id: payment.orderId,
      method: getRazorpayMethodOptions(values.paymentMethod),
      handler: async function (response: { razorpay_payment_id?: string; razorpay_order_id?: string; razorpay_signature?: string }) {
        try {
          const verifyData = await apiRequest<{ message: string; enrolled: boolean }>(`/courses/${slug}/verify-payment`, {
            method: "POST",
            token,
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          setMessage(verifyData.message || "Payment successful. Your course is now active.");
          router.push("/dashboard");
        } catch (verifyErr) {
          setError(verifyErr instanceof Error ? verifyErr.message : "Payment verification failed.");
        }
      },
      prefill: {
        name: values.firstName ? `${values.firstName} ${values.lastName}`.trim() : "Student",
        email: values.emailAddress,
      },
      theme: {
        color: "#3b82f6",
      },
    });

    instance.open();
  }


  function getRazorpayMethodOptions(paymentMethod: string) {
    return {
      card: paymentMethod === "card",
      upi: paymentMethod === "upi",
      wallet: paymentMethod === "wallet",
      netbanking: false,
      emi: false,
      paylater: false
    };
  }
  async function loadRazorpayScript() {
    if (typeof window === "undefined") {
      throw new Error("Razorpay checkout is unavailable on this platform.");
    }

    if ((window as Window & { Razorpay?: unknown }).Razorpay) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay checkout script."));
      document.body.appendChild(script);
    });
  }

  function updateField(field: keyof CheckoutFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="bg-mist-50 pt-site-header-loose pb-20">
      <form onSubmit={handleSubmit}>
        <Container className="grid grid-cols-1 gap-6 xl:grid-cols-[1.55fr_0.85fr]">
          <div className="rounded-lg border border-navy-100 bg-white p-8 shadow-soft">
            <div className="flex items-center gap-3 text-sm font-semibold text-royal-700">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure checkout</span>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-navy">{title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-navy-400">
                Fill in your billing details to complete enrollment and get immediate access to the course.
              </p>
            </div>

            <section className="mt-10 rounded-lg border border-navy-100 bg-mist-50 p-6">
              <h2 className="text-xl font-semibold text-navy">Billing Details</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    value={values.firstName}
                    onChange={(event) => updateField("firstName", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    value={values.lastName}
                    onChange={(event) => updateField("lastName", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="emailAddress">Email Address *</label>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    required
                    value={values.emailAddress}
                    onChange={(event) => updateField("emailAddress", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="phoneNumber">Phone Number *</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={values.phoneNumber}
                    onChange={(event) => updateField("phoneNumber", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="country">Country *</label>
                  <input
                    id="country"
                    name="country"
                    required
                    value={values.country}
                    onChange={(event) => updateField("country", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="state">State / Division *</label>
                  <input
                    id="state"
                    name="state"
                    required
                    value={values.state}
                    onChange={(event) => updateField("state", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="addressLine1">Address Line 1 *</label>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    required
                    value={values.addressLine1}
                    onChange={(event) => updateField("addressLine1", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy" htmlFor="addressLine2">Address Line 2</label>
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    value={values.addressLine2}
                    onChange={(event) => updateField("addressLine2", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-navy" htmlFor="postalCode">Postal Code *</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    required
                    value={values.postalCode}
                    onChange={(event) => updateField("postalCode", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-navy" htmlFor="note">Note</label>
                  <textarea
                    id="note"
                    name="note"
                    rows={4}
                    value={values.note}
                    onChange={(event) => updateField("note", event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-navy-100 bg-white px-4 py-4 text-sm text-navy outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/10"
                    placeholder="Anything we should know before your first session?"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-lg border border-navy-100 bg-white p-8 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-royal-700">Order summary</p>
                  <h2 className="mt-3 text-2xl font-semibold text-navy">Cart totals</h2>
                </div>
                <span className="rounded-full border border-royal-100 bg-royal-50 px-3 py-1 text-xs font-semibold uppercase text-royal-700">
                  One-time fee
                </span>
              </div>
              <div className="mt-8 space-y-6">
                <div className="rounded-lg border border-navy-100 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-navy">{title}</p>
                      <p className="mt-1 text-sm text-navy-400">1 seat</p>
                    </div>
                    <p className="text-sm font-semibold text-navy">INR {price.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-navy-100 bg-mist-50 p-5 text-sm text-navy-400">
                  <div className="flex items-center justify-between">
                    <span>Sub Total</span>
                    <span className="text-navy">INR {price.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-navy-500">Delivery</span>
                    <span className="text-navy">Free</span>
                  </div>
                  <div className="mt-4 border-t border-navy-100 pt-4 text-base font-semibold text-navy">
                    <div className="flex items-center justify-between">
                      <span>Total</span>
                      <span>INR {price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-navy-100 bg-mist-50 p-5">
                  <h3 className="text-sm font-semibold text-navy">Payment method</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      { value: "card", label: "Card payments" },
                      { value: "upi", label: "UPI" },
                      { value: "wallet", label: "Wallet" },
                    ].map((method) => (
                      <label key={method.value} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-navy-100 bg-white px-4 py-3 text-sm transition hover:border-royal/40">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={values.paymentMethod === method.value}
                          onChange={(event) => updateField("paymentMethod", event.target.value)}
                          className="h-4 w-4 accent-royal"
                        />
                        <span className="font-medium text-navy">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {message && <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{message}</p>}
                {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

                <Button type="submit" size="lg" className="w-full justify-center">
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </form>
    </div>
  );
}
