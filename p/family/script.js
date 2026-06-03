/* ── FAN CHART GEOMETRY ──────────────────────────────────────────────────────
   Canvas: 5500 × 5200 px   |   Origin (Vensi): CX=3000, CY=4800
   Radial step per generation: R_STEP = 350 px  (same for all generations)

   Fan spans 10°–170° (standard math angles, CCW from +x axis).
   Each node sits at the midpoint angle of its section:
     Gen 1  (span 160°):  Father 130°,  Mother 50°
     Gen 2  (span  80°):  pat-gf 150°, pat-gm 110°, mat-gf 70°, mat-gm 30°
     Gen 3  (span  40°):  160° 140° 120° 100° 80° 60° 40° 20°
     Gen 4  (span  20°):  Rustem 165°, Sebije 155°
     Gen 5  (span  10°):  Ibrahim 165°  (only father of Rustem known)
     Gen 6  (span   5°):  Hajdar  165°  (only father of Ibrahim known)
─────────────────────────────────────────────────────────────────────────── */

const CANVAS_W = 6000;
const CANVAS_H = 7000;
const CX       = 3000;   // Vensi x
const CY       = 4800;   // Vensi y
const R_STEP   = 350;    // radial gap per generation

function fanXY(deg, gen) {
  const r = R_STEP * gen;
  const rad = deg * Math.PI / 180;
  return { x: Math.round(CX + r * Math.cos(rad)),
           y: Math.round(CY - r * Math.sin(rad)) };
}

/* ── FAMILY DATA ─────────────────────────────────────────────────────────── */
function mkNode(id, name, dates, title, gen, angleDeg, labelPos, icon, photo) {
  const pos = gen === 0 ? { x: CX, y: CY } : fanXY(angleDeg, gen);
  return { id, name, dates, title, gen, icon: icon||null, photo: photo||null,
           x: pos.x, y: pos.y, labelPos };
}

const people = [
  /* Gen 0 — VENSI */
  mkNode("vensi",    "Vensi Hajdari",       "21/05/2004", "",                0,   0,   "below", "star"),

  /* Gen 1 — Prindërit */
  mkNode("father",   "Bahri Hajdari",       "18/12/1955", "",               1, 130,  "below", "star"),
  mkNode("mother",   "Valbona Hajdari",     "04/01/1967", "",               1,  50,  "below"),

  /* Gen 2 — Gjyshërit */
  mkNode("pat-gf",   "Vehbi Hajdari",       "01/05/1927",     "",                     2, 150,  "below"),
  mkNode("pat-gm",   "Nazire Hajdari",      "01/06/1930",     "",                     2, 110,  "above"),
  mkNode("mat-gf",   "Xhemal Fishta",       "",     "",                     2,  70,  "above"),
  mkNode("mat-gm",   "Naxhije Fishta",      "",     "",                     2,  30,  "below"),

  /* Gen 3 — Stërgjyshërit */
  mkNode("pp-ggf",   "Halim Hajdari",       "14/02/1891", "",               3, 160,  "below"),
  mkNode("pp-ggm",   "Hamide Hajdari",      "",     "",                     3, 140,  "above"),
  mkNode("pm-ggf",   "Musa Nurja",          "",     "",                     3, 120,  "above"),
  mkNode("pm-ggm",   "Hava Nurja",          "",     "",                     3, 100,  "above"),
  mkNode("mp-ggf",   "Sait Fishta",         "",     "",                     3,  80,  "above"),
  mkNode("mp-ggm",   "Vace Fishta",         "",     "",                     3,  60,  "above"),
  mkNode("mm-ggf",   "Toefik Rexha",        "",     "",                     3,  40,  "above"),
  mkNode("mm-ggm",   "Bedrije Rexha",       "",     "",                     3,  20,  "below"),

  /* Gen 4 — Stër-stërgjyshërit */
  mkNode("rustem",   "Rustem Hajdari",      "",     "",                     4, 165,  "below"),
  mkNode("sebije",   "Sebije Hajdari",      "",     "",                     4, 155,  "above"),
  mkNode("hassan",   "Hassan Kahari",       "",     "",                     4, 145,  "above"),
  mkNode("vace-k",   "Vace Kahari",         "",     "",                     4, 135,  "above"),

  /* Gen 5 — Rustem's and Sebije's parents */
  mkNode("ibrahim",  "Ibrahim Hajdari",     "",     "",                     5, 165,  "below"),
  mkNode("mani",     "Mani Preza",          "",     "",                     5, 157.5,"above"),
  mkNode("laje",     "Laje Preza",          "",     "",                     5, 152.5,"above"),

  /* Gen 6 — Hajdar (Ibrahim's father) */
  mkNode("hajdar",   "Hajdar Hajdari",      "",     "",                     6, 165,  "below"),
];

/* ── RIBBON CONNECTIONS ──────────────────────────────────────────────────── */
const connections = [
  { from: "vensi",   to: "father",   color: "amber" },
  { from: "vensi",   to: "mother",   color: "amber" },
  { from: "father",  to: "pat-gf",   color: "teal"  },
  { from: "father",  to: "pat-gm",   color: "teal"  },
  { from: "mother",  to: "mat-gf",   color: "teal"  },
  { from: "mother",  to: "mat-gm",   color: "teal"  },
  { from: "pat-gf",  to: "pp-ggf",   color: "mist"  },
  { from: "pat-gf",  to: "pp-ggm",   color: "mist"  },
  { from: "pat-gm",  to: "pm-ggf",   color: "mist"  },
  { from: "pat-gm",  to: "pm-ggm",   color: "mist"  },
  { from: "mat-gf",  to: "mp-ggf",   color: "mist"  },
  { from: "mat-gf",  to: "mp-ggm",   color: "mist"  },
  { from: "mat-gm",  to: "mm-ggf",   color: "mist"  },
  { from: "mat-gm",  to: "mm-ggm",   color: "mist"  },
  { from: "pp-ggf",  to: "rustem",   color: "mist2" },
  { from: "pp-ggf",  to: "sebije",   color: "mist2" },
  { from: "pp-ggm",  to: "hassan",   color: "mist2" },
  { from: "pp-ggm",  to: "vace-k",   color: "mist2" },
  { from: "rustem",  to: "ibrahim",  color: "mist3" },
  { from: "sebije",  to: "mani",     color: "mist3" },
  { from: "sebije",  to: "laje",     color: "mist3" },
  { from: "ibrahim", to: "hajdar",   color: "mist3" },
];

const ribbonStyles = {
  amber: { fill:"rgba(215,162,28,0.32)",  stroke:"rgba(245,192,50,0.82)",  width:52 },
  teal:  { fill:"rgba(65,105,205,0.28)",  stroke:"rgba(90,135,232,0.78)",  width:36 },
  mist:  { fill:"rgba(125,75,188,0.22)",  stroke:"rgba(152,98,212,0.68)",  width:24 },
  mist2: { fill:"rgba(98,62,158,0.16)",   stroke:"rgba(122,84,180,0.58)",  width:16 },
  mist3: { fill:"rgba(82,52,132,0.12)",   stroke:"rgba(102,72,154,0.48)",  width:12 },
};

/* ── MARRIED COUPLES (filled wedge between the two parent ribbons) ────────── */
const couples = [
  { child: "vensi",   p1: "father",  p2: "mother",  color: "amber" },
  { child: "father",  p1: "pat-gf",  p2: "pat-gm",  color: "teal"  },
  { child: "mother",  p1: "mat-gf",  p2: "mat-gm",  color: "teal"  },
  { child: "pat-gf",  p1: "pp-ggf",  p2: "pp-ggm",  color: "mist"  },
  { child: "pat-gm",  p1: "pm-ggf",  p2: "pm-ggm",  color: "mist"  },
  { child: "mat-gf",  p1: "mp-ggf",  p2: "mp-ggm",  color: "mist"  },
  { child: "mat-gm",  p1: "mm-ggf",  p2: "mm-ggm",  color: "mist"  },
  { child: "pp-ggf",  p1: "rustem",  p2: "sebije",  color: "mist2" },
  { child: "pp-ggm",  p1: "hassan",  p2: "vace-k",  color: "mist2" },
  { child: "sebije",  p1: "mani",    p2: "laje",    color: "mist3" },
];

const marriageFills = {
  amber: "rgba(215,162,28,0.10)",
  teal:  "rgba(65,105,205,0.08)",
  mist:  "rgba(125,75,188,0.07)",
  mist2: "rgba(98,62,158,0.05)",
  mist3: "rgba(82,52,132,0.04)",
};

/* ── BIOGRAPHIES ─────────────────────────────────────────────────────────── */
const bios = {
  "vensi":   "Vensi Hajdari lindi më 21 Maj 2004. Pasardhës i vetëm i familjes Hajdari, bart me krenari historinë dhe traditën e stërgjyshërve të tij.",
  "father":  "Bahri Hajdari lindi më 18 Dhjetor 1955. Baba i Vensit dhe shtyllë e familjes Hajdari.",
  "mother":  "Valbona Hajdari (e lindur Fishta) lindi më 4 Janar 1967. Nëna e Vensit, ka bashkuar me dashurinë dy degë familjare të mëdha.",
  "pat-gf":  "Vehbi Hajdari, gjyshi i Vensit nga ana e babait.",
  "pat-gm":  "Nazire Hajdari, gjyshja e Vensit nga ana e babait.",
  "mat-gf":  "Xhemal Fishta, gjyshi i Vensit nga ana e nënës.",
  "mat-gm":  "Naxhije Fishta, gjyshja e Vensit nga ana e nënës.",
  "pp-ggf":  "Hafiz Halim Hajdari lindi më 14 shkurt 1891 në lagjen Rus të Shkodrës, në një familje me rrënjë të hershme shkodrane. I rritur në një mjedis të lidhur ngushtë me traditën, besimin dhe kulturën qytetare të Shkodrës, ai ndoqi rrugën e dijes që në moshë të re. Për të thelluar formimin e tij fetar dhe intelektual, shkoi në Egjipt, ku studioi arabishten dhe shkencat islame, duke marrë një arsimim të rrallë për kohën.\n\nPas kthimit në Shkodër, Hafiz Halim Hajdari iu përkushtua shërbimit fetar dhe edukimit shpirtëror të komunitetit. Për dekada me radhë shërbeu në disa prej xhamive më të njohura të qytetit dhe rrethinave, si në Rrjoll, Tophanë, Parrucë, Rus, Pazar dhe në Xhaminë e Plumbit. Përmes dijes, urtësisë dhe përkushtimit të tij, ai u bë një figurë e respektuar në jetën fetare, kulturore dhe shoqërore të Shkodrës.\n\nHafiz Halim Hajdari mbahet mend si një personalitet me formim të gjerë, karakter të fortë dhe ndikim të rëndësishëm në komunitet. Ai përfaqësonte lidhjen mes traditës islame, kulturës shkodrane dhe vlerave qytetare, duke lënë pas një emër të nderuar dhe një trashëgimi të qëndrueshme. Për këtë arsye, ai njihet si një nga figurat më të ndritura të Shkodrës në shekullin e 20-të.",
  "pp-ggm":  "Hamide Hajdari, stërgjyshja e Vensit nga ana e babait të babait.",
  "pm-ggf":  "Musa Nurja, stërgjyshi i Vensit nga ana e nënës së babait.",
  "pm-ggm":  "Hava Nurja, stërgjyshja e Vensit nga ana e nënës së babait.",
  "mp-ggf":  "Sait Fishta, stërgjyshi i Vensit nga ana e babait të nënës.",
  "mp-ggm":  "Vace Fishta, stërgjyshja e Vensit nga ana e babait të nënës.",
  "mm-ggf":  "Toefik Rexha, stërgjyshi i Vensit nga ana e nënës së nënës.",
  "mm-ggm":  "Bedrije Rexha, stërgjyshja e Vensit nga ana e nënës së nënës.",
  "rustem":  "Rustem Hajdari, stër-stërgjyshi i Vensit.",
  "sebije":  "Sebije Hajdari, stër-stërgjyshja e Vensit.",
  "hassan":  "Hassan Kahari.",
  "vace-k":  "Vace Kahari.",
  "ibrahim": "Ibrahim Hajdari.",
  "mani":    "Mani Preza.",
  "laje":    "Laje Preza.",
  "hajdar":  "Hajdar Hajdari, paraardhës i largët i fisit Hajdari.",
};

/* ── PAN / ZOOM STATE ────────────────────────────────────────────────────── */
const MIN_SCALE = 0.30;
const MAX_SCALE = 4.0;
let state = { tx: 0, ty: 0, scale: 1 };

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/* ── Zoom meter helpers — cached so zero DOM lookup on hot path ── */
let _zmEl = null, _zmValEl = null, _zmTimer = null, _zmBtn = null;
function updateZoomMeter(scale) {
  if (!_zmEl) {
    _zmEl    = document.getElementById("zoom-meter");
    _zmValEl = document.getElementById("zm-val");
    _zmBtn   = document.getElementById("btn-reset");
  }
  if (!_zmEl) return;
  _zmValEl.textContent = Math.round(scale * 100);
  _zmEl.classList.add("zooming");
  _zmBtn?.classList.add("zooming");
  clearTimeout(_zmTimer);
  _zmTimer = setTimeout(() => {
    _zmEl.classList.remove("zooming");
    _zmBtn?.classList.remove("zooming");
  }, 1800);
}

function applyTransform(tx, ty, scale) {
  state = { tx, ty, scale: clamp(scale, MIN_SCALE, MAX_SCALE) };
  document.getElementById("canvas").style.transform =
    `translate(${state.tx}px,${state.ty}px) scale(${state.scale})`;
  updateZoomMeter(state.scale);
}

function initView() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const scale  = 1.0;
  const focusY = CY - R_STEP * 0.5;
  applyTransform(vw / 2 - CX * scale, vh / 2 - focusY * scale, scale);
}

window.addEventListener("resize", initView);

/* ── INIT DOM ────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initView();

  // Remove intro veil from DOM once its fade-out animation completes
  const veil = document.getElementById("intro-veil");
  if (veil) veil.addEventListener("animationend", () => veil.remove(), { once: true });

  const viewport  = document.getElementById("viewport");
  const svg       = document.getElementById("ribbon-svg");
  const nodesLayer = document.getElementById("nodes-layer");
  const tooltip   = document.getElementById("tooltip");

  const byId = {};
  people.forEach(p => { byId[p.id] = p; });

  /* ── SVG setup: defs + nebula background + star field ─────────── */
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  svg.appendChild(defs);

  const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bgRect.setAttribute("x", "0"); bgRect.setAttribute("y", "0");
  bgRect.setAttribute("width", CANVAS_W); bgRect.setAttribute("height", CANVAS_H);
  bgRect.setAttribute("fill", "#07091a");
  svg.appendChild(bgRect);

  generateNebulae(svg);
  generateStarField(svg);

  /* ── Marriage wedges (behind ribbons) ────── */
  couples.forEach(couple => {
    const c = byId[couple.child], p1 = byId[couple.p1], p2 = byId[couple.p2];
    if (!c || !p1 || !p2) return;
    const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    el.setAttribute("d", buildMarriageWedge(c.x, c.y, p1.x, p1.y, p2.x, p2.y));
    el.setAttribute("fill", marriageFills[couple.color]);
    el.setAttribute("stroke", "none");
    svg.appendChild(el);
  });

  /* ── Ribbons ──────────────────────────────── */
  connections.forEach(conn => {
    const a = byId[conn.from], b = byId[conn.to];
    if (!a || !b) return;
    const s = ribbonStyles[conn.color];
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.dataset.from = conn.from; g.dataset.to = conn.to;
    if (s.filter) g.setAttribute("filter", s.filter);
    const rDelay = { amber:0.56, teal:0.86, mist:1.14, mist2:1.40, mist3:1.62 }[conn.color] ?? 0.8;
    g.style.animation = `ribbon-fade 0.7s ease both ${rDelay}s`;
    // Once entrance animation ends, hand opacity control back to the highlight system
    g.addEventListener("animationend", () => {
      g.style.animation = "";
      g.style.transition = "opacity 0.18s";
    }, { once: true });
    const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    el.setAttribute("d",      buildRibbon(a.x, a.y, b.x, b.y, s.width));
    el.setAttribute("fill",   s.fill);
    el.setAttribute("stroke", s.stroke);
    el.setAttribute("stroke-width", "1.5");
    g.appendChild(el); svg.appendChild(g);
  });

  /* ── Nodes ────────────────────────────────── */
  people.forEach(person => {
    const div = document.createElement("div");
    div.className = `node gen${person.gen}`;
    if (person.id === "vensi") div.classList.add("central");
    if (person.labelPos === "above") div.classList.add("label-above");
    div.style.left   = person.x + "px";
    div.style.top    = person.y + "px";
    div.dataset.id   = person.id;

    if (person.icon === "crown") {
      const ic = document.createElement("span");
      ic.className = "node-icon"; ic.innerHTML = "&#9819;";
      ic.style.color = "#c8a020"; div.appendChild(ic);
    }

    const ring = document.createElement("div");
    ring.className = "portrait-ring";
    if (person.photo) {
      const img = document.createElement("img");
      img.src = person.photo; img.alt = person.name; ring.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "placeholder-img";
      const w = person.name.split(" ");
      ph.textContent = w.length >= 2
        ? (w[0][0] + w[w.length-1][0]).toUpperCase()
        : w[0].slice(0,2).toUpperCase();
      ring.appendChild(ph);
    }
    div.appendChild(ring);

    const label = document.createElement("div");
    label.className = "node-label";
    const nameEl = document.createElement("span");
    nameEl.className = "name"; nameEl.textContent = person.name;
    if (person.icon === "star") {
      const ic = document.createElement("span");
      ic.className = "node-star" + (person.gen <= 1 ? " node-star-lg" : "");
      ic.textContent = " ✦";
      nameEl.appendChild(ic);
    }
    label.appendChild(nameEl);
    if (person.dates) {
      const dEl = document.createElement("span");
      dEl.className = "dates"; dEl.textContent = person.dates;
      label.appendChild(dEl);
    }
    if (person.title) {
      const tEl = document.createElement("span");
      tEl.className = "title"; tEl.textContent = person.title;
      label.appendChild(tEl);
    }
    div.appendChild(label);
    nodesLayer.appendChild(div);

    div.addEventListener("mouseenter", () => hilite(person.id, true));
    div.addEventListener("mouseleave", () => hilite(person.id, false));
    div.addEventListener("click", () => {
      if (didDrag) return;
      openPanel(person);
    });

    let tapOrigin = null;
    div.addEventListener("touchstart", e => {
      tapOrigin = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
    div.addEventListener("touchend", e => {
      if (!tapOrigin) return;
      const dx = e.changedTouches[0].clientX - tapOrigin.x;
      const dy = e.changedTouches[0].clientY - tapOrigin.y;
      tapOrigin = null;
      if (Math.hypot(dx, dy) < 12) openPanel(person);
    });
  });

  /* ── Star legend ──────────────────────────────────────────────── */
  const starLegend  = document.getElementById("star-legend");
  let   _starTimer  = null;

  function positionStarLegend(e) {
    starLegend.style.left = e.clientX + "px";
    starLegend.style.top  = (e.clientY - 50) + "px";
  }

  document.querySelectorAll(".node-star").forEach(star => {
    star.addEventListener("mouseenter", e => {
      clearTimeout(_starTimer);
      positionStarLegend(e);
      starLegend.classList.add("visible");
    });
    star.addEventListener("mousemove", positionStarLegend);
    star.addEventListener("mouseleave", () => {
      _starTimer = setTimeout(() => starLegend.classList.remove("visible"), 120);
    });
  });

  function moveTip(e) {
    tooltip.style.left = (e.clientX + 14) + "px";
    tooltip.style.top  = (e.clientY -  8) + "px";
  }

  function hilite(id, on) {
    svg.querySelectorAll("g[data-from]").forEach(g => {
      const active = g.dataset.from === id || g.dataset.to === id;
      g.style.opacity = on ? (active ? "1" : "0.25") : "1";
    });
    document.querySelectorAll(".node").forEach(n => {
      const nid = n.dataset.id;
      const linked = connections.some(c =>
        (c.from === id && c.to === nid) || (c.to === id && c.from === nid));
      n.style.opacity = (on && !linked && nid !== id) ? "0.45" : "1";
    });
  }

  /* ── WHEEL ZOOM ───────────────────────────── */
  viewport.addEventListener("wheel", e => {
    e.preventDefault();
    const factor   = Math.exp(-e.deltaY * 0.001);
    const newScale = clamp(state.scale * factor, MIN_SCALE, MAX_SCALE);
    const rect = viewport.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const cx = (mx - state.tx) / state.scale;
    const cy = (my - state.ty) / state.scale;
    applyTransform(mx - cx * newScale, my - cy * newScale, newScale);
  }, { passive: false });

  /* ── MOUSE DRAG ───────────────────────────── */
  let drag = null;
  let didDrag = false;
  viewport.addEventListener("mousedown", e => {
    if (e.button !== 0) return;
    drag = { ox: e.clientX - state.tx, oy: e.clientY - state.ty };
    didDrag = false;
    viewport.classList.add("dragging");
  });
  window.addEventListener("mousemove", e => {
    if (!drag) return;
    didDrag = true;
    applyTransform(e.clientX - drag.ox, e.clientY - drag.oy, state.scale);
  });
  window.addEventListener("mouseup", () => {
    drag = null;
    viewport.classList.remove("dragging");
  });

  /* ── TOUCH PAN + PINCH ZOOM ───────────────── */
  let touch0 = null;
  viewport.addEventListener("touchstart", e => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touch0 = { type:"pan", ox: t.clientX - state.tx, oy: t.clientY - state.ty };
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0], t2 = e.touches[1];
      touch0 = {
        type: "pinch",
        dist: Math.hypot(t2.clientX-t1.clientX, t2.clientY-t1.clientY),
        cx: (t1.clientX+t2.clientX)/2, cy: (t1.clientY+t2.clientY)/2,
        tx: state.tx, ty: state.ty, scale: state.scale
      };
    }
  }, { passive: false });
  viewport.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!touch0) return;
    if (touch0.type === "pan" && e.touches.length === 1) {
      const t = e.touches[0];
      applyTransform(t.clientX - touch0.ox, t.clientY - touch0.oy, state.scale);
    } else if (touch0.type === "pinch" && e.touches.length === 2) {
      const t1 = e.touches[0], t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX-t1.clientX, t2.clientY-t1.clientY);
      const newScale = clamp(touch0.scale * dist / touch0.dist, MIN_SCALE, MAX_SCALE);
      const cx = (touch0.cx - touch0.tx) / touch0.scale;
      const cy = (touch0.cy - touch0.ty) / touch0.scale;
      applyTransform(touch0.cx - cx*newScale, touch0.cy - cy*newScale, newScale);
    }
  }, { passive: false });
  viewport.addEventListener("touchend", () => { touch0 = null; });

  /* ── DOUBLE-CLICK ZOOM IN ─────────────────── */
  viewport.addEventListener("dblclick", e => {
    // Prevent triggering on node double-click
    if (e.target.closest(".node")) return;
    const rect = viewport.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const cx = (mx - state.tx) / state.scale;
    const cy = (my - state.ty) / state.scale;
    const newScale = clamp(state.scale * 1.6, MIN_SCALE, MAX_SCALE);
    applyTransform(mx - cx*newScale, my - cy*newScale, newScale);
  });

  /* ── RESET BUTTON ─────────────────────────── */
  document.getElementById("btn-reset").addEventListener("click", initView);

  /* ── SIDE PANEL ───────────────────────────── */
  const panel      = document.getElementById("side-panel");
  const panelClose = document.getElementById("panel-close");
  let   currentPanelId = null;

  function closePanel() {
    panel.classList.remove("open");
    document.querySelectorAll(".node.pulsing").forEach(n => n.classList.remove("pulsing"));
    currentPanelId = null;
  }

  panelClose.addEventListener("click", closePanel);

  /* ── Sheet drag-to-dismiss (mobile bottom sheet only) ─────────── */
  let sheetDrag = null;
  const DISMISS_PX = 110;   // px dragged down to trigger dismiss
  const DISMISS_VY = 0.45;  // px/ms velocity to trigger dismiss

  panel.addEventListener("touchstart", e => {
    if (window.innerWidth > 680) return;
    const fromHandle  = !!e.target.closest("#panel-handle, #panel-header");
    const fromContent = !!e.target.closest("#panel-scroll-area");
    const scrollArea  = document.getElementById("panel-scroll-area");
    // Start drag from handle/header, or from content only when scrolled to very top
    if (!fromHandle && !(fromContent && scrollArea.scrollTop <= 0)) return;
    sheetDrag = { startY: e.touches[0].clientY, startTime: Date.now(), y: 0 };
  }, { passive: false });

  panel.addEventListener("touchmove", e => {
    if (!sheetDrag) return;
    const dy = e.touches[0].clientY - sheetDrag.startY;
    if (dy < 0) { sheetDrag = null; return; } // upward swipe → abort, let content scroll
    sheetDrag.y = dy;
    panel.style.transition = "none";
    panel.style.transform  = `translateY(${dy}px)`;
    e.preventDefault(); // block viewport pan while dragging the sheet
  }, { passive: false });

  panel.addEventListener("touchend", () => {
    if (!sheetDrag) return;
    const { y, startTime } = sheetDrag;
    const vel = y / Math.max(1, Date.now() - startTime);
    sheetDrag = null;

    if (y > DISMISS_PX || vel > DISMISS_VY) {
      // Fast-dismiss: animate out then clean up
      panel.style.transition = "transform 0.26s cubic-bezier(0.4,0,1,1)";
      panel.style.transform  = "translateY(100%)";
      setTimeout(() => {
        closePanel();
        panel.style.transform  = "";
        panel.style.transition = "";
      }, 260);
    } else {
      // Snap back to open position
      panel.style.transition = "transform 0.3s cubic-bezier(0.25,0.8,0.25,1)";
      panel.style.transform  = "translateY(0)";
      setTimeout(() => {
        panel.style.transform  = "";
        panel.style.transition = "";
      }, 300);
    }
  });

  // Glow colours indexed by generation
  const genBorder = [
    "rgba(210,160,28,0.65)", "rgba(210,160,28,0.52)",
    "rgba(90,130,210,0.52)", "rgba(140,100,190,0.48)",
    "rgba(110,78,150,0.44)", "rgba(90,65,130,0.38)", "rgba(70,52,110,0.32)"
  ];
  const genGlow = [
    "rgba(210,160,28,0.38)", "rgba(210,160,28,0.28)",
    "rgba(90,130,210,0.28)", "rgba(140,100,190,0.24)",
    "rgba(110,78,150,0.20)", "rgba(90,65,130,0.17)", "rgba(70,52,110,0.14)"
  ];

  function openPanel(person) {
    if (currentPanelId === person.id) { closePanel(); return; }
    currentPanelId = person.id;

    const avatar  = document.getElementById("panel-avatar");
    const nameEl  = document.getElementById("panel-name");
    const datesEl = document.getElementById("panel-dates");
    const titleEl = document.getElementById("panel-title");
    const bioEl   = document.getElementById("panel-bio");

    avatar.innerHTML = "";
    if (person.photo) {
      const img = document.createElement("img");
      img.src = person.photo; img.alt = person.name;
      avatar.appendChild(img);
    } else {
      const w = person.name.split(" ");
      avatar.textContent = w.length >= 2
        ? (w[0][0] + w[w.length - 1][0]).toUpperCase()
        : w[0].slice(0, 2).toUpperCase();
    }

    const g = Math.min(person.gen, genBorder.length - 1);
    avatar.style.borderColor = genBorder[g];
    avatar.style.boxShadow   = `0 0 20px ${genGlow[g]}`;

    nameEl.textContent  = person.name;
    datesEl.textContent = person.dates || "";
    titleEl.textContent = person.title || "";
    bioEl.textContent   = bios[person.id] || "";

    // Pulse ring on active node, then send wave through the tree
    document.querySelectorAll(".node.pulsing").forEach(n => n.classList.remove("pulsing"));
    document.querySelector(`.node[data-id="${person.id}"]`)?.classList.add("pulsing");
    triggerPulse(person.id);

    panel.classList.add("open");
    // Let the panel transition start, then size the thumb correctly
    requestAnimationFrame(() => requestAnimationFrame(syncThumb));
  }

  /* ── Custom scrollbar ─────────────────────────────────────────── */
  const scrollArea = document.getElementById("panel-scroll-area");
  const sbThumb    = document.getElementById("panel-scrollbar-thumb");
  let   sbDrag     = null;

  function syncThumb() {
    const { scrollTop, scrollHeight, clientHeight } = scrollArea;
    const scrollable = scrollHeight > clientHeight + 1;
    sbThumb.style.display = scrollable ? "block" : "none";
    if (!scrollable) return;
    const ratio   = scrollTop / (scrollHeight - clientHeight);
    const thumbH  = Math.max(28, (clientHeight / scrollHeight) * clientHeight);
    sbThumb.style.height = thumbH + "px";
    sbThumb.style.top    = (ratio * (clientHeight - thumbH)) + "px";
  }

  scrollArea.addEventListener("scroll", syncThumb);
  new ResizeObserver(syncThumb).observe(scrollArea);

  // Drag thumb
  sbThumb.addEventListener("mousedown", e => {
    sbDrag = { startY: e.clientY, startScroll: scrollArea.scrollTop };
    e.preventDefault();
  });
  window.addEventListener("mousemove", e => {
    if (!sbDrag) return;
    const thumbH      = parseFloat(sbThumb.style.height) || 28;
    const scrollRatio = (e.clientY - sbDrag.startY) / (scrollArea.clientHeight - thumbH);
    scrollArea.scrollTop = sbDrag.startScroll + scrollRatio * (scrollArea.scrollHeight - scrollArea.clientHeight);
  });
  window.addEventListener("mouseup", () => { sbDrag = null; });

  // Click track to jump
  document.getElementById("panel-scrollbar").addEventListener("click", e => {
    if (e.target === sbThumb) return;
    const rect   = e.currentTarget.getBoundingClientRect();
    const ratio  = (e.clientY - rect.top) / rect.height;
    scrollArea.scrollTop = ratio * (scrollArea.scrollHeight - scrollArea.clientHeight);
  });

  /* ── Comet scheduler ──────────────────────────────────────────── */
  (function scheduleComets() {
    const ids = ["comet-1", "comet-2", "comet-3"];
    let next = 0;
    function fire() {
      const el = document.getElementById(ids[next % ids.length]);
      next++;
      el.classList.add("flying");
      el.addEventListener("animationend", () => el.classList.remove("flying"), { once: true });
      setTimeout(fire, 28000 + Math.random() * 52000); // next in 28–80 s
    }
    setTimeout(fire, 10000 + Math.random() * 15000);   // first comet 10–25 s after load
  })();
});

/* ── STAR FIELD ──────────────────────────────────────────────────────────── */
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* Blurred ellipses scattered across the full canvas so every region has depth */
function generateNebulae(svg) {
  // [cx, cy, rx, ry, fill, opacity]
  const patches = [
    // ── Core fan-chart area ──────────────────────────────────────────
    [3000, 4900,  820, 620,  "#b87018", 0.20],  // Vensi — warm amber core
    [3000, 4600, 1500, 1100, "#201460", 0.28],  // large purple base
    [2700, 3900,  820, 600,  "#1425a8", 0.22],  // left-upper blue
    [3300, 3900,  820, 600,  "#1c14a8", 0.20],  // right-upper blue-purple
    [3000, 3100, 1100, 750,  "#0e1e8a", 0.24],  // top-center deep blue
    [2200, 3300,  680, 500,  "#162460", 0.18],  // left mid
    [3800, 3300,  680, 500,  "#161460", 0.17],  // right mid
    [2800, 2400,  580, 400,  "#0e1870", 0.20],  // upper left
    [3200, 2300,  580, 400,  "#160e70", 0.18],  // upper right
    // ── Edges — make roaming interesting ────────────────────────────
    [ 900, 3600,  520, 360,  "#0c1660", 0.15],  // far left
    [4700, 3600,  520, 360,  "#0c1460", 0.14],  // far right
    [1100, 1900,  600, 400,  "#0a1250", 0.13],  // upper-far-left
    [4500, 1800,  600, 400,  "#0a1250", 0.13],  // upper-far-right
    [3000,  700,  850, 520,  "#091040", 0.13],  // very top center
    [ 500, 2700,  380, 280,  "#080e3a", 0.11],  // far-left mid
    [5100, 2700,  380, 280,  "#080e3a", 0.11],  // far-right mid
    [1400, 5100,  500, 340,  "#120e3c", 0.12],  // bottom left
    [4600, 5100,  500, 340,  "#100e3c", 0.11],  // bottom right
    // ── Corners — deep space colour so it never looks empty ─────────
    [ 350,  500,  380, 260,  "#07092e", 0.10],
    [5200,  380,  380, 260,  "#06082c", 0.09],
    [ 300, 4800,  320, 220,  "#08092e", 0.09],
    [5300, 4800,  320, 220,  "#06082c", 0.09],
    // ── Accent: faint reddish nebula off to the left ─────────────────
    [1600, 2800,  480, 320,  "#5c0e28", 0.08],
    // ── Accent: faint teal wisp upper right ──────────────────────────
    [4200, 1400,  400, 280,  "#083c48", 0.09],
    // ── Below Vensi — the 2200 px that were previously void ──────────
    [3000, 5300,  950, 680,  "#1a1040", 0.22],  // direct below, warm-purple
    [2500, 5700,  700, 480,  "#0e103a", 0.18],  // lower-left
    [3500, 5700,  700, 480,  "#0c0e38", 0.17],  // lower-right
    [3000, 6200,  850, 580,  "#090c30", 0.16],  // deeper below
    [1600, 6000,  520, 360,  "#080c2e", 0.13],  // far lower-left
    [4400, 6000,  520, 360,  "#08092c", 0.12],  // far lower-right
    [3000, 6700,  700, 460,  "#070a28", 0.12],  // near-bottom center
    [ 800, 6600,  400, 280,  "#060820", 0.09],  // bottom-left corner
    [5300, 6600,  400, 280,  "#060820", 0.09],  // bottom-right corner
  ];

  // Use radialGradient rects — no blur filter, fully GPU-composited
  const defsEl = svg.querySelector("defs");
  patches.forEach(([cx, cy, rx, ry, fill, opacity], i) => {
    const gid = `ng${i}`;
    const r   = Math.max(rx, ry) * 1.9;

    const grad = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    grad.setAttribute("id", gid);
    grad.setAttribute("gradientUnits", "userSpaceOnUse");
    grad.setAttribute("cx", cx); grad.setAttribute("cy", cy); grad.setAttribute("r", r);
    [[0, Math.min(1, opacity * 1.6)], [0.35, opacity], [0.70, opacity * 0.35], [1, 0]]
      .forEach(([off, op]) => {
        const s = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        s.setAttribute("offset", (off * 100) + "%");
        s.setAttribute("stop-color", fill);
        s.setAttribute("stop-opacity", Math.min(1, op).toFixed(3));
        grad.appendChild(s);
      });
    defsEl.appendChild(grad);

    const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    el.setAttribute("x",      (cx - r).toFixed(0));
    el.setAttribute("y",      (cy - r).toFixed(0));
    el.setAttribute("width",  (r * 2).toFixed(0));
    el.setAttribute("height", (r * 2).toFixed(0));
    el.setAttribute("fill",   `url(#${gid})`);
    svg.appendChild(el);
  });
}

function generateStarField(svg) {
  const rng   = mulberry32(9371);
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  // ── Regular stars (static, no animation) ─────────────────────────
  for (let i = 0; i < 480; i++) {
    const x    = rng() * CANVAS_W;
    const y    = rng() * CANVAS_H;
    const roll = rng();
    const r    = roll < 0.03 ? 2.5 : roll < 0.12 ? 1.6 : roll < 0.38 ? 1.0 : 0.5;
    const op   = (0.18 + rng() * 0.74).toFixed(2);
    const cr   = rng();
    let fill;
    if      (cr < 0.54) fill = `hsl(${210 + (rng()*30)|0},55%,93%)`;
    else if (cr < 0.76) fill = `hsl(${40  + (rng()*20)|0},40%,94%)`;
    else if (cr < 0.88) fill = "#f8f8ff";
    else if (cr < 0.95) fill = `hsl(${50  + (rng()*15)|0},72%,84%)`;
    else                 fill = `hsl(${16  + (rng()*14)|0},72%,78%)`;
    const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    star.setAttribute("cx", x.toFixed(1));
    star.setAttribute("cy", y.toFixed(1));
    star.setAttribute("r",  r);
    star.setAttribute("fill", fill);
    star.setAttribute("opacity", op);
    group.appendChild(star);
  }

  // ── Milky Way band — static diagonal river of dim fine stars ──────
  const rng2 = mulberry32(4421);
  for (let i = 0; i < 200; i++) {
    const t  = rng2();
    const bx = 400  + t * 4700;
    const by = 5000 - t * 4000 + (rng2() - 0.5) * 700;
    if (bx < 0 || bx > CANVAS_W || by < 0 || by > CANVAS_H) continue;
    const r  = rng2() < 0.75 ? 0.4 : 0.75;
    const op = (0.10 + rng2() * 0.32).toFixed(2);
    const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    star.setAttribute("cx", bx.toFixed(1));
    star.setAttribute("cy", by.toFixed(1));
    star.setAttribute("r",  r);
    star.setAttribute("fill", `hsl(${220 + (rng2()*20)|0},30%,90%)`);
    star.setAttribute("opacity", op);
    group.appendChild(star);
  }

  svg.appendChild(group);
}

/* ── MARRIAGE WEDGE — sector from child to two parents (arc at parent radius) */
function buildMarriageWedge(cx, cy, p1x, p1y, p2x, p2y) {
  const R = Math.round(Math.sqrt((p1x - CX) ** 2 + (p1y - CY) ** 2));
  // sweep=1 (clockwise in SVG) traces the arc away from Vensi (the outer arc)
  return `M ${cx} ${cy} L ${p1x} ${p1y} A ${R} ${R} 0 0 1 ${p2x} ${p2y} Z`;
}

/* ── RIBBON GEOMETRY — uniform-width curved band ──────────────────────────── */
function buildRibbon(x1, y1, x2, y2, w) {
  const dx = x2-x1, dy = y2-y1;
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const nx = -dy/len, ny = dx/len;
  const hw = w * 0.5;
  const bow = len * 0.05;
  const mx = (x1+x2)*0.5 + ny*bow, my = (y1+y2)*0.5 - nx*bow;
  const p0x=x1+nx*hw, p0y=y1+ny*hw, p1x=x1-nx*hw, p1y=y1-ny*hw;
  const p2x=x2+nx*hw, p2y=y2+ny*hw, p3x=x2-nx*hw, p3y=y2-ny*hw;
  const c0x=mx+nx*hw, c0y=my+ny*hw, c1x=mx-nx*hw, c1y=my-ny*hw;
  return [
    `M ${p0x.toFixed(1)} ${p0y.toFixed(1)}`,
    `Q ${c0x.toFixed(1)} ${c0y.toFixed(1)} ${p2x.toFixed(1)} ${p2y.toFixed(1)}`,
    `L ${p3x.toFixed(1)} ${p3y.toFixed(1)}`,
    `Q ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${p1x.toFixed(1)} ${p1y.toFixed(1)}`,
    `Z`
  ].join(" ");
}

/* ── TREE PULSE WAVE ─────────────────────────────────────────────────────────
   BFS from the tapped node outward. Each connection gets a white flash overlay
   timed by hop-distance; each node ring flares as the wave reaches it.        */
function triggerPulse(sourceId) {
  const svgEl = document.getElementById("ribbon-svg");

  // Clear any previous wave still in flight
  svgEl.querySelectorAll(".pulse-overlay").forEach(el => el.remove());
  document.querySelectorAll(".node.ring-flashing").forEach(n => n.classList.remove("ring-flashing"));

  // BFS — bidirectional so wave travels up AND down the tree
  const nodeDist = new Map([[sourceId, 0]]);
  const connDist = new Map();
  const queue    = [sourceId];

  while (queue.length) {
    const cur = queue.shift();
    const d   = nodeDist.get(cur);
    connections.forEach((c, i) => {
      const next = c.from === cur ? c.to
                 : c.to   === cur ? c.from
                 : null;
      if (next && !nodeDist.has(next)) {
        nodeDist.set(next, d + 1);
        connDist.set(i, d);
        queue.push(next);
      }
    });
  }

  const HOP_MS  = 260;   // ms between hops
  const FLASH_MS = 680;  // ms each flash lasts

  // ── Ribbon overlays ────────────────────────────────────────────────
  connections.forEach((c, i) => {
    const d   = connDist.get(i) ?? 0;
    const str = Math.max(0.10, 1 - d * 0.16); // fades with distance

    const g = svgEl.querySelector(`g[data-from="${c.from}"][data-to="${c.to}"]`);
    if (!g) return;
    const srcPath = g.querySelector("path");
    if (!srcPath) return;

    const ov = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ov.setAttribute("d",               srcPath.getAttribute("d"));
    ov.setAttribute("fill",            `rgba(255,255,255,${(str * 0.26).toFixed(3)})`);
    ov.setAttribute("stroke",          `rgba(255,255,255,${(str * 0.50).toFixed(3)})`);
    ov.setAttribute("stroke-width",    "2.5");
    ov.setAttribute("pointer-events",  "none");
    ov.classList.add("pulse-overlay");
    ov.style.animation = `pulse-flash ${FLASH_MS}ms ease-out ${d * HOP_MS}ms both`;
    svgEl.appendChild(ov);
    ov.addEventListener("animationend", () => ov.remove(), { once: true });
  });

  // ── Node ring flares ───────────────────────────────────────────────
  nodeDist.forEach((d, nodeId) => {
    if (d === 0) return; // source already shows .pulsing glow
    setTimeout(() => {
      const el = document.querySelector(`.node[data-id="${nodeId}"]`);
      if (!el) return;
      el.classList.add("ring-flashing");
      setTimeout(() => el.classList.remove("ring-flashing"), FLASH_MS + 60);
    }, d * HOP_MS);
  });
}
