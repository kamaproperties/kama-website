/* Meta Pixel — Kama Properties / Hima. Loaded on every page. ID lives here only. */
(function () {
  'use strict';
  var PIXEL_ID = '1074065692268490';

  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  var lang = /^ar/i.test(document.documentElement.lang || '') ? 'ar' : 'en';

  // Residences page: warmest retargeting pool
  if (/projects/i.test(location.pathname)) {
    fbq('track', 'ViewContent', { content_name: 'residences', content_category: lang });
  }

  // Contact: WhatsApp, phone or email tapped anywhere on any page
  document.addEventListener('click', function (ev) {
    var t = ev.target, a = t && t.closest ? t.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var how = href.indexOf('wa.me') > -1 ? 'whatsapp'
            : href.indexOf('tel:') === 0 ? 'phone'
            : href.indexOf('mailto:') === 0 ? 'email' : null;
    if (!how) return;
    fbq('track', 'Contact', { content_name: how, content_category: lang });
  }, true);

  // Jordanian numbers to international digits (0791471477 -> 962791471477)
  function phoneDigits(v) {
    var d = String(v || '').replace(/\D/g, '');
    if (!d) return '';
    if (d.indexOf('00') === 0) d = d.slice(2);
    else if (d.charAt(0) === '0' && d.length === 10) d = '962' + d.slice(1);
    else if (d.length === 9 && d.charAt(0) === '7') d = '962' + d;
    return d;
  }

  // Read the fields at submit: the form resets itself before success shows
  function snapshot(form) {
    var get = function (n) {
      var el = form.querySelector('[name="' + n + '"]');
      return el && el.value ? String(el.value).trim() : '';
    };
    var parts = get('name').split(/\s+/).filter(Boolean);
    var user = {}, em = get('email'), ph = phoneDigits(get('phone'));
    if (em) user.em = em.toLowerCase();
    if (ph) user.ph = ph;
    if (parts.length) user.fn = parts[0].toLowerCase();
    if (parts.length > 1) user.ln = parts[parts.length - 1].toLowerCase();
    return { user: user, villa: get('villa') };
  }

  // Lead: only once the interest form has actually been sent
  function watch(form) {
    var ok = form.parentElement && form.parentElement.querySelector('.form-success');
    if (!ok || !window.MutationObserver) return;
    var snap = null, fired = false;
    form.addEventListener('submit', function () { snap = snapshot(form); }, true);
    new MutationObserver(function () {
      if (fired || !snap || !ok.classList.contains('show')) return;
      fired = true;
      fbq('init', PIXEL_ID, snap.user);
      fbq('track', 'Lead', { content_name: 'register-interest', content_category: lang, villa: snap.villa });
    }).observe(ok, { attributes: true, attributeFilter: ['class'] });
  }

  function setup() {
    Array.prototype.forEach.call(document.querySelectorAll('form[data-eoi]'), watch);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
