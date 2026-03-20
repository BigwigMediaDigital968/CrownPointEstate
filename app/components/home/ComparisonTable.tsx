"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const data = [
  {
    parameter: "Infrastructure Development",
    gurgaon: "Rapid",
    other: "Moderate",
  },
  {
    parameter: "Corporate & IT Presence",
    gurgaon: "Strong",
    other: "Limited",
  },
  {
    parameter: "Rental Yield",
    gurgaon: "High",
    other: "Average",
  },
  {
    parameter: "Luxury Housing Options",
    gurgaon: "Extensive",
    other: "Limited",
  },
  {
    parameter: "Investment Appreciation",
    gurgaon: "Strong",
    other: "Moderate",
  },
];

export default function ComparisonTable() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-16 bg-[#faf9f7]">
      <div className="w-11/12 md:w-5/6 mx-auto">
        <h2
          className="font-heading text-2xl md:text-4xl font-bold text-[var(--primary-bg)] mb-4"
          data-aos="fade-up"
        >
          Comparison: Buying Property in Gurgaon vs Other NCR Cities
        </h2>

        <p
          className="text-sm sm:text-base text-gray-600 mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Gurgaon continues to be one of the most preferred real estate
          destinations due to its infrastructure, corporate presence, and high
          rental yield. Compared to other NCR cities, Gurgaon offers better
          appreciation potential and a wider range of premium property options.
        </p>

        {/* Desktop Table */}
        <div
          className="hidden md:block overflow-x-auto"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[var(--primary-bg)] text-white">
              <tr>
                <th className="text-left p-4 font-semibold">Parameter</th>
                <th className="text-left p-4 font-semibold">Gurgaon </th>
                <th className="text-left p-4 font-semibold">
                  Other NCR Cities
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.parameter}
                  className={`border-t ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-4 font-medium text-lg">{row.parameter}</td>
                  <td className="p-4 text-[var(--primary-color)] font-semibold text-lg">
                    {row.gurgaon}
                  </td>
                  <td className="p-4 text-gray-600 text-lg">{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {data.map((row) => (
            <div
              key={row.parameter}
              className="bg-white border rounded-lg p-4"
              data-aos="fade-up"
            >
              <p className="font-semibold mb-2">{row.parameter}</p>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--primary-color)] font-medium">
                  Gurgaon : {row.gurgaon}
                </span>
                <span className="text-gray-600">Other NCR: {row.other}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
