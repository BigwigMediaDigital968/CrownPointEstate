export default function PropertyTypes() {
  const types = [
    "Residential Properties in Gurugram",
    "Commercial Properties in Gurgaon",
    "Affordable & Luxury Property Options",
  ];

  return (
    <section className="bg-[#faf9f7] py-12 sm:py-16">
      <div className="w-full md:w-5/6 mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {types.map((title) => (
          <div
            key={title}
            className="p-6 sm:p-8 md:p-10 bg-white border rounded-lg hover:shadow-md transition"
          >
            <h3 className="font-heading font-semibold mb-3 text-lg sm:text-xl md:text-2xl">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              apartments, builder floors, independent houses, and luxury villas
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
