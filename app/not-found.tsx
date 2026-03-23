"use client";

import Link from "next/link";

import { Home, ArrowRight, Phone } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const quickLinks = [
  { label: "Buy Property", href: "/buy-property" },
  { label: "Rent Property", href: "/rent-property" },
  { label: "Lease Property", href: "/lease-property" },
  { label: "Sell Property", href: "/sell-property" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main
        className="relative min-h-screen overflow-hidden flex items-center justify-center py-24"
        style={{ backgroundColor: "#0e2a42" }}
      >
        {/* ── Background architectural grid ── */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* Horizontal lines */}
          {[15, 35, 55, 75, 90].map((y) => (
            <div
              key={y}
              className="absolute w-full h-px"
              style={{
                top: `${y}%`,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(181,154,120,0.08) 30%, rgba(181,154,120,0.08) 70%, transparent 100%)",
              }}
            />
          ))}
          {/* Vertical lines */}
          {[10, 25, 50, 75, 90].map((x) => (
            <div
              key={x}
              className="absolute h-full w-px"
              style={{
                left: `${x}%`,
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(181,154,120,0.08) 30%, rgba(181,154,120,0.08) 70%, transparent 100%)",
              }}
            />
          ))}

          {/* Large ghost "404" watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center font-heading font-bold select-none"
            style={{
              fontSize: "clamp(180px, 35vw, 420px)",
              color: "rgba(181,154,120,0.04)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            404
          </div>

          {/* Decorative corner marks */}
          {[
            "top-12 left-12",
            "top-12 right-12",
            "bottom-12 left-12",
            "bottom-12 right-12",
          ].map((pos) => (
            <div key={pos} className={`absolute ${pos} w-8 h-8`}>
              <div
                className="absolute top-0 left-0 w-full h-px"
                style={{ backgroundColor: "rgba(181,154,120,0.3)" }}
              />
              <div
                className="absolute top-0 left-0 h-full w-px"
                style={{ backgroundColor: "rgba(181,154,120,0.3)" }}
              />
            </div>
          ))}
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-10 w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Typographic block */}
          <div>
            {/* Gold rule + eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-10 h-px"
                style={{ backgroundColor: "#b59a78" }}
              />
              <p
                className="text-xs uppercase tracking-[0.4em] font-semibold"
                style={{ color: "#b59a78" }}
              >
                Page Not Found
              </p>
            </div>

            {/* 404 number */}
            <div
              className="font-heading font-bold leading-none mb-4"
              style={{
                fontSize: "clamp(80px, 14vw, 160px)",
                color: "#173e62",
                WebkitTextStroke: "2px #b59a78",
                letterSpacing: "-0.04em",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              404
            </div>

            {/* Heading */}
            <h1
              className="font-heading font-bold leading-tight mb-5"
              style={{
                fontSize: "clamp(24px, 3.5vw, 40px)",
                color: "#ffffff",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              This Property Doesn't Exist
            </h1>

            {/* Description */}
            <p
              className="text-[15px] leading-relaxed mb-8 max-w-md"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              The page you're looking for may have been moved, removed, or never
              existed. Let us help you find the right property in Gurgaon.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#b59a78", color: "#fff" }}
              >
                <Home size={16} />
                Back to Home
              </Link>
              <a
                href="tel:+919811556625"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-300 hover:bg-white/5"
                style={{
                  borderColor: "rgba(181,154,120,0.5)",
                  color: "#b59a78",
                }}
              >
                <Phone size={16} />
                Call Us
              </a>
            </div>
          </div>

          {/* Right: Quick navigation panel */}
          <div>
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: "1px solid rgba(181,154,120,0.2)" }}
            >
              {/* Panel header */}
              <div
                className="px-8 py-6"
                style={{
                  backgroundColor: "rgba(181,154,120,0.1)",
                  borderBottom: "1px solid rgba(181,154,120,0.15)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.3em] mb-1"
                  style={{ color: "#b59a78" }}
                >
                  Where to Go
                </p>
                <p
                  className="text-white font-semibold text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Explore Our Properties
                </p>
              </div>

              {/* Links */}
              <div
                className="divide-y"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(181,154,120,0.1)",
                }}
              >
                {quickLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between px-8 py-5 group transition-all duration-200"
                    style={{ borderColor: "rgba(181,154,120,0.1)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(181,154,120,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <span
                      className="text-[15px] font-medium"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {label}
                    </span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "#b59a78" }}
                    />
                  </Link>
                ))}
              </div>

              {/* Contact strip */}
              <div
                className="px-8 py-5 flex items-center justify-between"
                style={{
                  backgroundColor: "#173e62",
                  borderTop: "1px solid rgba(181,154,120,0.2)",
                }}
              >
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-0.5"
                    style={{ color: "rgba(181,154,120,0.7)" }}
                  >
                    Need Help?
                  </p>
                  <p className="text-white text-sm font-semibold">
                    +91 98115 56625
                  </p>
                </div>
                <a
                  href="tel:+919811556625"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: "#b59a78", color: "#fff" }}
                >
                  <Phone size={13} />
                  Call Now
                </a>
              </div>
            </div>

            {/* Bottom note */}
            <p
              className="text-center mt-6 text-xs"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Crownpoint Estates · Property Dealer in Gurgaon
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
