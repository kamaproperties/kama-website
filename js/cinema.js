// Hima Cinema — coded hero animation (Meraas-style scene player)
// Scenes crossfade while their images move on live GPU transforms.
(function () {
  const stage = document.querySelector('.cinema');
  if (!stage) return;

  const scenes = Array.from(stage.querySelectorAll('.scene'));
  // scenes may carry real footage: <video muted loop playsinline> inside the scene
  scenes.forEach((s) => {
    const v = s.querySelector('video');
    if (v) { s.classList.add('has-video'); v.muted = true; }
  });
  const segs = Array.from(stage.querySelectorAll('.cinema-progress button'));
  const canvas = stage.querySelector('.cinema-atmo');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SCENE_MS = 7600;

  let idx = 0, timer = null;

  function show(n) {
    const prev = idx;
    idx = (n + scenes.length) % scenes.length;
    scenes.forEach((s, i) => {
      if (i === idx) { s.classList.add('active'); s.classList.remove('exit'); }
      else if (i === prev && s.classList.contains('active')) {
        s.classList.remove('active'); s.classList.add('exit');
        setTimeout(() => s.classList.remove('exit'), 2500);
      } else { s.classList.remove('active', 'exit'); }
    });
    segs.forEach((b, i) => {
      b.style.setProperty('--t', SCENE_MS + 'ms');
      b.classList.toggle('active', i === idx);
      b.classList.toggle('done', i < idx);   // wrap to 0 clears all — full reset
    });
    stage.classList.toggle('is-dusk', scenes[idx].dataset.dusk === 'true');
  }

  function start() {
    stop();
    timer = setInterval(() => show(idx + 1), SCENE_MS);
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }

  // progress segments are clickable, like Meraas's slide bars
  segs.forEach((b, i) => b.addEventListener('click', () => { show(i); start(); }));

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else if (!reduced) start();
  });

  // decode every scene image up front — a fade must never wait on a JPEG decode
  scenes.forEach((s) => {
    const im = s.querySelector('img');
    if (im && im.decode) im.decode().catch(() => {});
  });

  function reveal() { stage.classList.add('ready'); }
  const first = scenes[0] && scenes[0].querySelector('img, video');
  if (first && first.tagName === 'IMG' && first.decode) {
    first.decode().then(reveal).catch(reveal);
    setTimeout(reveal, 2600); // safety net on slow connections
  } else { reveal(); }

  if (reduced) { show(0); return; }
  show(0); start();

  // ---- atmosphere: slow warm particles over dusk scenes ----
  if (canvas && !reduced && window.innerWidth > 720) {
    const ctx = canvas.getContext('2d');
    let W, H, parts = [];
    function size() {
      W = canvas.width = stage.clientWidth;
      H = canvas.height = stage.clientHeight;
    }
    size();
    window.addEventListener('resize', size);
    const N = 36;
    for (let i = 0; i < N; i++) {
      parts.push({
        x: Math.random(), y: Math.random(),
        r: 0.8 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.00006,
        vy: -0.00003 - Math.random() * 0.00006,
        a: 0.15 + Math.random() * 0.35,
        ph: Math.random() * Math.PI * 2,
      });
    }
    let last = performance.now();
    function tick(now) {
      const dt = Math.min(now - last, 50); last = now;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx * dt; p.y += p.vy * dt; p.ph += dt * 0.0012;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < -0.02) p.x = 1.02; if (p.x > 1.02) p.x = -0.02;
        const tw = 0.6 + 0.4 * Math.sin(p.ph);
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233,196,137,${(p.a * tw).toFixed(3)})`;
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
