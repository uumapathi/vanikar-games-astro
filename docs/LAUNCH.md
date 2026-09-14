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

## 1. Move DNS hosting to Azure DNS

**Do this days before cutover, on its own. Mail is the risk, not the website.**

Azure Static Web Apps has no fixed IP. A subdomain binds with a plain `CNAME`,
but the apex (`vanikar.games`, no `www`) needs an `ALIAS`/`ANAME` — a CNAME-like
record legal at the zone root. The zone is on IONOS's *registrar* nameservers
(`ns1033.ui-dns.org`, `ns1105.ui-dns.com`, `ns1074.ui-dns.biz`,
`ns1106.ui-dns.de`), whose editor offers A / AAAA / CNAME / MX / NS / TXT / SPF
/ DMARC / SRV / CAA and **no ALIAS**. IONOS *Cloud* DNS is a different product
and would mean delegating the zone anyway.

So the apex cannot be pointed at Azure while the zone stays where it is. Move
the zone to **Azure DNS** — the domain stays registered at IONOS; only the
nameservers change.

> Cloudflare is an equal alternative (CNAME flattening, free) and is worth
> taking instead if you want its geo headers for the cookie banner. The steps
> below are the same shape either way.

### 1.1 Write the zone down first

The zone has a **wildcard `* CNAME → appwrite.network`**, and it answers for
*any* name that has no explicit record — `definitely-not-a-selector._domainkey`
resolves. That means **you cannot enumerate this zone from outside**: a DNS
lookup cannot tell a real record from the wildcard. Export it from the IONOS
panel and treat that export as the only authoritative list.

What is visible from outside today:

| Name | Type | Value |
|---|---|---|
| `@` | A | `151.101.3.52`, `151.101.67.52`, `151.101.131.52`, `151.101.195.52` (Fastly → Appwrite) |
| `@` | AAAA | `2a04:4e42:200::820`, `2a04:4e42:400::820`, `2a04:4e42:600::820` |
| `@` | MX | `mx.zoho.com` (10), `mx2.zoho.com` (20), `mx3.zoho.com` (30) |
| `@` | TXT | `v=spf1 include:zohomail.com ~all` |
| `@` | TXT | `google-site-verification=t8hNk8QL7P0TsWsiuzDvrXmgiUOcBDJbLn-0Cr3KcNI` |
| `www` | CNAME | `appwrite.network` |
| `*` | CNAME | `appwrite.network` |
| `dev` | CNAME | `proud-pebble-01df7b70f.6.azurestaticapps.net` |
| `play.dev` | CNAME | `ashy-field-065158f0f.3.azurestaticapps.net` |

**DKIM appears not to exist.** An explicit record always beats a wildcard, and
every `_domainkey` name returns the wildcard — so there is no DKIM record in
this zone. Confirm in the Zoho admin console before you assume that is fine;
if Zoho shows DKIM as configured for `vanikar.games`, find the selector there
and carry it across. Mail without DKIM still delivers, but signs nothing.

There is no `_dmarc` record either. Adding one is a good idea, but do it
*after* the move, not during.

### 1.2 Build the zone in Azure, then switch

```bash
az account set --subscription 1c396eb7-1206-40ad-8a35-097bade203d7
az network dns zone create -g rg-vanikar-prod -n vanikar.games
az network dns zone show -g rg-vanikar-prod -n vanikar.games --query nameServers -o tsv
```

Recreate **every** record from the IONOS export in the new zone *before*
touching nameservers — MX, both TXTs, `dev`, `play.dev`, the wildcard, and
anything the export turns up that is not in the table above. Leave the apex and
`www` pointing at Appwrite for now: this step changes *who answers*, not *what
they answer*.

Then, at IONOS: lower the zone TTL to 300 seconds, wait a day, and only then
change the nameservers to the four Azure returned.

### 1.3 Verify before going further

```bash
dig +short NS vanikar.games            # the four Azure nameservers
dig +short MX vanikar.games            # mx/mx2/mx3.zoho.com
dig +short TXT vanikar.games           # SPF + google-site-verification
```

Send a mail to a `@vanikar.games` address and reply from it. Confirm Search
Console still shows the property as verified. **Stop here until mail is proven
to work.** The website has not changed at this point and Appwrite is still
serving it, so there is nothing to roll back except the nameservers.

---

## 2. Code switches

Both live in the repo. Do these first so the deployed artifact is correct.

### 2a. Store URLs — done

`src/data/stores.ts` holds the live listings and `STORES_LIVE = true`, so every
store button navigates:

```ts
export const APP_STORE_URL = 'https://apps.apple.com/app/id6776043744';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.vanikar.cardgames';
```

The same file exports `WEB_APP_URL`, the browser version of the game. It is not
a placeholder: it is derived from `SITE_URL`, so the dev site links to
`play.dev.vanikar.games` and the production build links to
`play.vanikar.games`. **That host must resolve by cutover** — today it only
does so via the wildcard CNAME (step 4), which points at Appwrite. Add an
explicit `play` CNAME to the web app's Static Web App before deleting the
wildcard, or set `PUBLIC_WEB_APP_URL` at build time to point the links
elsewhere until it exists.

`src/data/launch.ts` already has `IS_LAUNCHED = true`, so all the "available now"
wording is live. Nothing to change there.

### 2b. The temporary noindex — done

**Production is indexable.** The `NOINDEX: '1'` flag is gone from the prod job
of `.github/workflows/azure-swa.yml`, and the deployed build carries no
`X-Robots-Tag`. Nothing to do here at cutover.

Verify rather than assume — one header decides whether the site can rank at all:

```bash
curl -sI https://vanikar.games/ | grep -i x-robots   # expect no output
```

> A production site shipping `noindex` looks perfectly healthy and simply never
> ranks. This is the single easiest thing to get wrong here. Do not reintroduce
> the flag; the canonical tags are what keep the `azurestaticapps.net` hostname
> from competing, and they point every page at `vanikar.games`.

### 2c. Google Analytics

The Appwrite build was made with `PUBLIC_GA_MEASUREMENT_ID=G-PR6ZTLGRF3`, so the
live site today loads GA4. The Azure builds so far were made **without** it — no
`.env` in the repo, nothing in CI — so `dev.vanikar.games` and the prod host
ship no analytics at all. Nothing breaks; the data just stops on cutover day.

```bash
PUBLIC_GA_MEASUREMENT_ID=G-PR6ZTLGRF3 npm run build
```

Check `dist/index.html` contains `googletagmanager.com/gtag/js?id=G-PR6ZTLGRF3`
before deploying. Put the variable in the GitHub Actions secrets when CI is set up.

The Privacy Policy (section 5) describes GA4 and how to opt out, so the
disclosure side is already in place.

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

## 4. Cut the domain over to Azure

By this point the zone is on Azure DNS (step 1) and mail is proven. **Azure
production already serves a byte-equivalent copy of the live Appwrite site** —
same `/games/…` URLs, same canonicals, same Google Analytics property, real
404s on unknown paths. So this cutover changes the server, not the site. The
new `/cardgames/` site is a separate, later deploy.

### 4.1 Bind `www` first

`www` is the safe rehearsal: it is a plain CNAME, and nothing canonical points
at it, so breaking it breaks nothing.

```bash
az account set --subscription 1c396eb7-1206-40ad-8a35-097bade203d7

# point www at Azure (replaces the appwrite.network CNAME)
az network dns record-set cname set-record -g rg-vanikar-prod -z vanikar.games \
  -n www --cname black-grass-013598300.3.azurestaticapps.net

az staticwebapp hostname set --name swa-vanikar-mkt-prod \
  --resource-group rg-vanikar-prod --hostname www.vanikar.games
```

Wait for `Ready` (about four minutes on dev, through `Validating` → `Adding`),
then confirm `https://www.vanikar.games/` serves and its certificate is valid.
If anything is wrong, put the CNAME back and nothing has been lost.

### 4.2 Bind the apex

An Azure DNS **alias record** points the zone root straight at the Static Web
App resource — this is the thing IONOS could not do:

```bash
SWA_ID=$(az staticwebapp show -n swa-vanikar-mkt-prod -g rg-vanikar-prod --query id -o tsv)

# remove the Fastly records that point at Appwrite
az network dns record-set a    delete -g rg-vanikar-prod -z vanikar.games -n @ -y
az network dns record-set aaaa delete -g rg-vanikar-prod -z vanikar.games -n @ -y

az network dns record-set a create -g rg-vanikar-prod -z vanikar.games \
  -n @ --target-resource "$SWA_ID" --ttl 300

az staticwebapp hostname set --name swa-vanikar-mkt-prod \
  --resource-group rg-vanikar-prod --hostname vanikar.games
```

**The Free tier allows exactly two custom domains** — apex and `www` fills it.

### 4.3 The wildcard

`* CNAME → appwrite.network` currently answers for every unlisted name,
including `play.vanikar.games`, which the site links to from the nav, hero,
download section, footer and store picker. **Add an explicit `play` CNAME
before deleting the wildcard**, or the browser version 404s from every one of
those links:

```bash
az network dns record-set cname set-record -g rg-vanikar-prod -z vanikar.games \
  -n play --cname <the play SWA hostname>
```

Delete the wildcard once Appwrite is decommissioned — left in place it points
stray subdomains at a dead host. Check the IONOS export first for anything else
that was relying on it.

### 4.4 Keep — do not touch

- `MX` → `mx.zoho.com` (10), `mx2` (20), `mx3` (30)
- `TXT` SPF → `v=spf1 include:zohomail.com ~all`
- `TXT` → `google-site-verification=t8hNk8QL7P0TsWsiuzDvrXmgiUOcBDJbLn-0Cr3KcNI`
  — this is what keeps Search Console verified. Removing it un-verifies the property.
- `dev` → `proud-pebble-01df7b70f.6.azurestaticapps.net`
- `play.dev` → `ashy-field-065158f0f.3.azurestaticapps.net`

---

## 5. Confirm the switch actually happened

The response header is the proof — Appwrite and Azure are indistinguishable by
eye, because that is the point.

```bash
curl -sI https://vanikar.games/ | grep -iE 'server|x-appwrite|x-azure'
```

`swoole-http-server` / `X-Appwrite-*` means you are still on Appwrite and DNS
has not propagated. No Appwrite headers means Azure is answering.

```bash
for u in / /games/ /games/hearts/ /pricing/ /zzz-not-real/; do
  printf '%-20s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' https://vanikar.games$u)"
done
curl -sI https://vanikar.games/ | grep -i x-robots     # expect NOTHING
```

Expect 200s and a 404 on the last one. An `x-robots-tag` here means the site
cannot rank — fix before anything else.

---

## 6. Verify — after the new site ships

*Step 5 checks the domain moved. This checks the `/cardgames/` site went live,
which is the separate, later deploy (step 3). Until then these paths 404 by
design: production is serving the old URL shape on purpose.*

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

`.github/workflows/azure-swa.yml` gives each branch one stack:

| Branch | Deploys | Secret |
|---|---|---|
| `release` | dev — `dev.vanikar.games` | `AZURE_SWA_TOKEN_MKT_DEV` |
| `master` | **production** | `AZURE_SWA_TOKEN_MKT_PROD` |

Work lands on `release`; promoting it is a pull request into `master`, and
those PRs get a preview on the dev stack. Either stack can also be run by hand
from the Actions tab (`workflow_dispatch`, pick `dev` or `prod`) — but only
once the file is on `master`, since GitHub lists workflows from the default
branch. The prod job builds indexable — the pre-cutover `NOINDEX` flag has been
removed (step 2b).

> **The master half is dormant until the file reaches master.** GitHub runs the
> workflow from the branch that was pushed, and `master` is still at `40fa8b8`
> with only a stale workflow that targets a `main` branch that does not exist.
> Merging `release` into `master` is what arms this — and that merge is the
> first thing it will deploy to production. Do not push `master` before you
> mean to publish it.

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
npm run build          # production (indexable) — what prod ships
SITE_URL=https://dev.vanikar.games npm run build   # dev (noindex, automatic)
npm run faq-audit      # FAQ content checks
npm run overlay-audit  # translation completeness, all 8 locales
node scripts/gen-og.mjs        # regenerate OG cards
node scripts/make-vanikar-mark.mjs   # regenerate the logo mark + icons
```
