"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
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
        <footer className="site-footer">
          <div className="container footer-inner">
            <div>© {new Date().getFullYear()} Devraj Chatribin. All rights reserved.</div>
            <div className="socials">
              <a href="https://www.linkedin.com/in/devraj-chatribin/">LinkedIn</a>
              <a href="https://github.com/DevrajDC">GitHub</a>
              <a href="https://www.instagram.com/devraj_uiux/">Instagram</a>
              <a href="mailto:devrajchatribin9978@gmail.com">Gmail</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
