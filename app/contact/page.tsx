"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import contactbg from "../assets/hero/hero1.jpg";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
// import formbg from "../assets/hero/hero2.jpg";
import Footer from "../components/Footer";
import ButtonFill from "../components/ButtonFill";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Please fill all fields");
      return;
    }

    emailjs
      .send(
        "service_6rvw01b",
        "template_jk25ymk",
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        "LCtQz5NyJc0y0wKpF"
      )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message. Please try again.");
      });
  };

  return (
    <div className="relative">
      <Navbar />

      <section className="relative h-[70vh] lg:h-[80vh] w-full overflow-hidden">
        <Image
          src={contactbg}
          alt="Contact Background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-12 left-0 right-0 z-10">
          <div className="w-11/12 md:w-5/6 mx-auto text-left text-white">
            <h1
              className="text-4xl md:text-6xl font-bold tracking-wide mb-4"
              data-aos="fade-up"
            >
              Contact Us
            </h1>

            <div
              className="flex items-center gap-3 text-sm md:text-base"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <a
                href="/"
                className="text-white hover:text-[var(--color5)] transition"
              >
                Home
              </a>

              <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>

              <span className="text-[var(--primary)] font-semibold">
                Contact us
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute bottom-0 left-0 opacity-100 pointer-events-none">
          {/* <Image src={formbg} alt="Background" width={800} height={800} /> */}
        </div>

        <div className="w-11/12 md:w-5/6 mx-auto grid lg:grid-cols-2 gap-16 items-start relative z-10">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-sm tracking-widest uppercase text-gray-500 mb-3">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full" />
                Contact Us
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-4">
                Get in touch <span className="font-semibold">with us</span>
              </h2>

              <p className="text-gray-500 max-w-md leading-relaxed">
                Reach out for any inquiries, support, or to discuss how we can
                meet your industrial needs.
              </p>
            </div>

            <div className="space-y-16">
              <div className="flex gap-4 items-start w-fit">
                <a
                  href="tel:+1809120670"
                  className="flex gap-4 items-start group cursor-pointer"
                >
                  <div
                    className="
                      relative w-14 h-14 rounded-xl
                      bg-[var(--primary)]
                      flex items-center justify-center
                      text-white
                      overflow-hidden
                    "
                  >
                    <span
                      className="
                        absolute inset-0
                        bg-black
                        scale-0
                        transition-transform duration-500 ease-out
                        group-hover:scale-100
                        rounded-xl
                      "
                    />

                    <Phone
                      size={22}
                      className="
  relative z-10
  transition-all duration-300
  group-hover:scale-110
  text-[var(--primary-bg)]
  group-hover:text-white
"
                    />
                  </div>

                  <div>
                    <p className="font-semibold transition-colors duration-300 group-hover:text-black">
                      Contact
                    </p>
                    <a
                      href="tel:9810333152"
                      className="text-gray-500 transition-colors duration-300 group-hover:text-gray-700"
                    >
                      9810333152
                    </a>
                  </div>
                </a>
              </div>

              <div className="flex gap-4 items-start w-fit">
                <a
                  href="mailto:info@domainname.com"
                  className="flex gap-4 items-start group cursor-pointer"
                >
                  <div
                    className="
                        relative w-14 h-14 rounded-xl
                        bg-[var(--primary)]
                        flex items-center justify-center
                        text-white
                        overflow-hidden
                      "
                  >
                    <span
                      className="
                        absolute inset-0
                        bg-black
                        scale-0
                        transition-transform duration-500 ease-out
                        group-hover:scale-100
                        rounded-xl
                      "
                    />

                    <Mail
                      size={22}
                      className="
  relative z-10
  transition-all duration-300
  group-hover:scale-110
  text-[var(--primary-bg)]
  group-hover:text-white
"
                    />
                  </div>

                  <div>
                    <p className="font-semibold transition-colors duration-300 group-hover:text-black">
                      E-mail
                    </p>
                    <a
                      href="mailto:Bajajchemicals@hotmail.com"
                      className="text-gray-500 transition-colors duration-300 group-hover:text-gray-700"
                    >
                      Bajajchemicals@hotmail.com
                    </a>
                  </div>
                </a>
              </div>

              <div className="flex gap-4 items-start w-fit">
                <a
                  href="https://maps.app.goo.gl/aGS6QNr8gUUD75nc9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-start group cursor-pointer"
                >
                  {/* ICON BOX */}
                  <div
                    className="
        relative w-14 h-14 rounded-xl
        bg-[var(--primary)]
        flex items-center justify-center
        text-white
        overflow-hidden
      "
                  >
                    <span
                      className="
          absolute inset-0
          bg-black
          scale-0
          transition-transform duration-500 ease-out
          group-hover:scale-100
          rounded-xl
        "
                    />

                    <MapPin
                      size={22}
                      className="
  relative z-10
  transition-all duration-300
  group-hover:scale-110
  text-[var(--primary-bg)]
  group-hover:text-white
"
                    />
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="font-semibold transition-colors duration-300 group-hover:text-black">
                      Our Address
                    </p>
                    <p className="text-gray-500 max-w-sm transition-colors duration-300 group-hover:text-gray-700">
                      C-275, Sector 5, DSIDC Bawana Industrial Area, Delhi,
                      110039
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-light mb-8">
              Contact <span className="font-semibold">me</span>
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter first name"
                  className="w-full border rounded-xl px-5 py-4 outline-none"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter last name"
                  className="w-full border rounded-xl px-5 py-4 outline-none"
                />
              </div>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your e-mail"
                className="w-full border rounded-xl px-5 py-4 outline-none"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your phone no."
                className="w-full border rounded-xl px-5 py-4 outline-none"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write Message"
                rows={5}
                className="w-full border rounded-xl px-5 py-4 outline-none resize-none"
              />
              <ButtonFill
                text="Submit Message"
                type="submit"
                className="w-[170px]"
              />
            </form>
          </div>
        </div>
      </section>
      <section className="relative w-full h-[420px] md:h-[520px]">
        <iframe
          title="Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d223772.76676769473!2d76.798549!3d28.7956764!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d014d6aaaaaab%3A0xe896fb0b9a534504!2sBajaj%20Chemicals!5e0!3m2!1sen!2sin!4v1766399789901!5m2!1sen!2sin"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div
          className="
          absolute bottom-6 left-1/2 -translate-x-1/2
          bg-white/95 backdrop-blur-xl
          border border-[var(--med-border)]
          rounded-2xl
          shadow-[0_20px_40px_rgba(11,141,133,0.25)]
          px-6 py-5
          w-[92%] max-w-xl
        "
          data-aos="fade-up"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--med-primary)]/10 flex items-center justify-center">
              <MapPin className="text-[var(--med-primary)]" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--med-text)] mb-1">
                Our Location
              </h3>
              <p className="text-sm text-[var(--med-text)]/70">
                C-275, Sector 5, DSIDC Bawana Industrial Area, Delhi, 110039
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
