"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Process steps data ──────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding the client's goals, target audience, and project requirements to lay a solid foundation.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Wireframe",
    desc: "After hashing out the details of the website, it's easy to throw the ideas into pen & paper.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Design",
    desc: "The most fun part of all — adding pizzaz to the wireframes and bring it to life.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Development",
    desc: "The design may be final but it needs to be functional and practical. Development is key.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Quality Assurance",
    desc: "Website load times, SEO, file optimization, etc., weigh in to the quality of the site.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

/* ── Awards data ─────────────────────────────────────────── */
const AWARDS = [
  { title: "Star Performer of the Year",   date: "MAY 2021" },
  { title: "Best Beginner Hack",           date: "APR 2021" },
  { title: "Sketch Webpage Contest Winner",date: "NOV 2020" },
  { title: "Best Space App Winner",        date: "SEP 2021" },
  { title: "UI/UX Excellence Award",       date: "JAN 2022" },
];

/* ── Star eyebrow label ──────────────────────────────────── */
function Eyebrow({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      fontSize: "0.72rem", fontWeight: 700,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: "#a3e635", marginBottom: 16,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8Z" fill="#a3e635"/>
      </svg>
      {children}
    </div>
  );
}

/* ── Single process card ─────────────────────────────────── */
function StepCard({ num, title, desc, icon, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="step-card"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, borderColor: "rgba(163,230,53,0.2)" }}
    >
      <div className="step-icon-wrap">{icon}</div>
      <div className="step-num">{num}.</div>
      <h3 className="step-title">{title}</h3>
      <p className="step-desc">{desc}</p>
    </motion.div>
  );
}

/* ── Single award row ────────────────────────────────────── */
function AwardRow({ title, date, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="award-row"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 5 }}
    >
      <span className="award-title">{title}</span>
      <div className="award-line" />
      <span className="award-date">{date}</span>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export default function ProcessAndAwards() {
  const processRef  = useRef(null);
  const awardsRef   = useRef(null);
  const processInView = useInView(processRef,  { once: true, margin: "-80px" });
  const awardsInView  = useInView(awardsRef,   { once: true, margin: "-80px" });

  return (
    <>
      <div className="section-root">

        {/* ══ Design Process ══════════════════════════════════ */}
        <div className="process-section" ref={processRef}>
          <div className="process-header">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow>Steps I Follow</Eyebrow>
            </motion.div>

            <motion.h2
              className="process-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              My Design Process
            </motion.h2>

            <motion.p
              className="process-desc"
              initial={{ opacity: 0, y: 16 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              I have worked with some of the most innovative industry leaders to
              help build their top-notch products.
            </motion.p>
          </div>

          <div className="steps-track">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} {...step} index={i} />
            ))}
          </div>
        </div>

        {/* ══ Awards & Recognition ═════════════════════════════ */}
        <div className="awards-section" ref={awardsRef}>

          {/* Left label */}
          <div className="awards-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <Eyebrow>Awards</Eyebrow>
            </motion.div>

            <motion.h2
              className="awards-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Awards &amp;&nbsp;Recognition
            </motion.h2>
          </div>

          {/* Right — award rows */}
          <div className="awards-list">
            {AWARDS.map((award, i) => (
              <AwardRow key={award.title} {...award} index={i} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}