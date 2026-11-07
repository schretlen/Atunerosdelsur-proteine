/* =========================================================
   Atuneros del Sur — main.js
   Handles: mobile menu, hero cross-fade, content sliders,
   and the contact form's confirmation state.
   No dependencies.
========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     Mobile navigation
  --------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-mobile-nav]');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------
     Hero cross-fade
     Markup: [data-hero] > .hero__media img (+ .hero-dot buttons)
  --------------------------------------------------------- */
  function initHero() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;

    var slides = hero.querySelectorAll('.hero__media img');
    var dots = hero.querySelectorAll('.hero-dot');
    if (slides.length < 2) return;

    var index = 0;
    var delay = parseInt(hero.getAttribute('data-interval'), 10) || 6000;
    var timer;

    function show(i) {
      index = (i + slides.length) % slides.length;
      for (var s = 0; s < slides.length; s++) {
        slides[s].classList.toggle('is-active', s === index);
      }
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle('is-active', d === index);
        dots[d].setAttribute('aria-selected', d === index ? 'true' : 'false');
      }
    }

    function play() {
      clearInterval(timer);
      timer = setInterval(function () { show(index + 1); }, delay);
    }

    for (var d = 0; d < dots.length; d++) {
      (function (i) {
        dots[i].addEventListener('click', function () { show(i); play(); });
      })(d);
    }

    show(0);
    play();
  }

  /* ---------------------------------------------------------
     Content sliders
     Markup: [data-slider] containing
       .slider__track > .slide
       [data-slider-prev] / [data-slider-next]
       [data-slider-dots] > .slider-dot
  --------------------------------------------------------- */
  function initSlider(root) {
    var track = root.querySelector('.slider__track');
    var slides = root.querySelectorAll('.slide');
    var prev = root.querySelector('[data-slider-prev]');
    var next = root.querySelector('[data-slider-next]');
    var dots = root.querySelectorAll('.slider-dot');
    if (!track || slides.length === 0) return;

    var index = 0;
    var delay = parseInt(root.getAttribute('data-interval'), 10) || 7000;
    var timer;

    function show(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-100 * index) + '%)';
      for (var s = 0; s < slides.length; s++) {
        slides[s].setAttribute('aria-hidden', s === index ? 'false' : 'true');
      }
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle('is-active', d === index);
        dots[d].setAttribute('aria-current', d === index ? 'true' : 'false');
      }
    }

    function play() {
      clearInterval(timer);
      timer = setInterval(function () { show(index + 1); }, delay);
    }

    if (prev) prev.addEventListener('click', function () { show(index - 1); play(); });
    if (next) next.addEventListener('click', function () { show(index + 1); play(); });

    for (var d = 0; d < dots.length; d++) {
      (function (i) {
        dots[i].addEventListener('click', function () { show(i); play(); });
      })(d);
    }

    root.addEventListener('mouseenter', function () { clearInterval(timer); });
    root.addEventListener('mouseleave', play);

    show(0);
    play();
  }

  function initSliders() {
    var roots = document.querySelectorAll('[data-slider]');
    for (var i = 0; i < roots.length; i++) initSlider(roots[i]);
  }

  /* ---------------------------------------------------------
     Contact form — swaps the form for a confirmation message.
     Replace the preventDefault() branch with a real submit
     (fetch / form action) when the backend endpoint exists.
  --------------------------------------------------------- */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    var success = document.querySelector('[data-form-success]');
    var reset = document.querySelector('[data-form-reset]');
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('is-hidden');
      success.classList.add('is-visible');
    });

    if (reset) {
      reset.addEventListener('click', function () {
        form.reset();
        form.classList.remove('is-hidden');
        success.classList.remove('is-visible');
      });
    }
  }

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  function init() {
    initMobileNav();
    initHero();
    initSliders();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
