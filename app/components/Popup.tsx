"use client";
import React, { useState } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import ButtonFill from "./ButtonFill";
import popup from "../assets/h8_pic5.jpg";

interface PopupFormProps {
  open: boolean;
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<"FORM" | "OTP">("FORM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirements: "",
    budget: "",
    message: "",
  });

  const [otp, setOtp] = useState("");

  if (!open) return null;

  /* =========================
     SEND OTP
  ========================== */
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
      let message = "Failed to send OTP";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     VERIFY OTP
  ========================== */
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

      onClose();
      setStep("FORM");
      setOtp("");
    } catch (err: unknown) {
      let message = "OTP verification failed";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-11/12 max-w-3xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-white/30 animate-popupSlide overflow-hidden flex flex-col md:flex-row">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl z-10"
        >
          ✕
        </button>

        {/* IMAGE */}
        <div className="hidden md:block relative w-1/2">
          <Image src={popup} alt="Popup" fill className="object-fill" />
        </div>

        {/* FORM */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[var(--primary-color)]">
            {step === "FORM" ? "Enquire Now" : "Verify OTP"}
          </h2>

          {error && (
            <p className="text-red-600 text-sm text-center mb-3">{error}</p>
          )}

          {step === "FORM" && (
            <form onSubmit={handleSendOtp} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 placeholder-gray-500 text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <PhoneInput
                country="in"
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputClass="!w-full !h-[44px] !pl-12 !rounded-lg !border !border-gray-400 !text-black placeholder:!text-gray-500 focus:!border-[var(--primary-color)] focus:!ring-1 focus:!ring-[var(--primary-color)]"
                buttonClass="!border !border-gray-400 !rounded-l-lg"
                dropdownClass="!text-gray-800"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 placeholder-gray-500 text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-white text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                onChange={(e) =>
                  setFormData({ ...formData, requirements: e.target.value })
                }
              >
                <option value="">Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
                <option>Commercial</option>
              </select>

              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-white text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
              >
                <option value="">Budget</option>
                <option>Under ₹50L</option>
                <option>₹50L – ₹1Cr</option>
                <option>₹1Cr+</option>
              </select>

              <textarea
                placeholder="Any specific requirement (BHK, facing, possession timeline, etc.)"
                className="w-full h-24 px-4 py-2.5 rounded-lg border border-gray-400 placeholder-gray-500 text-black resize-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <ButtonFill
                type="submit"
                className="w-full"
                text={loading ? "Sending OTP..." : "Get Call Back"}
              />
            </form>
          )}

          {step === "OTP" && (
            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 rounded-lg border border-gray-400 placeholder-gray-500 text-black text-center tracking-[0.4em] focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <ButtonFill
                onClick={handleVerifyOtp}
                className="w-full"
                text={loading ? "Verifying..." : "Verify & Submit"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
