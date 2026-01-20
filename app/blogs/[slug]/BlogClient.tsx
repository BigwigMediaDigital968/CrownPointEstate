"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Navbar from "@/app/components/Navbar";
import PopupForm from "@/app/components/Popup";
import Footer from "@/app/components/Footer";
import BlogSidebar from "@/app/components/BlogSidebar";

interface BlogPost {
  title: string;
  author: string;
  datePublished: string | Date;
  coverImage: string;
  coverImageAlt: string;
  content: string;
  slug: string;
}

interface RelatedBlog {
  slug: string;
  coverImage: string;
  title: string;
  datePublished: string | Date;
}

export default function BlogClient({
  blog,
  relatedBlogs,
}: {
  blog: BlogPost;
  relatedBlogs: RelatedBlog[];
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ✅ Listen for popup buttons inside blog HTML
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-open-popup='true']")) {
        setIsPopupOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* ======= BLOG HEADER ======= */}
      <section className="w-11/12 md:w-5/6 mx-auto pt-[100px] md:pt-[140px]">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{blog.title}</h1>
        <p className="text-gray-500 mb-6">
          By <span className="font-semibold">{blog.author}</span> •{" "}
          {new Date(blog.datePublished).toLocaleDateString()}
        </p>
      </section>

      {blog.coverImage && (
        <div className="relative w-11/12 md:w-5/6 mx-auto h-[40vh] md:h-[60vh] lg:h-[100vh] rounded-xl overflow-hidden">
          <Image
            src={blog.coverImage}
            alt={blog.coverImageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ======= BLOG CONTENT ======= */}
      <section className="w-11/12 md:w-5/6 mx-auto my-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT – BLOG */}
        <article className="lg:col-span-8">
          <div
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* RIGHT – SIDEBAR */}
        <div className="lg:col-span-4">
          <BlogSidebar relatedBlogs={relatedBlogs} />
        </div>
      </section>

      {/* ======= POPUP ======= */}
      <PopupForm open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <Footer />
    </div>
  );
}
