"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── FAQ data ────────────────────────────────────────────── */
const FAQS = [
  {
    q: "What is your current role?",
    a: "I'm currently working as a Software Engineer at OneShield Software while also running Design & Code — a global community for designers and developers.",
  },
  {
    q: "How much does it cost for a high performing website?",
    a: "It will depend upon the scope and requirements of the project. In a meeting, we will seek to identify specifics and objectives like number of pages, specific features, timeline, etc. All these will contribute to the cost and will vary from project to project.",
  },
  {
    q: "How long will the work take from start to finish?",
    a: "Project timelines vary based on complexity. A simple landing page may take 1–2 weeks, while a full web application can take 4–8 weeks. We'll define a clear timeline during our initial discussion.",
  },
  {
    q: "Are you available to join as full time?",
    a: "I'm currently open to the right full-time opportunities. Feel free to reach out and we can discuss further based on the role, team, and vision.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely! I collaborate with brands and individuals globally. Remote work is my default — timezone differences are easily managed with clear communication.",
  },
];

/* ── Socials ─────────────────────────────────────────────── */
const SOCIALS = [
  { label: "LinkedIn",  href: "https://linkedin.com/in/devraj-chatribin/",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "GitHub",    href: "https://github.com/DevrajDC",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { label: "Instagram", href: "https://instagram.com/devraj_uiux/",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { label: "Email",     href: "mailto:hello@devrajchatribin.com",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { label: "Twitter",   href: "#",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
];

/* ── FAQ Item ─────────────────────────────────────────────── */
function FaqItem({ num, q, a, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`faq-item ${open ? "faq-open" : ""}`}
      onClick={() => setOpen(v => !v)}
    >
      <div className="faq-header">
        <div className="faq-q-wrap">
          <span className="faq-num">{String(num).padStart(2, "0")}.</span>
          <span className="faq-q">{q}</span>
        </div>
        <motion.span
          className="faq-chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="faq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function ContactPage() {
  const formRef  = useRef(null);
  const faqRef   = useRef(null);
  const formInView = useInView(formRef,  { once: true, margin: "-60px" });
  const faqInView  = useInView(faqRef,   { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="contact-root">

        {/* ══ Contact form ════════════════════════════════════ */}
        <section className="contact-section" ref={formRef}>

          <motion.div className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8Z" fill="#a3e635"/>
            </svg>
            Connect With Me
          </motion.div>

          <motion.h1 className="contact-heading"
            initial={{ opacity: 0, y: 28 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            Let's start a project together
          </motion.h1>

          <div className="contact-grid">

            {/* Form */}
            <motion.form className="contact-form" onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.22, ease: "easeOut" }}>

              {[
                { id: "name",    label: "Full Name", type: "text",  placeholder: "John Doe" },
                { id: "email",   label: "Email",     type: "email", placeholder: "john@example.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div className="field-group" key={id}>
                  <label className="field-label" htmlFor={id}>{label}</label>
                  <input
                    id={id}
                    type={type}
                    className={`field-input${focused === id ? " focused" : ""}`}
                    placeholder={placeholder}
                    value={form[id]}
                    onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
              ))}

              <div className="field-group">
                <label className="field-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className={`field-textarea${focused === "message" ? " focused" : ""}`}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  required
                />
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="sent" className="sent-msg"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Message sent! I'll get back to you soon.
                  </motion.div>
                ) : (
                  <motion.button key="btn" type="submit" className="submit-btn"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    Submit
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.form>

            {/* Profile card */}
            <motion.div className="profile-card"
              initial={{ opacity: 0, x: 28 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}>

              <div className="profile-avail">
                <span className="avail-dot" />
                Available for work
              </div>

              <div className="profile-avatar">
                {/* Replace with your actual photo */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  alt="Devraj Chatribin"
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
              </div>

              <p className="profile-bio">
                My inbox is always open. Whether you have a project or just want to say Hi, I would love to hear from you. Feel free to contact me and I'll get back to you.
              </p>

              <div className="profile-socials">
                {SOCIALS.map(({ label, href, icon }) => (
                  <motion.a key={label} href={href} className="psocial-btn" aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.93 }}>
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ FAQ ══════════════════════════════════════════════ */}
        <section className="faq-section" ref={faqRef}>

          {/* Left label */}
          <div className="faq-left">
            <motion.div className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8Z" fill="#a3e635"/>
              </svg>
              FAQs
            </motion.div>

            <motion.h2 className="faq-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              Have<br />Questions?
            </motion.h2>
          </div>

          {/* FAQ list */}
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} num={i + 1} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}