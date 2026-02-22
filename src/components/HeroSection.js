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
     <section className="relative overflow-hidden bg-[#0c0c0f] text-white">

  {/* Subtle Grid Background */}
  <div
    className="
      pointer-events-none absolute inset-0 z-0
      bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),
           linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]
      bg-[size:80px_80px]
    "
  />

  <NoiseOverlay />

  {/* Container */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

    <div className="min-h-screen flex items-center py-24">

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* ───────────────────────────── */}
        {/* Left Side – Image */}
        {/* ───────────────────────────── */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative flex justify-center lg:justify-start"
        >
          <div className="relative w-[280px] sm:w-[340px] lg:w-[420px]">

            {/* Image */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85"
                alt="Developer portrait"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rotating Badge */}
            <div className="absolute -bottom-10 -right-10">
              <RotatingBadge
                text="LETS TALK • LETS TALK • LETS TALK • "
                radius={55}
              />
            </div>

            {/* Floating Status Chip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="
                absolute top-6 -right-8
                bg-[#141416]/90
                border border-white/10
                rounded-xl
                px-4 py-2
                flex items-center gap-2
                backdrop-blur-xl
              "
            >
              <span>✦</span>
              <span className="text-xs font-semibold whitespace-nowrap">
                Available for work
              </span>
              <span className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
            </motion.div>

          </div>
        </motion.div>


        {/* ───────────────────────────── */}
        {/* Right Side – Content */}
        {/* ───────────────────────────── */}

        <div className="space-y-8">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 text-sm text-white/60"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            Creative developer & designer
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            <span className="block">
              <AnimatedHeading delay={0.4}>A</AnimatedHeading>{" "}
              <AnimatedHeading delay={0.5} accent>
                creative developer
              </AnimatedHeading>
            </span>
            <span className="block mt-2">
              <AnimatedHeading delay={0.6}>
                & digital designer
              </AnimatedHeading>
            </span>
          </h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-white/60 max-w-lg leading-relaxed"
          >
            I collaborate with brands globally to design impactful,
            mission-focused websites that drive results and achieve
            business goals.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-6"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                bg-white text-black
                px-6 py-3
                rounded-full
                text-sm font-semibold
                flex items-center gap-2
                hover:bg-yellow-400
                transition
              "
            >
              My Resume
            </motion.a>

            <a
              href="#projects"
              className="text-sm text-white/50 hover:text-white transition"
            >
              View Work →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
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
    </>
  );
}