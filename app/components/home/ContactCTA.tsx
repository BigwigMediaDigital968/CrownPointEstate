"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ButtonFill from "../ButtonFill";

export default function ContactCTA() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="relative bg-[var(--primary-bg)] py-20 overflow-hidden">
            <div className="w-11/12 md:w-5/6 mx-auto text-center text-white">

                {/* Section Label */}
                <p
                    className="uppercase tracking-widest text-m mb-4 opacity-80 font-heading"
                    data-aos="fade-up"
                >
                    Get in Touch
                </p>

                {/* Heading */}
                <h2
                    className="font-heading text-3xl md:text-4xl font-bold leading-snug mb-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Contact the Best Property Dealer in Gurugram
                </h2>


                {/* Description */}
                <p
                    className="max-w-3xl mx-auto text-base md:text-xl leading-relaxed opacity-90 mb-10"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Planning to buy, sell, or invest in property? 
                </p>

                {/* CTA Button */}
                <div data-aos="zoom-in" data-aos-delay="300">
                    <ButtonFill
                        text="Get in Touch"
                        href="/contact"
                        className="min-w-[180px]"
                    />
                </div>
            </div>
        </section>
    );
}
