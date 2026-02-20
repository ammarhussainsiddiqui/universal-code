"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useSpring, useTransform, useMotionValue, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import WorkHistory from "../components/WorkHistory";


const MARQUEE_ITEMS = ["Websites", "Designing", "Graphics", "Animations", "Community", "Development", "Mentor"];

const PROJECTS = [
  { title: "Aora",            cat: "Development",          year: "2024", bg: "#f5f0d8", img: "/projects/aora.webp" },
  { title: "Code Screenshot", cat: "Development & Design", year: "2024", bg: "#f8e0f0", img: "/projects/codescreenshot.webp" },
  { title: "iPhone 15 Pro",   cat: "Development & Design", year: "2024", bg: "#1a1a1a", img: "/projects/iphone.webp" },
  { title: "Ochi Design",     cat: "Development & Design", year: "2024", bg: "#d4f4d4", img: "/projects/ochidesign.webp" },
];

const EXPERTISE = [
  {
    id: "dev",
    label: "Development",
    icon: "</>",
    img: "/images/development.avif",
    desc: "Building performant, scalable web applications with modern frameworks and clean, maintainable code.",
  },
  {
    id: "design",
    label: "UI/UX Design",
    icon: "✦",
    img: "/images/designing.avif",
    desc: "Crafting intuitive, visually refined interfaces with a focus on accessibility and user delight.",
  },
  {
    id: "brand",
    label: "Branding",
    icon: "◈",
    img: "/images/branding.avif",
    desc: "Defining visual identities and design systems that communicate with clarity and personality.",
  },
];

const TECH = ["HTML","CSS","JavaScript","TypeScript","React.js","Next.js","Angular","Redux","Node.js","Express.js","MySQL","MongoDB","PostgreSQL","Cypress","Docker","Firebase","AWS","GSAP","Framer Motion","Figma","Tailwind CSS","GIT"];

const TESTIMONIALS = [
  { name: "Vritika Naik",   role: "Regional Head @GirlScript",              avatar: "/testimonials/vritika-naik.webp",   quote: "I am amazed at Devraj's ability to create intriguing designs. At GirlScript, Devraj not only worked with graphic designing but also designed the UI and contributed to the front end of the website. His work ethics are immaculate." },
  { name: "Hardik Kumar",   role: "Founder @INAXIA, @Hacking Heist",        avatar: "/testimonials/hardik-kumar.webp",   quote: "Devraj worked as a Website Designer at Hacking Heist 1.0 in our team. I was impressed by his consistent efforts in making the UI ready as soon as possible so that developers could start building it." },
  { name: "Amrit Raj",      role: "Senior Developer @Ignite Solutions",     avatar: "/testimonials/amrit-raj.webp",      quote: "I had the pleasure of collaborating with Devraj on a project where his exceptional UI/UX skills truly shone. Devraj's design proficiency is remarkable, consistently delivering top-notch work." },
  { name: "Divya Walia",    role: "Senior Java Developer @Nagarro",         avatar: "/testimonials/divya-walia.webp",    quote: "I am writing to highly recommend Devraj for any Java fullstack role. Devraj played a pivotal role in building the application and consistently demonstrated strong technical skills." },
  { name: "Praveen Kumar",  role: "Full Stack Developer | ReactJS | YouTuber",avatar:"/testimonials/praveen-science.webp",quote: "Devraj is not only a great designer but also a community guy. One of the best folks for development and design combined. We have worked on several projects together." },
];

const SOCIALS = [
  { label: "LinkedIn",   href: "https://linkedin.com/in/devraj-chatribin/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "GitHub",     href: "https://github.com/DevrajDC",               icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { label: "Instagram",  href: "https://instagram.com/devraj_uiux/",        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { label: "Gmail",      href: "mailto:hello@devrajchatribin.com",          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { label: "Twitter",    href: "#",                                          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function Eyebrow({ children, center = false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent: center?"center":"flex-start", gap:8, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--highlight)", marginBottom:16, fontFamily:"var(--font-sans)" }}>
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8Z" fill="#a3e635"/></svg>
      {children}
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero-section">
      <div className="container" style={{ paddingTop:160, paddingBottom:100 }}>
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5}} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:24,fontSize:"0.85rem",color:"var(--muted)",fontFamily:"var(--font-sans)" }}>
          <span>👋</span> Hey! It's me Devraj,
        </motion.div>

        <div className="hero-heading" style={{ overflow:"hidden" }}>
          {[
            { text:"Crafting ", delay:0.1 },
            { text:"purpose driven", delay:0.2, accent:true },
            { text:" experiences that inspire & engage.", delay:0.35 },
          ].map(({text,delay,accent},i)=>(
              <motion.span key={i} initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.85,delay,ease:[0.16,1,0.3,1]}}
              style={{ display:"inline", color: accent?"var(--highlight)":"var(--fg)" }}>
              {text}
            </motion.span>
          ))}
        </div>

        <div className="hero-bottom">
          <div className="hero-socials">
            {["LINKEDIN","GITHUB","INSTAGRAM","GMAIL"].map((s,i)=>(
              <motion.a key={s} href="#" className="hero-social-link" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.6+i*0.07}}>
                {s} <span>↗</span>
              </motion.a>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:16,alignItems:"flex-end" }}>
            <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.7}} className="hero-body">
              I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.
            </motion.p>
            <motion.a href="/about" className="btn-outline" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.82}}
              whileHover={{scale:1.04}} whileTap={{scale:0.97}}>
              Know me better
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE STRIP
═══════════════════════════════════════════════════════════════ */
function MarqueeStrip() {
  const doubled = [...MARQUEE_ITEMS,...MARQUEE_ITEMS,...MARQUEE_ITEMS];
  return (
    <div style={{ overflow:"hidden", borderTop:"1px solid rgba(0,0,0,0.06)", borderBottom:"1px solid rgba(0,0,0,0.06)", padding:"20px 0", background:"var(--bg)", position:"relative" }}>
      <div style={{ position:"absolute",left:0,top:0,bottom:0,width:80,background:"linear-gradient(to right,var(--bg),transparent)",zIndex:2,pointerEvents:"none" }}/>
      <div style={{ position:"absolute",right:0,top:0,bottom:0,width:80,background:"linear-gradient(to left,var(--bg),transparent)",zIndex:2,pointerEvents:"none" }}/>
      <motion.div animate={{x:["0%","-33.33%"]}} transition={{duration:20,repeat:Infinity,ease:"linear"}}
        style={{ display:"inline-flex",gap:48,whiteSpace:"nowrap" }}>
        {doubled.map((item,i)=>(
          <span key={i} style={{ display:"inline-flex",alignItems:"center",gap:16,fontSize:"clamp(1rem,2vw,1.3rem)",fontWeight:700,fontFamily:"var(--font-display)",color:"var(--muted)",letterSpacing:"-0.01em",flexShrink:0 }}>
            {item}
            <span style={{ color:"var(--highlight)",fontSize:"0.9em" }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT BLURB
═══════════════════════════════════════════════════════════════ */
function AboutBlurb() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const text = "I'm Devraj Chatribin, with over 5+ years of experience in design & development with strong focus on producing high quality & impactful digital experiences. I have worked with some of the most innovative industry leaders to help build their top-notch products.";
  const words = text.split(" ");
  return (
    <section ref={ref} style={{ background:"var(--bg)", padding:"120px 48px" }}>
      <div className="container" style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <motion.div initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5}}>
          <Eyebrow center>About Me</Eyebrow>
        </motion.div>
        <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.2rem,2.5vw,1.65rem)", fontWeight:700, lineHeight:1.6, letterSpacing:"-0.02em", color:"transparent" }}>
          {words.map((word,i)=>(
            <motion.span key={i}
              initial={{color:"var(--muted)"}}
              animate={inView?{color:"var(--fg)"}:{}}
              transition={{duration:0.4, delay: i*0.03}}
              style={{ display:"inline" }}
            >{word}{" "}</motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <section style={{ background:"var(--bg)", padding:"0 48px 100px" }}>
      <div className="container">
        <FadeUp>
          <Eyebrow>My Work</Eyebrow>
          <h2 className="section-heading">Selected Projects</h2>
          <p style={{ fontSize:"0.875rem", color:"var(--muted)", marginBottom:52, fontFamily:"var(--font-sans)" }}>Here's a curated selection showcasing my expertise and the achieved results.</p>
        </FadeUp>

        <div className="projects-grid">
          {PROJECTS.map((p,i)=>(
            <FadeUp key={p.title} delay={i*0.08}>
              <Link href={`/projects/${p.title.toLowerCase().replace(/\s+/g,"-")}`} className="project-card" style={{ "--card-bg": p.bg }}>
                <div className="project-img-wrap">
                  <img src={p.img} alt={p.title} className="project-img" onError={e=>{ e.currentTarget.style.display="none"; }}/>
                  <div className="project-overlay">
                    <span className="project-arrow">↗</span>
                  </div>
                </div>
                <div className="project-meta">
                  <div>
                    <div className="project-title">{p.title}</div>
                    <div className="project-cat">{p.cat}</div>
                  </div>
                  <div className="project-year">{p.year}</div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div style={{ display:"flex", justifyContent:"center", marginTop:52 }}>
            <motion.a href="/projects" className="btn-outline" whileHover={{scale:1.04}} whileTap={{scale:0.97}}>View All Projects</motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERTISE (accordion + image)
═══════════════════════════════════════════════════════════════ */
function Expertise() {
  const [open, setOpen] = useState("dev");
  const active = EXPERTISE.find(e=>e.id===open);

  return (
    <section style={{ background:"var(--bg)", padding:"100px 48px" }}>
      <div className="container">
        <FadeUp>
          <Eyebrow>Speciality</Eyebrow>
          <h2 className="section-heading">Areas of Expertise</h2>
        </FadeUp>

        <div className="expertise-grid">
          {/* Accordion */}
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {EXPERTISE.map(({id,label,icon,desc})=>(
              <div key={id} className={`accordion-item ${open===id?"open":""}`} onClick={()=>setOpen(id)}>
                <div className="accordion-header">
                  <span className="acc-icon">{icon}</span>
                  <span className="acc-label">{label}</span>
                  <span className="acc-chevron">{open===id?"−":"+"}</span>
                </div>
                <AnimatePresence>
                  {open===id && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.35,ease:[0.4,0,0.2,1]}} style={{overflow:"hidden"}}>
                      <p style={{ padding:"12px 0 16px 36px", fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.72, fontFamily:"var(--font-sans)" }}>{desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Image */}
          <div style={{ borderRadius:18, overflow:"hidden", background:"var(--accent)", border:"1px solid rgba(16,24,40,0.07)", height:280, position:"relative" }}>
            <AnimatePresence mode="wait">
              <motion.img key={active?.img} src={active?.img} alt={active?.label}
                initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.97}}
                transition={{duration:0.45}}
                style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }}
                onError={e=>{ e.currentTarget.style.display="none"; }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Tech marquee */}
        <div style={{ marginTop:48, overflow:"hidden", position:"relative" }}>
          <div style={{ position:"absolute",left:0,top:0,bottom:0,width:60,background:"linear-gradient(to right,var(--bg),transparent)",zIndex:2,pointerEvents:"none" }}/>
          <div style={{ position:"absolute",right:0,top:0,bottom:0,width:60,background:"linear-gradient(to left,var(--bg),transparent)",zIndex:2,pointerEvents:"none" }}/>
          <motion.div animate={{x:["0%","-50%"]}} transition={{duration:25,repeat:Infinity,ease:"linear"}} style={{ display:"inline-flex",gap:10,whiteSpace:"nowrap" }}>
            {[...TECH,...TECH].map((t,i)=>(
              <span key={i} style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",border:"1px solid rgba(255,255,255,0.08)",borderRadius:999,background:"rgba(255,255,255,0.03)",fontSize:"0.82rem",fontWeight:500,color:"rgba(255,255,255,0.6)",flexShrink:0,fontFamily:"'DM Sans',sans-serif" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  return (
    <section style={{ background:"var(--bg)", padding:"100px 48px", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
      <div className="container">
        <div className="testimonials-grid">
          {/* Left */}
          <FadeUp>
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="section-heading" style={{ marginBottom:14 }}>What others<br/>say</h2>
            <p style={{ fontSize:"0.875rem",color:"var(--muted)",lineHeight:1.7,maxWidth:280,fontFamily:"var(--font-sans)",marginBottom:28 }}>
              I've worked with some amazing people over the years, here is what they have to say about me.
            </p>
            <a href="https://linkedin.com/in/devraj-chatribin/" target="_blank" className="hero-social-link" style={{ display:"inline-flex",alignItems:"center",gap:6 }}>
              Check it out on LinkedIn <span>↗</span>
            </a>
          </FadeUp>

          {/* Right */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:0.4}}>
                <div className="testimonial-card">
                  <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:20 }}>
                    <div style={{ width:48,height:48,borderRadius:"50%",overflow:"hidden",background:"var(--accent)",flexShrink:0,border:"1px solid rgba(16,24,40,0.1)" }}>
                      <img src={t.avatar} alt={t.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} onError={e=>{ e.currentTarget.style.display="none"; }}/>
                    </div>
                    <div>
                      <div style={{ fontFamily:"var(--font-display)",fontWeight:700,fontSize:"0.95rem",color:"var(--fg)" }}>{t.name}</div>
                      <div style={{ fontSize:"0.78rem",color:"var(--muted)",fontFamily:"var(--font-sans)" }}>{t.role}</div>
                    </div>
                  </div>
                  <p style={{ fontSize:"0.9rem",color:"var(--muted)",lineHeight:1.76,fontFamily:"var(--font-sans)" }}>{t.quote}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:20 }}>
              <div style={{ display:"flex",gap:8 }}>
                <motion.button className="nav-arrow" whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={()=>setIdx(p=>(p-1+TESTIMONIALS.length)%TESTIMONIALS.length)}>←</motion.button>
                <motion.button className="nav-arrow" whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={()=>setIdx(p=>(p+1)%TESTIMONIALS.length)}>→</motion.button>
              </div>
              <span style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.3)",fontFamily:"'DM Sans',sans-serif" }}>{String(idx+1).padStart(2,"0")} / {String(TESTIMONIALS.length).padStart(2,"0")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--fg); }

        .container { max-width: 1200px; margin: 0 auto; }

        /* ── Hero ── */
        .hero-section { background: transparent; padding: 0 48px; }
        .hero-heading { font-family: var(--font-display); font-size: clamp(2.4rem,5vw,4.2rem); font-weight: 800; line-height:1.1; letter-spacing: -0.04em; margin-bottom: 48px; color: var(--fg); }
        .hero-bottom { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:end; }
        .hero-socials { display:flex; flex-direction:column; gap:10px; }
        .hero-social-link { display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); text-decoration:none; transition:color 0.2s; font-family:var(--font-sans); }
        .hero-social-link:hover { color: var(--fg); }
        .hero-body { font-size:0.875rem; line-height:1.72; color:var(--muted); text-align:right; font-family:var(--font-sans); }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; padding:12px 26px; border-radius:999px; border:1.5px solid rgba(16,24,40,0.06); background:transparent; color:var(--fg); font-family:var(--font-sans); font-size:0.875rem; font-weight:600; cursor:pointer; text-decoration:none; transition:border-color 0.25s,background 0.25s,color 0.25s; }
        .btn-outline:hover { border-color:var(--highlight); color:var(--highlight); background:rgba(163,230,53,0.06); }

        /* ── Sections ── */
        .section-heading { font-family:var(--font-display); font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:800; color:var(--fg); letter-spacing:-0.03em; line-height:1.1; margin-bottom:12px; }

        /* ── Projects ── */
        .projects-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        .project-card { display:block; text-decoration:none; border-radius:16px; overflow:hidden; background:var(--accent); border:1px solid rgba(16,24,40,0.04); transition:transform 0.3s ease,border-color 0.3s; }
        .project-card:hover { transform:translateY(-4px); border-color:rgba(16,24,40,0.08); }
        .project-img-wrap { position:relative; aspect-ratio:16/10; overflow:hidden; }
        .project-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.5s ease; }
        .project-card:hover .project-img { transform:scale(1.04); }
        .project-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.08); opacity:0; display:flex; align-items:center; justify-content:center; transition:opacity 0.3s; }
        .project-card:hover .project-overlay { opacity:1; }
        .project-arrow { width:44px; height:44px; background:var(--accent); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.1rem; color:var(--fg); }
        .project-meta { display:flex; align-items:flex-start; justify-content:space-between; padding:16px; }
        .project-title { font-family:var(--font-display); font-weight:700; font-size:0.95rem; color:var(--fg); }
        .project-cat { font-size:0.78rem; color:var(--muted); font-family:var(--font-sans); margin-top:3px; }
        .project-year { font-size:0.78rem; color:var(--muted); font-family:var(--font-sans); flex-shrink:0; }

        /* ── Expertise ── */
        .expertise-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; margin-top:40px; }
        .accordion-item { border:1px solid rgba(16,24,40,0.06); border-radius:14px; overflow:hidden; cursor:pointer; background:var(--accent); transition:border-color 0.25s; margin-bottom:6px; }
        .accordion-item.open { border-color:rgba(37,184,106,0.18); }
        .accordion-header { display:flex; align-items:center; gap:12px; padding:16px 18px; }
        .acc-icon { font-size:0.85rem; color:var(--highlight); width:20px; text-align:center; flex-shrink:0; }
        .acc-label { font-family:var(--font-display); font-size:0.95rem; font-weight:700; color:var(--fg); flex:1; }
        .acc-chevron { color:var(--muted); font-size:1.1rem; flex-shrink:0; transition:color 0.2s; }
        .accordion-item.open .acc-chevron { color:var(--highlight); }

        /* ── Testimonials ── */
        .testimonials-grid { display:grid; grid-template-columns:280px 1fr; gap:64px; align-items:start; }
        .testimonial-card { background:var(--accent); border:1px solid rgba(16,24,40,0.07); border-radius:18px; padding:28px; }
        .nav-arrow { width:38px; height:38px; border-radius:10px; border:1px solid rgba(16,24,40,0.1); background:transparent; color:var(--muted); font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:border-color 0.2s,color 0.2s; }
        .nav-arrow:hover { border-color:rgba(16,24,40,0.25); color:var(--fg); }

        /* ── Footer CTA ── */
        .footer-card { max-width:1200px; margin:0 auto; background:var(--accent); border:1px solid rgba(16,24,40,0.08); border-radius:24px; padding:72px 48px 80px; display:flex; flex-direction:column; align-items:center; text-align:center; position:relative; overflow:hidden; }
        .footer-card::before { content:''; position:absolute; top:-40%; left:50%; transform:translateX(-50%); width:60%; height:220px; border-radius:50%; background:radial-gradient(circle,rgba(163,230,53,0.05) 0%,transparent 70%); pointer-events:none; }
        .footer-cta-heading { font-family:var(--font-display); font-size:clamp(2.4rem,5.5vw,4.4rem); font-weight:800; color:var(--fg); line-height:1.1; letter-spacing:-0.035em; margin-bottom:36px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .desktop-links  { display:none !important; }
          .hamburger-btn  { display:flex !important; }
          .nav-pill       { border:none !important; border-radius:0 !important; box-shadow:none !important; }
          .hero-section   { padding:0 24px; }
          .hero-bottom    { grid-template-columns:1fr; gap:28px; }
          .hero-body      { text-align:left; }
          .projects-grid  { grid-template-columns:1fr; }
          .expertise-grid { grid-template-columns:1fr; }
          .testimonials-grid { grid-template-columns:1fr; gap:36px; }
          .section-heading { font-size:2rem; }
          .footer-card    { padding:48px 24px 60px; border-radius:18px; }
          .footer-cta-heading { font-size:2.2rem; }
        }
        @media (max-width: 860px) {
          .hero-section, .container { padding-left:0; padding-right:0; }
        }
      `}</style>


      <main>
        <Hero />

        <WorkHistory />
        <MarqueeStrip />
        <AboutBlurb />
        <Projects />
        <Expertise />
        <Testimonials />
      </main>
    </>
  );
}