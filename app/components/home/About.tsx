"use client";

import Image from "next/image";
import bgImg from "../../assets/about/bg-pattern.png";
import leftImg from "../../assets/about/about-left.jpg";
import rightImg from "../../assets/about/about-right.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";

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
    <section className="relative overflow-hidden">
      {/* ================= TOP BG SECTION ================= */}
      <div className="relative w-full lg:w-[60%] h-[260px] md:h-[260px] lg:h-[300px]">
        <Image src={bgImg} alt="Background" fill className="object-cover" />

        {/* TEXT OVER BG */}
        <div className="relative z-10 w-11/12 md:w-5/6 mx-auto h-full flex items-center">
          <div className="max-w-xl" data-aos="fade-up" data-aos-delay="100">
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
              Who we are
            </p>

            <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
          </div>
        </div>
      </div>

      {/* ================= MOBILE / TABLET SIMPLE IMAGE ================= */}
      <div
        className="block lg:hidden w-full"
        data-aos="zoom-in"
        data-aos-delay="150"
      >
        <Image
          src={leftImg}
          alt="Architecture"
          className="w-full h-[280px] object-cover"
        />
      </div>

      {/* ================= BOTTOM CONTENT SECTION ================= */}
      <div className="relative bg-[#faf9f7] w-full lg:w-[90%]">
        {/* LEFT EDGE IMAGE (DESKTOP ONLY) */}
        <div
          className="absolute left-0 top-0 h-full w-[42%] hidden lg:block"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <Image
            src={leftImg}
            alt="Architecture"
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-11/12 md:w-5/6 mx-auto py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
            {/* EMPTY SPACE FOR LEFT IMAGE (DESKTOP) */}
            <div className="hidden lg:block" />

            {/* MISSION & VISION */}
            <div
              className="max-w-md space-y-10"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <div>
                <h4 className="text-lg font-semibold text-[#1e2d3b] mb-3">
                  Our mission
                </h4>
                <p className="text-gray-600 text-justify">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eveniet iste reprehenderit vero enim repellat! Culpa ea
                  quibusdam officia non mollitia.
                </p>
              </div>

              <div data-aos="fade-up" data-aos-delay="350">
                <h4 className="text-lg font-semibold text-[#1e2d3b] mb-3">
                  Our vision
                </h4>
                <p className="text-gray-600 text-justify">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
                  dicta unde sit repudiandae id distinctio sunt rem totam.
                </p>
              </div>
              <Link href="/about">
                <button
                  data-aos="zoom-in"
                  data-aos-delay="450"
                  className="mt-6 px-8 py-4 bg-[#c2a178] text-white text-sm tracking-widest hover:bg-[#b09168] transition cursor-pointer"
                >
                  MORE ABOUT US →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT FLOAT IMAGE (DESKTOP ONLY) ================= */}
      <div
        className="absolute right-0 top-28 hidden xl:block"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        <Image
          src={rightImg}
          alt="Luxury Building"
          className="w-[360px] h-[600px] shadow-xl"
        />
      </div>
    </section>
  );
}
