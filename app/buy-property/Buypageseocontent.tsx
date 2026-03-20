import {
  TrendingUp,
  Users,
  Plane,
  Train,
  Star,
  Building2,
  Home,
  Briefcase,
  BarChart3,
  ArrowRight,
  MapPin,
  LineChart,
  Layers,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const brand = {
  navy: "#173e62",
  gold: "#b59a78",
};

const whyPoints = [
  { icon: TrendingUp, text: "Strong appreciation in property rates" },
  { icon: Users, text: "High rental demand from working professionals" },
  { icon: Plane, text: "Seamless connectivity to Delhi and IGI Airport" },
  { icon: Train, text: "Rapid infrastructure and metro expansion" },
  { icon: Star, text: "Premium lifestyle with modern amenities" },
];

const residentialOptions = [
  "Flats for sale in Gurgaon (3 BHK, 4 BHK)",
  "Builder floors in Gurgaon for independent living",
  "Luxury apartments in Gurgaon with premium amenities",
  "Villas and independent houses",
];

const commercialOptions = [
  "Office spaces in prime business locations",
  "Retail shops and SCO plots",
  "High-return commercial investments",
];

const investmentOptions = [
  "Ready to move property in Gurgaon",
  "New projects in Gurgaon with modern features",
  "Affordable housing in developing sectors",
];

/* ─────────────────── helper: hover handlers ─────────────────── */
const hoverNavy = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = brand.navy;
    e.currentTarget.style.borderColor = brand.navy;
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "#faf8f5";
    e.currentTarget.style.borderColor = "#e8e0d6";
  },
};

/* ─────────────────── component ─────────────────── */
export default function BuyPageSEOContent() {
  return (
    <div>
      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — Find the Best Property
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{
          backgroundColor: "#f7f5f2",
          borderTop: `3px solid ${brand.gold}`,
        }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left feature card */}
          <div className="relative">
            <div
              className="absolute -top-5 -left-5 w-20 h-20 rounded-2xl z-0"
              style={{ backgroundColor: `${brand.gold}22` }}
            />
            <div
              className="relative z-10 rounded-3xl p-10"
              style={{ backgroundColor: brand.navy, color: "#fff" }}
            >
              <p
                className="text-xs uppercase tracking-[0.3em] mb-4"
                style={{ color: brand.gold }}
              >
                Real Estate Experts
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-6">
                Find the Best Property in Gurgaon for Your Needs
              </h2>
              <div
                className="h-px mb-6"
                style={{ backgroundColor: `${brand.gold}40` }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Powered by Crownpoint Estates — your trusted partner in Gurugram
                real estate.
              </p>
            </div>
            <div
              className="absolute -bottom-5 -right-5 w-14 h-14 rounded-xl z-0"
              style={{ backgroundColor: `${brand.gold}22` }}
            />
          </div>

          {/* Right copy */}
          <div>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
              If you are planning to{" "}
              <strong style={{ color: brand.navy }}>
                buy property in Gurgaon
              </strong>
              , you are entering one of India's most dynamic and rapidly growing
              real estate markets. Gurgaon, also known as Gurugram, has evolved
              into a premium destination offering residential and commercial
              opportunities for every type of buyer. From affordable apartments
              to ultra-luxury homes, the city provides diverse options backed by
              strong infrastructure and corporate growth.
            </p>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              The demand for{" "}
              <strong style={{ color: brand.navy }}>
                properties for sale in Gurgaon
              </strong>{" "}
              continues to rise due to its proximity to Delhi, excellent
              connectivity, and increasing job opportunities. At{" "}
              <strong style={{ color: brand.gold }}>Crownpoint Estates</strong>,
              we help you find the best property in Gurgaon with verified
              listings and expert guidance tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — Why Buy in Gurgaon
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Investment Advantage
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Why Buy Property in Gurgaon?
            </h2>
            <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
              Choosing to buy property in Gurgaon offers both lifestyle benefits
              and strong investment returns. The city has developed into a major
              corporate and residential hub, attracting professionals, families,
              and investors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyPoints.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 cursor-default"
                style={{ backgroundColor: "#faf8f5", borderColor: "#e8e0d6" }}
                {...hoverNavy}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: brand.gold }}
                >
                  <Icon size={18} color="#fff" />
                </div>
                <p className="text-sm font-medium leading-snug pt-1 text-gray-800 group-hover:text-white transition-colors duration-300">
                  {text}
                </p>
              </div>
            ))}

            {/* Closing italic note */}
            <div
              className="sm:col-span-2 lg:col-span-1 flex items-center p-6 rounded-2xl border border-dashed"
              style={{
                borderColor: brand.gold,
                backgroundColor: `${brand.gold}0d`,
              }}
            >
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: brand.navy }}
              >
                These factors make <strong>Gurugram</strong> one of the most
                preferred real estate markets in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — Types of Properties
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Property Portfolio
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Types of Properties for Sale in Gurgaon
            </h2>
            <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
              When you plan to buy property in Gurgaon, you get access to a wide
              variety of options suited to different budgets and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                label: "Residential",
                desc: "Gurgaon offers a range of residential properties designed for comfortable and modern living.",
                items: residentialOptions,
              },
              {
                icon: Building2,
                label: "Commercial",
                desc: "Gurgaon is also a business hub, making commercial investment highly attractive.",
                items: commercialOptions,
              },
              {
                icon: BarChart3,
                label: "Investment",
                desc: "For investors looking to buy property in Gurgaon, there are multiple high-return options.",
                items: investmentOptions,
              },
            ].map(({ icon: Icon, label, desc, items }) => (
              <div
                key={label}
                className="bg-white rounded-3xl overflow-hidden shadow-sm"
                style={{ border: "1px solid #e8e0d6" }}
              >
                {/* Card header */}
                <div
                  className="px-7 py-5 flex items-center gap-3"
                  style={{ backgroundColor: brand.navy }}
                >
                  <Icon size={20} color={brand.gold} />
                  <h3 className="font-semibold text-lg text-white">{label}</h3>
                </div>

                <div className="p-7">
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                    {desc}
                  </p>
                  <ul className="space-y-3">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <ArrowRight
                          size={14}
                          className="mt-0.5 shrink-0"
                          color={brand.gold}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — Residential vs Commercial
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t bg-white"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Making the Right Choice
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Residential vs Commercial Property in Gurgaon
            </h2>
            <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
              Before making a decision to buy property in Gurgaon, it is
              important to understand the difference between residential and
              commercial investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Home,
                title: "Residential Property",
                body: "Residential properties are ideal for personal use and rental income. These include apartments, builder floors, and villas located in well-developed sectors of Gurgaon.",
              },
              {
                icon: Briefcase,
                title: "Commercial Property",
                body: "Commercial properties offer higher rental returns and long-term investment benefits. These include office spaces, retail shops, and business hubs across prime Gurgaon locations.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group relative rounded-3xl overflow-hidden p-8 transition-all duration-500 cursor-default"
                style={{
                  backgroundColor: "#faf8f5",
                  border: "1px solid #e8e0d6",
                }}
                {...hoverNavy}
              >
                {/* Decorative circle */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                  style={{ backgroundColor: `${brand.gold}18` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: brand.gold }}
                  >
                    <Icon size={22} color="#fff" />
                  </div>
                  <h3
                    className="font-heading text-2xl font-bold mb-3 transition-colors duration-500 group-hover:text-white"
                    style={{ color: brand.navy }}
                  >
                    {title}
                  </h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed transition-colors duration-500 group-hover:text-white/70">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing note */}
          <p className="mt-10 text-center text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            Both options provide excellent growth potential depending on your
            investment goals. Our experts at{" "}
            <strong style={{ color: brand.gold }}>Crownpoint Estates</strong>{" "}
            can help you choose the right path.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — Top Locations
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Prime Areas
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Top Locations to Buy Property in Gurgaon
            </h2>
            <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
              Location plays a crucial role when selecting the right property in
              Gurgaon. The city offers multiple high-demand areas with strong
              growth potential.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              {
                name: "Golf Course Road",
                desc: "Premium luxury apartments and high-end living",
              },
              {
                name: "DLF Phase 1–5",
                desc: "Established residential zones with strong value",
              },
              {
                name: "Sohna Road",
                desc: "Rapidly growing residential and commercial hub",
              },
              { name: "Dwarka Expressway", desc: "High appreciation corridor" },
              {
                name: "New Gurgaon (New Gurugram sectors)",
                desc: "Affordable and emerging locations",
              },
              {
                name: "Golf Course Extension Road",
                desc: "Modern developments with connectivity",
              },
            ].map(({ name, desc }) => (
              <div
                key={name}
                className="group flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 cursor-default"
                style={{ backgroundColor: "#fff", borderColor: "#e8e0d6" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = brand.navy;
                  e.currentTarget.style.borderColor = brand.navy;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.borderColor = "#e8e0d6";
                }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: brand.gold }}
                >
                  <MapPin size={17} color="#fff" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1 text-gray-900 group-hover:text-white transition-colors duration-300">
                    {name}
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-white/60 leading-snug transition-colors duration-300">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl px-7 py-5 border-l-4 text-sm italic"
            style={{
              backgroundColor: `${brand.gold}0d`,
              borderLeftColor: brand.gold,
              color: brand.navy,
            }}
          >
            These locations offer a perfect mix of lifestyle, connectivity, and
            investment benefits.
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — Price Trends
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t bg-white"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              Market Insights
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-5"
              style={{ color: brand.navy }}
            >
              Property Price Trends in Gurgaon
            </h2>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
              Before you{" "}
              <strong style={{ color: brand.navy }}>
                buy property in Gurgaon
              </strong>
              , understanding market trends is essential. Property prices in
              Gurgaon vary depending on location, amenities, and demand.
            </p>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              Premium areas such as Golf Course Road and DLF phases command
              higher prices due to luxury developments, while emerging areas
              like Sohna and New Gurgaon provide affordable options. With
              ongoing infrastructure development, property rates in Gurgaon
              continue to show steady growth, making it a reliable market for
              long-term investment.
            </p>
          </div>

          {/* Right visual split */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Premium Zones",
                sub: "Golf Course Road, DLF Phases",
                tag: "Luxury",
              },
              {
                label: "Emerging Zones",
                sub: "Sohna Road, New Gurgaon",
                tag: "Affordable",
              },
              {
                label: "Infrastructure",
                sub: "Metro & road expansion ongoing",
                tag: "Growth",
              },
              {
                label: "Investment",
                sub: "Steady long-term appreciation",
                tag: "Reliable",
              },
            ].map(({ label, sub, tag }) => (
              <div
                key={label}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "#f7f5f2",
                  border: "1px solid #e8e0d6",
                }}
              >
                <span
                  className="inline-block text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full mb-3"
                  style={{
                    backgroundColor: `${brand.gold}22`,
                    color: brand.gold,
                  }}
                >
                  {tag}
                </span>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: brand.navy }}
                >
                  {label}
                </p>
                <p className="text-xs text-gray-500 leading-snug">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 7 — Real Estate Trends 2026
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t"
        style={{ backgroundColor: "#f7f5f2", borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              What's Coming
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Gurgaon Real Estate Trends 2026
            </h2>
            <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
              The year 2026 is expected to be a strong growth phase for
              Gurgaon's real estate market. Increasing demand and infrastructure
              development are shaping new opportunities for buyers and investors
              planning to buy property in Gurgaon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              "Rising demand for luxury apartments and gated communities",
              "Increased interest in ready to move property in Gurgaon",
              "Growth along Dwarka Expressway and New Gurgaon",
              "Higher rental yields in commercial properties",
              "Expansion of metro and road connectivity",
            ].map((trend, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white"
                style={{ border: "1px solid #e8e0d6" }}
              >
                <div
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white mt-0.5"
                  style={{ backgroundColor: brand.navy }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm text-gray-700 leading-snug">{trend}</p>
              </div>
            ))}

            {/* Closing note card */}
            <div
              className="flex items-center p-5 rounded-2xl border border-dashed"
              style={{
                borderColor: brand.gold,
                backgroundColor: `${brand.gold}0d`,
              }}
            >
              <p
                className="text-sm italic leading-relaxed"
                style={{ color: brand.navy }}
              >
                These trends indicate that <strong>Gurugram</strong> will
                continue to be a top destination for real estate investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 8 — Explore by Budget & Configuration
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t bg-white"
        style={{ borderColor: "#e8e0d6" }}
      >
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: brand.gold }}
            >
              For Every Buyer
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: brand.navy }}
            >
              Explore Properties in Gurgaon by Budget &amp; Configuration
            </h2>
            <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
              Buyers looking to buy property in Gurgaon can easily find options
              based on their budget and requirements. The city offers
              flexibility across all segments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Home,
                label: "Affordable Housing",
                desc: "Budget-friendly options for first-time buyers",
              },
              {
                icon: Layers,
                label: "3 BHK & 4 BHK Builder Floors",
                desc: "Builder floors in Gurgaon for small families",
              },
              {
                icon: Star,
                label: "Luxury Villas & Penthouses",
                desc: "Ultra-premium living with world-class amenities",
              },
              {
                icon: Briefcase,
                label: "Commercial Properties",
                desc: "For business use and strong rental income",
              },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="group flex items-start gap-5 p-6 rounded-2xl border transition-all duration-300 cursor-default"
                style={{ backgroundColor: "#faf8f5", borderColor: "#e8e0d6" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = brand.navy;
                  e.currentTarget.style.borderColor = brand.navy;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#faf8f5";
                  e.currentTarget.style.borderColor = "#e8e0d6";
                }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: brand.gold }}
                >
                  <Icon size={20} color="#fff" />
                </div>
                <div>
                  <p className="font-semibold text-[15px] mb-1 text-gray-900 group-hover:text-white transition-colors duration-300">
                    {label}
                  </p>
                  <p className="text-sm text-gray-500 group-hover:text-white/60 leading-snug transition-colors duration-300">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 rounded-2xl px-7 py-5 border-l-4 text-sm italic"
            style={{
              backgroundColor: `${brand.gold}0d`,
              borderLeftColor: brand.gold,
              color: brand.navy,
            }}
          >
            This wide variety ensures that every buyer finds a suitable property
            in Gurgaon.
          </div>
        </div>
      </section>
    </div>
  );
}
