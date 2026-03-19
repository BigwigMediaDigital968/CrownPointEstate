"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Why is Gurgaon real estate so expensive?",
    answer: (
      <>
        <p>
          Gurgaon is one of the fastest-growing real estate markets due to its
          strong corporate presence, modern infrastructure, and high demand for
          both <b>residential properties in Gurgaon</b> and{" "}
          <b>commercial properties in Gurgaon</b>. Prime locations like Golf
          Course Road and DLF Phase 1-5 contribute to higher property values.
        </p>
      </>
    ),
  },
  {
    id: 2,
    question:
      "Does Crownpoint Estates help in buying residential properties in Gurgaon?",
    answer: (
      <>
        <p>
          Yes, as a trusted <b>property dealer in Gurgaon</b>, Crownpoint
          Estates helps buyers find verified{" "}
          <b>residential properties in Gurgaon</b>
          with complete support, including site visits, price negotiation, and
          legal documentation.
        </p>
      </>
    ),
  },
  {
    id: 3,
    question: "Which locations in Gurgaon  do you deal in?",
    answer: (
      <>
        <p>
          We deal in all prime areas including DLF Phase 1–5, Golf Course Road,
          Golf Course Extension Road, Sohna Road, Dwarka Expressway, and Sushant
          Lok, offering a wide range of{" "}
          <b>residential and commercial properties in Gurgaon</b>.
        </p>
      </>
    ),
  },
  {
    id: 4,
    question: "Is Gurgaon a good location for property investment?",
    answer: (
      <>
        <p>
          Yes, Gurgaon is a top investment destination due to its strong
          infrastructure, corporate hubs, and high rental demand. Working with
          an experienced <b>property consultant in Gurgaon</b> helps you
          identify high-growth areas and make profitable investments.
        </p>
      </>
    ),
  },
  {
    id: 5,
    question: "Which locality is best to buy property in Gurgaon?",
    answer: (
      <>
        <p>
          The best locality depends on your budget and purpose. Areas like Golf
          Course Road and DLF Phase 1–5 are ideal for premium living, while
          Sohna Road and New Gurgaon offer affordable options with strong future
          growth for <b>property buyers in Gurgaon</b>.
        </p>
      </>
    ),
  },
  {
    id: 6,
    question: "Is it a good time to buy property in Gurgaon?",
    answer: (
      <>
        <p>
          Yes, with continuous infrastructure development and rising demand, it
          is a favorable time to invest in <b>Gurgaon real estate</b>. Early
          investment in emerging sectors can provide better appreciation and
          returns.
        </p>
      </>
    ),
  },
  {
    id: 7,
    question: "Where should I invest in Gurgaon for better returns?",
    answer: (
      <>
        <p>
          For better returns, investors can consider areas like Dwarka
          Expressway, Golf Course Extension Road, and New Gurgaon. These
          locations offer strong growth potential for both{" "}
          <b>residential and commercial properties in Gurgaon</b>.
        </p>
      </>
    ),
  },
  {
    id: 8,
    question: "What is the RERA Act 2016 and how does it benefit buyers?",
    answer: (
      <>
        <p>
          The RERA Act 2016 ensures transparency and accountability in real
          estate transactions. As a professional{" "}
          <b>property dealer in Gurugram</b>, we deal in RERA-compliant projects
          to protect buyers’ interests and ensure safe investments.
        </p>
      </>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default or null? "Only one FAQ open at a time" - standard is often first open or all closed. I'll start with first open.

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="w-11/12 md:w-5/6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header Section - Left Side (or Top on Mobile) */}
          <div className="lg:col-span-4" data-aos="fade-right">
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
              Common Questions
            </p>
            <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8">
              Find answers to common questions about buying, selling, and
              leasing property in gurgaon .
            </p>
          </div>

          {/* Accordion Section - Right Side */}
          <div className="lg:col-span-8" data-aos="fade-up">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "shadow-md bg-gray-50" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={openIndex === index}
                  >
                    <h3
                      className={`font-semibold text-lg ${openIndex === index ? "text-[var(--primary-color)]" : "text-[var(--primary-bg)]"}`}
                    >
                      {faq.question}
                    </h3>
                    <span
                      className={`ml-4 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                    >
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-[var(--primary-color)]" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
