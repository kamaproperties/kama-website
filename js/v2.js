// KAMA V2 — flagship behaviour layer
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // stable hero height on mobile: measured once, not re-measured while the
  // address bar collapses (the source of mid-scroll layout flutter)
  function setHeroH() {
    document.documentElement.style.setProperty('--hero-h', window.innerHeight + 'px');
  }
  setHeroH();
  window.addEventListener('orientationchange', () => setTimeout(setHeroH, 300));

  // ---- preloader: plays once per session on the homepage only ----
  const loader = document.querySelector('.loader');
  function lift() { if (loader) loader.classList.add('lift'); }
  let seen = false;
  try { seen = sessionStorage.getItem('kamaSeen') === '1'; sessionStorage.setItem('kamaSeen', '1'); } catch (e) {}
  if (loader && (seen || document.body.classList.contains('inner-page'))) {
    loader.classList.add('instant', 'lift');
  }
  const firstImg = document.querySelector('.cinema .scene img');
  if (firstImg && firstImg.decode) {
    firstImg.decode().then(() => setTimeout(lift, reduced ? 0 : 500)).catch(lift);
  }
  setTimeout(lift, 3000); // never trap a visitor behind a loader

  // ---- fullscreen overlay menu ----
  const menuBtn = document.querySelector('.menu-btn');
  const body = document.body;
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.overlay-menu nav a').forEach((a) =>
      a.addEventListener('click', () => { body.classList.remove('menu-open'); body.style.overflow = ''; }));
  }

  // ---- header: light over the hero, limestone after (with hysteresis) ----
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.cinema');
  if (header && hero) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const limit = hero.offsetHeight - 120;
        if (window.scrollY > limit) header.classList.add('solid');
        else if (window.scrollY < limit - 80) header.classList.remove('solid');
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- count-up numbers on reveal ----
  const nums = document.querySelectorAll('[data-count]');
  const nio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      nio.unobserve(e.target);
      const el = e.target, target = parseFloat(el.dataset.count);
      if (reduced) { el.firstChild.nodeValue = target.toLocaleString('en'); return; }
      const t0 = performance.now(), dur = 1600;
      (function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.firstChild.nodeValue = Math.round(target * eased).toLocaleString('en');
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.6 });
  nums.forEach((n) => nio.observe(n));

  // ---- magnetic buttons (pointer devices only) ----
  if (!reduced && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (ev) => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left - r.width / 2) * 0.25;
        const y = (ev.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // ---- rail: honest mouse-drag scrolling ----
  const rail = document.querySelector('.rail');
  if (rail && window.matchMedia('(pointer:fine)').matches) {
    let down = false, startX = 0, startL = 0;
    rail.addEventListener('pointerdown', (e) => {
      down = true; startX = e.clientX; startL = rail.scrollLeft;
      rail.classList.add('grabbing'); rail.setPointerCapture(e.pointerId);
    });
    let moved = 0;
    rail.addEventListener('pointermove', (e) => { if (down) { moved = Math.abs(e.clientX - startX); rail.scrollLeft = startL - (e.clientX - startX); } });
    rail.addEventListener('click', (e) => { if (moved > 8) { e.preventDefault(); } moved = 0; }, true);
    ['pointerup','pointercancel'].forEach((ev) => rail.addEventListener(ev, () => { down = false; rail.classList.remove('grabbing'); }));
  }

  // ---- interest form (FormSubmit) ----
  document.querySelectorAll('form[data-eoi]').forEach((form) => {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const ok = form.parentElement.querySelector('.form-success');
      const orig = btn.textContent; btn.textContent = 'Sending…'; btn.disabled = true;
      try {
        const res = await fetch(form.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) });
        if (!res.ok) throw new Error();
        form.reset(); if (ok) ok.classList.add('show');
        btn.textContent = 'Sent';
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
      } catch (e) {
        btn.textContent = orig; btn.disabled = false;
        alert('Something went wrong — please email us at info@kamaproperties.net.');
      }
    });
  });

  // ---- scroll-linked parallax layers ----
  const px = document.querySelectorAll('[data-parallax]');
  if (px.length && !reduced && window.matchMedia('(pointer:fine)').matches) {
    let pTick = false;
    const drive = () => {
      px.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        const mid = r.top + r.height / 2 - window.innerHeight / 2;
        const shift = Math.max(-1, Math.min(1, mid / window.innerHeight)) * -46;
        el.style.transform = `translateY(${shift.toFixed(1)}px)`;
      });
      pTick = false;
    };
    window.addEventListener('scroll', () => { if (!pTick) { pTick = true; requestAnimationFrame(drive); } }, { passive: true });
    drive();
  }

  // ---- scroll reveal (same law as v1) ----
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el) => {
    const peers = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal')) : [el];
    const idx = peers.indexOf(el);
    if (idx > 0) el.style.setProperty('--d', (Math.min(idx, 5) * 0.12) + 's');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  revealEls.forEach((el) => io.observe(el));
  document.querySelectorAll('.elevation').forEach((el) => io.observe(el));
})();
