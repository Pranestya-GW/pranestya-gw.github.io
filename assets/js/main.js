/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Portfolio horizontal scroll carousel — filter + scroll arrows
   */
  function initPortfolioCarousel() {
    const track = document.getElementById('portfolioScrollTrack');
    const filters = document.querySelectorAll('.portfolio-filters li');
    const scrollLeft = document.querySelector('.scroll-left');
    const scrollRight = document.querySelector('.scroll-right');

    if (!track) return;

    // Scroll arrow buttons
    const scrollAmount = 320;

    if (scrollLeft) {
      scrollLeft.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (scrollRight) {
      scrollRight.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    // Keyboard arrow support when track is focused
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });

    // Mouse wheel horizontal scroll
    track.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        track.scrollBy({ left: e.deltaY * 2, behavior: 'auto' });
      }
    }, { passive: false });

    // Filter tabs
    if (filters.length) {
      const cards = track.querySelectorAll('.portfolio-card');

      filters.forEach(filter => {
        filter.addEventListener('click', () => {
          // Update active class
          filters.forEach(f => f.classList.remove('filter-active'));
          filter.classList.add('filter-active');

          const category = filter.getAttribute('data-filter');

          cards.forEach(card => {
            if (category === 'all') {
              card.classList.remove('filtered-out');
            } else {
              const cardCats = card.getAttribute('data-category').split(' ');
              if (cardCats.includes(category)) {
                card.classList.remove('filtered-out');
              } else {
                card.classList.add('filtered-out');
              }
            }
          });

          // Scroll back to start after filter
          track.scrollTo({ left: 0, behavior: 'smooth' });
        });
      });
    }
  }

  /**
   * GitHub Stats — dynamic theme switching
   * Detects OS color scheme and loads matching stats images.
   * Listens for live theme changes (e.g., switching dark/light mode).
   */
  function loadGitHubStats() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // --- Contribution grid (ghchart.rshah.org) ---
    // ghchart defaults to white background.
    // In dark mode we invert it; in light mode we leave as-is.
    const gridImg = document.getElementById('github-contribution-graph');
    if (gridImg) {
      gridImg.src = 'https://ghchart.rshah.org/18d26e/Pranestya-GW';
      if (isDark) {
        gridImg.style.filter = 'invert(0.92) hue-rotate(180deg)';
      } else {
        gridImg.style.filter = 'none';
      }
    }

    // --- Activity graph (github-readme-activity-graph) ---
    const activityImg = document.getElementById('github-activity-graph');
    if (activityImg) {
      const theme = isDark ? 'github-dark' : 'default';
      activityImg.src =
        'https://github-readme-activity-graph.vercel.app/graph' +
        '?username=Pranestya-GW' +
        '&theme=' + theme +
        '&bg_color=' + (isDark ? '1a1a1a' : 'ffffff') +
        '&color=' + (isDark ? 'fafafa' : '333333') +
        '&line=18d26e' +
        '&point=18d26e' +
        '&area=true' +
        '&hide_border=true' +
        '&hide_title=true';
    }

    // --- Top languages — hardcoded in HTML, based on file analysis across all repos ---
    // (no dynamic loading needed — reflects both public and private work)
  }

  // Load on page load
  loadGitHubStats();

  // Reload when OS theme changes (user toggles dark/light mode)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', loadGitHubStats);

  /**
   * Smooth scrolling for all hash links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('#header')?.offsetHeight || 60;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile nav if open
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      }
    });
  });

  /**
   * Active nav highlighting on scroll using IntersectionObserver.
   * Updates the .active class on nav links as sections scroll into view.
   */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',  // Trigger when section is in the top 20-40% of viewport
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  initScrollSpy();

  /**
   * Lazy load portfolio images with blur-up effect.
   * Uses IntersectionObserver to load images only when near viewport,
   * then fades them in from blurred state.
   */
  function initLazyPortfolioImages() {
    const portfolioImages = document.querySelectorAll('.portfolio-content img');
    if (!portfolioImages.length) return;

    // First pass: add blur shimmer background size hint
    portfolioImages.forEach(img => {
      // Store original src, replace with blank to prevent eager loading
      const src = img.getAttribute('src');
      if (!src) return;
      img.setAttribute('data-src', src);
      // Set a tiny transparent placeholder to prevent layout shift
      img.removeAttribute('src');
      img.style.minHeight = '200px';
    });

    // IntersectionObserver to trigger load
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            // Create a new Image to preload, then swap
            const tempImg = new Image();
            tempImg.onload = function() {
              img.src = src;
              img.classList.add('lazy-loaded');
            };
            tempImg.onerror = function() {
              // Fallback: set src anyway
              img.src = src;
              img.classList.add('lazy-loaded');
            };
            tempImg.src = src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',  // Start loading 200px before entering viewport
      threshold: 0.01
    });

    portfolioImages.forEach(img => observer.observe(img));
  }

  // Run lazy loading after AOS and DOM are ready
  document.addEventListener('DOMContentLoaded', () => {
    initLazyPortfolioImages();
    initPortfolioCarousel();
  });

})();