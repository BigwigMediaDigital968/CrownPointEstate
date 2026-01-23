import type { MetadataRoute } from "next";

const SITE_URL = "https://www.crownpointestates.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  return [
    {
      url: `${SITE_URL}/`,
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/about`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/buy-property`,
      priority: 0.9,
      changeFrequency: "daily",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/sell-property`,
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: today,
    },
    {
      // Fixed from http -> https (recommended for production sitemap)
      url: `${SITE_URL}/lease-property`,
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/rent-property`,
      priority: 0.9,
      changeFrequency: "daily",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/blogs`,
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/contact`,
      priority: 0.6,
      changeFrequency: "monthly",
      lastModified: today,
    },

    // Buy property detail pages
    {
      url: `${SITE_URL}/buy-property/m3m-residences-by-elie-saab`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/buy-property/smartworld-elie-saab-noida`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/buy-property/premium-builder-floor-for-sale-in-dlf-phase-2`,
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/buy-property/new-4-bhk-builder-floor-for-sale-in-dlf-phase-2-gurugram`,
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: today,
    },

    // Rent property detail pages
    {
      url: `${SITE_URL}/rent-property/b-block-300-sq-yards-premium-residential-options`,
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: today,
    },
    {
      url: `${SITE_URL}/rent-property/semi-furnished-31-bhk-for-rent-in-sushant-lok-1-gurugram`,
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: today,
    },
  ];
}
