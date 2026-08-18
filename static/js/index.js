/* ==========================================================================
   Younes Toukal — personal academic site
   Four small enhancements, all progressive: with JS disabled the page is
   fully readable and every anchor still works (smooth scrolling and the
   sticky-nav offset are handled in CSS, the dark-mode toggle falls back to
   following the OS preference via a plain CSS media query, and every
   "Email" link is still a working mailto: link on its own).
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. Scroll reveal — subtle fade + rise, once per element.
        The .js-reveal class is added here rather than in the HTML so
        content is never hidden if JS fails to run.
     ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll(
    '.hero-content, .section > .container > *'
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
     2. Active section highlight in the navbar
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

  /* ------------------------------------------------------------------
     3. Dark-mode toggle
        The icon shown for each theme, and the OS-preference fallback for
        anyone who never clicks the toggle, are handled entirely in CSS
        (see .theme-toggle in index.css) — this only needs to flip the
        explicit override and remember it. A matching inline script in
        <head> applies a saved choice before first paint.
     ------------------------------------------------------------------ */
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme');
      var systemDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = current ? current === 'dark' : systemDark;
      var next = isDark ? 'light' : 'dark';

      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ------------------------------------------------------------------
     4. Email popover — clicking "Email" shows the full address with a
        Copy button and a "Send email" link, rather than silently
        trying to open a mail client that might not be configured (and
        showing nothing if it isn't). Reads the address straight off
        each link's own mailto: href, so there is one source of truth
        and no markup to duplicate. Without JS the link is still a
        plain working mailto: link.
     ------------------------------------------------------------------ */
  var emailLinks = document.querySelectorAll('.email-link');
  if (emailLinks.length) {
    var open = null;

    var closePopover = function () {
      if (!open) return;
      open.popover.parentNode.removeChild(open.popover);
      open.trigger.setAttribute('aria-expanded', 'false');
      open = null;
    };

    var copyToClipboard = function (text, done) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
        return;
      }
      var tmp = document.createElement('textarea');
      tmp.value = text;
      tmp.style.position = 'fixed';
      tmp.style.opacity = '0';
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(tmp);
      done();
    };

    Array.prototype.forEach.call(emailLinks, function (link) {
      var email = (link.getAttribute('href') || '').replace(/^mailto:/, '');
      if (!email) return;

      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');

      link.addEventListener('click', function (e) {
        e.preventDefault();

        var reopening = open && open.trigger === link;
        closePopover();
        if (reopening) return;

        var popover = document.createElement('div');
        popover.className = 'email-popover';
        popover.setAttribute('role', 'dialog');
        popover.setAttribute('aria-label', 'Email address');

        var address = document.createElement('p');
        address.className = 'email-popover-address';
        address.textContent = email;

        var actions = document.createElement('div');
        actions.className = 'email-popover-actions';

        var copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'email-popover-copy';
        copyBtn.textContent = 'Copy';
        copyBtn.addEventListener('click', function () {
          copyToClipboard(email, function () {
            copyBtn.textContent = 'Copied';
            copyBtn.classList.add('is-copied');
            setTimeout(function () {
              copyBtn.textContent = 'Copy';
              copyBtn.classList.remove('is-copied');
            }, 1600);
          });
        });

        var sendLink = document.createElement('a');
        sendLink.className = 'email-popover-send';
        sendLink.href = 'mailto:' + email;
        sendLink.textContent = 'Send email';
        sendLink.addEventListener('click', closePopover);

        actions.appendChild(copyBtn);
        actions.appendChild(sendLink);
        popover.appendChild(address);
        popover.appendChild(actions);
        document.body.appendChild(popover);

        var rect = link.getBoundingClientRect();
        popover.style.top = (rect.bottom + window.scrollY + 8) + 'px';
        popover.style.left = (rect.left + window.scrollX) + 'px';

        link.setAttribute('aria-expanded', 'true');
        open = { trigger: link, popover: popover };
      });
    });

    document.addEventListener('click', function (e) {
      if (!open) return;
      if (open.popover.contains(e.target) || open.trigger.contains(e.target)) return;
      closePopover();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopover();
    });

    window.addEventListener('scroll', closePopover, { passive: true });
  }
})();
