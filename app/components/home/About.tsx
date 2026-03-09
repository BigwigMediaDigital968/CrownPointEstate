"use client";

import Image from "next/image";
import bgImg from "../../assets/about/bg-pattern.png";
import leftImg from "../../assets/about/about-left.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import ButtonFill from "../ButtonFill";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#faf9f7] pt-20 md:pt-28">
      {/* ================= HERO IMAGE WITH OVERLAY ================= */}
      <div className="relative w-full py-10 md:py-14 px-6">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* Background Image */}
          {/* <Image
            src={leftImg}
            alt="Real Estate Architecture"
            fill
            priority
            className="object-cover"
          /> */}

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px]" />

          {/* Subtle Pattern */}
          <Image
            src={bgImg}
            alt="Pattern"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
          />
        </div>
      </div>

      {/* ================= FLOATING WHITE BLOCK ================= */}
      <div className="relative -mt-24 md:-mt-28 z-20">
        <div className="w-[92%] sm:w-[88%] md:w-[80vw] mx-auto px-4 sm:px-6">
          <div
            className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl p-8 md:p-14 border border-gray-100"
            data-aos="fade-up"
          >
            {/* ===== TITLE ===== */}

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left Image */}
              <div
                className="relative h-[360px] md:h-[720px] rounded-xl overflow-hidden"
                data-aos="zoom-in"
              >
                <Image
                  src={leftImg}
                  alt="Luxury Property"
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Right Content */}
              <div className="space-y-6" data-aos="fade-left">
                <h2 className="font-heading text-2xl md:text-2xl leading-snug font-bold text-[var(--primary-bg)]  mb-8 ">
                  Property Dealer in Gurgaon – Trusted Real Estate Experts{" "}
                  <br className="hidden md:block" />
                  for Residential & Commercial Properties
                </h2>

                <p className="text-gray-600 text-justify leading-relaxed">
                  Looking for a reliable property dealer in gurgaon who
                  understands the local real estate ecosystem? We are trusted
                  real estate consultants in Gurgaon offering expert guidance
                  for residential and commercial properties.
                </p>

                <p className="text-gray-600 text-justify leading-relaxed">
                  With in-depth knowledge of the Gurgaon real estate market, we
                  help homebuyers, investors, NRIs, and businesses find verified
                  properties with complete transparency, legal clarity, and
                  long-term value.
                </p>

                <Link href="/about">
                  <ButtonFill
                    text="MORE ABOUT US →"
                    className="mt-4 min-h-[44px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-24 md:h-32" />
    </section>
  );
}
