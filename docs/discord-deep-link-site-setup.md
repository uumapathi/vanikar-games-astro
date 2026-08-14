# vanikar.games — site changes for app deep links

**Context (this doc is self-contained — no prior session needed).**

The Card Games mobile app is adding "Join using Discord". A friend's Discord invite will carry
a table code as a normal link:

```
https://vanikar.games/join?code=889011F7
```

Tapping it should open the **app** straight into the join flow. That requires Android **App
Links** and iOS **Universal Links**, both of which work by the OS fetching a proof file from
*this site* that says "the app with this signing key may claim my links".

So the site has three jobs:

| # | Job | File |
| --- | --- | --- |
| 1 | Prove the Android app may claim our links | `public/.well-known/assetlinks.json` |
| 2 | Prove the iOS app may claim our links | `public/.well-known/apple-app-site-association` |
| 3 | Landing page for people without the app | `src/pages/join.astro` |

Astro copies `public/` verbatim into `dist/`, so files 1 and 2 need no build wiring — but they
**do** need serving-layer fixes (see the two gotchas below, which are the whole difficulty here).

App identifiers:

- Android package: `com.vanikar.cardgames`
- iOS bundle: `com.vanikar.cardgames`

---

## ✅ Live-host findings (verified against production)

The live host turned out to be **Appwrite Sites** (`swoole-http-server`, `X-Appwrite-Deployment-Id`
headers) — *neither* IIS nor Azure SWA, so the two config fixes below are dormant until the host
changes. Deploy happens automatically on push to `master`. Verified live:

- `assetlinks.json` → **200, `application/json`, 0 redirects** — Google's validator returns the
  statement, and `adb shell pm get-app-links com.vanikar.cardgames` reports **`vanikar.games:
  verified`** on a real device. Android App Links are fully working end-to-end.
- `apple-app-site-association` → 200, 0 redirects, but `application/octet-stream` (Appwrite
  ignores our header configs). Apple's CDN is lenient about this in practice; revisit if iOS
  verification fails once a real Team ID is in the file.
- **`/join` 301-redirects to `/join/` and the `Location` header DROPS the query string** — a
  browser following the bare URL loses the code. The app never sees the redirect (the OS
  intercepts the URL before any HTTP), but the browser fallback breaks. **Canonical invite URL
  is therefore `https://vanikar.games/join/?code=XXXXXXXX` (trailing slash)** — use that in the
  bot. It serves 200 directly and still matches the app's `/join` path prefix.

## ⚠️ Before you start: which host is live?

The repo contains **both** `public/web.config` (IIS) and `public/staticwebapp.config.json`
(Azure Static Web Apps). The required fix is different for each, so confirm which one actually
serves `vanikar.games` — or just apply both, they don't conflict.

---

## 1. `public/.well-known/assetlinks.json`  (Android)

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.vanikar.cardgames",
    "sha256_cert_fingerprints": [
      "PASTE_DEBUG_SHA256_HERE",
      "PASTE_RELEASE_SHA256_HERE"
    ]
  }
}]
```

Fingerprints come from the **app** side (whoever holds the keystore):

```bash
# debug
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
# release
keytool -list -v -keystore path\to\release.keystore -alias <alias>
```

> **The most common failure:** if the app uses **Google Play App Signing**, the release
> fingerprint must be the **app signing key** from Play Console → *Setup → App signing* —
> NOT the local upload key. Getting this wrong fails silently: links just open in the browser,
> with no error surfaced anywhere.

Include both debug and release so development builds verify too.

This file has a `.json` extension, so IIS serves it fine as-is.

---

## 2. `public/.well-known/apple-app-site-association`  (iOS)

**No file extension.** Not `.json`. This matters.

```json
{ "applinks": { "details": [{
    "appIDs": ["TEAMID.com.vanikar.cardgames"],
    "components": [{ "/": "/join*" }]
}]}}
```

`TEAMID` = the Apple Developer Team ID (Membership page), e.g. `A1B2C3D4E5`.

### 🚨 Gotcha A — IIS returns 404 for extensionless files

IIS will not serve a file with no extension by default, so the AASA file 404s and iOS Universal
Links silently never work. Add a catch-all MIME mapping to **`public/web.config`**, inside the
existing `<staticContent>` block:

```xml
<staticContent>
  <mimeMap fileExtension=".webp" mimeType="image/webp" />
  <mimeMap fileExtension=".avif" mimeType="image/avif" />
  <!-- Serve extensionless files (Apple requires /.well-known/apple-app-site-association
       to have no extension and be served as application/json). -->
  <mimeMap fileExtension="." mimeType="application/json" />
</staticContent>
```

The `fileExtension="."` entry is the documented way to allow extensionless static files.

### 🚨 Gotcha B — Azure SWA rewrites `.well-known` to the homepage

`public/staticwebapp.config.json` currently has:

```json
"navigationFallback": {
  "rewrite": "/index.html",
  "exclude": ["/assets/*", "/*.{js,css,ico,png,svg,webp,woff,woff2}"]
}
```

`/.well-known/*` matches **neither** exclusion, so both proof files get rewritten to the
homepage and served as HTML — verification fails. Add the exclusion:

```json
"exclude": ["/assets/*", "/.well-known/*", "/*.{js,css,ico,png,svg,webp,woff,woff2}"]
```

---

## 3. `src/pages/join.astro`  (landing page)

Build is `output: 'static'`, which is fine: the table code travels in the **query string**, not
the path, so one static page serves every code.

This page is **not** just a fallback — it is what everyone sees until App Links verify, and what
non-players see forever, since Discord invites travel to people without the app. Treat it as an
acquisition surface.

It should show:

- The table code, large and copyable (so it can be typed into the app's "Join by code")
- Install buttons → link to the existing `android.astro` / `ios.astro` pages
- A short "already have the app?" line explaining the link should have opened it

Skeleton:

```astro
---
import Layout from '../layouts/Layout.astro';  // match whatever the other pages use
---
<Layout title="Join a table — Vanikar Games">
  <main>
    <h1>You've been invited to a table</h1>
    <p>Table code</p>
    <p id="code" style="font-size:2.5rem;font-weight:700;letter-spacing:.15em">…</p>
    <p>Open Card Games, tap <strong>Join Friends and Family → Join by code</strong>,
       and enter this code.</p>
    <p><a href="/android">Get it on Android</a> · <a href="/ios">Get it on iOS</a></p>
  </main>
  <script is:inline>
    const c = new URLSearchParams(location.search).get('code');
    document.getElementById('code').textContent = c ? c.toUpperCase() : 'No code in link';
  </script>
</Layout>
```

Notes:

- `is:inline` keeps the script from being bundled/deferred, so the code renders immediately.
- Match the site's existing `Layout` / styling — the snippet above is structure only.
- Consider `<meta name="robots" content="noindex">`: these URLs are one-off invites.

---

## 4. Verify

After deploying:

```bash
curl -i https://vanikar.games/.well-known/assetlinks.json
curl -i https://vanikar.games/.well-known/apple-app-site-association
```

Each must be:

- HTTP **200**
- `Content-Type: application/json`
- **No redirects** — including no `http → https` hop and no `www → apex` hop. Both platforms
  treat *any* redirect as failure. Test the exact apex URL the app declares.

Google's validator:

```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://vanikar.games&relation=delegate_permission/common.handle_all_urls
```

Apple's CDN cache (what Apple actually fetched):

```
https://app-site-association.cdn-apple.com/a/v1/vanikar.games
```

Landing page:

```
https://vanikar.games/join?code=TEST1234
```

---

## Checklist

- [ ] Confirm live host: IIS (`web.config`) or Azure SWA (`staticwebapp.config.json`) — or both
      *(both configs fixed, so either works)*
- [x] `public/.well-known/assetlinks.json` — contains the real **debug** fingerprint
      (`95:BF:03:…:10:AF`, from `%LOCALAPPDATA%\Xamarin\Mono for Android\debug.keystore` — the
      keystore MAUI actually signs with; there is no `~/.android/debug.keystore` on this machine).
      **Add the release / Play App Signing fingerprint before a store release.**
- [x] `public/.well-known/apple-app-site-association` (no extension) — created with real Team ID `4VJD69LHBS` (was placeholder; fixed
      `TEAMID`: **replace with the real Apple Team ID** (no iOS signing was configured to read it from)
- [x] `web.config`: `<mimeMap fileExtension="." mimeType="application/json" />`
- [x] `staticwebapp.config.json`: `/.well-known/*` excluded from navigationFallback, plus a
      route forcing `Content-Type: application/json` on the AASA
- [x] `src/pages/join.astro` — code display (tap to copy), steps, install links, `noindex`,
      excluded from the sitemap via `astro.config.mjs` filter
- [x] Local `astro preview` smoke test: both files 200, `/join?code=TEST1234` renders
- [ ] **Deploy**, then re-run both `curl` checks against `https://vanikar.games` (200 /
      `application/json` / no redirects)
- [ ] Google validator returns the statement
- [ ] `/join?code=TEST1234` renders the code on the live site

---

## Needed from the app side

These are blockers for filling in the files — chase them before deploying:

1. **Android SHA-256 fingerprints** — debug and release (release = Play App Signing key if used)
2. **Apple Team ID**

The rest of the work (Android `IntentFilter`, iOS entitlement, in-app link handling) happens in
the `CardGame.Engines` repo — see `docs/discord-deep-link-setup.md` there. Site and app changes
are independent and can ship in either order: until both are done, the link simply opens the
landing page in a browser, which is a working fallback rather than a broken state.
