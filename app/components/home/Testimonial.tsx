"use client";

import { useEffect, useState, TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    id: 1,
    text: `Crownpoint Estates is one of the best property dealers in Gurgaon I have worked with. Their team understood my requirements clearly and helped me find the perfect home in a prime location.`,
    name: "Vansh Verma",
    initial: "V",
  },
  {
    id: 2,
    text: `One of the finest property dealers in Gurgaon! They showed me multiple options and ensured I got the best value for my investment.`,
    name: "Sourabh Chakraborty",
    initial: "S",
  },
  {
    id: 3,
    text: `Crownpoint Estates helped me get a great deal on a builder floor. Their market knowledge makes them the best property dealers in Gurgaon today`,
    name: "Abhay Das",
    initial: "A",
  },
  {
    id: 4,
    text: `Amazing experience with Crown point Estates! Truly the best real estate dealer in Gurgaon for luxury properties and smooth documentation`,
    name: "Narayan Sharma",
    initial: "N",
  },
  {
    id: 5,
    text: `Had a very good experience with this company. The team is highly professional, the service they provide is excellent, and all dealings are completely transparent, which builds a lot of trust.`,
    name: "Subrato Verma",
    initial: "S",
  },
  {
    id: 6,
    text: `Very satisfied with their service. Crownpoint Estates is a very reliable property dealer in Gurgaon, offering genuine listings and accurate pricing.`,
    name: "Kailash Rajpoot",
    initial: "K",
  },
];

// Function to truncate text
const truncateText = (text: string, maxLength: number = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });

    // Handle responsive items per view
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
        setIsMobile(true);
      } else {
        setItemsPerView(2);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = isMobile ? testimonials.length - 1 : Math.max(0, testimonials.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleTestimonials = isMobile ? testimonials : testimonials.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <section className="relative md:py-16 overflow-hidden bg-white">
      {/* HEADER */}
      <div
        className="w-11/12 md:w-5/6 mx-auto mb-8 lg:mb-12"
        data-aos="fade-up"
      >
        <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
          Testimonials
        </p>
        <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
          What Our Clients Say
        </h2>
      </div>

      {/* CAROUSEL CONTAINER */}
      <div className="relative w-11/12 md:w-5/6 mx-auto">
        <div className="flex items-center gap-4">
          {/* LEFT ARROW */}
          <button
            onClick={goToPrevious}
            className="flex-shrink-0 w-12 h-12 border border-gray-300 hidden md:flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--primary-color)] transition-colors duration-200 z-10"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* TESTIMONIALS GRID */}
          <div
            className="flex-1 overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={`flex gap-6 transition-transform duration-500 ease-in-out ${isMobile ? 'w-full' : ''}`}
              style={{
                transform: isMobile ? `translateX(calc(-1 * ${currentIndex} * (100% + 24px)))` : `translateX(0)`,
              }}
            >
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`flex-shrink-0 w-full md:w-[calc(50%-12px)] relative bg-[#faf9f7] rounded-lg md:rounded-lg p-6 md:p-8 shadow-md md:shadow-sm min-h-[280px] border border-gray-100 flex flex-col justify-center ${isMobile ? 'rounded-2xl shadow-lg' : ''}`}
                  data-aos="fade-up"
                >
                  {/* QUOTATION MARK */}
                  <div className="absolute -top-4 -left-4 text-7xl md:text-8xl text-[var(--primary-color)] opacity-20 leading-none font-serif select-none">
                    &ldquo;
                  </div>

                  {/* TESTIMONIAL TEXT */}
                  <div className="relative z-10 mb-6">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3">
                      {truncateText(testimonial.text)}
                    </p>
                    {/* <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                      Read more
                    </button> */}
                  </div>

                  {/* REVIEWER INFO */}
                  <div className="flex items-center gap-3">
                    {/* AVATAR CIRCLE */}
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-bg)] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.initial}
                      </span>
                    </div>
                    {/* NAME */}
                    <div>
                      <h4 className="font-semibold text-[var(--primary-bg)] text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={goToNext}
            className="flex-shrink-0 w-12 h-12 border border-gray-300 hidden md:flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--primary-color)] transition-colors duration-200 z-10"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* MOBILE PAGINATION DOTS */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 bg-[var(--primary-color)]"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
