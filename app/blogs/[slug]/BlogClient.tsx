"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Navbar from "@/app/components/Navbar";
import PopupForm from "@/app/components/Popup";
import Footer from "@/app/components/Footer";
import BlogSidebar from "@/app/components/BlogSidebar";
import { formatDate } from "@/app/utils/formatDate";

interface FAQ {
  question: string;
  answer: string;
}

interface BlogPost {
  title: string;
  author: string;
  datePublished: string | Date;
  coverImage: string;
  coverImageAlt: string;
  content: string;
  slug: string;
  faqs?: FAQ[];
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

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          {formatDate(blog.datePublished)}
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

          {/* ======= FAQs SECTION ======= */}
          {blog.faqs && blog.faqs.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold mb-6 text-[var(--primary-color)]">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {blog.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 transition"
                    >
                      <span>{faq.question}</span>
                      <span
                        className={`text-xl transition-transform ${
                          openIndex === index ? "rotate-45" : ""
                        }`}
                        style={{ color: "var(--primary-color)" }}
                      >
                        +
                      </span>
                    </button>

                    {openIndex === index && (
                      <div className="px-5 pb-4 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
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
