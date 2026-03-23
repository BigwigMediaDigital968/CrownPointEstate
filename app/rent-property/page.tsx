"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";
import PopupForm from "../components/Popup";
import ButtonFill from "../components/ButtonFill";

import heroImg from "../assets/hero/for-rent.svg";
import WhyChooseSectionRent from "./WhyChooseRent";

import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Home,
  IndianRupee,
  Loader,
  Building2,
  Briefcase,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

/* ─── BRAND ─── */
const brand = { navy: "#173e62", gold: "#b59a78" };

/* ─── TYPES ─── */
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
  builder?: string;
}

/* ─── STATIC DATA ─── */
const rentOptions = [
  "Flats for rent in Gurgaon fully furnished for immediate move-in",
  "Builder floors for independent living",
  "Houses for rent Gurgaon for families",
  "Studio apartments and shared accommodations",
  "Commercial rental spaces for offices and retail",
];

const rentalLocations = [
  { name: "Golf Course Road", desc: "Premium residential and corporate hub" },
  { name: "DLF Phase 1–5", desc: "Established and high-demand localities" },
  { name: "Sohna Road", desc: "Growing residential and commercial area" },
  { name: "Dwarka Expressway", desc: "Emerging rental hotspot" },
  {
    name: "Cyber City & Udyog Vihar",
    desc: "Perfect rental hubs for working professionals",
  },
];

const whyRent = [
  { icon: Building2, text: "Proximity to major corporate offices" },
  { icon: Home, text: "Wide variety of rental options" },
  { icon: CheckCircle2, text: "Availability of fully furnished flats" },
  { icon: Users, text: "Flexible rental terms" },
  { icon: Briefcase, text: "Modern infrastructure and amenities" },
];

const testimonials = [
  {
    initial: "V",
    name: "Vansh Verma",
    text: "I was looking for a property for rent in Gurgaon for my family, and Crownpoint Estates made the entire process very smooth. They understood my requirements and helped me find a fully furnished apartment in a great location. Highly recommended!",
  },
  {
    initial: "S",
    name: "Sourabh Chakraborty",
    text: "Finding the right rental property in Gurgaon can be stressful, but the team at Crownpoint Estates made it easy. They showed verified options and helped me finalize a property within my budget in just a few days.",
  },
  {
    initial: "A",
    name: "Abhay Das",
    text: "I recently relocated to Gurugram and urgently needed a house for rent. Crownpoint Estates provided excellent support and helped me find a spacious builder floor in a prime area. Very professional service.",
  },
  {
    initial: "N",
    name: "Narayan Sharma",
    text: "What I liked the most was their transparency and quick response. I was able to explore multiple properties for rent in Gurgaon and choose the one that suited my needs perfectly. Great experience overall.",
  },
  {
    initial: "S",
    name: "Subrato Verma",
    text: "Crownpoint Estates helped me find a rental property in Gurgaon that matched all my requirements. The team handled everything from property visits to finalizing the agreement, making the process completely hassle-free.",
  },
];

const faqs = [
  {
    q: "Which areas in Gurgaon have the highest rent for properties?",
    a: "Premium areas like Golf Course Road, DLF Phase 1–5, and Cyber City have the highest rent for property for rent in Gurgaon due to prime location, connectivity, and amenities.",
  },
  {
    q: "What is the rent range for 3 BHK apartments in Gurgaon?",
    a: "The rent for 3 BHK properties for rent in Gurgaon depends on location, amenities, and size, with premium pricing in areas like Golf Course Road and more budget-friendly options in New Gurgaon.",
  },
  {
    q: "Is rent higher in Old Gurgaon or New Gurgaon?",
    a: "Rent for property for rent in Gurgaon is generally higher in established and central areas such as Golf Course Road and DLF phases compared to New Gurgaon sectors. Central locations benefit from better connectivity, developed infrastructure, and proximity to major business districts, which increases rental demand. In contrast, New Gurgaon offers more affordable rental options with growing infrastructure and future appreciation potential.",
  },
  {
    q: "How do Gurgaon rental prices compare with Noida and Delhi?",
    a: "Rental prices for property for rent in Gurgaon are generally higher than Noida but comparable to premium areas in Delhi, especially in corporate hubs.",
  },
  {
    q: "What are the security deposit norms for renting in Gurgaon?",
    a: "For most properties for rent in Gurgaon, the security deposit typically ranges from one to three months' rent, depending on the property type and landlord.",
  },
  {
    q: "Which areas in Gurgaon are best for IT professionals to rent?",
    a: "Areas like Cyber City, Udyog Vihar, Golf Course Road, and Sohna Road are ideal for IT professionals looking for property for rent in Gurgaon due to proximity to offices.",
  },
  {
    q: "How can I find verified rental properties in Gurgaon?",
    a: "You can find verified property for rent in Gurgaon by exploring trusted listings or working with experienced real estate consultants like Crownpoint Estates.",
  },
  {
    q: "Are short-term rentals available in Gurgaon?",
    a: "Yes, short-term options are available for property for rent in Gurgaon, including serviced apartments and furnished units suitable for temporary stays.",
  },
  {
    q: "How does transport connectivity affect rental prices in Gurgaon?",
    a: "Rental prices for property for rent in Gurgaon are higher in areas with strong metro connectivity, highways, and easy access to business hubs.",
  },
  {
    q: "What are some tips for finding the right neighbourhood in Gurgaon?",
    a: "When choosing a property for rent in Gurgaon, consider factors like proximity to work, connectivity, safety, amenities, and budget to find the most suitable location.",
  },
  {
    q: "Can I get serviced apartments in Gurgaon for a long stay?",
    a: "Yes, serviced apartments are available as property for rent in Gurgaon, offering fully furnished options with flexible rental terms for long stays.",
  },
];

/* ─── HOVER HANDLER ─── */
const hoverNavy = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = brand.navy;
    e.currentTarget.style.borderColor = brand.navy;
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "#faf8f5";
    e.currentTarget.style.borderColor = "#e8e0d6";
  },
};

/* ─── FAQ ACCORDION ITEM ─── */
function FaqItem({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: open ? `1px solid ${brand.gold}` : "1px solid #e8e0d6",
        backgroundColor: open ? `${brand.gold}08` : "#fff",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 text-left px-6 py-5"
      >
        <span
          className="shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center mt-0.5 transition-colors duration-300"
          style={{
            backgroundColor: open ? brand.gold : `${brand.navy}15`,
            color: open ? "#fff" : brand.navy,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="flex-1 font-semibold text-[15px] leading-snug pr-2 transition-colors duration-300"
          style={{ color: open ? brand.gold : brand.navy }}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 mt-0.5 transition-transform duration-300"
          style={{
            color: brand.gold,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed pl-[4.5rem]">
          {a}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function RentPropertyPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  /* ── FETCH ── */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/property`,
        );
        const data = await res.json();
        if (data.success) setProperties(data.properties);
      } catch (err) {
        console.error("Failed to fetch rent properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    setBudget("");
  }, [type]);

  /* ── FILTER ── */
  const filteredProperties = properties
    .filter((p) => p.purpose === "Rent")
    .filter((p) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        p.location?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q) ||
        p.builder?.toLowerCase().includes(q)
      );
    })
    .filter((p) => {
      const matchType = type ? p.type === type : true;
      const matchBudget =
        budget && typeof p.price === "number"
          ? (() => {
              if (budget === "50k-1L")
                return p.price >= 50000 && p.price <= 100000;
              if (budget === "1L-2L")
                return p.price > 100000 && p.price <= 200000;
              if (budget === "above-2L") return p.price > 200000;
              return true;
            })()
          : true;
      return matchType && matchBudget;
    });

  /* ── TESTIMONIAL PAGINATION ── */
  const testiPerPage = 3;
  const testiPages = Math.ceil(testimonials.length / testiPerPage);
  const visibleTesti = testimonials.slice(
    testimonialPage * testiPerPage,
    testimonialPage * testiPerPage + testiPerPage,
  );

  /* ── JSON-LD SCHEMAS ── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.crownpointestates.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rent Property",
        item: "https://www.crownpointestates.com/rent-property",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  /* ── LOADER ── */
  const PageLoader = () => (
    <div className="col-span-full flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center gap-4">
        <Loader
          className="h-10 w-10 animate-spin"
          style={{ color: brand.navy }}
        />
        <p className="text-sm text-gray-600">Loading properties...</p>
      </div>
    </div>
  );

  return (
    <>
      {/* ══ SEO META TAGS ══ */}
      <title>
        Property for Rent in Gurgaon – Flats, Houses & Offices | Crownpoint
        Estates
      </title>
      <meta
        name="title"
        content="Property for Rent in Gurgaon – Flats, Houses & Offices | Crownpoint Estates"
      />
      <meta
        name="description"
        content="Find the best property for rent in Gurgaon including flats, houses & commercial spaces. Verified listings with a smooth rental process by Crownpoint Estates."
      />
      <meta
        name="keywords"
        content="property for rent in Gurgaon, properties for rent in Gurgaon, rental property Gurgaon, flats for rent in Gurgaon fully furnished, houses for rent Gurgaon, residential property for rent in Gurgaon"
      />
      <meta name="author" content="Crownpoint Estates" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      <link
        rel="canonical"
        href="https://www.crownpointestates.com/rent-property"
      />

      <meta
        property="og:title"
        content="Property for Rent in Gurgaon – Flats, Houses & Offices | Crownpoint Estates"
      />
      <meta
        property="og:description"
        content="Find the best property for rent in Gurgaon including flats, houses & commercial spaces. Verified listings with a smooth rental process."
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/dyum0r6gf/image/upload/v1774263369/for-rent_ozjnpn.svg"
      />
      <meta
        property="og:url"
        content="https://www.crownpointestates.com/rent-property"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Crownpoint Estates" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Property for Rent in Gurgaon – Flats, Houses & Offices | Crownpoint Estates"
      />
      <meta
        name="twitter:description"
        content="Find the best property for rent in Gurgaon with verified listings and expert support from Crownpoint Estates."
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/dyum0r6gf/image/upload/v1774263369/for-rent_ozjnpn.svg"
      />

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ══ JSON-LD SCHEMAS ══ */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>

      <Navbar />

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Property for Rent in Gurgaon"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Property for Rent in Gurgaon
                <span className="text-lg md:text-2xl font-medium text-white/80 block mt-2">
                  Verified Flats, Houses & Commercial Rentals
                </span>
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Rent Property</span>
              </p>
            </div>
            <div className="hidden lg:flex justify-end">
              <QuickEnquiry />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FILTER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-10" style={{ backgroundColor: "#f7f5f2" }}>
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search location, title, type…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full focus:outline-none"
            style={{ borderColor: "#e8e0d6" }}
          />
          <select
            className="border rounded-xl px-4 py-3"
            style={{ borderColor: "#e8e0d6" }}
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
              className="border rounded-xl px-4 py-3"
              style={{ borderColor: "#e8e0d6" }}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">Select Budget</option>
              <option value="50k-1L">₹50k – ₹1 Lakh</option>
              <option value="1L-2L">₹1 – ₹2 Lakh</option>
              <option value="above-2L">Above ₹2 Lakh</option>
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

      {/* ══════════════════════════════════════════════════════════
          PROPERTY LIST
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading && <PageLoader />}

          {!loading &&
            filteredProperties.map((property) => (
              <div
                key={property._id}
                className="group rounded-3xl overflow-hidden border bg-white shadow hover:shadow-2xl transition"
                style={{ borderColor: "#e8e0d6" }}
              >
                <div className="relative h-64">
                  <Image
                    src={property.images?.[0] || "/placeholder.jpg"}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span
                    className="absolute top-4 left-4 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold"
                    style={{ backgroundColor: brand.navy }}
                  >
                    {property.purpose}
                  </span>
                </div>

                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-1"
                    style={{ color: brand.navy }}
                  >
                    {property.title}
                  </h3>
                  <p className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                    <MapPin size={16} color={brand.gold} /> {property.location}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                    {property.bedrooms && (
                      <div className="flex items-center gap-2">
                        <BedDouble size={16} color={brand.gold} />{" "}
                        {property.bedrooms} Beds
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-2">
                        <Bath size={16} color={brand.gold} />{" "}
                        {property.bathrooms} Baths
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Ruler size={16} color={brand.gold} /> {property.areaSqft}
                    </div>
                  </div>
                  <p
                    className="flex items-center gap-1 text-lg font-bold mb-5"
                    style={{ color: brand.navy }}
                  >
                    <IndianRupee size={18} />
                    {typeof property.price === "number"
                      ? property.price.toLocaleString()
                      : "On Request"}
                  </p>
                  <Link href={`/rent-property/${property.slug}`}>
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

          {!loading && filteredProperties.length === 0 && (
            <div className="col-span-full flex justify-center">
              <div
                className="bg-white border rounded-3xl shadow-md p-10 max-w-xl w-full text-center"
                style={{ borderColor: "#e8e0d6" }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${brand.navy}10` }}
                >
                  <Home size={28} color={brand.navy} />
                </div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ color: brand.navy }}
                >
                  No Properties Available
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Share your requirement and our team will help you find the
                  perfect rental property.
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

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — Intro / Find the Best Rental
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: navy feature card */}
          <div className="relative">
            <div
              className="absolute -top-5 -left-5 w-20 h-20 rounded-2xl z-0"
              style={{ backgroundColor: `${brand.gold}22` }}
            />
            <div
              className="relative z-10 rounded-3xl p-10 text-white"
              style={{ backgroundColor: brand.navy }}
            >
              <p
                className="text-xs uppercase tracking-[0.3em] mb-4"
                style={{ color: brand.gold }}
              >
                Rental Experts
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-6">
                Property for Rent in Gurgaon – Explore Verified Rental
                Properties
              </h2>
              <div
                className="h-px mb-6"
                style={{ backgroundColor: `${brand.gold}40` }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Powered by Crownpoint Estates — your trusted rental partner in
                Gurugram.
              </p>
            </div>
            <div
              className="absolute -bottom-5 -right-5 w-14 h-14 rounded-xl z-0"
              style={{ backgroundColor: `${brand.gold}22` }}
            />
          </div>

          {/* Right: copy */}
          <div>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
              Looking for a{" "}
              <strong style={{ color: brand.navy }}>
                property for rent in Gurgaon
              </strong>
              ? Explore a wide range of{" "}
              <strong style={{ color: brand.navy }}>
                properties for rent in Gurgaon
              </strong>
              , including apartments, builder floors, villas, and commercial
              spaces across prime locations like Golf Course Road, DLF Phases,
              Sohna Road, and Dwarka Expressway.
            </p>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
              Gurgaon (Gurugram) is a preferred destination for rental living
              due to its strong corporate presence, modern infrastructure, and
              excellent connectivity. Whether you are searching for a{" "}
              <strong style={{ color: brand.gold }}>
                fully furnished apartment
              </strong>{" "}
              or a spacious house, finding the right{" "}
              <strong style={{ color: brand.navy }}>
                rental property in Gurgaon
              </strong>{" "}
              becomes easier with verified listings and expert assistance across
              Gurugram.
            </p>

            {/* Options list */}
            <ul className="space-y-3 mt-6">
              {rentOptions.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <ArrowRight
                    size={15}
                    className="mt-0.5 shrink-0"
                    color={brand.gold}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — Types of Rental Property
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white border-t"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              What's Available
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Types of Rental Property in Gurgaon
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Residential */}
            <div
              className="bg-white rounded-3xl overflow-hidden shadow-sm"
              style={{ border: "1px solid #e8e0d6" }}
            >
              <div
                className="px-7 py-5 flex items-center gap-3"
                style={{ backgroundColor: brand.navy }}
              >
                <Home size={20} color={brand.gold} />
                <h3 className="font-semibold text-lg text-white">
                  Residential Property for Rent
                </h3>
              </div>
              <div className="p-7">
                <p className="text-gray-500 text-sm leading-relaxed">
                  Gurgaon offers a wide range of{" "}
                  <strong className="text-gray-700">
                    residential property for rent in Gurgaon
                  </strong>
                  , including apartments, builder floors, and villas located in
                  well-developed areas of Gurugram with access to schools,
                  hospitals, and daily conveniences. These properties are ideal
                  for families and working professionals looking for comfort and
                  accessibility.
                </p>
              </div>
            </div>

            {/* Commercial */}
            <div
              className="bg-white rounded-3xl overflow-hidden shadow-sm"
              style={{ border: "1px solid #e8e0d6" }}
            >
              <div
                className="px-7 py-5 flex items-center gap-3"
                style={{ backgroundColor: brand.navy }}
              >
                <Building2 size={20} color={brand.gold} />
                <h3 className="font-semibold text-lg text-white">
                  Commercial Property for Rent
                </h3>
              </div>
              <div className="p-7">
                <p className="text-gray-500 text-sm leading-relaxed">
                  For businesses, Gurgaon (Gurugram) provides office spaces,
                  retail shops, and commercial units in prime business hubs such
                  as{" "}
                  <strong className="text-gray-700">
                    Cyber City and Udyog Vihar
                  </strong>
                  . These locations offer excellent connectivity and are ideal
                  for companies looking to establish or expand their operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — Best Areas + Why Rent
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 gap-16">
          {/* Left: Best Areas */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Prime Localities
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-5"
              style={{ color: brand.navy }}
            >
              Best Areas to Rent Property in Gurgaon
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              Choosing the right location is essential when selecting a{" "}
              <strong style={{ color: brand.navy }}>
                property for rent in Gurgaon
              </strong>
              . Some areas in Gurugram consistently attract tenants due to their
              infrastructure, connectivity, and proximity to workplaces.
            </p>
            <div className="space-y-4 grid grid-cols-2 gap-5">
              {rentalLocations.map(({ name, desc }) => (
                <div
                  key={name}
                  className="group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-default"
                  style={{ backgroundColor: "#fff", borderColor: "#e8e0d6" }}
                  {...hoverNavy}
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: brand.gold }}
                  >
                    <MapPin size={16} color="#fff" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5 text-gray-900 group-hover:text-white transition-colors duration-300">
                      {name}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-white/60 transition-colors duration-300">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
              <div
                className="rounded-2xl px-5 py-4 border-l-4 text-sm italic"
                style={{
                  backgroundColor: `${brand.gold}0d`,
                  borderLeftColor: brand.gold,
                  color: brand.navy,
                }}
              >
                These locations offer a balance of convenience, connectivity,
                and lifestyle benefits across Gurgaon (Gurugram).
              </div>
            </div>
          </div>

          {/* Right: Why Choose + Find Right Property */}
          <div className="space-y-10">
            {/* Why Rent */}
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] mb-3"
                style={{ color: brand.gold }}
              >
                Key Benefits
              </p>
              <h3
                className="font-heading text-2xl md:text-3xl font-bold mb-5"
                style={{ color: brand.navy }}
              >
                Why Choose Rental Property in Gurgaon
              </h3>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                Many individuals prefer a{" "}
                <strong style={{ color: brand.navy }}>
                  rental property in Gurgaon
                </strong>{" "}
                due to the flexibility and convenience it offers. Gurgaon
                (Gurugram) has developed into a major residential and commercial
                hub, attracting tenants from across the country.
              </p>
              <div className="space-y-3 grid grid-cols-2 gap-5 items-center">
                {whyRent.map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-default"
                    style={{ backgroundColor: "#fff", borderColor: "#e8e0d6" }}
                    {...hoverNavy}
                  >
                    <div
                      className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: brand.gold }}
                    >
                      <Icon size={16} color="#fff" />
                    </div>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-white transition-colors duration-300">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Find Right Property callout */}
            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: brand.navy }}
            >
              <p
                className="text-xs uppercase tracking-[0.3em] mb-3"
                style={{ color: brand.gold }}
              >
                Expert Guidance
              </p>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                Find the Right Property for Rent in Gurgaon
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Finding the right property for rent in Gurgaon depends on your
                budget, preferred location, and lifestyle needs. Whether you are
                looking for a compact apartment, a spacious family home, or a
                premium villa, Gurugram offers options across all segments.
              </p>
              <p className="text-white/50 text-sm italic">
                With expert guidance, you can easily shortlist the best
                properties for rent in Gurgaon and make a confident decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — Testimonials
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white border-t"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] mb-3"
                style={{ color: brand.gold }}
              >
                Client Stories
              </p>
              <h2
                className="font-heading text-3xl md:text-4xl font-bold"
                style={{ color: brand.navy }}
              >
                What Our Clients Say
              </h2>
              <p className="text-gray-500 text-sm mt-3 max-w-lg leading-relaxed">
                Real experiences from clients who found the right property for
                rent in Gurgaon with Crownpoint Estates.
              </p>
            </div>

            {/* Pagination arrows */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setTestimonialPage((p) => Math.max(0, p - 1))}
                disabled={testimonialPage === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
                style={{ borderColor: brand.navy, color: brand.navy }}
              >
                ‹
              </button>
              <span className="text-sm text-gray-400">
                {testimonialPage + 1} / {testiPages}
              </span>
              <button
                onClick={() =>
                  setTestimonialPage((p) => Math.min(testiPages - 1, p + 1))
                }
                disabled={testimonialPage === testiPages - 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
                style={{ borderColor: brand.navy, color: brand.navy }}
              >
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTesti.map(({ initial, name, text }, i) => (
              <div
                key={i}
                className="relative flex flex-col rounded-3xl p-7"
                style={{
                  backgroundColor: "#faf8f5",
                  border: "1px solid #e8e0d6",
                }}
              >
                {/* Decorative quote */}
                <span
                  className="absolute top-5 right-7 font-heading text-6xl leading-none select-none pointer-events-none"
                  style={{ color: `${brand.gold}30` }}
                >
                  "
                </span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <Star
                      key={si}
                      size={13}
                      fill={brand.gold}
                      color={brand.gold}
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                  "{text}"
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
                    style={{ backgroundColor: brand.navy }}
                  >
                    {initial}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: brand.navy }}
                    >
                      {name}
                    </p>
                    <p className="text-xs text-gray-400">Verified Renter</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(testiPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialPage(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === testimonialPage ? "24px" : "8px",
                  backgroundColor:
                    i === testimonialPage ? brand.gold : "#d1c5b8",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseSectionRent />

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — FAQs
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Got Questions?
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              FAQs – Property for Rent in Gurgaon
            </h2>
            <p className="text-gray-500 text-[15px] max-w-xl leading-relaxed">
              Everything you need to know before renting a property in Gurgaon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                index={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — CTA Banner
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: brand.navy, borderColor: brand.navy }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: `${brand.gold}40` }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: brand.gold }}
            />
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: `${brand.gold}40` }}
            />
          </div>

          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: brand.gold }}
          >
            Start Your Search
          </p>

          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Explore the Best Properties for Rent in Gurgaon
          </h2>

          <p className="text-white/65 text-[15px] leading-relaxed max-w-xl">
            Looking for the perfect{" "}
            <strong style={{ color: brand.gold }}>
              property for rent in Gurgaon
            </strong>
            ? Explore verified listings with{" "}
            <strong style={{ color: brand.gold }}>Crownpoint Estates</strong>{" "}
            and find the ideal rental property across Gurugram that matches your
            needs and lifestyle.
          </p>

          <button
            onClick={() => setOpenPopup(true)}
            className="click-btn btn-style5 mt-2"
          >
            Properties for Rent in Gurgaon
          </button>
        </div>
      </section>

      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
      <Footer />
    </>
  );
}
