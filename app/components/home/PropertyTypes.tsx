export default function PropertyTypes() {
  const types = [
    {
      title: "Residential Properties in Gurgaon",
      description:
        "Apartments, builder floors, independent houses, and luxury villas across prime sectors.",
    },
    {
      title: "Commercial Properties in Gurgaon",
      description:
        "Office spaces, retail shops, SCO plots, and investment-ready commercial assets.",
    },
    {
      title: "Affordable & Luxury Property Options",
      description:
        "From budget-friendly housing to premium developments, we cover all segments.",
    },
  ];

  return (
    <section className="bg-[#faf9f7] py-12 sm:py-16">
      <div className="w-full md:w-5/6 mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {types.map((key) => (
          <div
            key={key.title}
            className="p-6 sm:p-8 md:p-10 bg-white border rounded-lg hover:shadow-md transition"
          >
            <h3 className="font-heading font-semibold mb-3 text-lg sm:text-xl md:text-2xl">
              {key.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {key.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
