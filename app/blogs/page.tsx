"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuickEnquiry from "../components/QuickEnquiry";
import axios from "axios";
import heroImg from "../assets/hero/aboutpage.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  datePublished: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const blogsPerPage = 9;

  // ✅ FETCH BLOGS
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/blog/viewblog");

      const data: BlogPost[] = Array.isArray(res.data) ? res.data : [];

      setBlogs(data);
      setFilteredBlogs(data);
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

  // ✅ SEARCH (Fuse.js)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
      return;
    }

    const fuse = new Fuse(blogs, {
      keys: ["title", "author"],
      threshold: 0.4,
    });

    const results = fuse.search(searchTerm).map((r) => r.item);
    setFilteredBlogs(results);
    setCurrentPage(1);
  }, [searchTerm, blogs]);

  // ✅ PAGINATION (SAFE)
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;

  const currentBlogs = Array.isArray(filteredBlogs)
    ? filteredBlogs.slice(indexOfFirst, indexOfLast)
    : [];

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
        <Image
          src={heroImg}
          alt="Blogs"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 h-full flex items-center">
          <div className="w-11/12 md:w-5/6 mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Blogs
            </h1>
            <p className="text-sm tracking-widest text-white/80 uppercase">
              <Link href="/">Home</Link>
              <span className="mx-2">›</span>
              <span>Blogs</span>
            </p>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-16 bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* SECTION HEADER */}
          <div className="mb-16 max-w-2xl">
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
              Our Blog
            </p>

            <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
              Latest insights & updates
            </h2>
          </div>

          {/* BLOG GRID */}
          {loading ? (
            <p className="text-center">Loading blogs...</p>
          ) : currentBlogs.length === 0 ? (
            <p className="text-center text-gray-500">No blogs found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {currentBlogs.map((blog) => (
                <Link
                  href={`/blogs/${blog.slug}`}
                  key={blog._id}
                  className="group block"
                >
                  <article>
                    {/* IMAGE */}
                    <div className="relative h-[260px] overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="mt-6">
                      <p className="text-xs tracking-widest text-[var(--primary-color)] mb-2 uppercase">
                        Blog •{" "}
                        {new Date(blog.datePublished).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>

                      <h3 className="font-heading text-xl text-[var(--primary-bg)] leading-snug group-hover:underline">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        By {blog.author}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <QuickEnquiry />
      <Footer />
    </div>
  );
}
