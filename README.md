# Global eSIM — B2B Wholesale eSIM Website

A complete, dependency-free marketing and ordering website for a B2B wholesale eSIM and
travel-SIM business. Built for travel agencies, OTAs, airlines, insurers, corporate travel
managers, MVNOs and telecom distributors who want to resell travel connectivity.

**Live-ready for GitHub Pages. No build step. No npm. No framework. No tracking.**

---

## Contents

- [What is in the box](#what-is-in-the-box)
- [Quick start](#quick-start)
- [The one file you edit to rebrand everything](#the-one-file-you-edit-to-rebrand-everything)
- [Pages](#pages)
- [Multi-language support](#multi-language-support)
- [Coverage and rate data](#coverage-and-rate-data)
- [Making the forms send you email](#making-the-forms-send-you-email)
- [Social media](#social-media)
- [Publishing to GitHub and your own domain](#publishing-to-github-and-your-own-domain)
- [⚠️ Pre-publication checklist](#️-pre-publication-checklist)
- [Where the market numbers come from](#where-the-market-numbers-come-from)
- [Technical notes](#technical-notes)
- [Extending the site](#extending-the-site)

---

## What is in the box

| Feature | Detail |
|---|---|
| **13 pages** | Home, eSIM Background, Market Potential, Partner Solutions, Coverage & Rates, Videos, Book a Demo, Place an Order, Enquiry, FAQ, Contact, Privacy, Terms |
| **7 languages** | English, Traditional Chinese, Simplified Chinese, Japanese, Korean, French, Spanish |
| **Full FAQ in all 7 languages** | 21 questions × 7 languages = 147 translated Q&A pairs, maintained against a single English master |
| **Business proposal in 7 languages** | A complete 15-section sales proposal, plus a Thai and Vietnamese edition — 7 languages, identical structure, print-ready HTML and editable Markdown |
| **Demo request system** | A dedicated 45-minute demo booking page wired into the header, every proposal and the footer |
| **Video showcase** | `videos.html` — eight commercial advantages plus nine hand-picked, individually verified YouTube explainers, driven entirely from a config list and privacy-safe (nothing loads from YouTube until play is pressed) |
| **Online order builder** | Destination picker driven by real rate data, live costing, volume-tier SIM pricing, downloadable and printable order summary |
| **Online enquiry form** | With WhatsApp and email fallback so no lead is ever lost |
| **Coverage engine** | 68 countries, 94 network partners, 9 regions, filterable country table generated from your own cost sheet |
| **Social media** | X, Instagram, TikTok, YouTube, Facebook, Xiaohongshu, Threads — brand-coloured icons, auto-hiding unconfigured platforms |
| **Market analysis** | Fully sourced, with an explicit statement of evidence quality |
| **Legal drafts** | Privacy policy and terms of use written for a B2B wholesale eSIM business, ready for legal review |
| **Deployment guide** | `DEPLOYMENT.md` — GitHub Pages plus GoDaddy DNS, click by click |

**Total footprint:** roughly 30 files, no third-party requests, no cookies, no analytics.

---

## Quick start

There is nothing to install and nothing to build.

```
1. Double-click index.html
```

That is genuinely it — the site opens in your browser and every feature works.

> **If something misbehaves locally:** some browsers restrict JavaScript on `file://` URLs.
> Serve the folder over HTTP instead:
>
> ```powershell
> cd "path\to\global-esim-b2b-site"
> npx serve .
> ```
>
> Then open the `http://localhost:3000` address it prints. You will need
> [Node.js](https://nodejs.org) for this, but not for anything else.

---

## The one file you edit to rebrand everything

**`assets/js/config.js`** is the single source of truth for:

- Brand name and tagline (tagline is translated into all 7 languages)
- Email address, WhatsApp number, WeChat ID, business hours, phone, address
- Social media profile URLs
- The form endpoint
- Commercial parameters: currency, deposit, SIM volume tiers, bundle sizes, quote validity
- The `showRates` switch that turns all price display on or off site-wide

Change a value there and **every page updates at once**. No HTML file hard-codes a phone
number, an email address, a social handle or a form setting.

### Common edits

**Change the WhatsApp number**

```js
whatsapp: "85297398018",          // digits only, no +, no spaces
whatsappDisplay: "+852 9739 8018", // how it appears on the page
```

**Change the email address**

```js
email: "commercialisation.ai@gmail.com",
```

**Change the WeChat ID**

```js
wechat: "ZhuangChengHK",
```

**Stop publishing prices** (shows coverage without rates, everywhere)

```js
showRates: false,
```

**Change the brand name** — note this also appears in the page `<title>` tags and meta
descriptions, which are static HTML. After changing `brandName`, search and replace the old
name across the `.html` files, or ask a developer to do it.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Hero, headline stats, value proposition, channel segments, onboarding steps, market teaser, coverage teaser |
| `about.html` | What eSIM is, how SGP.22 remote provisioning works, eSIM vs physical SIM, device support, SGP.22 vs SGP.32, SIM-registration basics, network background |
| `market.html` | Sourced market sizing with charts, device adoption, the 2025–26 China change, competitive landscape, channel economics, evidence-quality note |
| `solutions.html` | Six channel solutions, four commercial models, white-label customisation, the four core API operations, new-purchase vs top-up, partner tiers, onboarding, pilot programme |
| `coverage.html` | Region summary cards, live-filterable 68-country table, how to read the rates, how to design a bundle |
| `videos.html` | The eSIM advantage in commercial terms, plus a filterable showcase of YouTube explainers |
| `demo.html` | The 45-minute demonstration request: what we will show, and a booking form with time windows, attendees and focus areas |
| `order.html` | Four-step order builder with live costing and a downloadable order summary |
| `enquiry.html` | Enquiry form plus direct contact options |
| `faq.html` | 21 questions, 7 languages, category filters, search, and FAQPage structured data for search engines |
| `contact.html` | Contact tiles, social channels, support languages |
| `privacy.html` | Privacy policy draft (requires legal review) |
| `terms.html` | Terms of use draft (requires legal review) |
| `proposals/index.html` | Landing page for the seven proposal language editions |
| `proposals/proposal-<lang>.html` | **The sales proposal**, print-ready, one per language |

---

## The video showcase

`videos.html` does two jobs. The top half argues the **commercial case** for eSIM in eight
cards — no inventory or customs, instant delivery, roughly 75% cheaper than roaming,
multiple profiles per device, a compliance advantage, corporate control, instant
replacement, and repeat revenue at no acquisition cost.

The bottom half is a **filterable video grid**. Every video is driven from the `videos`
array in `config.js` — the HTML contains no video IDs at all.

### The nine videos are all verified

Each one was checked individually against YouTube's oEmbed API to confirm it exists **and**
that embedding is permitted. If a video is private or embed-disabled it shows a black frame,
which is why that check matters.

| Category | Videos | Sources |
|---|---|---|
| `basics` | 6 | Simyo Nederland (an operator), ForYou., UnlockRiver, LogixStream, Mister Mobility, Consumer Buddy |
| `travel` | 3 | Bon Voyage Brenda, Danny Packs, Fix369 |

> **No competitor's video is included.** Airalo, Saily, Ubigi and Holafly all publish
> promotional eSIM videos, several with affiliate links. Putting any of them on your own B2B
> sales site would send prospects to a competitor, so they were deliberately excluded. If you
> search for more videos yourself, watch for that — a large share of "business eSIM" content
> is competitor marketing.

### Privacy: videos load only when played

The site's privacy policy promises no third-party tracking. A normal YouTube embed would break
that promise, because the iframe loads on page view and sets cookies before anyone presses
play. So the page uses a **click-to-load** pattern:

- On page load it shows only a still poster image. **No YouTube player exists and no YouTube
  cookie is set.**
- When a visitor presses play, the iframe is created then, served from
  **`youtube-nocookie.com`** (YouTube's privacy-enhanced domain).
- Every card also carries an **Open on YouTube** link for anyone who would rather not load a
  player inline.

The privacy policy has been updated to disclose this accurately, including the fact that
pressing play may set YouTube cookies.

### Adding your own videos

Edit the `videos` array in `assets/js/config.js`:

```js
{
  id: "dQw4w9WgXcQ",              // the part after watch?v= in the YouTube URL
  category: "own",                 // basics | travel | business | own
  title: "White-label unboxing",
  channel: "Global eSIM",
  note: "One line on why a partner should watch it.",
  lang: "EN"
}
```

Filter chips appear automatically, and **a category with no videos is hidden** — so if you
add nothing to `business` or `own`, those chips simply do not render.

> ⚠️ Before publishing your own: the video must be set to **Public** and **embedding must be
> allowed** in the video's YouTube settings, or the card shows a black frame. Check you have
> the right to publish anything you add.

Practical tip from the page itself: the four video types that actually move a B2B
conversation are a **60-second activation**, a **white-label unboxing**, a **roaming cost
comparison with real numbers on screen**, and a **console walkthrough**.

---

## The business proposal

`proposals/` contains a complete, client-ready B2B sales proposal — **15 sections** covering the
opportunity, the solution, coverage and rates, four commercial models, indicative terms, a worked
margin example, differentiators, an implementation plan, a pilot programme, support commitments,
and an explicit **request for a 45-minute demonstration**.

### Seven languages, identical structure

| File | Language |
|---|---|
| `proposal-en.md` / `.html` | English |
| `proposal-zh-TW.md` / `.html` | Traditional Chinese (Hong Kong) |
| `proposal-zh-CN.md` / `.html` | Simplified Chinese |
| `proposal-ja.md` / `.html` | Japanese |
| `proposal-ko.md` / `.html` | Korean |
| `proposal-th.md` / `.html` | Thai |
| `proposal-vi.md` / `.html` | Vietnamese |

> **Why both Chinese editions?** Hong Kong and Taiwan partners expect Traditional; mainland China
> and much of Southeast Asia expect Simplified. The site's own language switcher offers both, so the
> proposal does too.

### How to send one to a client

1. Open `proposals/index.html` (or the language you need directly) in a browser.
2. Click **Print or save as PDF** — the print stylesheet strips the navigation and buttons and
   produces a clean document.
3. Or download the `.md` source and paste it into Word or Google Docs if you need to edit the text.

**Before sending, replace three placeholders** in the meta table at the top:
`[Client company name]`, `[Date]` and `[GE-PROP-XXXX]` (use your own reference, e.g. `GE-PROP-2026-014`).

Every version links to `demo.html`, so the ask for a demonstration is always one click away.

### Editing the proposal

The Markdown files are the source of truth; the HTML is generated. After editing any `.md` file:

```powershell
node proposals/build-proposals.mjs
```

That rebuilds all seven HTML documents and the index. The build script lives at
`proposals/build-proposals.mjs` and supports a deliberately small Markdown subset — headings,
bold, italic, inline code, links, bullet and numbered lists, blockquotes, rules and pipe tables.
**Keep the section headings, table shapes and figure list identical across all seven languages**,
or the documents will drift apart and a client comparing two versions will notice.

### The demo request page

`demo.html` is the conversion point the proposal drives to. It sets out the six things the
45-minute session covers, and collects the details needed to run it well: two preferred time
windows, the visitor's time zone, attendee count, their top destinations, expected volume, and
which areas to focus on. Six focus checkboxes let a prospect tell you whether they care about
coverage, the API, white label, the commercial model, compliance or the pilot — which is useful
qualification data before the call.

The page is linked from the header call to action on every page, the footer, every one of the
seven proposals, and the enquiry page sidebar.

---

## Multi-language support

### What is translated

| Layer | Coverage |
|---|---|
| **FAQ content** | **Complete.** All 21 questions and answers, professionally translated into all 7 languages |
| **Site interface** | **Complete.** 111 keys — navigation, buttons, form labels, home-page headings — in all 7 languages |
| **Body copy on inner pages** | English only, by design |

The scope decision is deliberate. A business evaluating a wholesale supplier reads the
commercial detail in English, but the FAQ is where most questions arise and where a partner
may need to share answers internally in their own language. Translating 11 pages of
market analysis into 7 languages would multiply the maintenance burden for very little
commercial gain and would inevitably drift out of sync.

### How it works

- English text is written directly into the HTML, so the site is fully readable and fully
  indexable **even with JavaScript disabled**.
- Elements carrying `data-i18n="key"` are swapped at runtime from `assets/js/i18n.<lang>.js`.
- The visitor's choice is stored in `localStorage` and also written to the URL as
  `?lang=ko`, so a link can be shared in a specific language.
- The browser's own language is detected on first visit.

### Adding or editing a translation

1. Edit `assets/js/i18n.en.js` **first** — it is the master.
2. Copy the same key into the other six `i18n.*.js` files.
3. Keep the **keys** identical (including the dots). A missing key silently falls back to
   English; an extra key is ignored.

To check parity across all seven dictionaries:

```powershell
node -e "const p='.';global.window={};const L=['en','ko','ja','zh-CN','zh-TW','fr','es'];const k={};for(const l of L){global.window={};require('./assets/js/i18n.'+l+'.js');k[l]=Object.keys(window.I18N[l]);}const b=k['en'];for(const l of L)console.log(l.padEnd(6),k[l].length,'missing',b.filter(x=>!k[l].includes(x)).length,'extra',k[l].filter(x=>!b.includes(x)).length);"
```

### Adding a brand-new language

1. Create `assets/js/i18n.xx.js` mirroring `i18n.en.js`.
2. Create `assets/js/faq.xx.js` mirroring `faq.en.js` (keep the `id` values unchanged).
3. Add the language to `site.languages` in `config.js`.
4. Add two `<script>` tags to **every** `.html` file, next to the existing ones.

Languages that need right-to-left layout (Arabic, Hebrew) would additionally require a CSS
change to `dir="rtl"` — `main.js` currently forces `dir="ltr"`.

---

## Coverage and rate data

`assets/js/coverage-data.js` is a **generated file** holding 68 countries, 94 network
partners and 9 regions, taken from the supplied partner cost sheet
(`wechatbiz_cost_SIM.xlsx`).

Each country record looks like this:

```js
{
  "country": "Japan",
  "tc": "日本",
  "region": "EAST_ASIA",
  "from": 20,                    // lowest indicative partner rate, HKD per GB
  "nets": 4,                     // number of network partners in that country
  "tech": ["4G", "5G"],
  "ops": ["NTTDoCoMo", "softbank", "KDDI AU"]
}
```

### Region summary

| Region | Countries | Network partners | From (HKD/GB) | Technology |
|---|---|---|---|---|
| Southeast Asia | 9 | 15 | 8 | 3G / 4G / 5G |
| East Asia | 7 | 13 | 20 | 4G / 5G |
| North America | 3 | 7 | 25 | 5G |
| Middle East | 5 | 7 | 30 | 3G / 4G |
| Africa | 7 | 7 | 30 | 4G |
| Europe | 24 | 29 | 40 | 4G / 5G |
| Oceania | 3 | 4 | 40 | 4G / 5G |
| Central & South Asia | 3 | 4 | 50 | 4G |
| Latin America | 7 | 8 | 120 | 3G / 4G |

### Updating the rates

Edit `coverage-data.js` directly — it is plain JSON assigned to a global. Change a
country's `from` value, save, refresh. Nothing else needs to change; the coverage table and
the order builder both read from it.

### How the order builder prices a multi-country bundle

```
blended rate = average of the "from" rate across all selected destinations
data cost    = blended rate × bundle GB × quantity
SIM cost     = tier unit price × quantity      (physical SIM only)
total        = data cost + SIM cost
```

Volume tiers, the deposit and the quote validity period all live in `config.js` under
`commercial`.

> **Design note.** An average blended rate is the natural reading of a regional bundle, but
> it is not how every wholesaler prices. If your commercial reality is that a
> multi-country bundle is priced at the *most expensive* network in the mix, change the
> `calc()` function in `assets/js/order.js` to use `Math.max` instead of the mean. The
> function is short and commented.

---

## Making the forms send you email

**Out of the box, the forms do not send email** — a static site on GitHub Pages has no
server to send it with. What they do instead is fail *safely*: the visitor gets a
reference number and one-tap WhatsApp and email buttons pre-filled with everything they
typed. **No enquiry is ever silently lost.**

To get automatic email delivery, pick either option:

### Option A — Formspree (recommended, ~3 minutes)

1. Sign up at <https://formspree.io> (free tier: 50 submissions/month).
2. Create a new form. It gives you an endpoint like `https://formspree.io/f/xxxxxxxx`.
3. Paste it into `assets/js/config.js`:

```js
formEndpoint: "https://formspree.io/f/xxxxxxxx",
```

That is all. Both the enquiry form and the order form will now email you, and the visitor
still gets their reference number and fallback buttons as a safety net.

### Option B — Web3Forms

1. Get a free access key at <https://web3forms.com>.
2. Set the endpoint to `https://api.web3forms.com/submit` and add your key. Web3Forms
   expects the key in the payload, so the simplest route is to adjust the `payload` object
   in `assets/js/form.js` to include `access_key`.

### What gets sent

The payload includes the visitor's language, the page they submitted from, a Hong Kong
timestamp, every field as a readable label/value pair, and — on the order page — the full
order configuration: plan type, format, branding, bundle size, quantity, destination count,
the destination list, the blended rate and the indicative total.

---

## Social media

All seven platforms are wired up with correct brand colours and hover styling:
**X, Instagram, TikTok, YouTube, Facebook, Xiaohongshu, Threads.**

Add your profile URLs in `config.js`:

```js
social: {
  x:           "https://x.com/yourhandle",
  instagram:   "https://www.instagram.com/yourhandle",
  tiktok:      "https://www.tiktok.com/@yourhandle",
  youtube:     "https://www.youtube.com/@yourhandle",
  facebook:    "https://www.facebook.com/yourpage",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/XXXXXXXX",
  threads:     "https://www.threads.net/@yourhandle"
}
```

**Any platform left as an empty string is automatically hidden across the entire site.** The
site never shows a dead link. If none are configured yet, a short friendly line appears in
their place instead.

> **A note on the Xiaohongshu icon.** Xiaohongshu does not publish an open-licensed brand
> glyph the way X or YouTube do. The icon in this site is therefore a neutral
> "notes/book" mark in Xiaohongshu's red (`#FE2442`) rather than the official logo. If you
> want the official mark, upload it yourself and swap the path in the `SOCIAL` object in
> `assets/js/main.js` — but check RED's brand guidelines first, as they restrict use.

---

## Publishing to GitHub and your own domain

### The easy way to publish updates — one command

`push-to-github.mjs` uploads this folder to your repository directly, using GitHub's API. It
does **not** require git to be installed, and it is safe to re-run: it compares the git blob
SHA of every local file against GitHub and uploads **only the files that actually changed**.

```powershell
node push-to-github.mjs <TOKEN> --dry-run     # see what would change, upload nothing
node push-to-github.mjs <TOKEN>               # upload for real
```

Get the token in about 60 seconds at
<https://github.com/settings/personal-access-tokens/new>:

1. **Token name** — anything, e.g. `Global eSIM site upload`
2. **Expiration** — set something short, e.g. 90 days
3. **Repository access** → *Only select repositories* → `eSim`
4. **Permissions** → *Repository permissions* → **Contents: Read and write**
5. Generate, copy, paste after the script name

The token is used only for that run and is never written to disk. It defaults to the
repository `kawansherman/eSim`; pass `owner/repo` to target a different one.

> **Why bother, rather than dragging files into the GitHub website?** Because the web
> uploader silently misses **hidden files**. When this site was first uploaded that way,
> `.nojekyll` and `.gitignore` were left behind — Windows hides dotfiles by default, so they
> are invisible in File Explorer. The script reads the folder directly and catches them.

### The manual way — GitHub website

1. Open your repository and click **Add file → Upload files**.
2. Open the `global-esim-b2b-site` folder locally and select **the contents** — all the
   `.html` files, plus the `assets` and `proposals` folders.
3. Drag them onto the upload area. **Do not drag the folder itself**, or you will get a
   nested folder and GitHub Pages will stop finding your home page.
4. Commit. Files with the same path are overwritten automatically.
5. **Turn on hidden files first** (File Explorer → View → Show → Hidden items) so that
   `.nojekyll` and `.gitignore` are included.

### Custom domain

See **[`DEPLOYMENT.md`](DEPLOYMENT.md)** for the full click-by-click walkthrough covering
creating the repository, buying the domain at GoDaddy (and which upsells to decline), the
exact DNS records, HTTPS, verification, and 10 troubleshooting scenarios.

`setup-domain.mjs` handles every domain-dependent edit in one command — see the Fast path
at the top of `DEPLOYMENT.md`.

The short version of the DNS values:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| `CNAME` | `www` | `YOUR-USERNAME.github.io` |

---

## ⚠️ Pre-publication checklist

Work through this **before** you make the repository public or point the domain at it.
Several items are commercially sensitive.

### Must do

- [ ] **Decide whether to publish your wholesale rates at all.** This is the most
      important decision on this list. The site currently publishes your lowest indicative
      partner rate for all 68 countries. **No major eSIM wholesaler publishes a public
      per-GB rate card** — rates are normally released under NDA only. Publishing yours may
      be a deliberate competitive weapon, or it may hand your margin to every competitor
      and every customer who asks. If you would rather not, set `showRates: false` in
      `config.js` and the coverage table and order builder will show coverage without
      prices. **Consider asking a commercially experienced colleague before deciding.**
- [ ] **Decide whether the proposal documents should be public.** They are currently part of the
      published site at `/proposals/`, which means a prospect — or a competitor — can read your
      proposal template, your commercial tiers and your worked margin example before you ever speak
      to them. Many suppliers publish exactly this. If you would rather not, either delete the
      `proposals/` folder before publishing, or list it in `.gitignore`. The generated pages already
      carry `<meta name="robots" content="noindex, follow">` so they will not appear in search
      results either way. **This is a commercial call, not a technical one.**
- [ ] **Decide whether to keep the third-party videos.** `videos.html` embeds nine videos by
      other creators, verified as existing and embeddable, with attribution and no competitor
      content. They are not endorsements in either direction, but if you would rather show only
      your own material, delete the non-`own` entries from the `videos` array in `config.js` and
      the page will simply show fewer cards.
- [ ] **Confirm the enterprise eSIM management figure** added to section 2.1 of the proposal
      (USD 2.21 bn in 2025 → USD 8.63 bn by 2030, 31.3% CAGR, attributed to The Business Research
      Company). It is correctly sourced, but check it is a claim you are comfortable defending.
- [ ] **Replace the proposal placeholders** before sending any proposal to a client:
      `[Client company name]`, `[Date]` and `[GE-PROP-XXXX]`.
- [ ] **Review the top of your rate range.** The published data includes rates as high as
      **HK$200/GB (Myanmar)** and **HK$140/GB (Austria)**. Since entry rates start at
      HK$8/GB, a visitor may reasonably ask why the spread is 25×. Either be ready to
      explain it (remote markets, low volume, premium networks) or exclude the highest
      outliers from the public view.
- [ ] **Set up the form endpoint** (see above), or accept that enquiries arrive via
      WhatsApp and email rather than automatically.
- [ ] **Have both legal pages reviewed by a lawyer.** `privacy.html` and `terms.html` are
      solid drafts, not legal advice. Fill in every `[placeholder]`: legal entity name,
      registered address, company registration number, review dates, retention periods,
      liability cap, and the governing-law/arbitration choice.
- [ ] **Add your social profiles** in `config.js`, or leave them empty so they auto-hide.
- [ ] **Confirm every commercial figure.** The deposit (HK$20,000), the SIM tiers
      (HK$5 / HK$4 / HK$3), the 3–6 month grace period and the 30-day notice period on the
      site are taken from the reseller proposal. Update them if terms have moved.
- [ ] **Decide on the domain email.** Enquiries currently go to a Gmail address, which
      looks less credible on a B2B site than `sales@yourdomain.com`. See Part 11 of
      `DEPLOYMENT.md`.
- [x] ~~Update `site.url` in `config.js` to your real domain, and update the `<link rel="canonical">`
      tags in each `.html` file (currently `https://www.example.com/`).~~ **Automated**: once you
      know your domain, run `node setup-domain.mjs yourdomain.com`. It creates the `CNAME` file,
      sets `config.site.url`, rewrites all 23 canonical and structured-data URLs across 21 files,
      prints the GoDaddy DNS records, and confirms no placeholder is left. See `DEPLOYMENT.md`.

### Worth checking

- [ ] The brand name is "Global eSIM". If it should be styled differently (e.g. "Global
      eSim"), change it once in `config.js` and search-replace across the `.html` files.
- [x] ~~The hero claims "68 countries and 100+ network partners".~~ **Corrected**: the hero now
      states the verified figure of **94 network partners**, matching `coverage-data.js`, in
      English and all six translations. If you add network partners, update
      `home.hero.point1` in every `i18n.*.js` file and the `stat-num` on `index.html`.
- [ ] Prices are quoted in **HKD**. If your target partners think in USD, consider
      switching `currencySymbol` and adding a note about the conversion basis.
- [ ] Test the order builder and both forms yourself, on a phone as well as a desktop.

---

## Where the market numbers come from

Every quantitative claim on `market.html`, `about.html` and `index.html` is sourced, and the
market page carries an explicit statement about the quality of that evidence. In summary:

**Strong sourcing** — market sizing, device adoption and regulation come from research
houses, industry bodies and regulators: Juniper Research, Counterpoint Research, Kaleido
Intelligence, Trusted Connectivity Alliance, UN Tourism, GSMA, and Hong Kong's OFCA.

**Indicative only** — wholesale per-GB cost ranges, support-cost estimates and
activation-failure commentary are practitioner-reported. They are labelled as indicative on
the page and should not be presented to a customer as a carrier rate card.

**Deliberately omitted** — no figure is given for eSIM activation failure rates as a
percentage, because no independent third-party study quantifying it was found. The page
says so explicitly rather than inventing a number.

The full research brief with all 44 source URLs is available separately as
`B2B_eSIM_Wholesale_Market_Research_Brief_2026.md`.

> **A caution on the market figures.** The brief notes that some headline "eSIM market size"
> numbers differ by nearly 3× between research houses because they measure different things
> (hardware plus connectivity, versus a narrower technology/services definition). The site
> therefore leads with *travel eSIM revenue* and *roaming revenue*, which are far more
> defensible for a wholesale pitch, rather than a single vague "eSIM market" number.

---

## Technical notes

- **No dependencies at all.** No jQuery, no Bootstrap, no Google Fonts, no CDN, no
  analytics. Every asset is served from your own domain. The site works fully offline and
  loads in a single round trip.
- **No build step.** Editing an HTML file or a JS file and refreshing is the whole workflow.
  That is why it deploys to GitHub Pages without any CI configuration.
- **Accessibility.** Semantic landmarks (`header`, `nav`, `main`, `footer`), a skip link,
  visible focus rings, `aria-expanded` on all toggles, `aria-pressed` on the language menu,
  `aria-current` on the active nav item, `role="status"` and `aria-live="polite"` on form
  results, and no colour-only meaning. Icon-only controls carry `aria-label`.
- **Responsive.** Breakpoints at 1150px (navigation collapses to a menu), 980px, 860px,
  660px and 460px. Tested layout logic for the order builder's sticky summary, which
  becomes a normal block below 980px.
- **Print stylesheet.** `Ctrl+P` on the order page produces a clean printed quotation with
  the navigation, footer and buttons stripped out.
- **Progressive enhancement.** Every page reads correctly with JavaScript disabled. The
  order builder, FAQ filtering and language switching require JS, and everything else does
  not.
- **Performance.** The heaviest page (the FAQ) loads about 250 KB of JavaScript, almost
  entirely the seven FAQ translations. If you want it lighter, load only the English FAQ
  file and fetch the others on demand.
- **Browser support.** Any browser from roughly 2021 onwards. `:has()` is used for the
  selected-state styling of the order options, which degrades harmlessly.

### File structure

```
global-esim-b2b-site/
├── index.html  about.html  market.html  solutions.html  coverage.html  videos.html
├── demo.html  order.html  enquiry.html  faq.html  contact.html  privacy.html  terms.html
├── README.md               ← you are here
├── DEPLOYMENT.md           ← GitHub Pages + GoDaddy DNS guide
├── setup-domain.mjs        ← ★ run once with your domain: node setup-domain.mjs yourdomain.com
├── .nojekyll               ← tells GitHub Pages not to run Jekyll
├── .gitignore
├── CNAME                   ← created by GitHub when you set a custom domain
├── .github/workflows/pages.yml
├── proposals/
│   ├── index.html          ← GENERATED: language landing page
│   ├── build-proposals.mjs ← Markdown → HTML build script
│   ├── proposal-en.md  … proposal-vi.md       ← 7 editable sources
│   └── proposal-en.html … proposal-vi.html    ← 7 GENERATED print-ready documents
└── assets/
    ├── css/style.css       ← the entire design system, ~35 KB
    ├── img/logo.svg  img/favicon.svg
    └── js/
        ├── config.js       ← ★ THE FILE YOU EDIT
        ├── main.js         ← navigation, i18n engine, social icons, FAQ renderer
        ├── form.js         ← enquiry, order and demo form submission with safe fallback
        ├── order.js        ← order builder engine and pricing
        ├── videos.js       ← video showcase renderer (click-to-load, no iframes until play)
        ├── coverage-data.js← GENERATED: 68 countries, rates, network partners
        ├── i18n.en.js … i18n.es.js    ← 7 UI dictionaries, identical keys
        └── faq.en.js  … faq.es.js     ← 7 FAQ files, 21 items each
```

---

## Extending the site

Things that are straightforward to add, and where to add them:

| Task | Where |
|---|---|
| A new page | Copy any inner page, replace the `<main>` content, add a nav link to all pages |
| A new language | See [Multi-language support](#multi-language-support) |
| New FAQ questions | Add to `faq.en.js`, then to all six other `faq.*.js` files, keeping `id` order |
| Change the pricing formula | `calc()` in `assets/js/order.js` |
| New icons | The `ICONS` object in `assets/js/main.js`, then `<span data-icon="name"></span>` |
| Change colours | The `:root` token block at the top of `assets/css/style.css` |
| A real payment flow | Not possible on GitHub Pages alone. See below. |

### If you want to take real payments

The order builder produces a quotation, not a chargeable transaction, because GitHub Pages
cannot run server-side code. To take deposits or sell bundles directly you need a serverless
endpoint. The options, roughly in order of effort:

1. **Cloudflare Workers** (free tier) — a function that creates a Stripe Checkout session and
   returns the redirect URL. Keeps the GitHub Pages front end and adds ~30 lines.
2. **Stripe Payment Links** — no code at all: create a link per bundle size in the Stripe
   dashboard, and point the order buttons at them. Loses the dynamic pricing.
3. **Vercel or Netlify Functions** — same idea, but you would host the site there instead of
   GitHub Pages, and point your GoDaddy DNS at them rather than at GitHub.

Note that your internal requirements document mentions **Airwallex** (which supports
refunds) and **Stripe/Alipay** (refund support still to be confirmed). Whatever you choose,
make sure the provider supports refunds before you rely on it, because the refund policy in
`terms.html` and the FAQ promises refunds through the original payment method "wherever the
payment provider supports it".

---

## Ownership and licensing

All content in this project was written for this business and is yours to use, edit and
publish. Third-party brand logos (X, Instagram, TikTok, YouTube, Facebook, Threads) are the
property of their respective owners and are used here only as links to your own profiles,
which is conventional and permitted use. The Xiaohongshu mark is a neutral substitute, not
the official logo.

Market statistics remain the property of the research houses that published them and are
cited with attribution and links throughout. Do not remove those attributions.
