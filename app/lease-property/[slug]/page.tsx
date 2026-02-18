import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import LeaseDetails from "./LeaseDetails";

const SITE_URL = "https://www.crownpointestates.com";

/* ===============================
   FETCH PROPERTY
================================ */

async function getProperty(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/property/${slug}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return notFound();

    return res.json();
  } catch (error) {
    console.error("Lease Property Fetch Error:", error);
    return notFound();
  }
}

/* ===============================
   DYNAMIC METADATA (SEO)
================================ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // ✅ Next 15 fix
  const property = await getProperty(slug);

  const url = `${SITE_URL}/lease-property/${property.slug}`;

  const bedrooms = property.bedrooms ? `${property.bedrooms} BHK` : "";
  const area = property.areaSqft || "";
  const location = property.location || "";

  const dynamicTitle =
    property.metatitle ||
    `${bedrooms} ${property.type} for Lease in ${location} | CROWNPOINT ESTATES`;

  const dynamicDescription =
    property.metadescription ||
    `Lease ${bedrooms} ${property.type} in ${location}. Area: ${area}. Premium leasing options listed by CROWNPOINT ESTATES with expert assistance and verified listings.`;

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true },

    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      url,
      siteName: "CROWNPOINT ESTATES",
      locale: "en_IN",
      type: "article",
      images: [
        {
          url: property.images?.[0] || `${SITE_URL}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: dynamicDescription,
      images: [property.images?.[0] || `${SITE_URL}/og-default.jpg`],
    },
  };
}

/* ===============================
   PAGE + STRUCTURED DATA
================================ */

export default async function LeaseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Next 15 fix
  const property = await getProperty(slug);

  const url = `${SITE_URL}/lease-property/${property.slug}`;

  const areaValue = property.areaSqft
    ? property.areaSqft.replace(/[^\d]/g, "")
    : null;

  /* ----- Real Estate Schema ----- */

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url,
    image: property.images,
    datePosted: property.createdAt,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    floorSize: areaValue
      ? {
          "@type": "QuantitativeValue",
          value: areaValue,
          unitCode: "SQF",
        }
      : undefined,
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    offers: {
      "@type": "Offer",
      price: property.price || "On Request",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,
    },
    seller: {
      "@type": "RealEstateAgent",
      name: "CROWNPOINT ESTATES",
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Lease Property",
        item: `${SITE_URL}/lease-property`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <LeaseDetails property={property} />
    </>
  );
}
