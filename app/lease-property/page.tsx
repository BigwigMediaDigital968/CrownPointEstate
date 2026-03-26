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

import heroImg from "../assets/hero/for-lease.svg";

import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Home,
  IndianRupee,
  Loader,
  Building2,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Briefcase,
  Users,
  Network,
  ShieldCheck,
} from "lucide-react";
import { WhyChooseSectionLease } from "./WhyChoose";

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
  price: number | null;
  bedrooms?: string;
  bathrooms?: string;
  areaSqft?: string;
  builder?: string;
}

/* ─── STATIC DATA ─── */
const leaseOptions = [
  "Residential apartments and flats for rent",
  "Builder floors and independent houses",
  "Villas and gated community homes",
  "Office spaces in commercial hubs",
  "Retail shops, showrooms, and SCO plots",
];

const locations = [
  {
    name: "Golf Course Road",
    desc: "Premium residential and commercial developments",
  },
  { name: "DLF Phase 1–5", desc: "Established and high-demand areas" },
  { name: "Sohna Road", desc: "Rapidly growing leasing hub" },
  { name: "Dwarka Expressway", desc: "Emerging rental hotspot" },
  {
    name: "Cyber City & Udyog Vihar",
    desc: "Ideal for office and corporate leasing",
  },
];

const whyLease = [
  { icon: MapPin, text: "Strategic location with excellent connectivity" },
  { icon: Users, text: "High demand for residential and commercial spaces" },
  { icon: Building2, text: "Flexible leasing options" },
  { icon: Network, text: "Modern infrastructure and amenities" },
  { icon: Briefcase, text: "Strong corporate and business ecosystem" },
];

const listingBenefits = [
  "Listing and marketing your property",
  "Connecting with verified tenants",
  "Managing site visits and inquiries",
  "Negotiating the best rental value",
  "Ensuring a smooth leasing process",
];

const leaseSteps = [
  "Share your requirements or property details",
  "Shortlist suitable options",
  "Schedule site visits",
  "Finalize rental terms",
  "Complete documentation and agreement",
];

const faqs = [
  {
    q: "How can I find the best property for lease in Gurgaon?",
    a: "You can find the best property for lease in Gurgaon by exploring verified listings, comparing locations, and consulting experts like Crownpoint Estates to match your budget and requirements.",
  },
  {
    q: "What types of property for lease in Gurgaon are available?",
    a: "There are multiple options for property for lease in Gurgaon, including residential apartments, builder floors, villas, office spaces, and retail shops in prime locations.",
  },
  {
    q: "Which are the best areas for property for lease in Gurgaon?",
    a: "Popular areas for property for lease in Gurgaon include Golf Course Road, DLF Phase 1–5, Sohna Road, Dwarka Expressway, and Cyber City due to strong connectivity and demand.",
  },
  {
    q: "Can I find a house for lease in Gurgaon for family living?",
    a: "Yes, you can find a spacious house for lease in Gurgaon, including builder floors and villas, suitable for families looking for comfort and privacy.",
  },
  {
    q: "Is Gurgaon a good location for leasing property?",
    a: "Yes, Gurgaon is a top destination for property for lease in Gurgaon due to its corporate hubs, infrastructure, and high demand for both residential and commercial spaces.",
  },
  {
    q: "Are furnished properties available for lease in Gurgaon?",
    a: "Yes, you can easily find furnished and semi-furnished property for lease in Gurgaon, depending on your needs and budget.",
  },
  {
    q: "How can I list my property for lease in Gurgaon?",
    a: "You can list your property for lease in Gurgaon by contacting Crownpoint Estates or submitting your property details through the website for quick tenant connections.",
  },
  {
    q: "How long does it take to lease a property in Gurgaon?",
    a: "The time required to lease a property in Gurgaon depends on demand, pricing, and location, but professionally listed properties are leased faster.",
  },
  {
    q: "What documents are required for property for lease in Gurgaon?",
    a: "For any property for lease in Gurgaon, basic documents such as ID proof, address proof, and a rental agreement are required for both parties.",
  },
  {
    q: "Why choose Crownpoint Estates for property for lease in Gurgaon?",
    a: "Crownpoint Estates helps you find the best property for lease in Gurgaon with verified listings, local expertise, and end-to-end support for a smooth leasing experience.",
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
        style={{ maxHeight: open ? "200px" : "0px" }}
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
export default function LeasePropertyPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
        console.error("Failed to fetch lease properties", err);
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
    .filter((p) => p.purpose === "Lease")
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
              if (budget === "below-2cr") return p.price < 20000000;
              if (budget === "2cr-5cr")
                return p.price >= 20000000 && p.price <= 50000000;
              if (budget === "above-5cr") return p.price > 50000000;
              return true;
            })()
          : true;
      return matchType && matchBudget;
    });

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
        name: "Lease Property",
        item: "https://www.crownpointestates.com/lease-property",
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
      {/* ── SEO META TAGS ── */}
      <title>
        Lease Property in Gurgaon | Commercial & Residential Spaces Available
      </title>
      <meta
        name="title"
        content="Lease Property in Gurgaon | Commercial & Residential Spaces Available"
      />
      <meta
        name="description"
        content="Looking to lease property in Gurgaon? Find verified tenants or premium spaces with expert assistance. Hassle-free leasing starts here!"
      />
      <meta
        name="keywords"
        content="property for lease in Gurgaon, lease property in Gurgaon, house for lease in Gurgaon, commercial property lease Gurgaon, office space lease Gurgaon, residential lease Gurugram, Crownpoint Estates"
      />
      <meta name="author" content="Crownpoint Estates" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      <link
        rel="canonical"
        href="https://www.crownpointestates.com/lease-property"
      />

      <meta
        property="og:title"
        content="Property for Lease in Gurgaon – Residential & Commercial | Crownpoint Estates"
      />
      <meta
        property="og:description"
        content="Find verified property for lease in Gurgaon — apartments, builder floors, villas, and office spaces. Expert leasing support by Crownpoint Estates."
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/dyum0r6gf/image/upload/v1774263368/for-lease_mojtka.svg"
      />
      <meta
        property="og:url"
        content="https://www.crownpointestates.com/lease-property"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Crownpoint Estates" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Property for Lease in Gurgaon | Crownpoint Estates"
      />
      <meta
        name="twitter:description"
        content="Find verified property for lease in Gurgaon with expert support from Crownpoint Estates."
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/dyum0r6gf/image/upload/v1774263368/for-lease_mojtka.svg"
      />

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ── JSON-LD SCHEMAS ── */}
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
          alt="Lease Property in Gurgaon"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Property for Lease in Gurgaon
                <span className="text-lg md:text-2xl font-medium text-white/80 block mt-2">
                  Verified Residential & Commercial Lease Options
                </span>
              </h1>
              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Lease Property</span>
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
                  <Link href={`/lease-property/${property.slug}`}>
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
                  perfect lease property.
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
          SECTION 1 — Find the Best Property for Lease
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left feature card */}
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
                Lease Experts
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-6">
                Find the Best Property for Lease in Gurgaon
              </h2>
              <div
                className="h-px mb-6"
                style={{ backgroundColor: `${brand.gold}40` }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Powered by Crownpoint Estates — your trusted leasing partner in
                Gurugram.
              </p>
            </div>
            <div
              className="absolute -bottom-5 -right-5 w-14 h-14 rounded-xl z-0"
              style={{ backgroundColor: `${brand.gold}22` }}
            />
          </div>

          {/* Right copy */}
          <div>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
              Looking to{" "}
              <strong style={{ color: brand.navy }}>
                lease property in Gurgaon
              </strong>
              ? The city offers a wide range of residential and commercial
              options suited to different needs and budgets. From modern
              apartments and builder floors to premium office spaces and retail
              outlets, there is no shortage of{" "}
              <strong style={{ color: brand.navy }}>
                property for lease in Gurgaon
              </strong>{" "}
              across well-developed locations like Golf Course Road, DLF Phases,
              Sohna Road, and Dwarka Expressway.
            </p>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
              Gurgaon (Gurugram) has become one of the most preferred
              destinations for leasing due to its strong corporate presence,
              excellent connectivity, and rapidly growing infrastructure.
              Whether you are an individual looking for a home or a business
              searching for a strategic location, finding the right{" "}
              <strong style={{ color: brand.navy }}>
                property for lease in Gurgaon
              </strong>{" "}
              becomes easier with verified listings and expert assistance.
            </p>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              You can also explore options like a{" "}
              <strong style={{ color: brand.gold }}>
                house for lease in Gurgaon
              </strong>{" "}
              for more spacious and independent living.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — Explore Options
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 bg-white border-t"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              What's Available
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-5"
              style={{ color: brand.navy }}
            >
              Explore Property for Lease in Gurgaon Across Top Locations
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              The city caters to working professionals, families, startups, and
              established businesses, making it one of the most active leasing
              markets in the NCR region. Some of the most common options
              include:
            </p>
            <ul className="space-y-3">
              {leaseOptions.map((item, i) => (
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

          {/* Right: Location cards */}
          <div className="space-y-4">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-2"
              style={{ color: brand.gold }}
            >
              Top Locations
            </p>
            {locations.map(({ name, desc }) => (
              <div
                key={name}
                className="group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-default"
                style={{ backgroundColor: "#faf8f5", borderColor: "#e8e0d6" }}
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
              className="rounded-2xl px-5 py-4 border-l-4 text-sm italic mt-2"
              style={{
                backgroundColor: `${brand.gold}0d`,
                borderLeftColor: brand.gold,
                color: brand.navy,
              }}
            >
              Choosing the right locality ensures better convenience,
              accessibility, and long-term value.
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — Why Lease in Gurgaon
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
              Key Benefits
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Why Lease Property in Gurgaon?
            </h2>
            <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
              There are several reasons why individuals and businesses prefer to
              lease property in Gurgaon. The city's proximity to Delhi, combined
              with its well-planned infrastructure, makes it highly accessible
              and convenient.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyLease.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 cursor-default"
                style={{ backgroundColor: "#fff", borderColor: "#e8e0d6" }}
                {...hoverNavy}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: brand.gold }}
                >
                  <Icon size={18} color="#fff" />
                </div>
                <p className="text-sm font-medium leading-snug pt-1 text-gray-800 group-hover:text-white transition-colors duration-300">
                  {text}
                </p>
              </div>
            ))}
            <div
              className="sm:col-span-2 lg:col-span-1 flex items-center p-6 rounded-2xl border border-dashed"
              style={{
                borderColor: brand.gold,
                backgroundColor: `${brand.gold}0d`,
              }}
            >
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: brand.navy }}
              >
                These factors make{" "}
                <strong>property for lease in Gurgaon</strong> a practical and
                attractive choice for both living and business purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — List Your Property (navy)
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: brand.navy, borderColor: brand.navy }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: brand.gold }}
            >
              For Property Owners
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              List Your Property for Lease in Gurgaon
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed mb-6">
              If you are a property owner looking to{" "}
              <strong style={{ color: brand.gold }}>
                lease property in Gurgaon
              </strong>
              , Crownpoint Estates provides a reliable platform to connect with
              genuine tenants. With strong local expertise and a network of
              potential clients, we help you list your property effectively and
              maximize your rental returns.
            </p>
            <div
              className="h-px"
              style={{ backgroundColor: `${brand.gold}30` }}
            />
          </div>
          <div className="space-y-4">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-2"
              style={{ color: brand.gold }}
            >
              We Assist You With
            </p>
            {listingBenefits.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <CheckCircle2
                  size={20}
                  color={brand.gold}
                  className="shrink-0 mt-0.5"
                />
                <p className="text-white/85 text-[15px] leading-snug">{item}</p>
              </div>
            ))}
            <p className="text-white/40 text-sm italic pt-2">
              This ensures faster occupancy and better returns on your property.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — How to Lease
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Step-by-Step
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-5 leading-tight"
              style={{ color: brand.navy }}
            >
              How to Lease Property in Gurgaon
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              The process to{" "}
              <strong style={{ color: brand.navy }}>
                lease property in Gurgaon
              </strong>{" "}
              is straightforward when handled with proper guidance. It begins
              with identifying the right property or listing your own space,
              followed by shortlisting and site visits.
            </p>
            <div
              className="rounded-2xl px-6 py-5 border-l-4 text-sm italic"
              style={{
                backgroundColor: `${brand.gold}0d`,
                borderLeftColor: brand.gold,
                color: brand.navy,
              }}
            >
              With expert support, the process becomes smooth and efficient for
              both tenants and owners.
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute left-[19px] top-6 bottom-6 w-px"
              style={{ backgroundColor: `${brand.gold}40` }}
            />
            <div className="space-y-4">
              {leaseSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div
                    className="relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow"
                    style={{ backgroundColor: brand.navy, color: brand.gold }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="flex-1 rounded-2xl px-5 py-4 bg-white"
                    style={{ border: "1px solid #e8e0d6" }}
                  >
                    <p className="text-gray-800 text-[15px] font-medium leading-snug">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseSectionLease />

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — FAQs
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
              Got Questions?
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              FAQs – Lease Property in Gurgaon
            </h2>
            <p className="text-gray-500 text-[15px] max-w-xl leading-relaxed">
              Everything you need to know before leasing a property in Gurgaon.
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
          SECTION 7 — CTA Banner
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
            Start Your Journey
          </p>

          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Find or List Property for Lease in Gurgaon Today
          </h2>

          <p className="text-white/65 text-[15px] leading-relaxed max-w-xl">
            Whether you want to{" "}
            <strong style={{ color: brand.gold }}>
              lease property in Gurgaon
            </strong>{" "}
            or list your own property for lease in Gurgaon,{" "}
            <strong style={{ color: brand.gold }}>Crownpoint Estates</strong>{" "}
            provides verified options and expert support to help you make the
            right decision.
          </p>

          {/* CTA — opens popup form */}
          <button
            onClick={() => setOpenPopup(true)}
            className="click-btn btn-style5 mt-2"
          >
            Property for Lease in Gurgaon
          </button>
        </div>
      </section>

      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
      <Footer />
    </>
  );
}
