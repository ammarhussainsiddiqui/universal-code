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
          <motion.div className="projects-page-grid" layout>
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