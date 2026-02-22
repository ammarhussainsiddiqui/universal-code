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
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Theme is now handled via ThemeContext (useTheme)

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

  // Hamburger bar variants
  const topBar = {
    closed: { rotate: 0, y: 0 },
    open:   { rotate: 45, y: 7 },
  };
  const midBar = {
    closed: { opacity: 1, scaleX: 1 },
    open:   { opacity: 0, scaleX: 0 },
  };
  const botBar = {
    closed: { rotate: 0, y: 0 },
    open:   { rotate: -45, y: -7 },
  };

  // Mobile drawer variants
  const drawerVariants = {
    closed: {
      clipPath: "inset(0% 0% 100% 0% round 24px)",
      opacity: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    open: {
      clipPath: "inset(0% 0% 0% 0% round 24px)",
      opacity: 1,
      transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 18 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.07, duration: 0.35, ease: "easeOut" },
    }),
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: "0 auto",
            width: "85%",
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
            className="nav-pill"
            style={{
              width,
              borderRadius,
              y,
              padding: "5px",
              pointerEvents: "auto",
              willChange: "transform, width, border-radius",
              margin: "0 auto",
            }}
          >
            <div style={{ padding: "0 15px" }} className="nav-container">
              {/* Logo */}
              <Link href="/" className="logo">
                AR
              </Link>

              {/* Desktop links */}
              <nav
                role="navigation"
                aria-label="Primary"
                className="desktop-links"
              >
                {NAV_LINKS.map(({ href, label }) => (
                  <Link key={href} href={href} className="nav-link">
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Right-side actions */}
              <div className="desktop-actions">
                {/* Theme toggle — always visible */}
                <button
                  type="button"
                  className="theme-toggle"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  aria-pressed={theme === "dark"}
                  onClick={() => toggleTheme()}
                >
                  <span aria-hidden="true" className="nav-link">
                    {theme === "dark" ? "☾" : "☀"}
                  </span>
                </button>

                {/* Hamburger — mobile only */}
                <motion.button
                  type="button"
                  className="hamburger-btn"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((v) => !v)}
                  animate={mobileOpen ? "open" : "closed"}
                >
                  <motion.span className="bar" variants={topBar} transition={{ duration: 0.3 }} />
                  <motion.span className="bar" variants={midBar} transition={{ duration: 0.2 }} />
                  <motion.span className="bar" variants={botBar} transition={{ duration: 0.3 }} />
                </motion.button>
              </div>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* ── Mobile overlay backdrop ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="mobile-drawer">
            <motion.div
              className="mobile-drawer-inner"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-label="Mobile navigation"
              role="dialog"
            >
              <nav className="mobile-nav-links" role="navigation" aria-label="Mobile primary">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={href}
                      className="mobile-nav-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer row inside drawer */}
              {/* <div className="mobile-drawer-footer">
                <button
                  type="button"
                  className="theme-toggle"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  aria-pressed={theme === "dark"}
                  onClick={() =>
                    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                  }
                >
                  <span aria-hidden="true" className="nav-link" style={{ fontSize: "1.1rem" }}>
                    {theme === "dark" ? "☾  Light mode" : "☀  Dark mode"}
                  </span>
                </button>
              </div> */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}