"use client";
import { motion } from "framer-motion";

export default function Home() {
  const hero = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  const heroItem = {
    hidden: { x: -12, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div>
      <motion.section className="hero" initial="hidden" animate="show" variants={hero}>
        <div className="container hero-inner">
          <div className="hero-left">
            <motion.div variants={heroItem}>
              <div className="spaced section-title">Websites</div>
              <h1 className="hero-title">
                Crafting <span className="text-highlight-primary">purpose driven</span>
                <br />
                experiences <span className="text-highlight-primary">that inspire</span>
                <br />
                &amp; engage.
              </h1>
              <div style={{ height: 28 }} />
              <hr style={{ border: 'none', borderTop: '1px solid rgba(16, 24, 40, 0.06)', margin: '28px 0', width: '60%' }} />
              <div style={{ marginTop: 36 }}>
                <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                    <a href="https://www.linkedin.com/in/devraj-chatribin/">LINKEDIN ↗</a>
                    <a href="https://github.com/DevrajDC">GITHUB ↗</a>
                    <a href="https://www.instagram.com/devraj_uiux/">INSTAGRAM ↗</a>
                    <a href="mailto:devrajchatribin9978@gmail.com">GMAIL ↗</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="hero-right">
            <motion.div variants={heroItem}>
              <p className="hero-sub">
                I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.
              </p>
              <div style={{ height: 26 }} />
              <a className="cta" href="/about" style={{ alignSelf: 'flex-end' }}>Know me better</a>
            </motion.div>
            <motion.div aria-hidden="true" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.14 }}>
              <img src="/images/hero.avif" alt="hero" style={{ maxWidth: 260, borderRadius: 12, marginTop: 6 }} />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="container" style={{ paddingTop: 40 }}>
        <div className="section-title">Selected Projects</div>
        <div className="projects-grid">
          <motion.a className="project" href="https://devrajchatribin.com/projects/aora">
            <h3>Aora — Development 2024</h3>
            <p className="muted">Development & Design</p>
          </motion.a>
          <motion.a className="project" href="https://devrajchatribin.com/projects/code-screenshot">
            <h3>Code Screenshot — Development</h3>
            <p className="muted">Development & Design</p>
          </motion.a>
          <motion.a className="project" href="https://devrajchatribin.com/projects/iphone">
            <h3>iPhone 15 Pro — Design</h3>
            <p className="muted">Development & Design</p>
          </motion.a>
        </div>

        <div style={{ marginTop: 42 }}>
          <div className="section-title">Areas of expertise</div>
          <div className="expertise-grid" style={{ marginTop: 12 }}>
            <motion.div className="card">
              <h3>Development</h3>
              <p className="muted">React, Next.js, Node</p>
            </motion.div>
            <motion.div className="card">
              <h3>UI/UX Design</h3>
              <p className="muted">Figma, Prototyping</p>
            </motion.div>
            <motion.div className="card">
              <h3>Branding</h3>
              <p className="muted">Identity & Strategy</p>
            </motion.div>
            <motion.div className="card">
              <h3>Animations</h3>
              <p className="muted">GSAP, Framer Motion</p>
            </motion.div>
          </div>
        </div>

        <div style={{ marginTop: 42 }}>
          <div className="section-title">What others say</div>
          <div className="testimonials">
            <motion.div className="testimonial">
              <img src="/testimonials/vritika.webp" alt="Vritika" style={{ width: 48, height: 48, borderRadius: 8, marginBottom: 8 }} />
              <strong>Vritika Naik</strong>
              <p className="muted">Regional Head @GirlScript — "Devraj's work ethics are immaculate..."</p>
            </motion.div>
            <motion.div className="testimonial">
              <img src="/testimonials/amrit.webp" alt="Amrit" style={{ width: 48, height: 48, borderRadius: 8, marginBottom: 8 }} />
              <strong>Amrit Raj</strong>
              <p className="muted">Senior Developer @Ignite Solutions — "Exceptional UI/UX skills..."</p>
            </motion.div>
            <motion.div className="testimonial">
              <img src="/testimonials/divya.webp" alt="Divya" style={{ width: 48, height: 48, borderRadius: 8, marginBottom: 8 }} />
              <strong>Divya Walia</strong>
              <p className="muted">Senior Java Developer @Nagarro — "Highly recommend Devraj..."</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
