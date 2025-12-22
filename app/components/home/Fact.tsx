"use client";

import Image from "next/image";
import factsImg from "../../assets/h8_pic5.jpg";

export default function FactsSection() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* LEFT CONTENT CONTAINER */}
      <div className="w-11/12 md:w-5/6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT TEXT */}
          <div>
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
              The fact
            </p>

            <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)] mb-6">
              One of the leading real estate companies
            </h2>

            <p className="text-gray-600 max-w-lg mb-8 leading-relaxed">
              Our mission is to engage in issues that are of concern to
              individuals, families and communities through an uncompromising
              commitment to create outstanding living, work and leisure
              environments.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-y-12 gap-x-16 max-w-md">
              {[
                ["49+", "Completed projects"],
                ["19+", "Projects underway"],
                ["21", "Green buildings under construction"],
                ["115", "Joint ventures completed"],
              ].map(([num, label]) => (
                <div key={label}>
                  <h3 className="font-heading text-4xl text-[var(--primary-color)] mb-2">
                    {num}
                  </h3>
                  <p className="text-sm text-[var(--primary-bg)] font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* EMPTY COLUMN (DESKTOP) */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* RIGHT FULL-BLEED IMAGE */}
      <div className="hidden lg:block absolute top-0 right-0 h-full w-[45vw]">
        <Image
          src={factsImg}
          alt="Luxury residential entrance"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
