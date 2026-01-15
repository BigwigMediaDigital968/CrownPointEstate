"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";

import heroImg from "../assets/hero/aboutpage.jpg";

export default function BuyProperty() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    expectedPrice: "",
    areaSqft: "",
  });

  /* ======================
     SUBMIT SELL FORM
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/sellproperty/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            expectedPrice: Number(formData.expectedPrice),
            areaSqft: Number(formData.areaSqft),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Thank you! Our team will contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        expectedPrice: "",
        areaSqft: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <Image
          src={heroImg}
          alt="About Us"
          fill
          priority
          className="object-cover"
        />

        {/* DARK OVERLAY (OPTIONAL – improves contrast) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Sell Property
              </h1>

              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Sell Property</span>
              </p>
            </div>

            {/* RIGHT SIDE – QUICK ENQUIRY */}
            <div className="hidden lg:flex justify-end">
              <QuickEnquiry />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SELL PROPERTY FORM ================= */}
      <section className="py-12 ">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-4">
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] font-heading">
              List Your Property
            </p>
            <h2 className="font-heading text-3xl leading-snug font-bold text-[var(--primary-bg)]">
              Sell Your Property Faster & at the Right Price
            </h2>

            <p className="text-gray-600 mb-8 max-w-lg">
              Get expert guidance, verified buyers, and end-to-end support to
              sell your property without stress.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Free property valuation</li>
              <li>✔ Professional marketing & promotion</li>
              <li>✔ Verified & genuine buyers</li>
              <li>✔ Complete legal & documentation support</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">List Your Property</h3>

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm mb-3">{success}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />

              <input
                type="text"
                placeholder="Property Location"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />

              <input
                type="number"
                placeholder="Expected Price (₹)"
                required
                value={formData.expectedPrice}
                onChange={(e) =>
                  setFormData({ ...formData, expectedPrice: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />

              <input
                type="number"
                placeholder="Area (Sqft)"
                required
                value={formData.areaSqft}
                onChange={(e) =>
                  setFormData({ ...formData, areaSqft: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary-color)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                {loading ? "Submitting..." : "Get Free Consultation"}
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4 text-center">
              100% privacy • No spam • Trusted experts
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY SELL WITH US ================= */}
      <section className="py-12 ">
        <div className="w-11/12 md:w-5/6 mx-auto text-center">
          {/* Heading */}
          <h2 className="font-heading text-3xl leading-snug font-bold text-[var(--primary-bg)]">
            Why Sell With Us
          </h2>

          <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
            We combine deep local market expertise with powerful marketing
            strategies to help you sell faster and at the right price.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Verified Buyers Only",
                desc: "We connect you only with genuine and verified buyers.",
                icon: "👥",
              },
              {
                title: "Professional Photography",
                desc: "High-quality visuals to showcase your property perfectly.",
                icon: "📸",
              },
              {
                title: "Market-Driven Pricing",
                desc: "Accurate pricing based on real-time market data.",
                icon: "📊",
              },
              {
                title: "End-to-End Support",
                desc: "From listing to closure, we manage everything.",
                icon: "🤝",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
            group bg-white rounded-3xl p-8
            border border-gray-100
            transition-all duration-300
            hover:-translate-y-2 hover:shadow-xl
          "
              >
                {/* Icon */}
                <div className="text-4xl mb-5 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Title */}
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-12">
        <div className="w-11/12 md:w-5/6 mx-auto text-center">
          <h2 className="font-heading text-3xl leading-snug font-bold text-[var(--primary-bg)]">
            How It Works
          </h2>

          <div className="relative">
            {/* CONNECTING LINE (DESKTOP) */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-gray-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
              {[
                {
                  title: "Submit Property Details",
                  icon: "📝",
                },
                {
                  title: "Free Price Evaluation",
                  icon: "💰",
                },
                {
                  title: "Marketing & Site Visits",
                  icon: "📢",
                },
                {
                  title: "Deal Closure",
                  icon: "🤝",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center relative"
                >
                  {/* STEP CIRCLE */}
                  <div
                    className="
                w-16 h-16 rounded-full
                flex items-center justify-center
                bg-white border-2 border-[var(--primary-color)]
                text-2xl
                mb-6
                relative z-10
                transition-all duration-300
                group-hover:bg-[var(--primary-color)]
                group-hover:text-white
              "
                  >
                    {step.icon}
                  </div>

                  {/* STEP NUMBER */}
                  <div className="text-sm font-semibold text-[var(--primary-color)] mb-2">
                    Step {index + 1}
                  </div>

                  {/* STEP TITLE */}
                  <p className="font-medium text-gray-800 max-w-xs">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-12 bg-[var(--primary-color)] text-white text-center">
        <h2 className="font-heading text-3xl leading-snug font-bold text-[var(--primary)] mb-5">
          Thinking of Selling Your Property?
        </h2>

        <p className="mb-8 text-white/90">
          Let our experts handle everything for you.
        </p>

        <a
          href="tel:+911234567890"
          className="inline-block bg-white text-black px-8 py-4 rounded-xl font-semibold"
        >
          Talk to an Expert
        </a>
      </section>

      <Footer />
    </div>
  );
}
