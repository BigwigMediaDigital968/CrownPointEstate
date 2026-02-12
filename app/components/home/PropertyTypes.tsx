export default function PropertyTypes() {
  const types = [
    "Residential Properties in Gurugram",
    "Commercial Properties in Gurgaon",
    "Affordable & Luxury Property Options",
  ];

  return (
    <section className="bg-[#faf9f7] py-16">
      <div className="w-24 md:w-5/6 mx-auto grid md:grid-cols-3 gap-8">
        {types.map((title) => (
          <div
            key={title}
            className="p-16 bg-white border rounded-lg hover:shadow-md transition"
          >
            <h3 className="font-heading font-semibold mb-2 text-2xl">{title}</h3>
            <p className="text-m text-gray-600">
              apartments, builder floors, independent houses, and luxury villas
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
