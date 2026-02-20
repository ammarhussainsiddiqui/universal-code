"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Tech stack data with SVG-based colored icons
───────────────────────────────────────────────────────────── */
const TECH_STACK = [
  { name: "TypeScript",    color: "#3178c6", icon: "TS" },
  { name: "JavaScript",   color: "#f7df1e", icon: "JS" },
  { name: "React",        color: "#61dafb", icon: "⚛" },
  { name: "Next.js",      color: "#fff",    icon: "N" },
  { name: "Tailwind CSS", color: "#38bdf8", icon: "~" },
  { name: "Framer Motion",color: "#a855f7", icon: "F" },
  { name: "Figma",        color: "#f24e1e", icon: "✦" },
  { name: "GSAP",         color: "#88ce02", icon: "G" },
  { name: "Firebase",     color: "#ffa000", icon: "🔥" },
  { name: "AWS",          color: "#ff9900", icon: "⬡" },
  { name: "Docker",       color: "#2496ed", icon: "🐳" },
  { name: "Cypress",      color: "#69d3a7", icon: "C" },
  { name: "PostgreSQL",   color: "#336791", icon: "🐘" },
  { name: "GIT",          color: "#f05032", icon: "⎇" },
  { name: "HTML",         color: "#e34f26", icon: "H" },
  { name: "CSS",          color: "#1572b6", icon: "C" },
];

/* ─────────────────────────────────────────────────────────────
   Experience data
───────────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    role: "Software Engineer",
    company: "@OneShield Software",
    period: "Aug 2022 — Present",
    logo: "OS",
    logoColor: "#4f8ef7",
    logoBg: "#0f1b3d",
    current: true,
  },
  {
    role: "Founder",
    company: "@Design and Code",
    period: "Jan 2021 — Present",
    logo: "DC",
    logoColor: "#a3e635",
    logoBg: "#0e1a00",
    current: true,
  },
  {
    role: "Design Engineer",
    company: "@Freelance",
    period: "Mar 2020 — Dec 2021",
    logo: "DE",
    logoColor: "#f472b6",
    logoBg: "#1e0011",
    current: false,
  },
  {
    role: "Frontend Developer",
    company: "@StartupXYZ",
    period: "Jun 2019 — Feb 2020",
    logo: "FD",
    logoColor: "#fb923c",
    logoBg: "#1e0e00",
    current: false,
  },
];

/* ─────────────────────────────────────────────────────────────
   Infinite Marquee
───────────────────────────────────────────────────────────── */
function TechMarquee() {
  const doubled = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="marquee-section">
      <div className="marquee-track-wrapper">
        {/* Fade edges */}
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />

        <div className="marquee-track">
          <motion.div
            className="marquee-inner"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {doubled.map((tech, i) => (
              <motion.div
                key={`${tech.name}-${i}`}
                className="tech-chip"
                whileHover={{ scale: 1.06, borderColor: tech.color }}
              >
                <span
                  className="tech-icon"
                  style={{ color: tech.color, background: `${tech.color}18` }}
                >
                  {tech.icon}
                </span>
                <span className="tech-name">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Single experience row
───────────────────────────────────────────────────────────── */
function ExperienceRow({ role, company, period, logo, logoColor, logoBg, current, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="exp-row"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 6 }}
    >
      {/* Logo avatar */}
      <div
        className="exp-logo"
        style={{ background: logoBg, color: logoColor, border: `1.5px solid ${logoColor}30` }}
      >
        {logo}
      </div>

      {/* Role + company */}
      <div className="exp-info">
        <div className="exp-role">
          {role}
          {current && <span className="exp-badge">Current</span>}
        </div>
        <div className="exp-company">{company}</div>
      </div>

      {/* Dotted line */}
      <div className="exp-line" />

      {/* Period */}
      <div className="exp-period">{period}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────────────── */
export default function ExperienceSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Marquee ───────────────────────────────────────────── */
        .marquee-section {
          background: var(--bg);
          padding: 0;
          overflow: hidden;
          border-top: 1px solid rgba(16,24,40,0.04);
          border-bottom: 1px solid rgba(16,24,40,0.04);
        }
        .marquee-track-wrapper {
          position: relative;
          padding: 20px 0;
        }
        .marquee-fade-left,
        .marquee-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-fade-left  { left: 0;  background: linear-gradient(to right, var(--bg), transparent); }
        .marquee-fade-right { right: 0; background: linear-gradient(to left,  var(--bg), transparent); }

        .marquee-track {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-inner {
          display: inline-flex;
          gap: 12px;
          white-space: nowrap;
          will-change: transform;
        }
        .tech-chip {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 18px;
          border-radius: 999px;
          border: 1px solid rgba(16,24,40,0.04);
          background: var(--accent);
          cursor: default;
          transition: border-color 0.25s ease;
          flex-shrink: 0;
        }
        .tech-icon {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
          font-family: var(--font-display);
          flex-shrink: 0;
        }
        .tech-name {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--fg);
          white-space: nowrap;
        }

        /* ── Experience section ────────────────────────────────── */
        .experience-section {
          background: var(--bg);
          padding: 100px 48px 120px;
          font-family: var(--font-sans);
          position: relative;
          overflow: hidden;
          color: var(--fg);
        }
        /* faint grid lines background */
        .experience-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(16,24,40,0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,24,40,0.01) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .experience-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 80px;
          align-items: start;
        }

        /* Left column */
        .exp-left {
          position: sticky;
          top: 120px;
        }
        .exp-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--highlight);
          margin-bottom: 18px;
        }
        .exp-eyebrow svg {
          flex-shrink: 0;
        }
        .exp-heading {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 4vw, 3.6rem);
          font-weight: 800;
          color: var(--fg);
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: 22px;
        }
        .exp-desc {
          font-size: 0.925rem;
          line-height: 1.75;
          color: var(--muted);
          max-width: 300px;
          font-weight: 400;
        }

        /* Right column — experience list */
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 4px;
        }

        .exp-row {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(16,24,40,0.04);
          cursor: default;
          transition: padding-left 0.25s ease;
        }
        .exp-row:first-child { border-top: 1px solid rgba(16,24,40,0.04); }

        .exp-logo {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 800;
          flex-shrink: 0;
          letter-spacing: 0.04em;
        }

        .exp-info {
          flex-shrink: 0;
          min-width: 200px;
        }
        .exp-role {
          font-size: 0.975rem;
          font-weight: 600;
          color: var(--fg);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 3px;
        }
        .exp-badge {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a3e635;
          background: rgba(163,230,53,0.1);
          border: 1px solid rgba(163,230,53,0.25);
          border-radius: 999px;
          padding: 2px 8px;
        }
        .exp-company {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.38);
          font-weight: 400;
        }

        .exp-line {
          flex: 1;
          height: 1px;
          background: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.12) 0px,
            rgba(255,255,255,0.12) 4px,
            transparent 4px,
            transparent 10px
          );
          min-width: 40px;
        }

        .exp-period {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
          white-space: nowrap;
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.01em;
        }

        /* ── Responsive ─────────────────────────────────────────── */
        @media (max-width: 900px) {
          .experience-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .exp-left {
            position: static;
          }
          .experience-section {
            padding: 72px 28px 80px;
          }
        }
        @media (max-width: 560px) {
          .exp-line { display: none; }
          .exp-period {
            margin-left: auto;
          }
          .exp-info { min-width: 0; flex: 1; }
          .exp-row { flex-wrap: wrap; gap: 10px; }
        }
      `}</style>

      {/* ── Tech Marquee ─────────────────────────────────────── */}
      <TechMarquee />

      {/* ── Experience Section ───────────────────────────────── */}
      <section className="experience-section">
        <div className="experience-inner">

          {/* Left — sticky label */}
          <div className="exp-left" ref={headingRef}>
            <motion.div
              className="exp-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* four-pointed star */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z" fill="#a3e635"/>
              </svg>
              Work History
            </motion.div>

            <motion.h2
              className="exp-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Experience
            </motion.h2>

            <motion.p
              className="exp-desc"
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
            >
              I have worked with some of the most innovative industry leaders to
              help build their top-notch products.
            </motion.p>
          </div>

          {/* Right — list */}
          <div className="exp-list">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceRow key={exp.company} {...exp} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}