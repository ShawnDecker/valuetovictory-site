/* vtv-tracking.js — Meta Pixel + Google Analytics 4 + first-party ad attribution.
 *
 * - Third-party trackers (Meta Pixel, GA4) load ONLY after the visitor accepts cookies
 *   (vtv_cookie_consent === 'accepted', set by /cookie-consent.js). Declined = nothing loads.
 * - Calls made before consent are queued by stubs and flushed if/when the visitor accepts.
 * - First-touch ad attribution (utm_*, fbclid, gclid, landing page, referrer) is kept in
 *   localStorage and sent to our own /api/track when a lead or purchase happens. No cookies.
 * - Lead      = successful POST /api/assessment or /api/free-book-signup
 *   Purchase  = checkout-success page (window.vtvTrack.purchase called there)
 *
 * An empty ID disables that tracker.
 */
(function () {
  'use strict';
  if (window.vtvTrack) return;

  var CONFIG = {
    META_PIXEL_ID: '1853993735559855', // web pixel "Value to Victory" in portfolio Shawn E Decker (1377...232 was an app ID, never received events)
    GA4_ID: 'G-TT6PYLPP31',         // same GA4 property the existing page tags already use
    TRACK_URL: '',        // first-party attribution endpoint; '' = off (main site has no API)
    ASSESSMENT_HOST: 'assessment.valuetovictory.com'
  };

  var LS_ATTR = 'vtv_attribution';
  var LS_CONSENT = 'vtv_cookie_consent';

  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { return null; }
  }

  // ---------- first-touch attribution ----------
  function captureAttribution() {
    var p;
    try { p = new URLSearchParams(location.search); } catch (e) { return; }
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
    var hit = {};
    var any = false;
    keys.forEach(function (k) { var v = p.get(k); if (v) { hit[k] = v.slice(0, 200); any = true; } });
    var existing = null;
    try { existing = JSON.parse(ls(LS_ATTR) || 'null'); } catch (e) {}
    if (any || !existing) {
      var rec = existing && !any ? existing : hit;
      rec.landing = (location.pathname || '/').slice(0, 200);
      var ref = document.referrer || '';
      try { if (ref && new URL(ref).host === location.host) ref = ''; } catch (e) {}
      if (ref || !rec.referrer) rec.referrer = ref.slice(0, 300);
      rec.first_seen = rec.first_seen || new Date().toISOString();
      if (any) rec.last_touch = new Date().toISOString();
      ls(LS_ATTR, JSON.stringify(rec));
    }
  }
  function attribution() {
    try { return JSON.parse(ls(LS_ATTR) || '{}') || {}; } catch (e) { return {}; }
  }

  // ---------- stubs (queue until consent) ----------
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) window.gtag = function () { window.dataLayer.push(arguments); };
  if (!window.fbq) {
    var q = function () { q.callMethod ? q.callMethod.apply(q, arguments) : q.queue.push(arguments); };
    q.push = q; q.loaded = true; q.version = '2.0'; q.queue = [];
    window.fbq = q; window._fbq = q;
  }

  var loaded = false;
  function loadScript(src) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    (document.head || document.documentElement).appendChild(s);
  }
  function loadTrackers() {
    if (loaded) return;
    loaded = true;
    // Many pages already ship their own gtag snippet; don't load or configure GA a second time there.
    var gaOnPage = !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    if (CONFIG.GA4_ID && !gaOnPage) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.GA4_ID));
      window.gtag('js', new Date());
      window.gtag('config', CONFIG.GA4_ID);
    }
    if (CONFIG.META_PIXEL_ID) {
      loadScript('https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CONFIG.META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }
  function consentState() { return ls(LS_CONSENT); }

  // ---------- events ----------
  function sendFirstParty(eventType, extra) {
    if (!CONFIG.TRACK_URL) return;
    try {
      var body = JSON.stringify({
        eventType: eventType,
        contactId: (extra && extra.contactId) || null,
        metadata: Object.assign({ page: location.pathname }, attribution(), (extra && extra.meta) || {})
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(CONFIG.TRACK_URL, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(CONFIG.TRACK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true });
      }
    } catch (e) {}
  }

  var sentLead = {};
  function lead(source, contactId) {
    if (sentLead[source]) return;
    sentLead[source] = true;
    var a = attribution();
    window.fbq('track', 'Lead', { content_name: source });
    window.gtag('event', 'generate_lead', { lead_source: source, campaign: a.utm_campaign || '' });
    sendFirstParty('lead', { contactId: contactId, meta: { lead_source: source } });
  }

  function purchase(opts) {
    opts = opts || {};
    var value = Number(opts.value) || 0;
    var currency = (opts.currency || 'USD').toUpperCase();
    var id = opts.transactionId || '';
    // one purchase event per Stripe session, even on page refresh
    if (id && ls('vtv_purchase_sent_' + id)) return;
    if (id) ls('vtv_purchase_sent_' + id, '1');
    window.fbq('track', 'Purchase', { value: value, currency: currency }, id ? { eventID: id } : undefined);
    window.gtag('event', 'purchase', { transaction_id: id, value: value, currency: currency });
    sendFirstParty('purchase', { meta: { value: value, currency: currency, transaction_id: id } });
  }

  // ---------- auto-detect leads from existing form submits ----------
  var LEAD_ENDPOINTS = { '/api/assessment': 'assessment', '/api/free-book-signup': 'free_book' };
  if (window.fetch) {
    var origFetch = window.fetch;
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
      var path = '';
      try { path = new URL(url, location.href).pathname; } catch (e) {}
      var source = method === 'POST' ? LEAD_ENDPOINTS[path] : null;
      var p = origFetch.apply(this, arguments);
      if (source) {
        p.then(function (res) {
          if (!res || !res.ok) return;
          res.clone().json().then(function (d) {
            lead(source, d && (d.contactId || d.contact_id || (d.contact && d.contact.id)) || null);
          }, function () { lead(source, null); });
        }, function () {});
      }
      return p;
    };
  }

  // ---------- carry ad source across to the assessment site ----------
  // localStorage isn't shared between valuetovictory.com and the assessment subdomain, so on any
  // other host, add the stored utm_* / fbclid / gclid to links that point at the assessment.
  function decorateLinks() {
    if (location.host === CONFIG.ASSESSMENT_HOST) return;
    var a = attribution();
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
    if (!keys.some(function (k) { return a[k]; })) return;
    document.addEventListener('click', function (ev) {
      var el = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!el) return;
      try {
        var u = new URL(el.href, location.href);
        if (u.host !== CONFIG.ASSESSMENT_HOST) return;
        keys.forEach(function (k) { if (a[k] && !u.searchParams.has(k)) u.searchParams.set(k, a[k]); });
        el.href = u.toString();
      } catch (e) {}
    }, true);
  }

  // ---------- consent wiring ----------
  function onConsent(accepted) { if (accepted) loadTrackers(); }
  window.addEventListener('vtv:consent', function (e) { onConsent(e && e.detail && e.detail.accepted); });

  captureAttribution();
  decorateLinks();
  var c = consentState();
  if (c === 'accepted') {
    loadTrackers();
  } else if (!c && !document.querySelector('script[src*="cookie-consent.js"]')) {
    // page doesn't include the banner yet — add it so the visitor can choose
    var cc = document.createElement('script');
    cc.src = '/cookie-consent.js'; cc.defer = true;
    document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(cc); });
    if (document.readyState !== 'loading') document.body.appendChild(cc);
  }

  window.vtvTrack = { lead: lead, purchase: purchase, attribution: attribution, config: CONFIG };
})();
