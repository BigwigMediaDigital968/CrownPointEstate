"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PopupForm from "../../components/Popup";
import ButtonFill from "../../components/ButtonFill";

// Icons
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  IndianRupee,
  Phone,
} from "lucide-react";
import { useState } from "react";

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
  description?: string;
}

export default function LeaseDetails({ property }: { property: Property }) {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={property.images?.[0] || "/placeholder.jpg"}
          alt={property.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-0 right-0">
          <div className="w-11/12 md:w-5/6 mx-auto text-white">
            <span className="inline-block mb-3 bg-black px-4 py-1 rounded-full text-xs uppercase">
              Lease Property
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {property.title}
            </h1>
            <p className="flex items-center gap-2">
              <MapPin size={18} />
              {property.location}
            </p>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold mb-6">Property Details</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {property.bedrooms && (
                <div className="flex gap-3">
                  <BedDouble /> {property.bedrooms} Bedrooms
                </div>
              )}
              {property.bathrooms && (
                <div className="flex gap-3">
                  <Bath /> {property.bathrooms} Bathrooms
                </div>
              )}
              {property.areaSqft && (
                <div className="flex gap-3">
                  <Ruler /> {property.areaSqft} Sqft
                </div>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {property.description ||
                "Contact our expert team for complete details about this lease property."}
            </p>
          </div>

          {/* RIGHT */}
          <div className="sticky top-28 border rounded-3xl p-6 shadow-lg bg-white">
            <h3 className="text-xl font-semibold mb-4">Lease Price</h3>

            <p className="flex items-center gap-2 text-3xl font-bold mb-6">
              <IndianRupee />
              {typeof property.price === "number"
                ? property.price.toLocaleString()
                : "On Request"}
            </p>

            <ButtonFill
              text="Enquire Now"
              className="w-full mb-4"
              onClick={() => setOpenPopup(true)}
            />

            <Link href="tel:919999000183">
              <ButtonFill
                className="w-full flex gap-2 justify-center"
                text={
                  <>
                    <Phone size={18} />
                    Call Now
                  </>
                }
              />
            </Link>
          </div>
        </div>
      </section>

      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
      <Footer />
    </div>
  );
}
