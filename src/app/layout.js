"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "..//components/Footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, anchorPlacement: "top-bottom" });
  }, []);

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
