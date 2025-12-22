import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/Hero";
import About from "./components/home/About";
import project1 from "./assets/projects/project_1.jpg";
import project2 from "./assets/projects/project_2.jpg";
import project3 from "./assets/projects/project_3.jpg";
import project4 from "./assets/projects/project_4.jpg";
import project5 from "./assets/projects/project_5.jpg";
import Footer from "./components/Footer";
import QuickEnquiry from "./components/QuickEnquiry";
import WhyChooseUs from "./components/home/WhyChooseUs";
import FactsSection from "./components/home/Fact";

const projects = [
  {
    id: "01",
    title: "ReHomes Riverside",
    location: "West Virginia, USA",
    image: project1,
  },
  {
    id: "02",
    title: "Smart City",
    location: "Oklahoma, USA",
    image: project2,
  },
  {
    id: "03",
    title: "Centre Park",
    location: "Tennessee, USA",
    image: project3,
  },
  {
    id: "04",
    title: "ReHomes Gardenia",
    location: "South Carolina, USA",
    image: project4,
  },
  {
    id: "05",
    title: "Golden River",
    location: "North Carolina, USA",
    image: project5,
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <About />
      <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="uppercase tracking-widest text-sm text-[var(--primary-color)] mb-4 font-heading">
                Featured Projects
              </p>
              <h2 className="font-heading text-3xl md:text-4xl leading-snug font-bold text-[var(--primary-bg)]">
                Where happiness lives
              </h2>
            </div>

            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-sm tracking-widest text-[var(--primary-color)] hover:underline"
            >
              VIEW ALL PROJECTS →
            </a>
          </div>

          {/* GRID */}
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:auto-rows-[280px]">
            {projects.map((project, index) => {
              const isTall = index === 0;

              return (
                <div
                  key={project.id}
                  className={`group relative overflow-hidden rounded-md ${
                    isTall ? "lg:row-span-2" : ""
                  }`}
                >
                  {/* IMAGE */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={isTall ? 600 : 280}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      isTall ? "h-[580px] lg:h-full" : "h-[280px]"
                    }`}
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-[var(--primary-bg)]/40 group-hover:bg-[var(--primary-bg)]/60 transition duration-500" />

                  {/* HUGE NUMBER (SUBTLE, LIKE IMAGE) */}
                  <span className="absolute bottom-6 right-6 text-[120px] font-heading text-white opacity-20 group-hover:opacity-[0.6] transition duration-500 leading-none select-none">
                    {project.id}
                  </span>

                  {/* TEXT */}
                  <div className="absolute bottom-6 left-6 z-10 text-white">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-gray-200">{project.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <FactsSection />
      <QuickEnquiry />
      <Footer />
    </div>
  );
}
