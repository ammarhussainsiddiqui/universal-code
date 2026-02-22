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
          <h2 className="work-section-heading">Where I've worked</h2>
          <p className="work-section-desc">A concise timeline of roles and responsibilities across my career.</p>
        </motion.div>

        <div className="work-timeline">
          {JOBS.map((j, i) => (
            <motion.div key={j.company} className="work-entry" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.08 }}>
              <div className="work-entry-meta">
                <div className="work-company-name">{j.company}</div>
                <div className="work-period">{j.period}</div>
              </div>

              <div className="work-entry-content">
                <div className="work-job-card">
                  <div className="work-job-header">
                    <div className="work-job-title">{j.role}</div>
                  </div>
                  <p className="work-job-desc">{j.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
