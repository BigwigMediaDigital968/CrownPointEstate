"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2 } from "lucide-react";

const brand = { navy: "#173e62", gold: "#b59a78" };

/* ─── DATA ─── */
const steps = [
  "Define your budget and preferred location",
  "Explore and shortlist properties",
  "Verify legal documents and approvals",
  "Arrange financing or home loan",
  "Finalize and book the property",
  "Complete registration and possession",
];

const faqs = [
  {
    q: "Is it worth buying a property in Gurgaon?",
    a: "Yes, it is worth it to buy property in Gurgaon as the city offers strong appreciation, modern infrastructure, and high rental demand, making it ideal for both homebuyers and investors.",
  },
  {
    q: "Why is Gurgaon a preferred location for buying property?",
    a: "Gurgaon (Gurugram) is a preferred destination to buy property in Gurgaon due to its corporate hubs, excellent connectivity, and wide range of properties for sale in Gurgaon across all budgets.",
  },
  {
    q: "Which are the best areas to buy property in Gurgaon?",
    a: "Some of the best areas to buy property in Gurgaon include Golf Course Road, DLF Phase 1–5, Sohna Road, Dwarka Expressway, and New Gurgaon sectors.",
  },
  {
    q: "What types of properties are available in Gurgaon?",
    a: "You can find various types of property in Gurgaon, including apartments, builder floors, villas, plots, and commercial spaces like office and retail properties.",
  },
  {
    q: "Is it a good time to invest in Gurgaon real estate in 2026?",
    a: "Yes, 2026 is a great time to buy property in Gurgaon, as infrastructure growth and demand are expected to increase property value and investment returns.",
  },
  {
    q: "Should I buy a ready-to-move or under-construction property in Gurgaon?",
    a: "When planning to buy property in Gurgaon, ready-to-move homes offer immediate possession, while under-construction properties may provide better pricing and future appreciation.",
  },
  {
    q: "What is the average property price in Gurgaon?",
    a: "The average property price in Gurgaon varies by location, with affordable options in developing sectors and premium properties for sale in Gurgaon in areas like Golf Course Road.",
  },
  {
    q: "Where can I buy property in Gurgaon under ₹1 crore?",
    a: "You can buy property in Gurgaon under ₹1 crore in areas like New Gurgaon, Sohna, and selected sectors along Dwarka Expressway.",
  },
  {
    q: "What is the price of 2 BHK, 3 BHK, and 4 BHK flats in Gurgaon?",
    a: "Prices of flats and property in Gurgaon depend on location and amenities, with 2 BHK options in budget segments and 3/4 BHK homes in mid to premium ranges.",
  },
  {
    q: "Which areas in Gurgaon offer the highest rental returns?",
    a: "Top areas for rental income from property in Gurgaon include Golf Course Road, Cyber City, Sohna Road, and Dwarka Expressway.",
  },
  {
    q: "Are resale properties in Gurgaon cheaper than new projects?",
    a: "Resale properties for sale in Gurgaon can be more affordable and ready-to-move, while new projects offer modern amenities and flexible payment options.",
  },
  {
    q: "Which areas in Gurgaon have the fastest price appreciation?",
    a: "If you want to buy property in Gurgaon for investment, Dwarka Expressway, New Gurgaon, and Golf Course Extension Road offer strong appreciation potential.",
  },
  {
    q: "Are there ready-to-move properties available in Gurgaon?",
    a: "Yes, there are many ready-to-move properties for sale in Gurgaon available across residential and commercial segments.",
  },
  {
    q: "What documents are required to buy property in Gurgaon?",
    a: "To buy property in Gurgaon, you need documents such as sale deed, title deed, RERA registration, and identity proof.",
  },
  {
    q: "How do I verify if a property in Gurgaon is RERA registered?",
    a: "You can verify any property in Gurgaon on the Haryana RERA website to ensure it is legally approved and safe to invest in.",
  },
  {
    q: "Can NRIs buy property in Gurgaon?",
    a: "Yes, NRIs can legally buy property in Gurgaon, including residential and commercial properties, under RBI guidelines.",
  },
  {
    q: "How can I finance my property purchase in Gurgaon?",
    a: "You can finance your property in Gurgaon through home loans offered by banks and NBFCs based on your eligibility.",
  },
  {
    q: "What are the stamp duty and registration charges in Gurgaon?",
    a: "Stamp duty and registration charges for property in Gurgaon depend on the property value and ownership type.",
  },
  {
    q: "Are there tax benefits for buying property in Gurgaon?",
    a: "Yes, when you buy property in Gurgaon, you can claim tax benefits on home loan interest and principal repayment.",
  },
  {
    q: "Is Gurgaon suitable for rental income investment?",
    a: "Yes, investing in property in Gurgaon is ideal for rental income due to high demand from professionals and corporate employees.",
  },
  {
    q: "Can I buy property in Gurgaon jointly with a family member?",
    a: "Yes, you can jointly buy property in Gurgaon, which can also offer additional financial and tax benefits.",
  },
  {
    q: "How can Crownpoint Estates help me buy property in Gurgaon?",
    a: "Crownpoint Estates helps you buy property in Gurgaon by providing verified listings, expert advice, and end-to-end support for all properties for sale in Gurgaon.",
  },
];

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
        {/* Number badge */}
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

      {/* Answer */}
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
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function BuyPropFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* ══════════════════════════════════════════════════════════
          SECTION A — How to Buy Property in Gurgaon
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Heading + intro */}
          <div className="lg:sticky lg:top-28">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Step-by-Step Guide
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-5 leading-tight"
              style={{ color: brand.navy }}
            >
              How to Buy Property in Gurgaon
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              If you are planning to{" "}
              <strong style={{ color: brand.navy }}>
                buy property in Gurgaon
              </strong>
              , following a structured process can make your journey smooth.
            </p>

            {/* Closing note */}
            <div
              className="rounded-2xl px-6 py-5 border-l-4 text-sm italic"
              style={{
                backgroundColor: `${brand.gold}0d`,
                borderLeftColor: brand.gold,
                color: brand.navy,
              }}
            >
              Our team supports you at every step of your property buying
              journey.
            </div>
          </div>

          {/* Right: Steps */}
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[19px] top-6 bottom-6 w-px"
              style={{ backgroundColor: `${brand.gold}40` }}
            />

            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-5">
                  {/* Step circle */}
                  <div
                    className="relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow"
                    style={{ backgroundColor: brand.navy }}
                  >
                    <span style={{ color: brand.gold }}>{i + 1}</span>
                  </div>

                  <div
                    className="flex-1 rounded-2xl px-5 py-4"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #e8e0d6",
                    }}
                  >
                    <p className="text-gray-800 text-[15px] font-medium leading-snug">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION B — FAQs
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white border-t"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* Heading */}
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
              FAQs – Buy Property in Gurgaon
            </h2>
            <p className="text-gray-500 text-[15px] max-w-xl leading-relaxed">
              Everything you need to know before making a property decision in
              Gurgaon.
            </p>
          </div>

          {/* Accordion — two columns on large screens */}
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
          SECTION C — CTA Banner
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: brand.navy, borderColor: brand.navy }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto flex flex-col items-center text-center gap-8">
          {/* Decorative top rule */}
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
            Start Your Journey
          </p>

          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Explore the Best Properties for Sale in Gurgaon
          </h2>

          <p className="text-white/65 text-[15px] leading-relaxed max-w-xl">
            Ready to buy property in Gurgaon? Explore verified listings with{" "}
            <strong style={{ color: brand.gold }}>Crownpoint Estates</strong>{" "}
            and find your ideal home or investment opportunity. Discover the
            best properties for sale in Gurgaon with expert guidance and trusted
            support.
          </p>

          {/* CTA Button — btn-style5 */}
          <Link href="/contact" className="click-btn btn-style5 mt-2">
            Buy Property in Gurgaon
          </Link>
        </div>
      </section>
    </div>
  );
}
