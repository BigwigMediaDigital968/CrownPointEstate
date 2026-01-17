"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaShareAlt,
} from "react-icons/fa";

export default function GooeyButton() {
  const [open, setOpen] = useState(false);

  // 👉 Replace with your real URLs
  const facebookUrl = "https://www.facebook.com/profile.php?id=61586537195337";
  const instagramUrl = "https://www.instagram.com/crownpointestates/";
  const youtubeUrl = "https://youtube.com";
  const linkedinUrl = "https://www.linkedin.com/company/crownpoint-estates";

  return (
    <>
      {/* GOOEY SVG FILTER */}
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7
              "
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* FLOATING MENU */}
      <div className="hidden md:block fixed bottom-6 left-10 z-50">
        <style>{`
          .gooey-menu {
            filter: url(#goo);
          }

          .gooey-btn {
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: none;
            transition: all 0.3s ease;
            bottom: 0;
            left: 0;
          }

          .main-btn {
            background: linear-gradient(135deg, #b59a78 0%, #173e62 100%);
            color: white;
            box-shadow: 0 4px 20px rgba(181, 154, 120, 0.4);
            border: 2px solid #b59a78;
            z-index: 10;
          }

          .main-btn.open svg {
            transform: rotate(45deg);
          }

          .child-btn {
            background: #b59a78;
            color: white;
            box-shadow: 0 4px 15px rgba(181, 154, 120, 0.3);
            border: 2px solid #173e62;
            opacity: 0;
            visibility: hidden;
            transform: translate(0, 0) scale(0.8);
            transition: all 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .child-btn.open {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
          }

          .child-btn.open.fb {
            transform: translate(75px, 0);
          }

          .child-btn.open.ig {
            transform: translate(53px, -53px);
          }

          .child-btn.open.in {
            transform: translate(0, -75px);
          }

        //   .child-btn.open.in {
        //     transform: translate(75px, 53px);
        //   }
        `}</style>

        <div className="relative gooey-menu">
          {/* MAIN BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className={`gooey-btn main-btn ${open ? "open" : ""}`}
            aria-label="Share"
          >
            <FaShareAlt size={18} />
          </button>

          {/* FACEBOOK */}
          <a
            href={facebookUrl}
            target="_blank"
            className={`gooey-btn child-btn ${open ? "open fb" : ""}`}
            aria-label="Facebook"
          >
            <FaFacebookF size={12} />
          </a>

          {/* INSTAGRAM */}
          <a
            href={instagramUrl}
            target="_blank"
            className={`gooey-btn child-btn ${open ? "open ig" : ""}`}
            aria-label="Instagram"
          >
            <FaInstagram size={12} />
          </a>

          {/* YOUTUBE */}
          {/* <a
            href={youtubeUrl}
            target="_blank"
            className={`gooey-btn child-btn ${open ? "open yt" : ""}`}
            aria-label="YouTube"
          >
            <FaYoutube size={12} />
          </a> */}

          {/* LINKEDIN */}
          <a
            href={linkedinUrl}
            target="_blank"
            className={`gooey-btn child-btn ${open ? "open in" : ""}`}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={12} />
          </a>
        </div>
      </div>
    </>
  );
}
