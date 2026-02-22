"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Feature cards ───────────────────────────────────────── */
const FEATURES = [
  {
    title: "Mentoring",
    desc: "Get connected with a mentor that will help you pave your career path.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    title: "Opportunities",
    desc: "Get Internships and Job opportunities and gain experience while you learn.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    title: "Free Resources",
    desc: "Get Free resources related to Designing and Development from the community.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    title: "Help & Reviews",
    desc: "Get your portfolio and projects reviewed by Industry experts and mentors.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
];

/* ── Stats ───────────────────────────────────────────────── */
const STATS = [
  { value: "5k+", label: "Community Members" },
  { value: "25+", label: "Events conducted"  },
  { value: "4",   label: "Years"             },
];

/* ── Main export ─────────────────────────────────────────── */
export default function CommunitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <section className="community-root" ref={ref}>
        <div className="community-inner">

          {/* ── Left: 2×2 feature cards ───────────────────── */}
          <div className="cards-grid">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="feat-card"
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="feat-icon">{feat.icon}</div>
                <div className="feat-title">{feat.title}</div>
                <div className="feat-desc">{feat.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* ── Right: copy + stats + CTA ─────────────────── */}
          <div className="community-right">

            {/* Eyebrow */}
            <motion.div
              className="comm-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8Z" fill="#a3e635"/>
              </svg>
              <span className="accent">Community</span>&nbsp;Work
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="comm-heading"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Building a Tech<br />Community
            </motion.h2>

            {/* Body copy */}
            <motion.p
              className="comm-body"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.38, ease: "easeOut" }}
            >
              I founded Design &amp; Code which is a global community with a mission to
              connect designers and developers to create a happy community eager to learn,
              innovate and grow together. We welcome all designers and developers: beginners,
              intermediates, and experts willing to learn together. We encourage sharing
              resources and learning experiences, organizing events, and providing feedback
              for our members to grow as they learn.
            </motion.p>

            {/* Stats */}
            <div className="stats-row">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="stat-val">{s.value}</span>
                  <span className="stat-lbl">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#"
              className="comm-btn"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.88, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Join Community
            </motion.a>

          </div>
        </div>
      </section>
    </>
  );
}