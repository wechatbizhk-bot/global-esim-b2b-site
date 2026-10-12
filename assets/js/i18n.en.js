/* ============================================================================
 * Global eSIM — UI TRANSLATION DICTIONARY: ENGLISH (source language)
 * ----------------------------------------------------------------------------
 * This is the master dictionary. Every other language file
 * (i18n.ko.js, i18n.ja.js, i18n.zh-CN.js, i18n.zh-TW.js, i18n.fr.js, i18n.es.js)
 * must define exactly the same keys.
 *
 * HOW IT WORKS
 *   In the HTML, any element carrying a `data-i18n="key"` attribute has its
 *   text replaced with the translation for the selected language.
 *   `data-i18n-attr="placeholder:form.name"` translates an attribute instead.
 *   English is already written into the HTML, so the page is fully readable
 *   and fully indexable by search engines even with JavaScript disabled.
 * ==========================================================================*/
window.I18N = window.I18N || {};

window.I18N.en = {

  /* ---- Main navigation -------------------------------------------------- */
  "nav.home":            "Home",
  "nav.background":      "eSIM Background",
  "nav.market":          "Market Potential",
  "nav.solutions":       "Partner Solutions",
  "nav.coverage":        "Coverage & Rates",
  "nav.videos":      "Videos",
  "nav.order":           "Place an Order",
  "nav.enquiry":         "Enquiry",
  "nav.faq":             "FAQ",
  "nav.contact":         "Contact",

  /* ---- Calls to action -------------------------------------------------- */
  "cta.enquireNow":      "Make an enquiry",
  "cta.bookDemo":        "Book a demo",
  "cta.placeOrder":      "Build an order",
  "cta.whatsapp":        "Chat on WhatsApp",
  "cta.emailUs":         "Email us",
  "cta.wechat":          "WeChat ID",
  "cta.viewCoverage":    "View coverage",
  "cta.talkToUs":        "Talk to us",
  "cta.requestRateCard": "Request the full rate card",
  "cta.exploreSolutions":"Explore partner solutions",

  /* ---- Shared interface strings ---------------------------------------- */
  "common.language":     "Language",
  "common.readFaq":      "Read the FAQ",
  "common.allCategories":"All topics",
  "common.searchPlaceholder": "Search the FAQ…",
  "common.noResults":    "No matching question. Try another keyword, or contact us directly.",
  "common.indicative":   "Indicative only",
  "common.required":     "Required",
  "common.optional":     "Optional",
  "common.next":         "Next",
  "common.back":         "Back",

  /* ---- Footer ----------------------------------------------------------- */
  "footer.quickLinks":   "Quick links",
  "footer.getInTouch":   "Get in touch",
  "footer.legal":        "Legal",
  "footer.privacy":      "Privacy policy",
  "footer.terms":        "Terms of use",
  "footer.followUs":     "Follow us",
  "footer.hours":        "Business hours",
  "footer.rights":       "All rights reserved.",
  "footer.disclaimer":   "Rates and commercial terms shown on this site are indicative and subject to confirmation in a signed partner agreement.",

  /* ---- Enquiry form ----------------------------------------------------- */
  "form.heading":        "Tell us what you want to launch",
  "form.lead":           "Send us your requirement and we will come back to you with a costed proposal. Everything you send stays confidential.",
  "form.name":           "Your name",
  "form.company":        "Company",
  "form.email":          "Business email",
  "form.phone":          "Phone or WhatsApp",
  "form.country":        "Country or region",
  "form.role":           "Your role",
  "form.volume":         "Expected monthly volume",
  "form.interest":       "What are you interested in?",
  "form.message":        "Tell us about your project",
  "form.consent":        "I agree to be contacted about this enquiry.",
  "form.submit":         "Send enquiry",
  "form.sending":        "Sending…",
  "form.successTitle":   "Thank you — your enquiry has been sent.",
  "form.successBody":    "Your reference number is shown below. Keep it if you need to follow up. We normally reply within one business day.",
  "form.errorTitle":     "We could not send the form automatically.",
  "form.errorBody":      "No problem — your details are still here. Use one of the buttons below to send them to us directly and nothing will be lost.",
  "form.fallbackNote":   "Your enquiry is also pre-filled and ready to send.",
  "form.reference":      "Reference",

  /* ---- Order builder ---------------------------------------------------- */
  "order.heading":       "Build your order",
  "order.lead":          "Configure a pilot or a first production order. You will get a costed summary you can download, print and send to your finance team.",
  "order.step1":         "Plan type",
  "order.step2":         "Destinations and bundles",
  "order.step3":         "Format and branding",
  "order.step4":         "Your details",
  "order.planType":      "Is this a new purchase or a top-up?",
  "order.planNew":       "New purchase",
  "order.planNewHint":   "A new eSIM or SIM card. Physical cards require shipping.",
  "order.planTopup":     "Top-up an existing eSIM",
  "order.planTopupHint": "Add data to a card the customer already has. Nothing is shipped.",
  "order.simFormat":     "Which format do you need?",
  "order.formatEsim":    "eSIM only",
  "order.formatEsimHint":"No inventory, no shipping, provisioned on demand.",
  "order.formatPhysical":"eSIM + physical SIM",
  "order.formatPhysicalHint": "Physical cards are shipped to your address.",
  "order.destinations":  "Select destinations",
  "order.bundle":        "Data bundle per user",
  "order.quantity":      "How many users or cards?",
  "order.branding":      "Branding",
  "order.brandingStandard": "Standard",
  "order.brandingWhite": "White label — our design team will contact you",
  "order.summary":       "Order summary",
  "order.dataCost":      "Data",
  "order.simCost":       "SIM cards",
  "order.total":         "Indicative total",
  "order.perGb":         "Rate",
  "order.generateQuote": "Generate my order summary",
  "order.requestQuote":  "Send this order to Global eSIM",
  "order.quoteRef":      "Order reference",
  "order.quoteValid":    "Indicative rates held for",
  "order.indicativeNote":"This summary uses indicative partner rates. A binding quotation is issued after we confirm network availability and volume pricing.",

  /* ---- Home page -------------------------------------------------------- */
  "home.hero.eyebrow":   "Wholesale eSIM for the travel trade",
  "home.hero.title":     "Sell connectivity to your travellers. We run the network behind it.",
  "home.hero.lead":      "Global eSIM supplies wholesale travel data and white-label eSIM to travel agencies, OTAs, airlines, insurers and telecom distributors. You keep the customer, the brand and the margin. We run the core network, the billing and the support.",
  "home.hero.point1":    "68 countries and 94 network partners",
  "home.hero.point2":    "Partner rates from HK$8 per GB",
  "home.hero.point3":    "Live in two to four weeks",
  "home.stats.countries":"Countries live",
  "home.stats.operators":"Network partners",
  "home.stats.rate":     "Entry rate per GB",
  "home.stats.market":   "Travel eSIM market by 2030",
  "home.value.title":    "Why partners work with us",
  "home.value.lead":     "Anyone can resell data. What is hard is rate transparency, activation reliability and compliance. That is what we actually sell.",
  "home.segments.title": "Built for your channel",
  "home.segments.lead":  "The same wholesale platform, packaged for how your business already sells.",
  "home.how.title":      "From signature to first live transaction",
  "home.how.lead":       "Four steps, typically two to four weeks, with test credit so your developers can integrate before you spend anything.",
  "home.market.title":   "A market that is still in its early innings",
  "home.market.lead":    "Travel eSIM revenue grew 85% in a single year. Three quarters of eSIM-capable phones have still never activated a travel plan.",
  "home.coverage.title": "Transparent coverage and rates",
  "home.coverage.lead":  "Every country, every network partner, and the technology each one runs on — published openly, not hidden behind a sales call.",
  "home.cta.title":      "Ready to add connectivity to your product?",
  "home.cta.lead":       "Tell us your destinations and your volume. We will send you a costed proposal, and a pilot if you want to test us first."
};
