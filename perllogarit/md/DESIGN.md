# perllogarit Design Framework

## Overview

perllogarit is a multi-calculator platform for Albanian financial tools. All pages share a glassmorphism aesthetic: frosted semi-transparent cards floating over a soft gradient background with colored orbs. The single shared stylesheet is `css/style.css`. Calculator pages extend the shared system with `css/calc.css` and inline calculator-specific styles only.

---

## Visual Language

**Glassmorphism rules:**
- Cards: `background: rgba(255,255,255,.55)` + `-webkit-backdrop-filter: blur(22px) saturate(180%); backdrop-filter: blur(22px) saturate(180%)`
- Borders: `rgba(255,255,255,.75)` — light, not harsh
- Shadows: soft ambient, not punchy
- Background: gradient base + 3 fixed blurred orbs (indigo, blue, violet)
- Nav: stronger glass, `rgba(255,255,255,.78)` + blur(28px)
- Always write `-webkit-backdrop-filter` before `backdrop-filter` for Safari support

---

## Color Tokens

All defined in `css/style.css :root`:

| Token            | Value                      | Usage                                    |
|------------------|----------------------------|------------------------------------------|
| `--blue`         | `#2563EB`                  | Primary actions, links, active states    |
| `--blue-dark`    | `#1D4ED8`                  | Hover on primary buttons                 |
| `--blue-mid`     | `#3B82F6`                  | Secondary accents                        |
| `--blue-light`   | `#EFF6FF`                  | Tinted boxes, tag chips, active pill bg  |
| `--blue-border`  | `#BFDBFE`                  | Borders on blue-tinted elements          |
| `--blue-glow`    | `rgba(37,99,235,.35)`      | Button box-shadow                        |
| `--navy`         | `#0F172A`                  | Headings, primary body text              |
| `--gray`         | `#64748B`                  | Secondary text, labels, descriptions     |
| `--gray-light`   | `#F8FAFC`                  | Fallback for sub-backgrounds             |
| `--border`       | `#E2E8F0`                  | Default solid borders                    |
| `--white`        | `#FFFFFF`                  | Surfaces before glass treatment          |
| `--glass-bg`     | `rgba(255,255,255,.55)`    | Standard glass card background           |
| `--glass-bg-hi`  | `rgba(255,255,255,.72)`    | Hovered glass card background            |
| `--glass-border` | `rgba(255,255,255,.75)`    | Standard glass card border               |
| `--glass-blur`   | `blur(22px) saturate(180%)`| Standard glass blur token                |

### Semantic colors (calculator pages only, defined inline)

| Token             | Value     | Usage                                  |
|-------------------|-----------|----------------------------------------|
| `--green`         | `#2E7D32` | Net salary (positive outcome)          |
| `--green-light`   | `#E8F5E9` | Result box bg                          |
| `--green-border`  | `#A5D6A7` | Result box border                      |
| `--red`           | `#C62828` | Deductions (money taken away)          |
| `--red-light`     | `#FFEBEE` | Deduction badge bg                     |
| `--purple`        | `#6A1B9A` | Employer cost section                  |
| `--purple-light`  | `#F3E5F5` | Employer box bg                        |
| `--purple-border` | `#CE93D8` | Employer box border                    |
| `--orange`        | `#E65100` | Warnings, cliff effect alert           |
| `--orange-light`  | `#FFF3E0` | Warning box bg                         |

---

## Background Orbs

Three fixed `div.bg-orb` elements placed at the top of `<body>` in every page.

```html
<div class="bg-orb bg-orb-1"></div>
<div class="bg-orb bg-orb-2"></div>
<div class="bg-orb bg-orb-3"></div>
```

| Class       | Position          | Color              | Size    |
|-------------|-------------------|--------------------|---------|
| `bg-orb-1`  | top-left          | indigo (rgba 99,102,241,.28) | 560px |
| `bg-orb-2`  | bottom-right      | blue (rgba 59,130,246,.22)   | 440px |
| `bg-orb-3`  | center-right      | violet (rgba 139,92,246,.15) | 320px |

---

## Typography

**Font:** Outfit (Google Fonts), weights 300/400/500/600/700/800/900.

Import pattern (every page head):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

| Role         | Size     | Weight | Where                          |
|--------------|----------|--------|--------------------------------|
| hero title   | 3.25rem  | 800    | Home hero                      |
| page h1      | 1.65rem  | 800    | Calculator page headers        |
| section h2   | 2rem     | 800    | Home section titles            |
| card title   | 1.1rem   | 700    | Calculator cards               |
| body         | 15px     | 400    | Default copy                   |
| label        | .82rem   | 700    | Form labels                    |
| small / tag  | .75-.77rem | 700  | Badges, section labels         |
| input value  | 1.5rem   | 700    | Main number input              |
| currency pill | .84rem  | 700    | `.ccy-pill` buttons            |
| currency unit | 1.1rem  | 800    | `.input-ccy-unit` inside input |

---

## Spacing Scale (4px base)

| Name | Value |
|------|-------|
| xs   | 4px   |
| sm   | 8px   |
| md   | 16px  |
| lg   | 24px  |
| xl   | 40px  |
| 2xl  | 64px  |

---

## Border Radius Tokens

| Token      | Value  | Usage                               |
|------------|--------|-------------------------------------|
| `--r-sm`   | 8px    | Small badges, tiny boxes            |
| `--r-md`   | 12px   | Inputs, toggles, inner glass panels |
| `--r-lg`   | 18px   | Cards, page-header inner content    |
| `--r-xl`   | 24px   | Main cards, calc-cards on home      |
| `--r-pill` | 999px  | Buttons, year selector, tags, pills |

---

## Shadow Tokens

| Token            | Value                                                          | Usage           |
|------------------|----------------------------------------------------------------|-----------------|
| `--shadow-card`  | `0 4px 24px rgba(15,23,42,.07), 0 1px 0 rgba(255,255,255,.6) inset` | Resting glass cards |
| `--shadow-hover` | `0 12px 40px rgba(15,23,42,.13), 0 1px 0 rgba(255,255,255,.6) inset` | Hovered cards |
| `--shadow-blue`  | `0 4px 18px rgba(37,99,235,.38)` | Primary button glow |

---

## Layout

| Context          | Max-width | Class              |
|------------------|-----------|--------------------|
| Home page        | 1100px    | `.container`       |
| Calculator pages | 800px     | `.calc-container`  |
| Gutter           | 1.5rem    | padding-inline     |

---

## Component Patterns

### Nav (`.nav`)
Sticky, frosted glass. Logo left — `perl` in `--navy`, `llogarit` in `--blue`. Links right, hidden on mobile.

### Hero (`.hero`)
Centered. Tag chip > H1 > subtitle > `.btn-primary`.

### Calculator Card (`.calc-card`, home grid)
Full `<a>` for live calculators, `<div class="calc-card calc-card--soon">` for coming-soon.

### Page Header (`.page-header`)
Blue gradient glass, full width. Back link above H1.

### Card Shell (`.card`)
Glass card with optional `.card-header` and `.card-body`.

### Buttons

- `.btn-primary`: Solid blue fill, pill shape, blue glow
- `.btn-ghost`: Semi-transparent glass, blue text + border

### Year / Mode Toggle (`.year-wrap` / `.toggle-wrap`)
Horizontal row of `.year-btn` or `.toggle-btn` pill buttons. Used for year selection (2025/2026) and bruto/neto mode. **Not used for currency** — see below.

### Currency Label Row (`.ccy-label-row`)
The standard currency picker pattern. Label and pills on the same line, blue unit text inside the input.

```html
<div class="ccy-label-row">
  <label class="field-label">Label</label>
  <div class="ccy-pills">
    <button class="ccy-pill active" id="opt-all" onclick="setCurrency('ALL')">ALL</button>
    <button class="ccy-pill"        id="opt-eur" onclick="setCurrency('EUR')">EUR</button>
  </div>
</div>
<div class="input-row input-row--ccy">
  <input type="number" ...>
  <span class="input-ccy-unit" id="currency-unit">ALL</span>
</div>
```

- Active pill: `color: --blue`, `border-color: --blue-border`, `background: --blue-light`
- Inactive pill: `color: --gray`, transparent border
- Currency unit: `1.1rem / 800`, `color: --blue`, absolutely positioned right inside the input
- Adding more currencies = add more `<button class="ccy-pill">` — no JS changes required

### Footer (`.footer`)
Glass footer, centered text in `--gray`.

---

## Adding a New Calculator

1. Create `calculators/<slug>.html`
2. Copy the head block from any existing calculator — same fonts + `../css/style.css` + `../css/calc.css`
3. Paste the 3 bg-orb divs, nav, and page-header from any existing calculator
4. Add `<div id="site-footer"></div>` where the footer should appear — `shared.js` injects it automatically
5. Use `.ccy-label-row` + `.ccy-pills` for currency selection
6. Add a new `.calc-card` to the grid in `llogaritesit.html` and update the footer link list in `shared.js`
7. Update `DESIGN.md` with any new semantic color or component introduced
