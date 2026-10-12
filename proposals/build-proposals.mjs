/* ============================================================================
 * Global eSIM — proposal builder
 * ----------------------------------------------------------------------------
 * Converts proposals/proposal-<lang>.md into print-ready HTML documents that
 * share the site's stylesheet, header, footer and scripts.
 *
 * Run: node proposals/build-proposals.mjs
 *
 * The Markdown subset supported is deliberately small and matches exactly what
 * the proposal documents use: h1/h2/h3, **bold**, *italic*, `code`, [links](),
 * - bullets, 1. ordered lists, > blockquotes, --- rules, and pipe tables.
 * ==========================================================================*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

const LANGS = [
  { code: 'en',    label: 'English',   native: 'English',   file: 'proposal-en.md' },
  { code: 'zh-TW', label: '繁體中文',   native: '繁體中文',   file: 'proposal-zh-TW.md' },
  { code: 'zh-CN', label: '简体中文',   native: '简体中文',   file: 'proposal-zh-CN.md' },
  { code: 'ja',    label: '日本語',     native: '日本語',     file: 'proposal-ja.md' },
  { code: 'ko',    label: '한국어',     native: '한국어',     file: 'proposal-ko.md' },
  { code: 'th',    label: 'ไทย',       native: 'ไทย',       file: 'proposal-th.md' },
  { code: 'vi',    label: 'Tiếng Việt', native: 'Tiếng Việt', file: 'proposal-vi.md' }
];

/* ------------------------------------------------------------ inline ---- */
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s) {
  let t = esc(s);
  // links first — URLs may contain underscores that would confuse emphasis
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
    const external = /^https?:/i.test(href);
    return '<a href="' + href + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' + text + '</a>';
  });
  // inline code before emphasis
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  return t;
}

/* ------------------------------------------------------ block parser ---- */
function renderTable(rows) {
  const cells = (row) => row.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells);
  const headerIsEmpty = head.every((c) => c === '');

  let html = '<div class="table-scroll"><table class="data">';
  if (headerIsEmpty) {
    // Meta block: render as a two-column definition table, no header row.
    html += '<tbody>';
    for (const r of body) {
      html += '<tr><th scope="row" style="text-align:left;background:var(--paper-2);white-space:nowrap;width:26%">' +
        inline(r[0] || '') + '</th><td>' + inline(r.slice(1).join(' ')) + '</td></tr>';
    }
    html += '</tbody>';
  } else {
    html += '<thead><tr>' + head.map((c) => '<th scope="col">' + inline(c) + '</th>').join('') + '</tr></thead>';
    html += '<tbody>';
    for (const r of body) {
      html += '<tr>' + r.map((c, i) => {
        const numeric = /^(HK\$|USD|\d)/.test(c);
        return '<td' + (i === 0 ? ' class="country-cell"' : (numeric ? ' class="num"' : '')) + '>' + inline(c) + '</td>';
      }).join('') + '</tr>';
    }
    html += '</tbody>';
  }
  return html + '</table></div>';
}

function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    if (/^-{3,}\s*$/.test(line)) { out.push('<hr class="rule">'); i++; continue; }

    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      const id = h[2].toLowerCase().replace(/[^\w\u4e00-\u9fff\u0e00-\u0e7f\uac00-\ud7af]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
      out.push('<h' + lvl + (lvl > 1 ? ' id="' + id + '"' : '') + '>' + inline(h[2]) + '</h' + lvl + '>');
      i++; continue;
    }

    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i].trim()); i++; }
      out.push(renderTable(rows));
      continue;
    }

    if (line.startsWith('> ')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('> ')) { buf.push(lines[i].slice(2).trim()); i++; }
      out.push('<blockquote>' + inline(buf.join(' ')) + '</blockquote>');
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^[-*]\s+/, '')); i++; }
      out.push('<ul>' + items.map((t) => '<li>' + inline(t) + '</li>').join('') + '</ul>');
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s+/, '')); i++; }
      out.push('<ol>' + items.map((t) => '<li>' + inline(t) + '</li>').join('') + '</ol>');
      continue;
    }

    // paragraph — gather until a blank line or a block starter
    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() &&
      !/^(#{1,3}\s|\||>\s|[-*]\s|\d+\.\s|-{3,}\s*$)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    out.push('<p>' + inline(buf.join(' ')) + '</p>');
  }
  return out.join('\n');
}

/* ----------------------------------------------------- shared chrome ---- */
function header(currentNav) {
  const items = [
    ['about.html', 'nav.background', 'eSIM Background'],
    ['market.html', 'nav.market', 'Market Potential'],
    ['solutions.html', 'nav.solutions', 'Partner Solutions'],
    ['coverage.html', 'nav.coverage', 'Coverage &amp; Rates'],
    ['faq.html', 'nav.faq', 'FAQ'],
    ['contact.html', 'nav.contact', 'Contact']
  ];
  return `<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="../index.html">
      <img class="brand-mark" src="../assets/img/logo.svg" alt="" width="34" height="34">
      <span class="brand-text">
        <span class="brand-name" data-brand-name>Global eSIM</span>
        <span class="brand-sub">B2B Wholesale</span>
      </span>
    </a>
    <nav class="nav" id="site-nav" aria-label="Main navigation">
${items.map(([href, key, text]) => `      <a href="../${href}" data-i18n="${key}">${text}</a>`).join('\n')}
    </nav>
    <div class="header-actions">
      <div class="lang" data-lang-switcher></div>
      <a class="btn btn-primary btn-sm" href="../demo.html" data-i18n="cta.bookDemo">Book a demo</a>
      <button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-nav"><span></span></button>
    </div>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="../index.html">
          <img class="brand-mark" src="../assets/img/logo.svg" alt="" width="34" height="34">
          <span class="brand-text">
            <span class="brand-name" data-brand-name>Global eSIM</span>
            <span class="brand-sub">B2B Wholesale</span>
          </span>
        </a>
        <p class="small" data-brand-tagline style="margin-top:14px;max-width:36ch"></p>
        <div class="social mt-2" data-social></div>
      </div>
      <div>
        <h3 data-i18n="footer.quickLinks">Quick links</h3>
        <ul class="footer-list">
          <li><a href="../about.html" data-i18n="nav.background">eSIM Background</a></li>
          <li><a href="../market.html" data-i18n="nav.market">Market Potential</a></li>
          <li><a href="../solutions.html" data-i18n="nav.solutions">Partner Solutions</a></li>
          <li><a href="../coverage.html" data-i18n="nav.coverage">Coverage &amp; Rates</a></li>
          <li><a href="../faq.html" data-i18n="nav.faq">FAQ</a></li>
          <li><a href="../order.html" data-i18n="nav.order">Place an Order</a></li>
        </ul>
      </div>
      <div>
        <h3 data-i18n="footer.getInTouch">Get in touch</h3>
        <ul class="footer-list">
          <li><a data-contact="email" href="#">commercialisation.ai@gmail.com</a></li>
          <li>WhatsApp: <a data-contact="whatsapp" href="#">+852 9739 8018</a></li>
          <li>WeChat: <strong data-contact="wechat">ZhuangChengHK</strong></li>
          <li><span data-i18n="footer.hours">Business hours</span>: <span data-contact="hours"></span></li>
        </ul>
      </div>
      <div>
        <h3 data-i18n="footer.legal">Legal</h3>
        <ul class="footer-list">
          <li><a href="../privacy.html" data-i18n="footer.privacy">Privacy policy</a></li>
          <li><a href="../terms.html" data-i18n="footer.terms">Terms of use</a></li>
          <li><a href="../demo.html" data-i18n="cta.bookDemo">Book a demo</a></li>
          <li><a href="../contact.html" data-i18n="nav.contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> <span data-brand-name>Global eSIM</span>. <span data-i18n="footer.rights">All rights reserved.</span></span>
    </div>
    <p class="footer-disclaimer" data-i18n="footer.disclaimer">Rates and commercial terms shown on this site are indicative and subject to confirmation in a signed partner agreement.</p>
  </div>
</footer>`;
}

function scripts() {
  return `<script src="../assets/js/config.js"></script>
<script src="../assets/js/i18n.en.js"></script>
<script src="../assets/js/i18n.zh-TW.js"></script>
<script src="../assets/js/i18n.zh-CN.js"></script>
<script src="../assets/js/i18n.ja.js"></script>
<script src="../assets/js/i18n.ko.js"></script>
<script src="../assets/js/i18n.fr.js"></script>
<script src="../assets/js/i18n.es.js"></script>
<script src="../assets/js/main.js"></script>`;
}

const LANG_BAR_CSS = `<style>
/* Proposal-only styling. Kept local to the generated documents so the main
   site stylesheet stays untouched. */
.lang-bar{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 26px;padding:14px;background:var(--paper-2);border:1px solid var(--line);border-radius:var(--radius)}
.lang-bar a{display:inline-block;padding:6px 13px;border-radius:100px;font-size:.85rem;background:var(--paper);border:1px solid var(--line);color:var(--ink-3);text-decoration:none}
.lang-bar a:hover{border-color:var(--slate-2);text-decoration:none}
.lang-bar a[aria-current="true"]{background:var(--ink);color:#fff;border-color:var(--ink);font-weight:600}
.proposal-toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:22px}
.proposal-doc{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);padding:clamp(24px,4vw,52px);box-shadow:var(--shadow)}
.proposal-doc h1{font-size:clamp(1.5rem,1.2rem+1.3vw,2.15rem);margin-bottom:.6em}
.proposal-doc h2{margin-top:2.1em;padding-top:1.1em;border-top:1px solid var(--line);font-size:clamp(1.2rem,1.05rem+.7vw,1.55rem)}
.proposal-doc h2:first-of-type{border-top:0;padding-top:0;margin-top:1.2em}
.proposal-doc h2:first-child{border-top:0;padding-top:0;margin-top:0}
.proposal-doc h3{margin-top:1.6em;font-size:1.06rem;color:var(--ink-2)}
.proposal-doc table.data{font-size:.86rem}
.proposal-doc table.data th[scope="row"]{font-weight:640;color:var(--slate)}
.proposal-doc blockquote{background:var(--amber-soft);border-left:4px solid var(--amber);padding:16px 20px;border-radius:var(--radius-sm);font-style:normal;color:#6B5320;margin:1.5rem 0}
.proposal-doc blockquote p{margin:0}
.proposal-doc ol,.proposal-doc ul{margin-bottom:1.1em}
.proposal-doc li{margin-bottom:.55em}
.proposal-doc code{background:var(--paper-3);padding:2px 6px;border-radius:5px;border:1px solid var(--line)}
@media print{
  .lang-bar,.proposal-toolbar,.skip-link{display:none!important}
  .proposal-doc{border:0;box-shadow:none;padding:0}
  .proposal-doc h2{page-break-after:avoid}
  .proposal-doc table{page-break-inside:avoid}
  a[href^="http"]::after{content:" (" attr(href) ")";font-size:.75em;color:#666;word-break:break-all}
}
</style>`;

const TOOLBAR_LABEL = {
  en: ['Print or save as PDF', 'Download the Word-ready source', 'Book a 45-minute demo'],
  'zh-TW': ['列印或另存為 PDF', '下載可直接編輯的原始檔', '預約 45 分鐘示範'],
  'zh-CN': ['打印或另存为 PDF', '下载可直接编辑的源文件', '预约 45 分钟演示'],
  ja: ['印刷／PDF 保存', '編集可能な原本をダウンロード', '45分のデモを予約'],
  ko: ['인쇄 또는 PDF 저장', '편집 가능한 원본 다운로드', '45분 데모 예약'],
  th: ['พิมพ์หรือบันทึกเป็น PDF', 'ดาวน์โหลดไฟล์ต้นฉบับ', 'จองเดโม 45 นาที'],
  vi: ['In hoặc lưu thành PDF', 'Tải bản gốc để chỉnh sửa', 'Đặt lịch demo 45 phút']
};
const DEMO_BTN = {
  en: 'Book a demo', 'zh-TW': '預約示範', 'zh-CN': '预约演示', ja: 'デモを予約',
  ko: '데모 예약', th: 'จองเดโม', vi: 'Đặt lịch demo'
};
const LANG_BAR_TITLE = {
  en: 'This proposal is available in:', 'zh-TW': '本建議書提供以下語言版本：',
  'zh-CN': '本建议书提供以下语言版本：', ja: '本提案は以下の言語でご利用いただけます：',
  ko: '본 제안서는 다음 언어로 제공됩니다:', th: 'ข้อเสนอนี้มีในภาษา:',
  vi: 'Đề xuất này có sẵn bằng các ngôn ngữ:'
};

/* ------------------------------------------------------------- build ---- */
let built = 0;
for (const L of LANGS) {
  const src = path.join(HERE, L.file);
  if (!fs.existsSync(src)) { console.log('SKIP ' + L.file + ' (not found yet)'); continue; }
  const md = fs.readFileSync(src, 'utf8');
  const h1 = (md.match(/^#\s+(.*)$/m) || [, 'Business Proposal'])[1].trim();
  const body = mdToHtml(md);

  const bar = LANGS.map((x) => {
    const target = x.code === L.code ? '#' : 'proposal-' + x.code + '.html';
    return '<a href="' + target + '"' + (x.code === L.code ? ' aria-current="true"' : '') + '>' + x.native + '</a>';
  }).join('');
  const [printLabel, srcLabel, demoLabel] = TOOLBAR_LABEL[L.code] || TOOLBAR_LABEL.en;

  const html = `<!DOCTYPE html>
<html lang="${L.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(h1)} — Global eSIM</title>
<meta name="description" content="${esc(h1)}. Wholesale eSIM and travel SIM supply, white-label platform and partner API. 68 countries, 94 network partners, indicative partner rates from HK$8 per GB.">
<meta name="theme-color" content="#0A1020">
<meta name="robots" content="noindex, follow">
<link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="https://www.example.com/proposals/proposal-${L.code}.html">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(h1)}">
<meta property="og:description" content="Wholesale eSIM partnership proposal and demonstration request.">
<meta property="og:image" content="../assets/img/logo.svg">
<link rel="stylesheet" href="../assets/css/style.css">
${LANG_BAR_CSS}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

${header()}

<main id="main">
  <section class="section">
    <div class="wrap">

      <div class="lang-bar" aria-label="${esc(LANG_BAR_TITLE[L.code] || LANG_BAR_TITLE.en)}">
        <span class="small muted" style="width:100%;margin-bottom:4px">${esc(LANG_BAR_TITLE[L.code] || LANG_BAR_TITLE.en)}</span>
        ${bar}
      </div>

      <div class="proposal-toolbar">
        <div class="btn-row">
          <button class="btn btn-primary" type="button" data-print>${esc(printLabel)}</button>
          <a class="btn btn-ghost" href="${L.file}" download>${esc(srcLabel)} (.md)</a>
        </div>
        <a class="btn btn-dark" href="../demo.html">${esc(demoLabel)}</a>
      </div>

      <article class="proposal-doc prose">
${body}
      </article>

      <div class="callout ok mt-4">
        <div class="callout-title"><span data-icon="check"></span> ${esc(demoLabel)}</div>
        <p class="mb-0"><a href="../demo.html">/demo.html</a> · commercialisation.ai@gmail.com · WhatsApp +852 9739 8018 · WeChat ZhuangChengHK</p>
      </div>

    </div>
  </section>
</main>

${footer()}

${scripts()}
<script>
document.querySelectorAll("[data-print]").forEach(function (b) {
  b.addEventListener("click", function () { window.print(); });
});
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(HERE, 'proposal-' + L.code + '.html'), html, 'utf8');
  console.log('built proposal-' + L.code + '.html  (' + html.length.toLocaleString('en-US') + ' bytes)  h1="' + h1.slice(0, 60) + '"');
  built++;
}

/* -------------------------------------------------------- index page ---- */
const cards = LANGS.map((L) => {
  const src = path.join(HERE, L.file);
  const title = fs.existsSync(src)
    ? (fs.readFileSync(src, 'utf8').match(/^#\s+(.*)$/m) || [, 'Business Proposal'])[1].trim()
    : 'Business Proposal';
  return `        <a class="card card-hover" href="proposal-${L.code}.html" style="text-decoration:none;color:inherit">
          <span class="badge badge-brand">${L.native}</span>
          <h3 style="margin-top:12px">${esc(title)}</h3>
          <p class="small muted mb-0">proposal-${L.code}.html · .md</p>
        </a>`;
}).join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Business Proposal — 7 Languages | Global eSIM</title>
<meta name="description" content="Wholesale eSIM partnership proposal and demonstration request, available in English, Traditional and Simplified Chinese, Japanese, Korean, Thai and Vietnamese.">
<meta name="theme-color" content="#0A1020">
<meta name="robots" content="noindex, follow">
<link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

${header()}

<main id="main">
  <section class="hero-compact">
    <div class="wrap">
      <div class="breadcrumb"><a href="../index.html">Home</a> / Business Proposal</div>
      <span class="eyebrow">Partner proposal</span>
      <h1>Business Proposal — Wholesale eSIM &amp; Travel Connectivity Partnership</h1>
      <p class="lead">The same proposal in seven languages, each with an explicit request for a 45-minute demonstration. Send the client the version they will actually read, or print any of them to PDF.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="grid grid-3">
${cards}
      </div>

      <div class="callout mt-4">
        <div class="callout-title"><span data-icon="info"></span> How to use these documents</div>
        <p>Open a language, click <strong>Print or save as PDF</strong>, and you have a client-ready proposal. Or download the <code>.md</code> source and paste it into Word or Google Docs if you need to edit it — replace <code>[Client company name]</code>, <code>[Date]</code> and <code>[GE-PROP-XXXX]</code> with the real details first.</p>
        <p class="mb-0">Every version links to <a href="../demo.html">the demo request page</a>, so the ask is always one click away.</p>
      </div>

      <div class="btn-row mt-3">
        <a class="btn btn-primary" href="../demo.html" data-i18n="cta.bookDemo">Book a demo</a>
        <a class="btn btn-ghost" href="../solutions.html" data-i18n="cta.exploreSolutions">Explore partner solutions</a>
      </div>
    </div>
  </section>
</main>

${footer()}

${scripts()}
</body>
</html>
`;
fs.writeFileSync(path.join(HERE, 'index.html'), indexHtml, 'utf8');
console.log('built proposals/index.html');

console.log('\n' + built + ' proposal document(s) generated.');
