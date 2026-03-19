"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import PopupForm from "../Popup";

export default function PropertyCTA() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <section
      className="w-full py-16 px-6 md:px-12"
      style={{ background: "var(--primary-bg)" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
          Contact the Best Property Dealer in Gurgaon
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          Planning to buy, sell, lease, or invest? Connect with experienced
          Gurgaon real estate consultants for expert guidance and verified
          property options.
        </p>

        {/* Highlight line */}
        <p
          className="text-lg mb-8 font-medium"
          style={{ color: "var(--primary-color)" }}
        >
          Planning to buy, sell, or invest in property?
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setOpenPopup(true)}
          className="click-btn btn-style5"
        >
          Get in Touch
        </button>
      </div>

      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
    </section>
  );
}
