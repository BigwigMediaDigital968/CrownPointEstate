"use client"; 

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";

import heroImg from "../assets/hero/about-us.svg"; // replace with your image
import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  RefreshCcw,
  KeyRound,
} from "lucide-react";
import img1 from "../assets/h8_bg2.jpg";
import img2 from "../assets/h8_pic5.jpg";
import img3 from "../assets/h8_bg2.jpg";

const features = [
  {
    title: "Fresh Booking",
    icon: Building2, // New projects & developers
    image: img1,
    points: [
      "Direct bookings with top developers",
      "Guidance on new launches and pre-launch opportunities",
      "Project comparisons and investment advisory",
    ],
  },
  {
    title: "Resale Services",
    icon: RefreshCcw, // Buy / sell / resale cycle
    image: img2,
    points: [
      "Buying and selling of pre-owned residential and commercial properties",
      "Accurate property valuation and market analysis",
      "End-to-end transaction support and negotiations",
    ],
  },
  {
    title: "Renting & Leasing",
    icon: KeyRound, // Keys = renting & possession
    image: img3,
    points: [
      "Residential rentals: apartments, builder floors, villas",
      "Commercial leasing: offices, retail spaces, shops",
      "Tenant screening, documentation, and agreement assistance",
    ],
  },
  {
    title: "Investment Advisory",
    icon: TrendingUp, // Growth & ROI
    image: img1,
    points: [
      "Real estate portfolio planning",
      "High-yield residential and commercial investment options",
      "Short-term and long-term investment strategies",
    ],
  },
];

export default function About() {
  const [active, setActive] = useState(0);
  const current = features[active];
  const Icon = current.icon;

  const prev = () => setActive((p) => (p === 0 ? features.length - 1 : p - 1));
  const next = () => setActive((p) => (p === features.length - 1 ? 0 : p + 1));
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
                About
              </h1>

              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">About</span>
              </p>
            </div>

            {/* RIGHT SIDE – QUICK ENQUIRY */}
            <div className="hidden lg:flex justify-end">
              <QuickEnquiry />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT INTRO SECTION ================= */}
      <section className="relative py-16  overflow-hidden">
        <div className="relative w-11/12 md:w-5/6 mx-auto">
          {/* ===== MOBILE / TABLET SIMPLE LAYOUT ===== */}
          <div className="block lg:hidden space-y-8">
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] font-heading">
              Who we are
            </p>

            <h2 className="font-heading text-3xl leading-snug font-bold text-[var(--primary-bg)]">
              Trusted Real Estate Consultants with Over 15 Years of Market
              Experience
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Crownpoint Estates is a trusted and established real estate
              consultancy firm based in Gurugram, serving clients across the
              Delhi NCR region. With over 15 years of industry experience, we
              specialize in guiding homebuyers, investors, landlords, and
              corporate clients through confident property decisions.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our expertise spans fresh bookings, resale transactions, and
              leasing across residential and commercial segments. Known for
              transparency, integrity, and personalised service, we act as a
              long-term real estate partner focused on value, clarity, and
              results.
            </p>
          </div>

          {/* ===== DESKTOP OFFSET PANEL LAYOUT ===== */}
          <div className="hidden lg:block relative">
            {/* BIG RIGHT PANEL */}
            <div className="relative ml-auto w-[65%] bg-[#f6f2ec] py-20 px-16">
              <div className="max-w-xl ml-auto space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Crownpoint Estates is a professional real estate consultancy
                  with deep-rooted market knowledge and over 15 years of
                  hands-on experience across Gurugram and Delhi NCR. We assist
                  clients in navigating complex property decisions with clarity,
                  confidence, and strategic insight.
                </p>

                <p>
                  Whether it is fresh bookings, resale opportunities, leasing,
                  or commercial real estate, our approach is driven by
                  transparency, ethical practices, and personalised guidance. We
                  focus on long-term value creation rather than short-term
                  transactions.
                </p>

                {/* HIGHLIGHTS */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  {[
                    "15+ years of real estate expertise",
                    "Residential & commercial advisory",
                    "Fresh bookings, resale & leasing",
                    "Transparent & client-first approach",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[var(--primary-color)] rounded-full" />
                      <p className="text-sm text-[var(--primary-bg)] font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SMALL LEFT PANEL (VERTICALLY CENTERED) */}
            <div
              className="
          absolute 
          top-1/2 
          -translate-y-1/2 
          left-0 
          w-[45%]
          bg-[#e7e0d4]
          px-14 
          py-12
          shadow-sm
        "
            >
              <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
                Who we are
              </p>

              <h2 className="font-heading text-4xl leading-snug font-bold text-[var(--primary-bg)]">
                Guiding Smart Property Decisions Across Gurugram & Delhi NCR
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#faf9f7]">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
            Our Core Values
          </p>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--primary-bg)] mb-12">
            Principles That Guide Every Client Relationship
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                desc: "Transparent dealings and honest guidance in every transaction.",
              },
              {
                title: "Commitment",
                desc: "Dedicated service backed by over 15 years of real estate expertise.",
              },
              {
                title: "Customer First",
                desc: "Solutions carefully tailored around client needs and long-term goals.",
              },
              {
                title: "Excellence",
                desc: "High standards in service delivery, advisory, and market knowledge.",
              },
              {
                title: "Reliability",
                desc: "Long-term relationships built on trust, consistency, and results.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 border border-gray-200 hover:shadow-md transition"
              >
                <h4 className="font-heading text-lg text-[var(--primary-bg)] mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 overflow-hidden">
        {/* HEADER */}
        <div className="w-11/12 md:w-5/6 mx-auto mb-8" data-aos="fade-up">
          <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
            Our Services
          </p>
          <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
            Expert Real Estate Solutions Tailored to Your Needs
          </h2>
        </div>

        {/* LAYOUT */}
        <div className="relative w-full lg:w-[92%]">
          {/* RIGHT COLOR PANEL */}
          <div
            className="hidden lg:block absolute right-0 top-0 w-[55%] h-[640px] bg-[#faf9f7]"
            data-aos="fade-up"
            data-aos-delay="150"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:h-[640px] items-center">
            {/* IMAGE */}
            <div
              className="relative z-10 h-[300px] md:h-[420px] lg:h-[520px]"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="relative z-0 flex items-center">
              <div
                className="px-8 md:px-14 py-20 max-w-lg"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div
                  className="mb-6 text-[var(--primary-color)]"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  <Icon size={40} strokeWidth={1.5} />
                </div>

                <h3 className="font-heading text-2xl text-[var(--primary-bg)] mb-4">
                  {current.title}
                </h3>

                <ul className="space-y-3 mb-10">
                  {current.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="w-2 h-2 mt-2 bg-[var(--primary-color)] rounded-full" />
                      <span className="leading-relaxed text-sm">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CONTROLS */}
                <div
                  className="flex gap-4"
                  data-aos="zoom-in"
                  data-aos-delay="500"
                >
                  <button
                    onClick={prev}
                    className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={next}
                    className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
