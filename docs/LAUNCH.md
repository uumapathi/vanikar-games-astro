# Launch runbook — vanikar.games

Moving the live site from Appwrite to Azure Static Web Apps, on the restructured
`/cardgames/` URLs.

Written 2026-09-08. Every value below was read from the live systems, not assumed.

---

## 0. Read this first

Two things will bite you if you skip them.

**There is live email on this domain.** `vanikar.games` has Zoho MX records and an
SPF record. If you migrate DNS hosting (see step 2) and do not recreate them,
mail stops. There is also almost certainly a DKIM record — it could not be
verified from outside because the wildcard CNAME (below) makes every subdomain
lookup return Appwrite's records instead. **Read the zone directly in the IONOS
control panel and write down every record before changing anything.**

**There is a wildcard `*.vanikar.games → appwrite.network`.** That is why
`play.vanikar.games`, `_dnsauth.vanikar.games` and any typo resolve today. It
will keep sending stray subdomains to Appwrite after cutover unless you remove
or repoint it.

---

## 1. Decide how the apex will resolve

**This is the one genuine blocker, so settle it before launch day.**

Azure Static Web Apps has no fixed IP. A subdomain binds with a plain `CNAME`,
but an apex (`vanikar.games`, no `www`) needs an `ALIAS`/`ANAME` record — a
CNAME-like record legal at the zone root. The apex currently uses `A` + `AAAA`
records pointing at Fastly, which is how Appwrite serves it; those cannot be
reused for Azure.

Pick one:

| Option | What it means | Trade-off |
|---|---|---|
| **A. IONOS supports ALIAS/ANAME** | Point an apex ALIAS at the SWA hostname | Simplest by far. Check the IONOS DNS editor for an `ALIAS` or `ANAME` type — if the list is only A / AAAA / CNAME / MX / TXT / SRV / NS / CAA, this option is out |
| **B. Move DNS hosting to Azure DNS** | Change nameservers at IONOS; domain stays registered there | Cleanest long-term, native SWA alias support. **You must recreate MX, SPF, DKIM, the Google verification TXT and the dev CNAMEs, or mail and verification break** |
| **C. Move DNS to Cloudflare** | Free tier, CNAME flattening at apex | Same migration care as B; adds a second vendor |
| **D. Serve on `www`, forward apex** | `www` is canonical, IONOS forwards apex → www | Avoids the apex problem entirely, but `site` in `astro.config.mjs` must become `https://www.vanikar.games` and every canonical, hreflang, sitemap entry and OG URL changes. Only choose this deliberately |

**Recommendation:** check for option A first — it is one record change. If IONOS
does not offer it, take B. Under B, do the DNS migration as its own task on a
quiet day, verify mail still flows, *then* do the cutover below. Do not combine
the two.

---

## 2. Code switches

Both live in the repo. Do these first so the deployed artifact is correct.

### 2a. Store URLs

`src/data/stores.ts` currently holds placeholders and every store button shows an
alert instead of navigating:

```ts
export const STORES_LIVE = false;
export const APP_STORE_URL = 'https://apps.apple.com/app/idPLACEHOLDER';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=PLACEHOLDER';
```

Paste the real App Store and Play Store URLs and set `STORES_LIVE = true`.

`src/data/launch.ts` already has `IS_LAUNCHED = true`, so all the "available now"
wording is live. Nothing to change there.

### 2b. Drop the temporary noindex

Production is currently deployed with a forced `noindex` because it is only
reachable at its `azurestaticapps.net` hostname. **Building without the flag is
what removes it** — there is nothing to edit:

```bash
npm run build          # production, indexable  ← use this at cutover
NOINDEX=1 npm run build   # what is deployed today
```

The build log prints `[NOINDEX — forced, remove at cutover]` when the flag is on.
Check for its absence before deploying.

> A production site shipping `noindex` looks perfectly healthy and simply never
> ranks. This is the single easiest thing to get wrong here.

---

## 3. Deploy production

```bash
az account set --subscription 1c396eb7-1206-40ad-8a35-097bade203d7
npm run build
npm run faq-audit && npm run overlay-audit
export SWA_CLI_DEPLOYMENT_TOKEN=$(az staticwebapp secrets list \
  --name swa-vanikar-mkt-prod --resource-group rg-vanikar-prod \
  --query "properties.apiKey" -o tsv)
npx @azure/static-web-apps-cli deploy ./dist --env production
```

Then confirm on the Azure hostname, **before** touching DNS:

```bash
H=https://black-grass-013598300.3.azurestaticapps.net
curl -sI $H/ | grep -i x-robots        # expect NOTHING
curl -s $H/cardgames/hearts/ | grep -o 'rel="canonical" href="[^"]*"'
```

Expect no `x-robots-tag`, and a canonical of `https://vanikar.games/cardgames/hearts/`.

---

## 4. DNS changes at IONOS

Lower TTLs to 5 minutes ~24h beforehand so a mistake is cheap to undo.

### Change

| Record | From | To |
|---|---|---|
| `@` (apex) A + AAAA | Fastly `151.101.*` / `2a04:4e42:*` | **Delete**, replace per your step-1 choice |
| `@` (apex) ALIAS | — | `black-grass-013598300.3.azurestaticapps.net` |
| `www` CNAME | `appwrite.network` | `black-grass-013598300.3.azurestaticapps.net` |
| `*` wildcard CNAME | `appwrite.network` | **Delete**, or repoint — see note below |

### Keep — do not touch

- `MX` → `mx.zoho.com` (10), `mx2` (20), `mx3` (30)
- `TXT` SPF → `v=spf1 include:zohomail.com ~all`
- `TXT` DKIM → read the selector from IONOS / the Zoho admin console
- `TXT` → `google-site-verification=t8hNk8QL7P0TsWsiuzDvrXmgiUOcBDJbLn-0Cr3KcNI`
  — this is what keeps Search Console verified. Removing it un-verifies the property.
- `dev` CNAME → `proud-pebble-01df7b70f.6.azurestaticapps.net`
- `play.dev` CNAME → `ashy-field-065158f0f.3.azurestaticapps.net`

### On the wildcard

Deleting it means `play.vanikar.games` stops resolving — it currently only
resolves *because of* the wildcard. That is fine while the web app does not
exist; add an explicit `play` CNAME when it does. Leaving the wildcard in place
after Appwrite is decommissioned means stray subdomains resolve to a dead host.

---

## 5. Bind the domains in Azure

Only once DNS resolves — Azure rejects the binding otherwise.

```bash
nslookup -type=CNAME www.vanikar.games 8.8.8.8      # confirm it points at Azure

az staticwebapp hostname set --name swa-vanikar-mkt-prod \
  --resource-group rg-vanikar-prod --hostname vanikar.games
az staticwebapp hostname set --name swa-vanikar-mkt-prod \
  --resource-group rg-vanikar-prod --hostname www.vanikar.games

az staticwebapp hostname list --name swa-vanikar-mkt-prod \
  --resource-group rg-vanikar-prod --query "[].{host:name,status:status}" -o table
```

Wait for both to read `Ready`. On dev this took about four minutes through
`Validating` → `Adding` → `Ready`. Certificates are issued and renewed
automatically.

**The Free tier allows exactly two custom domains** — apex and `www` uses both.

---

## 6. Verify

```bash
for u in "" cardgames/ cardgames/hearts/ cardgames/availablegames/ \
         cardgames/pricing/ about/ privacy/ ja/cardgames/koi-koi/; do
  printf '%-34s ' "/$u"; curl -s -o /dev/null -w 'HTTP %{http_code}\n' "https://vanikar.games/$u"
done

curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' https://vanikar.games/games/hearts/
curl -s -o /dev/null -w '%{http_code}\n' https://vanikar.games/nope/
curl -sI https://vanikar.games/ | grep -i x-robots
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' http://vanikar.games/
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' https://www.vanikar.games/
```

| Check | Expected |
|---|---|
| All pages | `200` |
| `/games/hearts/` | `301` → `/cardgames/hearts/` |
| Unknown URL | `404` (a real one, not the homepage) |
| `x-robots-tag` | **absent** |
| `http://` | `301` → `https://` |
| `www` | resolves with a valid certificate |
| `/_astro/*` | `Cache-Control: immutable` |

Also send an email to yourself at the domain — confirm mail still arrives.

---

## 7. Google Search Console

The property is a **Domain property**, verified by the DNS TXT record listed in
step 4. As long as that record survives, no re-verification is needed.

1. **Sitemaps** → open `https://vanikar.games/sitemap-index.xml` → **Resubmit**.
   Submit only the index, never `sitemap-0.xml` directly.
   Discovered URLs jump from **69 to 354** — that is expected: the old build
   excluded most localized pages, and the site now carries 8 locales.
2. **URL Inspection** → *Test live URL* → **Request indexing** for:
   `/`, `/cardgames/`, `/cardgames/availablegames/`, `/cardgames/pricing/`.
   The daily quota is roughly a dozen; do the six hub pages the next day.
3. Nothing goes in **Removals**. The old URLs 301 — let them redirect.

### What to expect over 2–4 weeks

- **"Crawled – currently not indexed"** on a chunk of the `it`/`ja` pages is
  normal for fresh localized content. Give it a month before reacting.
- **Page indexing** will show the old `/games/*` URLs moving to
  *"Page with redirect"*. That is the migration working, not an error.
- **`/games/seep/`, `/privacy-policy/`, `/terms-of-service/`** will report as
  *"Alternate page with proper canonical"*. Deliberate — they are redirect stubs.
- **Enhancements → Breadcrumbs** should reach ~320 valid items.
- **FAQ rich results will not appear.** Google restricted them to government and
  health sites in 2023. The FAQPage schema is harmless but earns nothing visible.
- **Core Web Vitals** will say "not enough data" until real traffic accrues. Use
  PageSpeed Insights lab runs meanwhile.

### Bing

`public/BingSiteAuth.xml` already ships. The faster route is Bing Webmaster
Tools → **Import from Google Search Console**, which picks up the same sitemap.

---

## 8. Everything else

### CI

`.github/workflows/azure-swa.yml` currently deploys **dev only**, triggered on
`master`. Add a production job gated on `release`, using the secret
`AZURE_SWA_TOKEN_MKT_PROD` (already stored) and **no** `NOINDEX`.

### Branches

`origin/master` is still at `40fa8b8` — the pre-restructure site. `release` holds
everything. Decide whether `master` becomes the integration branch as planned, or
gets fast-forwarded to `release`. Do not leave it stale and ambiguous.

### App deep links

Once the apps are approved you will need, for Universal Links and App Links:

- `public/.well-known/apple-app-site-association` (no file extension)
- `public/.well-known/assetlinks.json`

`swa.base.json` already has the route rules to serve both as `application/json` —
just drop the files in.

### Appwrite

Keep it running for a few days as a rollback. Decommission only once Search
Console shows the new URLs indexed and traffic looks normal.

---

## 9. Rollback

Within the first hours, the fastest revert is DNS:

1. Restore the apex `A`/`AAAA` records to the Fastly addresses recorded in step 4.
2. Restore `www` and the wildcard CNAME to `appwrite.network`.
3. Leave the Azure resources alone — they cost nothing on the Free tier.

**Record the exact current values before you change them.** That is what makes
this a thirty-second rollback instead of an outage.

---

## Appendix — reference values

**Azure production**
| | |
|---|---|
| Subscription | `vanikar-games-prod` · `1c396eb7-1206-40ad-8a35-097bade203d7` |
| Resource group | `rg-vanikar-prod` (eastasia) |
| Static Web App | `swa-vanikar-mkt-prod` |
| Hostname | `black-grass-013598300.3.azurestaticapps.net` |
| CI secret | `AZURE_SWA_TOKEN_MKT_PROD` |

**Azure dev** (leave running)
| | |
|---|---|
| Subscription | `vanikar-games-dev` · `f6e667b7-2669-4a89-8999-84bfffc91457` |
| Resource group | `rg-vanikar-dev-eus2` (eastus2 — subscription policy allows no other region) |
| Marketing | `swa-vanikar-mkt-dev` → `dev.vanikar.games` |
| Web app | `swa-vanikar-play-dev` → `play.dev.vanikar.games` (placeholder) |

**Site**
| | |
|---|---|
| Pages | 358 · 8 locales (en, es, pt, fr, de, hi, it, ja) |
| Sitemap | 354 URLs |
| Legacy redirects | 58 routes: 51 generated from `scripts/legacy-urls.txt` (69 indexed URLs snapshotted at migration) + 7 hand-written in `swa.base.json` |
| SWA config | generated by `scripts/gen-swa-config.mjs`, 5.7 KB of Azure's 20 KB limit |

**Commands**
```bash
npm run build          # production (indexable)
NOINDEX=1 npm run build   # production URLs, noindex header
SITE_URL=https://dev.vanikar.games npm run build   # dev
npm run faq-audit      # FAQ content checks
npm run overlay-audit  # translation completeness, all 8 locales
node scripts/gen-og.mjs        # regenerate OG cards
node scripts/make-vanikar-mark.mjs   # regenerate the logo mark + icons
```
