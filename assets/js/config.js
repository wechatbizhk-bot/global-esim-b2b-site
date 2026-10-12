/* ============================================================================
 * Global eSIM — SITE CONFIGURATION
 * ----------------------------------------------------------------------------
 * THIS IS THE ONLY FILE YOU NEED TO EDIT TO REBRAND THE SITE
 * AND TO CHANGE CONTACT DETAILS, SOCIAL LINKS AND FORM ROUTING.
 *
 * Nothing in the HTML pages hard-codes a phone number, an email address, a
 * social handle or a form endpoint. They all read from this file at runtime,
 * so a single edit here updates every page at once.
 *
 * After editing, just save and refresh the browser. No build step, no npm.
 * ==========================================================================*/
window.SITE_CONFIG = {

  /* ---------------------------------------------------------------------
   * 1. BRAND
   * -------------------------------------------------------------------*/
  brand: {
    name: "Global eSIM",
    // Shown in the footer and in structured data.
    legalName: "Global eSIM",
    tagline: {
      en: "Wholesale eSIM connectivity for partners who sell travel.",
      ko: "여행 상품을 판매하는 파트너를 위한 eSIM 도매 연결 서비스.",
      ja: "旅行を販売するパートナーのためのeSIM卸売コネクティビティ。",
      "zh-CN": "为旅游产品合作伙伴提供的 eSIM 批发连接服务。",
      "zh-TW": "為旅遊產品合作夥伴提供的 eSIM 批發連接服務。",
      fr: "Connectivité eSIM en gros pour les partenaires qui vendent du voyage.",
      es: "Conectividad eSIM al por mayor para socios que venden viajes."
    },
    // One-line description used in <meta> and Open Graph tags.
    description: "B2B wholesale eSIM and travel SIM platform. White-label eSIM for travel agencies, OTAs, airlines, insurers and telecom distributors, with API provisioning and coverage in 68 countries."
  },

  /* ---------------------------------------------------------------------
   * 2. CONTACT — used by every enquiry form, order form, footer and CTA
   * -------------------------------------------------------------------*/
  contact: {
    // WhatsApp number in full international format, digits only, no + or spaces.
    // +852 9739 8018  ->  85297398018
    whatsapp: "85297398018",
    // How the number is DISPLAYED on the page.
    whatsappDisplay: "+852 9739 8018",
    email: "commercialisation.ai@gmail.com",
    wechat: "ZhuangChengHK",
    // Optional. Leave as empty strings to hide them from the site entirely.
    phone: "",
    phoneDisplay: "",
    address: "",
    addressDisplay: "",
    // Business hours shown in the footer / contact page.
    hours: "Mon–Fri, 09:00–18:00 (HKT / UTC+8)"
  },

  /* ---------------------------------------------------------------------
   * 3. FORM ROUTING  ⚠️ READ THIS
   * ---------------------------------------------------------------------
   * A static site hosted on GitHub Pages cannot send email by itself.
   * Choose ONE of these two options:
   *
   *   OPTION A (recommended, takes 2 minutes, free tier available):
   *     1. Create a free form endpoint at https://formspree.io or
   *        https://web3forms.com (both have free tiers).
   *     2. Paste the endpoint URL into `formEndpoint` below.
   *     3. Every enquiry and order is then emailed to you automatically.
   *
   *   OPTION B (zero setup, always works):
   *     Leave `formEndpoint` empty. The forms then fall back to opening the
   *     visitor's own email client with the enquiry pre-filled, and offer a
   *     one-tap WhatsApp send. Nothing is ever silently lost.
   *
   * The forms ALWAYS also show a copyable order reference and a WhatsApp
   * button, so a lead can still reach you even if a third-party service is
   * down.
   * -------------------------------------------------------------------*/
  formEndpoint: "",              // e.g. "https://formspree.io/f/xxxxxxx"
  formEndpointProvider: "Formspree", // shown in a note under the form

  /* ---------------------------------------------------------------------
   * 4. SOCIAL MEDIA
   * ---------------------------------------------------------------------
   * Paste your real profile URLs here. Any platform left as an empty string
   * is automatically HIDDEN across the whole site — so the site never shows
   * a dead link. Fill them in as you create the accounts.
   *
   * Note on format: Xiaohongshu and Threads do not exist on GitHub Pages as
   * share targets, so they are profile links only. That is expected.
   * -------------------------------------------------------------------*/
  social: {
    x:           "",   // e.g. "https://x.com/yourhandle"
    instagram:   "",   // e.g. "https://www.instagram.com/yourhandle"
    tiktok:      "",   // e.g. "https://www.tiktok.com/@yourhandle"
    youtube:     "",   // e.g. "https://www.youtube.com/@yourhandle"
    facebook:    "",   // e.g. "https://www.facebook.com/yourpage"
    xiaohongshu: "",   // e.g. "https://www.xiaohongshu.com/user/profile/XXXXXXXX"
    threads:     ""    // e.g. "https://www.threads.net/@yourhandle"
  },

  /* ---------------------------------------------------------------------
   * 5. COMMERCIAL PARAMETERS
   * ---------------------------------------------------------------------
   * These drive the order builder's arithmetic and the partner-programme
   * tiers. Confirm every value against your current partner agreement before
   * publishing. All figures on the site are labelled "indicative" in the UI.
   * -------------------------------------------------------------------*/
  commercial: {
    currency: "HKD",
    currencySymbol: "HK$",

    // Partner deposit, credited against first orders.
    deposit: 20000,

    // Per-unit SIM card price by order quantity (from the reseller proposal).
    simTiers: [
      { minQty: 500,   maxQty: 4999,  unitPrice: 5, label: "500 – 4,999 pcs" },
      { minQty: 5000,  maxQty: 19999, unitPrice: 4, label: "5,000 – 19,999 pcs" },
      { minQty: 20000, maxQty: null,  unitPrice: 3, label: "20,000+ pcs" }
    ],

    // Data bundle sizes offered in the order builder. Price = rate x GB.
    bundleSizes: [1, 3, 5, 10, 20, 50],

    // How long a quoted rate is held (shown on the generated quote).
    quoteValidityDays: 30,

    // Regional planning margin applied on top of the indicative partner rate
    // in the order builder. 1.25 = +25%. Set to 1 to show raw partner rates.
    indicativeMarkup: 1.25,

    // Turn prices on or off across the whole site. If you would rather not
    // publish any rate information publicly, set this to false and the
    // coverage tables and order builder will show coverage only.
    showRates: true
  },

  /* ---------------------------------------------------------------------
   * 6. VIDEO SHOWCASE  (videos.html)
   * ---------------------------------------------------------------------
   * Every card on the video page is built from this list. To add or replace a
   * video, copy a block and change the values. Nothing else needs editing.
   *
   *   id       The YouTube video ID — the part after "watch?v=" in the URL.
   *            For https://www.youtube.com/watch?v=PxcTGDMCc68  ->  "PxcTGDMCc68"
   *   category "basics" | "travel" | "business" | "own"
   *   title    Shown on the card. Keep it close to the real video title.
   *   channel  Who published it. Shown for attribution — please keep it accurate.
   *   note     One line explaining why a partner should watch it.
   *   lang     Language label shown as a badge.
   *
   * ⚠️ VIDEOS ARE VERIFIED: every id below was checked against YouTube and is
   *    confirmed to exist and allow embedding. If you swap in your own, make
   *    sure the video is not set to "private" or embedding-disabled, or the
   *    card will show a black frame.
   *
   * ⚠️ THIRD-PARTY VIDEOS: these are other people's videos, embedded with
   *    attribution. They are not endorsements of us, and we are not endorsing
   *    them. All competitor promotional videos were deliberately excluded. If
   *    you would rather show only your own content, delete the entries you do
   *    not want and keep the "own" category blocks.
   * -------------------------------------------------------------------*/
  videos: [
    {
      id: "PxcTGDMCc68",
      category: "basics",
      title: "eSIM explained: how it works",
      channel: "Simyo Nederland",
      note: "A mobile operator walks through the technology in plain language — the clearest short explanation we have found.",
      lang: "EN"
    },
    {
      id: "h9Wc1Awlkx4",
      category: "basics",
      title: "What IS an eSIM? (Explained in 5 Minutes)",
      channel: "ForYou.",
      note: "Five minutes, no jargon. Good to send to a colleague who has never come across eSIM.",
      lang: "EN"
    },
    {
      id: "RI7Qn9ILBPg",
      category: "basics",
      title: "What is eSIM? Quick Guide for iPhone & Android",
      channel: "UnlockRiver",
      note: "Covers both platforms, plus the benefits and drawbacks — useful for answering \"will it work on my phone?\"",
      lang: "EN"
    },
    {
      id: "3ibg7nFVCiM",
      category: "basics",
      title: "eSIM Explained — How eSIM Works, Benefits, Drawbacks",
      channel: "LogixStream",
      note: "The most complete of the general explainers, including the limitations worth knowing before you promise anything.",
      lang: "EN"
    },
    {
      id: "2soeZXRGMpc",
      category: "basics",
      title: "What Is an eSIM and How Does It Work?",
      channel: "Mister Mobility",
      note: "Explains how eSIM works on major US carriers — relevant if your travellers are heading to North America.",
      lang: "EN"
    },
    {
      id: "_5ffg6TEejo",
      category: "basics",
      title: "What Is an eSIM: How eSIM Works and Why It's Important",
      channel: "Consumer Buddy",
      note: "Frames eSIM as a consumer benefit rather than a technical feature — helpful for marketing teams.",
      lang: "EN"
    },
    {
      id: "mB_MPBZPmJc",
      category: "travel",
      title: "How to Use an eSIM for International Travel: A Step-by-Step Guide",
      channel: "Bon Voyage Brenda",
      note: "A traveller's-eye walkthrough from purchase to first connection. This is the journey your customer takes.",
      lang: "EN"
    },
    {
      id: "K1J9y7_n4hE",
      category: "travel",
      title: "How to Use an eSIM for International Travel (for Beginners)",
      channel: "Danny Packs",
      note: "An honest first-hand account of using travel eSIM across several trips, including what went wrong.",
      lang: "EN"
    },
    {
      id: "8b_80KzpQwo",
      category: "travel",
      title: "How to Use eSIM while Traveling Internationally on iPhone",
      channel: "Fix369",
      note: "Device-level setup detail for iPhone. Useful as a support reference for your help desk.",
      lang: "EN"
    }
  ],

  /* ---------------------------------------------------------------------
   * 7. SITE BEHAVIOUR
   * -------------------------------------------------------------------*/
  site: {
    // Used for canonical URLs and Open Graph. Set to your live domain.
    url: "https://ztarsbabe.com",
    // Default language on first visit. One of: en, ko, ja, zh-CN, zh-TW, fr, es
    defaultLang: "en",
    // Languages offered in the switcher, in display order.
    languages: [
      { code: "en",    label: "English",    short: "EN" },
      { code: "zh-TW", label: "繁體中文",    short: "繁" },
      { code: "zh-CN", label: "简体中文",    short: "简" },
      { code: "ja",    label: "日本語",      short: "日" },
      { code: "ko",    label: "한국어",      short: "한" },
      { code: "fr",    label: "Français",   short: "FR" },
      { code: "es",    label: "Español",    short: "ES" }
    ]
  }
};
