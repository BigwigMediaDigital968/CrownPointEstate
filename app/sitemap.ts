import type { MetadataRoute } from "next";

const SITE_URL = "https://www.crownpointestates.com";

interface BlogType {
  slug: string;
  datePublished: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString();

  /* -----------------------------
     Fetch Blogs Dynamically
  ----------------------------- */
  let blogs: BlogType[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`,
      {
        next: { revalidate: 3600 }, // regenerate every 1 hour
      },
    );

    if (res.ok) {
      blogs = await res.json();
    }
  } catch (error) {
    console.error("Sitemap blog fetch error:", error);
  }

  /* -----------------------------
     Static Pages
  ----------------------------- */
  const staticPages: MetadataRoute.Sitemap = [
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
  ];

  /* -----------------------------
     Blog Pages (Auto Generated)
  ----------------------------- */
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
    lastModified: blog.datePublished ? new Date(blog.datePublished) : today,
  }));

  return [...staticPages, ...blogPages];
}
