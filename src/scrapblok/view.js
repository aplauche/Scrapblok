/**
 * Scrapblok Frontend JavaScript
 * Handles parallax effects with GSAP enhancement and vanilla fallback
 */

document.addEventListener("DOMContentLoaded", () => {
  const parallaxElements = [];
  let ticking = false;

  // Initialize parallax for all elements
  function initParallax() {
    const containers = document.querySelectorAll('.scrapblok-composer');

    containers.forEach(container => {
      const items = container.querySelectorAll('[data-plax]');

      items.forEach(item => {
        const img = item.querySelector('.plax-container');
        const parallaxValue = Number(item.getAttribute('data-plax')) || 0;

        if (!img || parallaxValue === 0) return;

        if (window?.gsap && window?.ScrollTrigger) {
          // GSAP version (enhanced)
          createGSAPParallax(item, img, parallaxValue);
        } else {
          // Vanilla version (fallback)
          parallaxElements.push({ item, img, parallaxValue });
        }
      });
    });

    // Setup vanilla parallax if no GSAP
    if (!window?.gsap && parallaxElements.length > 0) {
      setupVanillaParallax();
    }
  }

  // GSAP enhanced parallax
  function createGSAPParallax(item, img, parallaxValue) {
    const range = parallaxValue / 2;

    window.gsap.timeline({
      scrollTrigger: {
        start: "top bottom",
        end: "bottom top",
        trigger: item,
        scrub: true,
        invalidateOnRefresh: true
      },
      ease: "none"
    }).fromTo(img, { y: -range }, { y: range });
  }

  // Vanilla JS parallax fallback
  function setupVanillaParallax() {
    function updateParallax() {
      parallaxElements.forEach(({ item, img, parallaxValue }) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress (0 to 1)
        const scrolled = windowHeight - rect.top;
        const rate = scrolled / (windowHeight + rect.height);

        // Calculate parallax offset
        const range = parallaxValue / 2;
        const offset = (rate - 0.5) * 2 * range;

        // Apply transform
        img.style.transform = `translate3d(0, ${offset}px, 0)`;
      });

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);

    // Initial update
    updateParallax();
  }

  // Initialize
  initParallax();
});
