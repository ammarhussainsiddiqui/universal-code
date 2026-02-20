"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ── Social icons (inline SVG) ───────────────────────────── */
const SOCIALS = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@devraj.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
  },
];

/* ── Animated heading word ───────────────────────────────── */
function Word({ children, delay }) {
  return (
    <motion.span
      initial={{ y: 64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}

/* ── Main Footer ─────────────────────────────────────────── */
export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .footer-root {
          background: var(--bg);
          padding: 60px 48px 48px;
          font-family: var(--font-sans);
          position: relative;
          color: var(--fg);
        }

        /* ── CTA card ── */
        .footer-card {
          margin: 0 auto 52px;
          width: 80%;
          background: var(--accent);
          border: 1px solid rgba(16,24,40,0.04);
          border-radius: 24px;
          padding: 72px 48px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          overflow: hidden;
          position: relative;
        }

        /* subtle inner glow */
        .footer-card::before {
          content: '';
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--highlight) 0%, transparent 70%);
          opacity: 0.05;
          pointer-events: none;
        }

        .footer-avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16,24,40,0.04);
          border: 1px solid rgba(16,24,40,0.04);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--muted);
          margin-bottom: 28px;
          letter-spacing: 0.01em;
        }
        .footer-avail-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--highlight);
          box-shadow: 0 0 8px rgba(163,230,53,0.7);
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        .footer-cta-heading {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 6vw, 5rem);
          font-weight: 800;
          color: var(--fg);
          line-height: 1.1;
          letter-spacing: -0.035em;
          overflow: hidden;
          margin-bottom: 40px;
        }
        .footer-cta-line {
          display: block;
          overflow: hidden;
        }

        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 38px;
          border-radius: 999px;
          border: 1.5px solid rgba(16,24,40,0.04);
          background: transparent;
          color: var(--fg);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s;
          position: relative;
          z-index: 1;
        }
        .footer-cta-btn:hover {
          border-color: var(--highlight);
          background: rgba(163,230,53,0.08);
          color: var(--highlight);
          box-shadow: 0 0 32px rgba(163,230,53,0.18);
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-copy {
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 400;
        }
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(16,24,40,0.04);
          background: transparent;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .social-btn:hover {
          color: var(--fg);
          border-color: rgba(16,24,40,0.04);
          background: rgba(16,24,40,0.04);
        }

        /* ── Floating bot FAB ── */
        .footer-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--accent);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35);
          color: var(--fg);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .footer-root { padding: 40px 20px 36px; }
          .footer-card { padding: 52px 24px 60px; border-radius: 18px; }
          .footer-bottom { justify-content: center; text-align: center; }
          .footer-cta-heading { font-size: 2.4rem; }
        }
      `}</style>

      <footer className="footer-root" ref={ref}>

        {/* ── CTA Card ───────────────────────────────────────── */}
        <motion.div
          className="footer-card"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Available badge */}
          <motion.div
            className="footer-avail-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="footer-avail-dot" />
            Available for work
          </motion.div>

          {/* Big heading */}
          <h2 className="footer-cta-heading">
            <span className="footer-cta-line">
              <Word delay={0.3}>Let's&nbsp;</Word>
              <Word delay={0.38}>create&nbsp;</Word>
              <Word delay={0.46}>your</Word>
            </span>
            <span className="footer-cta-line">
              <Word delay={0.54}>next&nbsp;</Word>
              <Word delay={0.62}>big&nbsp;</Word>
              <Word delay={0.70}>idea.</Word>
            </span>
          </h2>

          {/* CTA button */}
          <motion.a
            href="/contact"
            className="footer-cta-btn"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.85 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* ── Bottom bar ─────────────────────────────────────── */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="footer-copy">
            © 2026 Devraj Chatribin. All rights reserved.
          </p>

          <div className="footer-socials">
            {SOCIALS.map(({ name, href, icon }) => (
              <motion.a
                key={name}
                href={href}
                className="social-btn"
                aria-label={name}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </footer>

      {/* ── Floating Bot FAB ───────────────────────────────────── */}
      <motion.button
        className="footer-fab"
        aria-label="Chat with bot"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.45, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, boxShadow: "0 6px 28px rgba(0,0,0,0.45)" }}
        whileTap={{ scale: 0.93 }}
      >
        {/* bot / chat icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M12 2a3 3 0 0 1 3 3v6H9V5a3 3 0 0 1 3-3z"/>
          <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none"/>
          <path d="M8 11V7"/>
          <path d="M16 11V7"/>
        </svg>
      </motion.button>
    </>
  );
}