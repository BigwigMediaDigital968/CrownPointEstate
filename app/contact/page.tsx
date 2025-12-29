"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/hero/aboutpage.jpg";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin, Phone, Mail } from "lucide-react";

import Footer from "../components/Footer";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);
  return (
    <div className="relative">
      <Navbar />

      <section className="relative h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <Image
          src={heroImg}
          alt="blogs"
          fill
          priority
          className="object-cover"
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center ">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Contacts
            </h1>

            {/* BREADCRUMB */}
            <p className="text-sm tracking-widest text-white/80 uppercase">
              <span className="hover:text-white cursor-pointer">
                <Link href="/">Home</Link>
              </span>
              <span className="mx-2">›</span>
              <span className="text-white">Contacts</span>
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative py-16 bg-[#faf9f7]">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* LEFT – CONTACT INFO */}
            <div data-aos="fade-up">
              <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
                Get in touch
              </p>

              <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)] mb-6">
                Let’s start a conversation
              </h2>

              <p className="text-gray-600 max-w-md mb-12 leading-relaxed">
                Whether you’re looking for your next home, have a project
                inquiry, or simply want to know more about us, we’re here to
                help.
              </p>

              {/* CONTACT DETAILS */}
              <div className="space-y-8 text-[var(--primary-bg)]">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[var(--primary-color)] mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">
                      Address
                    </p>
                    <p className="font-medium">
                      123 Business Avenue, City Name, Country
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-[var(--primary-color)] mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <p className="font-medium">+91 01234 56789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-[var(--primary-color)] mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <p className="font-medium">Sales@crownpointestates.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT – FORM */}
            <div
              className="bg-white p-10 md:p-14 shadow-sm"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder="+91"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[var(--primary-color)] resize-none"
                    placeholder="Tell us how we can help"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 px-8 py-4 bg-[var(--primary-color)] text-white text-sm tracking-widest hover:opacity-90 transition"
                >
                  SEND MESSAGE →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GOOGLE MAP ================= */}
      <section className="relative h-[420px]" data-aos="zoom-in">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Delhi%20India&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
