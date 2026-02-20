"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

const JOBS = [
  { company: "Acme Co.", role: "Senior Frontend Engineer", period: "2023 — Present", desc: "Leading frontend initiatives, building design systems and performant React apps." },
  { company: "PixelWorks", role: "UI/UX Designer", period: "2021 — 2023", desc: "Designed product interfaces and collaborated closely with engineering to ship accessible experiences." },
  { company: "Startly", role: "Frontend Developer", period: "2019 — 2021", desc: "Implemented responsive web apps and helped establish testing and CI workflows." },
];

export default function WorkHistory() {
  return (
    <section className="work-history section stacked">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
          <span className="section-title">Work History</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,2.6vw,2.4rem)", marginBottom: 8, color: "var(--fg)" }}>Where I've worked</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>A concise timeline of roles and responsibilities across my career.</p>
        </motion.div>

        <div className="work-timeline" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
          {JOBS.map((j, i) => (
            <motion.div key={j.company} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.08 }} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ minWidth: 112, textAlign: "right", color: "var(--muted)", fontSize: "0.9rem", fontWeight: 600 }}>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--fg)", fontWeight: 700 }}>{j.company}</div>
                <div style={{ marginTop: 6 }}>{j.period}</div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ background: "var(--accent)", padding: 18, borderRadius: 12, border: "1px solid rgba(16,24,40,0.04)", boxShadow: "0 8px 22px rgba(16,24,40,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--fg)" }}>{j.role}</div>
                  </div>
                  <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.7 }}>{j.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
