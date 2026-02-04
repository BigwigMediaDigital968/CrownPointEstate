import { Metadata } from "next";
import Script from "next/script";
import BlogClient from "./BlogClient";

/* ---- Types ---- */

interface FAQType {
  question: string;
  answer: string;
}

interface BlogType {
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  datePublished: string;
  lastUpdated?: string;
  content: string;
  slug: string;
  tags?: string[];
  faqs?: FAQType[];
  schemaMarkup?: string[]; // manually added schemas (JSON strings)
}

interface RelatedBlogType {
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  datePublished: string;
}

/* ---------------------------------------------
 Data Fetching
--------------------------------------------- */

async function getBlog(slug: string): Promise<BlogType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blog");

  const blogs: BlogType[] = await res.json();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) throw new Error("Blog not found");

  return blog;
}

async function getRelatedBlogs(slug: string): Promise<RelatedBlogType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/blog/related/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  return res.json();
}

/* ---- Schema Generators ---- */

function getBreadcrumbSchema(blog: BlogType) {
  return {
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
        name: "Blogs",
        item: "https://www.crownpointestates.com/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://www.crownpointestates.com/blogs/${blog.slug}`,
      },
    ],
  };
}

function getArticleSchema(blog: BlogType) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Crownpoint Estates",
      logo: {
        "@type": "ImageObject",
        url: "https://www.crownpointestates.com/logo.png",
      },
    },
    datePublished: blog.datePublished,
    dateModified: blog.lastUpdated || blog.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.crownpointestates.com/blogs/${blog.slug}`,
    },
  };
}

function getFAQSchema(blog: BlogType) {
  if (!blog.faqs || blog.faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blog.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* ---- Metadata ---- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // ✅ unwrap Promise
  const blog = await getBlog(slug);

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: blog.tags?.join(", "),
    alternates: {
      canonical: `https://www.crownpointestates.com/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://www.crownpointestates.com/blogs/${blog.slug}`,
      siteName: "CROWNPOINT ESTATES",
      type: "article",
      locale: "en_IN",
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

/* ---------------------------------------------
 Page (Server Component)
--------------------------------------------- */

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ unwrap Promise
  const blog = await getBlog(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  const schemas = [
    getBreadcrumbSchema(blog),
    getArticleSchema(blog),
    getFAQSchema(blog),
    ...(blog.schemaMarkup || [])
      .map((s) => {
        try {
          return JSON.parse(s);
        } catch {
          return null;
        }
      })
      .filter(Boolean),
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      <BlogClient blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
}
