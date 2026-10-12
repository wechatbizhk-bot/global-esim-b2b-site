/* ============================================================================
 * Global eSIM — online order builder
 * ----------------------------------------------------------------------------
 * A four-step configurator that turns a reseller's requirement (destinations,
 * bundle size, quantity, format, branding) into a costed order summary they can
 * download, print or send to us.
 *
 * Pricing model
 *   blended rate  = average of the lowest indicative partner rate across the
 *                   selected destinations  (HKD per GB)
 *   data cost     = blended rate x bundle GB x quantity
 *   SIM cost      = tier unit price x quantity   (physical SIM only)
 *   total         = data cost + SIM cost
 *
 * Everything is labelled indicative in the UI, because a binding quotation
 * depends on the network mix and volume pricing.
 * ==========================================================================*/
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var G = window.GESIM || {};
  var $ = G.$, $$ = G.$$, on = G.on, esc = G.esc, money = G.money;

  var REGION_LABEL = {
    SOUTHEAST_ASIA: "Southeast Asia",
    EAST_ASIA: "East Asia",
    CENTRAL_ASIA: "Central & South Asia",
    OCEANIA: "Oceania",
    NORTH_AMERICA: "North America",
    LATIN_AMERICA: "Latin America",
    EUROPE: "Europe",
    MIDDLE_EAST: "Middle East",
    AFRICA: "Africa"
  };

  var UI = null; // cached element references

  var state = {
    planType: "new",
    format: "esim",
    branding: "standard",
    bundleGB: 5,
    quantity: 1000,
    selected: {},     // country -> true
    search: "",
    regionFilter: "ALL"
  };

  /* ------------------------------------------------------------- data --- */
  function data() {
    var d = window.COVERAGE_DATA;
    if (!d || !d.countries || !d.countries.length) return null;
    return d;
  }

  function selectedCountries() {
    var d = data();
    if (!d) return [];
    return d.countries.filter(function (c) { return state.selected[c.country]; });
  }

  /* ---------------------------------------------------------- pricing --- */
  function simUnitPrice(qty) {
    var tiers = (CFG.commercial && CFG.commercial.simTiers) || [];
    for (var i = 0; i < tiers.length; i++) {
      var t = tiers[i];
      if (qty >= t.minQty && (t.maxQty == null || qty <= t.maxQty)) return t.unitPrice;
    }
    return tiers.length ? tiers[0].unitPrice : 0;
  }

  function simTierLabel(qty) {
    var tiers = (CFG.commercial && CFG.commercial.simTiers) || [];
    for (var i = 0; i < tiers.length; i++) {
      var t = tiers[i];
      if (qty >= t.minQty && (t.maxQty == null || qty <= t.maxQty)) return t.label;
    }
    return "";
  }

  function calc() {
    var sel = selectedCountries();
    var rates = sel.map(function (c) { return c.from; });
    var blended = rates.length ? rates.reduce(function (a, b) { return a + b; }, 0) / rates.length : 0;
    var qty = Math.max(0, Number(state.quantity) || 0);
    var gb = Math.max(0, Number(state.bundleGB) || 0);

    var dataCost = blended * gb * qty;
    var needSim = state.planType === "new" && state.format === "physical";
    var unit = needSim ? simUnitPrice(qty) : 0;
    var simCost = needSim ? unit * qty : 0;
    var belowMin = needSim && qty > 0 && qty < 500;

    return {
      countries: sel,
      count: sel.length,
      blended: blended,
      min: rates.length ? Math.min.apply(null, rates) : 0,
      max: rates.length ? Math.max.apply(null, rates) : 0,
      qty: qty,
      gb: gb,
      dataCost: dataCost,
      needSim: needSim,
      simUnit: unit,
      simCost: simCost,
      total: dataCost + simCost,
      belowMin: belowMin,
      tierLabel: needSim ? simTierLabel(qty) : "",
      perUser: qty > 0 ? (dataCost + simCost) / qty : 0
    };
  }

  /* ------------------------------------------------------ destination --- */
  function renderDestinations() {
    var d = data();
    var list = UI.destList;
    if (!d) {
      list.innerHTML = '<div class="dest-empty">Coverage data is unavailable. Please contact us for a rate card.</div>';
      return;
    }

    var term = state.search.toLowerCase().trim();
    var order = (d.regionOrder || []).concat(["OTHER"]);
    var html = "";
    var shown = 0;

    order.forEach(function (region) {
      if (state.regionFilter !== "ALL" && state.regionFilter !== region) return;
      var rows = d.countries.filter(function (c) {
        if (c.region !== region) return false;
        if (!term) return true;
        var hay = (c.country + " " + (c.tc || "") + " " + (c.ops || []).join(" ")).toLowerCase();
        return hay.indexOf(term) !== -1;
      });
      if (!rows.length) return;
      html += '<div class="dest-group-label">' + esc(REGION_LABEL[region] || region) +
              ' <span class="muted">(' + rows.length + ')</span></div>';
      rows.forEach(function (c) {
        shown++;
        html += '<label class="dest-row">' +
          '<input type="checkbox" data-country="' + esc(c.country) + '"' + (state.selected[c.country] ? " checked" : "") + '>' +
          '<span class="nm">' + esc(c.country) +
            (c.tc ? ' <span class="muted tiny">' + esc(c.tc) + '</span>' : '') + '</span>' +
          '<span class="rt">' + (CFG.commercial && CFG.commercial.showRates ? "HK$" + c.from + "/GB" : "") + '</span>' +
        '</label>';
      });
    });

    list.innerHTML = shown ? html : '<div class="dest-empty">No destination matches "' + esc(state.search) + '".</div>';

    $$("input[data-country]", list).forEach(function (cb) {
      on(cb, "change", function () {
        var name = cb.getAttribute("data-country");
        if (cb.checked) state.selected[name] = true; else delete state.selected[name];
        renderSummary();
      });
    });
  }

  function renderRegionFilter() {
    var d = data();
    if (!d || !UI.destRegions) return;
    var regions = (d.regionOrder || []);
    var host = UI.destRegions;
    host.innerHTML = ["ALL"].concat(regions).map(function (r) {
      return '<button type="button" class="chip" data-region="' + esc(r) + '" aria-pressed="' +
        (state.regionFilter === r) + '">' + esc(r === "ALL" ? "All regions" : (REGION_LABEL[r] || r)) + '</button>';
    }).join("");
    $$("button[data-region]", host).forEach(function (b) {
      on(b, "click", function () {
        state.regionFilter = b.getAttribute("data-region");
        renderRegionFilter(); renderDestinations();
      });
    });
  }

  /* -------------------------------------------------- hidden field sync --- */
  // Keeps the hidden inputs inside the lead form in step with the builder, so
  // that submitting the form carries the whole configuration even though the
  // destination checkboxes are not native form fields.
  function syncHidden(r) {
    function set(key, val) {
      var el = document.querySelector("[data-order-field='" + key + "']");
      if (el) el.value = val;
    }
    set("plan_type", state.planType === "new" ? "New purchase" : "Top-up on existing eSIM");
    set("sim_format", r.needSim ? "eSIM + physical SIM" : "eSIM only");
    set("branding", state.branding === "white" ? "White label" : "Standard");
    set("bundle_gb", String(r.gb));
    set("quantity", String(r.qty));
    set("destination_count", String(r.count));
    set("destinations", r.countries.map(function (c) { return c.country; }).join(", "));
    set("blended_rate_hkd_per_gb", r.count ? r.blended.toFixed(2) : "");
    set("indicative_total_hkd", r.count ? r.total.toFixed(2) : "");
  }

  /* ---------------------------------------------------------- summary --- */
  function renderSummary() {
    var r = calc();
    var showRates = !(CFG.commercial && CFG.commercial.showRates === false);
    var html = "";

    syncHidden(r);

    if (!r.count) {
      UI.sumBody.innerHTML = '<p class="summary-empty">Select at least one destination to see indicative pricing.</p>';
      UI.sumFoot.innerHTML = '<button class="btn btn-primary btn-block" type="button" disabled>Generate my order summary</button>';
      return;
    }

    html += '<div class="sum-line"><span class="l">Destinations</span><span class="v">' + r.count + '</span></div>';
    html += '<div class="sum-sel">' + r.countries.slice(0, 14).map(function (c) {
      return '<span class="sum-chip">' + esc(c.country) + '</span>';
    }).join("") + (r.count > 14 ? '<span class="sum-chip">+' + (r.count - 14) + ' more</span>' : "") + '</div>';

    html += '<div class="sum-line"><span class="l">Plan type</span><span class="v">' +
      (state.planType === "new" ? "New purchase" : "Top-up") + '</span></div>';
    html += '<div class="sum-line"><span class="l">Bundle per user</span><span class="v">' + r.gb + ' GB</span></div>';
    html += '<div class="sum-line"><span class="l">Quantity</span><span class="v">' + r.qty.toLocaleString("en-US") + '</span></div>';
    html += '<div class="sum-line"><span class="l">Format</span><span class="v">' +
      (r.needSim ? "eSIM + physical SIM" : "eSIM only") + '</span></div>';

    if (showRates) {
      html += '<div class="sum-line"><span class="l">Blended rate / GB</span><span class="v">' + money(r.blended, 2) + '</span></div>';
      if (r.min !== r.max) {
        html += '<div class="sum-line"><span class="l">Rate range</span><span class="v">' + money(r.min, 0) + ' – ' + money(r.max, 0) + '</span></div>';
      }
      html += '<div class="sum-line"><span class="l">Data (' + (r.gb * r.qty).toLocaleString("en-US") + ' GB total)</span><span class="v">' + money(r.dataCost) + '</span></div>';
      if (r.needSim) {
        html += '<div class="sum-line"><span class="l">SIM cards @ ' + money(r.simUnit, 0) + ' each</span><span class="v">' + money(r.simCost) + '</span></div>';
      }
      html += '<div class="sum-total"><span class="l">Indicative total</span><span class="v">' + money(r.total) + '</span></div>';
      if (r.qty > 0) {
        html += '<p class="tiny muted" style="margin:8px 0 0">' + money(r.perUser) + ' per user. Indicative partner cost, excluding taxes.</p>';
      }
      if (r.tierLabel) {
        html += '<p class="tiny muted" style="margin:6px 0 0">Volume tier applied: ' + esc(r.tierLabel) + '.</p>';
      }
      if (r.belowMin) {
        html += '<div class="callout warn small" style="margin-top:12px;padding:12px 14px">' +
          '<div class="callout-title">' + G.icon("alert") + ' Below minimum order</div>' +
          'Physical SIM stock starts at 500 units. Choose eSIM only, or increase the quantity.</div>';
      }
    } else {
      html += '<p class="small muted" style="padding:10px 0">Rates are released with your partner rate card. Send this order and we will price it for you.</p>';
    }

    UI.sumBody.innerHTML = html;
    UI.sumFoot.innerHTML =
      '<button class="btn btn-primary btn-block" type="button" data-generate>' + G.icon("send") + ' ' +
      esc(G.t("order.generateQuote") || "Generate my order summary") + '</button>' +
      '<p class="tiny muted" style="margin:10px 0 0;text-align:center">' + esc(G.t("order.indicativeNote") || "") + '</p>';
    on(UI.sumFoot.querySelector("[data-generate]"), "click", generate);
  }

  /* --------------------------------------------------------- quote gen --- */
  function quoteText(ref, r, contactLines) {
    var out = [];
    var c = CFG.commercial || {};
    out.push("ORDER SUMMARY");
    out.push("=============");
    out.push("");
    out.push("Reference:   " + ref);
    out.push("Issued:      " + new Date().toLocaleString("en-GB", { timeZone: "Asia/Hong_Kong" }) + " (HKT)");
    out.push("Currency:    " + (c.currency || "HKD"));
    out.push("Valid for:   " + (c.quoteValidityDays || 30) + " days");
    out.push("");
    out.push("CONFIGURATION");
    out.push("-------------");
    out.push("Plan type:          " + (state.planType === "new" ? "New purchase" : "Top-up on existing eSIM"));
    out.push("Format:             " + (r.needSim ? "eSIM + physical SIM" : "eSIM only"));
    out.push("Branding:           " + (state.branding === "white" ? "White label" : "Standard"));
    out.push("Bundle per user:    " + r.gb + " GB");
    out.push("Quantity:           " + r.qty.toLocaleString("en-US") + " users");
    out.push("Destinations:       " + r.count);
    out.push("");
    r.countries.forEach(function (x) {
      out.push("  - " + x.country + (x.tc ? " / " + x.tc : "") +
        "  |  " + x.nets + " network partner(s)  |  " + x.tech.join("/") +
        "  |  from HK$" + x.from + "/GB");
    });
    out.push("");
    out.push("INDICATIVE PRICING");
    out.push("------------------");
    out.push("Blended rate per GB:   HK$" + r.blended.toFixed(2));
    out.push("Total data:            " + (r.gb * r.qty).toLocaleString("en-US") + " GB");
    out.push("Data cost:             HK$" + r.dataCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    if (r.needSim) {
      out.push("SIM cards:             " + r.qty.toLocaleString("en-US") + " @ HK$" + r.simUnit + " = HK$" + r.simCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
    out.push("INDICATIVE TOTAL:      HK$" + r.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    out.push("Cost per user:         HK$" + r.perUser.toFixed(2));
    if (r.tierLabel) out.push("Volume tier applied:   " + r.tierLabel);
    out.push("");
    if (contactLines && contactLines.length) {
      out.push("REQUESTED BY");
      out.push("------------");
      contactLines.forEach(function (l) { out.push(l); });
      out.push("");
    }
    out.push("NOTES");
    out.push("-----");
    out.push("* These figures are INDICATIVE and use published partner rates.");
    out.push("* A binding quotation is issued after network availability and volume pricing are confirmed.");
    out.push("* Partner deposit from HK$20,000 is credited against first orders.");
    out.push("* 30 days' written notice is given before any cost or offer change.");
    out.push("* Retail pricing to your own customers is your decision.");
    out.push("");
    out.push((CFG.brand && CFG.brand.name) || "Global eSIM");
    out.push("Email:    " + ((CFG.contact || {}).email || ""));
    out.push("WhatsApp: " + ((CFG.contact || {}).whatsappDisplay || ""));
    out.push("WeChat:   " + ((CFG.contact || {}).wechat || ""));
    return out.join("\n");
  }

  function collectContact() {
    var lines = [];
    [["name", "Contact name"], ["company", "Company"], ["email", "Email"],
     ["phone", "Phone / WhatsApp"], ["country", "Country"], ["notes", "Notes"]].forEach(function (pair) {
      var el = document.querySelector("[name='" + pair[0] + "']");
      if (el && el.value.trim()) lines.push(pair[1] + ": " + el.value.trim());
    });
    return lines;
  }

  function generate() {
    var r = calc();
    if (!r.count) { alert("Please select at least one destination."); return; }

    var F = window.GESIM_FORM;
    var ref = F ? F.refCode() : ("GE-" + Date.now());
    var text = quoteText(ref, r, collectContact());

    var host = $("[data-order-output]");
    if (host) {
      host.innerHTML =
        '<div class="summary" style="position:static">' +
          '<div class="summary-head"><h2>' + esc(G.t("order.quoteRef") || "Order reference") + ': ' + esc(ref) + '</h2></div>' +
          '<div class="summary-body">' +
            '<div class="kv">' +
              '<div class="kv-row"><span class="kv-k">Destinations</span><span class="kv-v">' + r.count + '</span></div>' +
              '<div class="kv-row"><span class="kv-k">Bundle</span><span class="kv-v">' + r.gb + ' GB per user</span></div>' +
              '<div class="kv-row"><span class="kv-k">Quantity</span><span class="kv-v">' + r.qty.toLocaleString("en-US") + ' users</span></div>' +
              '<div class="kv-row"><span class="kv-k">Indicative total</span><span class="kv-v"><strong>' + money(r.total) + '</strong></span></div>' +
              '<div class="kv-row"><span class="kv-k">Cost per user</span><span class="kv-v">' + money(r.perUser) + '</span></div>' +
              '<div class="kv-row"><span class="kv-k">' + esc(G.t("order.quoteValid") || "Indicative rates held for") + '</span><span class="kv-v">' + ((CFG.commercial && CFG.commercial.quoteValidityDays) || 30) + ' days</span></div>' +
            '</div>' +
            '<details style="margin-top:14px"><summary class="small muted" style="cursor:pointer">Show the full order text</summary>' +
              '<pre style="white-space:pre-wrap;font-family:var(--mono);font-size:.78rem;background:var(--paper-2);border:1px solid var(--line);border-radius:9px;padding:14px;margin-top:10px;max-height:340px;overflow:auto">' + esc(text) + '</pre>' +
            '</details>' +
          '</div>' +
          '<div class="summary-foot">' +
            '<div class="btn-row">' +
              '<button class="btn btn-primary btn-sm" type="button" data-dl>' + G.icon("download") + ' Download</button>' +
              '<button class="btn btn-ghost btn-sm" type="button" data-print>' + G.icon("print") + ' Print</button>' +
              (F && F.sendWhatsApp(text) ? '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="' + esc(F.sendWhatsApp(text)) + '">' + G.icon("whatsapp") + ' WhatsApp</a>' : '') +
              (F && F.sendMailto("Order " + ref, text) ? '<a class="btn btn-ghost btn-sm" href="' + esc(F.sendMailto("Order " + ref, text)) + '">' + G.icon("mail") + ' Email</a>' : '') +
            '</div>' +
          '</div>' +
        '</div>';

      on(host.querySelector("[data-dl]"), "click", function () {
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = ref + "-global-esim-order.txt";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      });
      on(host.querySelector("[data-print]"), "click", function () { window.print(); });
      host.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------------------------------------------------------- controls --- */
  function wireControls() {
    $$("input[name=planType]").forEach(function (el) {
      on(el, "change", function () {
        state.planType = el.value;
        // A top-up never ships anything, so the format step is hidden for it.
        // We deliberately do NOT overwrite state.format here: the SIM cost is
        // already gated on `planType === "new"` inside calc(), and clobbering
        // the value would leave the visible radio button and the calculation
        // disagreeing if the visitor switched back to "New purchase".
        var fmtStep = $("[data-step-format]");
        if (fmtStep) fmtStep.style.display = state.planType === "topup" ? "none" : "";
        renderSummary();
      });
    });

    $$("input[name=format]").forEach(function (el) {
      on(el, "change", function () { state.format = el.value; renderSummary(); });
    });

    $$("input[name=branding]").forEach(function (el) {
      on(el, "change", function () { state.branding = el.value; });
    });

    var bundle = $("[name=bundleGB]");
    on(bundle, "change", function () { state.bundleGB = Number(bundle.value); renderSummary(); });

    var qty = $("[name=quantity]");
    on(qty, "input", function () {
      state.quantity = Math.max(0, Number(qty.value) || 0);
      renderSummary();
    });
    $$("[data-qty-preset]").forEach(function (b) {
      on(b, "click", function () {
        qty.value = b.getAttribute("data-qty-preset");
        state.quantity = Number(qty.value);
        renderSummary();
      });
    });

    var search = $("[data-dest-search]");
    on(search, "input", function () { state.search = search.value; renderDestinations(); });

    var clear = $("[data-dest-clear]");
    on(clear, "click", function () {
      state.selected = {};
      if (search) search.value = "";
      state.search = "";
      renderDestinations(); renderSummary();
    });

    var all = $("[data-dest-all]");
    on(all, "click", function () {
      var d = data();
      if (!d) return;
      d.countries.forEach(function (c) { state.selected[c.country] = true; });
      renderDestinations(); renderSummary();
    });
  }

  /* -------------------------------------------------------------- boot --- */
  function boot() {
    var root = $("[data-order-builder]");
    if (!root) return;

    UI = {
      destList: $("[data-dest-list]"),
      destRegions: $("[data-dest-regions]"),
      sumBody: $("[data-sum-body]"),
      sumFoot: $("[data-sum-foot]")
    };
    if (!UI.destList || !UI.sumBody) return;

    if (!data()) {
      UI.destList.innerHTML = '<div class="dest-empty">Coverage data could not be loaded. Please refresh, or contact us directly for a rate card.</div>';
      return;
    }

    wireControls();
    renderRegionFilter();
    renderDestinations();
    renderSummary();

    if (CFG.commercial && CFG.commercial.showRates === false) {
      $$("[data-rate-only]").forEach(function (el) { el.style.display = "none"; });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.GESIM_ORDER = { get state() { return state; }, calc: calc, generate: generate, quoteText: quoteText };
})();
