# Google Analytics Plan

## Setup
Add GA4 snippet to `<head>` of all 10 HTML files (after `<meta charset>`). Requires a Measurement ID (`G-XXXXXXXXXX`) from analytics.google.com.

Add a small helper to each calculator file:
```js
function gtrack(name, params) {
  if (typeof gtag !== 'undefined') gtag('event', name, params);
}
```

---

## Events

### `calculate` — core event, fired on every valid calculation
| Parameter | Example values | Why |
|---|---|---|
| `calculator` | `paga`, `makina`, `tvsh`, `dividende`, `sigurime`, `qiraja` | Which tool is used most |
| `mode` | `bruto`, `neto`, `add`, `sub` | How users approach the task |
| `currency` | `ALL`, `EUR` | EUR vs ALL user split |
| `year` | `2025`, `2026` | Which tax year (paga, sigurime) |
| `cc` | `1400`, `1900`, `2500`, `2999`, `3000` | Engine category (makina only) |
| `is_retro` | `true` / `false` | Classic car usage (makina only) |

> Do NOT track monetary values (salary amounts, prices).

---

### `toggle_mode` — fired in `setMode()`, `setCurrency()`, `setYear()`
| Parameter | Values |
|---|---|
| `calculator` | calculator name |
| `toggle_type` | `mode`, `currency`, `year` |
| `new_value` | e.g. `neto`, `EUR`, `2026` |

---

### `quick_amount_used` — fired in `setAmount()`, `setMinWage()`, `setTavanSS()`, `setMaxBase()`
| Parameter | Values |
|---|---|
| `calculator` | calculator name |
| `label` | `min_wage`, `tavan_ss`, or amount (e.g. `100000`) |

---

### `calc_card_click` — fired on `.calc-card` clicks in llogaritesit.html
| Parameter | Values |
|---|---|
| `calculator` | destination calculator |
| `is_soon` | `true` / `false` (tracks demand for coming-soon tools) |

---

### `tooltip_opened` — fired in existing tooltip click handler
| Parameter | Values |
|---|---|
| `calculator` | calculator name |
| `tip` | first ~40 chars of `data-tip` text |

---

## Files to modify
- All 10 `.html` files: GA snippet in `<head>`
- `llogaritesit.html`: + `calc_card_click`
- `calculators/*.html` (6 files): + `calculate`, `toggle_mode`, `quick_amount_used`, `tooltip_opened`

## Verification
Open any calculator with Chrome's GA Debugger extension (or append `?debug_mode=1`), perform a calculation, and confirm events appear in GA4 → DebugView with correct parameters.
