"use client";

import { Phone, Mail } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export default function FloatingContactActions() {
  return (
    <>
      {/* MOBILE CONTACT BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t shadow-[0_-6px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 text-center">
          
          <a
            href="tel:+919811556625"
            className="flex flex-col items-center justify-center py-3 text-[var(--primary)]"
          >
            <Phone size={20} />
            <span className="text-xs mt-1 font-medium">Call</span>
          </a>

          <a
            href="https://wa.me/9810786375"
            className="flex flex-col items-center justify-center py-3 text-[var(--accent)]"
            target="_blank"
          >
            <BsWhatsapp size={20} />
            <span className="text-xs mt-1 font-medium">WhatsApp</span>
          </a>

          <a
            href="mailto:sales@crownpointestates.com"
            className="flex flex-col items-center justify-center py-3 text-[var(--primary)]"
          >
            <Mail size={20} />
            <span className="text-xs mt-1 font-medium">Email</span>
          </a>

        </div>
      </div>

      {/* DESKTOP FLOATING ACTIONS */}
      <div className="hidden md:block fixed bottom-6 right-1/2 translate-x-1/2 z-50">
        <div className="flex items-center gap-5 bg-[var(--primary)] px-6 py-3 rounded-full shadow-lg">
          
          <a
            href="tel:+919811556625"
            className="text-white hover:text-[var(--secondary)] transition"
            aria-label="Call"
          >
            <Phone size={18} />
          </a>

          <a
            href="https://wa.me/9810786375"
            className="text-white hover:text-[var(--accent)] transition"
            aria-label="WhatsApp"
            target="_blank"
          >
            <BsWhatsapp size={18} />
          </a>

          <a
            href="mailto:sales@crownpointestates.com"
            className="text-white hover:text-[var(--secondary)] transition"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>

        </div>
      </div>
    </>
  );
}
