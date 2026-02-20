"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Rotating circular text badge  (ReactBits-style pure-React)
───────────────────────────────────────────────────────────── */
function RotatingBadge({ text = "LETS TALK • LETS TALK • LETS TALK • LETS TALK •", radius = 52 }) {
  const chars = text.split("");
  const angleStep = 360 / chars.length;

  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: "-28px",
        right: "-18px",
        width: radius * 2 + 16,
        height: radius * 2 + 16,
        cursor: "pointer",
        zIndex: 10,
      }}
      whileHover={{ scale: 1.08 }}
    >
      {/* Spinning text ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={radius * 2 + 16}
          height={radius * 2 + 16}
          viewBox={`0 0 ${radius * 2 + 16} ${radius * 2 + 16}`}
          style={{ position: "absolute" }}
        >
          <defs>
            <path
              id="circlePath"
              d={`
                M ${radius + 8}, ${radius + 8}
                m -${radius}, 0
                a ${radius},${radius} 0 1,1 ${radius * 2},0
                a ${radius},${radius} 0 1,1 -${radius * 2},0
              `}
            />
          </defs>
          <text
            fill="#fff"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="2.2"
            fontFamily="'DM Sans', sans-serif"
            style={{ textTransform: "uppercase" }}
          >
            <textPath href="#circlePath">{text}</textPath>
          </text>
        </svg>
      </motion.div>

      {/* Centre arrow button */}
      <motion.div
        whileHover={{ scale: 1.15, backgroundColor: "#a3e635" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          border: "1.5px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 14L14 4M14 4H6M14 4V12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated word — each word slides up from below
───────────────────────────────────────────────────────────── */
function AnimatedHeading({ children, delay = 0, accent = false }) {
  return (
    <motion.span
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "inline-block",
        color: accent ? "var(--highlight)" : "var(--fg)",
        willChange: "transform",
      }}
    >
      {children}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Noise-grain overlay canvas
───────────────────────────────────────────────────────────── */
function NoiseOverlay() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    const imageData = ctx.createImageData(w, h);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 18;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "overlay",
        opacity: 0.6,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Hero Component
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero {
          position: relative;
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          align-items: center;
          overflow: hidden;
          font-family: var(--font-sans);
        }

        /* Subtle radial glow top-right */
        .hero::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 55vw;
          height: 55vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          // max-width: 1200px;
          margin: 0 auto;
          padding: 120px 48px 80px 0px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* ── Image column ── */
        .hero-image-col {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .hero-img-wrapper {
          position: relative;
          width: 340px;
          height: 400px;
        }
        .hero-img-bg {
          position: absolute;
          inset: 0;
          border-radius: 50% 50% 46% 46% / 50% 50% 44% 44%;
          background: linear-gradient(160deg, #1a1a1e 0%, #111113 100%);
          border: 1.5px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .hero-img-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          filter: grayscale(12%) contrast(1.05);
        }

        /* soft vignette at bottom of photo */
        .hero-img-bg::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 38%;
          background: linear-gradient(to top, var(--bg) 0%, transparent 100%);
        }

        /* ── Text column ── */
        .hero-text-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a3e635;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .hero-heading {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 4.5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          overflow: hidden;
          color: var(--fg);
        }
        .hero-heading-line {
          overflow: hidden;
          display: block;
        }

        .hero-body {
          font-size: 0.975rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 420px;
          font-weight: 400;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .btn-resume {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: var(--accent);
          color: var(--fg);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: border-color 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s;
          text-decoration: none;
        }
        .btn-resume:hover {
          border-color: var(--highlight);
          background: rgba(163,230,53,0.08);
          color: var(--highlight);
          box-shadow: 0 0 24px rgba(163,230,53,0.15);
        }

        .hero-stats {
          display: flex;
          gap: 36px;
        }
        .stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .stat-number {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--fg);
          letter-spacing: -0.03em;
        }
        .stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── Scroll indicator ── */
        .scroll-hint {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 5;
        }
        .scroll-hint span {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          font-family: 'DM Sans', sans-serif;
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
          animation: scroll-drop 1.6s ease-in-out infinite;
        }
        @keyframes scroll-drop {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          80% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .hero-inner {
            grid-template-columns: 1fr;
            padding: 100px 28px 80px;
            gap: 40px;
            text-align: center;
          }
          .hero-image-col { justify-content: center; order: -1; }
          .hero-img-wrapper { width: 260px; height: 310px; }
          .hero-eyebrow { justify-content: center; }
          .hero-body { margin: 0 auto; }
          .hero-actions { justify-content: center; }
          .hero-stats { justify-content: center; }
        }
        @media (max-width: 480px) {
          .hero-heading { font-size: 2.2rem; }
          .hero-img-wrapper { width: 220px; height: 270px; }
        }
      `}</style>

      <section className="hero">
        <NoiseOverlay />

        <div className="hero-inner">
          {/* ── Left: Photo ── */}
          <motion.div
            className="hero-image-col"
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="hero-img-wrapper">
              <div className="hero-img-bg">
                {/* Replace src with your actual image path */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85"
                  alt="Developer portrait"
                />
              </div>

              {/* Rotating badge */}
              <RotatingBadge text="LETS TALK • LETS TALK • LETS TALK • " radius={50} />

              {/* Floating accent chip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "14%",
                  right: "-30px",
                  background: "rgba(20,20,22,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span style={{ fontSize: "1rem" }}>✦</span>
                <span style={{ color: "var(--fg)", fontSize: "0.78rem", fontWeight: 600, whiteSpace: "nowrap", fontFamily: "var(--font-display)" }}>
                  Available for work
                </span>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#a3e635", flexShrink: 0, boxShadow: "0 0 8px #a3e635" }} />
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: Text ── */}
          <div className="hero-text-col">
            {/* Eyebrow */}
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="hero-eyebrow-dot" />
              Creative developer & designer
            </motion.div>

            {/* Heading */}
            <h1 className="hero-heading">
              <span className="hero-heading-line">
                <AnimatedHeading delay={0.4}>A </AnimatedHeading>
                <AnimatedHeading delay={0.5} accent>creative developer</AnimatedHeading>
              </span>
              <span className="hero-heading-line" style={{ marginTop: "4px" }}>
                <AnimatedHeading delay={0.62}>&amp; digital designer</AnimatedHeading>
              </span>
            </h1>

            {/* Body copy */}
            <motion.p
              className="hero-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.78, ease: "easeOut" }}
            >
              I collaborate with brands globally to design impactful, mission-focused
              websites that drive results and achieve business goals.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.92, ease: "easeOut" }}
            >
              <motion.a
                href="#"
                className="btn-resume"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                My Resume
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>

              <motion.a
                href="#projects"
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "color 0.2s",
                }}
                whileHover={{ color: "rgba(255,255,255,0.85)" }}
              >
                View Work
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.08, ease: "easeOut" }}
            >
              {[
                { n: "3+", label: "Years Exp." },
                { n: "40+", label: "Projects" },
                { n: "20+", label: "Clients" },
              ].map(({ n, label }) => (
                <div key={label} className="stat">
                  <span className="stat-number">{n}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
}