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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-root {
          background: #0e0e10;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          padding-top: 110px;
        }

        /* ── Eyebrow ── */
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a3e635;
          margin-bottom: 18px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ══ CONTACT SECTION ══════════════════════════════════ */
        .contact-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 48px 100px;
        }

        .contact-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          font-weight: 800;
          color: #f0f0f0;
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin-bottom: 48px;
          max-width: 580px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }

        /* ── Form ── */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .field-label {
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.01em;
        }
        .field-input,
        .field-textarea {
          width: 100%;
          background: #141416;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #f0f0f0;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          resize: none;
        }
        .field-input::placeholder,
        .field-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .field-input.focused,
        .field-textarea.focused {
          border-color: rgba(163,230,53,0.5);
          box-shadow: 0 0 0 3px rgba(163,230,53,0.08);
        }
        .field-textarea { min-height: 140px; line-height: 1.65; }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 30px;
          border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: transparent;
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          width: fit-content;
          transition: border-color 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .submit-btn:hover {
          border-color: #a3e635;
          background: rgba(163,230,53,0.08);
          color: #a3e635;
          box-shadow: 0 0 24px rgba(163,230,53,0.15);
        }
        .sent-msg {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: #a3e635;
          font-weight: 600;
        }

        /* ── Profile card ── */
        .profile-card {
          background: #141416;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: sticky;
          top: 100px;
        }
        .profile-avail {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(163,230,53,0.1);
          border: 1px solid rgba(163,230,53,0.2);
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #a3e635;
          width: fit-content;
        }
        .avail-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a3e635;
          box-shadow: 0 0 6px #a3e635;
          animation: pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

        .profile-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.1);
          background: #222;
          flex-shrink: 0;
        }
        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .profile-bio {
          font-size: 0.855rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.72;
        }
        .profile-socials {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .psocial-btn {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .psocial-btn:hover {
          color: #f0f0f0;
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
        }

        /* ══ FAQ SECTION ══════════════════════════════════════ */
        .faq-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px 120px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 72px;
          align-items: start;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 80px;
        }

        .faq-left {
          position: sticky;
          top: 120px;
        }
        .faq-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 4vw, 3.6rem);
          font-weight: 800;
          color: #f0f0f0;
          line-height: 1.08;
          letter-spacing: -0.04em;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: background 0.2s;
          border-radius: 12px;
          padding: 4px 0;
        }
        .faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.07); }
        .faq-item:hover { background: rgba(255,255,255,0.02); }
        .faq-open { background: rgba(255,255,255,0.02); }

        .faq-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px;
          gap: 16px;
        }
        .faq-q-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
        }
        .faq-num {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255,255,255,0.25);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.06em;
          flex-shrink: 0;
          width: 24px;
        }
        .faq-q {
          font-size: 0.92rem;
          font-weight: 600;
          color: rgba(255,255,255,0.78);
          line-height: 1.4;
        }
        .faq-open .faq-q { color: #f0f0f0; }
        .faq-chevron {
          color: rgba(255,255,255,0.3);
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .faq-open .faq-chevron { color: #a3e635; }
        .faq-a {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.42);
          line-height: 1.75;
          padding: 0 16px 18px 54px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .contact-grid  { grid-template-columns: 1fr; }
          .faq-section   { grid-template-columns: 1fr; gap: 40px; }
          .faq-left      { position: static; }
          .profile-card  { position: static; }
          .contact-section,
          .faq-section   { padding-left: 28px; padding-right: 28px; }
        }
        @media (max-width: 540px) {
          .contact-heading { font-size: 2.2rem; }
          .faq-heading     { font-size: 2.4rem; }
        }
      `}</style>

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