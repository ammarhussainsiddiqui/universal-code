"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "./HeroSection.css";

/* ── Animated heading word ───────────────────────── */
function AnimatedHeading({ children, delay = 0, accent = false }) {
  return (
    <motion.span
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={accent ? "hs-accent" : ""}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}

/* ── Rotating Badge ───────────────────────── */
function RotatingBadge({ text = "LETS TALK • LETS TALK • LETS TALK • ", radius = 56 }) {
  const size = radius * 2 + 32;
  const cx = size / 2;
  const cy = size / 2;
  const id = React.useId();

  return (
    <motion.div
      className="hs-badge"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <path
            id={id}
            d={`M ${cx}, ${cy} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${
              radius * 2
            },0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>

        <circle
          cx={cx}
          cy={cy}
          r={radius + 6}
          fill="transparent"
          stroke="rgba(16,24,40,0.1)"
        />

        <text fontSize="10" fontWeight="700" letterSpacing="2" fill="currentColor">
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      <div className="hs-badgeCenter">
        <div className="hs-badgeCenterInner">↗</div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="hs-root">
      <div className="hs-container">
        <div className="hs-layout">

          {/* LEFT IMAGE */}
          <motion.div
            className="hs-left"
            initial={{ opacity: 0, x: -34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hs-photoWrap">
              <div className="hs-photoCard">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&auto=format&fit=crop"
                  alt="Portrait"
                  className="hs-photo"
                />
              </div>

              <div className="hs-status">
                <span className="hs-statusStar">✦</span>
                <span className="hs-statusText">Available for work</span>
                <span className="hs-statusDot" />
              </div>

              <div className="hs-badgePos">
                <RotatingBadge />
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="hs-right">

            <div className="hs-eyebrow">
              <span className="hs-eyebrowDot" />
              Creative developer & designer
            </div>

            <h1 className="hs-title">
              <span className="hs-titleLine">
                <AnimatedHeading delay={0.3}>A</AnimatedHeading>{" "}
                <AnimatedHeading delay={0.38} accent>
                  creative developer
                </AnimatedHeading>
              </span>
              <span className="hs-titleLine hs-titleGap">
                <AnimatedHeading delay={0.46}>
                  & digital designer
                </AnimatedHeading>
              </span>
            </h1>

            <p className="hs-sub">
              I collaborate with brands globally to design clean,
              high-performing websites that improve clarity and conversion.
            </p>

            <div className="hs-actions">
              <motion.a
                href="#"
                className="hs-btnPrimary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                My Resume
              </motion.a>

              <Link className="hs-link" href="#projects">
                View Work →
              </Link>
            </div>

            <div className="hs-stats">
              {[
                { n: "3+", label: "Years Exp." },
                { n: "40+", label: "Projects" },
                { n: "20+", label: "Clients" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="hs-statNum">{s.n}</div>
                  <div className="hs-statLbl">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}