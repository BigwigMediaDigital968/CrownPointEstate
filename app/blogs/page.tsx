"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Navbar from "../components/Navbar";
import PopupForm from "../components/Popup";
import Footer from "../components/Footer";
import heroImg from "../assets/hero/for-blog.svg";
import QuickEnquiry from "../components/QuickEnquiry";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  datePublished: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const blogsPerPage = 9;
  const router = useRouter();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get<BlogPost[]>(
        `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`
      );
      setBlogs(res.data);
      setFilteredBlogs(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setBlogs([]);
      setFilteredBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const fuse = new Fuse(blogs, {
        keys: ["title", "author"],
        threshold: 0.4,
      });
      const results = fuse.search(searchTerm).map((res) => res.item);
      setFilteredBlogs(results);
      setCurrentPage(1);
    }
  }, [searchTerm, blogs]);

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[90vh] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <Image
          src={heroImg}
          alt="About Us"
          fill
          priority
          className="object-cover"
        />

        {/* DARK OVERLAY (OPTIONAL – improves contrast) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Blogs
              </h1>

              <p className="text-sm tracking-widest text-white/80 uppercase">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Blogs</span>
              </p>
            </div>

            {/* RIGHT SIDE – QUICK ENQUIRY */}
            <div className="hidden lg:flex justify-end">
              <QuickEnquiry />
            </div>
          </div>
        </div>
      </section>

      <div className="w-11/12 md:w-5/6 mx-auto flex flex-col gap-8 py-[40px]">
        {/* Search Bar */}
        <div className="sticky top-[80px] z-10 bg-white py-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search blogs by title or author"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
        </div>

        {loading ? (
          /* 🔄 LOADER */
          <div className="flex flex-col justify-center items-center min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading blogs...</p>
          </div>
        ) : currentBlogs.length === 0 ? (
          /* ❌ NO DATA STATE */
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-10 max-w-xl w-full text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                📄
              </div>

              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                No Blogs Available
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                We don’t have any blogs matching your search right now. If
                you’re looking for expert real estate advice, our team is happy
                to help.
              </p>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Talk to Our Expert
              </button>
            </div>
          </div>
        ) : (
          /* ✅ BLOG GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentBlogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-200"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between h-[180px]">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-1">
                      {new Date(blog.datePublished).toLocaleDateString()}
                    </p>
                    <p className="text-gray-800 text-sm">
                      By <span className="font-medium">{blog.author}</span>
                    </p>
                  </div>

                  <span className="mt-4 self-start text-[var(--primary-color)] font-semibold group-hover:underline transition">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2 flex-wrap gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-200 ${
                  currentPage === idx + 1
                    ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <PopupForm open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <Footer />
    </div>
  );
};

export default Blogs;
