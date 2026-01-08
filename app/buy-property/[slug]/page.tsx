"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Icons
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Home,
  CheckCircle,
  IndianRupee,
  Building2,
  Calendar,
} from "lucide-react";

/* ================= TYPES ================= */

interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  purpose: "Buy" | "Sell" | "Lease";
  location: string;
  images: string[];
  price: number;
  bedrooms?: string;
  bathrooms?: string;
  areaSqft?: string;
  builder?: string;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
}

/* ================= PAGE ================= */

export default function PropertyDetails() {
  const params = useParams();
  const slug = params?.slug as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROPERTY ================= */

  useEffect(() => {
    if (!slug) return;

    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/property?slug=${slug}`
        );
        const data = await res.json();

        if (data.success && data.properties.length > 0) {
          setProperty(data.properties[0]);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch property", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  /* ================= LOADING / NOT FOUND ================= */

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="py-40 text-center text-lg">Loading property...</div>
        <Footer />
      </>
    );
  }

  if (!property) {
    notFound();
  }

  /* ================= JSX ================= */

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[65vh] lg:h-[90vh]">
        <Image
          src={property.images?.[0] || "/placeholder.jpg"}
          alt={property.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-end">
          <div className="w-11/12 md:w-5/6 mx-auto pb-10 text-white">
            <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm uppercase mb-3">
              {property.type} • {property.purpose}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {property.title}
            </h1>

            <p className="flex items-center gap-2 text-white/80">
              <MapPin size={16} />
              {property.location}
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-14">
            {/* PRICE & STATS */}
            <div className="bg-white rounded-3xl shadow p-8">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <p className="flex items-center gap-1 text-3xl font-bold">
                  <IndianRupee size={26} />
                  {property.price.toLocaleString("en-IN")}
                </p>

                <div className="flex flex-wrap gap-6 text-gray-700">
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <BedDouble /> {property.bedrooms} Beds
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-2">
                      <Bath /> {property.bathrooms} Baths
                    </div>
                  )}
                  {property.areaSqft && (
                    <div className="flex items-center gap-2">
                      <Ruler /> {property.areaSqft} Sqft
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* OVERVIEW */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-5">
                Property Overview
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <OverviewItem
                  icon={<Building2 />}
                  label="Builder"
                  value={property.builder || "—"}
                />
                <OverviewItem
                  icon={<Home />}
                  label="Property Type"
                  value={property.type}
                />
                <OverviewItem
                  icon={<Calendar />}
                  label="Purpose"
                  value={property.purpose}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-5">
                Property Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* HIGHLIGHTS */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-5">
                Property Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.highlights.map((item: string, index: number) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle className="text-green-600" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FEATURES & AMENITIES */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-5">
                Features & Amenities
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.featuresAmenities.map(
                  (item: string, index: number) => (
                    <li
                      key={index}
                      className="bg-gray-100 px-4 py-3 rounded-xl text-sm"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* NEARBY */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-5">
                Nearby Locations
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.nearby.map((item: string, index: number) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle className="text-green-600" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="lg:sticky lg:top-28 h-fit space-y-6">
            <div className="bg-white shadow rounded-3xl p-6">
              <h3 className="font-heading text-xl font-bold mb-5">
                Interested in this property?
              </h3>
              <Link
                href="/contact"
                className="block text-center bg-[var(--primary-color)] text-white py-3 rounded-xl"
              >
                Enquire Now
              </Link>
            </div>
            <div className="bg-white shadow rounded-3xl p-6">
              <h3 className="font-heading text-xl leading-snug font-bold text-[var(--primary-bg)] mb-3">
                Enquire About This Property
              </h3>

              <p className="text-sm text-gray-500 mb-6">
                Fill in your details and our expert will contact you shortly.
              </p>

              <form className="space-y-4">
                {/* NAME */}
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />

                {/* PHONE */}
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />

                {/* PROPERTY INFO (hidden for backend later) */}
                <input type="hidden" value={property.title} />

                {/* CTA */}
                <button
                  type="submit"
                  className="w-full bg-[var(--primary-color)] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
                >
                  Request Call Back
                </button>
              </form>

              {/* TRUST TEXT */}
              <p className="text-xs text-gray-400 mt-4 text-center">
                100% privacy • No spam • Genuine listings only
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ================= SMALL COMPONENT ================= */

function OverviewItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
      {icon}
      <div>
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
