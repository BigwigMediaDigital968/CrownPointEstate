"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../assets/cpe-logo.png";
import { usePathname } from "next/navigation";
import PopupForm from "./Popup";
import ButtonFill from "./ButtonFill";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobilePropOpen, setMobilePropOpen] = useState(false);
  const pathname = usePathname();
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-40 border-b transition-all duration-300 text-black ${
          scrolled
            ? "bg-[#f6f2ec] border-black/10 shadow-lg"
            : "bg-transparent border-white/30"
        }`}
      >
        <nav className="relative w-11/12 mx-auto flex items-center justify-between text-black py-1">
          {/* LEFT — LOGO */}
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Logo" width={60} height={60} priority />
          </Link>

          {/* CENTER — MENU */}
          <ul
            className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 font-medium text-black`}
          >
            {[
              { name: "Home", link: "/" },
              { name: "About", link: "/about" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`pb-1 transition ${
                    pathname === item.link
                      ? "border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]"
                      : "hover:text-[var(--primary-color)]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* PROPERTIES DROPDOWN */}
            <li
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                className={`flex items-center gap-1 py-8 transition text-black hover:text-[var(--primary-color)]`}
              >
                {" "}
                Properties <ChevronDown size={16} />
              </button>

              {productOpen && (
                <div className="absolute top-full left-0 bg-white w-52 border border-white/10 shadow-xl">
                  <Link
                    href="/buy-property"
                    className="block px-5 py-3 text-black hover:text-[var(--primary-color)]  hover:bg-[var(--primary-bg)] transition"
                  >
                    Buy Property
                  </Link>
                  <Link
                    href="/sell-property"
                    className="block px-5 py-3 text-black hover:text-[var(--primary-color)]  hover:bg-[var(--primary-bg)] transition"
                  >
                    Sell Property
                  </Link>
                  <Link
                    href="/lease-property"
                    className="block px-5 py-3 text-black hover:text-[var(--primary-color)]  hover:bg-[var(--primary-bg)] transition"
                  >
                    Lease Property
                  </Link>
                  <Link
                    href="/rent-property"
                    className="block px-5 py-3 text-black hover:text-[var(--primary-color)]  hover:bg-[var(--primary-bg)] transition"
                  >
                    Rent Property
                  </Link>
                </div>
              )}
            </li>

            {[
              { name: "Blogs", link: "/blogs" },
              { name: "Contact", link: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`pb-1 transition ${
                    pathname === item.link
                      ? "border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]"
                      : scrolled
                        ? "hover:text-[var(--primary-color)]"
                        : "hover:text-[var(--primary-color)]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT — PHONE */}
          <div className="hidden lg:flex gap-5 items-center">
            {/* GET IN TOUCH BUTTON */}
            <ButtonFill onClick={() => setOpenForm(true)} text="Get in touch" />

            {/* PHONE */}
            <div
              className={`hidden lg:flex items-center gap-3 text-sm font-medium group cursor-pointer text-black`}
            >
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-full border transition ${
                  scrolled
                    ? "border-black/20 group-hover:bg-[var(--primary-color)]"
                    : "border-white/30 group-hover:bg-[var(--primary-color)]"
                }`}
              >
                <Phone size={16} color={scrolled ? "black" : "white"} />
              </span>

              <span className="transition group-hover:text-[var(--primary-color)]">
                +91 9811556625
              </span>
            </div>
          </div>
          <PopupForm open={openForm} onClose={() => setOpenForm(false)} />

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden z-[60] text-black`}
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </nav>
      </header>

      {/* FULLSCREEN MOBILE MENU */}
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR */}
        <aside
          className={`absolute right-0 top-0 h-full w-80 md:w-[50%] bg-[var(--primary-bg)] text-white transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4"
          >
            <X size={26} />
          </button>

          {/* MENU CONTENT */}
          <nav className="mt-16 px-6 flex flex-col gap-6 text-lg font-medium">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            {/* PROPERTIES (ACCORDION) */}
            <button
              onClick={() => setMobilePropOpen(!mobilePropOpen)}
              className="flex items-center justify-between"
            >
              Properties <ChevronDown size={18} />
            </button>

            {mobilePropOpen && (
              <div className="ml-4 flex flex-col gap-4 text-base text-gray-300">
                <Link href="/buy-property" onClick={() => setOpen(false)}>
                  Buy Property
                </Link>
                <Link href="/sell-property" onClick={() => setOpen(false)}>
                  Sell Property
                </Link>
              </div>
            )}

            <Link href="/projects" onClick={() => setOpen(false)}>
              Projects
            </Link>

            <Link href="/blogs" onClick={() => setOpen(false)}>
              Blogs
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            {/* PHONE */}
            <div className="mt-8 flex items-center gap-3 text-sm border-t border-white/20 pt-4">
              <Phone size={16} />
              <span>+91 9811556625</span>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
