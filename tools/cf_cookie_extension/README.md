# Kuraya — CF Cookie Bridge (Chrome/Edge extension)  #1092

Automatically feeds your live Cloudflare `cf_clearance` cookie (and the exact
browser User-Agent it is bound to) to the desktop app, so scrapes of the five
Cloudflare-protected sites take the fast direct path instead of FlareSolverr.

## Why an extension?

Chrome 127+ encrypts cookies on disk with **App-Bound Encryption (v20)**. Your
Chrome is v151 and uses it, so the app cannot decrypt the on-disk cookie DB with
DPAPI. A tiny extension has native, already-decrypted access via `chrome.cookies`
— it is immune to future Chrome changes and never needs Chrome closed.

## One-time install

1. Open `edge://extensions` (Edge) or `chrome://extensions` (Chrome) in the browser profile you browse the sites in.
2. Turn on **Developer mode** (top-right).
3. Click **Load unpacked** and select this folder
   (the `Browser extension` folder inside your Kuraya folder).
4. Done. The toolbar icon shows a small badge = number of cookies last pushed.

## How it works

The extension pushes `POST http://127.0.0.1:8080/api/cf-cookie` with
`{ cookies: [ { host, cookie, userAgent }, ... ] }`:

* on install / Chrome startup,
* every 5 minutes,
* the moment Chrome earns a new `cf_clearance` for one of the sites,
* and when you click the toolbar icon.

The desktop app seeds each one into `Cashe/manual_cf_clearance.json` (durable,
no expiry) and uses it on the next request to that host.

## Constraints (unavoidable — same for any Chrome-cookie method)

* **Chrome must have solved the challenge at least once.** The extension can only
  forward a cookie your browser already earned by visiting the site — it cannot
  manufacture one. If a site's cookie expires and you don't visit it, the app has
  nothing fresh to send and falls back to FlareSolverr until you visit again.
* The User-Agent is sent from the same browser, so it always matches the cookie
  (Cloudflare binds `cf_clearance` to the exact UA).

## Sites covered

missav.ws, missav.com, javtrailers.com, jav.guru, javlibrary.com, sextb.net,
sextb.cc. To add a site later, add its registrable domain to `HOSTS` in
`background.js` and add matching `host_permissions` entries in `manifest.json`.

## Verify it worked

* Extension badge shows a number (cookies pushed) in green.
* App log (`Logs/media_wonder_<date>.log`) shows: `API: cf_clearance seeded for ...`
* `GET http://127.0.0.1:8080/api/cf-cookie` lists the hosts that now have a cookie.

## v1.3.0 — Fetch relay (#1106)

The extension now also **fetches pages for the app inside your real Chrome**, not
just cookies. Cloudflare fingerprints the TLS handshake, so the app's own network
calls get 403 even with a valid cf_clearance cookie. When the app needs a
Cloudflare-protected page (JAVLibrary, MissAV, etc.) it queues a job; the extension
long-polls `/api/cf-ext-jobs`, fetches the URL here (with your live session cookie
AND the correct browser TLS), and POSTs the HTML back to `/api/cf-fetch-result`.

Also: when you start a scrape, the app asks the extension to push the freshest
cf_clearance immediately, so it's always up to date.

**After updating: reload the extension** in `chrome://extensions` (Developer mode →
reload), and keep Chrome open while scraping. If Chrome/the extension is closed, the
app falls back to FlareSolverr automatically.
