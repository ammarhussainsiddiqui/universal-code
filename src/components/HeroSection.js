"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * HERO SECTION (Stripe-ish grid + noise + badge)
 * - Next.js App Router client component
 * - Tailwind required
 * - Pure JS (works in HeroSection.js)
 */

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function AnimatedHeading({ children, delay = 0, accent = false }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={accent ? "text-yellow-400" : ""}
    >
      {children}
    </motion.span>
  );
}

function RotatingBadge({ text, radius = 55 }) {
  const size = radius * 2 + 28;
  const cx = size / 2;
  const cy = size / 2;

  // React 18+ has useId; safe in Next client component
  const id = React.useId();

  return (
    <motion.div
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
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
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.08)"
        />

        <text
          fill="rgba(255,255,255,0.65)"
          fontSize="10"
          fontWeight="600"
          letterSpacing="2"
        >
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
          <span className="text-xs">↗</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0f] text-white">
      {/* Subtle Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0
        bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:80px_80px]"
      />

      {/* Stripe-like soft glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute top-[-30%] right-[-10%] h-[600px] w-[600px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-35%] left-[30%] h-[520px] w-[520px] rounded-full bg-lime-400/10 blur-3xl" />
      </div>

      <NoiseOverlay />

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex min-h-screen items-center py-24">
          {/* Grid Layout */}
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            {/* Left Side – Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="relative w-[280px] sm:w-[340px] lg:w-[420px]">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85&auto=format&fit=crop"
                    alt="Developer portrait"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="absolute -bottom-10 -right-10">
                  <RotatingBadge
                    text="LETS TALK • LETS TALK • LETS TALK • "
                    radius={55}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-6 -right-8 flex items-center gap-2 rounded-xl border border-white/10 bg-[#141416]/90 px-4 py-2 backdrop-blur-xl"
                >
                  <span className="text-[12px] leading-none">✦</span>
                  <span className="whitespace-nowrap text-xs font-semibold">
                    Available for work
                  </span>
                  <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side – Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 text-sm text-white/60"
              >
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                Creative developer & designer
              </motion.div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">
                  <AnimatedHeading delay={0.4}>A</AnimatedHeading>{" "}
                  <AnimatedHeading delay={0.5} accent>
                    creative developer
                  </AnimatedHeading>
                </span>
                <span className="mt-2 block">
                  <AnimatedHeading delay={0.6}>& digital designer</AnimatedHeading>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-lg leading-relaxed text-white/60"
              >
                I collaborate with brands globally to design impactful,
                mission-focused websites that drive results and achieve business goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-6"
              >
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
                >
                  My Resume
                </motion.a>

                <a
                  href="#projects"
                  className="text-sm text-white/50 transition hover:text-white"
                >
                  View Work →
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-10 pt-6"
              >
                {[
                  { n: "3+", label: "Years Exp." },
                  { n: "40+", label: "Projects" },
                  { n: "20+", label: "Clients" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-2xl font-semibold">{item.n}</div>
                    <div className="text-sm text-white/50">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}