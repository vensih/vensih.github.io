# perllogarit — Codebase Guide

Reference for anyone developing or auditing this project. Read this before editing anything.

---

## Project Structure

```
perllogarit/
├── css/
│   ├── style.css       — Global design system (tokens, nav, hero, footer, animations)
│   └── calc.css        — Shared calculator component styles (inputs, results, tables, badges, currency)
├── js/
│   ├── shared.js       — Shared JS: nav/FAB, tooltip, PL.* formatting utilities
│   ├── paga.js         — Salary calculator engine (ALL + EUR)
│   ├── sig.js          — Social insurance calculator engine (ALL + EUR)
│   ├── mak.js          — Vehicle import tax calculator engine (ALL + EUR)
│   ├── qir.js          — Rental income tax calculator engine (ALL + EUR)
│   ├── tvsh.js         — VAT calculator engine (ALL + EUR)
│   └── div.js          — Dividend tax calculator engine (ALL + EUR)
├── icons/
│   ├── css/bold/
│   │   └── rounded.css — UIcons font CSS (155 KB, do not edit)
│   └── zg/
│       └── ic-kofi.png — Ko-fi donation button image
├── calculators/
│   ├── paga.html       — Salary calculator (bruto/neto, 2025/2026)
│   ├── sigurime.html   — Social insurance for self-employed
│   ├── makina.html     — Vehicle import customs tax
│   ├── qiraja.html     — Rental income tax
│   ├── tvsh.html       — VAT calculator (20% / 6%)
│   └── dividende.html  — Dividend tax
├── index.html          — Homepage (hero + featured calculators + live rates)
├── llogaritesit.html   — Calculator directory (all calculators grid)
├── rreth-nesh.html     — About page
├── kushtet-e-perdorimit.html — Terms of use
├── md/
│   ├── DESIGN.md           — Visual design documentation
│   ├── MAINTENANCE.md      — This file
│   ├── CODEMAP.md          — Code navigation guide (functions, IDs, patterns)
│   └── analytics-plan.md   — Planned GA4 integration (not yet implemented)
```

---

## How the CSS is Organized

| File | Purpose | Loaded by |
|---|---|---|
| `css/style.css` | Global tokens, nav, hero, footer, animations, layout | Every page |
| `css/calc.css` | Calculator UI components (inputs, results, tables, currency) | `/calculators/*.html` only |
| `<style>` block in page | Truly unique styles for that page | That page only |

**Rule:** If a CSS class appears in 2+ calculator files, it belongs in `calc.css`. If it's one page only, keep it in that page's inline `<style>`.

---

## How shared.js Works

`js/shared.js` is loaded with `defer` by every page that has a nav/FAB. It provides:

- `toggleMenu()` — global function for the hamburger button's `onclick=""` attribute
- FAB auto-dim after 10 s of inactivity
- Nav link close handler (closes FAB when a link is tapped)
- Tooltip toggle for `.tip` elements
- **Footer injection** — finds `<div id="site-footer"></div>` and replaces it with the full `<footer>` HTML. Detects root vs `calculators/` depth via `window.location.pathname` and adjusts all relative paths accordingly. To update the footer across every page, edit only this function in `shared.js`.
- `window.PL` — formatting utilities:
  - `PL.fmtALL(n)` → `"1,234 ALL"` (ALL-only, for legacy use)
  - `PL.fmtNum(n)` → `"1,234"` (number only, no currency suffix)
  - `PL.fmt(n, currency)` → `"1,234 ALL"` or `"12.50 EUR"` (currency-aware)
  - `PL.fmtN(n, currency)` → `"1,234"` or `"12.50"` (number only, currency-aware)

Calculator pages use thin local wrappers tied to the active currency:
```javascript
function fmt(n)  { return PL.fmt(n, currency); }
function fmtN(n) { return PL.fmtN(n, currency); }
```

---

## Currency Pattern (All Calculators)

Every calculator supports at least ALL and EUR. The UI pattern is:

**HTML:**
```html
<div class="ccy-label-row">
  <label class="field-label" id="my-label">Label Text</label>
  <div class="ccy-pills">
    <button class="ccy-pill active" id="opt-all" onclick="setCurrency('ALL')">ALL</button>
    <button class="ccy-pill"        id="opt-eur" onclick="setCurrency('EUR')">EUR</button>
  </div>
</div>
<div class="input-row input-row--ccy">
  <input type="number" id="my-input" placeholder="p.sh. 67 420" ...>
  <span class="input-ccy-unit" id="currency-unit">ALL</span>
</div>
```

**JS pattern:**
```javascript
const EUR_TO_ALL = 95.30;
let currency = 'ALL';

function fmt(n)     { return PL.fmt(n, currency); }
function fmtN(n)    { return PL.fmtN(n, currency); }
function toALL(v)   { return currency === 'EUR' ? v * EUR_TO_ALL : v; }
function fromALL(v) { return currency === 'EUR' ? v / EUR_TO_ALL : v; }

function setCurrency(c) {
  currency = c;
  document.getElementById('currency-unit').textContent = c;
  document.querySelectorAll('.ccy-pill').forEach(function(btn) {
    btn.classList.toggle('active', btn.id === 'opt-' + c.toLowerCase());
  });
  document.getElementById('my-input').placeholder = 'p.sh. 67 420';
  calculate();
}
```

**Conversion rule for calculators with ALL-denominated thresholds (paga, sig):**
- Convert input to ALL before calculation: `const rawALL = toALL(raw)`
- Calculate entirely in ALL
- Convert results back for display: `fmt(fromALL(value))`
- Keep formula columns (e.g. `50,000 × 9.5%`) in ALL since they reference regulatory values

**For calculators where the formula is currency-agnostic (qiraja, dividende, tvsh):**
- No conversion needed — the percentage applies to whatever currency is entered
- `fmt(result)` handles display automatically

**Adding more currencies to a calculator:**
1. Add a new `<button class="ccy-pill" id="opt-xxx" onclick="setCurrency('XXX')">XXX</button>` in the HTML
2. Add the exchange rate constant
3. Update `toALL`/`fromALL` to handle the new currency
4. No other JS changes needed — `setCurrency` uses `querySelectorAll` and works for any number of pills

---

## How to Add a New Calculator

1. **Copy an existing calculator** as a starting point. `tvsh.html` or `dividende.html` are the simplest.
2. **Update the `<head>`** — keep the three link/script lines:
   ```html
   <link rel="stylesheet" href="../css/style.css">
   <link rel="stylesheet" href="../css/calc.css">
   <script src="../js/shared.js" defer></script>
   ```
3. **Create `js/X.js`** for the calculator engine. Use the abbreviated naming pattern (`sig`, `mak`, `qir`, `div`). Use `PL.*` for formatting, do not duplicate `toggleMenu`/FAB/tooltip.
4. **Add a fourth `<script>` line** in the HTML `<head>`:
   ```html
   <script src="../js/X.js" defer></script>
   ```
5. **Use the currency pattern** described above — do not use `.year-wrap` for currency toggles.
6. **Add a `<style>` block** only if you need CSS beyond what `calc.css` provides.
7. **Register the calculator** in:
   - `llogaritesit.html` — add a `.calc-card`
   - `js/shared.js` footer function — add a link in the Llogaritësit column (one edit updates every page)
8. **Activate the card** in `llogaritesit.html` — remove `calc-card--soon` class, update the `href`.

---

## How to Edit an Existing Calculator

- **Change a tax rate or formula:** Edit the `const` values at the top of the calculator's `js/X.js` file.
- **Update the EUR exchange rate:** Change `EUR_TO_ALL` in the relevant JS file. All 6 calculators define it independently.
- **Add a new year's data:** Add to the `YEAR_DATA` object and update the year buttons. For makina, update `CFG.REFS` and `CFG.CURRENT_YEAR`.
- **Change component styling:** Check if the class is in `calc.css` (shared) or the page's inline `<style>`. Edit the correct file.
- **Add a new input field:** Use `.input-row` + `.field-label` pattern.
- **Add currency support to a new field:** Use `.input-row--ccy` + `.input-ccy-unit` pattern.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Calculator pages | lowercase Albanian noun | `qiraja.html`, `dividende.html` |
| CSS classes | BEM-lite with dashes | `.calc-card--soon`, `.result-box` |
| JS state vars | camelCase | `selectedYear`, `familyCount` |
| JS constants | SCREAMING_SNAKE | `TAX_RATE`, `SS_EMP`, `EUR_TO_ALL` |
| Calculator HTML IDs | kebab-case | `#breakdown-body`, `#result-val` |
| Currency pill IDs | `opt-` + lowercase code | `#opt-all`, `#opt-eur`, `#opt-usd` |

---

## GitHub Pages Path Rules

- All paths must be **relative**, never absolute (`../css/style.css` not `/css/style.css`).
- Calculator pages are in `/calculators/`, so they use `../` prefix.
- Root pages use no prefix.
- Never use `localhost`, `file://`, or server-dependent paths.

---

## Auditing for Dead Code

**Unused CSS:**
```
grep -r "class=\"[^\"]*CLASSNAME" . --include="*.html"
```

**Unused JS functions:**
Search for the function name across all HTML files. If only the definition appears, it's dead.

**Broken links:** Open pages in browser, check Network tab for 404s.

**Console errors:** Open browser DevTools on each calculator page, run a calculation, check for errors.

---

## Browser Compatibility

The site targets all modern browsers including Safari. Rules to follow:

- Always write `-webkit-backdrop-filter` **before** `backdrop-filter` — Safari requires the prefix.
- Always write `-webkit-user-select` before `user-select`.
- Always write `-webkit-hyphens` before `hyphens`.
- `scrollbar-width` / `scrollbar-color` / `scrollbar-gutter` are not supported in Safari — they degrade gracefully (Safari shows its default scrollbar).
- `@property` (used for the Ko-fi button animation) requires Safari 16.4+. The button is still functional in older Safari, just without the animated border.

---

## What NOT to Do

- **No backend code.** This is 100% static.
- **No build tools** (webpack, Vite, etc.).
- **No npm packages.**
- **No duplicate inline JS.** FAB, hamburger, and tooltip are in `shared.js`.
- **No absolute paths** (`/css/style.css`).
- **Don't use `.year-wrap` for currency toggles** — use the `.ccy-label-row` / `.ccy-pills` pattern.
- **Don't hardcode currency suffixes** in JS strings — use `fmt()` / `fmtN()` wrappers.
- **Don't silently change formulas.** Flag in a PR if a formula looks wrong.
- **Don't add `console.log` to production code.**
- **Don't inline large CSS blocks** that belong in `calc.css`.

---

## Testing Before Deployment

1. Open `index.html` — verify currency rates load, hero animations play
2. Open each of the 6 calculator pages, run a calculation in ALL and then switch to EUR — verify results convert correctly
3. Open `llogaritesit.html` — scroll down, verify reveal animation works
4. Open `rreth-nesh.html` — scroll down, verify card animation works
5. Resize browser to ≤480px — verify mobile layout and FAB hamburger work
6. Check browser DevTools Console — no errors on any page
7. Test on a mobile device or via DevTools mobile emulation

The site should work correctly when opened from `file://` locally and when served from GitHub Pages.
