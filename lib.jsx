/* ============================================================
   lib.jsx — shared data, icons, and interaction hooks
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- project data (swap freely) ---- */
const PROJECTS = [
  { id: "p1", name: "nodesign",         tag: "Design Brand · 2025", phA:"#16294d", phB:"#0b1322",
    blurb: "My own design brand creating visual identity systems, social media content, product placement designs, layouts, and branding elements for clients across creative industries.",
    tags:["Visual Identity","Brand","Graphic Design"], year:"2025", role:"Creative Director" },
  { id: "p2", name: "Studio Portfolio", tag: "Web Dev · 2025", phA:"#1d3666", phB:"#0d1a30",
    blurb: "A fully responsive portfolio platform built from scratch with multilingual support, SEO-optimized architecture, and a refined UI designed around the work it showcases.",
    tags:["HTML/CSS/JS","Responsive","SEO"], year:"2025", role:"Designer + Dev" },
  { id: "p3", name: "Brand Identity",   tag: "Visual Identity · 2024", phA:"#13335c", phB:"#0a1828",
    blurb: "A complete visual identity for a client spanning logo design, brand guidelines, color and typography systems, and a full suite of social and print-ready assets.",
    tags:["Logo Design","Brand System","Print"], year:"2024", role:"Art Director" },
  { id: "p4", name: "vhnoter.al", tag: "Web Dev · 2024", phA:"#222c4d", phB:"#11162a",
    blurb: "A professional website for a notary office in Shkodër, Albania. Available in four languages (Albanian, English, Italian, and German), it helps clients find services, check fees, and get in touch, all wrapped in a clean, trustworthy design.",
    tags:["HTML/CSS","Multilingual","SEO"], year:"2024", role:"Developer", url:"https://vhnoter.al", thumb:"gallery/vhnoter_picture.png" },
  { id: "p5", name: "Content Suite",    tag: "Graphic Design · 2023", phA:"#102338", phB:"#0a1422",
    blurb: "A visual content package for a brand launch covering social media graphics, product placement designs, and layout assets under a single cohesive creative direction.",
    tags:["Graphic Design","Social Media","Layouts"], year:"2023", role:"Designer" },
  { id: "p6", name: "Creative Tools",   tag: "Development · 2023", phA:"#1a2d5a", phB:"#0c162c",
    blurb: "JavaScript and Python utilities built to streamline creative workflows, from automated asset export pipelines to data-driven layout generators.",
    tags:["JavaScript","Python","Automation"], year:"2023", role:"Developer" },
  { id: "p7", name: "Agency Website",   tag: "Web Dev · 2022", phA:"#243152", phB:"#121826",
    blurb: "Full redesign of a creative agency site with multilingual pages, structured SEO, organized page architecture, and accessibility improvements built throughout.",
    tags:["Web Dev","Multilingual","Accessible"], year:"2022", role:"Frontend Dev" },
];

const SKILLS = ["Graphic Design","Visual Identity","UI/UX","Branding","Frontend Dev","JavaScript","Python","C++"];

/* tile layout rhythm */
const TILE_LAYOUT = [
  { col:"col-7", h:"h-lg" }, { col:"col-5", h:"h-lg" },
  { col:"col-5", h:"h-md" }, { col:"col-7", h:"h-md" },
  { col:"col-4", h:"h-md" }, { col:"col-4", h:"h-md" }, { col:"col-4", h:"h-md" },
];

/* ---- icons ---- */
function Icon({ name, ...p }) {
  const paths = {
    home: <><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></>,
    spark: <path d="M12 2.5 13.8 9 20 12l-6.2 3L12 21.5 10.2 15 4 12l6.2-3z"/>,
    arrowR: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    arrowL: <><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
         strokeLinecap="round" strokeLinejoin="round" {...p}>
      {paths[name]}
    </svg>
  );
}

/* ---- scroll reveal (scroll-based; IO is unreliable in sandboxed iframes) ---- */
function useReveal() {
  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > -40) el.classList.add("in");
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    const t1 = setTimeout(check, 120);
    const t2 = setTimeout(check, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, []);
}

/* ---- 3D tilt ---- */
function useTilt(max = 9) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateY(-6px) scale(1.012)`;
  }, [max]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (el) el.style.transform = "";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

Object.assign(window, { PROJECTS, SKILLS, TILE_LAYOUT, Icon, useReveal, useTilt });
