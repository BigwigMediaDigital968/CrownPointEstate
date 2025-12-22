"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import enquiryImg from "../assets/h8_pic5.jpg";
import enquirybg from "../assets/h8_bg2.jpg";

export default function QuickEnquiry() {
  return (
    <>
      {/* PARALLAX SECTION */}
      <section className="relative h-[420px] md:h-[480px] overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover md:bg-fixed"
          style={{
            backgroundImage: `url(${enquirybg.src})`,
          }}
        >
          <div className="absolute inset-0 bg-[var(--primary-bg)]/70" />
        </div>
      </section>

      {/* OVERLAPPING CARD */}
      <section className="relative z-20 -mt-56 md:-mt-64 pb-20">
        <div className="w-11/12 md:w-3/4 mx-auto">
          <div className="bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            {/* LEFT IMAGE */}
            <div className="relative h-[260px] lg:h-auto">
              <Image
                src={enquiryImg}
                alt="Project View"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* RIGHT FORM */}
            <div className="p-10 md:p-14">
              <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-2 font-heading">
                Quick Enquiry
              </p>

              <h3 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)] mb-6">
                Want more information?
              </h3>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border border-gray-200 px-4 py-3 focus:outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="border border-gray-200 px-4 py-3 focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-200 px-4 py-3 focus:outline-none md:col-span-2"
                />

                <select className="border border-gray-200 px-4 py-3 focus:outline-none md:col-span-2">
                  <option>Select Project</option>
                  <option>ReHomes Riverside</option>
                  <option>Smart City</option>
                  <option>Golden River</option>
                </select>

                <button
                  type="submit"
                  className="md:col-span-2 mt-4 flex items-center justify-center gap-3 bg-[var(--primary-color)] text-white py-4 tracking-widest hover:opacity-90 transition"
                >
                  <Phone size={16} />
                  GET A CALL BACK
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
