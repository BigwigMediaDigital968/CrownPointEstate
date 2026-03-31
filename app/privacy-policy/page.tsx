"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TocItem {
  id: string;
  label: string;
}

interface InfoCard {
  title: string;
  body: string;
}

interface RightBadge {
  icon: string;
  title: string;
  desc: string;
}

interface TableRow {
  col1: string;
  col2: string;
  col3: string;
  bold?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TOC_ITEMS: TocItem[] = [
  { id: "s1", label: "Information We Collect" },
  { id: "s2", label: "How We Use Your Information" },
  { id: "s3", label: "Data Sharing & Disclosure" },
  { id: "s4", label: "Data Storage & Security" },
  { id: "s5", label: "Your Rights" },
  { id: "s6", label: "Cookies & Tracking" },
  { id: "s7", label: "Third-Party Links" },
  { id: "s8", label: "Children's Privacy" },
  { id: "s9", label: "Changes to This Policy" },
  { id: "s10", label: "Contact & Grievance Officer" },
];

const DATA_COLLECTED_ROWS: TableRow[] = [
  {
    col1: "Identity",
    col2: "Full name, email address, phone number",
    col3: "Contact forms, enquiries, site visits",
    bold: true,
  },
  {
    col1: "Property Preferences",
    col2: "Budget, location preference, property type (residential/commercial)",
    col3: "When you submit a requirement",
    bold: true,
  },
  {
    col1: "Financial (General)",
    col2: "Broad budget range (no bank/card details collected)",
    col3: "Consultation or form submission",
    bold: true,
  },
  {
    col1: "Technical",
    col2: "IP address, browser type, device type, pages visited",
    col3: "Automatically via cookies/analytics",
    bold: true,
  },
  {
    col1: "Communication",
    col2: "WhatsApp/call records, email threads",
    col3: "When you contact our team",
    bold: true,
  },
];

const USAGE_LIST: string[] = [
  "Responding to your property enquiries and scheduling site visits across Gurgaon & Gurugram",
  "Matching your requirements with available residential and commercial properties",
  "Sending relevant property listings, project updates, and new launches via SMS, WhatsApp, or email — only if you have opted in",
  "Improving website functionality and user experience through analytics",
  "Complying with legal obligations under RERA, DPDP Act, and other Indian statutes",
  "Processing documentation during property transactions (with your explicit consent)",
  "Detecting and preventing fraud or misuse of our platform",
];

const SHARING_CARDS: InfoCard[] = [
  {
    title: "Trusted Partners",
    body: "We may share your data with verified developers, builders, or co-broking agents strictly to fulfil your property requirement. These partners are bound by confidentiality obligations.",
  },
  {
    title: "Legal Requirements",
    body: "If required by law, court order, or government authority under Indian law, we may disclose your information while notifying you wherever legally permissible.",
  },
  {
    title: "Service Providers",
    body: "Trusted technology vendors (e.g., hosting, CRM, analytics) may access data solely to deliver services on our behalf under strict data processing agreements.",
  },
  {
    title: "Business Transfers",
    body: "In the unlikely event of a merger or acquisition, your data may be transferred. We will notify you beforehand and ensure continued protection.",
  },
];

const SECURITY_LIST: string[] = [
  "SSL/TLS encryption for all data transmitted via our website",
  "Access controls limiting data visibility to authorised personnel only",
  "Regular security audits and vulnerability assessments",
  "Secure deletion protocols when data retention periods expire",
];

const RIGHTS_BADGES: RightBadge[] = [
  {
    icon: "📋",
    title: "Right to Access",
    desc: "Know what personal data we hold about you",
  },
  {
    icon: "✏️",
    title: "Right to Correction",
    desc: "Request correction of inaccurate or incomplete data",
  },
  {
    icon: "🗑️",
    title: "Right to Erasure",
    desc: "Request deletion of your data (subject to legal obligations)",
  },
  {
    icon: "🚫",
    title: "Right to Withdraw Consent",
    desc: "Opt out of marketing communications at any time",
  },
  {
    icon: "⚖️",
    title: "Right to Grievance Redressal",
    desc: "Raise a complaint with our Grievance Officer",
  },
  {
    icon: "🏛️",
    title: "Right to Escalate",
    desc: "Approach the Data Protection Board of India if unresolved",
  },
];

const COOKIE_ROWS: TableRow[] = [
  {
    col1: "Essential",
    col2: "Core functionality (page navigation, security)",
    col3: "No — required for site operation",
    bold: true,
  },
  {
    col1: "Analytics",
    col2: "Google Analytics — understanding page views & traffic (anonymised)",
    col3: "Yes — via browser settings",
    bold: true,
  },
  {
    col1: "Marketing / Pixel",
    col2: "Meta/Facebook Pixel for ad retargeting",
    col3: "Yes — opt out via Meta settings",
    bold: true,
  },
  {
    col1: "Preference",
    col2: "Remembering your property preferences",
    col3: "Yes — via browser settings",
    bold: true,
  },
];

const CHANGES_LIST: string[] = [
  "A prominent notice on our website homepage",
  "Email notification to registered users (where applicable)",
  'Update to the "Last Updated" date at the top of this page',
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const ShieldIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

interface SectionProps {
  num: string;
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ num, id, title, children }) => (
  <div className="policy-section" id={id}>
    <div className="section-header">
      <div className="section-number">{num}</div>
      <h2 className="section-title">{title}</h2>
    </div>
    <div className="section-body">{children}</div>
  </div>
);

interface DataTableProps {
  headers: [string, string, string];
  rows: TableRow[];
}

const DataTable: React.FC<DataTableProps> = ({ headers, rows }) => (
  <table className="data-table">
    <thead>
      <tr>
        {headers.map((h) => (
          <th key={h}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          <td>{row.bold ? <strong>{row.col1}</strong> : row.col1}</td>
          <td>{row.col2}</td>
          <td>{row.col3}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PolicyList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="policy-list">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const PolicyPage: React.FC = () => {
  const scrollBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (scrolled / total) * 100 : 0;
      if (scrollBarRef.current) {
        scrollBarRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Privacy Policy – Crownpoint Estates</title>
        <meta
          name="description"
          content="Privacy Policy for Crownpoint Estates — DPDP Act 2023 compliant, RERA Registered real estate consultancy in Gurgaon."
        />
      </Head>

      {/* Scroll Progress */}
      <div ref={scrollBarRef} className="scroll-bar" />

      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-deco" />
        <div className="hero-eyebrow">Crownpoint Estates</div>
        <h1>
          Privacy <em>Policy</em>
        </h1>
        <p className="hero-sub">
          Your trust is the foundation of everything we build.
        </p>
        <div className="hero-badge">
          <ShieldIcon />
          DPDP Act 2023 Compliant &nbsp;·&nbsp; RERA Registered &nbsp;·&nbsp;
          Last Updated: June 2025
        </div>
      </section>

      {/* Main */}
      <div className="page-wrap">
        {/* TOC */}
        <div className="toc-card">
          <div className="toc-title">Contents</div>
          <ul className="toc-list">
            {TOC_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Intro */}
        <div className="intro-box">
          <p>
            Welcome to <strong>Crownpoint Estates</strong> (&ldquo;we&rdquo;,
            &ldquo;our&rdquo;, or &ldquo;us&rdquo;) — Gurgaon&rsquo;s trusted
            RERA-registered real estate consultancy. We are deeply committed to
            protecting the personal information you share with us when exploring
            your dream property.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, and protect
            your data in accordance with the{" "}
            <strong>
              Digital Personal Data Protection Act, 2023 (DPDP Act)
            </strong>
            , the Information Technology Act, 2000, and all applicable Indian
            regulations. By using our website{" "}
            <strong>crownpointestates.com</strong> or contacting us, you agree
            to the terms described below.
          </p>
          <p className="last-updated">
            Effective Date: 1 June 2025 &nbsp;|&nbsp; Version 2.1 &nbsp;|&nbsp;
            Jurisdiction: India
          </p>
        </div>

        {/* Section 1 */}
        <Section num="01" id="s1" title="Information We Collect">
          <p>
            We collect only what is necessary to help you find your ideal
            property and deliver an exceptional real estate experience. This
            includes:
          </p>
          <DataTable
            headers={["Category", "What We Collect", "When Collected"]}
            rows={DATA_COLLECTED_ROWS}
          />
          <div className="highlight-box" style={{ marginTop: "20px" }}>
            <p>
              <strong>Important:</strong> We never collect your Aadhaar number,
              PAN, or any financial account details via our website. Such
              information, if required during a transaction, is handled strictly
              offline and in compliance with applicable law.
            </p>
          </div>
        </Section>

        {/* Section 2 */}
        <Section num="02" id="s2" title="How We Use Your Information">
          <p>
            Your data is used solely to provide you with superior real estate
            services. Specific uses include:
          </p>
          <PolicyList items={USAGE_LIST} />
          <p style={{ marginTop: "16px" }}>
            We will <strong>never</strong> sell, rent, or trade your personal
            information with third parties for their own marketing purposes.
          </p>
        </Section>

        {/* Section 3 */}
        <Section num="03" id="s3" title="Data Sharing & Disclosure">
          <p>
            We share your personal data only in the following limited and
            necessary circumstances:
          </p>
          <div className="two-col">
            {SHARING_CARDS.map((card) => (
              <div className="info-card" key={card.title}>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 4 */}
        <Section num="04" id="s4" title="Data Storage & Security">
          <p>
            All data is stored on secure servers within India, in compliance
            with the DPDP Act, 2023. We employ industry-standard measures
            including:
          </p>
          <PolicyList items={SECURITY_LIST} />
          <div className="highlight-box">
            <p>
              <strong>Retention:</strong> We retain your data for up to{" "}
              <strong>3 years</strong> from the date of last interaction, or as
              long as required by applicable law (e.g., RERA mandated records).
              After this period, data is securely purged or anonymised.
            </p>
          </div>
        </Section>

        {/* Section 5 */}
        <Section num="05" id="s5" title="Your Rights Under Indian Law">
          <p>
            Under the{" "}
            <strong>Digital Personal Data Protection Act, 2023</strong>, you
            have significant rights over your personal data. As a data
            principal, you can exercise the following:
          </p>
          <div className="rights-grid">
            {RIGHTS_BADGES.map((badge) => (
              <div className="right-badge" key={badge.title}>
                <span className="icon">{badge.icon}</span>
                <h4>{badge.title}</h4>
                <p>{badge.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "24px" }}>
            To exercise any of these rights, email us at{" "}
            <strong>privacy@crownpointestates.com</strong>. We will respond
            within <strong>30 days</strong> as required by law.
          </p>
        </Section>

        {/* Section 6 */}
        <Section num="06" id="s6" title="Cookies & Tracking Technologies">
          <p>
            Our website uses cookies and similar tracking technologies to
            enhance your browsing experience and understand how visitors
            interact with our platform.
          </p>
          <DataTable
            headers={["Cookie Type", "Purpose", "Can Be Disabled?"]}
            rows={COOKIE_ROWS}
          />
          <p style={{ marginTop: "16px" }}>
            You can manage cookie preferences through your browser settings.
            Disabling certain cookies may affect the functionality of our
            website.
          </p>
        </Section>

        {/* Section 7 */}
        <Section num="07" id="s7" title="Third-Party Links">
          <p>
            Our website may contain links to third-party platforms including
            developer websites, property portals (MagicBricks, 99acres,
            Housing.com), and social media pages. These external sites operate
            under their own privacy policies.
          </p>
          <p>
            Crownpoint Estates is not responsible for the privacy practices or
            content of any external websites. We encourage you to review the
            privacy policies of any third-party site you visit.
          </p>
        </Section>

        {/* Section 8 */}
        <Section num="08" id="s8" title="Children's Privacy">
          <p>
            Our services are intended for adults aged 18 years and above. We do
            not knowingly collect personal data from individuals below 18 years
            of age.
          </p>
          <p>
            As mandated under the <strong>DPDP Act, 2023</strong>, if we
            inadvertently receive data from a minor, we will promptly delete it
            upon becoming aware. Parents or guardians who believe their child
            has submitted information to us may contact our Grievance Officer
            for immediate deletion.
          </p>
        </Section>

        {/* Section 9 */}
        <Section num="09" id="s9" title="Changes to This Policy">
          <p>
            We may revise this Privacy Policy from time to time to reflect
            changes in law, our business practices, or technology. Any material
            changes will be communicated via:
          </p>
          <PolicyList items={CHANGES_LIST} />
          <p style={{ marginTop: "16px" }}>
            Continued use of our website or services after changes are posted
            constitutes your acceptance of the revised policy.
          </p>
        </Section>

        {/* Contact / Section 10 */}
        <div className="contact-card" id="s10">
          <div className="contact-card-inner">
            <div>
              <h2>
                Questions? Contact Our <em>Grievance Officer</em>
              </h2>
              <p>
                We are committed to addressing your privacy concerns promptly
                and transparently. If you have questions about this policy or
                wish to exercise your data rights under the DPDP Act, 2023, our
                dedicated Grievance Officer is here to assist you within 30 days
                of receiving your complaint.
              </p>
            </div>
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="icon">👤</div>
                <span>
                  <strong
                    style={{
                      color: "#fff",
                      display: "block",
                      fontSize: "11px",
                      letterSpacing: "1px",
                      marginBottom: "2px",
                    }}
                  >
                    GRIEVANCE OFFICER
                  </strong>
                  Crownpoint Estates Privacy Team
                </span>
              </div>
              <div className="contact-detail-item">
                <div className="icon">📧</div>
                <span>
                  <a href="mailto:sales@crownpointestates.com">
                    sales@crownpointestates.com
                  </a>
                </span>
              </div>
              <div className="contact-detail-item">
                <div className="icon">📞</div>
                <span>
                  <a href="tel:+919811556625">+91 98115 56625</a>
                </span>
              </div>
              <div className="contact-detail-item">
                <div className="icon">📍</div>
                <span style={{ fontSize: "12px" }}>
                  Crownpoint Estates 65, Lower Ground Floor, Akashneem Marg, DLF
                  City Phase-2, Gurgaon, Haryana – 122002
                  <br />
                  India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* ── Scoped Styles ── */}
      <style jsx global>{`
        /* ── RESET (scoped via body selector so it won't conflict) ── */
        .policy-page-root *,
        .policy-page-root *::before,
        .policy-page-root *::after {
          box-sizing: border-box;
        }

        /* ── CSS VARIABLES ── */
        :root {
          --pp-navy: #173e62;
          --pp-gold: #b59a78;
          --pp-gold-light: #d4bc9c;
          --pp-gold-dark: #8c7558;
          --pp-white: #ffffff;
          --pp-off-white: #f8f5f0;
          --pp-text-dark: #1a1a1a;
          --pp-text-mid: #4a4a4a;
          --pp-text-light: #7a7a7a;
          --pp-border: rgba(181, 154, 120, 0.25);
        }

        /* ── SCROLL BAR ── */
        .scroll-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: var(--pp-gold);
          z-index: 9999;
          transition: width 0.1s linear;
          width: 0%;
        }

        /* ── HERO ── */
        .hero {
          background: var(--pp-navy);
          position: relative;
          height: 60vh;
          overflow: hidden;
          padding: 160px 40px 70px;
          text-align: center;
        }
        .hero::before {
          content: "";
          position: absolute;
          top: -60px;
          right: -80px;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(181, 154, 120, 0.12) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
        .hero::after {
          content: "";
          position: absolute;
          bottom: -40px;
          left: -60px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(181, 154, 120, 0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
        .hero-deco {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .hero-deco::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(181, 154, 120, 0.3),
            transparent
          );
          transform: rotate(15deg) translateX(-200px);
        }
        .hero-deco::after {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(181, 154, 120, 0.2),
            transparent
          );
          transform: rotate(15deg) translateX(200px);
        }
        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--pp-gold);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .hero-eyebrow::before,
        .hero-eyebrow::after {
          content: "";
          display: block;
          width: 40px;
          height: 1px;
          background: var(--pp-gold-dark);
        }
        .hero h1 {
          font-family: var(--font-heading, "Playfair Display", serif);
          color: var(--pp-white);
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 700;
          letter-spacing: 1px;
          line-height: 1.2;
          margin-bottom: 20px;
          position: relative;
        }
        .hero h1 em {
          font-style: italic;
          color: var(--pp-gold);
        }
        .hero-sub {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          letter-spacing: 1px;
          margin-bottom: 30px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(181, 154, 120, 0.15);
          border: 1px solid rgba(181, 154, 120, 0.35);
          padding: 8px 20px;
          font-size: 12px;
          color: var(--pp-gold-light);
          letter-spacing: 1.5px;
        }

        /* ── PAGE WRAP ── */
        .page-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
          background: var(--pp-off-white, #f8f5f0);
        }

        /* ── TOC ── */
        .toc-card {
          background: var(--pp-navy);
          padding: 40px 44px;
          margin: 60px 0 50px;
          position: relative;
          border-left: 4px solid var(--pp-gold);
        }
        .toc-card::after {
          content: "§";
          position: absolute;
          top: 20px;
          right: 30px;
          font-family: var(--font-heading, "Playfair Display", serif);
          font-size: 60px;
          color: rgba(181, 154, 120, 0.08);
          pointer-events: none;
        }
        .toc-title {
          color: var(--pp-gold);
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 22px;
          font-family: var(--font-heading, "Playfair Display", serif);
        }
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 10px 30px;
        }
        .toc-list li a {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-size: 13.5px;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.2s;
        }
        .toc-list li a:hover {
          color: var(--pp-gold);
        }
        .toc-list li a::before {
          content: "";
          display: block;
          width: 18px;
          height: 1px;
          background: var(--pp-gold-dark);
          flex-shrink: 0;
        }

        /* ── INTRO BOX ── */
        .intro-box {
          background: white;
          border: 1px solid var(--pp-border);
          padding: 36px 44px;
          margin-bottom: 50px;
          border-top: 3px solid var(--pp-gold);
        }
        .intro-box p {
          color: var(--pp-text-mid);
          font-size: 15.5px;
          line-height: 1.8;
          margin-bottom: 14px;
        }
        .intro-box p:last-child {
          margin-bottom: 0;
        }
        .intro-box .last-updated {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--pp-border);
          font-size: 12px;
          color: var(--pp-text-light);
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        /* ── SECTIONS ── */
        .policy-section {
          margin-bottom: 56px;
          animation: ppFadeUp 0.5s ease both;
        }
        @keyframes ppFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .section-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 28px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--pp-border);
        }
        .section-number {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: var(--pp-navy);
          color: var(--pp-gold);
          font-family: var(--font-heading, "Playfair Display", serif);
          font-size: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .section-title {
          font-family: var(--font-heading, "Playfair Display", serif);
          color: var(--pp-navy);
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.25;
          padding-top: 8px;
          margin: 0;
        }
        .section-body {
          background: white;
          padding: 32px 38px;
          border: 1px solid var(--pp-border);
          font-size: 15px;
          color: var(--pp-text-mid);
          line-height: 1.8;
        }
        .section-body p {
          margin-bottom: 16px;
        }
        .section-body p:last-child {
          margin-bottom: 0;
        }
        .section-body strong {
          color: var(--pp-navy);
          font-weight: 700;
        }

        /* ── POLICY LIST ── */
        .policy-list {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }
        .policy-list li {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid rgba(181, 154, 120, 0.12);
          font-size: 15px;
          color: var(--pp-text-mid);
        }
        .policy-list li:last-child {
          border-bottom: none;
        }
        .policy-list li::before {
          content: "◆";
          color: var(--pp-gold);
          font-size: 8px;
          margin-top: 7px;
          flex-shrink: 0;
        }

        /* ── TWO COL ── */
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 20px;
        }
        .info-card {
          background: var(--pp-off-white);
          border: 1px solid var(--pp-border);
          padding: 22px 24px;
          border-left: 3px solid var(--pp-gold);
        }
        .info-card h4 {
          font-family: var(--font-heading, "Playfair Display", serif);
          color: var(--pp-navy);
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .info-card p {
          font-size: 13.5px;
          color: var(--pp-text-mid);
          margin-bottom: 0 !important;
        }

        /* ── HIGHLIGHT BOX ── */
        .highlight-box {
          background: var(--pp-navy);
          border-left: 4px solid var(--pp-gold);
          padding: 22px 28px;
          margin: 20px 0;
        }
        .highlight-box p {
          color: rgba(255, 255, 255, 0.8) !important;
          font-size: 14px !important;
          margin-bottom: 0 !important;
        }
        .highlight-box strong {
          color: var(--pp-gold) !important;
        }

        /* ── DATA TABLE ── */
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          font-size: 14px;
        }
        .data-table thead {
          background: var(--pp-navy);
        }
        .data-table thead th {
          color: var(--pp-gold);
          padding: 14px 18px;
          text-align: left;
          font-family: var(--font-heading, "Playfair Display", serif);
          font-size: 13px;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .data-table tbody tr {
          border-bottom: 1px solid var(--pp-border);
          transition: background 0.15s;
        }
        .data-table tbody tr:hover {
          background: rgba(181, 154, 120, 0.06);
        }
        .data-table td {
          padding: 14px 18px;
          color: var(--pp-text-mid);
          vertical-align: top;
          line-height: 1.6;
        }

        /* ── RIGHTS GRID ── */
        .rights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        .right-badge {
          background: var(--pp-off-white);
          border: 1px solid var(--pp-border);
          padding: 20px;
          text-align: center;
          transition:
            border-color 0.25s,
            transform 0.25s;
        }
        .right-badge:hover {
          border-color: var(--pp-gold);
          transform: translateY(-2px);
        }
        .right-badge .icon {
          font-size: 26px;
          margin-bottom: 10px;
          display: block;
        }
        .right-badge h4 {
          font-family: var(--font-heading, "Playfair Display", serif);
          color: var(--pp-navy);
          font-size: 13.5px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .right-badge p {
          font-size: 12px;
          color: var(--pp-text-light);
          margin-bottom: 0 !important;
          line-height: 1.5;
        }

        /* ── CONTACT CARD ── */
        .contact-card {
          background: var(--pp-navy);
          padding: 50px 50px 44px;
          position: relative;
          overflow: hidden;
          margin-top: 60px;
          border-top: 4px solid var(--pp-gold);
        }
        .contact-card::before {
          content: '"';
          position: absolute;
          right: 40px;
          top: 10px;
          font-family: var(--font-heading, "Playfair Display", serif);
          font-size: 200px;
          color: rgba(181, 154, 120, 0.06);
          line-height: 1;
          pointer-events: none;
        }
        .contact-card-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 50px;
          align-items: center;
        }
        .contact-card h2 {
          font-family: var(--font-heading, "Playfair Display", serif);
          color: var(--pp-white);
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 14px;
        }
        .contact-card h2 em {
          font-style: italic;
          color: var(--pp-gold);
        }
        .contact-card > .contact-card-inner > div:first-child > p {
          color: rgba(255, 255, 255, 0.65);
          font-size: 14.5px;
          line-height: 1.7;
          margin-bottom: 0;
        }
        .contact-details {
          min-width: 240px;
        }
        .contact-detail-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(181, 154, 120, 0.2);
        }
        .contact-detail-item:last-child {
          border-bottom: none;
        }
        .contact-detail-item .icon {
          width: 36px;
          height: 36px;
          border: 1px solid var(--pp-gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 15px;
        }
        .contact-detail-item span {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13.5px;
          line-height: 1.5;
        }
        .contact-detail-item a {
          color: var(--pp-gold);
          text-decoration: none;
        }
        .contact-detail-item a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default PolicyPage;
