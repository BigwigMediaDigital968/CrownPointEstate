"use client";
import React, { useState, useEffect } from "react";
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
    purpose: "",
    requirements: "", // This maps to Property Type
    budget: "",
    message: "",
  });

  const [otp, setOtp] = useState("");
  const [budgetOptions, setBudgetOptions] = useState<string[]>([]);

  // Update budget options when Purpose or Property Type changes
  useEffect(() => {
    const { purpose, requirements } = formData;
    let options: string[] = [];

    if (purpose === "Sell") {
      options = [];
    } else if (purpose === "Rent") {
      options = ["50k - 1 Lakh", "1Lakh - 2 Lakh", "2Lakh & above"];
    } else if (purpose === "Lease") {
      options = ["Below ₹2 Cr", "₹2 Cr – ₹5 Cr", "Above ₹5 Cr"];
    } else if (purpose === "Buy") {
      if (requirements === "Apartment" || requirements === "Builder Floor") {
        options = ["Below ₹4 Cr", "₹4 Cr – ₹6 Cr", "Above ₹6 Cr"];
      } else if (requirements === "Villa") {
        options = [
          "Below ₹10 Cr",
          "₹10 Cr – ₹12 Cr",
          "₹12 Cr – ₹14 Cr",
          "Above ₹14 Cr",
        ];
      } else if (requirements === "Plot") {
        options = ["Below ₹8 Cr", "₹8 Cr – ₹10 Cr", "Above ₹10 Cr"];
      }
    }

    setBudgetOptions(options);
    
    // Clear budget if it's no longer in the options (unless it's Sell where we hide it anyway)
    if (purpose === "Sell") {
       setFormData(prev => ({ ...prev, budget: "" }));
    } else if (options.length > 0 && formData.budget && !options.includes(formData.budget)) {
       setFormData(prev => ({ ...prev, budget: "" }));
    }
  }, [formData.purpose, formData.requirements]);

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
      if (err instanceof Error) {
        setError(err.message || "Failed to send OTP");
      } else {
        setError("Failed to send OTP");
      }
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
                value={formData.name}
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              {/* Purpose Dropdown */}
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-white text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                value={formData.purpose}
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
              >
                <option value="">Select Purpose</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
                <option value="Lease">Lease</option>
              </select>

              {/* Property Type Dropdown */}
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-white text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                value={formData.requirements}
                onChange={(e) =>
                  setFormData({ ...formData, requirements: e.target.value })
                }
              >
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Builder Floor">Builder Floor</option>
              </select>

              {/* Budget Dropdown (Hidden if Purpose is Sell) */}
              {formData.purpose !== "Sell" && (
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-white text-black focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  disabled={budgetOptions.length === 0}
                >
                  <option value="">
                    {budgetOptions.length > 0
                      ? "Select Budget"
                      : "Select Purpose & Type First"}
                  </option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              <textarea
                placeholder="Any specific requirement (BHK, facing, possession timeline, etc.)"
                className="w-full h-24 px-4 py-2.5 rounded-lg border border-gray-400 placeholder-gray-500 text-black resize-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)]"
                value={formData.message}
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
