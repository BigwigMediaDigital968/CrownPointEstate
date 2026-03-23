"use client";

import {
  Building2,
  Home,
  Network,
  ShieldCheck,
  CheckCircle2,
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

export function WhyChooseSectionLease() {
  return (
    <>
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
              Why Choose Crownpoint Estates for Leasing?
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed mb-6">
              Crownpoint Estates -{" "}
              <a className="underline" href="https://crownpointestates.com">
                Property Dealer in Gurgaon
              </a>{" "}
              helps clients find the right property for lease in Gurgaon with a
              focus on transparency and reliability. With deep knowledge of the
              Gurgaon real estate market, we assist both tenants and property
              owners in making informed decisions.
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
    </>
  );
}
