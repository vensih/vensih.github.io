# perllogarit Design Framework

## Overview

perllogarit is a multi-calculator platform for Albanian financial tools. All pages share a glassmorphism aesthetic: frosted semi-transparent cards floating over a soft gradient background with colored orbs. The single shared stylesheet is `css/style.css`. Calculator pages extend the shared system with inline calculator-specific styles only.

---

## Visual Language

**Glassmorphism rules:**
- Cards: `background: rgba(255,255,255,.55)` + `backdrop-filter: blur(22px) saturate(180%)`
- Borders: `rgba(255,255,255,.75)` — light, not harsh
- Shadows: soft ambient, not punchy
- Background: gradient base + 3 fixed blurred orbs (indigo, blue, violet)
- Nav: stronger glass, `rgba(255,255,255,.78)` + blur(28px)

---

## Color Tokens

All defined in `css/style.css :root`:

| Token            | Value                      | Usage                                    |
|------------------|----------------------------|------------------------------------------|
| `--blue`         | `#2563EB`                  | Primary actions, links, active states    |
| `--blue-dark`    | `#1D4ED8`                  | Hover on primary buttons                 |
| `--blue-mid`     | `#3B82F6`                  | Secondary accents                        |
| `--blue-light`   | `#EFF6FF`                  | Tinted boxes, tag chips                  |
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

Three fixed `div.bg-orb` elements placed at the top of `<body>` in every page. They stay fixed during scroll, creating depth behind glass panels.

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
| `--r-pill` | 999px  | Buttons, year selector, tags        |

---

## Shadow Tokens

| Token            | Value                                                          | Usage           |
|------------------|----------------------------------------------------------------|-----------------|
| `--shadow-card`  | `0 4px 24px rgba(15,23,42,.07), 0 1px 0 rgba(255,255,255,.6) inset` | Resting glass cards |
| `--shadow-hover` | `0 12px 40px rgba(15,23,42,.13), 0 1px 0 rgba(255,255,255,.6) inset` | Hovered cards |
| `--shadow-blue`  | `0 4px 18px rgba(37,99,235,.38)` | Primary button glow |

The `inset` white highlight at the top of cards reinforces the glass rim effect.

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
Sticky, frosted glass (`rgba(255,255,255,.78)` + `blur(28px) saturate(180%)`). Logo left — `perl` in `--navy`, `llogarit` in `--blue`. Links right, hidden on mobile.

### Hero (`.hero`)
Centered. Tag chip > H1 > subtitle > `.btn-primary`. Background comes from body gradient + orbs — no extra bg on hero itself.

### Calculator Card (`.calc-card`, home grid)
Full `<a>` tag for live calculators, `<div class="calc-card calc-card--soon">` for coming-soon. Contains: icon box > title > description > footer with link or `.badge-soon`. Cards lift on hover (`translateY(-4px)`) and glass intensifies.

### Page Header (`.page-header`)
Blue gradient glass (`rgba(37,99,235,.88)` to `rgba(29,78,216,.92)`), full width. Back link `&#8592; Kthehu` in muted white above H1. Inner content max-width 800px.

### Card Shell (`.card`)
Glass card (`--glass-bg`, `--glass-blur`, `--glass-border`, `--r-xl`). Optional `.card-header` with slightly stronger white fill. Content in `.card-body`.

### Buttons

- `.btn-primary`: Solid blue fill, pill shape, blue glow shadow, lifts on hover
- `.btn-ghost`: Semi-transparent glass, blue text + border, stronger glass on hover

### Footer (`.footer`)
Glass footer (`rgba(255,255,255,.6)` + blur(20px)), top glass border, centered text in `--gray`.

---

## Adding a New Calculator

1. Create `calculators/<slug>.html`
2. Copy the head block from `calculators/paga.html` — same fonts + `../css/style.css`
3. Paste the 3 bg-orb divs, nav, page-header, and footer from any existing calculator
4. Add inline `<style>` for page-specific styles only
5. Add a new `.calc-card` to the grid in `index.html` (remove `calc-card--soon` when ready)
6. Update `DESIGN.md` with any new semantic color or component introduced

---

## File Structure

```
perllogarit/
├── index.html                  Home page
├── DESIGN.md                   This file
├── css/
│   └── style.css               Shared design system (glassmorphism tokens + components)
└── calculators/
    ├── paga.html               Salary calculator (bruto/neto, 2025/2026, cliff detection)
    └── import-makine.html      Vehicle import tax (coming soon)
```
