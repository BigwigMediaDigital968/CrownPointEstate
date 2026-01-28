"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ButtonFill from "../../components/ButtonFill";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  IndianRupee,
  Phone,
} from "lucide-react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

interface Property {
  _id: string;
  title: string;
  slug: string;
  purpose?: "Rent" | "Lease";
  location?: string;
  price?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSqft?: number | null;
  images: string[];
  description: string;
  highlights: string[];
  nearby: string[];
  featuresAmenities: string[];
  videoLink?: string;
  googleMapUrl?: string;
  brochure?: string;
}

export default function RentDetailsClient({
  property,
}: {
  property: Property;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Brochure lead state
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [loadingLead, setLoadingLead] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    countryCode: "+91",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const submitted = sessionStorage.getItem("brochureLeadSubmitted");
    if (submitted) setLeadSubmitted(true);
  }, []);

  if (!property)
    return <p className="text-center mt-20 text-xl">Property not found</p>;

  const displayedImages = property.images.slice(0, 6);
  const extraCount = property.images.length - displayedImages.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmitLead = async () => {
    if (!leadData.name || !/^\d{10}$/.test(leadData.phone)) {
      alert("Please enter a valid name and phone number");
      return;
    }

    setLoadingLead(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/brochure-leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
        },
      );

      if (!res.ok) throw new Error("Lead submission failed");

      sessionStorage.setItem("brochureLeadSubmitted", "true");
      setLeadSubmitted(true);
      setIsLeadModalOpen(false);
      window.open(property.brochure, "_blank");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingLead(false);
    }
  };

  function getYouTubeEmbedUrl(url: string) {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      }
      if (parsed.hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
      }
      return null;
    } catch {
      return null;
    }
  }

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[50vh] md:h-[80vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop
          className="h-full"
        >
          {property.images.map((img, idx) => (
            <SwiperSlide key={idx} className="h-full">
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`Property Image ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* MAIN */}
      <section className="grid md:grid-cols-2 gap-10 w-11/12 md:w-5/6 mx-auto py-16">
        {/* GALLERY */}
        <div className="columns-2 gap-4 space-y-4">
          {displayedImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setPhotoIndex(idx);
                setIsOpen(true);
              }}
              className="cursor-pointer overflow-hidden shadow"
            >
              <Image
                src={img}
                alt=""
                width={600}
                height={400}
                className="hover:scale-105 transition"
              />
            </div>
          ))}

          {extraCount > 0 && (
            <div
              className="h-40 flex items-center justify-center bg-gray-200 text-2xl font-bold cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              +{extraCount} more
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="sticky top-24 space-y-6">
          <h1 className="text-3xl font-bold">{property.title}</h1>

          {property.location && (
            <p className="flex items-center gap-2 text-lg">
              <MapPin size={18} />
              {property.location}
            </p>
          )}

          {typeof property.price === "number" && (
            <p className="text-2xl font-bold flex items-center gap-2">
              <IndianRupee />
              {property.price.toLocaleString()}
              <span className="text-base text-gray-500">/ month</span>
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {property.bedrooms && (
              <span className="badge">
                <BedDouble size={16} /> {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms && (
              <span className="badge">
                <Bath size={16} /> {property.bathrooms} Baths
              </span>
            )}
            {property.areaSqft && (
              <span className="badge">
                <Ruler size={16} /> {property.areaSqft} Sqft
              </span>
            )}
          </div>

          <h2 className="text-xl font-semibold">About this Property</h2>
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>

          {/* Highlights */}
          {property?.highlights?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-6">Highlights</h3>
              <div className="flex flex-wrap gap-3">
                {property.highlights.map((h: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-[var(--featured)] rounded-full shadow text-sm text-[var(--text)]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* BROCHURE */}
          {property.brochure && (
            <section className="pt-4">
              <ButtonFill
                text="📄 View Brochure"
                onClick={() => {
                  if (leadSubmitted) {
                    window.open(property.brochure, "_blank");
                  } else {
                    setIsLeadModalOpen(true);
                  }
                }}
              />
            </section>
          )}
        </div>
      </section>

      {/* VIDEO */}
      {property.videoLink && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6">Virtual Tour</h2>
          <div className="h-[450px] rounded-xl overflow-hidden">
            <iframe
              src={getYouTubeEmbedUrl(property.videoLink)!}
              width="100%"
              height="100%"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Features & Amenities */}
      {property?.featuresAmenities?.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6">Features & Amenities</h2>
          <div className="flex flex-wrap gap-3">
            {property.featuresAmenities.map((f: string, idx: number) => (
              <div
                key={idx}
                className="px-4 py-2 bg-[var(--featured)] rounded-full shadow text-sm"
              >
                {f}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Nearby Places */}
      {property?.nearby?.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6">Nearby Places</h2>
          <div className="flex flex-wrap gap-3">
            {property.nearby.map((n: string, idx: number) => (
              <span
                key={idx}
                className="px-5 py-2 bg-[var(--featured)] rounded-full"
              >
                {n}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* MAP */}
      {property.googleMapUrl && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6">Location</h2>
          <iframe
            src={property.googleMapUrl}
            width="100%"
            height="450"
            loading="lazy"
            className="rounded-xl border-0"
          />
        </section>
      )}

      {/* FLOATING CONTACT */}
      <Link href="tel:919999000183">
        <div className="fixed bottom-6 right-6 bg-[var(--primary-color)] p-4 rounded-full shadow-xl">
          <Phone />
        </div>
      </Link>

      <Footer />

      {/* LIGHTBOX */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={property.images.map((img) => ({ src: img }))}
          index={photoIndex}
          plugins={[Fullscreen, Slideshow]}
        />
      )}

      {/* Lead Modal – SAME AS BUY PROPERTY */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl w-11/12 max-w-md shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsLeadModalOpen(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Get Your Brochure
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                value={leadData.name}
                onChange={handleInputChange}
              />

              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[var(--primary-color)]">
                <select
                  name="countryCode"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-3 outline-none border-r border-gray-300 dark:border-gray-600"
                  value={leadData.countryCode}
                  onChange={(e) =>
                    setLeadData({ ...leadData, countryCode: e.target.value })
                  }
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number*"
                  className="flex-1 p-3 bg-transparent text-gray-800 dark:text-white outline-none"
                  value={leadData.phone}
                  onChange={handleInputChange}
                  pattern="^[0-9]{10}$"
                  title="Please enter a valid 10-digit phone number"
                />
              </div>

              <ButtonFill
                onClick={handleSubmitLead}
                text={loadingLead ? "Submitting..." : "Submit & View Brochure"}
                className="mt-2"
              />
            </div>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              We respect your privacy. Your information will not be shared.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
