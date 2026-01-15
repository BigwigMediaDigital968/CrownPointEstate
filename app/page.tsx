"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/Hero";
import About from "./components/home/About";
import project1 from "./assets/projects/project.jpg";
import project2 from "./assets/projects/project_2.jpg";
import project3 from "./assets/projects/project_3.jpg";
import project4 from "./assets/projects/project_4.jpg";
import project5 from "./assets/projects/project_5.jpg";
import client1 from "./assets/cpe-logo.png";
import Footer from "./components/Footer";
import QuickEnquiry from "./components/QuickEnquiry";
import WhyChooseUs from "./components/home/WhyChooseUs";
import FactsSection from "./components/home/Fact";
import TestimonialSection from "./components/home/Testimonial";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { useEffect, useState } from "react";
import PopupForm from "./components/Popup";
import Link from "next/link";

const projects = [
  {
    id: "01",
    title: "New 4 BHK Builder Floor ",
    location: "DLF Phase 2, Gurugram",
    image: project1,
    link: "/buy-property/new-4-bhk-builder-floor-for-sale-in-dlf-phase-2-gurugram",
  },
  {
    id: "02",
    title: "Smart City",
    location: "Oklahoma, USA",
    image: project2,
    link: "/buy-property/new-4-bhk-builder-floor-for-sale-in-dlf-phase-2-gurugram",
  },
  {
    id: "03",
    title: "Centre Park",
    location: "Tennessee, USA",
    image: project3,
    link: "/buy-property/new-4-bhk-builder-floor-for-sale-in-dlf-phase-2-gurugram",
  },
  {
    id: "04",
    title: "ReHomes Gardenia",
    location: "South Carolina, USA",
    image: project4,
    link: "/buy-property/new-4-bhk-builder-floor-for-sale-in-dlf-phase-2-gurugram",
  },
  {
    id: "05",
    title: "Golden River",
    location: "North Carolina, USA",
    image: project5,
    link: "/buy-property/new-4-bhk-builder-floor-for-sale-in-dlf-phase-2-gurugram",
  },
];

const clients = [
  { id: 1, logo: client1, name: "Client 1" },
  { id: 2, logo: client1, name: "Client 2" },
  { id: 3, logo: client1, name: "Client 3" },
  { id: 4, logo: client1, name: "Client 4" },
  { id: 5, logo: client1, name: "Client 5" },
  { id: 6, logo: client1, name: "Client 6" },
];

const blogs = [
  {
    id: 1,
    title: "How smart planning transforms modern living",
    category: "Real Estate",
    date: "March 18, 2024",
    image: project1,
  },
  {
    id: 2,
    title: "Luxury apartments vs villas: What to choose?",
    category: "Insights",
    date: "March 10, 2024",
    image: project2,
  },
  {
    id: 3,
    title: "Why location matters more than price",
    category: "Investment",
    date: "March 05, 2024",
    image: project3,
  },
  {
    id: 4,
    title: "Why location matters more than price",
    category: "Investment",
    date: "March 05, 2024",
    image: project4,
  },
];

export default function Home() {
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });

    const timer = setTimeout(() => {
      setOpenPopup(true);
    }, 1500);

    // Cleanup (important)
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <About />
      <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div className="flex items-end justify-between mb-8">
            <div data-aos="fade-up">
              <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
                Featured Projects
              </p>
              <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
                Where happiness lives
              </h2>
            </div>

            <a
              data-aos="zoom-in"
              data-aos-delay="150"
              href="#"
              className="hidden md:flex items-center gap-2 text-sm tracking-widest text-[var(--primary-color)] hover:underline"
            >
              VIEW ALL PROJECTS →
            </a>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:auto-rows-[280px]">
            {projects.map((project, index) => {
              const isTall = index === 0;

              return (
                <div
                  key={project.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                  className={`group relative overflow-hidden rounded-md
          ${isTall ? "lg:row-span-2" : ""}
        `}
                >
                  <Link href={project.link}>
                    {/* IMAGE */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-105
            h-[260px] sm:h-[280px] lg:h-full
          `}
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-[var(--primary-bg)]/40 group-hover:bg-[var(--primary-bg)]/60 transition duration-500" />

                    {/* HUGE NUMBER */}
                    <span className="absolute bottom-6 right-6 text-[100px] lg:text-[120px] font-heading text-white opacity-20 group-hover:opacity-60 transition duration-500 leading-none select-none">
                      {project.id}
                    </span>

                    {/* TEXT */}
                    <div className="absolute bottom-6 left-6 z-10 text-white">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-200">
                        {project.location}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <FactsSection />
      <TestimonialSection />
      <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="text-center mb-8">
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
              Our Clients
            </p>
            <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
              Trusted by leading brands
            </h2>
          </div>
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={3500}
            spaceBetween={24}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="!py-4"
          >
            {clients.map((client) => (
              <SwiperSlide key={client.id}>
                <div className=" flex items-center justify-center bg-white border-gray-200 rounded-md hover:shadow-md transition">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={70}
                    height={70}
                    className="object-cover transition invert"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* <QuickEnquiry /> */}

      <section className="py-16 bg-white overflow-hidden">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div
            className="flex items-end justify-between mb-14"
            data-aos="fade-up"
          >
            <div>
              <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
                Our Blog
              </p>
              <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
                Latest insights & updates
              </h2>
            </div>

            <a
              href="/blog"
              className="hidden md:block text-sm tracking-widest text-[var(--primary-color)] hover:underline"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              VIEW ALL →
            </a>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* FEATURED BLOG */}
            <div
              className="lg:col-span-2 group"
              data-aos="fade-up"
              data-aos-delay="200"
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
                  {blogs[0].category} • {blogs[0].date}
                </p>
                <h3 className="font-heading text-2xl text-[var(--primary-bg)] leading-snug">
                  {blogs[0].title}
                </h3>
              </div>
            </div>

            {/* SIDE BLOGS */}
            <div className="flex flex-col gap-16">
              {blogs.slice(1).map((blog, index) => (
                <div
                  key={blog.id}
                  className="group flex gap-6"
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 120}
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
                      {blog.category} • {blog.date}
                    </p>
                    <h4 className="font-heading text-lg text-[var(--primary-bg)] leading-snug">
                      {blog.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
      <Footer />
    </div>
  );
}
