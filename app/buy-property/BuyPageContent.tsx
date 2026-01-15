"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";

import heroImg from "../assets/hero/aboutpage.jpg";

import { useEffect } from "react";

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
import PopupForm from "../components/Popup";
import ButtonFill from "../components/ButtonFill";
interface Property {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  type: string;
  purpose: "Buy" | "Sell" | "Lease";
  location: string;
  images: string[];
  price: number;
  bedrooms?: string;
  bathrooms?: string;
  areaSqft?: string;
}

const staticLocations = [
  "Select Location",
  "DLF Phase 1",
  "DLF Phase 2",
  "DLF Phase 3",
  "DLF Phase 4",
  "DLF Phase 5",
  "Sushant Lok 1",
  "Sushant Lok 2",
  "Sushant Lok 3",
  "Sushant Lok 4",
  "Sushant Lok 5",
  "MG Road",
  "Golf Course Road",
  "Golf Course Ext. Road",
  "Sector 77 Gurugram Haryana",
  "Sector 76 Gurugram Haryana",
  "Sector 102 Gurugram Haryana",
  "Sector 59 Gurugram Haryana",
];

export default function BuyPageContent() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/property`
        );

        const data = await res.json();
        console.log(data);
        if (data.success) {
          setProperties(data.properties);
        }
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  /* ------------------ FILTER LOGIC ------------------ */
  const filteredProperties = properties
    // ✅ ONLY BUY PROPERTIES
    .filter((property) => property.purpose === "Buy")
    // ✅ APPLY FILTERS
    .filter((property) => {
      const matchLocation = location
        ? property.location.includes(location)
        : true;

      const matchType = type ? property.type === type : true;

      const matchBudget = budget
        ? budget === "below-2cr"
          ? property.price < 20000000
          : budget === "2cr-5cr"
            ? property.price >= 20000000 && property.price <= 50000000
            : property.price > 50000000
        : true;

      return matchLocation && matchType && matchBudget;
    });

  useEffect(() => {
    setBudget("");
  }, [type]);

  const PageLoader = () => {
    return (
      <div className="col-span-full flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-10 w-10 animate-spin text-gray-800" />
          <p className="text-sm text-gray-600 tracking-wide">
            Loading properties...
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Buy Property"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Buy Property
            </h1>
            <p className="text-sm tracking-widest text-white/80 uppercase">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">Buy Property</span>
            </p>
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-10 bg-gray-50">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="border rounded-xl px-4 py-3 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {staticLocations.map((loc) => (
              <option key={loc} value={loc === "All" ? "" : loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            className="border rounded-xl px-4 py-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="builder-floor">Builder Floor</option>
            <option value="plot">Plot</option>
          </select>

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

          <ButtonFill
            onClick={() => {
              setLocation("");
              setType("");
              setBudget("");
            }}
            text="Reset Filters"
          />
        </div>
      </section>

      {/* PROPERTY LIST */}
      <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* 🔄 LOADER */}
          {loading && <PageLoader />}

          {/* ✅ PROPERTIES */}
          {!loading &&
            filteredProperties.length > 0 &&
            filteredProperties.map((property) => (
              <div
                key={property._id}
                className="group rounded-3xl overflow-hidden border bg-white shadow hover:shadow-2xl transition"
              >
                {/* IMAGE */}
                <div className="relative h-64">
                  <Image
                    src={property.images?.[0] || "/placeholder.jpg"}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
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

                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                    {property.bedrooms && (
                      <div className="flex items-center gap-2">
                        <BedDouble size={16} /> {property.bedrooms} Beds
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-2">
                        <Bath size={16} /> {property.bathrooms} Baths
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Ruler size={16} /> {property.areaSqft} Sqft
                    </div>
                  </div>

                  <Link href={`/buy-property/${property.slug}`}>
                    <ButtonFill
                      className="w-full"
                      text={
                        <span className="flex items-center gap-2">
                          <Home size={18} />
                          View Details
                        </span>
                      }
                    />
                  </Link>
                </div>
              </div>
            ))}

          {/* ❌ NO DATA */}
          {!loading && filteredProperties.length === 0 && (
            <div className="col-span-full flex justify-center">
              <div className="bg-white border rounded-3xl shadow-md p-10 max-w-xl w-full text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Home size={28} className="text-gray-500" />
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  No Properties Available
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  We don’t currently have properties matching your preferences.
                  Share your requirement with us and our team will help you find
                  the perfect property.
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

      <QuickEnquiry />
      <Footer />
    </div>
  );
}
