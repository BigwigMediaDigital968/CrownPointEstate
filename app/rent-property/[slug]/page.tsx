import type { Metadata } from "next";
import RentDetailsClient from "./RentDetails";

async function getProperty(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/property/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch property");
  return res.json();
}

export default async function RentDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(slug);

  return <RentDetailsClient property={property} />;
}
