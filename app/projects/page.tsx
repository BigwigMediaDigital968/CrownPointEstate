"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";

import heroImg from "../assets/hero/aboutpage.jpg"; // replace with your image
import Link from "next/link";
import project1 from "../assets/hero/hero1.jpg";
import project2 from "../assets/hero/hero2.jpg";
import project3 from "../assets/hero/hero3.jpg";
import { useState } from "react";

const completedProjects = [
  {
    id: 1,
    name: "Green Valley Residency",
    location: "Gurgaon, Haryana",
    image: project1,
    type: "Residential Apartments",
  },
  {
    id: 2,
    name: "Urban Heights",
    location: "Noida, Uttar Pradesh",
    image: project2,
    type: "Luxury Homes",
  },
  {
    id: 3,
    name: "The Courtyard",
    location: "South Delhi",
    image: project3,
    type: "Premium Villas",
  },
  {
    id: 4,
    name: "Skyline Towers",
    location: "Faridabad",
    image: heroImg,
    type: "High-rise Living",
  },
  {
    id: 5,
    name: "Palm Grove",
    location: "Dwarka Expressway",
    image: project1,
    type: "Gated Community",
  },
  {
    id: 6,
    name: "Riverfront Homes",
    location: "Greater Noida",
    image: project2,
    type: "Waterfront Residences",
  },
];

const ITEMS_PER_PAGE = 6;
export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(completedProjects.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = completedProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // how many pages around current

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };
  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}
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
              Projects
            </h1>

            {/* BREADCRUMB */}
            <p className="text-sm tracking-widest text-white/80 uppercase">
              <span className="hover:text-white cursor-pointer">
                <Link href="/">Home</Link>
              </span>
              <span className="mx-2">›</span>
              <span className="text-white">Projects</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* SECTION HEADER */}
          <div className="mb-16 max-w-2xl">
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
              Our Projects
            </p>

            <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
              Completed Projects
            </h2>
          </div>

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentProjects.map((project) => (
              <article key={project.id} className="group">
                {/* IMAGE */}
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* STATUS BADGE */}
                  <span className="absolute top-4 left-4 bg-[var(--primary-color)] text-white text-xs tracking-widest px-3 py-1">
                    COMPLETED
                  </span>
                </div>

                {/* CONTENT */}
                <div className="mt-6">
                  <h3 className="font-heading text-xl text-[var(--primary-bg)] mb-2">
                    {project.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-1">
                    {project.location}
                  </p>

                  <p className="text-xs tracking-widest text-[var(--primary-color)]">
                    {project.type}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-16 text-sm">
          {/* PREV */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "hover:bg-[var(--primary-color)] hover:text-white border-gray-300"
            }`}
          >
            ← Prev
          </button>

          {/* PAGE NUMBERS */}
          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2 text-gray-400">
                …
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => setCurrentPage(Number(page))}
                className={`px-4 py-2 border ${
                  currentPage === page
                    ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* NEXT */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "hover:bg-[var(--primary-color)] hover:text-white border-gray-300"
            }`}
          >
            Next →
          </button>
        </div>
      )}

      <QuickEnquiry />
      <Footer />
    </div>
  );
}
