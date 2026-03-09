export default function Areas() {
  const areas = [
    "DLF Phase 1–5",
    "Golf Course Road",
    "Golf Course Extension Road",
    "Sohna Road",
    "Dwarka Expressway",
    "Sushant Lok",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-11/12 md:w-5/6 mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--primary-bg)] mb-4">
          Areas We Serve in Gurgaon
        </h2>

        <ul className="pt-7 grid m:grid-cols-2 md:grid-cols-3 gap-4  ">
          {areas.map((area) => (
            <li key={area} className=" border rounded p-4 text-xl font-medium">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
