/* ============================================================
   app.jsx — Side nav, arc hero, app shell, tweaks
   ============================================================ */

const NAV = [
  { id: "hero",    icon: "home", label: "Home" },
  { id: "work",    icon: "grid", label: "Work" },
  { id: "about",   icon: "user", label: "About" },
  { id: "contact", icon: "mail", label: "Contact" },
];

function SideNav({ active, go, theme, toggleTheme }) {
  return (
    <>
      <nav className="sidenav">
        <div className="nav-logo">
          <div className="irid-glow"></div>
          <div className="irid-ring"></div>
          <Icon name="spark" />
        </div>
        {NAV.map((n) => (
          <button
            key={n.id}
            className={`nav-item ${active === n.id ? "active" : ""}`}
            onClick={() => go(n.id)}
            aria-label={n.label}
          >
            <div className="irid-glow"></div>
            <div className="irid-ring"></div>
            <div className="nav-disc"></div>
            <Icon name={n.icon} />
            <span className="nav-tip">{n.label}</span>
          </button>
        ))}
      </nav>
      <div className="topnav">
        <button className="theme-toggle" onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}>
          <Icon name={theme === "dark" ? "sun" : "moon"} />
        </button>
      </div>
    </>
  );
}

/* ---- arc / fan / spotlight card stage ---- */
function cardTransform(offset, layout) {
  const a = Math.abs(offset);
  let x, y, rot, scale, op, z, blur = 0;
  if (layout === "fan") {
    x = offset * 90; y = a * a * 7; rot = offset * 7;
    scale = offset === 0 ? 1.26 : 1 - a * 0.08;
    op = a > 2 ? 0 : 1 - a * 0.05; z = 50 - a * 10;
  } else if (layout === "spotlight") {
    const dir = offset > 0 ? 1 : -1;
    x = offset === 0 ? 0 : dir * (188 + (a - 1) * 116);
    y = a * 18; rot = offset * 3;
    scale = offset === 0 ? 1.5 : Math.max(0.4, 0.72 - (a - 1) * 0.1);
    /* off-focus cards dissolve softly into the background */
    op = offset === 0 ? 1 : Math.max(0, 0.46 - (a - 1) * 0.22);
    blur = offset === 0 ? 0 : (a - 1) * 4 + 4;
    z = offset === 0 ? 60 : 40 - a * 8;
  } else { /* arc — downward-opening arch, copy nested in the hollow */
    x = offset * 132; y = a * a * 13; rot = offset * 7;
    scale = offset === 0 ? 1.12 : 1 - a * 0.05;
    op = a > 3 ? 0 : 1 - a * 0.09; z = 50 - a * 10;
  }
  return {
    transform: `translateX(calc(-50% + ${x}px)) translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
    opacity: op, zIndex: z,
    filter: blur ? `blur(${blur}px)` : "none",
  };
}

function Hero({ name, role, layout, autoplay, go }) {
  const N = PROJECTS.length;
  const [center, setCenter] = useState(0);
  const [hover, setHover] = useState(false);
  const stageRef = useRef(null);

  const step = useCallback((dir) => setCenter((c) => (c + dir + N) % N), [N]);

  useEffect(() => {
    if (!autoplay || hover) return;
    const t = setInterval(() => step(1), 4200);
    return () => clearInterval(t);
  }, [autoplay, hover, step]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const [shown, setShown] = useState(false);
  useEffect(() => { const r = requestAnimationFrame(() => setShown(true)); return () => cancelAnimationFrame(r); }, []);

  const offsetOf = (i) => {
    let d = i - center;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  const copyShift = layout === "arc" ? -86 : (layout === "fan" ? -20 : -36);

  return (
    <header className="hero" id="hero">
      <div
        className="arc-stage"
        ref={stageRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {PROJECTS.map((p, i) => {
          const off = offsetOf(i);
          const isC = off === 0;
          const st = cardTransform(off, layout);
          return (
            <div
              key={p.id}
              className={`arc-card ${isC ? "is-center" : ""}`}
              style={st}
              onClick={() => { if (isC) go("work"); else setCenter(i); }}
            >
              <div className="ac-ring"></div>
              <div className="ac-inner">
                <image-slot id={`hero-${p.id}`} shape="rect" fit="cover"
                  placeholder={p.name} style={{ width:"100%", height:"100%" }}></image-slot>
                <div className="ph" data-ph={p.name}
                  style={{ position:"absolute", inset:0, zIndex:-1, "--ph-a":p.phA, "--ph-b":p.phB }}></div>
              </div>
              <div className="ac-shade"></div>
              <div className="ac-label">{p.name}</div>
            </div>
          );
        })}
        <button className="arc-arrow prev" onClick={() => step(-1)} aria-label="Previous"><Icon name="arrowL" /></button>
        <button className="arc-arrow next" onClick={() => step(1)} aria-label="Next"><Icon name="arrowR" /></button>
      </div>

      <div className={`hero-copy ${shown ? "shown" : ""}`} style={{ marginTop: copyShift }}>
        <h1 className="hero-title" style={{ transitionDelay: ".14s" }}>
          {name.split(" ")[0]} <span className="grad">{name.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="hero-sub" style={{ transitionDelay: ".24s" }}>{role}</p>
        <div className="hero-cta" style={{ transitionDelay: ".34s" }}>
          <a className="cta" href="#work" onClick={(e)=>{e.preventDefault();go("work");}}>
            See the work
            <span className="cta-arrow"><Icon name="arrowR" width="14" height="14" /></span>
          </a>
          <a className="cta ghost" href="#contact" onClick={(e)=>{e.preventDefault();go("contact");}}>Say hello</a>
        </div>
      </div>

      <div className="scroll-hint"><span>Scroll</span><span className="scroll-arrow"></span></div>
    </header>
  );
}

/* ============================================================
   App
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "spotlight",
  "accent": ["#2f6bff", "#4f9dff", "#86c4ff"],
  "autoplay": true,
  "name": "VENSI HAJDARI",
  "role": "Graphic designer & creative engineer, working at the seam between product thinking and creative technology."
}/*EDITMODE-END*/;

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/hajdarivensi/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/vensi-hajdari/" },
  { label: "GitHub",    href: "https://github.com/vensih" },
  { label: "Twitter",   href: "https://twitter.com/vensihajdari" },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(null);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("site-theme") || "dark"; } catch (e) { return "dark"; }
  });
  useReveal();

  // apply theme — disable transitions and force a style flush so var()-based
  // colors commit instantly (Chromium leaves transitioned var() backgrounds
  // stuck on the old value otherwise)
  useEffect(() => {
    const de = document.documentElement;
    de.classList.add("theme-switching");
    de.setAttribute("data-theme", theme);
    try { localStorage.setItem("site-theme", theme); } catch (e) {}
    // force synchronous reflow while transitions are off → commits new values
    void de.offsetHeight;
    const id = requestAnimationFrame(() => de.classList.remove("theme-switching"));
    return () => cancelAnimationFrame(id);
  }, [theme]);
  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  // apply accent palette to CSS vars
  useEffect(() => {
    const [a1, a2, a3] = t.accent || [];
    const r = document.documentElement.style;
    if (a1) r.setProperty("--a1", a1);
    if (a2) r.setProperty("--a2", a2);
    if (a3) r.setProperty("--a3", a3);
  }, [t.accent]);

  // active section tracking (scroll-based; IO is unreliable in sandboxed iframes)
  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      const mid = window.scrollY + window.innerHeight * 0.38;
      let cur = NAV[0].id;
      NAV.forEach((n) => {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= mid) cur = n.id;
      });
      setActive(cur);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <>
      <SideNav active={active} go={go} theme={theme} toggleTheme={toggleTheme} />
      <main className="page">
        <Hero name={t.name} role={t.role} layout={t.heroLayout} autoplay={t.autoplay} go={go} />
        <WorkSection onOpen={setOpen} />
        <AboutSection name={t.name} />
        <ContactSection name={t.name} email="vensi@hajdari.al" socials={SOCIALS} />
      </main>

      <ProjectModal project={open} onClose={() => setOpen(null)} />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Layout" value={t.heroLayout}
          options={["arc", "fan", "spotlight"]}
          onChange={(v) => setTweak("heroLayout", v)} />
        <TweakToggle label="Auto-rotate" value={t.autoplay}
          onChange={(v) => setTweak("autoplay", v)} />
        <TweakSection label="Iridescence" />
        <TweakColor label="Accent" value={t.accent}
          options={[
            ["#2f6bff", "#4f9dff", "#86c4ff"],
            ["#1f4fe0", "#3d7bff", "#6fb0ff"],
            ["#3d5bff", "#4f9dff", "#5fe0ff"],
            ["#4a3dff", "#5f8dff", "#86c4ff"],
          ]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={theme}
          options={["dark", "light"]}
          onChange={(v) => setTheme(v)} />
        <TweakSection label="Identity" />
        <TweakText label="Name" value={t.name} onChange={(v) => setTweak("name", v)} />
        <TweakText label="Tagline" value={t.role} onChange={(v) => setTweak("role", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
