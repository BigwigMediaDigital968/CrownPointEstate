"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

interface Blog {
  _id: string;
  title: string;
  image: string;
  category: string;
  createdAt: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs");
      }
    };

    fetchBlogs();
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="w-11/12 md:w-5/6 mx-auto">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-14" data-aos="fade-up">
          <div>
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
              Our Blog
            </p>
            <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
              Latest insights & updates
            </h2>
          </div>

          <Link
            href="/blogs"
            className="hidden md:block text-sm tracking-widest text-[var(--primary-color)] hover:underline"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* FEATURED BLOG */}
          <Link
            href={`/blogs/${blogs[0]._id}`}
            className="lg:col-span-2 group"
            data-aos="fade-up"
          >
            <div className="relative h-[300px] md:h-[420px] overflow-hidden">
              <Image
                src={blogs[0].image}
                alt={blogs[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="mt-6">
              <p className="text-xs tracking-widest text-[var(--primary-color)] mb-2">
                {blogs[0].category} •{" "}
                {new Date(blogs[0].createdAt).toLocaleDateString()}
              </p>
              <h3 className="font-heading text-2xl text-[var(--primary-bg)] leading-snug">
                {blogs[0].title}
              </h3>
            </div>
          </Link>

          {/* SIDE BLOGS */}
          <div className="flex flex-col gap-16">
            {blogs.slice(1).map((blog, index) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog._id}`}
                className="group flex gap-6"
                data-aos="fade-up"
                data-aos-delay={200 + index * 120}
              >
                <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div>
                  <p className="text-xs tracking-widest text-[var(--primary-color)] mb-2">
                    {blog.category} •{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <h4 className="font-heading text-lg text-[var(--primary-bg)] leading-snug">
                    {blog.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
