"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import heroImg from "../assets/hero/for-contact.svg";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin, Phone, Mail } from "lucide-react";
import Footer from "../components/Footer";
import EnquiryForm from "../components/EnquiryForm";

const Contact = () => {
  /* ================= AOS INIT ================= */
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

      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Contact Us"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-sm tracking-widest text-white/80 uppercase">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
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
            {/* LEFT INFO */}
            <div data-aos="fade-up">
              <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
                Get in touch
              </p>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--primary-bg)] mb-6">
                Let’s start a conversation
              </h2>

              <p className="text-gray-600 max-w-md mb-12">
                Get in touch with Crownpoint Estates for expert guidance in
                buying, selling, renting, or investing in real estate across
                Gurugram and Delhi NCR.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-[var(--primary-color)] mt-1" />
                  <p>
                    Crownpoint Estates <br />
                    65, Lower Ground Floor, Akashneem Marg, <br />
                    DLF Phase-2, Gurugram – 122002
                  </p>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-[var(--primary-color)] mt-1" />
                  <p>+91 98115 56625 / 98107 86375 / 99990 19763</p>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-[var(--primary-color)] mt-1" />
                  <p>sales@crownpointestates.com</p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div
              className="bg-white p-10 md:p-14 shadow-sm"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-2xl font-semibold mb-6">
                Send a Message
              </h3>

              <EnquiryForm variant="default" btnText="SEND MESSAGE" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="relative h-[420px]" data-aos="zoom-in">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.8734948011775!2d77.08983769999999!3d28.483356200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19fc22d63287%3A0x86013e4f6dd2d196!2sCrownpoint%20Estate!5e0!3m2!1sen!2sin!4v1768914202564!5m2!1sen!2sin"
    className="absolute inset-0 w-full h-full border-0"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</section>


      <Footer />
    </div>
  );
};

export default Contact;
