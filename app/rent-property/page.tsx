"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";
import PopupForm from "../components/Popup";
import ButtonFill from "../components/ButtonFill";

import heroImg from "../assets/hero/for-rent.svg";

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
  price: number;
  bedrooms?: string;
  bathrooms?: string;
  areaSqft?: string;
}

/* ---------------- STATIC LOCATIONS ---------------- */
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

export default function RentPropertyPage() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH RENT PROPERTIES ---------------- */
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
        console.error("Failed to fetch rent properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredProperties = properties
    // ✅ ONLY RENT PROPERTIES
    .filter((property) => property.purpose === "Rent")
    // ✅ APPLY UI FILTERS
    .filter((property) => {
      const matchLocation = location
        ? property.location.includes(location)
        : true;

      const matchType = type ? property.type === type : true;

      const matchBudget =
        budget && typeof property.price === "number"
          ? (() => {
              if (budget === "50k-1L")
                return property.price >= 50000 && property.price <= 100000;
              if (budget === "1L-2L")
                return property.price > 100000 && property.price <= 200000;
              if (budget === "above-2L") return property.price > 200000;
              return true;
            })()
          : true;

      return matchLocation && matchType && matchBudget;
    });

  /* RESET BUDGET WHEN TYPE CHANGES */
  useEffect(() => {
    setBudget("");
  }, [type]);

  /* ---------------- LOADER ---------------- */
  const PageLoader = () => (
    <div className="col-span-full flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-10 w-10 animate-spin text-gray-800" />
        <p className="text-sm text-gray-600">Loading properties...</p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Rent Property"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Rent Property
              </h1>

              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span>Rent Property</span>
              </p>
            </div>

            <div className="hidden lg:flex justify-end">
              <QuickEnquiry />
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-10 bg-gray-50">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="border rounded-xl px-4 py-3"
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
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Builder Floor">Builder Floor</option>
            <option value="Plot">Plot</option>
          </select>

          <select
            className={`border rounded-xl px-4 py-3 ${!type ? "bg-gray-100 cursor-not-allowed" : ""}`}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            disabled={!type}
          >
            <option value="">
              {type ? "Select Budget" : "Select Property Type First"}
            </option>
            <option value="50k-1L">₹50k – ₹1 Lakh</option>
            <option value="1L-2L">₹1 – ₹2 Lakh</option>
            <option value="above-2L">Above ₹2 Lakh</option>
          </select>

          <ButtonFill
            text="Reset Filters"
            onClick={() => {
              setLocation("");
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

                  <Link href={`/rent-property/${property.slug}`}>
                    <ButtonFill
                      className="w-full"
                      text={
                        <span className="flex gap-2">
                          <Home size={18} /> View Details
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
                  the perfect rental property.
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
    </div>
  );
}
