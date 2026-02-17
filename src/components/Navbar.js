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

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [theme, setTheme] = useState("light");
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

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark");
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (e) {}
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

  // On mobile, we keep a fixed width and don't shrink the pill
  const mobileWidth = "92%";

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
      <style>{`
        /* ── Shared nav pill styles ─────────────────────────────────── */
        .nav-pill {
          // background: var(--nav-bg, rgba(255,255,255,0.82));
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(48px) saturate(180%);
          // border: 1px solid var(--nav-border, rgba(0,0,0,0.08));
          // box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1.5px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s ease;
        }
        [data-theme="dark"] .nav-pill {
          --nav-bg: rgba(20,20,22,0.85);
          --nav-border: rgba(255,255,255,0.09);
          box-shadow: 0 4px 24px rgba(0,0,0,0.35), 0 1.5px 4px rgba(0,0,0,0.2);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 34px;
          gap: 12px;
        }
        .logo {
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          text-decoration: none;
          color: var(--text-primary, #111);
          flex-shrink: 0;
        }
        [data-theme="dark"] .logo { color: #f0f0f0; }

        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          color: var(--text-secondary, #444);
          padding: 6px 10px;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nav-link:hover {
          color: var(--text-primary, #111);
          background: var(--hover-bg, rgba(0,0,0,0.05));
        }
        [data-theme="dark"] .nav-link { color: #aaa; }
        [data-theme="dark"] .nav-link:hover {
          color: #f0f0f0;
          background: rgba(255,255,255,0.07);
        }

        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 8px;
          line-height: 1;
          font-size: 1rem;
          display: flex;
          align-items: center;
        }

        /* ── Desktop nav (hidden on mobile) ──────────────────────────── */
        .desktop-links {
          flex: 1;
          display: flex;
          justify-content: center;
          gap: 2px;
        }
        .desktop-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        /* ── Hamburger button ─────────────────────────────────────────── */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          justify-content: center;
        }
        .hamburger-btn .bar {
          display: block;
          width: 22px;
          height: 2px;
          border-radius: 2px;
          background: var(--text-primary, #111);
          transform-origin: center;
        }
        [data-theme="dark"] .hamburger-btn .bar { background: #f0f0f0; }

        /* ── Mobile drawer ────────────────────────────────────────────── */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 20px;
          pointer-events: none;
          display: flex;
          justify-content: center;
        }
        .mobile-drawer-inner {
          width: 92%;
          background: var(--nav-bg, rgba(255,255,255,0.97));
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border: 1px solid var(--nav-border, rgba(0,0,0,0.08));
          border-radius: 24px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.12), 0 3px 8px rgba(0,0,0,0.06);
          pointer-events: auto;
          overflow: hidden;
          padding-top: 80px; /* space below the navbar pill */
          padding-bottom: 28px;
        }
        [data-theme="dark"] .mobile-drawer-inner {
          --nav-bg: rgba(18,18,20,0.97);
          --nav-border: rgba(255,255,255,0.09);
          box-shadow: 0 12px 48px rgba(0,0,0,0.5), 0 3px 8px rgba(0,0,0,0.3);
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          padding: 0 20px;
          gap: 2px;
        }
        .mobile-nav-link {
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          text-decoration: none;
          color: var(--text-primary, #111);
          padding: 12px 16px;
          border-radius: 14px;
          transition: background 0.2s ease, color 0.2s ease;
          display: block;
        }
        .mobile-nav-link:hover {
          background: var(--hover-bg, rgba(0,0,0,0.05));
        }
        [data-theme="dark"] .mobile-nav-link { color: #f0f0f0; }
        [data-theme="dark"] .mobile-nav-link:hover { background: rgba(255,255,255,0.07); }

        .mobile-drawer-footer {
          margin: 20px 20px 0;
          padding-top: 20px;
          border-top: 1px solid rgba(0,0,0,0.07);
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        [data-theme="dark"] .mobile-drawer-footer {
          border-top-color: rgba(255,255,255,0.08);
        }

        /* ── Overlay backdrop ─────────────────────────────────────────── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }
        [data-theme="dark"] .mobile-overlay { background: rgba(0,0,0,0.5); }

        /* ── Responsive breakpoint ────────────────────────────────────── */
        @media (max-width: 767px) {
          .desktop-links  { display: none !important; }
          .hamburger-btn  { display: flex !important; }
        }
        @media (min-width: 768px) {
          .mobile-drawer  { display: none !important; }
        }
      `}</style>

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
              // On mobile keep full width; on desktop use the spring-driven width
              width: typeof window !== "undefined" && window.innerWidth < 768
                ? mobileWidth
                : width,
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
                  onClick={() =>
                    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                  }
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