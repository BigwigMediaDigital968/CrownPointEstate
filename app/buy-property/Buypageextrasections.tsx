"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Home,
  Network,
  ShieldCheck,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const brand = { navy: "#173e62", gold: "#b59a78" };

/* ─── DATA ─── */
const features = [
  {
    title: "10+ Years of Experience in Gurgaon Real Estate",
    desc: "With over a decade of experience, we understand micro-markets, price trends, and high-growth investment zones.",
    icon: Building2,
  },
  {
    title: "End-to-End Property Assistance",
    desc: "From property shortlisting and site visits to negotiation and final registration, we manage every step professionally.",
    icon: Home,
  },
  {
    title: "RERA Registered Property Dealer in Gurugram",
    desc: "We follow all regulatory guidelines and ensure complete legal due diligence for every transaction.",
    icon: Network,
  },
  {
    title: "Verified Listings & Strong Buyer Network",
    desc: "As a trusted property dealer in Gurugram, we provide access to genuine listings and serious buyers.",
    icon: ShieldCheck,
  },
];

const stats = [
  { value: 49, suffix: "+", label: "Completed projects" },
  { value: 19, suffix: "+", label: "Projects underway" },
  { value: 21, suffix: "", label: "Green buildings under construction" },
  { value: 115, suffix: "", label: "Joint ventures completed" },
];

const testimonials = [
  {
    id: 1,
    text: "Crownpoint Estates is one of the best property dealers in Gurgaon I have worked with. Their team understood my requirements clearly and helped me find the perfect home in a prime location.",
    name: "Vansh Verma",
    initial: "V",
  },
  {
    id: 2,
    text: "One of the finest property dealers in Gurgaon! They showed me multiple options and ensured I got the best value for my investment.",
    name: "Sourabh Chakraborty",
    initial: "S",
  },
  {
    id: 3,
    text: "Crownpoint Estates helped me get a great deal on a builder floor. Their market knowledge makes them the best property dealers in Gurgaon today.",
    name: "Abhay Das",
    initial: "A",
  },
  {
    id: 4,
    text: "Amazing experience with Crown point Estates! Truly the best real estate dealer in Gurgaon for luxury properties and smooth documentation.",
    name: "Narayan Sharma",
    initial: "N",
  },
  {
    id: 5,
    text: "Had a very good experience with this company. The team is highly professional, the service they provide is excellent, and all dealings are completely transparent, which builds a lot of trust.",
    name: "Subrato Verma",
    initial: "S",
  },
  {
    id: 6,
    text: "Very satisfied with their service. Crownpoint Estates is a very reliable property dealer in Gurgaon, offering genuine listings and accurate pricing.",
    name: "Kailash Rajpoot",
    initial: "K",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SECTION A — Why Choose Crownpoint Estates
═══════════════════════════════════════════════════════════════════ */
export function WhyChooseSection() {
  return (
    <section
      className="py-20 border-t"
      style={{ backgroundColor: brand.navy, borderColor: brand.navy }}
    >
      <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: brand.gold }}
          >
            Your Trusted Partner
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
            Why Choose Crownpoint Estates?
          </h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-6">
            Crownpoint Estates —{" "}
            <strong style={{ color: brand.gold }}>
              Property Dealer in Gurgaon
            </strong>{" "}
            — helps you find the best property in Gurgaon with ease and
            confidence. Our expertise helps you make confident and well-informed
            property decisions.
          </p>
          <p className="text-white/50 text-sm italic">We offer:</p>
        </div>

        {/* Right: Offerings */}
        <div className="space-y-4">
          {[
            "Verified and trusted property listings",
            "Deep knowledge of Gurugram real estate",
            "End-to-end assistance from search to registration",
            "Best deals in residential and commercial properties",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <CheckCircle2
                size={20}
                color={brand.gold}
                className="shrink-0 mt-0.5"
              />
              <p className="text-white/85 text-[15px] leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION B — Features + Stats
═══════════════════════════════════════════════════════════════════ */
export function FeaturesSection() {
  return (
    <section
      className="py-20 border-t"
      style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
    >
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Heading */}
        <div className="mb-12">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: brand.gold }}
          >
            Our Edge
          </p>
          <h2
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
            style={{ color: brand.navy }}
          >
            What Sets Us Apart
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {features.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col"
              style={{ border: "1px solid #e8e0d6" }}
            >
              {/* Image */}
              <div className="relative h-16 w-full overflow-hidden">
                {/* Icon badge */}
                <div
                  className="absolute top-6 left-6 w-10 h-10 rounded-xl flex items-center justify-center shadow"
                  style={{ backgroundColor: brand.navy }}
                >
                  <Icon size={18} color={brand.gold} />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1">
                <h3
                  className="font-heading font-bold text-lg mb-2 leading-snug"
                  style={{ color: brand.navy }}
                >
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {typeof desc === "string" ? desc : desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          className="rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-0 overflow-hidden"
          style={{ backgroundColor: brand.navy }}
        >
          {stats.map(({ value, suffix, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
              style={{
                borderRight:
                  i < stats.length - 1
                    ? "1px solid rgba(255,255,255,0.10)"
                    : "none",
              }}
            >
              <p
                className="font-heading text-4xl md:text-5xl font-bold mb-1"
                style={{ color: brand.gold }}
              >
                {value}
                {suffix}
              </p>
              <p className="text-white/60 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION C — Testimonials
═══════════════════════════════════════════════════════════════════ */
export function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      className="py-20 bg-white border-t"
      style={{ borderColor: "#e8e0d6" }}
    >
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Client Stories
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold"
              style={{ color: brand.navy }}
            >
              Trusted by Homebuyers Across Gurgaon
            </h2>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
              style={{ borderColor: brand.navy, color: brand.navy }}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-400">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
              style={{ borderColor: brand.navy, color: brand.navy }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(({ id, text, name, initial }) => (
            <div
              key={id}
              className="relative flex flex-col rounded-3xl p-7"
              style={{
                backgroundColor: "#faf8f5",
                border: "1px solid #e8e0d6",
              }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-5 right-7 font-heading text-6xl leading-none select-none pointer-events-none"
                style={{ color: `${brand.gold}30` }}
              >
                "
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill={brand.gold}
                    color={brand.gold}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                "{text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
                  style={{ backgroundColor: brand.navy }}
                >
                  {initial}
                </div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: brand.navy }}
                  >
                    {name}
                  </p>
                  <p className="text-xs text-gray-400">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === page ? "24px" : "8px",
                backgroundColor: i === page ? brand.gold : "#d1c5b8",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
