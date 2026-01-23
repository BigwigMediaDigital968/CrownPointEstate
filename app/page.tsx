"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/Hero";
import About from "./components/home/About";
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
import img1 from "./assets/client1.png";
import img2 from "./assets/client2.png";
import img3 from "./assets/client3.png";
import img4 from "./assets/client4.png";
import img5 from "./assets/client5.png";
import img6 from "./assets/client6.png";
import img7 from "./assets/client7.png";
import img8 from "./assets/client8.png";
import img9 from "./assets/client9.png";
import img10 from "./assets/client10.png";
import img11 from "./assets/client11.png";
import img12 from "./assets/client12.png";
import img13 from "./assets/client13.png";
import img14 from "./assets/client14.png";
import img15 from "./assets/client15.png";
import img16 from "./assets/client16.png";
import { propertyData } from "./data/propertyData";

const project1 = "/assets/projects/project_1.jpg";
const project2 = "/assets/projects/project_2.jpg";
const project3 = "/assets/projects/project_3.jpg";
const project4 = "/assets/projects/project_4.jpg";

const clients = [
  { id: 1, logo: img1, name: "Client 1" },
  { id: 2, logo: img2, name: "Client 2" },
  { id: 3, logo: img3, name: "Client 3" },
  { id: 4, logo: img4, name: "Client 4" },
  { id: 5, logo: img5, name: "Client 5" },
  { id: 6, logo: img6, name: "Client 6" },
  { id: 7, logo: img7, name: "Client 7" },
  { id: 8, logo: img8, name: "Client 8" },
  { id: 9, logo: img9, name: "Client 9" },
  { id: 10, logo: img10, name: "Client 10" },
  { id: 11, logo: img11, name: "Client 11" },
  { id: 12, logo: img12, name: "Client 12" },
  { id: 13, logo: img13, name: "Client 13" },
  { id: 14, logo: img14, name: "Client 14" },
  { id: 15, logo: img15, name: "Client 15" },
  { id: 16, logo: img16, name: "Client 16" },
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

interface Property {
  _id: string;
  title: string;
  slug: string;
  location: string;
  images: string[];
  featuredThumbnail?: string;
  createdAt?: string;
}

export default function Home() {
  const [openPopup, setOpenPopup] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/property`,
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.properties)) {
          // Sort by createdAt descending
          const sorted = data.properties.sort((a: Property, b: Property) => {
            return (
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
            );
          });
          setFeaturedProperties(sorted.slice(0, 5)); // Show top 5
        }
      } catch (error) {
        console.error("Failed to fetch featured properties", error);
      }
    };

    fetchProperties();
  }, []);

  console.log(featuredProperties);

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

      {/* Featured Properties */}
      <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div className="flex items-end justify-between mb-8">
            <div data-aos="fade-up">
              <p className="uppercase tracking-widest text-sm text-(--primary-color) mb-4 font-heading">
                Featured Properties
              </p>
              <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-(--primary-bg)">
                Where happiness lives
              </h2>
            </div>

            <Link
              data-aos="zoom-in"
              data-aos-delay="150"
              href="/buy-property"
              className="hidden md:flex items-center gap-2 text-sm tracking-widest text-(--primary-color) hover:underline"
            >
              VIEW ALL PROPERTIES →
            </Link>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 lg:auto-rows-[280px]">
            {featuredProperties.map((project, index) => {
              const isTall = index === 0;
              const displayId = (index + 1).toString().padStart(2, "0");
              const imageUrl =
                project.featuredThumbnail ||
                (project.images && project.images.length > 0
                  ? project.images[0]
                  : "/assets/placeholder.jpg"); // Fallback image

              return (
                <div
                  key={project._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                  className={`group relative overflow-hidden border-2 border-amber-100 rounded-md cursor-pointer
          ${isTall ? "lg:row-span-2" : ""}
        `}
                >
                  <Link
                    href={`/buy-property/${project.slug}`}
                    className="block h-full w-full"
                  >
                    {/* IMAGE */}
                    <Image
                      src={imageUrl}
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
                      {displayId}
                    </span>

                    {/* TEXT */}
                    <div className="absolute bottom-6 w-[70%] md:w-[50%] left-6 z-10 text-white">
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
          <div className="mb-8" data-aos="fade-up">
            <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
              Our Partners
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
                    className="object-cover transition"
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
