# Deployment Guide — GitHub Pages + GoDaddy Domain

This guide takes the site from the folder on your computer to a live website at your own
domain, step by step. No coding is required at any point.

There are two things to set up, and **the order matters**:

1. Put the files on GitHub and switch on GitHub Pages (you get a free
   `yourname.github.io/repo-name` address).
2. Buy the domain at GoDaddy and point its DNS at GitHub Pages.

> **Do step 1 before step 2.** GitHub's own documentation warns that configuring your
> domain's DNS *before* adding the domain in GitHub could let someone else host a site on
> one of your subdomains. Adding it in GitHub first closes that gap.

---

## ⚡ Fast path — do this first

**Once you know your domain name, run one command before anything else:**

```powershell
cd "path\to\global-esim-b2b-site"
node setup-domain.mjs yourdomain.com
```

That single command does all the domain-dependent work for you:

1. Creates the `CNAME` file GitHub Pages needs
2. Sets `site.url` in `assets/js/config.js`
3. Rewrites **every** canonical URL and structured-data URL across all 19 HTML
   documents — 23 references across 21 files
4. Updates the proposal build script so future rebuilds stay correct
5. Confirms no `example.com` placeholder is left in any page
6. **Prints the exact DNS records to paste into GoDaddy**, ready to copy

It is safe to re-run, and it works from whatever state the site is in. If you type
`www.yourdomain.com`, it strips the `www.` and makes the bare domain canonical, which is the
recommended setup.

Everything below is the full explanation of the same process, plus troubleshooting. Follow it
if you want to understand each step, if something goes wrong, or if you would rather do the
edits by hand.

---

## Contents

- [Part 0 — What you need](#part-0--what-you-need)
- [Part 1 — Create the GitHub repository](#part-1--create-the-github-repository)
- [Part 2 — Upload the site](#part-2--upload-the-site)
- [Part 3 — Turn on GitHub Pages](#part-3--turn-on-github-pages)
- [Part 4 — Buy the domain at GoDaddy](#part-4--buy-the-domain-at-godaddy)
- [Part 5 — Point GoDaddy DNS at GitHub Pages](#part-5--point-godaddy-dns-at-github-pages)
- [Part 6 — Connect the domain in GitHub](#part-6--connect-the-domain-in-github)
- [Part 7 — Turn on HTTPS](#part-7--turn-on-https)
- [Part 8 — Verify it worked](#part-8--verify-it-worked)
- [Part 9 — Updating the site later](#part-9--updating-the-site-later)
- [Part 10 — Troubleshooting](#part-10--troubleshooting)
- [Part 11 — Optional extras](#part-11--optional-extras)
- [Reference — the exact DNS values](#reference--the-exact-dns-values)

---

## Part 0 — What you need

| Item | Notes |
|---|---|
| A GitHub account | Free. Sign up at <https://github.com/signup>. Use an email you check — GitHub sends security alerts there. |
| A GoDaddy account | With the domain already purchased, or purchase it during Part 4. |
| This folder | The `global-esim-b2b-site` folder containing `index.html`, `assets/`, and the other pages. |
| About 60 minutes | Most of it is waiting for DNS to propagate. The clicking takes 15 minutes. |

**What it costs.** GitHub Pages hosting is free for public repositories, including custom
domains and HTTPS. A `.com` domain at GoDaddy is typically USD 10–25 for the first year and
renews higher — check the renewal price before you buy, not just the promotional price.

---

## Part 1 — Create the GitHub repository

1. Sign in to GitHub and click the **+** in the top-right corner, then **New repository**.
2. Fill it in:
   - **Repository name:** `global-esim` (or anything you like — it appears in the free
     `github.io` address but not in your own domain).
   - **Description:** optional, e.g. `B2B wholesale eSIM website`.
   - **Visibility:** **Public**.
     GitHub Pages on a free account requires a public repository. If you need the source
     private, you must upgrade to GitHub Pro — but note that a website is public anyway,
     so a public repo leaks nothing that the site does not already show. Do read the
     pre-publication checklist in `README.md` first though.
   - Leave **Add a README file**, **.gitignore** and **license** unticked — this project
     already includes a README.
3. Click **Create repository**.

---

## Part 2 — Upload the site

### Option A — drag and drop in the browser (easiest)

1. On your new repository page, click **uploading an existing file** (or **Add file →
   Upload files**).
2. Open the `global-esim-b2b-site` folder on your computer. Select **everything inside
   it** — all the `.html` files, and the `assets` folder — and drag it into the browser
   upload area.
   - ⚠️ Do **not** drag the folder itself. Drag its *contents*, so that `index.html` sits
     at the top level of the repository. If you end up with a folder inside, GitHub Pages
     will not find your home page.
3. Wait for all files to be listed (there are around 30), then in **Commit changes** type
   `Initial site upload` and click **Commit changes**.
4. Confirm `index.html` appears in the file list at the top level. If it does not, delete
   the upload and try again, dragging the contents rather than the folder.

### Option B — GitHub Desktop (better for ongoing edits)

1. Install [GitHub Desktop](https://desktop.github.com/) and sign in.
2. **File → Clone repository →** pick the repository you just made, choose a local path,
   and clone.
3. Copy the contents of `global-esim-b2b-site` into the cloned folder (replacing the
   README if prompted — or merge them).
4. In GitHub Desktop, type a summary like `Initial site upload`, click **Commit to main**,
   then **Push origin**.

### Option C — command line

```bash
cd "path/to/global-esim-b2b-site"
git init
git add .
git commit -m "Initial site upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/global-esim.git
git push -u origin main
```

> **Windows note:** if `git` is not recognised, install
> [Git for Windows](https://git-scm.com/download/win) and reopen your terminal.

---

## Part 3 — Turn on GitHub Pages

1. In your repository, click **Settings** (top menu bar).
2. In the left sidebar, under *Code, planning, and automation*, click **Pages**.
3. Under **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` and folder `/ (root)`
   - Click **Save**.
4. Wait 1–3 minutes, then reload the page. GitHub shows a banner:
   *"Your site is live at `https://YOUR-USERNAME.github.io/global-esim/`"*.
5. **Open that URL now and check the site works** before touching the domain. Fixing
   problems is far easier at this stage.

> The `.nojekyll` file included in this project tells GitHub not to run Jekyll over the
> site. Leave it in place — it prevents GitHub from ignoring files whose names start with
> an underscore and speeds up publishing.

---

## Part 4 — Buy the domain at GoDaddy

1. Go to <https://www.godaddy.com> and search for the domain you want.
2. Add it to the cart. **Before paying, check two things:**
   - **The renewal price**, not just the first-year price. GoDaddy's introductory rates
     often roughly double on renewal.
   - **Whether "Domain Privacy" is included or an extra charge.** It is worth having, so
     your name, address and phone number are not published in the public WHOIS database.
3. GoDaddy will push hard for add-ons during checkout — hosting, Microsoft 365 email,
   SSL certificates, website builder. **You do not need any of them.** GitHub Pages
   provides hosting and the HTTPS certificate for free.
4. Complete the purchase. The domain appears under **My Products** within a few minutes.

> **Decline "Website Builder" and "Managed WordPress" especially.** If GoDaddy sets up a
> hosting product on the domain, it will add its own DNS records and you will have to
> delete them in Part 5.

---

## Part 5 — Point GoDaddy DNS at GitHub Pages

This is the part people get wrong, so follow it exactly.

### 5.1 Open the DNS editor

1. Sign in to GoDaddy and go to **My Products**.
2. Find your domain, click **DNS** (sometimes shown as **Manage DNS**).
3. You will see a table of records: `A`, `CNAME`, `MX`, `TXT`, and so on.

### 5.2 Delete the records that will get in the way

GoDaddy pre-creates a **parked page** on new domains. Delete these:

| Type | Name | Value | Action |
|---|---|---|---|
| `A` | `@` | An IP pointing to GoDaddy parking (e.g. `Parked` / `WebsiteBuilder`) | **Delete** |
| `CNAME` | `www` | `@` or `parkingpage` or similar | **Delete** |

Keep any `MX` records if you have set up email on the domain. If there are none, no
problem.

> **Do not use a wildcard record** such as `*` → anything. GitHub explicitly warns that
> wildcard DNS records create a domain-takeover risk.

### 5.3 Add the four A records for the bare domain

Go to **Add New Record** (or **Add**) and create these four, one at a time:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `185.199.108.153` | 1 hour (or default) |
| `A` | `@` | `185.199.109.153` | 1 hour (or default) |
| `A` | `@` | `185.199.110.153` | 1 hour (or default) |
| `A` | `@` | `185.199.111.153` | 1 hour (or default) |

`@` means "the domain itself", i.e. `yourdomain.com`. In GoDaddy you can also leave the
**Name** field blank, or type `@` — both mean the same thing.

### 5.4 Add the four AAAA records (IPv6)

Optional but recommended, and GitHub supports them:

| Type | Name | Value |
|---|---|---|
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |

If GoDaddy's interface does not offer `AAAA`, skip it — the `A` records alone are enough.

### 5.5 Add the CNAME for `www`

| Type | Name | Value | TTL |
|---|---|---|---|
| `CNAME` | `www` | `YOUR-USERNAME.github.io` | 1 hour |

Three things to get right here:

- Replace `YOUR-USERNAME` with your **GitHub username**, exactly as it appears in your
  GitHub URL.
- **Do not** include the repository name. It must be `yourname.github.io`, **not**
  `yourname.github.io/global-esim`.
- **Do not** add a trailing dot or `https://`. Just `yourname.github.io`.
- If GoDaddy appends your domain automatically (some interfaces show it as
  `www.yourdomain.com`), that is normal and correct.

### 5.6 Save

Click **Save** on each record. GoDaddy usually confirms with a toast notification. DNS
changes typically take **10 minutes to a few hours**, and GitHub allows up to 24 hours.

---

## Part 6 — Connect the domain in GitHub

1. Back in your repository: **Settings → Pages**.
2. Under **Custom domain**, type your domain **without** `https://` and without a trailing
   slash:
   - `yourdomain.com`
3. Click **Save**. GitHub runs a DNS check:
   - ✅ **"DNS check successful"** — continue to Part 7.
   - ❌ **"DNS check unsuccessful"** — normal if DNS has not propagated yet. Wait 30–60
     minutes and click Save again. If it still fails after 24 hours, see
     [Part 10](#part-10--troubleshooting).
4. Saving creates a file called `CNAME` in your repository containing your domain name.
   **Leave that file alone** — GitHub manages it, and deleting it disconnects your domain.

> **Which version should be canonical, `yourdomain.com` or `www.yourdomain.com`?**
> Whichever you enter above becomes the canonical address, and GitHub automatically
> redirects the other one to it. GitHub recommends setting up the `www` subdomain
> alongside the apex domain, which is what Part 5.5 does — so both work, and one redirects
> to the other. For a B2B site, making the bare `yourdomain.com` canonical is the usual
> choice, which is what step 2 above does.

---

## Part 7 — Turn on HTTPS

HTTPS gives your visitors an encrypted connection and a padlock in the browser. For a site
that collects business enquiries, this is not optional.

1. Still in **Settings → Pages**, wait until the **Enforce HTTPS** checkbox becomes
   available (it can take up to 24 hours after the domain check succeeds, while GitHub
   issues the certificate).
2. Tick **Enforce HTTPS**.
3. Once enabled, `http://yourdomain.com` automatically redirects to
   `https://yourdomain.com`.

> If **Enforce HTTPS** is greyed out with the message *"Not yet available for your site
> because the custom domain has not been provisioned"*, this is expected — just wait and
> check again later. Do not remove and re-add the domain; that restarts the clock.

---

## Part 8 — Verify it worked

### Check in a browser

Open these four in a normal (non-incognito) window:

| URL | Expected |
|---|---|
| `https://yourdomain.com` | The site loads, padlock shown |
| `https://www.yourdomain.com` | Redirects to `https://yourdomain.com` |
| `http://yourdomain.com` | Redirects to `https://yourdomain.com` |
| `https://YOUR-USERNAME.github.io/global-esim/` | Redirects to `https://yourdomain.com` |

### Check the DNS from your own machine (Windows)

Open PowerShell and run, replacing the domain:

```powershell
Resolve-DnsName yourdomain.com -Type A
Resolve-DnsName www.yourdomain.com -Type CNAME
```

The `A` query should return the four GitHub addresses:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

The `CNAME` query should resolve `www.yourdomain.com` to `YOUR-USERNAME.github.io`.

> `dig` is the command most guides show, but it does not ship with Windows. GitHub's own
> documentation recommends `Resolve-DnsName` on Windows instead.

### Check the site itself

Click through every page, including one you have not opened before:

- Home, eSIM Background, Market Potential, Partner Solutions, Coverage & Rates, FAQ,
  Place an Order, Enquiry, Contact, Privacy, Terms.
- On the **FAQ page**, switch the language using the buttons near the top. The questions
  should change language. Then reload the page — your choice should be remembered.
- On the **Order page**, select a couple of destinations and confirm the summary updates,
  then click **Generate my order summary**.
- On the **Enquiry page**, submit the form with your own details and confirm you receive
  it (see the form-endpoint note in `README.md`).

---

## Part 9 — Updating the site later

### The easy way — edit in the browser

1. Open the repository and click the file you want to change (e.g. `assets/js/config.js`).
2. Click the **pencil** icon.
3. Make your edit, then scroll down and click **Commit changes**.
4. GitHub Pages rebuilds automatically. Changes appear in **1–3 minutes**; if you do not
   see them, force-refresh with **Ctrl+F5** (the browser caches aggressively).

### Changing your contact details, social links or form endpoint

**Every** phone number, email address, WeChat ID, social profile and form setting lives in
one file: **`assets/js/config.js`**. Edit that file and every page updates at once. You
never need to touch the HTML.

### The local-preview way

Browser editing is fine for text changes, but you should preview bigger changes before
publishing. Because the site is plain HTML with no build step, just double-click
`index.html` — it opens in your browser and everything works.

> One caveat: some browsers restrict JavaScript features on `file://` URLs. If the order
> builder or language switcher misbehaves locally, serve the folder properly instead:
>
> ```powershell
> cd "path\to\global-esim-b2b-site"
> npx serve .
> ```
>
> Then open the `http://localhost:3000` address it prints.

---

## Part 10 — Troubleshooting

### "DNS check unsuccessful" in GitHub after 24 hours

Check, in this order:

1. **Is `index.html` at the top level of the repository?** Not inside a subfolder. This is
   the single most common mistake.
2. **Are all four `A` records present** with exactly the addresses in
   [Part 5.3](#53-add-the-four-a-records-for-the-bare-domain)? One typo breaks it.
3. **Did you delete GoDaddy's parked-page records?** A leftover parking `A` record will
   fight the GitHub ones.
4. **Is the `CNAME` record pointing to `yourname.github.io`** and *not*
   `yourname.github.io/global-esim`?
5. **Have you actually waited?** Some registrars and ISPs cache DNS for the full 24 hours.
6. Run `Resolve-DnsName yourdomain.com -Type A` in PowerShell and compare with the
   expected four addresses. If you see GoDaddy parking IPs, the old record is still live.

### The site loads at `github.io` but not at my domain

The repository is fine; the DNS is not. Work through Part 10, items 2–6.

### "There isn't a GitHub Pages site here" (404)

Usually means the publishing branch is wrong. Go to **Settings → Pages** and confirm
**Source** is `Deploy from a branch`, **Branch** is `main`, **Folder** is `/ (root)`, and
that it has been saved. Also confirm the repository is **public**.

### The site appears unstyled — plain text, no colours

The CSS is not loading. Almost always a path problem: the `assets` folder must sit next to
`index.html` at the top level, and the file must be named exactly `assets` (lowercase). Open
the browser console with **F12** — a red 404 for `assets/css/style.css` confirms it.

### "Enforce HTTPS" is greyed out

Wait. GitHub must issue a Let's Encrypt certificate, which can take up to 24 hours after
the DNS check succeeds. Do not remove the custom domain to "reset" it.

### "Certificate does not match" or a warning page

Usually caused by pointing the `CNAME` at your apex domain instead of
`yourname.github.io`. GitHub warns specifically that pointing a custom subdomain at your
apex domain causes HTTPS failures. Fix the `CNAME` value.

### The language switcher does not stick between pages

It remembers your choice in `localStorage` and also writes `?lang=xx` into the URL. If you
are testing in a private/incognito window, storage is cleared when the window closes —
that is expected. Also confirm you are serving the site over `http://` or `https://`
rather than opening it as a `file://` path.

### I changed something but the live site looks the same

GitHub Pages takes 1–3 minutes, and your browser caches hard. Force-refresh with
**Ctrl+F5**, and check **Settings → Pages** for the latest deployment status and timestamp.

### GoDaddy says the domain is "in use" or shows a parked page

You still have a GoDaddy product (Website Builder, Managed WordPress, or forwarding)
attached to the domain. Go to **My Products**, find the domain, and remove any hosting or
forwarding product. Then recheck the DNS records.

### GoDaddy "Domain Forwarding" is interfering

If you previously set up forwarding from `yourdomain.com` to somewhere else, it creates its
own `A` record. Delete the forwarding rule — GitHub Pages handles all redirects itself
between the apex and `www`.

---

## Part 11 — Optional extras

### A professional email address on your own domain

Right now enquiries go to a Gmail address. A `sales@yourdomain.com` address looks
considerably more credible on a B2B site, and you do not need to move off Gmail to get one.

- **Cheapest:** GoDaddy's own email forwarding (often free with a domain) forwards
  `sales@yourdomain.com` to your existing Gmail inbox. You can send *from* the Gmail
  address using Gmail's "Send mail as" setting — Google's help page "Send emails from a
  different address" walks through it. Note that sending via Gmail's servers can land in
  spam unless you also configure SPF, DKIM and DMARC, and GoDaddy's forwarding alone does
  not do that.
- **Cleaner:** a mailbox provider such as Zoho Mail (free tier for one domain),
  Fastmail, or Google Workspace. These handle SPF, DKIM and DMARC properly and your mail
  will be far more likely to arrive.

⚠️ **Do not create a `CNAME` or `A` record for `mail.yourdomain.com`** unless a provider
tells you to. If you add email, you will also add `MX` and `TXT` records — these coexist
happily with the GitHub Pages `A` and `CNAME` records.

### Automated deployment with GitHub Actions

This project includes `.github/workflows/pages.yml`, but it is **manual-only and off by
default** — it does not run on every push, and you do not need it. The branch-based
deployment from Part 3 publishes automatically within 1–3 minutes of every commit and
never fails, so for a static site with no build step it is strictly the better option.

Only switch to it if you later want to bolt on link checking or HTML validation. To do so:
set **Settings → Pages → Source** to **GitHub Actions**, then run the workflow from the
**Actions** tab. Note that a workflow-based deployment ignores any `CNAME` file, so your
custom domain must be set under **Settings → Pages** rather than in that file.

### Putting Cloudflare in front of GitHub Pages

If you want faster global delivery, basic analytics, or a Web Application Firewall, you
can move the domain's nameservers to Cloudflare (free tier). In that case the DNS records
in Part 5 go into Cloudflare instead of GoDaddy, and you should:

1. Set the `A` and `CNAME` records to **DNS only** (grey cloud) *while* GitHub validates
   the domain, otherwise validation can fail.
2. Set the SSL/TLS mode to **Full**, never **Flexible** — Flexible causes redirect loops
   with GitHub Pages.
3. Turn the proxy on (orange cloud) only after GitHub reports "DNS check successful" and
   HTTPS is enforced.

This adds moving parts. If you do not specifically need it, skip it.

### Enabling a contact form that sends real email

See the **Form endpoint** section of `README.md`. In short: create a free endpoint at
Formspree or Web3Forms, paste the URL into `formEndpoint` in `assets/js/config.js`, and
both the enquiry and order forms will email you automatically. Until you do that, the forms
fall back to WhatsApp and email links — so no enquiry is ever lost.

---

## Reference — the exact DNS values

Copy from this table only. These are GitHub's published values.

| Type | Name (GoDaddy) | Value | Purpose |
|---|---|---|---|
| `A` | `@` | `185.199.108.153` | Apex domain |
| `A` | `@` | `185.199.109.153` | Apex domain |
| `A` | `@` | `185.199.110.153` | Apex domain |
| `A` | `@` | `185.199.111.153` | Apex domain |
| `AAAA` | `@` | `2606:50c0:8000::153` | Apex, IPv6 (optional) |
| `AAAA` | `@` | `2606:50c0:8001::153` | Apex, IPv6 (optional) |
| `AAAA` | `@` | `2606:50c0:8002::153` | Apex, IPv6 (optional) |
| `AAAA` | `@` | `2606:50c0:8003::153` | Apex, IPv6 (optional) |
| `CNAME` | `www` | `YOUR-USERNAME.github.io` | `www` subdomain |

**Delete:** any pre-existing `A` record on `@` pointing at GoDaddy parking, and any
`CNAME` on `www` pointing at `@` or a parking page.

**Never create:** a wildcard `*` record.

---

## Sources

- GitHub Docs — [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- GitHub Docs — [Troubleshooting custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)
- GitHub Docs — [Securing your GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- GitHub Docs — [Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
