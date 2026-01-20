"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ButtonFill from "./ButtonFill";

export default function QuickEnquiry() {
  const [step, setStep] = useState<"FORM" | "OTP">("FORM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* =====================
     SEND OTP
  ====================== */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep("OTP");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to send OTP");
      } else {
        setError("Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     VERIFY OTP
  ====================== */
  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: formData.phone,
            otp,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep("FORM");
      setOtp("");
      setFormData({ name: "", email: "", phone: "", message: "" });
      alert("Thank you! Our team will contact you shortly.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "OTP verification failed");
      } else {
        setError("OTP verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md ml-auto bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Quick Enquiry</h3>

      {error && <p className="text-red-300 text-sm mb-3">{error}</p>}

      {step === "FORM" && (
        <form onSubmit={handleSendOtp} className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-600 text-black focus:outline-none focus:border-[var(--primary-color)]"
          />

          <PhoneInput
            country="in"
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            inputClass="!w-full !h-[44px] !pl-12 !rounded-lg !bg-white/80 !border !border-gray-300 !text-black placeholder:!text-gray-600 focus:!border-[var(--primary-color)]"
            buttonClass="!border !border-gray-300"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-600 text-black focus:outline-none focus:border-[var(--primary-color)]"
          />

          <textarea
            placeholder="Your message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full h-24 px-4 py-2.5 rounded-lg bg-white/80 border border-gray-300 placeholder-gray-600 text-black resize-none focus:outline-none focus:border-[var(--primary-color)]"
          />

          <ButtonFill
            type="submit"
            className="w-full"
            text={loading ? "Sending OTP..." : "Request Call Back"}
          />
        </form>
      )}

      {step === "OTP" && (
        <div className="space-y-4">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 text-center tracking-[0.4em] text-black focus:outline-none focus:border-[var(--primary-color)]"
          />

          <ButtonFill
            onClick={handleVerifyOtp}
            className="w-full"
            text={loading ? "Verifying..." : "Verify & Submit"}
          />
        </div>
      )}
    </div>
  );
}
