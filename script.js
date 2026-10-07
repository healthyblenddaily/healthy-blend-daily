/* ==========================================================
   Healthy Blend Daily — script.js
   Vanilla JS, no dependencies.
   1) Mobile menu toggle  2) Affiliate CTA click tracking placeholder
   ========================================================== */
(function () {
  'use strict';

  // JS is running, so drop the no-js fallback class (nav is visible without JS).
  document.documentElement.classList.remove('no-js');

  /* ---------- 1) Mobile menu ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    // Close with Escape and return focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });

    // Reset when resizing up to the desktop layout
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setMenu(false);
    });
  }

  /* ---------- 2) Affiliate CTA tracking placeholder ---------- */
  // Sends only the event name and which button was clicked. No personal data.
  function trackEvent(name, params) {
    // ANALYTICS EVENT CODE GOES HERE.
    // Example once you add your own analytics (use YOUR OWN ID in the snippet in index.html):
    //   if (typeof window.gtag === 'function') { window.gtag('event', name, params); }
    // Safe to leave as-is: nothing is sent until you connect a provider.
  }

  document.querySelectorAll('[data-affiliate-cta]').forEach(function (link) {
    link.addEventListener('click', function () {
      // Does not block navigation; the link opens in a new tab as normal.
      trackEvent('affiliate_cta_click', { cta_location: link.getAttribute('data-affiliate-cta') });
    });
  });
})();
