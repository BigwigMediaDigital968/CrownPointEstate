"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Home,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import img1 from "../../assets/h8_bg2.jpg";
import img2 from "../../assets/h8_pic5.jpg";
import img3 from "../../assets/h8_bg2.jpg";

const features = [
  {
    title: "High quality products",
    desc: "The luxurious and exquisite design harmonious with the surrounding architecture provide optimal comfort, modernity and the best living conditions for every family.",
    icon: Building2,
    image: img1,
  },
  {
    title: "Smart living spaces",
    desc: "Thoughtfully planned homes with intelligent layouts, natural light and efficient use of space.",
    icon: Home,
    image: img2,
  },
  {
    title: "Safe & secure communities",
    desc: "Advanced security systems and well-planned infrastructure ensure peace of mind for families.",
    icon: ShieldCheck,
    image: img3,
  },
];

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const current = features[active];
  const Icon = current.icon;

  const prev = () => setActive((p) => (p === 0 ? features.length - 1 : p - 1));
  const next = () => setActive((p) => (p === features.length - 1 ? 0 : p + 1));

  return (
    <section className="relative py-16 overflow-hidden">
      {/* HEADER */}
      <div className="w-11/12 md:w-5/6 mx-auto mb-8">
        <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
          Why choose us
        </p>
        <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
          Making living spaces affordable
        </h2>
      </div>

      {/* LAYOUT */}
      <div className="relative w-full lg:w-[92%]">
        {/* RIGHT COLOR PANEL */}
        <div className="hidden lg:block absolute right-0 top-0 w-[55%] h-[640px] bg-[#faf9f7]" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:h-[640px] items-center">
          {/* IMAGE (OVERLAPS COLOR PANEL) */}
          <div className="relative z-10 h-[300px] md:h-[420px] lg:h-[520px]">
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
            <div className="px-8 md:px-14 py-20 max-w-lg">
              <div className="mb-6 text-[var(--primary-color)]">
                <Icon size={40} strokeWidth={1.5} />
              </div>

              <h3 className="font-heading text-2xl text-[var(--primary-bg)] mb-4">
                {current.title}
              </h3>

              <p className="text-gray-600 mb-10 leading-relaxed">
                {current.desc}
              </p>

              {/* CONTROLS */}
              <div className="flex gap-4">
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
  );
}
