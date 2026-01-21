"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ButtonFill from "@/app/components/ButtonFill";

import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

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
  highlights?: string[];
  nearby?: string[];
  featuresAmenities?: string[];
  videoLink?: string;
  googleMapUrl?: string;
}

export default function RentDetailsClient({
  property,
}: {
  property: Property;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return <p className="text-center mt-20 text-xl">Property not found</p>;
  }

  const displayedImages = property.images.slice(0, 6);
  const extraCount = property.images.length - displayedImages.length;

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

  console.log(property);

  return (
    <div>
      <Navbar />

      {/* HERO SLIDER */}
      <section className="relative h-[50vh] md:h-[80vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop
          className="h-full"
        >
          {property.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`Property Image ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* MAIN CONTENT */}
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
              className="relative cursor-pointer overflow-hidden shadow"
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
              className="flex items-center justify-center bg-gray-200 h-40 text-2xl font-bold cursor-pointer"
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
              <MapPin size={18} />
              {property.location}
            </p>
          )}

          {/* PRICE */}
          {typeof property.price === "number" && (
            <p className="text-2xl font-bold flex items-center gap-2">
              <IndianRupee />
              {property.price.toLocaleString()}
              <span className="text-base font-medium text-gray-500">
                / month
              </span>
            </p>
          )}

          {/* BADGES */}
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

          {/* DESCRIPTION */}
          <h2 className="text-xl font-semibold">About this Property</h2>
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>
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
    </div>
  );
}
