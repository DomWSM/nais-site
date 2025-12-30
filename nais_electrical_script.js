/* =========================================
   COMPONENT: HEADER / NAV (NAIS - Option A)
   Mobile menu only
   ========================================= */

   (function naisHeaderOptionA(){
    const burger = document.querySelector("[data-nais-burger]");
    const mobile = document.querySelector("[data-nais-mobile]");
    const closeBtn = document.querySelector("[data-nais-close]");
    const backdrop = document.querySelector("[data-nais-backdrop]");
  
    function openMobile(){
      if (!mobile || !burger) return;
      mobile.hidden = false;
      mobile.dataset.open = "true";
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
  
    function closeMobile(){
      if (!mobile || !burger) return;
      mobile.dataset.open = "false";
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      setTimeout(() => { mobile.hidden = true; }, 220);
    }
  
    if (burger && mobile){
      burger.addEventListener("click", () => {
        const isOpen = mobile.dataset.open === "true";
        isOpen ? closeMobile() : openMobile();
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", closeMobile);
    if (backdrop) backdrop.addEventListener("click", closeMobile);
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobile && mobile.dataset.open === "true") closeMobile();
    });
  })();

  /* =========================================
   HERO PARALLAX
   ========================================= */
(function naisHeroParallax(){
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const heroes = Array.from(document.querySelectorAll(".hero[data-parallax]"));
  if (!heroes.length) return;

  let ticking = false;

  function update(){
    ticking = false;

    const viewportH = window.innerHeight || 0;

    heroes.forEach(hero => {
      const rect = hero.getBoundingClientRect();

      // Only animate when near viewport (performance)
      if (rect.bottom < -200 || rect.top > viewportH + 200) return;

      // Progress: -1 (above) to +1 (below), 0 around center
      const center = rect.top + rect.height / 2;
      const delta = (center - viewportH / 2) / (viewportH / 2);

      // Clamp and convert to px offset (subtle!)
      const clamped = Math.max(-1, Math.min(1, delta));
      const offsetPx = clamped * -30; // adjust intensity (e.g., -20..-40)

      hero.style.setProperty("--parallax-offset", `${offsetPx}px`);
    });
  }

  function onScroll(){
    if (!ticking){
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  // Initial + listeners
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();

/* =========================
   PARALLAX (works on any section with [data-parallax])
   Sets CSS variable: --parallax-offset
   ========================= */
   (() => {
    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;
  
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
  
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  
    const update = () => {
      const vh = window.innerHeight || 800;
  
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
  
        // If far off-screen, don't waste cycles
        if (r.bottom < -200 || r.top > vh + 200) return;
  
        // Progress around viewport centre (-1..1-ish)
        const centre = r.top + r.height * 0.5;
        const progress = (centre - vh * 0.5) / vh;
  
        // Subtle movement (tweak multiplier if you want more/less)
        const offset = clamp(-progress * 40, -60, 60);
  
        el.style.setProperty('--parallax-offset', `${offset}px`);
      });
    };
  
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();