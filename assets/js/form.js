/* ============================================================================
 * Global eSIM — lead form handler
 * ----------------------------------------------------------------------------
 * Handles any <form data-lead-form> (the enquiry page and the order page).
 *
 * Behaviour:
 *   - If config.formEndpoint is set  -> POSTs JSON, shows success + reference.
 *   - If it is empty                 -> falls back to WhatsApp / email so a
 *                                       lead is NEVER silently lost.
 *   - Either way the visitor always gets a copyable reference number and
 *     one-tap buttons to send the same content to us directly.
 * ==========================================================================*/
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var G = window.GESIM || {};
  var $ = G.$, $$ = G.$$, on = G.on, esc = G.esc;

  function refCode() {
    var d = new Date();
    var ymd = String(d.getFullYear()) +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0");
    var rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return "GE-" + ymd + "-" + rand;
  }

  function linesFrom(form) {
    var out = [];
    var seen = {};
    $$("input, select, textarea", form).forEach(function (el) {
      if (!el.name || el.type === "submit" || el.type === "button") return;
      var val = el.type === "checkbox" ? (el.checked ? "Yes" : "No") : (el.value || "").trim();
      if (!val) return;
      var label = el.getAttribute("data-label") || el.name;
      var line = label + ": " + val;
      // The order page pairs some hidden fields with their visible controls,
      // which would otherwise produce the same line twice.
      if (seen[line]) return;
      seen[line] = true;
      out.push(line);
    });
    return out;
  }

  function plainText(title, ref, lines) {
    return title + "\n" + new Array(title.length + 1).join("=") + "\n\n" +
      "Reference: " + ref + "\n" +
      "Submitted: " + new Date().toLocaleString("en-GB", { timeZone: "Asia/Hong_Kong" }) + " (HKT)\n\n" +
      lines.join("\n") + "\n";
  }

  function sendWhatsApp(text) {
    var wa = (CFG.contact || {}).whatsapp;
    if (!wa) return "";
    return "https://wa.me/" + wa + "?text=" + encodeURIComponent(text);
  }

  function sendMailto(subject, body) {
    var to = (CFG.contact || {}).email;
    if (!to) return "";
    return "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function showResult(form, ok, title, bodyHtml, ref, text) {
    var host = form.querySelector("[data-form-status]") || form.parentNode.querySelector("[data-form-status]");
    if (!host) return;
    host.className = "form-status show " + (ok ? "ok" : "err");
    host.innerHTML =
      "<strong>" + esc(title) + "</strong>" +
      "<p style='margin:6px 0 0'>" + bodyHtml + "</p>" +
      (ref ? "<div class='ref-code'>" + esc(ref) + "</div>" : "") +
      "<div class='btn-row' style='margin-top:14px'>" +
        (sendWhatsApp(text) ? "<a class='btn btn-primary btn-sm' target='_blank' rel='noopener' href='" + esc(sendWhatsApp(text)) + "'>" + G.icon("whatsapp") + " Send on WhatsApp</a>" : "") +
        (sendMailto("Website enquiry " + ref, text) ? "<a class='btn btn-ghost btn-sm' href='" + esc(sendMailto("Website enquiry " + ref, text)) + "'>" + G.icon("mail") + " Send by email</a>" : "") +
        "<button class='btn btn-ghost btn-sm' type='button' data-copy-ref='" + esc(ref) + "'>" + G.icon("check") + " Copy reference</button>" +
      "</div>" +
      // Transparency: show the visitor exactly what will be sent. Nothing is
      // captured silently, and they can copy it if they prefer another route.
      "<details style='margin-top:12px'>" +
        "<summary class='small' style='cursor:pointer'>" +
          esc(G.t("form.fallbackNote") || "Your enquiry is also pre-filled and ready to send.") +
        "</summary>" +
        "<pre style='white-space:pre-wrap;font-family:var(--mono);font-size:.76rem;" +
        "background:rgba(255,255,255,.72);border:1px solid rgba(10,16,32,.14);border-radius:9px;" +
        "padding:12px;margin-top:9px;max-height:260px;overflow:auto'>" + esc(text) + "</pre>" +
      "</details>";
    host.scrollIntoView({ behavior: "smooth", block: "nearest" });

    var copyBtn = host.querySelector("[data-copy-ref]");
    on(copyBtn, "click", function () {
      var val = copyBtn.getAttribute("data-copy-ref");
      if (navigator.clipboard) navigator.clipboard.writeText(val).then(function () {
        copyBtn.textContent = "Copied";
      }, function () { /* ignore */ });
    });
  }

  function handle(form) {
    var endpoint = (CFG.formEndpoint || "").trim();
    var title = form.getAttribute("data-form-title") || "Website enquiry";

    on(form, "submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) { form.reportValidity(); return; }

      var ref = refCode();
      var lines = linesFrom(form);
      var text = plainText(title, ref, lines);
      var submitBtn = form.querySelector("[type=submit]");
      var original = submitBtn ? submitBtn.innerHTML : "";

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = G.t("form.sending") || "Sending…"; }

      function finish(ok, msg) {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = original; }
        if (ok) {
          showResult(form, true, G.t("form.successTitle") || "Thank you — your enquiry has been sent.",
            esc(G.t("form.successBody") || "Your reference number is shown below."), ref, text);
          form.reset();
        } else {
          showResult(form, false, G.t("form.errorTitle") || "We could not send the form automatically.",
            esc(G.t("form.errorBody") || "Use one of the buttons below to send it to us directly.") +
            (msg ? "<br><span class='tiny muted'>" + esc(msg) + "</span>" : ""), ref, text);
        }
      }

      if (!endpoint) {
        // No endpoint configured — go straight to the fallback, which always works.
        finish(false, "No form endpoint is configured yet, so this message was not sent automatically.");
        return;
      }

      var payload = {
        _subject: title + " — " + ref,
        reference: ref,
        page: location.pathname,
        language: G.lang,
        submitted_hkt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Hong_Kong" }),
        fields: lines
      };
      $$("input, select, textarea", form).forEach(function (el) {
        if (el.name && el.type !== "submit") payload[el.name] = el.type === "checkbox" ? el.checked : el.value;
      });

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (r.ok) finish(true);
        else finish(false, "The form service returned HTTP " + r.status + ".");
      }).catch(function (err) {
        finish(false, String(err && err.message ? err.message : err));
      });
    });
  }

  function boot() { $$("form[data-lead-form]").forEach(handle); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.GESIM_FORM = { refCode: refCode, plainText: plainText, showResult: showResult, sendWhatsApp: sendWhatsApp, sendMailto: sendMailto };
})();
