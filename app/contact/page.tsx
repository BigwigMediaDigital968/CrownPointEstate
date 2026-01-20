"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/hero/for-contact.svg";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin, Phone, Mail } from "lucide-react";
import Footer from "../components/Footer";

const Contact = () => {
  /* ================= AOS INIT ================= */
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  /* ================= FORM STATE ================= */
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

  /* ================= SEND OTP ================= */
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

  /* ================= VERIFY OTP ================= */
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

      // Reset form on success
      setFormData({ name: "", email: "", phone: "", message: "" });
      setOtp("");
      setStep("FORM");
      alert("Thank you! Our team will contact you shortly.");
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
    <div className="relative">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Contact Us"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-sm tracking-widest text-white/80 uppercase">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">Contacts</span>
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative py-16 bg-[#faf9f7]">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* LEFT INFO */}
            <div data-aos="fade-up">
              <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
                Get in touch
              </p>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--primary-bg)] mb-6">
                Let’s start a conversation
              </h2>

              <p className="text-gray-600 max-w-md mb-12">
                Get in touch with Crownpoint Estates for expert guidance in
                buying, selling, renting, or investing in real estate across
                Gurugram and Delhi NCR.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-[var(--primary-color)] mt-1" />
                  <p>
                    Crownpoint Estates <br />
                    65, Lower Ground Floor, Akashneem Marg, <br />
                    DLF Phase-2, Gurugram – 122002
                  </p>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-[var(--primary-color)] mt-1" />
                  <p>+91 98115 56625 / 98107 86375 / 99990 19763</p>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-[var(--primary-color)] mt-1" />
                  <p>sales@crownpointestates.com</p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div
              className="bg-white p-10 md:p-14 shadow-sm"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-2xl font-semibold mb-6">
                {step === "FORM" ? "Send a Message" : "Verify OTP"}
              </h3>

              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

              {step === "FORM" && (
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-400 px-4 py-3 placeholder-gray-500 focus:border-[var(--primary-color)]"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-400 px-4 py-3 placeholder-gray-500 focus:border-[var(--primary-color)]"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-400 px-4 py-3 placeholder-gray-500 focus:border-[var(--primary-color)]"
                  />

                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-gray-400 px-4 py-3 placeholder-gray-500 resize-none focus:border-[var(--primary-color)]"
                  />

                  <button
                    type="submit"
                    className="w-full mt-4 px-8 py-4 bg-[var(--primary-color)] text-white tracking-widest hover:opacity-90 transition"
                  >
                    {loading ? "SENDING OTP..." : "SEND MESSAGE →"}
                  </button>
                </form>
              )}

              {step === "OTP" && (
                <div className="space-y-6">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-gray-400 px-4 py-3 text-center tracking-[0.4em] placeholder-gray-500 focus:border-[var(--primary-color)]"
                  />

                  <button
                    onClick={handleVerifyOtp}
                    className="w-full px-8 py-4 bg-[var(--primary-color)] text-white tracking-widest hover:opacity-90 transition"
                  >
                    {loading ? "VERIFYING..." : "VERIFY & SUBMIT"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="relative h-[420px]" data-aos="zoom-in">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.8425971238116!2d77.08364537528334!3d28.484286575746182"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
