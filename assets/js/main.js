/* ============================================================================
 * Global eSIM — site engine
 * ----------------------------------------------------------------------------
 * Reads window.SITE_CONFIG (config.js) and window.I18N (i18n.*.js) and wires up:
 *   - brand name and tagline
 *   - navigation (active state, mobile toggle)
 *   - the 7-language switcher (?lang=xx, remembered in localStorage)
 *   - every contact link (WhatsApp deep link, mailto, WeChat copy)
 *   - every social icon, hiding any platform you have not configured yet
 *   - footer year and legal links
 * No dependencies. No tracking. No cookies (localStorage only).
 * ==========================================================================*/
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var I18N = window.I18N || {};
  var LANGS = (CFG.site && CFG.site.languages) || [{ code: "en", label: "English", short: "EN" }];
  var LANG_CODES = LANGS.map(function (l) { return l.code; });

  /* ------------------------------------------------------------- icons --- */
  var ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    cross: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></svg>',
    wechat: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.9 3C4.5 3 1 6 1 9.7c0 2 1.1 3.9 2.9 5.1l-.7 2.2 2.5-1.3c.9.3 1.9.4 2.9.3-.2-.6-.3-1.2-.3-1.9 0-3.6 3.5-6.5 7.8-6.5h.6C16.1 4.9 12.8 3 8.9 3zm-2.6 3.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5.2 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/><path d="M23 14.1c0-3-3-5.5-6.6-5.5s-6.6 2.5-6.6 5.5 3 5.5 6.6 5.5c.8 0 1.6-.1 2.3-.4l2 1.1-.5-1.8c1.7-1 2.8-2.6 2.8-4.4zm-8.8-1.5a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7zm4.4 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="14"/><circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 22 8 12 14 2 8 12 2"/><polyline points="2 14 12 20 22 14"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 17 4 12 9 7"/><polyline points="15 7 20 12 15 17"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 20v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4a1.2 1.2 0 0 1 1.2-1.2H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.4"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9 1.7l4.4 3.3-2.2 2.2-2.3-.5a.8.8 0 0 0-.8 1.3l2 2 2 2a.8.8 0 0 0 1.3-.8l-.5-2.3 2.2-2.2 3.3 4.4a1 1 0 0 0 1.7-.9z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="20" x2="20" y2="20"/><rect x="6" y="11" width="3" height="9"/><rect x="11" y="6" width="3" height="14"/><rect x="16" y="14" width="3" height="6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
  };

  var SOCIAL = {
    x: {
      label: "X",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    },
    instagram: {
      label: "Instagram",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    },
    tiktok: {
      label: "TikTok",
      path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
    },
    youtube: {
      label: "YouTube",
      path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    },
    facebook: {
      label: "Facebook",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    xiaohongshu: {
      label: "Xiaohongshu (RED)",
      // Simplified "notes / book" mark — Xiaohongshu has no official open glyph.
      path: "M4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15A2.5 2.5 0 0 1 4.5 2zm3.1 4.2v11.6M11 7.4h6.2M11 11.2h6.2M11 15h4"
      , stroked: true
    },
    threads: {
      label: "Threads",
      path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"
    }
  };

  /* -------------------------------------------------------------- utils --- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function on(el, ev, fn) { if (el) el.addEventListener(ev, fn); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function money(n, dp) {
    var c = CFG.commercial || {};
    var v = Number(n) || 0;
    return (c.currencySymbol || "HK$") + v.toLocaleString("en-US", {
      minimumFractionDigits: dp == null ? 2 : dp,
      maximumFractionDigits: dp == null ? 2 : dp
    });
  }
  function icon(name) { return ICONS[name] || ""; }

  /* ---------------------------------------------------- language state --- */
  function detectLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && LANG_CODES.indexOf(q) !== -1) return q;
    try {
      var saved = localStorage.getItem("gesim_lang");
      if (saved && LANG_CODES.indexOf(saved) !== -1) return saved;
    } catch (e) { /* private mode */ }
    var nav = (navigator.language || "en");
    var exact = LANG_CODES.filter(function (c) { return c.toLowerCase() === nav.toLowerCase(); })[0];
    if (exact) return exact;
    var base = nav.split("-")[0].toLowerCase();
    var loose = LANG_CODES.filter(function (c) { return c.split("-")[0].toLowerCase() === base; })[0];
    return loose || (CFG.site && CFG.site.defaultLang) || "en";
  }

  var currentLang = "en";

  function t(key, lang) {
    var dict = I18N[lang || currentLang] || {};
    var en = I18N.en || {};
    return dict[key] || en[key] || "";
  }

  function applyI18n(lang) {
    currentLang = lang;

    $$("[data-i18n]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n"), lang);
      if (val) el.textContent = val;
    });

    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length !== 2) return;
        var val = t(bits[1].trim(), lang);
        if (val) el.setAttribute(bits[0].trim(), val);
      });
    });

    var tagline = (CFG.brand && CFG.brand.tagline) ? (CFG.brand.tagline[lang] || CFG.brand.tagline.en) : "";
    $$("[data-brand-tagline]").forEach(function (el) { if (tagline) el.textContent = tagline; });

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", "ltr");

    $$(".lang-menu button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var shortEl = $(".lang-btn .lang-current");
    if (shortEl) {
      var meta = LANGS.filter(function (l) { return l.code === lang; })[0];
      shortEl.textContent = meta ? meta.short : lang.toUpperCase();
    }
    try { localStorage.setItem("gesim_lang", lang); } catch (e) { /* ignore */ }

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function buildLangSwitcher() {
    var host = $("[data-lang-switcher]");
    if (!host) return;
    var menuId = "lang-menu";
    host.innerHTML =
      '<button class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="' + menuId + '">' +
        '<span class="globe">' + ICONS.globe + '</span>' +
        '<span class="lang-current">EN</span>' +
        '<span class="chev">' + ICONS.chevron + '</span>' +
        '<span class="sr-only" data-i18n="common.language">Language</span>' +
      '</button>' +
      '<div class="lang-menu" id="' + menuId + '" role="menu">' +
        LANGS.map(function (l) {
          return '<button type="button" role="menuitemradio" aria-pressed="false" data-lang="' + esc(l.code) + '">' +
            '<span>' + esc(l.label) + '</span><span class="tag">' + esc(l.short) + '</span></button>';
        }).join("") +
      '</div>';

    var btn = $(".lang-btn", host);
    var menu = $(".lang-menu", host);
    on(btn, "click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    $$("button[data-lang]", menu).forEach(function (b) {
      on(b, "click", function () {
        applyI18n(b.getAttribute("data-lang"));
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        try {
          var url = new URL(location.href);
          url.searchParams.set("lang", b.getAttribute("data-lang"));
          history.replaceState(null, "", url);
        } catch (e) { /* ignore */ }
      });
    });
    on(document, "click", function () {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
    on(document, "keydown", function (e) {
      if (e.key === "Escape") { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  /* --------------------------------------------------------- navigation --- */
  function wireNav() {
    var burger = $(".burger");
    var nav = $(".nav");
    on(burger, "click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    $$(".nav a").forEach(function (a) {
      on(a, "click", function () { nav.classList.remove("open"); burger && burger.setAttribute("aria-expanded", "false"); });
    });

    var path = location.pathname.split("/").pop() || "index.html";
    $$(".nav a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("#")[0].split("?")[0];
      if (href && (href === path || (path === "" && href === "index.html"))) a.setAttribute("aria-current", "page");
    });

    var hdr = $(".site-header");
    if (hdr) {
      var onScroll = function () { hdr.classList.toggle("is-scrolled", window.scrollY > 8); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* -------------------------------------------------- contact + social --- */
  function wireContact() {
    var c = CFG.contact || {};

    var waHref = c.whatsapp ? ("https://wa.me/" + c.whatsapp) : "";
    $$("[data-contact='whatsapp']").forEach(function (el) {
      if (!waHref) { el.style.display = "none"; return; }
      if (el.tagName === "A") {
        el.href = waHref + (el.getAttribute("data-wa-text") ? ("?text=" + encodeURIComponent(el.getAttribute("data-wa-text"))) : "");
        el.target = "_blank"; el.rel = "noopener";
      } else { el.textContent = c.whatsappDisplay || c.whatsapp; }
    });
    $$("[data-contact='whatsapp-display']").forEach(function (el) { el.textContent = c.whatsappDisplay || ""; });

    $$("[data-contact='email']").forEach(function (el) {
      if (!c.email) { el.style.display = "none"; return; }
      if (el.tagName === "A") el.href = "mailto:" + c.email;
      else el.textContent = c.email;
    });

    $$("[data-contact='wechat']").forEach(function (el) { el.textContent = c.wechat || ""; });
    $$("[data-contact='hours']").forEach(function (el) { el.textContent = c.hours || ""; });
    $$("[data-contact='phone']").forEach(function (el) {
      if (!c.phone) { el.style.display = "none"; return; }
      if (el.tagName === "A") el.href = "tel:" + c.phone;
      else el.textContent = c.phoneDisplay || c.phone;
    });
    $$("[data-contact='address']").forEach(function (el) {
      if (!c.address) { el.style.display = "none"; return; }
      el.textContent = c.addressDisplay || c.address;
    });

    // brand
    $$("[data-brand-name]").forEach(function (el) { el.textContent = (CFG.brand && CFG.brand.name) || "Global eSIM"; });
    $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  function socialIconHTML(key, cls) {
    var s = SOCIAL[key];
    if (!s) return "";
    if (s.stroked) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
             'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + s.path + '"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + s.path + '"/></svg>';
  }

  function renderSocial() {
    var cfg = CFG.social || {};
    var active = Object.keys(SOCIAL).filter(function (k) { return cfg[k]; });

    $$("[data-social]").forEach(function (host) {
      if (!active.length) {
        host.innerHTML = '<span class="small muted" data-social-empty>Social channels are being set up. In the meantime, reach us on WhatsApp or by email.</span>';
        return;
      }
      host.innerHTML = active.map(function (k) {
        return '<a href="' + esc(cfg[k]) + '" target="_blank" rel="noopener me" data-net="' + k + '" ' +
               'title="' + esc(SOCIAL[k].label) + '" aria-label="' + esc(SOCIAL[k].label) + '">' +
               socialIconHTML(k, "") + '</a>';
      }).join("");
    });
  }

  /* ---------------------------------------------------------- FAQ page --- */
  function initFaq() {
    var listEl = $("[data-faq-list]");
    if (!listEl) return;

    var data = window.FAQ_DATA || {};
    var CATS = ["basics", "commercial", "technical", "compliance", "support"];
    var state = { lang: currentLang, cat: "all", q: "" };

    var catLabels = {
      en: { basics: "eSIM basics", commercial: "Partnering & commercial", technical: "Technical & integration", compliance: "Compliance & data", support: "Payments & support", all: "All topics" },
      ko: { basics: "eSIM 기본", commercial: "제휴 및 상거래", technical: "기술 및 연동", compliance: "규정 및 데이터", support: "결제 및 지원", all: "전체 주제" },
      ja: { basics: "eSIMの基本", commercial: "提携・商談", technical: "技術・連携", compliance: "規制・データ", support: "支払い・サポート", all: "すべてのトピック" },
      "zh-CN": { basics: "eSIM 基础", commercial: "合作与商务", technical: "技术与对接", compliance: "合规与数据", support: "支付与支持", all: "全部主题" },
      "zh-TW": { basics: "eSIM 基礎", commercial: "合作與商務", technical: "技術與對接", compliance: "合規與數據", support: "支付與支援", all: "全部主題" },
      fr: { basics: "Bases de l'eSIM", commercial: "Partenariat et commercial", technical: "Technique et intégration", compliance: "Conformité et données", support: "Paiement et support", all: "Tous les sujets" },
      es: { basics: "Fundamentos de la eSIM", commercial: "Alianzas y comercial", technical: "Técnico e integración", compliance: "Cumplimiento y datos", support: "Pagos y soporte", all: "Todos los temas" }
    };

    function items() { return data[state.lang] || data.en || []; }
    function labels() { return catLabels[state.lang] || catLabels.en; }

    function buildChips() {
      var host = $("[data-faq-chips]");
      if (!host) return;
      var L = labels();
      host.innerHTML = ["all"].concat(CATS).map(function (c) {
        return '<button class="chip" type="button" data-cat="' + c + '" aria-pressed="' + (state.cat === c) + '">' + esc(L[c] || c) + '</button>';
      }).join("");
      $$("button[data-cat]", host).forEach(function (b) {
        on(b, "click", function () { state.cat = b.getAttribute("data-cat"); render(); buildChips(); });
      });
    }

    function render() {
      var L = labels();
      var term = state.q.toLowerCase().trim();
      var rows = items().filter(function (it) {
        if (state.cat !== "all" && it.cat !== state.cat) return false;
        if (!term) return true;
        return (it.q + " " + it.a).toLowerCase().indexOf(term) !== -1;
      });

      var countEl = $("[data-faq-count]");
      if (countEl) {
        countEl.textContent = rows.length + " " + (state.lang === "en" ? (rows.length === 1 ? "question" : "questions") : "");
      }
      var titleEl = $("[data-faq-cat-title]");
      if (titleEl) titleEl.textContent = L[state.cat] || "";

      if (!rows.length) {
        listEl.innerHTML = '<div class="dest-empty" data-i18n="common.noResults">' + esc(t("common.noResults", state.lang)) + '</div>';
        return;
      }

      listEl.innerHTML = rows.map(function (it, i) {
        return '<div class="acc-item' + (i === 0 && !term ? " open" : "") + '">' +
          '<button class="acc-btn" type="button" aria-expanded="' + (i === 0 && !term) + '">' +
            '<span>' + esc(it.q) + '</span><span class="chev">' + ICONS.chevron + '</span>' +
          '</button>' +
          '<div class="acc-panel"><p>' + esc(it.a) + '</p></div>' +
        '</div>';
      }).join("");

      $$(".acc-item", listEl).forEach(function (item) {
        var btn = $(".acc-btn", item);
        on(btn, "click", function () {
          var open = item.classList.toggle("open");
          btn.setAttribute("aria-expanded", String(open));
        });
      });
    }

    var search = $("[data-faq-search]");
    if (search) {
      on(search, "input", function () { state.q = search.value; render(); });
      search.setAttribute("placeholder", t("common.searchPlaceholder", currentLang));
    }

    document.addEventListener("langchange", function (e) {
      state.lang = e.detail.lang;
      if (search) search.setAttribute("placeholder", t("common.searchPlaceholder", state.lang));
      buildChips(); render();
    });

    buildChips();
    render();
  }

  /* ----------------------------------------------------------- boot up --- */
  function boot() {
    buildLangSwitcher();
    wireNav();
    wireContact();
    renderSocial();
    applyI18n(detectLang());
    initFaq();
    $$("[data-icon]").forEach(function (el) {
      var n = el.getAttribute("data-icon");
      if (ICONS[n]) el.innerHTML = ICONS[n];
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  /* ------------------------------------------------- public API (shared) -- */
  window.GESIM = {
    t: t,
    money: money,
    icon: icon,
    esc: esc,
    $: $, $$: $$, on: on,
    socialIconHTML: socialIconHTML,
    get lang() { return currentLang; },
    setLang: applyI18n,
    config: CFG
  };
})();
