"use client";

import { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const heroContent = {
  tag: "Crownpoint Estates",
  title: "Luxury Living\nRedefined",
  desc: "Experience the pinnacle of luxury real estate with Crownpoint Estates. Discover exceptional properties that combine elegance, comfort, and sophistication.",
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
];

export default function HeroSlider() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[75vh] lg:h-screen overflow-hidden">
      {/* INLINE ANIMATION STYLES */}
      <style jsx>{`
        @keyframes luxurySlide {
          0% {
            opacity: 0;
            transform: translateX(-140px) skewX(-6deg);
            filter: blur(8px);
          }
          55% {
            opacity: 1;
            transform: translateX(24px) skewX(1.5deg);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(0);
            filter: blur(0);
          }
        }

        /* 🐢 Slower, smoother animation */
        .lux-slide {
          animation: luxurySlide 1.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Increased stagger for readability */
        .delay-1 {
          animation-delay: 0.35s;
        }
        .delay-2 {
          animation-delay: 0.65s;
        }
        .delay-3 {
          animation-delay: 0.95s;
        }
      `}</style>

      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source
            src="/Crownpoint Estates Website Video.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* LEFT SOCIAL ICONS */}
      <div className="absolute left-6 bottom-10 z-30 hidden md:flex flex-col gap-4 text-white">
        {socialLinks.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="w-10 h-10 cursor-pointer flex items-center justify-center border border-white/30 rounded-full hover:bg-white hover:text-black transition"
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center">
        <div className="w-11/12 md:w-5/6 mx-auto text-white">
          <p className="uppercase tracking-widest text-sm mb-4 lux-slide">
            {heroContent.tag}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 whitespace-pre-line lux-slide delay-1">
            {heroContent.title}
          </h1>

          <p className="max-w-xl text-gray-200 mb-10 lux-slide delay-2">
            {heroContent.desc}
          </p>

          <Link href="/contact">
            <button className="px-8 py-4 bg-white text-black font-semibold tracking-wide hover:bg-gray-200 transition lux-slide delay-3">
              GET IN TOUCH →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
