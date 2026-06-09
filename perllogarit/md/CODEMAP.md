# perllogarit — Code Map

Quick reference for navigating the codebase. Use this to find functions, IDs, CSS classes, and patterns without grepping.

---

## Calculator Inventory

| Calculator | HTML | JS | Currencies | Mode toggle |
|---|---|---|---|---|
| Salary | `calculators/paga.html` | `js/paga.js` | ALL, EUR | bruto / neto |
| Social Insurance | `calculators/sigurime.html` | `js/sig.js` | ALL, EUR | — |
| Vehicle Import | `calculators/makina.html` | `js/mak.js` | ALL, EUR | — |
| Rental Income | `calculators/qiraja.html` | `js/qir.js` | ALL, EUR | bruto / neto |
| VAT | `calculators/tvsh.html` | `js/tvsh.js` | ALL, EUR | add / subtract |
| Dividend | `calculators/dividende.html` | `js/div.js` | ALL, EUR | bruto / neto |

---

## Key Functions by File

### `js/paga.js`
| Function | What it does |
|---|---|
| `calcFromGross(gross)` | Core tax engine — takes ALL gross, returns breakdown object |
| `netToGross(targetNet)` | Binary search reverse: ALL net → possible ALL gross values (handles cliff) |
| `renderResult(r)` | Writes all result/breakdown DOM from a breakdown object |
| `calculate()` | Reads input, converts to ALL, calls engine, renders |
| `setMode(m)` | Switches bruto/neto, updates labels and placeholder |
| `setCurrency(c)` | Switches ALL/EUR, updates pill active state + unit label |
| `setYear(yr)` | Loads year constants, updates quick-button labels |
| `setMinWage()` | Sets input to min wage in current currency |
| `setTavanSS()` | Sets input to SS cap in current currency |
| `changeDays(delta)` | Adjusts workdays stepper |
| `toggleEmpBox()` | Expands/collapses employer cost section |

### `js/sig.js`
| Function | What it does |
|---|---|
| `calc(rawBase, nFamily)` | Core engine — takes ALL base + family count, returns breakdown |
| `calculate()` | Reads input, converts to ALL, calls engine, renders |
| `setCurrency(c)` | Switches ALL/EUR |
| `setYear(yr)` | Loads year constants |
| `setMinWage()` | Sets input to min wage in current currency |
| `setMaxBase()` | Sets input to SS cap in current currency |
| `changeFamily(d)` | Adjusts family member stepper |

### `js/mak.js`
| Function | What it does |
|---|---|
| `calculate()` | Core customs tax calculation |
| `setCurrency(c)` | Switches ALL/EUR, updates pill + unit |
| `setCC(cc)` | Selects engine category (1400/1900/2500/2999/3000) |
| `setYearQuick(val)` | Sets production year to preset or 'retro' |
| `getRefAll(cc, yearStr)` | Returns depreciated reference value in ALL |
| `updateRefGrid()` | Refreshes the reference values card |
| `updateInfoAmounts()` | Updates luxury/admin fee display in current currency |

### `js/qir.js`
| Function | What it does |
|---|---|
| `calculate()` | Rental tax engine (15% rate) |
| `setCurrency(c)` | Switches ALL/EUR, updates pill + unit + quick amounts |
| `setMode(m)` | Switches bruto/neto |
| `setMonths(n)` | Sets period stepper |
| `setAmount(v)` | Sets input to quick amount |

### `js/tvsh.js`
| Function | What it does |
|---|---|
| `calculate()` | VAT engine |
| `setCurrency(c)` | Switches ALL/EUR, updates pill + unit + quick amounts |
| `setMode(m)` | Switches add/subtract |
| `setRate(r)` | Switches 20% / 6% rate |
| `setAmount(v)` | Sets input to quick amount |

### `js/div.js`
| Function | What it does |
|---|---|
| `calculate()` | Dividend tax engine (8% rate) |
| `setCurrency(c)` | Switches ALL/EUR, updates pill + unit + quick amounts |
| `setMode(m)` | Switches bruto/neto |
| `setAmount(v)` | Sets input to quick amount |

### `js/shared.js`
| Symbol | What it does |
|---|---|
| `toggleMenu()` | Opens/closes mobile FAB nav |
| `window.PL.fmt(n, ccy)` | Formats number with currency suffix (ALL or EUR) |
| `window.PL.fmtN(n, ccy)` | Formats number only, no suffix |
| `window.PL.fmtALL(n)` | Formats as ALL (legacy helper) |
| `window.PL.fmtNum(n)` | Formats as plain number |
| footer IIFE | Injects the shared `<footer>` into `<div id="site-footer">` — detects root vs `calculators/` depth and sets paths accordingly |

---

## Key HTML IDs by Calculator

### paga.html
| ID | Element |
|---|---|
| `salary-input` | Main number input |
| `currency-unit` | Blue currency label inside input |
| `opt-all`, `opt-eur` | Currency pills |
| `btn-bruto`, `btn-neto` | Mode toggle buttons |
| `btn-2025`, `btn-2026` | Year toggle buttons |
| `input-label` | Label (changes text with mode) |
| `result-val` | Primary result value |
| `result-title`, `result-sub` | Result box labels |
| `result-daily` | Daily pay line |
| `breakdown-body` | `<tbody>` of breakdown table |
| `cliff-warn` | Warning box (neto cliff effect) |
| `multi-result` | Second result box (cliff effect) |
| `alt-gross`, `alt-net`, `alt-cost` | Second result values |
| `emp-box` | Employer cost collapsible section |
| `emp-gross`, `emp-ss`, `emp-hi`, `emp-total` | Employer cost values |
| `daily-section` | Daily breakdown section |
| `daily-gross`, `daily-net` | Daily values |
| `btn-minwage-quick` | "Paga Min." quick button |

### sigurime.html
| ID | Element |
|---|---|
| `base-input` | Main number input |
| `currency-unit` | Blue currency label inside input |
| `opt-all`, `opt-eur` | Currency pills |
| `btn-2025`, `btn-2026` | Year toggle buttons |
| `result-val` | Primary result |
| `breakdown-body` | Breakdown tbody |
| `period-grid` | Monthly/quarterly/annual grid |
| `period-monthly`, `period-quarterly`, `period-annual` | Period values |
| `family-count` | Family member stepper input |
| `min-warn` | Below-minimum warning |
| `btn-minwage` | "Paga Min." quick button |

### makina.html
| ID | Element |
|---|---|
| `inp-price` | Price input |
| `currency-unit` | Blue currency label inside input |
| `opt-all`, `opt-eur` | Currency pills |
| `sel-year` | Production year input |
| `cc-1400` … `cc-3000` | CC category buttons |
| `res-val`, `res-title`, `res-sub`, `res-total` | Result box elements |
| `breakdown-body` | Breakdown tbody |
| `warn-ref` | Reference price warning |
| `retro-box` | RETRO section (shown when year=retro) |
| `rate-note-line` | EUR rate hint below input |
| `live-rate` | EUR rate value span |

### qiraja.html
| ID | Element |
|---|---|
| `rent-input` | Main input |
| `currency-unit` | Blue currency label |
| `opt-all`, `opt-eur` | Currency pills |
| `rent-label` | Label (changes with mode) |
| `btn-bruto`, `btn-neto` | Mode buttons |
| `result-net`, `result-tax-val` | Result values |
| `months-input` | Period stepper |
| `quick-amounts` | Quick amount row (rebuilt on currency change) |

### tvsh.html
| ID | Element |
|---|---|
| `price-input` | Main input |
| `currency-unit` | Blue currency label |
| `opt-all`, `opt-eur` | Currency pills |
| `price-label` | Label (changes with mode) |
| `btn-add`, `btn-sub` | Mode buttons |
| `btn-20`, `btn-6` | Rate buttons |
| `res-green-val`, `res-red-val` | Result values |
| `quick-amounts` | Quick amount row |

### dividende.html
| ID | Element |
|---|---|
| `div-input` | Main input |
| `currency-unit` | Blue currency label |
| `opt-all`, `opt-eur` | Currency pills |
| `div-label` | Label (changes with mode) |
| `btn-bruto`, `btn-neto` | Mode buttons |
| `result-net`, `result-tax-val` | Result values |
| `quick-amounts` | Quick amount row |

---

## CSS Classes Quick Reference

All shared classes live in `css/calc.css` unless noted.

### Input & Currency
| Class | Where | What |
|---|---|---|
| `.input-row` | calc.css | Glassmorphism input wrapper (flex, bordered) |
| `.input-row--ccy` | calc.css | Modifier — adds `padding-right` on input for currency unit |
| `.input-ccy-unit` | calc.css | Blue currency code absolutely positioned inside input |
| `.ccy-label-row` | calc.css | Flex row: label left, pills right |
| `.ccy-pills` | calc.css | Container for currency pill buttons |
| `.ccy-pill` | calc.css | Individual currency pill; `.active` = blue |

### Toggles
| Class | Where | What |
|---|---|---|
| `.year-wrap` | calc.css | Row of `.year-btn` pills (year / rate selectors) |
| `.year-btn` | calc.css | Glass pill toggle button; `.active` = blue |
| `.toggle-wrap` | calc.css | Row of `.toggle-btn` wide mode buttons |
| `.toggle-btn` | calc.css | Wide mode button with subtitle span |

### Results
| Class | Where | What |
|---|---|---|
| `.result-box` | calc.css | Green result card (primary outcome) |
| `.result-tax` | calc.css | Red/orange result card (tax due) |
| `.rl`, `.rr` | calc.css | Left / right halves of result box |
| `.rl-title`, `.rl-sub` | calc.css | Label and subtitle in result box |
| `.rr-val`, `.rr-sub` | calc.css | Value and sub-value in result box |

### Breakdown Table
| Class | Where | What |
|---|---|---|
| `.breakdown` | calc.css | Borderless table for itemized breakdown |
| `.row-gross` | calc.css | Gross income row |
| `.row-deduct` | calc.css | Deduction row (red right column) |
| `.row-subtotal` | calc.css | Subtotal row |
| `.row-total` | calc.css | Net/total row (bold) |
| `.row-separator` | calc.css | Section header row |

### Badges
| Class | Where | What |
|---|---|---|
| `.badge` | calc.css | Base badge style |
| `.badge-red` | calc.css | Red badge (deduction rates) |
| `.badge-green` | calc.css | Green badge (net %) |
| `.badge-gray` | calc.css | Gray badge (info) |

### Misc
| Class | Where | What |
|---|---|---|
| `.field-label` | calc.css | Form field label |
| `.quick-row` | calc.css | Row of quick-amount shortcut buttons |
| `.quick-btn` | calc.css | Individual shortcut button |
| `.warn-box` | calc.css | Orange warning box |
| `.tip` | calc.css | Tooltip trigger `?` element |
| `.unit` | calc.css | Legacy gray currency unit box (right side of input) — not used for currency anymore |
| `.calc-container` | calc.css | Page content wrapper (max 800px) |
| `.card`, `.card-header`, `.card-body` | calc.css | Glass card sections |

---

## Currency Conversion Pattern

All calculators use this identical approach:

```
User input (any currency)
    ↓  toALL()
Internal value in ALL
    ↓  engine calculation (thresholds, rates all in ALL)
Result in ALL
    ↓  fromALL()
Display value in current currency
    ↓  fmt() / fmtN()
Formatted string
```

`EUR_TO_ALL = 95.30` is defined as a constant in each JS file independently.

For **qiraja, tvsh, dividende**: thresholds don't exist (pure percentages), so `toALL`/`fromALL` are still defined for consistency but the formula works the same in any currency.

For **paga, sig, mak**: thresholds (tax brackets, SS caps, min wage, customs references) are in ALL, so conversion is essential.

---

## Adding a New Currency

To add e.g. USD to a calculator:

1. Add `<button class="ccy-pill" id="opt-usd" onclick="setCurrency('USD')">USD</button>` in HTML
2. Add `const USD_TO_ALL = X;` in the JS file
3. Update `toALL` and `fromALL` to handle the new case
4. `setCurrency` already handles any number of pills via `querySelectorAll`
