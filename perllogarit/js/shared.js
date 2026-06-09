'use strict';

/* ============================================================
   shared.js — Loaded by every page that has a nav / FAB.
   Root pages:       <script src="js/shared.js" defer>
   Calculator pages: <script src="../js/shared.js" defer>
   ============================================================ */

/* ── Currency normalization (used by all calculator pages) ── */
window.PL = {
  eurRate: 95.30,
  setEurRate: function(r) { PL.eurRate = r; },
  toALL:   function(v, ccy) { return ccy === 'EUR' ? v * PL.eurRate : v; },
  fromALL: function(v, ccy) { return ccy === 'EUR' ? v / PL.eurRate : v; },
  fmtEurEquiv: function(allVal) {
    return '≈ ' + (allVal / PL.eurRate).toLocaleString('sq-AL', {
      minimumFractionDigits: 2, maximumFractionDigits: 2
    }) + ' EUR';
  },

  toggleEurNote: function(currency) {
    var existing = document.getElementById('eur-conversion-note');
    if (currency !== 'ALL') {
      if (!existing) {
        var note = document.createElement('p');
        note.id = 'eur-conversion-note';
        note.className = 'eur-note';
        note.textContent = 'Kur vlerat vendosen në EUR, kalkulatori i konverton fillimisht në Lek sipas kursit të zgjedhur. Llogaritjet tatimore kryhen në Lek, ndërsa vlerat në EUR shfaqen vetëm si ekuivalent i përafërt.';
        var anchor = document.getElementById('quick-amounts');
        if (anchor) anchor.insertAdjacentElement('afterend', note);
      }
    } else {
      if (existing) existing.remove();
    }
  },

  /* ALL-only formatting */
  fmtALL: function(n) {
    return Math.round(n).toLocaleString('sq-AL') + ' ALL';
  },
  fmtNum: function(n) {
    return Math.round(n).toLocaleString('sq-AL');
  },
  /* Currency-aware formatting — kept for backwards compatibility */
  fmt: function(n, currency) {
    if (currency === 'EUR') {
      return n.toLocaleString('sq-AL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' EUR';
    }
    return Math.round(n).toLocaleString('sq-AL') + ' ALL';
  },
  fmtN: function(n, currency) {
    if (currency === 'EUR') {
      return n.toLocaleString('sq-AL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return Math.round(n).toLocaleString('sq-AL');
  }
};

/* ── Shared live EUR/ALL rate fetch — updates PL.eurRate once per page load ── */
(async function loadSharedRate() {
  try {
    const res  = await fetch('https://v6.exchangerate-api.com/v6/607e597871b436c321a387b3/latest/EUR');
    const data = await res.json();
    if (data.result !== 'success') throw new Error();
    PL.setEurRate(parseFloat(data.conversion_rates.ALL.toFixed(2)));
    if (typeof window.onEurRateLoaded === 'function') window.onEurRateLoaded(PL.eurRate);
  } catch { /* keep fallback */ }
})();

/* ── Mobile hamburger — called via onclick="toggleMenu()" in HTML ── */
function toggleMenu() {
  var menu = document.getElementById('nav-mobile');
  var icon = document.getElementById('hamburger-icon');
  if (!menu || !icon) return;
  var open = menu.classList.toggle('open');
  icon.className = 'fi ' + (open ? 'fi-br-cross-small' : 'fi-br-menu-burger');
}

/* ── Close FAB menu when a nav link inside it is tapped ── */
document.querySelectorAll('#nav-mobile a').forEach(function(a) {
  a.addEventListener('click', function() {
    var menu = document.getElementById('nav-mobile');
    var icon = document.getElementById('hamburger-icon');
    if (menu) menu.classList.remove('open');
    if (icon) icon.className = 'fi fi-br-menu-burger';
  });
});

/* ── FAB auto-dim after 10 s of inactivity ── */
(function() {
  var fab = document.querySelector('.fab-wrap');
  if (!fab) return;
  var t;
  function dim()  { fab.style.opacity = '0.12'; }
  function wake() { fab.style.opacity = '1'; clearTimeout(t); t = setTimeout(dim, 10000); }
  fab.addEventListener('pointerdown', wake);
  wake();
})();

/* ── Tooltip toggle (data-tip attribute bubbles) ── */
document.addEventListener('click', function(e) {
  var tip = e.target.closest('.tip');
  document.querySelectorAll('.tip--open').forEach(function(t) {
    if (t !== tip) t.classList.remove('tip--open');
  });
  if (tip) { tip.classList.toggle('tip--open'); e.stopPropagation(); }
});

/* ── Shared footer ── */
(function() {
  var el = document.getElementById('site-footer');
  if (!el) return;
  var sub = /\/calculators\//.test(window.location.pathname);
  var r = sub ? '../' : '';
  var c = sub ? '' : 'calculators/';
  el.outerHTML =
    '<footer class="footer">\n' +
    '  <div class="footer-main">\n' +
    '    <div class="footer-brand">\n' +
    '      <div class="footer-logo-row">\n' +
    '        <span class="footer-logo">per<span>llogarit</span></span>\n' +
    '      </div>\n' +
    '      <p class="footer-tagline">Llogaritjet financiare për shqiptarët, nga paga te taksat dhe shumë të tjera, gjithmonë falas e pa regjistrim.</p>\n' +
    '      <a class="kofi-btn" href="https://ko-fi.com/vensi" target="_blank" rel="noopener"><img src="' + r + 'icons/zg/ic-kofi.png" alt="" class="kofi-icon"> NA BLI NJE KAFE</a>\n' +
    '    </div>\n' +
    '    <div class="footer-cols">\n' +
    '      <div class="footer-col">\n' +
    '        <p class="footer-col-label">Llogaritësit</p>\n' +
    '        <ul>\n' +
    '          <li><a href="' + c + 'paga.html">Llogaritësi i Pagës</a></li>\n' +
    '          <li><a href="' + c + 'sigurime.html">Sigurime Vetëpunësuarit</a></li>\n' +
    '          <li><a href="' + c + 'makina.html">Taksa e Importit</a></li>\n' +
    '          <li><a href="' + c + 'qiraja.html">Tatim mbi Qiranë</a></li>\n' +
    '          <li><a href="' + c + 'tvsh.html">TVSH (20%)</a></li>\n' +
    '          <li><a href="' + c + 'dividende.html">Tatim mbi Dividentët</a></li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '      <div class="footer-col">\n' +
    '        <p class="footer-col-label">Burimet</p>\n' +
    '        <ul>\n' +
    '          <li><a href="https://qbz.gov.al/eli/ligj/2023/03/30/29/e0b4e6c5-bf37-4102-a57c-fd51244a2d5f" target="_blank" rel="noopener">Ligji i Tatimit mbi të Ardhurat</a></li>\n' +
    '          <li><a href="https://qbz.gov.al/eli/ligj/1993/05/11/7703/f85f44fc-aaba-4b6d-8ea1-7f00f6b3e670" target="_blank" rel="noopener">Ligji i Sigurimeve Shoqërore</a></li>\n' +
    '          <li><a href="https://eurofast.eu/wp-content/uploads/2025/02/Payroll-Guide-2025_Albania-1.pdf" target="_blank" rel="noopener">Eurofast Payroll Guide 2025</a></li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '      <div class="footer-col">\n' +
    '        <p class="footer-col-label">Kompania</p>\n' +
    '        <ul>\n' +
    '          <li><a href="' + r + 'rreth-nesh.html">Rreth Nesh</a></li>\n' +
    '          <li><a href="mailto:feedback@perllogarit.al">Kontakt</a></li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="footer-bottom">\n' +
    '    <span>&copy; 2026 PERLLOGARIT</span>\n' +
    '    <div class="footer-bottom-links">\n' +
    '      <a href="' + r + 'kushtet-e-perdorimit.html">Kushtet e Përdorimit</a>\n' +
    '      <a href="#">Politika e Privatësisë</a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</footer>';
})();
