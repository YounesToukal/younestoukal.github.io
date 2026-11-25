(function () {
  var root = document.documentElement;

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var bar = document.querySelector('.progress');
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[data-section]'));
  var sections = links.map(function (a) { return document.getElementById(a.getAttribute('data-section')); });

  function onScroll() {
    var max = root.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (max > 0 ? Math.min(window.scrollY / max, 1) * 100 : 0) + '%';
    if (!links.length) return;

    var offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    var current = 0;
    if (max > 0 && window.scrollY >= max - 8) {
      current = sections.length - 1;
    } else {
      sections.forEach(function (s, i) {
        if (s && s.getBoundingClientRect().top <= offset + 24) current = i;
      });
    }
    links.forEach(function (a, i) {
      if (i === current) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }

  document.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('scrollend', onScroll);
  window.addEventListener('resize', onScroll);
  onScroll();

  var gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.addEventListener('click', function (e) {
      var img = e.target.closest('img');
      if (!img) return;
      var box = document.createElement('div');
      box.className = 'lightbox';
      box.innerHTML = '<img alt=""><button type="button" aria-label="Close">&times;</button>';
      box.querySelector('img').src = img.currentSrc || img.src;
      box.querySelector('img').alt = img.alt;
      function close() {
        box.remove();
        document.removeEventListener('keydown', onKey);
      }
      function onKey(ev) { if (ev.key === 'Escape') close(); }
      box.addEventListener('click', function (ev) {
        if (ev.target === box || ev.target.tagName === 'BUTTON') close();
      });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(box);
    });
  }
})();
