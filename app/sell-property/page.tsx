"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";
import PopupForm from "../components/Popup";

import heroImg from "../assets/hero/for-sell.svg";

import {
  Users,
  Camera,
  BarChart3,
  Handshake,
  ClipboardList,
  IndianRupee,
  Megaphone,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  MapPin,
} from "lucide-react";

/* ─── BRAND ─── */
const brand = { navy: "#173e62", gold: "#b59a78" };

/* ─── STATIC DATA ─── */
const listingPerks = [
  "Free property valuation",
  "Professional marketing and promotion",
  "Verified and genuine buyers",
  "Legal and documentation support",
  "End-to-end deal management",
];

const whyCards = [
  {
    icon: Users,
    title: "Verified Buyers Network",
    desc: "We connect you with serious and financially verified buyers actively looking to buy property in Gurgaon, ensuring faster deal closures.",
  },
  {
    icon: Camera,
    title: "Professional Property Marketing",
    desc: (
      <>
        We use high-quality visuals, compelling descriptions, and premium
        listings to position your{" "}
        <a className="underline" href="https://crownpointestates.com">
          property for sale in Gurgaon
        </a>{" "}
        effectively in the market.
      </>
    ),
  },
  {
    icon: BarChart3,
    title: "Market-Driven Property Valuation",
    desc: "Accurate pricing based on real-time Gurgaon (Gurugram) market trends helps you avoid underpricing or overpricing.",
  },
  {
    icon: Handshake,
    title: "End-to-End Selling Support",
    desc: "From listing and site visits to negotiation and registration, we handle everything to help you sell your property in Gurgaon smoothly.",
  },
];

const processSteps = [
  {
    icon: ClipboardList,
    title: "Submit Property Details",
    desc: "Share your property details including location, size, and expected price.",
  },
  {
    icon: IndianRupee,
    title: "Free Property Evaluation",
    desc: "We analyze current Gurgaon real estate trends to determine the right pricing strategy.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Buyer Reach",
    desc: "Your property for sale in Gurgaon is promoted across digital platforms, property portals, and our verified buyer network.",
  },
  {
    icon: Handshake,
    title: "Negotiation & Deal Closure",
    desc: "We assist in negotiations, documentation, and final registration to help you successfully sell your property in Gurgaon.",
  },
];

const areaRows = [
  { area: "DLF Phase 1, 2, 3, 4 & 5", segment: "Builder Floors" },
  { area: "Golf Course Road", segment: "Luxury Residences" },
  { area: "Golf Course Extension Road", segment: "Commercial Properties" },
  { area: "Sushant Lok 1, 2 & 3", segment: "Investment Properties" },
  {
    area: "Sector 56, 57, 67 & New Gurgaon",
    segment: "Premium Residential & Commercial Assets",
  },
];

const faqs = [
  {
    q: "How can I sell property in Gurgaon quickly?",
    a: "To sell property in Gurgaon quickly, work with an experienced property dealer like Crownpoint Estates who provides accurate valuation, professional marketing, and access to a verified buyer network.",
  },
  {
    q: "How is the property valuation done for selling in Gurgaon?",
    a: "Our experts conduct a market-driven evaluation based on current real estate trends, comparable sales, and location factors to help you price your property correctly in Gurgaon.",
  },
  {
    q: "What types of properties can I sell through Crownpoint Estates?",
    a: "You can sell builder floors, luxury apartments, independent houses, villas, plots, and commercial properties in Gurgaon through Crownpoint Estates.",
  },
  {
    q: "What are the charges for selling property in Gurgaon?",
    a: "The charges for selling property in Gurgaon through Crownpoint Estates are competitive. Please contact us directly for a detailed breakdown based on your property type and location.",
  },
  {
    q: "How long does it take to sell property in Gurgaon?",
    a: "The time to sell property in Gurgaon depends on factors like pricing, location, and market demand. With proper valuation and marketing, most properties find buyers within a reasonable timeframe.",
  },
  {
    q: "What documents are required to sell property in Gurgaon?",
    a: "Key documents include the sale deed, title deed, RERA registration (if applicable), NOC, property tax receipts, and identity proof of the seller.",
  },
  {
    q: "Can NRIs sell property in Gurgaon?",
    a: "Yes, NRIs can sell property in Gurgaon by following RBI and FEMA guidelines. Crownpoint Estates provides complete guidance and support for NRI property transactions.",
  },
  {
    q: "Is it the right time to sell property in Gurgaon in 2026?",
    a: "Yes, 2026 presents strong opportunities to sell property in Gurgaon due to rising demand, infrastructure growth, and increasing buyer interest across premium and emerging sectors.",
  },
];

/* ─── HOVER HANDLER ─── */
const hoverNavy = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = brand.navy;
    e.currentTarget.style.borderColor = brand.navy;
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "#fff";
    e.currentTarget.style.borderColor = "#e8e0d6";
  },
};

/* ─── FAQ ACCORDION ITEM ─── */
function FaqItem({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: open ? `1px solid ${brand.gold}` : "1px solid #e8e0d6",
        backgroundColor: open ? `${brand.gold}08` : "#fff",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 text-left px-6 py-5"
      >
        <span
          className="shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center mt-0.5 transition-colors duration-300"
          style={{
            backgroundColor: open ? brand.gold : `${brand.navy}15`,
            color: open ? "#fff" : brand.navy,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="flex-1 font-semibold text-[15px] leading-snug pr-2 transition-colors duration-300"
          style={{ color: open ? brand.gold : brand.navy }}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 mt-0.5 transition-transform duration-300"
          style={{
            color: brand.gold,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed pl-[4.5rem]">
          {a}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function SellPropertyPage() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  /* ── FORM SUBMIT ── */
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
      setError(err instanceof Error ? err.message : "Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  /* ── JSON-LD SCHEMAS ── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.crownpointestates.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sell Property",
        item: "https://www.crownpointestates.com/sell-property",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      {/* ══ SEO META TAGS ══ */}
      <title>Sell Property in Gurgaon | Fast Sale & Best Price</title>
      <meta
        name="title"
        content="Sell Property in Gurgaon | Fast Sale & Best Price"
      />
      <meta
        name="description"
        content="Sell property in Gurgaon at the best price. Connect with verified buyers and get fast, hassle-free closure with Crownpoint Estates. List your property today!"
      />
      <meta
        name="keywords"
        content="Sell property in Gurgaon at the best price. Connect with verified buyers and get fast, hassle-free closure with Crownpoint Estates. List your property today!"
      />
      <meta name="author" content="Crownpoint Estates" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      <link
        rel="canonical"
        href="https://www.crownpointestates.com/sell-property"
      />

      <meta
        property="og:title"
        content="Sell Property in Gurgaon | Fast Sale & Best Price"
      />
      <meta
        property="og:description"
        content="Sell property in Gurgaon at the best price. Connect with verified buyers and get fast, hassle-free closure with Crownpoint Estates. List your property today!"
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/dyum0r6gf/image/upload/v1774263369/for-sell_kajyyi.svg"
      />
      <meta
        property="og:url"
        content="https://www.crownpointestates.com/sell-property"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Crownpoint Estates" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Sell Property in Gurgaon – Get Best Price | Crownpoint Estates"
      />
      <meta
        name="twitter:description"
        content="Get free valuation, verified buyers & expert support to sell property in Gurgaon faster."
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/dyum0r6gf/image/upload/v1774263369/for-sell_kajyyi.svg"
      />

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ══ JSON-LD SCHEMAS ══ */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>

      <Navbar />

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Sell Property in Gurgaon"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Sell Property in Gurgaon
                <span className="text-lg md:text-2xl font-medium text-white/80 block mt-2">
                  Get Best Price with Verified Buyers
                </span>
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Sell Property</span>
              </p>
            </div>
            <div className="hidden lg:flex justify-end">
              <QuickEnquiry />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — Intro + Form
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left copy */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              List Your Property
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-5"
              style={{ color: brand.navy }}
            >
              Sell Property in Gurgaon - List Your Property with Crownpoint
              Estates
            </h2>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
              Looking to{" "}
              <strong style={{ color: brand.navy }}>
                sell property in Gurgaon
              </strong>{" "}
              at the best possible price? Crownpoint Estates -{" "}
              <strong style={{ color: brand.gold }}>
                <a href="https://crownpointestates.com">
                  Property Dealer in Gurgaon
                </a>
              </strong>{" "}
              - helps property owners sell faster with verified buyers,
              strategic marketing, and complete legal assistance. Whether you
              want to sell builder floors, luxury apartments, independent
              houses, or commercial spaces, our experts ensure a smooth and
              profitable selling experience.
            </p>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-8">
              If you are planning to{" "}
              <strong style={{ color: brand.navy }}>
                sell your property in Gurugram
              </strong>{" "}
              without delays, underpricing, or unnecessary stress, we manage the
              entire process efficiently from listing to final deal closure.
            </p>

            {/* Perks */}
            <div className="space-y-3">
              {listingPerks.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    color={brand.gold}
                    className="shrink-0"
                  />
                  <p className="text-gray-700 text-[15px]">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-sm italic mt-6">
              Start your journey to sell your property in Gurgaon with
              confidence and expert guidance.
            </p>
          </div>

          {/* Right: Form */}
          <div
            className="rounded-3xl p-8 shadow-lg"
            style={{ backgroundColor: "#fff", border: `1px solid #e8e0d6` }}
          >
            {/* Form header */}
            <div
              className="rounded-2xl px-6 py-5 mb-6"
              style={{ backgroundColor: brand.navy }}
            >
              <p
                className="text-xs uppercase tracking-[0.3em] mb-1"
                style={{ color: brand.gold }}
              >
                Get Started
              </p>
              <h3 className="font-heading text-xl font-bold text-white">
                List Your Property Today
              </h3>
              <p className="text-white/60 text-sm mt-1">
                Ready to sell? Share your details for a free consultation.
              </p>
            </div>

            {error && <p className="text-red-500 text-sm mb-3 px-1">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm mb-3 px-1">{success}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { placeholder: "Your Name", type: "text", key: "name" },
                { placeholder: "Email Address", type: "email", key: "email" },
                { placeholder: "Phone Number", type: "tel", key: "phone" },
                {
                  placeholder: "Property Location",
                  type: "text",
                  key: "location",
                },
                {
                  placeholder: "Expected Price (₹)",
                  type: "number",
                  key: "expectedPrice",
                },
                { placeholder: "Area (Sqft)", type: "number", key: "areaSqft" },
              ].map(({ placeholder, type, key }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  required
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition"
                  style={{ border: `1px solid #e8e0d6` }}
                />
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: brand.gold }}
              >
                {loading ? "Submitting..." : "Get Free Consultation"}
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4 text-center">
              100% privacy · No spam · Trusted experts
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — Why Choose Us (icon cards like screenshot)
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Our Advantage
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Why Choose Crownpoint Estates to Sell Property in Gurgaon
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-[15px] leading-relaxed">
              Selling property in Gurgaon requires deep local knowledge and
              understanding of micro-markets with the help of{" "}
              <a className="underline" href="https://crownpointestates.com">
                Crownpoint Estates
              </a>
              you can sell your property in Gurgaon easily. Areas like DLF Phase
              1–5, Golf Course Road, Golf Course Extension Road, Sector 57,
              Sector 67, Sushant Lok, and New Gurgaon (Gurugram) all have
              different pricing trends and buyer demand.
              <br /> <br /> We combine market data with on-ground expertise to
              help you{" "}
              <strong style={{ color: brand.navy }}>
                sell property in Gurgaon
              </strong>{" "}
              at the right value and within the right timeframe.
            </p>
          </div>

          {/* 4-column icon cards — matching screenshot layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white rounded-3xl p-8 text-center border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default"
                style={{ border: "1px solid #e8e0d6" }}
              >
                {/* Icon circle */}
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${brand.gold}18` }}
                >
                  <Icon size={28} color={brand.gold} />
                </div>
                <h4
                  className="font-semibold text-base mb-3 leading-snug"
                  style={{ color: brand.navy }}
                >
                  {title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — Process Steps (timeline like screenshot)
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white border-t"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Step-by-Step
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold"
              style={{ color: brand.navy }}
            >
              How to Sell Property in Gurgaon – Our Process
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-8 left-0 right-0 h-px"
              style={{ backgroundColor: `${brand.gold}40` }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
              {processSteps.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 shadow"
                    style={{
                      backgroundColor: "#fff",
                      border: `2px solid ${brand.gold}`,
                    }}
                  >
                    <Icon size={24} color={brand.gold} />
                  </div>

                  {/* Step number */}
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: brand.gold }}
                  >
                    Step {i + 1}
                  </p>

                  {/* Step title */}
                  <h4
                    className="font-semibold text-[15px] mb-2 leading-snug"
                    style={{ color: brand.navy }}
                  >
                    {title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — Areas Table (styled like screenshot)
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Coverage Map
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Areas Where We Help You Sell Property in Gurgaon
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-[15px] leading-relaxed">
              We deal in premium residential and commercial locations across
              Gurgaon (Gurugram), helping property owners connect with serious
              buyers and achieve the best value.
            </p>
          </div>

          {/* Styled table */}
          <div
            className="overflow-hidden rounded-3xl shadow-md bg-white"
            style={{ border: "1px solid #e8e0d6" }}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ backgroundColor: brand.gold }}>
                  <th className="px-7 py-5 text-white font-semibold text-sm uppercase tracking-wider">
                    Residential Areas
                  </th>
                  <th className="px-7 py-5 text-white font-semibold text-sm uppercase tracking-wider">
                    Property Segments
                  </th>
                </tr>
              </thead>
              <tbody>
                {areaRows.map(({ area, segment }, i) => (
                  <tr
                    key={i}
                    className="border-b transition-colors duration-200"
                    style={{ borderColor: "#f0ebe4" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = `${brand.gold}0d`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td
                      className="px-7 py-4 text-[15px]"
                      style={{ color: brand.navy }}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin
                          size={14}
                          color={brand.gold}
                          className="shrink-0"
                        />
                        {area}
                      </span>
                    </td>
                    <td className="px-7 py-4 text-[15px] text-gray-600">
                      {segment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="text-center mt-8 text-[15px]"
            style={{ color: brand.navy }}
          >
            No matter the property type, we help you{" "}
            <strong>sell property in Gurgaon</strong> faster and more
            efficiently.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — Right Time to Sell
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white border-t"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Market Timing
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-5 leading-tight"
              style={{ color: brand.navy }}
            >
              When is the Right Time to Sell Property in Gurgaon?
            </h2>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
              The Gurgaon (Gurugram) real estate market is dynamic and
              influenced by infrastructure development, demand trends, and
              location growth. Selling at the right time with proper pricing and
              marketing can significantly impact your returns.
            </p>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              With increasing demand and ongoing developments, now is a strong
              opportunity to{" "}
              <strong style={{ color: brand.navy }}>
                sell your property in Gurgaon
              </strong>{" "}
              with the right strategy and expert support.
            </p>
          </div>

          {/* Right: stat highlights */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Rising Demand",
                sub: "Consistent buyer interest across all segments",
              },
              {
                label: "Infrastructure Growth",
                sub: "Metro, expressways & new sector development",
              },
              {
                label: "Strong Appreciation",
                sub: "Premium zones showing steady price growth",
              },
              {
                label: "2026 Outlook",
                sub: "One of the best years to sell in Gurugram",
              },
            ].map(({ label, sub }) => (
              <div
                key={label}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "#f7f5f2",
                  border: "1px solid #e8e0d6",
                }}
              >
                <span
                  className="inline-block text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full mb-3"
                  style={{
                    backgroundColor: `${brand.gold}22`,
                    color: brand.gold,
                  }}
                >
                  Now
                </span>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: brand.navy }}
                >
                  {label}
                </p>
                <p className="text-xs text-gray-500 leading-snug">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — FAQs
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Got Questions?
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              FAQs – Sell Property in Gurgaon
            </h2>
            <p className="text-gray-500 text-[15px] max-w-xl leading-relaxed">
              Everything you need to know before selling your property in
              Gurgaon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                index={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 7 — CTA Banner
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: brand.navy, borderColor: brand.navy }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: `${brand.gold}40` }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: brand.gold }}
            />
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: `${brand.gold}40` }}
            />
          </div>

          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: brand.gold }}
          >
            Sell with Confidence
          </p>

          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Thinking of Selling Your Property in Gurgaon?
          </h2>

          <p className="text-white/65 text-[15px] leading-relaxed max-w-2xl">
            If you are planning to{" "}
            <strong style={{ color: brand.gold }}>
              sell property in Gurgaon
            </strong>
            , having the right partner makes all the difference.{" "}
            <strong style={{ color: brand.gold }}>Crownpoint Estates</strong>{" "}
            ensures proper pricing, targeted marketing, and access to verified
            buyers to help you close deals faster. Let our team handle
            everything while you focus on your next move.
          </p>

          <p className="text-white/50 text-sm">
            Talk to an expert today and get started.
          </p>

          <button
            onClick={() => setOpenPopup(true)}
            className="click-btn btn-style5 mt-2"
          >
            Sell Your Property in Gurgaon
          </button>
        </div>
      </section>

      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
      <Footer />
    </>
  );
}
