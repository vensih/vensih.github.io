/* ============================================================
   sections.jsx — Work grid, project modal, About, Contact
   ============================================================ */

function Tile({ project, layout, index, onOpen }) {
  const tilt = useTilt(8);
  return (
    <article
      className={`tile reveal ${layout.col} ${layout.h} d${(index % 4) + 1}`}
      {...tilt}
      onClick={() => onOpen(project)}
    >
      <div className="tile-media">
        {project.thumb && (
          <img src={project.thumb} alt={project.name}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", transform:"scale(1.25)", transformOrigin:"center center" }} />
        )}
        <div className="ph" data-ph={project.name}
             style={{ position:"absolute", inset:0, zIndex:-1, "--ph-a":project.phA, "--ph-b":project.phB }}></div>
        <div className="tile-shade"></div>
      </div>
<div className="tile-meta">
        <div>
          <h3>{project.name}</h3>
          <div className="tile-tag">{project.tag}</div>
        </div>
      </div>
    </article>
  );
}

function WorkSection({ onOpen }) {
  return (
    <section className="work" id="work">
      <div className="section" style={{ padding: 0 }}>
        <div className="work-head">
          <div>
            <p className="eyebrow reveal" style={{ marginBottom: 16 }}>Selected Work</p>
            <h2 className="sec-title reveal d1">Things I've<br/>brought to life</h2>
          </div>
          <p className="sec-note reveal d2">
            A handful of projects spanning product, brand, and creative engineering.
            Tap any tile to look closer.
          </p>
        </div>
        <div className="grid">
          {PROJECTS.map((p, i) => (
            <Tile key={p.id} project={p} layout={TILE_LAYOUT[i]} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  const open = !!project;
  // keep last project for exit animation
  const ref = useRef(project);
  if (project) ref.current = project;
  const p = project || ref.current;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={`modal-scrim ${open ? "open" : ""}`} onClick={onClose}>
      {p && (
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
          <div className="modal-media">
            {p.url ? (
              <iframe src={p.url} style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
                title={p.name}></iframe>
            ) : p.thumb ? (
              <img src={p.thumb} alt={p.name}
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", transform:"scale(1.25)", transformOrigin:"center center" }} />
            ) : null}
            <div className="ph" data-ph={p.name}
              style={{ position:"absolute", inset:0, zIndex:-1, "--ph-a":p.phA, "--ph-b":p.phB }}></div>
          </div>
          <div className="modal-body">
            <p className="eyebrow">{p.role} · {p.year}</p>
            <h2>{p.name}</h2>
            <p>{p.blurb}</p>
            <div className="modal-tags">
              {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
            </div>
            <div style={{ marginTop: 30 }}>
              <a className="cta" href={p.url || "#"} onClick={p.url ? undefined : (e)=>e.preventDefault()}
                 target={p.url ? "_blank" : undefined} rel={p.url ? "noreferrer" : undefined}>
                View project
                <span className="cta-arrow"><Icon name="arrowR" width="14" height="14" /></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AboutSection({ name }) {
  return (
    <section className="about" id="about">
      <div className="section" style={{ padding: 0 }}>
        <div className="about-grid">
          <div className="about-portrait reveal">
            <div className="irid-glow"></div>
            <image-slot id="portrait" shape="rect" fit="cover"
              placeholder="Your portrait" style={{ width:"100%", height:"100%" }}></image-slot>
            <div className="ph" data-ph="Portrait"
              style={{ position:"absolute", inset:0, zIndex:-1, "--ph-a":"#1c1c28", "--ph-b":"#101018" }}></div>
          </div>
          <div>
            <p className="eyebrow reveal">About</p>
            <p className="about-lead reveal d1">
              Working at the seam between <em>product thinking</em> and creative technology.
            </p>
            <p className="about-body reveal d2">
              I'm {name}, a designer-engineer with 5 years building at the intersection
              of visual identity, web development, UI/UX, branding, and software development.
              I combine creative direction with technical execution to make things that look right
              and work right.
            </p>
            <p className="about-body reveal d2">
              A major part of my creative work flows through nodesign, my design brand, where
              I produce visual identity systems, social media content, product placement designs,
              layouts, and branding elements for clients across industries.
            </p>
            <div className="stats reveal d3">
              <div className="stat"><div className="num">5+</div><div className="lbl">Years</div></div>
              <div className="stat"><div className="num">10+</div><div className="lbl">Projects</div></div>
              <div className="stat"><div className="num">100k+</div><div className="lbl">Lines of <span className="grad">magic</span></div></div>
            </div>
            <div className="skills reveal d4">
              {SKILLS.map((s) => <span className="chip" key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ name, email, socials }) {
  return (
    <section className="contact" id="contact">
      <div className="contact-ring"></div>
      <div className="contact-inner section" style={{ padding: 0 }}>
        <p className="eyebrow reveal" style={{ justifyContent:"center", marginBottom: 22 }}>Let's talk</p>
        <h2 className="reveal d1">Have something<br/><span className="grad">worth making?</span></h2>
        <p className="reveal d2">I'm open to select freelance & collaboration in 2026.</p>
        <div className="reveal d2">
          <a className="cta" href={`mailto:${email}`}>
            {email}
            <span className="cta-arrow"><Icon name="arrowR" width="14" height="14" /></span>
          </a>
        </div>
        <div className="socials reveal d3">
          {socials.map((s) => <a className="social" key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
        </div>
        <div className="footer-line">
          <span>© 2026 {name}</span>
          <span>Built in near-black, shaped by light, finished with iridescence.</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Tile, WorkSection, ProjectModal, AboutSection, ContactSection });
