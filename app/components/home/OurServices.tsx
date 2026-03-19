"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { House, TrendingUp, FileSignature, Key } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Buy Property in Gurgaon",
    description: (
      <>
        <p>
          Looking to invest in <b>residential properties in Gurgaon</b> or
          commercial spaces? Crownpoint Estates, a trusted{" "}
          <b>property dealer in Gurgaon</b>, helps you find the right property
          at the best market value. <br /> <br /> From luxury apartments and
          builder floors to office spaces and retail units, we provide verified
          listings, expert insights, and complete support throughout the buying
          process.
        </p>
      </>
    ),
    link: "/buy-property",
    icon: House,
  },
  {
    id: 2,
    title: "Sell Property in Gurgaon",
    description: (
      <>
        <p>
          If you want to sell your property at the best price, working with an
          experienced <b>property dealer in Gurgaon</b> is essential. We help
          property owners connect with verified buyers and close deals faster.
          <br /> <br /> Our approach includes accurate pricing, targeted
          marketing, and complete assistance from listing to final registration.
        </p>
      </>
    ),
    link: "/sell-property",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Lease Property in Gurgaon",
    description: (
      <>
        <p>
          We help property owners lease residential and commercial spaces to
          verified tenants. As a reliable <b>property consultant in Gurgaon</b>,
          we ensure maximum rental value, minimal vacancy, and smooth
          documentation.
        </p>
      </>
    ),
    link: "/lease-property",
    icon: FileSignature,
  },
  {
    id: 4,
    title: "Rent Property in Gurgaon",
    description: (
      <>
        <p>
          Searching for a rental home or commercial space? As a trusted{" "}
          <b>property dealer in Gurugram</b>, we offer a wide range of rental
          options across prime locations. Whether it’s a fully furnished
          apartment or office space, we help you find the right property quickly
          and efficiently.
        </p>
      </>
    ),
    link: "/rent-property",
    icon: Key,
  },
];

export default function OurServices() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  return (
    <section className="py-16 bg-[#faf9f7]">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* HEADER */}
        <div className="mb-12" data-aos="fade-up">
          <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
            What We Do – Complete Real Estate Solutions in Gurgaon
          </p>
          <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
            Best Property Dealer in Gurgaon for Buying, Selling & Leasing
            Property
          </h2>
          <p className="mt-4 text-[var(--primary-bg)] text-base md:text-lg leading-relaxed">
            As a leading property dealer in Gurugram, we provide end-to-end
            solutions for buying, selling, and leasing property across
            residential and commercial segments. Our local expertise helps
            clients make informed decisions based on location, budget, and
            investment potential.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={service.link}
              className="group block h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-transparent hover:border-[var(--primary-color)]/20 relative overflow-hidden">
                {/* Icon Container */}
                <div className="mb-6 relative w-16 h-16 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center text-[var(--primary-color)] group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[var(--primary-bg)] mb-3 group-hover:text-[var(--primary-color)] transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                  {service.description}
                </p>

                {/* Read More Indicator */}
                <div className="mt-auto flex items-center text-[var(--primary-color)] text-sm font-semibold tracking-wide">
                  <span className="group-hover:mr-2 transition-all">
                    Learn More
                  </span>
                  <svg
                    className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
