/* ============================================================
   app.jsx — Side nav, arc hero, app shell, tweaks
   ============================================================ */

const NAV = [
  { id: "hero",    icon: "home", label: "Home" },
  { id: "work",    icon: "grid", label: "Work" },
  { id: "about",   icon: "user", label: "About" },
  { id: "contact", icon: "mail", label: "Contact" },
];

function NavBtn({ n, active, go }) {
  return (
    <button
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
  );
}

function SideNav({ active, go, theme, toggleTheme }) {
  return (
    <>
      <nav className="sidenav">
        {NAV.map((n) => <NavBtn key={n.id} n={n} active={active} go={go} />)}
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

function Hero({ name, role, go }) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const r = requestAnimationFrame(() => setShown(true)); return () => cancelAnimationFrame(r); }, []);

  return (
    <header className="hero" id="hero">
      <div className={`hero-copy ${shown ? "shown" : ""}`}>
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
  "accent": ["#2f6bff", "#4f9dff", "#86c4ff"],
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
        <Hero name={t.name} role={t.role} go={go} />
        <WorkSection onOpen={setOpen} />
        <AboutSection name={t.name} />
        <ContactSection name={t.name} email="vensi@hajdari.al" socials={SOCIALS} />
      </main>

      <ProjectModal project={open} onClose={() => setOpen(null)} />

      <TweaksPanel>
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
