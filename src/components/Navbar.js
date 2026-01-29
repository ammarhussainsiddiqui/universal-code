"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const scrollYProgress = useMotionValue(0);
  const spring = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001,
  });

  const width = useTransform(spring, [0, 100], ["90%", "42%"]);
  const borderRadius = useTransform(spring, [0, 100], ["10px", "999px"]);
  const y = useTransform(spring, [0, 100], ["0px", "-6px"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    scrollYProgress.set(Math.min(latest, 100));
  });

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""} `}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "20px",
          pointerEvents: "none",
        }}
      >
        <motion.nav
          className="nav-pill "
          style={{
            width,
            borderRadius,
            y,
            padding:'5px',
            pointerEvents: "auto",
            willChange: "transform, width, border-radius",
            margin: "0 auto",
          }}
        >
          <div style={{padding:'0 15px'}} className="container nav-container">
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Link href="/" className="logo">
                DC
              </Link>
            </div>

            <nav
              role="navigation"
              aria-label="Primary"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
              className="nav-links"
            >
              <div className="nav-item">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </div>
              <div className="nav-item">
                <Link href="/about" className="nav-link">
                  About
                </Link>
              </div>
              <div className="nav-item">
                <Link href="/projects" className="nav-link">
                  Projects
                </Link>
              </div>
              <div className="nav-item">
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </div>
            </nav>

            <div className="nav-actions">
              <button
                type="button"
                className="theme-toggle"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                aria-pressed={theme === "dark"}
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              >
                <span
                  aria-hidden="true" className="nav-link"
                >
                  {theme === "dark" ? "☾" : "☀"}
                </span>
              </button>

            </div>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
