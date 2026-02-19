"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ButtonFill from "../../components/ButtonFill";
import BrochureLeadModal from "../../components/BrochureLeadModal";

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
  Home,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
interface Property {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  purpose: "Buy" | "Rent" | "Lease";
  location?: string;
  images: string[];
  price?: number | null;
  bedrooms?: string;
  bathrooms?: string;
  areaSqft?: string;
  description?: string;

  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  videoLink: string;
  googleMapUrl?: string;
  brochure?: string;
  extraDetails?: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export default function LeaseDetailsClient({
  property,
}: {
  property: Property;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [visibleParagraphs, setVisibleParagraphs] = useState(2);

  /* Brochure lead state (same as Buy) */
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

  const displayedImages = property.images?.slice(0, 6) || [];
  const extraCount = (property.images?.length || 0) - displayedImages.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmitLead = async () => {
    if (!leadData.name || !/^\d{10}$/.test(leadData.phone)) {
      alert("Please enter valid details");
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

      if (!res.ok) throw new Error("Lead failed");

      sessionStorage.setItem("brochureLeadSubmitted", "true");
      setLeadSubmitted(true);
      setIsLeadModalOpen(false);
      window.open(property.brochure, "_blank");
    } catch {
      alert("Something went wrong");
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

      {/* HERO SLIDER */}
      <section className="relative h-[60vh] md:h-[80vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay
          loop
          className="h-full"
        >
          {property.images.map((img, idx) => (
            <SwiperSlide key={idx} className="h-full">
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`Property ${idx + 1}`}
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
        {/* LEFT – GALLERY */}
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

        {/* RIGHT – DETAILS */}
        <div className="sticky top-24 space-y-6">
          <h1 className="text-3xl font-bold">{property.title}</h1>

          {property.location && (
            <p className="flex items-center gap-2 text-lg">
              <MapPin size={18} /> {property.location}
            </p>
          )}

          <p className="text-2xl font-bold flex items-center gap-2">
            <IndianRupee />
            {property.price?.toLocaleString() || "On Request"}
          </p>

          {/* <div className="flex flex-wrap gap-3">
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
                <Ruler size={16} /> {property.areaSqft} 
              </span>
            )}
          </div> */}

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            {property.purpose && (
              <span className="px-4 py-2 bg-gray-100  rounded-lg shadow flex items-center gap-2 text-gray-800">
                <Home size={18} /> {property.purpose}
              </span>
            )}
            {property.bedrooms && (
              <span className="px-4 py-2 bg-gray-100  rounded-lg shadow flex items-center gap-2 text-gray-800">
                <BedDouble size={18} /> {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms && (
              <span className="px-4 py-2 bg-gray-100  rounded-lg shadow flex items-center gap-2 text-gray-800">
                🛁 {property.bathrooms} Baths
              </span>
            )}
            {property.areaSqft && (
              <span className="px-4 py-2 bg-gray-100  rounded-lg shadow flex items-center gap-2 text-gray-800">
                📐 {property.areaSqft}
              </span>
            )}
          </div>

          <h2 className="text-xl font-semibold">About this Property</h2>
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>

          {/* Highlights */}
          {property.highlights?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-6">Highlights</h3>
              <div className="flex flex-wrap gap-3">
                {property.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-(--featured) rounded-full text-sm"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Brochure */}
          {property.brochure && (
            <ButtonFill
              text="📄 View Brochure"
              onClick={() =>
                leadSubmitted
                  ? window.open(property.brochure, "_blank")
                  : setIsLeadModalOpen(true)
              }
            />
          )}
        </div>
      </section>

      {/* Video */}
      {property.videoLink && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6">Virtual Tour</h2>
          <div className="h-112.5 rounded-xl overflow-hidden">
            <iframe
              src={getYouTubeEmbedUrl(property.videoLink)!}
              width="100%"
              height="100%"
            />
          </div>
        </section>
      )}

      {/* Features */}
      {property.featuresAmenities?.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6">Features & Amenities</h2>
          <div className="flex flex-wrap gap-3">
            {property.featuresAmenities.map((f, i) => (
              <span key={i} className="px-4 py-2 bg-(--featured) rounded-full">
                {f}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Nearby */}
      {property.nearby?.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6">Nearby Places</h2>
          <div className="flex flex-wrap gap-3">
            {property.nearby.map((n, i) => (
              <span key={i} className="px-5 py-2 bg-(--featured) rounded-full">
                {n}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Extra Details */}
      {property.extraDetails && (
        <section className="py-16 border-t">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <h2 className="text-3xl font-bold mb-6">Property Description</h2>

            {(() => {
              const paragraphs = property.extraDetails
                .split("</p>")
                .filter((p) => p.trim() !== "");

              const visibleContent =
                paragraphs.slice(0, visibleParagraphs).join("</p>") + "</p>";

              return (
                <>
                  <div
                    className="prose max-w-none prose-headings:font-semibold prose-p:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: visibleContent }}
                  />

                  {visibleParagraphs < paragraphs.length && (
                    <div className="mt-6">
                      <button
                        onClick={() => setVisibleParagraphs((prev) => prev + 2)}
                        className="text-(--primary-color) font-semibold hover:underline"
                      >
                        Read More
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>
      )}

      {/* Faqs */}
      {/* FAQs */}
      {property.faqs && property.faqs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="w-11/12 md:w-4/6 mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {property.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group border rounded-xl p-5 bg-white shadow-sm"
                >
                  <summary className="cursor-pointer font-semibold text-lg flex justify-between items-center">
                    {faq.question}
                    <span className="transition group-open:rotate-180">⌄</span>
                  </summary>

                  <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map */}
      {property.googleMapUrl && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6">Location</h2>
          <iframe
            src={property.googleMapUrl}
            width="100%"
            height="450"
            className="rounded-xl"
          />
        </section>
      )}

      <Link href="tel:919999000183">
        <div className="fixed bottom-6 right-6 bg-(--primary-color) p-4 rounded-full shadow-xl">
          <Phone />
        </div>
      </Link>

      <Footer />

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={property.images.map((img) => ({ src: img }))}
          index={photoIndex}
          plugins={[Fullscreen, Slideshow]}
        />
      )}

      {/* Brochure Lead Modal */}
      <BrochureLeadModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        leadData={leadData}
        setLeadData={setLeadData}
        onSubmit={handleSubmitLead}
        loading={loadingLead}
      />
    </div>
  );
}
