/* ============================================================================
 * Global eSIM — video showcase
 * ----------------------------------------------------------------------------
 * Renders videos.html from the `videos` array in assets/js/config.js.
 *
 * Design decision: videos are CLICK TO LOAD. The page shows a poster image and
 * a play button; the YouTube iframe — and therefore Google's cookies and any
 * tracking — is only created when a visitor actually presses play. That keeps
 * the page fast, and keeps the site's promise of no third-party tracking on
 * load. Embeds use youtube-nocookie.com.
 *
 * To add, remove or reorder videos, edit `videos` in config.js. Nothing here
 * needs to change.
 * ==========================================================================*/
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var G = window.GESIM || {};
  var $ = G.$, $$ = G.$$, on = G.on, esc = G.esc;

  var CATEGORY_LABEL = {
    all:      "All videos",
    basics:   "eSIM basics",
    travel:   "Travel & roaming",
    business: "For business",
    own:      "Our own videos"
  };
  var CATEGORY_ORDER = ["all", "basics", "travel", "business", "own"];

  var state = { cat: "all" };

  function playIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  }
  function ytIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z"/></svg>';
  }

  function videos() {
    var list = CFG.videos;
    return Object.prototype.toString.call(list) === "[object Array]" ? list : [];
  }

  function card(v) {
    var thumb = "https://i.ytimg.com/vi/" + encodeURIComponent(v.id) + "/hqdefault.jpg";
    var watch = "https://www.youtube.com/watch?v=" + encodeURIComponent(v.id);
    var label = CATEGORY_LABEL[v.category] || CATEGORY_LABEL.basics;

    return '<article class="video-card" data-video="' + esc(v.id) + '" data-cat="' + esc(v.category || "basics") + '">' +
      '<button class="video-frame" type="button" data-play="' + esc(v.id) + '" ' +
        'aria-label="Play video: ' + esc(v.title) + '">' +
        '<img src="' + thumb + '" alt="" loading="lazy" width="480" height="360">' +
        '<span class="video-badge badge badge-ink">' + esc(v.lang || "EN") + '</span>' +
        '<span class="video-play">' + playIcon() + '</span>' +
      '</button>' +
      '<div class="video-body">' +
        '<span class="badge badge-brand" style="align-self:flex-start">' + esc(label) + '</span>' +
        '<h3>' + esc(v.title) + '</h3>' +
        '<span class="video-channel">' + ytIcon() + esc(v.channel || "YouTube") + '</span>' +
        (v.note ? '<p class="video-note">' + esc(v.note) + '</p>' : '') +
        '<div class="video-actions">' +
          '<a class="btn btn-ghost btn-sm" href="' + watch + '" target="_blank" rel="noopener">' +
            'Open on YouTube</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function render() {
    var host = $("[data-video-grid]");
    if (!host) return;

    var all = videos();
    var rows = all.filter(function (v) {
      return state.cat === "all" || (v.category || "basics") === state.cat;
    });

    var countEl = $("[data-video-count]");
    if (countEl) {
      countEl.textContent = rows.length + (rows.length === 1 ? " video" : " videos");
    }

    if (!rows.length) {
      host.innerHTML = '<div class="video-empty"><p><strong>No videos in this category yet.</strong></p>' +
        '<p class="small">Add entries to the <code>videos</code> array in <code>assets/js/config.js</code> ' +
        'and they will appear here automatically.</p></div>';
      return;
    }

    host.innerHTML = rows.map(card).join("");

    $$("[data-play]", host).forEach(function (btn) {
      on(btn, "click", function () {
        var id = btn.getAttribute("data-play");
        var title = btn.getAttribute("aria-label") || "Video";
        // Only now do we create the iframe and contact YouTube.
        btn.classList.add("is-playing");
        btn.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' +
          encodeURIComponent(id) + '?autoplay=1&rel=0&modestbranding=1" title="' + esc(title) + '" ' +
          'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
          'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
      });
    });
  }

  function renderChips() {
    var host = $("[data-video-chips]");
    if (!host) return;
    var all = videos();
    var present = {};
    all.forEach(function (v) { present[v.category || "basics"] = true; });

    // Only offer a filter for categories that actually have videos.
    var cats = CATEGORY_ORDER.filter(function (c) { return c === "all" || present[c]; });
    host.innerHTML = cats.map(function (c) {
      return '<button class="chip" type="button" data-vcat="' + c + '" aria-pressed="' +
        (state.cat === c) + '">' + esc(CATEGORY_LABEL[c]) + '</button>';
    }).join("");

    $$("button[data-vcat]", host).forEach(function (b) {
      on(b, "click", function () {
        state.cat = b.getAttribute("data-vcat");
        renderChips(); render();
      });
    });
  }

  function boot() {
    if (!$("[data-video-grid]")) return;
    if (!videos().length) {
      var host = $("[data-video-grid]");
      host.innerHTML = '<div class="video-empty"><p><strong>No videos configured yet.</strong></p>' +
        '<p class="small">Add entries to the <code>videos</code> array in <code>assets/js/config.js</code>.</p></div>';
      return;
    }
    renderChips();
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.GESIM_VIDEOS = { render: render, get list() { return videos(); } };
})();
