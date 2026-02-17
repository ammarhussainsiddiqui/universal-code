"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ── Projects data ───────────────────────────────────────── */
const PROJECTS = [
  {
    slug:  "aora",
    title: "Aora",
    cat:   "Development",
    year:  "2024",
    bg:    "#f5f0d8",
    img:   "/projects/aora.webp",
    tags:  ["Development"],
  },
  {
    slug:  "code-screenshot",
    title: "Code Screenshot",
    cat:   "Development & Design",
    year:  "2024",
    bg:    "#f8e0f0",
    img:   "/projects/codescreenshot.webp",
    tags:  ["Development", "Design"],
  },
  {
    slug:  "iphone",
    title: "iPhone 15 Pro",
    cat:   "Development & Design",
    year:  "2024",
    bg:    "#e8e8ea",
    img:   "/projects/iphone.webp",
    tags:  ["Development", "Design"],
  },
  {
    slug:  "ochi-design",
    title: "Ochi Design",
    cat:   "Development & Design",
    year:  "2024",
    bg:    "#c8f0d4",
    img:   "/projects/ochidesign.webp",
    tags:  ["Development", "Design"],
  },
  {
    slug:  "dc-community",
    title: "Design & Code",
    cat:   "Design",
    year:  "2023",
    bg:    "#d4e8ff",
    img:   "/projects/dc.webp",
    tags:  ["Design"],
  },
  {
    slug:  "portfolio",
    title: "Portfolio v3",
    cat:   "Development & Design",
    year:  "2023",
    bg:    "#fde8d4",
    img:   "/projects/portfolio.webp",
    tags:  ["Development", "Design"],
  },
];

const FILTERS = ["All", "Development", "Design"];

/* ── Single project card ─────────────────────────────────── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="p-card" style={{ "--bg": project.bg }}>
        <div className="p-img-wrap">
          <div className="p-img-bg" style={{ background: project.bg }}>
            <motion.img
              src={project.img}
              alt={project.title}
              className="p-img"
              onError={e => { e.currentTarget.style.opacity = "0"; }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="p-hover-overlay">
            <div className="p-arrow-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="p-meta">
          <div className="p-meta-left">
            <span className="p-title">{project.title}</span>
            <span className="p-cat">{project.cat}</span>
          </div>
          <span className="p-year">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const filtered = active === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(active));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .projects-root {
          background: #0e0e10;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding: 110px 48px 120px;
        }

        .projects-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .projects-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a3e635;
          margin-bottom: 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .projects-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 800;
          color: #f0f0f0;
          line-height: 1.1;
          letter-spacing: -0.035em;
          max-width: 620px;
          margin-bottom: 48px;
        }

        /* ── Filter tabs ── */
        .filter-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          margin-bottom: 40px;
        }

        .filter-btn {
          position: relative;
          padding: 8px 20px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          overflow: hidden;
        }
        .filter-btn:hover {
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.2);
        }
        .filter-btn.active {
          color: #0e0e10;
          border-color: transparent;
        }
        .filter-pill-bg {
          position: absolute;
          inset: 0;
          background: #f0f0f0;
          border-radius: 999px;
          z-index: 0;
        }
        .filter-btn span {
          position: relative;
          z-index: 1;
        }

        /* ── Projects grid ── */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }

        /* Stagger left col slightly lower than right */
        .projects-grid > *:nth-child(even) {
          margin-top: 48px;
        }

        /* ── Card ── */
        .p-card {
          display: block;
          text-decoration: none;
          border-radius: 18px;
          overflow: hidden;
          background: #141416;
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.3s;
        }
        .p-card:hover { border-color: rgba(255,255,255,0.14); }

        .p-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
        }
        .p-img-bg {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .p-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.3s;
        }

        .p-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
          border-radius: 16px 16px 0 0;
        }
        .p-card:hover .p-hover-overlay { opacity: 1; }

        .p-arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111;
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }
        .p-card:hover .p-arrow-btn { transform: scale(1); }

        .p-meta {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 16px 18px 18px;
          gap: 12px;
        }
        .p-meta-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .p-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #f0f0f0;
          letter-spacing: -0.01em;
        }
        .p-cat {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.36);
          font-weight: 400;
        }
        .p-year {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.28);
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
          font-weight: 500;
          padding-top: 3px;
        }

        /* ── Empty state ── */
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 0;
          color: rgba(255,255,255,0.25);
          font-size: 0.9rem;
        }

        /* ── Responsive ── */
        @media (max-width: 720px) {
          .projects-root { padding: 100px 24px 80px; }
          .projects-grid { grid-template-columns: 1fr; gap: 20px; }
          .projects-grid > *:nth-child(even) { margin-top: 0; }
          .filter-row { justify-content: flex-start; }
        }
      `}</style>

      <div className="projects-root">
        <div className="projects-inner">

          {/* ── Header ─────────────────────────────────────── */}
          <div ref={headerRef}>
            <motion.div className="projects-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8Z" fill="#a3e635"/>
              </svg>
              My Work
            </motion.div>

            <motion.h1 className="projects-heading"
              initial={{ opacity: 0, y: 28 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              Creating next level digital products
            </motion.h1>
          </div>

          {/* ── Filter tabs ────────────────────────────────── */}
          <motion.div className="filter-row"
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn${active === f ? " active" : ""}`}
                onClick={() => setActive(f)}
              >
                <AnimatePresence>
                  {active === f && (
                    <motion.span
                      key="pill"
                      className="filter-pill-bg"
                      layoutId="filter-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
                <span>{f}</span>
              </button>
            ))}
          </motion.div>

          {/* ── Grid ───────────────────────────────────────── */}
          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))
              ) : (
                <motion.div
                  key="empty"
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  No projects in this category yet.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </>
  );
}