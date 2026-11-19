/* ==========================================================================
   Akash Sunagar | Portfolio
   1. Dynamic year   2. Mobile menu   3. Header state + back-to-top
   4. Active section detection        5. Scroll reveal
   ========================================================================== */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  var toTop = document.getElementById('to-top');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Dynamic copyright year ------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* 2. Mobile menu ------------------------------------------------------- */
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after choosing a link
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // Close with Escape (and return focus to the toggle)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Close when tapping outside the header
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });

  // Reset when growing back to the desktop layout
  window.matchMedia('(min-width: 961px)').addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* 3. Header state + back-to-top --------------------------------------- */
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-visible', y > 600);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* 4. Active section detection ----------------------------------------- */
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    // A section becomes active when it crosses the upper-middle of the viewport
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* 5. Scroll reveal ----------------------------------------------------- */
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(function (item) { revealer.observe(item); });
  } else {
    // No observer support or reduced motion: show everything immediately
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }
})();
