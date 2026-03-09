import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import ScrollToTopButton from "./components/ScrollToTopButton";
import GooeyButton from "./components/GooeyButton";
import ContactActions from "./components/ContactActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ================== IDs ================== */
const GA_ID = "G-P5EE614XKN";
const GTM_ID = "GTM-KM4BXFDV";
const CLARITY_ID = "v5wccw4r82";

/* ================== METADATA ================== */
export const metadata: Metadata = {
  title: "Property Dealer in Gurgaon | Buy, Sell, Rent & Lease - CPE",
  verification: {
    google: "Uei6zvpwBwT4gfafLKIu6BV1V0o1ruAGQ1MsetlXfPM",
  },
  metadataBase: new URL("https://www.crownpointestates.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ================= Google Tag Manager ================= */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* ================= Google Analytics ================= */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        {/* ================= Microsoft Clarity ================= */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>

        {/* ================= RealEstateAgent Schema ================= */}
        <Script
          id="real-estate-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Crownpoint Estates",
            description:
              "Crownpoint Estates is a trusted real estate consultancy firm with over 15 years of experience delivering residential and commercial property solutions across Gurgaon and Delhi NCR.",
            image:
              "https://res.cloudinary.com/dyum0r6gf/image/upload/v1770102763/Crown/images/xxzp9gncdj0v1lzcharb.jpg",
            url: "https://www.crownpointestates.com/",
            telephone: "+91 98115 56625, +91 98107 86375, +91 99990 19763",
            email: "sales@crownpointestates.com",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Lower Ground Floor, 65, Akashneem Marg, DLF Phase 2, Sector 25",
              addressLocality: "Gurgaon ",
              addressRegion: "Haryana",
              postalCode: "122002",
              addressCountry: "IN",
            },
            areaServed: [
              "DLF City",
              "Golf Course Road",
              "MG Road",
              "Golf Course Extension Road",
              "Sohna Road",
              "Sushant Lok",
              "Sun City",
              "Nirvana Country",
              "Udyog Vihar",
              "IMT Manesar",
            ],
            openingHours: "Mo-Su 10:30-18:00",
          })}
        </Script>

        {/* ================= Organization Schema ================= */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Crownpoint Estate",
            url: "https://www.crownpointestates.com/",
            logo: "https://res.cloudinary.com/dyum0r6gf/image/upload/v1770102763/Crown/images/xxzp9gncdj0v1lzcharb.jpg",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91 98115 56625",
                areaServed: "IN",
              },
              {
                "@type": "ContactPoint",
                telephone: "+91 98107 86375",
                areaServed: "IN",
              },
              {
                "@type": "ContactPoint",
                telephone: "+91 99990 19763",
                areaServed: "IN",
              },
              {
                "@type": "ContactPoint",
                email: "sales@crownpointestates.com",
                areaServed: "IN",
              },
            ],
          })}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ================= GTM (noscript) ================= */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* UI Helpers */}
        <ContactActions />
        <GooeyButton />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
