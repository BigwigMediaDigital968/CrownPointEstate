"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";
import PopupForm from "../components/Popup";
import ButtonFill from "../components/ButtonFill";

import heroImg from "../assets/hero/for-lease.svg";

// Icons
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Home,
  IndianRupee,
  Loader,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
interface Property {
  _id: string;
  title: string;
  slug: string;
  type: string;
  purpose: "Buy" | "Rent" | "Lease";
  location: string;
  images: string[];
  price: number | null;
  bedrooms?: string;
  bathrooms?: string;
  areaSqft?: string;
  builder?: string;
}

/* ---------------- STATIC LOCATIONS ---------------- */
// const staticLocations = [
//   "Select Location",
//   "DLF Phase 1",
//   "DLF Phase 2",
//   "DLF Phase 3",
//   "DLF Phase 4",
//   "DLF Phase 5",
//   "Sushant Lok 1",
//   "Sushant Lok 2",
//   "Sushant Lok 3",
//   "Sushant Lok 4",
//   "Sushant Lok 5",
//   "MG Road",
//   "Golf Course Road",
//   "Golf Course Ext. Road",
//   "Sector 77 Gurugram Haryana",
//   "Sector 76 Gurugram Haryana",
//   "Sector 102 Gurugram Haryana",
//   "Sector 59 Gurugram Haryana",
// ];

export default function LeasePropertyPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROPERTIES ---------------- */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/property`,
        );
        const data = await res.json();

        if (data.success) {
          setProperties(data.properties);
        }
      } catch (error) {
        console.error("Failed to fetch lease properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  // const filteredProperties = properties
  //   // ✅ ONLY LEASE PROPERTIES
  //   .filter((property) => property.purpose === "Lease")
  //   // ✅ APPLY UI FILTERS
  //   .filter((property) => {
  //     const matchLocation = location
  //       ? property.location.includes(location)
  //       : true;

  //     const matchType = type ? property.type === type : true;

  //     const matchBudget =
  //       budget && typeof property.price === "number"
  //         ? (() => {
  //             if (budget === "below-2cr") return property.price < 20000000;
  //             if (budget === "2cr-5cr")
  //               return property.price >= 20000000 && property.price <= 50000000;
  //             if (budget === "above-5cr") return property.price > 50000000;
  //             return true;
  //           })()
  //         : true;

  //     return matchLocation && matchType && matchBudget;
  //   });

  const filteredProperties = properties
    // ✅ ONLY LEASE PROPERTIES
    .filter((property) => property.purpose === "Lease")

    // 🔍 SEARCH FILTER
    .filter((property) => {
      if (!search) return true;

      const query = search.toLowerCase();

      return (
        property.location?.toLowerCase().includes(query) ||
        property.title?.toLowerCase().includes(query) ||
        property.type?.toLowerCase().includes(query) ||
        property.builder?.toLowerCase().includes(query)
      );
    })

    // 🏠 TYPE + 💰 BUDGET FILTER
    .filter((property) => {
      const matchType = type ? property.type === type : true;

      const matchBudget =
        budget && typeof property.price === "number"
          ? (() => {
              if (budget === "below-2cr") return property.price < 20000000;
              if (budget === "2cr-5cr")
                return property.price >= 20000000 && property.price <= 50000000;
              if (budget === "above-5cr") return property.price > 50000000;
              return true;
            })()
          : true;

      return matchType && matchBudget;
    });

  /* RESET BUDGET WHEN TYPE CHANGES */
  useEffect(() => {
    setBudget("");
  }, [type]);

  /* ---------------- LOADER ---------------- */
  const PageLoader = () => (
    <div className="col-span-full flex items-center justify-center min-h-75">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-10 w-10 animate-spin text-gray-800" />
        <p className="text-sm text-gray-600">Loading properties...</p>
      </div>
    </div>
  );

  return (
    <>
      {/* SEO Meta Tags */}

      {/* <!-- Primary Meta Tags --> */}
      <title>
        Commercial Property for Lease in Gurgaon | Crownpoint Estates
      </title>
      <meta
        name="title"
        content="Commercial Property for Lease in Gurgaon | Crownpoint Estates"
      />
      <meta
        name="description"
        content="Lease commercial property in Gurgaon with expert support from Crownpoint Estates. Offices, retail & corporate leasing solutions across Gurugram and Delhi NCR."
      />
      {/* <meta
        name="keywords"
        content="property dealer in gurugram, real estate agent in gurgaon, commercial property gurgaon, residential property gurgaon, buy property gurgaon, sell property gurgaon, crownpoint estates"
      /> */}
      {/* <meta name="author" content="Crownpoint Estates" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" /> */}

      {/* <!-- Canonical URL --> */}
      <link
        rel="canonical"
        href="https://www.crownpointestates.com/lease-property"
      />

      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="Commercial Property for Lease in Gurgaon | Crownpoint
Estates"
      />
      <meta
        property="og:description"
        content="Lease commercial property in Gurgaon with
expert support from Crownpoint Estates. Offices, retail & corporate leasing solutions across
Gurugram and Delhi NCR."
      />
      <meta
        property="og:image"
        content="https://www.crownpointestates.com/_next/image?url=%2F_next%2Fstatic%2Fmedi
a%2Fcpe-logo.56cc1d43.png&w=64&q=75"
      />
      <meta
        property="og:url"
        content="http://crownpointestates.com/lease-property"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Crownpoint Estates" />
      <meta property="og:locale" content="en_IN" />

      {/* <!-- Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Property Dealer in Gurugram | Crownpoint Estates"
      />
      <meta
        name="twitter:description"
        content="Buy, sell, lease & rent premium residential and commercial properties in Gurugram and Delhi NCR with Crownpoint Estates."
      />
      <meta
        name="twitter:image"
        content="https://www.crownpointestates.com/og/crownpoint-estates-og.jpg"
      /> */}

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Lease Property"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Lease Property
              </h1>

              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span>Lease Property</span>
              </p>
            </div>

            <div className="hidden lg:flex justify-end">
              <QuickEnquiry />
            </div>
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-10 bg-gray-50">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <select
            className="border rounded-xl px-4 py-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {staticLocations.map((loc) => (
              <option key={loc} value={loc === "All" ? "" : loc}>
                {loc}
              </option>
            ))}
          </select> */}

          {/* 🔍 SEARCH BAR */}
          <input
            type="text"
            placeholder="Search location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full"
          />

          <select
            className="border rounded-xl px-4 py-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Builder Floor">Builder Floor</option>
            <option value="Plot">Plot</option>
          </select>

          {type === "Apartment" && (
            <select
              className={`border rounded-xl px-4 py-3 ${
                !type ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              disabled={!type}
            >
              <option value="">
                {type ? "Select Budget" : "Select Property Type First"}
              </option>
              <option value="below-2cr">Below ₹2 Cr</option>
              <option value="2cr-5cr">₹2 Cr – ₹5 Cr</option>
              <option value="above-5cr">Above ₹5 Cr</option>
            </select>
          )}

          <ButtonFill
            text="Reset Filters"
            onClick={() => {
              setSearch("");
              setType("");
              setBudget("");
            }}
          />
        </div>
      </section>

      {/* PROPERTY LIST */}
      <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading && <PageLoader />}

          {!loading &&
            filteredProperties.map((property) => (
              <div
                key={property._id}
                className="group rounded-3xl overflow-hidden border bg-white shadow hover:shadow-2xl transition"
              >
                <div className="relative h-64">
                  <Image
                    src={property.images?.[0] || "/placeholder.jpg"}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />

                  <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full uppercase">
                    {property.purpose}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    {property.title}
                  </h3>

                  <p className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                    <MapPin size={16} />
                    {property.location}
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    {property.bedrooms && (
                      <div className="flex gap-2">
                        <BedDouble size={16} /> {property.bedrooms}
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex gap-2">
                        <Bath size={16} /> {property.bathrooms}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Ruler size={16} /> {property.areaSqft}
                    </div>
                  </div>

                  <p className="flex items-center gap-1 text-lg font-bold mb-5">
                    <IndianRupee size={18} />
                    {typeof property.price === "number"
                      ? property.price.toLocaleString()
                      : "On Request"}
                  </p>

                  <Link href={`/lease-property/${property.slug}`}>
                    <ButtonFill
                      className="w-full"
                      text={
                        <span className="flex gap-2">
                          <Home size={18} />
                          View Details
                        </span>
                      }
                    />
                  </Link>
                </div>
              </div>
            ))}

          {!loading && filteredProperties.length === 0 && (
            <div className="col-span-full flex justify-center">
              <div className="bg-white border rounded-3xl shadow-md p-10 text-center">
                <h3 className="text-2xl font-semibold mb-3">
                  No Properties Available
                </h3>
                <p className="text-gray-600 mb-6">
                  Share your requirement with us and our team will help you find
                  the perfect lease property.
                </p>
                <ButtonFill
                  onClick={() => setOpenPopup(true)}
                  text="Contact Our Expert"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
      <Footer />
    </>
  );
}
