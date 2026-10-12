/* ============================================================================
 * Global eSIM — FAQ content: ENGLISH (source language)
 * ----------------------------------------------------------------------------
 * This file is the master copy. Every other language file
 * (faq.ko.js, faq.ja.js, faq.zh-CN.js, faq.zh-TW.js, faq.fr.js, faq.es.js)
 * mirrors the same ids in the same order.
 *
 * To edit an answer: change the English here first, then update the other
 * language files. Keep the `id` values unchanged.
 * ==========================================================================*/
window.FAQ_DATA = window.FAQ_DATA || {};

window.FAQ_DATA.en = [
  {
    id: "q1",
    cat: "basics",
    q: "What exactly is an eSIM, and how is it different from a plastic SIM?",
    a: "An eSIM (embedded SIM) is a GSMA-standardised chip soldered permanently into the device. Instead of inserting a card, your customer installs a digital profile over the air. There is nothing to ship, nothing to lose in transit, and a new plan can be delivered in seconds to anywhere in the world. eSIM-capable phones reached 37% of global smartphone sales in 2025 and are forecast to reach 48% in 2026 (Counterpoint Research), so this is now the mainstream format rather than a niche one."
  },
  {
    id: "q2",
    cat: "basics",
    q: "How does the activation actually work for the end customer?",
    a: "Under the GSMA SGP.22 standard, your customer scans a QR code or taps an install link and the profile downloads from our SM-DP+ server to their handset, usually in under a minute. We issue the QR code, the matching ID and the activation instructions; you decide how they reach the customer — email, inside your own app, or printed on an insert in a travel kit. Manual activation codes are available for customers who cannot scan a screen."
  },
  {
    id: "q3",
    cat: "basics",
    q: "Which devices support eSIM?",
    a: "Every iPhone from the XS onwards, most Samsung Galaxy S20-and-later flagships, Google Pixel 3 and later, and a growing list of Huawei, Xiaomi, OPPO, vivo, Honor and Motorola models. Apple has now removed the physical SIM tray entirely in twelve markets for its latest generation — the United States, Canada, Mexico, Japan, Guam, the US Virgin Islands, Bahrain, Kuwait, Oman, Qatar, Saudi Arabia and the UAE. For inbound travellers from those markets, eSIM is not an option, it is the only choice."
  },
  {
    id: "q4",
    cat: "basics",
    q: "Can an eSIM provide a phone number, voice calls and SMS?",
    a: "Our travel products are data-first, and that is deliberate. A data-only profile is generally outside local SIM-registration law because no local phone number is assigned to it, which removes a significant compliance burden from you and your customer. Voice and SMS are available as an option in selected markets and for corporate deployments. Tell us your requirement and we will confirm availability and pricing for the specific countries."
  },

  {
    id: "q5",
    cat: "commercial",
    q: "Who can become a partner or reseller?",
    a: "Travel agencies, online travel agents, airlines, hotels, insurance and loyalty programmes, corporate travel managers, MVNOs, telecom distributors and retail chains. The common thread is that you already own a customer relationship at the moment of travel — that is the distribution we are looking for. We also supply mobile operators who want to add a travel eSIM line to their own portfolio without building the wholesale plumbing themselves."
  },
  {
    id: "q6",
    cat: "commercial",
    q: "What is the minimum order, and is a deposit required?",
    a: "Commercial entry for physical SIM stock starts from 500 units, with a partner deposit from HKD 20,000 that is credited against your first orders. There is no minimum stock order for a data-only eSIM launch, because eSIM profiles are provisioned on demand and you hold no inventory at all. Every figure shown on this website is indicative and published for orientation; the numbers in your signed partner agreement are the ones that apply."
  },
  {
    id: "q7",
    cat: "commercial",
    q: "How are wholesale rates structured, and can they change?",
    a: "Rates are set per country and per network partner, and the rate card shows which networks are 3G, 4G or 5G in each market. Volume tiers reduce the per-unit SIM price as your order quantity grows. Like every wholesale connectivity supplier, rates are subject to revision — we give 30 days' written notice before any cost or offer changes, so a live campaign is never repriced underneath you. Full rate cards are released under NDA after partner verification."
  },
  {
    id: "q8",
    cat: "commercial",
    q: "What commercial models do you offer?",
    a: "Four. First, wholesale: you buy data bundles at partner rates and set your own retail price. Second, revenue share: we operate the platform and you and we share the margin. Third, white label: your brand, your logo, your packaging, our network and our billing. Fourth, embedded or API: we plug into your existing checkout or app and your team never touches an operations console. Most partners begin with wholesale and migrate to white label as volume grows."
  },
  {
    id: "q9",
    cat: "commercial",
    q: "How long does onboarding take, and what do you need from us?",
    a: "Typically two to four weeks from signature to first live transaction. You provide your company registration documents, a named responsible individual for SIM-registration purposes, your brand assets if you are white-labelling, and a technical contact for API credentials. We then provision your account, issue test credit so your developers can integrate without spending real money, and run a pilot order together."
  },
  {
    id: "q10",
    cat: "commercial",
    q: "What can we customise under a white-label agreement?",
    a: "The SIM card artwork and its jacket, the packaging (full page 13cm × 10cm, single page 6.5cm × 10cm), the Service Provider Name shown in the handset's status bar — up to eight characters — the greeting SMS sent on first activation, balance and usage-reminder messages at 50%, 80% and 100% of data, OTP login messages and campaign messages. Your brand appears on the network display, not ours."
  },
  {
    id: "q11",
    cat: "commercial",
    q: "Is there a trial or pilot before we commit?",
    a: "Yes, and we recommend one. A pilot normally means a defined quantity, a defined set of destinations and a defined period, run before any long-term commitment. The commercial terms are deliberately low-risk: a short initial grace period on pay-as-you-go terms and no minimum guaranteed volume during the pilot. You are testing our network and our support, not signing away your budget."
  },

  {
    id: "q12",
    cat: "technical",
    q: "Do you have an API, and what can it do?",
    a: "Yes. The partner API covers four core operations: provisioning a new eSIM, querying the available catalogue, adding a data plan to an existing eSIM, and removing a plan. Around those we expose catalogue browsing, order creation, ICCID lookup, usage retrieval, activation status and real-time webhooks that fire at 50%, 80% and 100% of a bundle's data. Full reference documentation, sandbox credentials and a Postman collection are issued during onboarding."
  },
  {
    id: "q13",
    cat: "technical",
    q: "How does the customer receive and activate the eSIM?",
    a: "However you prefer. We can deliver a QR code by email, a one-tap install link inside your own application, or a printed card or insert inside a physical travel kit. The customer installs the profile before departure and the plan begins the first time they connect at the destination. Activation time, remaining days and remaining data are all visible to your team in the partner console, alongside the same information for every card you have ever issued."
  },
  {
    id: "q14",
    cat: "technical",
    q: "What happens if an eSIM fails to activate?",
    a: "Activation problems are the single most common support ticket in this industry, so we treat them as a product feature rather than an exception. We support re-issuing a profile, revoking an unused bundle and returning it to your inventory, and escalating to a named human engineer. Every partner gets an agreed response time and a named support contact as part of onboarding, not as an upsell."
  },
  {
    id: "q15",
    cat: "technical",
    q: "How do top-ups and recharges work?",
    a: "An eSIM can be topped up for up to twelve months after its last usage, so a customer who travels again simply buys more data on the profile they already have. You can sell the top-up from your own storefront through the API, or send the customer to a hosted top-up page that carries your branding. This is where the economics of the channel really improve, because a repeat sale carries no new customer-acquisition cost."
  },
  {
    id: "q16",
    cat: "technical",
    q: "Do you supply physical SIM cards as well as eSIM?",
    a: "Yes. Physical SIMs remain important in markets such as Hong Kong, where both formats are still in everyday use, and in the travel-kit and retail-chain channel where a tangible card is part of the product. We supply NFC SIM cards in tiered volumes and can support distribution through chain stores, travel exhibitions and bundled travel kits. Where regulation and customer devices allow, we normally recommend leading with eSIM, because there is no inventory, no logistics and no customs exposure."
  },

  {
    id: "q17",
    cat: "compliance",
    q: "What identity and SIM-registration rules apply?",
    a: "The rules that bind you are the rules of your customer's country, not ours. More than 155 countries now operate mandatory SIM-registration regimes, covering over 60% of global mobile connections. In Hong Kong, a corporate customer may register up to 25 pre-paid SIM cards per operator, while there is no cap of that kind on service-plan SIMs — which is a concrete argument for leading with eSIM in corporate channels. Data-only travel profiles carry no local number and therefore usually fall outside these regimes altogether. We confirm the position country by country when we design your product."
  },
  {
    id: "q18",
    cat: "compliance",
    q: "How is personal and customer data handled?",
    a: "We process only what is required to deliver the service: the ICCID of the eSIM, plan and usage records, and the contact details of end users where you choose to pass them to us. We act as a data processor on your behalf rather than as a controller, we apply GDPR-standard technical and organisational safeguards, and we never sell or reuse your customer data for our own marketing. A data processing agreement is signed as part of onboarding."
  },

  {
    id: "q19",
    cat: "support",
    q: "What are the payment terms, currencies and settlement cycle?",
    a: "Payment is by bank transfer in Hong Kong dollars or US dollars, with a pay-as-you-go structure during the initial grace period and settlement terms agreed in your partner agreement. We can invoice per order or on an agreed cycle, whichever suits your finance team. If you sell to your customers in a different currency, we can quote in that currency so your foreign-exchange exposure is visible up front instead of being silently absorbed by your margin."
  },
  {
    id: "q20",
    cat: "support",
    q: "What is the refund and returns policy?",
    a: "An unused eSIM profile can be cancelled and refunded to your account balance before it is activated. Once a profile has been activated, refunds are assessed case by case, because the data cost has already been incurred with the network operator. Refunds to your end customer are returned through the original payment method wherever the payment provider supports it. For physical stock, we authorise the return and issue the collection address, and credit your account once the goods arrive in resalable condition."
  },
  {
    id: "q21",
    cat: "support",
    q: "What support do you provide, and in which languages?",
    a: "Partner support is available in English, Traditional Chinese, Simplified Chinese, Korean and Japanese, with a direct escalation path to engineering rather than a scripted first line. Standard cover is Hong Kong business hours with an out-of-hours route for activation incidents. You also receive onboarding training for your team, a walkthrough of the rate card, and template customer-facing FAQs you can publish under your own brand — including the seven languages used on this website."
  }
];
