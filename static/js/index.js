/* ==========================================================================
   Younes Toukal — personal academic site
   Three small enhancements, all progressive: with JS disabled the page is
   fully readable and every anchor still works (smooth scrolling and the
   sticky-nav offset are handled in CSS).
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. Footer year
     ------------------------------------------------------------------ */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------
     2. Scroll reveal — subtle fade + rise, once per element.
        The .js-reveal class is added here rather than in the HTML so
        content is never hidden if JS fails to run.
     ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll(
    '.hero-body, .section > .container > *'
  );

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('js-reveal');
      revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     3. Active section highlight in the navbar
     ------------------------------------------------------------------ */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-menu .navbar-item')
  );

  if (navLinks.length && 'IntersectionObserver' in window) {
    var linkFor = {};
    var sections = [];

    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      linkFor[id] = link;
      sections.push(section);
    });

    var visible = {};

    var setActive = function () {
      // topmost currently-visible section wins
      var current = sections.filter(function (s) { return visible[s.id]; })[0];
      navLinks.forEach(function (link) { link.classList.remove('is-active'); });
      if (current && linkFor[current.id]) {
        linkFor[current.id].classList.add('is-active');
      }
    };

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      setActive();
    }, {
      // a band just under the sticky navbar, so the "current" section is the
      // one the reader is actually looking at
      rootMargin: '-70px 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(function (section) { navObserver.observe(section); });
  }
})();
