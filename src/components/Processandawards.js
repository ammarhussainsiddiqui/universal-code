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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ══ Shared ══════════════════════════════════════════ */
        .section-root {
          background: #0e0e10;
          font-family: 'DM Sans', sans-serif;
        }

        /* ══ Process ═════════════════════════════════════════ */
        .process-section {
          padding: 100px 48px 80px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .process-header {
          margin-bottom: 52px;
        }
        .process-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #f0f0f0;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 14px;
        }
        .process-desc {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.38);
          max-width: 480px;
          line-height: 1.7;
        }

        /* Horizontal scroll cards row */
        .steps-track {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .step-card {
          background: #141416;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 28px 22px 30px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          cursor: default;
          transition: border-color 0.3s ease, transform 0.3s ease;
          will-change: transform;
        }
        .step-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          flex-shrink: 0;
        }
        .step-num {
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.06em;
        }
        .step-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #a3e635;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .step-desc {
          font-size: 0.845rem;
          color: rgba(255,255,255,0.42);
          line-height: 1.7;
          font-weight: 400;
        }

        /* ══ Awards ══════════════════════════════════════════ */
        .awards-section {
          padding: 80px 48px 100px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 80px;
          align-items: start;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .awards-left {
          position: sticky;
          top: 120px;
        }
        .awards-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 4vw, 3.8rem);
          font-weight: 800;
          color: #f0f0f0;
          line-height: 1.08;
          letter-spacing: -0.035em;
        }

        .awards-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 4px;
        }
        .award-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          cursor: default;
          transition: padding-left 0.2s ease;
        }
        .award-row:first-child {
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .award-title {
          font-size: 0.975rem;
          font-weight: 600;
          color: #f0f0f0;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .award-line {
          flex: 1;
          height: 1px;
          background: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.1) 0px,
            rgba(255,255,255,0.1) 4px,
            transparent 4px,
            transparent 10px
          );
          min-width: 40px;
        }
        .award-date {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
          white-space: nowrap;
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
        }

        /* ══ Responsive ══════════════════════════════════════ */
        @media (max-width: 1100px) {
          .steps-track {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 860px) {
          .awards-section {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .awards-left { position: static; }
          .process-section,
          .awards-section { padding-left: 28px; padding-right: 28px; }
        }
        @media (max-width: 640px) {
          .steps-track {
            grid-template-columns: repeat(2, 1fr);
          }
          .award-title { white-space: normal; }
        }
        @media (max-width: 420px) {
          .steps-track { grid-template-columns: 1fr; }
          .award-line  { display: none; }
          .award-date  { margin-left: auto; }
        }
      `}</style>

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