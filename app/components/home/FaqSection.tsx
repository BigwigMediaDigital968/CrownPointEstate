"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Why is Gurgaon real estate so expensive?",
    answer:
      "Gurugram real estate is expensive due to continuous government and private-sector investment, rapid infrastructure development, proximity to Delhi, and the presence of corporate hubs like Cyber City and Golf Course Road. High demand for quality housing and commercial spaces also drives property prices. Consulting an experienced property dealer in Gurugram helps buyers make informed and value-driven decisions.",
  },
  {
    id: 2,
    question: "Does Crownpoint Estate help in buying residential in Gurugram?",
    answer:
      "Absolutely. As a professional property dealer in Gurugram, we assist clients in buying apartments, villas, and investment properties with complete support from site visits to documentation.",
  },
  {
    id: 3,
    question: "Which locations in Gurugram do you deal in?",
    answer:
      "We deal in all prime locations including DLF Phase 1–5, Golf Course Road, Golf Course Extension Road, Sohna Road, New Gurgaon, and major residential and commercial sectors.",
  },
  {
    id: 4,
    question: "Is Gurugram a good location for property investment?",
    answer:
      "Yes, Gurugram is one of India’s fastest-growing real estate markets with strong infrastructure, corporate hubs, and high rental demand, making it ideal for long-term investments.",
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
              Find answers to common questions about buying, selling, and leasing property in Gurugram.
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
                    <span className={`font-semibold text-lg ${openIndex === index ? "text-[var(--primary-color)]" : "text-[var(--primary-bg)]"}`}>
                      {faq.question}
                    </span>
                    <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
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
