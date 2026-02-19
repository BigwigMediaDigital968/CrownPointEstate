"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";

import heroImg from "../assets/hero/for-sell.svg";

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
        },
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to submit enquiry");
      } else {
        setError("Failed to submit enquiry");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* SEO Meta Tags */}

      {/* <!-- Primary Meta Tags --> */}
      <title>
        Sell Property in Gurgaon | Trusted Property Dealers in Gurugram
      </title>
      <meta
        name="title"
        content="Sell Property in Gurgaon | Crownpoint Estates"
      />
      <meta
        name="description"
        content="Sell property in Gurgaon faster with verified buyers, free valuation & legal support. List your property today with Crownpoint Estates."
      />
      <meta
        name="keywords"
        content="sell property in gurgaon, sell your property in gurgaon, list property in gurgaon, property for sale in gurgaon, sell house in gurgaon, sell flat in gurgaon, sell builder floor in gurgaon, property dealers in gurgaon, real estate agents in gurgaon, free property valuation gurgaon, sell commercial property in gurgaon, gurgaon real estate market, sell luxury property in gurgaon, sell property fast in gurgaon, crownpoint estates gurgaon"
      />
      {/* <meta name="author" content="Crownpoint Estates" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" /> */}

      {/* <!-- Canonical URL --> */}
      <link
        rel="canonical"
        href="https://www.crownpointestates.com/sell-property"
      />

      {/* <!-- Open Graph Meta Tags --> */}

      <meta
        property="og:title"
        content="Sell Property in Gurgaon | Trusted Property Dealers in Gurugram"
      />
      <meta
        property="og:description"
        content="Sell your property in Gurgaon with Crownpoint Estates. Get the right valuation, genuine buyers, and transparent processes from experienced real estate consultants in Gurugram."
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/dyum0r6gf/image/upload/v1770702902/Crown/images/lez0tetgjg23p3z9uq44.png"
      />
      <meta
        property="og:url"
        content="https://www.crownpointestates.com/sell-property"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Crownpoint Estates" />
      <meta property="og:locale" content="en_IN" />

      {/* <!-- Twitter Card Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Sell Property in Gurgaon | Trusted Property Dealers in Gurugram"
      />
      <meta
        name="twitter:description"
        content="Sell your property in Gurgaon with Crownpoint Estates. Get the right valuation, genuine buyers, and transparent processes from experienced real estate consultants in Gurugram."
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/dyum0r6gf/image/upload/v1770702902/Crown/images/lez0tetgjg23p3z9uq44.png"
      />

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
              Sell Property in Gurgaon | List Your Property with Crownpoint
              Estates
            </h2>

            <p className="text-gray-600 mb-8 max-w-lg">
              Looking to <b>sell property in Gurgaon</b> at the best price?
              Crownpoint Estates helps property owners sell faster with verified
              buyers, strategic marketing, and complete legal assistance.
              Whether you own a builder floor, luxury apartment, independent
              house, or commercial property, our experts ensure smooth and
              profitable transactions. <br /> <br />
              If you want to <b>sell your property in Gurgaon</b> without
              delays, underpricing, or unnecessary stress, we are here to manage
              everything for you.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Free Property Valuation</li>
              <li>✔ Professional Marketing & Promotion</li>
              <li>✔ Verified & Genuine Buyers</li>
              <li>✔ Legal & Documentation Support</li>
              <li>✔ End-to-End Deal Management</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">
              List Your Property Today
            </h3>
            <p className="mb-6">
              Ready to sell property in Gurgaon? Share your details and our
              experts will contact you for a free consultation.
            </p>

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
                className="w-full bg-(--primary-color) text-white py-3 rounded-xl cursor-pointer font-semibold hover:opacity-90 transition"
              >
                {loading ? "Submitting..." : "👉 Get Free Consultation"}
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
            Why Choose Us to Sell Property in Gurgaon?
          </h2>

          <p className="text-gray-600 mb-14 pt-5 max-w-5xl mx-auto">
            Selling property in Gurgaon requires strong local expertise and
            market understanding. Gurgaon’s micro-markets like DLF Phase 1, DLF
            Phase 2, Golf Course Road, Golf Course Extension Road, Sector 57,
            Sector 67, Sushant Lok, and New Gurgaon all have different buyer
            demands and pricing patterns. We combine data-driven pricing with
            deep local knowledge to help you sell at the right value.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Verified Buyers Only",
                desc: "We connect you with serious and financially verified buyers actively looking to buy property in Gurgaon.",
                icon: "👥",
              },
              {
                title: "Professional Photography & Premium Listings",
                desc: "High-quality visuals and compelling property descriptions increase visibility and attract better offers.",
                icon: "📸",
              },
              {
                title: "Market-Driven Property Valuation",
                desc: "Accurate pricing based on real-time market data.",
                icon: "📊",
              },
              {
                title: "Complete End-to-End Support",
                desc: "From listing and site visits to negotiations and registry, we handle everything professionally.",
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
          <h2 className="font-heading text-3xl pb-12 leading-snug font-bold text-(--primary-bg)">
            How to Sell Your Property in Gurgaon – Our Process
          </h2>

          <div className="relative">
            {/* CONNECTING LINE (DESKTOP) */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
              {[
                {
                  title: "Submit Property Details",
                  description:
                    "Share your property information including location, size, and expected price.",
                  icon: "📝",
                },
                {
                  title: " Free Property Price Evaluation",
                  description:
                    "We conduct a detailed market assessment based on current Gurgaon real estate trends.",
                  icon: "💰",
                },
                {
                  title: "Strategic Marketing & Site Visits",
                  description:
                    "Your property is promoted across premium property portals, digital platforms, and our verified buyer database.",
                  icon: "📢",
                },
                {
                  title: "Negotiation & Deal Closure",
                  description:
                    "We assist with negotiations, paperwork, and final registration to ensure a smooth closing.",
                  icon: "🤝",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center relative"
                >
                  {/* STEP CIRCLE */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white border-2 border-[var(--primary-color)]text-2xl mb-6 relative z-10 transition-all duration-300group-hover:bg-[var(--primary-color)] group-hover:text-white">
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
                  <p className="text-sm py-2">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= AREAS WE COVER - CREATIVE TABLE ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--primary)] mb-6">
            Areas Where We Help You Sell Property in Gurgaon
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We actively deal in premium residential and commercial locations
            across Gurgaon, helping property owners connect with verified buyers
            and secure the best market value.
          </p>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl shadow-lg bg-white">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead className="bg-[var(--primary-color)] text-white">
                <tr>
                  <th className="px-6 py-4 text-lg font-semibold">
                    Residential Areas
                  </th>
                  <th className="px-6 py-4 text-lg font-semibold">
                    Property Segments
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="text-gray-700">
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">DLF Phase 1, 2, 3, 4 & 5</td>
                  <td className="px-6 py-4">Builder Floors</td>
                </tr>

                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">Golf Course Road</td>
                  <td className="px-6 py-4">Luxury Residences</td>
                </tr>

                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">Golf Course Extension Road</td>
                  <td className="px-6 py-4">Commercial Properties</td>
                </tr>

                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">Sushant Lok 1, 2 & 3</td>
                  <td className="px-6 py-4">Investment Properties</td>
                </tr>

                <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">Sector 56, 57, 67 & New Gurgaon</td>
                  <td className="px-6 py-4">
                    Premium Residential & Commercial Assets
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Closing Line */}
          <p className="text-center mt-10 text-gray-800 font-medium">
            No matter the segment, we help you sell property in Gurgaon faster
            and at the best possible price.
          </p>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-12 bg-(--primary-color) text-white text-center">
        <h2 className="font-heading text-3xl leading-snug font-bold text-[var(--primary)] mb-5">
          Thinking of Selling Your Property?
        </h2>

        <p className="mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-10">
          Gurgaon’s real estate market is competitive and fast-moving. Proper
          pricing, targeted marketing, and verified buyer networks make all the
          difference. Let Crownpoint Estates handle everything while you focus
          on your next move.
        </p>

        <a
          href="tel:+911234567890"
          className="inline-block bg-white text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          👉 Talk to an Expert Today
        </a>
      </section>

      <Footer />
    </>
  );
}
