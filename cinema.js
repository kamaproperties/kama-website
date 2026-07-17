/* ============================================================
   KAMA PROPERTIES — kamaproperties.net
   Palette: Amman limestone at golden hour
   Display: Marcellus · Body: Almarai
   ============================================================ */

:root{
  --stone:      #EDE8DD;   /* limestone base */
  --stone-deep: #DFD8C8;   /* shadowed stone */
  --paper:      #FBF9F4;   /* card / panel */
  --ink:        #211913;   /* espresso */
  --ink-soft:   #574A3F;
  --oxblood:    #AB2D2D;   /* brand red, from the original logo */
  --oxblood-dk: #8C2426;
  --champagne:  #B08D4F;   /* gold accent — used sparingly */
  --champagne-lt:#CBB07E;
  --line:       rgba(33,25,19,.16);

  --font-display: "Marcellus", "Times New Roman", serif;
  --font-body: "Jost", "Segoe UI", system-ui, sans-serif;

  --max: 1200px;
  --pad: clamp(20px, 5vw, 64px);
}

*{ box-sizing:border-box; margin:0; padding:0; }
html{ scroll-behavior:smooth; }
body{
  font-family:var(--font-body);
  background:var(--stone);
  color:var(--ink);
  line-height:1.75;
  font-size:17.5px;
  font-weight:300;
  letter-spacing:.012em;
  -webkit-font-smoothing:antialiased;
}
img, svg, video{ display:block; max-width:100%; }
a{ color:inherit; text-decoration:none; }
ul{ list-style:none; }

h1,h2,h3,.display{ font-family:var(--font-display); font-weight:400; line-height:1.15; letter-spacing:.01em; }

.wrap{ max-width:var(--max); margin-inline:auto; padding-inline:var(--pad); }

/* ---------- Signature: the elevation line ----------
   The roofline from the Kama mark, drawn as a travelling rule
   that ends in the five dots. Used to open every section. */
.elevation{
  display:flex; align-items:flex-end; gap:0;
  height:26px; margin-bottom:26px;
}
.elevation::before{
  content:""; flex:0 0 auto; width:56px; height:100%;
  border-left:2px solid var(--oxblood);
  border-top:2px solid var(--oxblood);
  border-right:2px solid var(--oxblood);
  transform:perspective(60px) rotateX(14deg);
  transform-origin:bottom;
}
.elevation::after{
  content:""; flex:1 1 auto; height:2px; background:var(--oxblood);
  margin-bottom:0;
}
.elevation .dots{ display:flex; gap:9px; margin-left:14px; margin-bottom:-3px; }
.elevation .dots i{
  width:8px; height:8px; border-radius:50%; background:var(--oxblood);
}
.elevation .dots i:nth-child(2n){ background:var(--champagne); }

.elevation--light::before,
.elevation--light::after{ border-color:var(--stone); background:var(--stone); }
.elevation--light::after{ background:var(--stone); }
.elevation--light .dots i{ background:var(--stone); }
.elevation--light .dots i:nth-child(2n){ background:var(--champagne-lt); }

/* ---------- Header ---------- */
.site-header{
  position:sticky; top:0; z-index:60; 

  background:color-mix(in srgb, var(--stone) 88%, transparent);
  backdrop-filter:blur(12px);
  border-bottom:1px solid var(--line);
}
.site-header .bar{
  position:relative;
  display:flex; align-items:center; justify-content:space-between;
  gap:24px; padding-block:10px;
}
@media (min-width: 721px){
  .site-header .bar{ flex-direction:column; gap:10px; padding-block:18px 0; }
  .brand img{ height:161px; transition:height .45s var(--ease-lux, ease); }
  .nav{ padding-bottom:14px; }
  .site-header.scrolled .bar{ padding-block:10px 0; }
  .site-header.scrolled .brand img{ height:76px; }
}
.brand{ display:flex; align-items:center; gap:14px; }
.brand img{ height:100px; width:auto; }
.brand .word{
  font-family:var(--font-display);
  font-size:1.25rem; letter-spacing:.16em; text-transform:uppercase;
}
.brand .word small{
  display:block; font-family:var(--font-body); font-size:.62rem;
  letter-spacing:.42em; color:var(--champagne); text-transform:uppercase;
}
.nav{ display:flex; align-items:center; gap:clamp(16px,3vw,36px); }
.nav a{
  font-size:.82rem; font-weight:400; letter-spacing:.18em; text-transform:uppercase;
  color:var(--ink-soft); padding-block:6px; position:relative;
}
.nav a::after{
  content:""; position:absolute; left:0; right:100%; bottom:0;
  height:2px; background:var(--oxblood); transition:right .3s ease;
}
.nav a:hover::after, .nav a[aria-current="page"]::after{ right:0; }
.nav a[aria-current="page"]{ color:var(--ink); }
.nav .cta{
  border:1px solid var(--oxblood); color:var(--oxblood);
  padding:10px 22px; transition:background .25s, color .25s;
}
.nav .cta::after{ display:none; }
.nav .cta:hover{ background:var(--oxblood); color:var(--paper); }

.nav-toggle{ display:none; background:none; border:0; cursor:pointer; padding:8px; }
.nav-toggle span{ display:block; width:24px; height:2px; background:var(--ink); margin:5px 0; transition:.3s; }

/* ---------- Hero ---------- */
.hero{
  position:relative; min-height:min(92vh, 860px);
  display:flex; align-items:flex-end;
  color:var(--paper); overflow:hidden;
  background:var(--ink);
}
.hero video, .hero .poster{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
}
.hero::after{
  content:""; position:absolute; inset:0;
  background:linear-gradient(to top, rgba(23,16,9,.82) 0%, rgba(23,16,9,.25) 55%, rgba(23,16,9,.15) 100%);
}
.hero .wrap{ position:relative; z-index:2; width:100%; padding-block:clamp(48px,8vh,96px); }
.hero .eyebrow{
  font-size:.92rem; font-weight:700; letter-spacing:.42em; text-transform:uppercase;
  color:#EBD4A0; margin-bottom:18px;
  text-shadow:0 1px 3px rgba(0,0,0,.55), 0 2px 18px rgba(0,0,0,.45);
}
.hero h1{
  font-size:clamp(2.4rem, 5.6vw, 4.6rem);
  max-width:16ch; margin-bottom:22px; color:#F6F1E6;
}
.hero p{ max-width:52ch; color:rgba(248,244,235,.95); margin-bottom:34px; font-size:1.05rem; font-weight:400; text-shadow:0 1px 3px rgba(0,0,0,.45), 0 2px 14px rgba(0,0,0,.35); }
.hero-actions{ display:flex; flex-wrap:wrap; gap:16px; }

.btn{
  display:inline-block; font-family:var(--font-body); font-weight:500;
  font-size:.84rem; letter-spacing:.2em; text-transform:uppercase;
  padding:16px 34px; border:1px solid transparent; cursor:pointer;
  transition:background .25s, color .25s, border-color .25s;
}
.btn-primary{ background:var(--oxblood); color:#F6F1E6; }
.btn-primary:hover{ background:var(--oxblood-dk); }
.btn-ghost{ border-color:rgba(246,241,230,.55); color:#F6F1E6; }
.btn-ghost:hover{ border-color:var(--champagne-lt); color:var(--champagne-lt); }
.btn-dark{ background:var(--ink); color:var(--paper); }
.btn-dark:hover{ background:#000; }

/* ---------- Sections ---------- */
.section{ padding-block:clamp(72px,10vw,128px); }
.section--paper{ background:var(--paper); }
.section--deep{ background:var(--stone-deep); }
.section--ink{ background:var(--ink); color:var(--stone); }

.kicker{
  font-size:.78rem; letter-spacing:.4em; text-transform:uppercase;
  color:var(--oxblood); margin-bottom:14px;
}
.section--ink .kicker{ color:var(--champagne-lt); }
.section h2{ font-size:clamp(1.9rem,3.6vw,2.9rem); max-width:22ch; margin-bottom:22px; }
.lede{ font-size:1.1rem; color:var(--ink-soft); max-width:62ch; }
.section--ink .lede{ color:rgba(237,232,221,.8); }

.split{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,6vw,84px); align-items:center; }
.split .media{ border:none; box-shadow:0 60px 90px -50px rgba(33,25,19,.55); }
/* images that run to the viewport edge */
.bleed-right .media{ margin-right:calc(50% - 50vw); }
.bleed-left .media{ margin-left:calc(50% - 50vw); }
/* editorial overlap: text panel rides over its image */
.editorial{ align-items:center; }
.editorial .panel{
  background:var(--paper); padding:clamp(28px,3.5vw,52px);
  position:relative; z-index:2;
  box-shadow:0 40px 70px -45px rgba(33,25,19,.5);
  border-top:3px solid var(--oxblood);
}
@media (min-width: 961px){
  .editorial .media + .panel{ margin-left:-96px; }
  .editorial .panel:first-child{ margin-right:-96px; }
}
.split .media svg, .split .media img{ width:100%; height:auto; }

/* stats strip */
.figures{ display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:var(--line); border:1px solid var(--line); margin-top:56px; }
.figures div{ background:var(--paper); padding:32px 28px; }
.figures .num{ font-family:var(--font-display); font-size:2.4rem; color:var(--oxblood); }
.figures .lbl{ font-size:.8rem; letter-spacing:.22em; text-transform:uppercase; color:var(--ink-soft); }

/* villa cards */
.villas{ display:grid; grid-template-columns:repeat(3,1fr); gap:28px; margin-top:56px; }
.villa-card{
  background:var(--paper); border:none;
  box-shadow:0 30px 60px -40px rgba(33,25,19,.45);
  display:flex; flex-direction:column; transition:transform .3s ease, box-shadow .3s ease;
}
.villa-card:hover{ transform:translateY(-6px); box-shadow:0 24px 48px -24px rgba(33,25,19,.35); }
.villa-card .media{ aspect-ratio:4/3; overflow:hidden; }
.villa-card .media svg{ width:100%; height:100%; }
.villa-card .body{ padding:26px 26px 30px; display:flex; flex-direction:column; gap:12px; flex:1; }
.villa-card h3{ font-size:1.4rem; }
.villa-card .meta{ display:flex; flex-wrap:wrap; gap:8px 20px; font-size:.86rem; font-weight:300; letter-spacing:.08em; color:var(--ink-soft); }
.villa-card .meta span{ display:inline-flex; align-items:center; gap:8px; }
.villa-card .meta span::before{ content:""; width:6px; height:6px; border-radius:50%; background:var(--champagne); }
.villa-card .link{
  margin-top:auto; align-self:flex-start;
  font-size:.8rem; letter-spacing:.22em; text-transform:uppercase; color:var(--oxblood);
  border-bottom:1px solid var(--oxblood); padding-bottom:3px;
}
.status-pill{
  align-self:flex-start; font-size:.68rem; letter-spacing:.24em; text-transform:uppercase;
  color:var(--champagne); border:1px solid var(--champagne); padding:5px 12px;
}

/* pillars */
.pillars{ display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(24px,4vw,48px); margin-top:56px; }
.pillar h3{ font-size:1.25rem; margin-bottom:10px; }
.pillar p{ color:var(--ink-soft); font-size:.98rem; }
.pillar .glyph{
  width:52px; height:52px; border:1px solid var(--oxblood); border-radius:50%;
  display:grid; place-items:center; margin-bottom:18px;
  font-family:var(--font-display); color:var(--oxblood); font-size:1.2rem;
}

/* quote band */
.quote-band blockquote{
  font-family:var(--font-display);
  font-size:clamp(1.5rem,3vw,2.3rem); line-height:1.4; max-width:26ch;
}
.quote-band cite{
  display:block; margin-top:26px; font-family:var(--font-body); font-style:normal;
  font-size:.8rem; letter-spacing:.32em; text-transform:uppercase; color:#E3C98F;
}

.quote-band--photo{
  background:
    linear-gradient(rgba(23,16,9,.8), rgba(23,16,9,.8)),
    url('../assets/hero-dusk.jpg') center 30%/cover no-repeat;
}

/* villa B: an image on each side of the text */
.triptych{ display:grid; grid-template-columns:1fr; gap:clamp(24px,4vw,48px); align-items:center; }
.triptych .media{ border:none; box-shadow:0 60px 90px -50px rgba(33,25,19,.55); }
@media (min-width: 961px){
  .triptych{ grid-template-columns:1.08fr 0.92fr 1.08fr; }
  .triptych .media:first-child{ margin-left:calc(50% - 50vw); }
  .triptych .media:last-child{ margin-right:calc(50% - 50vw); }
  .triptych .panel{ margin-inline:-70px; }
}

/* the setting: full-bleed nature band */
.setting-band{
  position:relative; min-height:min(88vh, 780px);
  display:flex; align-items:flex-end;
  color:#F6F1E6;
  background:
    linear-gradient(to top, rgba(23,16,9,.82) 0%, rgba(23,16,9,.2) 55%, rgba(23,16,9,.28) 100%),
    url('../assets/setting-forest.jpg') center 40%/cover no-repeat;
}
.setting-band .wrap{ padding-block:clamp(56px,9vh,110px); }
.setting-band .kicker{ color:var(--champagne-lt); }
.setting-band h2{ font-size:clamp(2.2rem,4.6vw,3.8rem); color:#F6F1E6; max-width:16ch; }
.setting-band .lede{ color:rgba(246,241,230,.88); }

/* ---------- Forms ---------- */
.form-shell{
  background:var(--paper); border:1px solid var(--line);
  padding:clamp(28px,4vw,56px);
}
.form-grid{ display:grid; grid-template-columns:1fr 1fr; gap:22px 26px; }
.field{ display:flex; flex-direction:column; gap:8px; }
.field--full{ grid-column:1 / -1; }
.field label{
  font-size:.74rem; font-weight:500; letter-spacing:.24em; text-transform:uppercase; color:var(--ink-soft);
}
.field input, .field select, .field textarea{
  font-family:var(--font-body); font-size:1rem; color:var(--ink);
  background:var(--stone); border:1px solid var(--line);
  padding:14px 16px; border-radius:0; width:100%;
}
.field textarea{ min-height:130px; resize:vertical; }
.field input:focus, .field select:focus, .field textarea:focus{
  outline:2px solid var(--champagne); outline-offset:1px; border-color:var(--champagne);
}
.form-foot{ display:flex; flex-wrap:wrap; align-items:center; gap:20px; margin-top:30px; }
.form-note{ font-size:.85rem; color:var(--ink-soft); max-width:44ch; }
.form-success{
  display:none; margin-top:24px; padding:18px 22px;
  background:#EFF3E8; border:1px solid #9AAD7F; color:#3D4A2C; font-size:.95rem;
}
.form-success.show{ display:block; }

/* contact layout */
.contact-grid{ display:grid; grid-template-columns:0.85fr 1.15fr; gap:clamp(32px,5vw,72px); align-items:start; }
.contact-list li{ padding:20px 0; border-bottom:1px solid var(--line); }
.contact-list .k{ font-size:.72rem; letter-spacing:.3em; text-transform:uppercase; color:var(--oxblood); margin-bottom:4px; }
.contact-list .v{ font-size:1.08rem; font-weight:300; letter-spacing:.02em; }
.contact-list .v strong{ font-family:var(--font-display); font-weight:400; font-size:1.15em; letter-spacing:.03em; }

/* paired call-to-action buttons: even gap side by side, and when they
   stack on small screens they breathe instead of touching */
.cta-row{
  display:flex; flex-wrap:wrap; gap:14px; justify-content:center; align-items:center;
}
.cta-row .btn{ margin:0; }
@media (max-width:520px){
  .cta-row{ flex-direction:column; }
  .cta-row .btn{ width:100%; max-width:340px; text-align:center; }
}

/* ---------- Footer ---------- */
.site-footer{ background:var(--ink); color:var(--stone); padding-block:64px 36px; }
.site-footer .top{
  display:flex; flex-wrap:wrap; justify-content:space-between; gap:36px;
  padding-bottom:44px; border-bottom:1px solid rgba(237,232,221,.14);
}
.site-footer .brand img{ height:96px; }
.site-footer .word{ color:var(--stone); }
.site-footer nav{ display:flex; gap:28px; flex-wrap:wrap; align-items:center; }
.site-footer nav a{ font-size:.8rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(237,232,221,.7); }
.site-footer nav a:hover{ color:var(--champagne-lt); }
.site-footer .base{
  display:flex; flex-wrap:wrap; justify-content:space-between; gap:12px;
  padding-top:26px; font-size:.8rem; color:rgba(237,232,221,.55);
}

/* ---------- Reveal on scroll ---------- */
.reveal{ opacity:0; transform:translateY(24px); transition:opacity .7s ease, transform .7s ease; }
.reveal.in{ opacity:1; transform:none; }

/* ---------- Page hero (interior pages) ---------- */
.page-hero{ padding-block:clamp(64px,9vw,110px) clamp(40px,6vw,72px); }
.page-hero h1{ font-size:clamp(2.2rem,4.6vw,3.6rem); margin-bottom:16px; }

/* ---------- Responsive ---------- */
@media (max-width: 960px){
  .split, .contact-grid{ grid-template-columns:1fr; }
  .villas{ grid-template-columns:1fr 1fr; }
  .pillars{ grid-template-columns:1fr; }
}
@media (max-width: 720px){
  .site-header{ position:sticky; }
  .nav{
    position:absolute; top:100%; left:0; right:0; background:var(--paper);
    flex-direction:column; align-items:flex-start; gap:0;
    border-bottom:0;
    max-height:0; overflow:hidden; transition:max-height .35s ease;
    padding-inline:var(--pad);
  }
  .nav.open{ border-bottom:1px solid var(--line); }
  .nav.open{ max-height:420px; }
  .nav a{ padding:16px 0; width:100%; border-bottom:1px solid var(--line); }
  .nav .cta{ margin-block:16px; text-align:center; }
  .nav-toggle{ display:block; }
  .villas{ grid-template-columns:1fr; }
  .figures{ grid-template-columns:1fr; }
  .form-grid{ grid-template-columns:1fr; }
}

@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior:auto; }
  .reveal{ opacity:1; transform:none; transition:none; }
  .villa-card{ transition:none; }
}

/* ============================================================
   Motion refinement — cinematic reveals & easing
   ============================================================ */
:root{ --ease-lux: cubic-bezier(0.22, 1, 0.36, 1); }

.reveal{
  opacity:0; transform:translateY(34px);
  transition:opacity 1.1s var(--ease-lux), transform 1.1s var(--ease-lux);
  transition-delay:var(--d, 0s);
  will-change:opacity, transform;
}
.reveal.in{ opacity:1; transform:none; }

/* images unveil with a soft settle from a slight zoom */
.media, .villa-card .media{ overflow:hidden; }
.media img, .villa-card .media img{
  transform:scale(1.07);
  transition:transform 1.6s var(--ease-lux);
  will-change:transform;
}
.reveal.in img, .villa-card.in .media img{ transform:scale(1); }
.villa-card .media img{ height:100%; width:100%; object-fit:cover; }
.villa-card:hover .media img{ transform:scale(1.045); }

/* hero: slow cinematic drift + parallax hook */
.hero video, .hero .poster{
  transform:scale(1.08) translateY(calc(var(--parallax, 0) * 1px));
  animation:heroDrift 22s var(--ease-lux) forwards;
}
@keyframes heroDrift{
  from{ transform:scale(1.14) translateY(calc(var(--parallax, 0) * 1px)); }
  to{ transform:scale(1.08) translateY(calc(var(--parallax, 0) * 1px)); }
}
.hero .wrap > *{
  opacity:0; transform:translateY(26px);
  animation:heroRise 1.2s var(--ease-lux) forwards;
}
.hero .eyebrow{ animation-delay:.15s }
.hero h1{ animation-delay:.3s }
.hero p{ animation-delay:.45s }
.hero .hero-actions{ animation-delay:.6s }
@keyframes heroRise{ to{ opacity:1; transform:none; } }

/* header refinement on scroll */
.site-header{ transition:box-shadow .4s ease, background .4s ease; }
.site-header.scrolled{ box-shadow:0 12px 32px -20px rgba(33,25,19,.4); }

/* buttons: soft press + sheen */
.btn{ transition:background .3s var(--ease-lux), color .3s, border-color .3s, transform .25s var(--ease-lux), box-shadow .3s; }
.btn:hover{ transform:translateY(-2px); box-shadow:0 14px 28px -16px rgba(33,25,19,.45); }
.btn:active{ transform:translateY(0); }

.elevation::after{
  transform:scaleX(0); transform-origin:left;
  transition:transform 1.4s var(--ease-lux) .2s;
}
.reveal.in.elevation::after, .elevation.in::after{ transform:scaleX(1); }

@media (prefers-reduced-motion: reduce){
  .reveal, .media img, .villa-card .media img{ transition:none; opacity:1; transform:none; }
  .hero video, .hero .poster, .hero .wrap > *{ animation:none; opacity:1; transform:none; }
  .elevation::after{ transform:none; transition:none; }
}


/* ============================================================
   Arabic version — typography & RTL layout
   ============================================================ */
.nav .lang{ font-weight:500; color:var(--oxblood); }

[dir="rtl"] *{ letter-spacing:0 !important; }
[dir="rtl"] body{ font-family:"IBM Plex Sans Arabic","Segoe UI",system-ui,sans-serif; font-weight:300; line-height:1.95; }
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] .display,
[dir="rtl"] .figures .num{ font-family:"IBM Plex Sans Arabic",sans-serif; font-weight:600; line-height:1.4; }
[dir="rtl"] .btn, [dir="rtl"] .kicker, [dir="rtl"] .field label{ font-weight:700; }
[dir="rtl"] .quote-band blockquote{ font-family:"IBM Plex Sans Arabic",sans-serif; font-weight:300; line-height:1.8; }

/* flip the edge bleeds and overlaps */
[dir="rtl"] .bleed-right .media{ margin-right:0; margin-left:calc(50% - 50vw); }
[dir="rtl"] .bleed-left .media{ margin-left:0; margin-right:calc(50% - 50vw); }
@media (min-width: 961px){
  [dir="rtl"] .editorial .media + .panel{ margin-left:0; margin-right:-96px; }
  [dir="rtl"] .editorial .panel:first-child{ margin-right:0; margin-left:-96px; }
  [dir="rtl"] .triptych .media:first-child{ margin-left:0; margin-right:calc(50% - 50vw); }
  [dir="rtl"] .triptych .media:last-child{ margin-right:0; margin-left:calc(50% - 50vw); }
}
[dir="rtl"] .elevation::before{ border-right:2px solid var(--oxblood); }

/* ============================================================
   Hima Cinema — coded hero animation (rebuilt clean, single source)
   ============================================================ */
.cinema{
  position:relative; min-height:min(100vh, 960px);
  display:flex; align-items:flex-end;
  overflow:hidden; background:var(--ink); color:#F6F1E6;
}
.cinema .scene{ position:absolute; inset:0; opacity:0; z-index:0; transition:none; pointer-events:none; }
.cinema .scene.exit{ opacity:1; z-index:1; }
.cinema .scene.active{ opacity:1; z-index:2; transition:opacity 2.2s cubic-bezier(.4,0,.2,1); }
.cinema .scene img, .cinema .scene video{
  width:100%; height:100%; object-fit:cover; will-change:transform; transform:scale(1.06);
}
.cinema .scene.has-video img{ display:none; }
.cinema .scene.has-video.active video{ animation:none !important; transform:none; }
.cinema .scene.active img, .cinema .scene.exit img{
  animation-duration:10.6s; animation-timing-function:linear; animation-fill-mode:forwards;
}
.cinema .scene.active[data-move="in"] img,  .cinema .scene.exit[data-move="in"] img { animation-name:cinIn; }
.cinema .scene.active[data-move="out"] img, .cinema .scene.exit[data-move="out"] img{ animation-name:cinOut; }
@keyframes cinIn { from{ transform:scale(1.06); } to{ transform:scale(1.14); } }
@keyframes cinOut{ from{ transform:scale(1.14); } to{ transform:scale(1.06); } }

.cinema::after{
  content:""; position:absolute; inset:0; z-index:2; pointer-events:none;
  background:linear-gradient(to top, rgba(23,16,9,.82) 0%, rgba(23,16,9,.22) 55%, rgba(23,16,9,.18) 100%);
}
.cinema-cover{
  position:absolute; inset:0; z-index:7; background:var(--ink);
  opacity:1; transition:opacity 1.4s cubic-bezier(.4,0,.2,1); pointer-events:none;
}
.cinema.ready .cinema-cover{ opacity:0; }
.cinema-atmo{ position:absolute; inset:0; z-index:3; pointer-events:none; opacity:0; transition:opacity 2s ease; }
.cinema.is-dusk .cinema-atmo{ opacity:.55; }

.cinema .wrap{
  position:relative; z-index:4; width:100%;
  padding-block:clamp(48px,8vh,96px) clamp(96px,13vh,150px);
}
.cinema h1{
  font-size:clamp(5.4rem, 10vw, 8.75rem); max-width:14ch;
  line-height:1.05; margin-bottom:26px; color:#FBF7EC;
  text-shadow:0 2px 6px rgba(0,0,0,.35), 0 6px 30px rgba(0,0,0,.3);
}
.cinema p.lead{
  max-width:52ch; color:rgba(248,244,235,.95); margin-bottom:34px;
  font-size:1.05rem; font-weight:400;
  text-shadow:0 1px 3px rgba(0,0,0,.45), 0 2px 14px rgba(0,0,0,.35);
}

.cinema-progress{
  position:absolute; z-index:5;
  inset-inline-end:clamp(20px,4vw,56px); bottom:clamp(24px,5vh,56px);
  display:flex; gap:10px;
}
.cinema-progress button{
  width:44px; height:3px; border:0; padding:0; cursor:pointer;
  background:rgba(246,241,230,.28); position:relative; overflow:hidden;
  transition:background .3s;
}
.cinema-progress button:hover{ background:rgba(246,241,230,.5); }
.cinema-progress button::after{
  content:""; position:absolute; inset:0; background:var(--champagne-lt);
  transform:scaleX(0); transform-origin:left;
}
[dir="rtl"] .cinema-progress button::after{ transform-origin:right; }
.cinema-progress button.active::after{ animation:segFill var(--t,7600ms) linear forwards; }
.cinema-progress button.done::after{ animation:none; transform:scaleX(1); }
@keyframes segFill{ from{ transform:scaleX(0); } to{ transform:scaleX(1); } }

.cinema-scroll{
  position:absolute; z-index:5; left:50%; transform:translateX(-50%); bottom:14px;
  display:flex; flex-direction:column; align-items:center; gap:8px;
  color:rgba(246,241,230,.75); font-size:.68rem; letter-spacing:.3em; text-transform:uppercase;
  text-decoration:none;
}
[dir="rtl"] .cinema-scroll{ letter-spacing:0; }
.cinema-scroll::after{
  content:""; width:1px; height:34px;
  background:linear-gradient(to bottom, rgba(246,241,230,.8), transparent);
  animation:scrollPulse 2.2s ease-in-out infinite;
}
@keyframes scrollPulse{ 0%,100%{ transform:scaleY(.4); transform-origin:top; opacity:.5 } 50%{ transform:scaleY(1); opacity:1 } }

@media (max-width:720px){
  .cinema-progress{ inset-inline-end:auto; inset-inline-start:var(--pad); }
  .cinema-scroll{ display:none; }
}
@media (prefers-reduced-motion: reduce){
  .cinema .scene.active img{ animation:none; transform:scale(1.06); }
  .cinema-progress button.active::after{ animation:none; transform:scaleX(1); }
  .cinema-scroll::after{ animation:none; }
}
