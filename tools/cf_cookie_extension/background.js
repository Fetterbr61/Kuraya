// Kuraya — CF Cookie Bridge  (#1092; renamed from Media Wonder #1732)
// Reads the live cf_clearance cookie + this browser's exact User-Agent for the
// Cloudflare scraper sites and pushes them to the desktop app.

const ENDPOINTS = [
  'http://127.0.0.1:8080/api/cf-cookie',
  'http://localhost:8080/api/cf-cookie',
];  // #1753 the browser runs on the same PC as Kuraya — no LAN address

// #1620 log every step from the browser so problems can be seen in the app log
// going on... dont we have a rule you need to make logs for all functions
// so you can see it in the logs folder" — every tab-management decision in
// this file (create vs reuse a relay/display tab, the #1617 dedup-race guard
// firing, window creation, relay fetch results, errors) used to go ONLY to
// Chrome's own devtools console via log() below, invisible unless someone
// had devtools open at the exact moment. Every one of THIS session's tab
// debugging sessions was done blind from screenshots because of that. Now
// log() also forwards every line to the app's own log file (Logs/daily/...,
// tag [CfExt]) so it's greppable the same way everything else in this app
// already is.
const LOG_URLS = ENDPOINTS.map((e) => e.replace('/api/cf-cookie', '/api/cf-log'));

const HOSTS = [
  'missav.ws', 'missav.com',
  'javtrailers.com',
  'jav.guru',
  'javlibrary.com',
  'sextb.net', 'sextb.cc',
  'javpornclub.com',
  'jav-dl.com',
  'extreme-fetish.org',
  'warashi-asian-pornstars.fr',
  // #1611 the calibrate-test/tube-search scrapers hit these too (CORS errors
  // in edge://extensions when they weren't covered — see FEATURE_REGISTRY #1611).
  'javhd.com',
  'luxuretv.com',
  'spankbang.com',
  'heavy-r.com',
];

// #1092d LOGIN cookies (NOT cf_clearance): sites that gate on a login session.
// Pornolab uses a phpBB 'bb_data' cookie stored in the app's pornolabCookie
// setting — pushed here so it stays fresh automatically too.
const LOGIN_COOKIES = [
  { host: 'pornolab.net', name: 'bb_data' },
];

function log(...a) {
  try { console.log('[CFBridge]', ...a); } catch (e) {}
  // #1620 fire-and-forget — never awaited, never allowed to throw or slow
  // down the caller. Tries each endpoint in turn (same as every other relay
  // call in this file) but does not retry/queue on failure: a lost debug
  // line is fine, a blocked relay/tab operation is not.
  try {
    const msg = a.map((x) => {
      if (typeof x === 'string') return x;
      try { return JSON.stringify(x); } catch (e) { return String(x); }
    }).join(' ');
    (async () => {
      for (const url of LOG_URLS) {
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ msg }),
          });
          if (res.ok) return;
        } catch (e) { /* try next endpoint */ }
      }
    })();
  } catch (e) {}
}
function stripDot(d) { return String(d || '').replace(/^\./, '').toLowerCase(); }
function hostMatches(domain) {
  const d = stripDot(domain);
  return HOSTS.some((h) => d === h || d.endsWith('.' + h));
}
function setStatus(badge, color, title) {
  try {
    chrome.action.setBadgeBackgroundColor({ color });
    chrome.action.setBadgeText({ text: badge });
    chrome.action.setTitle({ title: 'CF Bridge: ' + title });
  } catch (e) {}
  log('STATUS:', title);
}

async function collect() {
  // #1092b — the old query was `getAll({name:'cf_clearance'})`. That returns
  // ZERO for PARTITIONED cookies (Chrome CHIPS), which is how Cloudflare now
  // stores cf_clearance on many sites — so the extension saw totalCf=0 even
  // though the cookie was right there in DevTools. Fix: query PER HOST by url
  // (apex + www), across ALL cookie stores, and explicitly ask for the
  // partitioned copy via partitionKey. Falls back to the old global query.
  const ua = navigator.userAgent;
  const entries = [];
  const seen = new Set();
  let total = 0;
  let cookieErr = null;

  let stores = [{ id: undefined }];
  try {
    const s = await chrome.cookies.getAllCookieStores();
    if (Array.isArray(s) && s.length) stores = s;
  } catch (e) {}

  async function tryGet(q) {
    try {
      const r = await chrome.cookies.getAll(q);
      return Array.isArray(r) ? r : [];
    } catch (e) {
      cookieErr = (e && e.message) || String(e);
      return [];
    }
  }
  function take(c, fallbackHost) {
    if (!c || !c.value) return;
    total++;
    const h = stripDot(c.domain) || fallbackHost;
    if (seen.has(h)) return;
    seen.add(h);
    entries.push({ host: h, cookie: 'cf_clearance=' + c.value, userAgent: ua });
  }

  for (const store of stores) {
    for (const host of HOSTS) {
      for (const u of ['https://' + host + '/', 'https://www.' + host + '/']) {
        // unpartitioned
        for (const c of await tryGet({ url: u, name: 'cf_clearance', storeId: store.id })) {
          take(c, host);
        }
        // partitioned (CHIPS): cf_clearance under the site as top-level partition
        for (const c of await tryGet({
          url: u, name: 'cf_clearance', storeId: store.id,
          partitionKey: { topLevelSite: 'https://' + host },
        })) {
          take(c, host);
        }
      }
    }
  }

  // Fallback: original global query, in case anything slipped past the above.
  if (entries.length === 0) {
    for (const c of await tryGet({ name: 'cf_clearance' })) {
      if (c && c.value && hostMatches(c.domain)) take(c, stripDot(c.domain));
    }
  }

  // #1092d harvest login cookies (e.g. pornolab bb_data) across stores.
  const logins = [];
  const loginSeen = new Set();
  for (const lc of LOGIN_COOKIES) {
    for (const store of stores) {
      for (const u of ['https://' + lc.host + '/', 'https://www.' + lc.host + '/']) {
        for (const c of await tryGet({ url: u, name: lc.name, storeId: store.id })) {
          if (!c || !c.value || loginSeen.has(lc.host)) continue;
          loginSeen.add(lc.host);
          logins.push({ host: lc.host, name: lc.name, cookie: c.value, userAgent: ua });
        }
      }
    }
  }

  return { cookieErr, entries, logins, totalCf: total, ua };
}

async function postTo(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => '');
  return { ok: res.ok, status: res.status, text };
}

async function pushAll(reason) {
  const r = await collect();
  // ALWAYS ping the app — even with zero cookies — so its log records that the
  // extension reached it and how many cf_clearance cookies it could see. This
  // is what separates "no cookie found" from "cannot reach the app".
  const payload = {
    cookies: r.entries,
    logins: r.logins || [],
    reason: reason || '',
    diag: {
      totalCfCookies: r.totalCf,
      matched: r.entries.map((e) => e.host),
      cookieError: r.cookieErr || '',
      ua: r.ua,
      version: (chrome.runtime.getManifest && chrome.runtime.getManifest().version) || '?', // #1391 so the app log proves which extension build is loaded
    },
  };
  let lastErr = null;
  let reached = false;
  for (const url of ENDPOINTS) {
    try {
      const resp = await postTo(url, payload);
      reached = true;
      if (resp.ok) {
        if (r.entries.length > 0) {
          setStatus(String(r.entries.length), '#2e7d32',
            'sent ' + r.entries.length + ' (' + r.entries.map((e) => e.host).join(', ') + ')');
        } else if (r.cookieErr) {
          setStatus('P', '#c62828', 'no cookie permission (' + r.cookieErr + ')');
        } else {
          setStatus('0', '#888888',
            'reached app OK, but no cf_clearance for the scraper sites (saw ' +
            r.totalCf + ' total). Visit missav/javlibrary.');
        }
        return;
      }
      lastErr = 'HTTP ' + resp.status;
    } catch (e) {
      lastErr = (e && e.message) || String(e);
    }
  }
  setStatus('x', '#c62828', 'CANNOT reach the app on 8080 (' + lastErr + ')');
}

chrome.runtime.onInstalled.addListener(() => pushAll('installed'));
chrome.runtime.onStartup.addListener(() => pushAll('startup'));
chrome.action.onClicked.addListener(() => pushAll('clicked'));

chrome.alarms.create('cf-push', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((a) => { if (a.name === 'cf-push') { pushAll('alarm'); sweepRelayTabs(); } }); // #1478 sweep orphan tabs each minute

let debounceTimer = null;
// #1092e Trigger an INSTANT push when a login cookie (e.g. pornolab bb_data)
// changes too — not just cf_clearance. Previously bb_data only rode the 1-min
// alarm, so a fresh pornolab login took up to a minute (or a manual icon click)
// to reach the app; now it syncs the moment you log in, exactly like javlibrary.
function isLoginCookieChange(info) {
  const d = stripDot(info.cookie.domain);
  return LOGIN_COOKIES.some((lc) =>
    info.cookie.name === lc.name && (d === lc.host || d.endsWith('.' + lc.host)));
}
chrome.cookies.onChanged.addListener((info) => {
  if (!info || !info.cookie || info.removed) return;
  const isCf    = info.cookie.name === 'cf_clearance' && hostMatches(info.cookie.domain);
  const isLogin = isLoginCookieChange(info);
  if (!isCf && !isLogin) return;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(
      () => pushAll(isLogin ? 'login-cookie-changed' : 'cookie-changed'), 1500);
});

setStatus('...', '#555555', 'starting…');
pushAll('worker-start');

// ── #1106 Browser fetch relay ───────────────────────────────────────────────
// The app can't pass Cloudflare from its own HTTP client (TLS fingerprint), and
// FlareSolverr is a single Chrome that a bulk scrape overwhelms. So the app asks
// US to fetch pages: we long-poll /api/cf-ext-jobs, fetch each URL here inside
// real Chrome (credentials:'include' => live session cookie + correct TLS, so
// Cloudflare passes), and POST the HTML back. The long-poll's in-flight request
// also keeps this MV3 service worker alive between jobs.
const JOBS_URLS   = ENDPOINTS.map((e) => e.replace('/api/cf-cookie', '/api/cf-ext-jobs'));
const RESULT_URLS = ENDPOINTS.map((e) => e.replace('/api/cf-cookie', '/api/cf-fetch-result'));

let relayRunning = false;
function relaySleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// ── #1373 Tab-relay for MissAV (partitioned cf_clearance) ────────────────────
// A background service-worker fetch() runs in the EXTENSION's cookie partition,
// so MissAV's partitioned (CHIPS) cf_clearance is never attached and Cloudflare
// serves the JS challenge every time (0/175 successes observed). Fix: fetch from
// inside a REAL missav.ws tab via chrome.scripting — that request runs in the
// site's own partition (cookie attached) and the loaded tab has already passed
// the JS challenge. The helper tab lives in a minimized background window so it
// stays out of the way.
const TAB_RELAY_HOSTS = ['missav.ws', 'missav.com', 'javlibrary.com', 'javtrailers.com', 'sextb.net', 'sextb.cc', 'jav-dl.com', 'javpornclub.com', 'extreme-fetish.org', 'warashi-asian-pornstars.fr', 'luxuretv.com', 'spankbang.com', 'heavy-r.com']; // #1390/#1414 every CF-protected scraper that Dio 403s must have a real-tab fetch fallback: CF's cf_clearance // #1611 luxuretv/spankbang/heavy-r confirmed Cloudflare-protected in tube_search_service.dart (cfSites / _fetchCloudflaredPage) — added so the calibrate test's tube-search checks get the same real-tab bypass instead of a plain (CORS-blocked, then Cloudflare-blocked) fetch.
// is partitioned (CHIPS) + TLS-bound, so replaying it over Dio 403s and the SW-fetch
// relay (extension partition) also misses it. A fetch inside a real site tab carries
// the genuine cookie/UA/TLS and passes CF — the same path that already works for MissAV.
function needsTabRelay(u) {
  try {
    const h = new URL(u).hostname.replace(/^www\./, '');
    return TAB_RELAY_HOSTS.some((x) => h === x || h.endsWith('.' + x));
  } catch (e) { return false; }
}

// #1396 mirrors these two (non-CF) scraper hosts as display-only tabs — must
// match Dart's BrowserRelayService._watchHosts exactly.
// #1613 Finn: "there should than be the same amounts of tabs as i have
// scrapers" — every OTHER scraper site was invisible (fetched directly by
// the Dart app, no browser/extension involvement at all), so only 2 of his
// ~30 scrapers ever got a tab. Every non-Cloudflare scraper host now mirrors
// into its own persistent tab too (Cloudflare ones already get a real,
// functional relay tab from TAB_RELAY_HOSTS — not repeated here).
const DISPLAY_HOSTS = ['javdatabase.com', 'jav.guru', 'javhard.net', 'eroasia.org', 'pornolab.net', 'bdsmland.org', 'scat-japan.com', 'japanfemdom.net', 'bukkake-jav.com', 'bodyfluids-jav.com', 'javgg.net', 'javhdporn.net', 'bestjavporn.com', 'javspanking.com', 'rinryu-shop.com', 'javhd.com', 'javmodel.com', 'xvideos.com', 'xhamster.com', 'xnxx.com', 'tnaflix.com', 'bdsmstreak.com'];
function isManagedHost(u) {
  try {
    const h = new URL(u).hostname.replace(/^www\./, '');
    return TAB_RELAY_HOSTS.some((x) => h === x || h.endsWith('.' + x)) ||
        DISPLAY_HOSTS.some((x) => h === x || h.endsWith('.' + x));
  } catch (e) { return false; }
}

// #1601 Finn: "max be one page pr scraper and will not try to open anew when
// already have... open the pages in the tab i created called scraper tabs" —
// he made his own Chrome tab group ("Scraper Tabs", visible on his bookmarks
// bar as a saved group) and wants scraper tabs to land there instead of in a
// separate window he can't see coming. Looked up fresh each time (cheap query)
// so it keeps working across Chrome restarts / the group moving windows.
const SCRAPER_GROUP_TITLE = 'Scraper Tabs';
async function findScraperGroup() {
  try {
    const groups = await chrome.tabGroups.query({ title: SCRAPER_GROUP_TITLE });
    if (groups && groups.length) return groups[0]; // {id, windowId, ...}
  } catch (e) {} // tabGroups permission missing, or group doesn't exist (yet)
  return null;
}

// #1612 Finn: "no i dont want this. i want all scrapers in one window same
// the example and each scraper having each own tab so i dont have 20 windows
// open." — #1610 tried giving every origin its OWN window, which is the
// opposite of what he wants. Back to ONE shared window; each origin still
// gets its OWN persistent tab inside it (relayTabs/displayTabs — unchanged
// from before #1610), so switching scrapers never touches another origin's
// tab, but Finn only ever has the one window to manage.
let relayWindowId = null;    // ONE shared window for every scraper's tab
const relayTabs = {};        // origin -> tabId
const relayTabCreating = {}; // origin -> Promise<tabId>
const displayTabs = {};      // #1396 origin -> tabId for display-only (non-CF) scraper views
const displayTabCreating = {}; // #1617 origin -> Promise<tabId>, same race guard as relayTabCreating

// #1400 MV3 service workers are EPHEMERAL — Chrome kills them after ~30s idle,
// which wiped relayWindowId/relayTabs/displayTabs and made the extension open a
// NEW tab per movie (dozens of tabs — and the load starved JavDatabase fetches
// into 10s timeouts). Persist the ids in chrome.storage.session (survives SW
// restarts, clears when the browser closes) so tabs are REUSED: one per site,
// just swapping the DVD-ID.
async function loadRelayState() {
  try {
    const s = await chrome.storage.session.get(['relayWindowId', 'relayTabs', 'displayTabs']);
    if (typeof s.relayWindowId === 'number') relayWindowId = s.relayWindowId;
    if (s.relayTabs) for (const k of Object.keys(s.relayTabs)) if (relayTabs[k] == null) relayTabs[k] = s.relayTabs[k];
    if (s.displayTabs) for (const k of Object.keys(s.displayTabs)) if (displayTabs[k] == null) displayTabs[k] = s.displayTabs[k];
  } catch (e) {}
}
async function saveRelayState() {
  try { await chrome.storage.session.set({ relayWindowId, relayTabs, displayTabs }); } catch (e) {}
}

// #1396 Show a non-CF scraper page in the relay window (display only). One tab
// per origin, navigated live to the page being scraped. Never read back.
async function openDisplayTab(url) {
  try {
    await loadRelayState(); // #1400 reuse the persisted tab across SW restarts
    const origin = new URL(url).origin;
    const { windowId: winId, groupId } = await ensureDisplayWindow(); // #1603 cosmetic only, shared window (#1612)
    let tabId = displayTabs[origin];
    if (tabId != null) {
      try { const t = await chrome.tabs.get(tabId); if (!t) { tabId = null; } }
      catch (e) { tabId = null; }
    }
    if (tabId == null) {
      // #1617 Finn's screenshot showed 5x jav.guru tabs, 2x SSIS-00, 2x
      // FNS-05, 2x "You sea..." — one tab PER URL instead of one per origin.
      // Root cause: the poll handler below fires `openDisplayTab(du)` for
      // every queued URL in a batch WITHOUT awaiting each one (see the
      // `for (const du of display) openDisplayTab(du);` loop), so when
      // several display URLs for the SAME origin land in one batch, they all
      // ran this function concurrently, all read displayTabs[origin] as null
      // (none had finished creating + saving a tab yet), and each created its
      // own tab. ensureRelayTab already had a fix for this exact race
      // (relayTabCreating) but openDisplayTab never got the same guard.
      // Fixed the same way: the first caller for an origin creates the tab,
      // every other concurrent caller for that origin waits for that same
      // creation and then just re-navigates the one resulting tab.
      if (displayTabCreating[origin]) {
        log('[openDisplayTab]', origin, '#1617 dedup-race guard hit, waiting on in-flight creation instead of making a new tab for', url);
        const existing = await displayTabCreating[origin];
        try { await chrome.tabs.update(existing, { url: url }); } catch (e) {}
        return;
      }
      displayTabCreating[origin] = (async () => {
        const tab = await chrome.tabs.create({ windowId: winId, url: url, active: false });
        displayTabs[origin] = tab.id;
        log('[openDisplayTab]', origin, 'created new display tab', tab.id, 'url', url, 'in window', winId);
        // #1601 drop it into "Scraper Tabs" when that's where winId points.
        if (groupId != null) { try { await chrome.tabs.group({ tabIds: [tab.id], groupId }); } catch (e) {} }
        await saveRelayState(); // #1400
        return tab.id;
      })();
      try { await displayTabCreating[origin]; }
      finally { delete displayTabCreating[origin]; }
    } else {
      log('[openDisplayTab]', origin, 'reusing existing display tab', tabId, 'navigating to', url);
      await chrome.tabs.update(tabId, { url: url });
    }
  } catch (e) { log('[openDisplayTab]', 'ERROR', String(e), 'url=', url); }
}

// #1478 Safety net against tab pile-up: keep the TRACKED tabs (one relay tab
// per CF origin + one display tab per origin — the intended design) and close
// every OTHER tab in the relay window. Orphans appear when the SW state is lost,
// the relay window is recreated, or a race duplicates a tab; without this they
// accumulate into "hundreds of pages". Runs on the 1-min alarm, when idle.
async function sweepRelayTabs() {
  try {
    await loadRelayState();
    // #1605 Finn: "the special scraper tab i made is gone." The #1601 sweep
    // above used to delete any tab in "Scraper Tabs" that wasn't in our
    // in-memory relayTabs/displayTabs maps, treating it as an orphan. But
    // chrome.storage.session (#1400) is explicitly cleared when Chrome closes,
    // and an MV3 service worker restarts often — either one wipes that
    // tracking, and the NEXT sweep then saw every real display tab as
    // "untracked" and deleted it. If that group had nothing else in it, Chrome
    // removes an empty group entirely — which is exactly "the tab I made is
    // gone." That risk (destroying a group Finn built by hand) is worse than
    // the thing this sweep guarded against (a stray extra tab), so: NEVER
    // touch "Scraper Tabs" here at all. The one-tab-per-origin check already
    // in openDisplayTab/ensureRelayTab (reuse before create) is what actually
    // keeps it to one page per scraper; this sweep is now only for the
    // fallback hidden window, which we fully own and nothing of Finn's can be
    // lost from.
    if (relayWindowId == null) return;
    const keep = new Set([...Object.values(relayTabs), ...Object.values(displayTabs)]);
    let win;
    try { win = await chrome.windows.get(relayWindowId, { populate: true }); }
    catch (e) { relayWindowId = null; return; }
    const tabs = (win && win.tabs) || [];
    // #1620 log every step from the browser so problems can be seen in the app log.
    // read" — a full snapshot of every tab this extension is tracking, dumped
    // every sweep (the 1-min alarm), so duplicate/404/stuck tabs show up in the
    // app's own log file instead of needing a screenshot to diagnose.
    const relaySnapshot = Object.entries(relayTabs).map(([o, id]) => `${o}=tab${id}`).join(', ') || '(none)';
    const displaySnapshot = Object.entries(displayTabs).map(([o, id]) => `${o}=tab${id}`).join(', ') || '(none)';
    log('[sweepRelayTabs]', 'relayTabs:', relaySnapshot, '| displayTabs:', displaySnapshot);
    let removed = 0;
    const removedDetail = [];
    for (const t of tabs) {
      if (keep.has(t.id)) continue;
      removedDetail.push(`tab${t.id}(${t.url || 'no-url'})`);
      try { await chrome.tabs.remove(t.id); removed++; } catch (e) {}
    }
    if (removed > 0) {
      log('[sweepRelayTabs]', 'removed', removed, 'orphan tab(s) of', tabs.length, 'in hidden relay window:', removedDetail.join(', '));
    } else {
      log('[sweepRelayTabs]', 'no orphans; hidden relay window has', tabs.length, 'tab(s), all tracked');
    }
    // Also snapshot Finn's "Scraper Tabs" group so duplicate display tabs are visible even
    // though this function never touches that group (see #1605 comment above).
    try {
      const group = await findScraperGroup();
      if (group != null) {
        const groupTabs = await chrome.tabs.query({ groupId: group.id });
        const detail = groupTabs.map((t) => `tab${t.id}(${t.url || 'no-url'})`).join(', ') || '(empty)';
        log('[sweepRelayTabs]', '"Scraper Tabs" group has', groupTabs.length, 'tab(s):', detail);
      }
    } catch (e) { log('[sweepRelayTabs]', 'group snapshot ERROR', String(e)); }
  } catch (e) { log('[sweepRelayTabs]', 'ERROR', String(e)); }
}

// #1603 Finn: "it always says javlibrary is cooldown on every single search"
// — after #1601 routed relay tabs into Finn's own "Scraper Tabs" group (his
// real, everyday browsing window), the CF-bypass relay tab for javlibrary/
// missav/etc. stopped reliably passing Cloudflare's JS challenge: #1395
// already found that a challenge only completes at full speed while its tab
// stays the ACTIVE tab of its window, and in Finn's real window that keeps
// losing "active" the moment he clicks any other tab of his — so almost
// every relay fetch timed out, which is exactly what trips the #1483
// circuit-breaker into "cooldown" after 4 failures. A DISPLAY-only mirror
// tab (javdatabase/jav.guru, never reads the page back) has no such
// requirement, so it's still safe and wanted in "Scraper Tabs". Split into
// two: relay (CF-bypass, functional) ALWAYS gets the dedicated hidden window
// it can keep active; display (cosmetic mirror) still prefers "Scraper Tabs".
async function ensureHiddenRelayWindow() {
  await loadRelayState(); // #1400 reuse the persisted relay window across SW restarts
  if (relayWindowId != null) {
    try {
      const w = await chrome.windows.get(relayWindowId);
      if (w) { log('[ensureHiddenRelayWindow]', 'reusing existing hidden relay window', relayWindowId); return { windowId: relayWindowId, groupId: null }; }
    }
    catch (e) { relayWindowId = null; }
  }
  // #1395 A MINIMIZED window throttles its tabs, so Cloudflare's JS challenge
  // never completes in the hidden relay tab (observed: 3x null/16s on SDMS-192
  // while the user's own visible tab passed fine). Create a small, UNFOCUSED,
  // NON-minimized window instead: its active tab counts as "visible" so the
  // challenge runs at full speed, but it stays in the background out of the way.
  // #1612 ONE shared window for every origin (Finn: "all scrapers in one
  // window... so i dont have 20 windows open") — each origin still gets its
  // own persistent TAB inside it (relayTabs[origin]), never a new window.
  let w;
  try {
    w = await chrome.windows.create({
      focused: false, state: 'normal', url: 'about:blank',
      width: 900, height: 600, top: 0, left: 0,
    });
  } catch (e) {
    w = await chrome.windows.create({ focused: false, url: 'about:blank' });
  }
  relayWindowId = w.id;
  await saveRelayState(); // #1400
  log('[ensureHiddenRelayWindow]', 'created new hidden relay window', relayWindowId);
  return { windowId: relayWindowId, groupId: null };
}

// #1601 Cosmetic display-mirror tabs only — prefer Finn's "Scraper Tabs"
// group; no CF challenge involved so backgrounding it is harmless.
async function ensureDisplayWindow() {
  const group = await findScraperGroup();
  if (group != null) {
    log('[ensureDisplayWindow]', 'using Finn\'s "Scraper Tabs" group', group.id, 'in window', group.windowId);
    return { windowId: group.windowId, groupId: group.id };
  }
  log('[ensureDisplayWindow]', 'no "Scraper Tabs" group found, falling back to hidden relay window');
  return ensureHiddenRelayWindow();
}

function waitTabComplete(tabId, timeoutMs) {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => { if (!done) { done = true; try { chrome.tabs.onUpdated.removeListener(listener); } catch (e) {} clearTimeout(timer); resolve(); } };
    const listener = (id, info) => { if (id === tabId && info.status === 'complete') finish(); };
    const timer = setTimeout(finish, timeoutMs);
    chrome.tabs.onUpdated.addListener(listener);
    // In case it's already complete.
    chrome.tabs.get(tabId).then((t) => { if (t && t.status === 'complete') finish(); }).catch(() => {});
  });
}

async function ensureRelayTab(origin) {
  await loadRelayState(); // #1400 reuse the persisted per-origin tab across SW restarts
  const have = relayTabs[origin];
  if (have != null) {
    try {
      const t = await chrome.tabs.get(have);
      if (t) { log('[ensureRelayTab]', origin, 'reusing existing relay tab', have, 'url', t.url); return have; }
    } catch (e) { delete relayTabs[origin]; }
  }
  if (relayTabCreating[origin]) { log('[ensureRelayTab]', origin, '#1617-style dedup-race guard hit, waiting on in-flight creation'); return relayTabCreating[origin]; }
  relayTabCreating[origin] = (async () => {
    // #1392 A DEDICATED background tab we own — NEVER the user's visible tab, so
    // navigating it can't hijack what they are viewing. Same Chrome profile, so
    // it shares the site's cookies / Cloudflare session. Lives in a minimized
    // background window it can keep ACTIVE (#1603 — must stay out of Finn's
    // "Scraper Tabs" group, which can't guarantee that and broke the CF
    // challenge for real fetches; that group is for cosmetic mirrors only).
    const { windowId: winId, groupId } = await ensureHiddenRelayWindow(); // #1612 shared window, this origin's OWN tab inside it
    const tab = await chrome.tabs.create({ windowId: winId, url: origin + '/', active: true });
    relayTabs[origin] = tab.id;
    log('[ensureRelayTab]', origin, 'created new relay tab', tab.id, 'in window', winId);
    if (groupId != null) { try { await chrome.tabs.group({ tabIds: [tab.id], groupId }); } catch (e) {} }
    await saveRelayState(); // #1400
    await waitTabComplete(tab.id, 25000); // let it load + pass the JS challenge
    log('[ensureRelayTab]', origin, 'tab', tab.id, 'finished loading (or 25s timeout hit)');
    return tab.id;
  })();
  try { return await relayTabCreating[origin]; }
  finally { delete relayTabCreating[origin]; }
}

// #1392 Find a tab the USER already has open on this host (do NOT create one, do
// NOT return our own dedicated relay tab). Used only for the fast fetch path.
async function findUserTab(origin) {
  try {
    let host = new URL(origin).hostname;
    if (host.indexOf('www.') === 0) host = host.slice(4);
    const tabs = await chrome.tabs.query({ url: ['*://' + host + '/*', '*://*.' + host + '/*'] });
    const mine = relayTabs[origin];
    const usable = (tabs || []).filter((t) => t.id !== mine);
    return usable.length ? usable[0].id : null;
  } catch (e) { return null; }
}

function looksLikeChallengeHtml(title, html) {
  const s = ((title || '') + ' ' + (html || '')).toLowerCase();
  return s.indexOf('just a moment') !== -1 ||
         s.indexOf('verify you are human') !== -1 ||
         s.indexOf('performing security verification') !== -1 ||
         s.indexOf('checking your browser') !== -1 ||
         s.indexOf('cf-browser-verification') !== -1 ||
         s.indexOf('challenge-platform') !== -1;
}

async function readRenderedHtml(tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => ({
        title: document.title || '',
        html: document.documentElement ? document.documentElement.outerHTML : '',
      }),
    });
    const r = results && results[0] && results[0].result;
    return r || { title: '', html: '' };
  } catch (e) { return { title: '', html: '' }; }
}

// #1392 Navigate our dedicated tab to the exact URL and read the rendered HTML
// once Cloudflare has cleared. A top-level navigation RUNS the JS challenge
// (a fetch does not), so this works with NO user tab open.
async function navReadLoop(tabId, url) {
  // #1435 the CF page loads fast (waitTabComplete returns), then its JS challenge
  // runs and redirects — THAT is the slow part. JavLibrary often needs >15s, so
  // the old 15s budget gave up early (returned empty while Dart still waited).
  // 12s to load + 28s to clear = 40s worst case, under Dart's 45s relay budget.
  await waitTabComplete(tabId, 12000);
  const deadline = Date.now() + 28000;
  let last = { title: '', html: '' };
  while (Date.now() < deadline) {
    last = await readRenderedHtml(tabId);
    if (last.html && last.html.length > 800 && !looksLikeChallengeHtml(last.title, last.html)) {
      return { status: 200, html: last.html };
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return { status: 0, html: (last && last.html) || '' };
}

// #1393 Serialize relay work PER ORIGIN. A bulk scrape enqueues dozens of jobs
// for the same site at once; the navigate-and-read path drives ONE hidden tab,
// so overlapping navigations clobber each other AND Cloudflare rate-limits the
// burst into a challenge (observed: 0/1170). This mutex runs them one at a time
// per origin — each page loads cleanly, spaced by its own load time.
const originLocks = {}; // origin -> Promise (tail of the per-origin queue)
function withOriginLock(origin, fn) {
  const prev = originLocks[origin] || Promise.resolve();
  const run = prev.then(fn, fn);
  originLocks[origin] = run.then(() => {}, () => {});
  return run;
}

async function tabRelayFetch(url) {
  const origin = new URL(url).origin;
  return withOriginLock(origin, () => _tabRelayFetchImpl(url, origin));
}

async function _tabRelayFetchImpl(url, origin) {
  // FAST PATH: if the user already has this site open, fetch through their warm
  // tab (correct CHIPS partition, cookie attached) — instant, no navigation.
  const userTab = await findUserTab(origin);
  if (userTab != null) {
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: userTab },
        args: [url],
        func: async (u) => {
          try {
            const r = await fetch(u, { credentials: 'include', cache: 'no-store', redirect: 'follow' });
            return { status: r.status, html: await r.text() };
          } catch (e) { return { status: 0, html: '', err: String(e) }; }
        },
      });
      const r = results && results[0] && results[0].result;
      if (r && r.status === 200 && r.html && !looksLikeChallengeHtml('', r.html)) {
        return { status: 200, html: r.html };
      }
    } catch (e) {}
    // challenged/failed through the user tab — fall through to navigation
  }

  // TAB-FREE PATH: drive our own hidden background tab via a real navigation.
  let tabId = await ensureRelayTab(origin);
  try {
    await chrome.tabs.update(tabId, { url: url, active: true });
  } catch (e) {
    delete relayTabs[origin];
    tabId = await ensureRelayTab(origin);
    try { await chrome.tabs.update(tabId, { url: url, active: true }); }
    catch (e2) { return { status: 0, html: '' }; }
  }
  const res = await navReadLoop(tabId, url);
  // #1394 originally CLOSED the tab here on a failed relay attempt (stuck
  // challenge / hung page / redirect loop); #1615 changed that to resetting
  // it to about:blank instead. Finn: "it needs to be so i can see when a
  // scraper is failing so dont reset the page, let me see the error from the
  // scraper" — he wants the tab left EXACTLY as the failed attempt left it
  // (the stuck Cloudflare challenge, an error page, whatever it is), so he
  // can look at it and tell what went wrong himself. #1616: do nothing here
  // at all — leave the tab showing whatever it's currently showing. It's
  // still tracked in relayTabs[origin], so the NEXT real attempt reuses it
  // and navigates it fresh via chrome.tabs.update(tabId, {url: ...}) same as
  // always; nothing here needs to pre-clean it.
  return res || { status: 0, html: '' };
}

async function relayFetchAndReturn(job) {
  let status = 0;
  let html = '';
  try {
    if (needsTabRelay(job.url)) {
      // #1373 MissAV: fetch from a real in-partition tab so cf_clearance applies.
      const r = await tabRelayFetch(job.url);
      status = r.status; html = r.html || '';
      log('relay(tab) fetched', job.url, status, html.length + ' chars');
    } else {
      const r = await fetch(job.url, {
        method: 'GET',
        credentials: 'include',   // send the live cf_clearance / session cookies
        cache: 'no-store',
        redirect: 'follow',
      });
      status = r.status;
      html = await r.text();
      log('relay fetched', job.url, status, html.length + ' chars');
    }
  } catch (e) {
    log('relay fetch FAILED', job.url, (e && e.message) || e);
    status = 0; html = '';
  }
  const payload = JSON.stringify({ id: job.id, status: status, html: html });
  for (const url of RESULT_URLS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });
      if (res.ok) return;
    } catch (e) { /* try next endpoint */ }
  }
}

async function relayPollLoop() {
  if (relayRunning) return;
  relayRunning = true;
  log('relay poll loop started');
  try {
    while (true) {
      let handled = false;
      for (const url of JOBS_URLS) {
        try {
          // Client timeout must exceed the server's ~25s long-poll hold.
          const ctrl = new AbortController();
          const t = setTimeout(() => ctrl.abort(), 35000);
          const res = await fetch(url, { method: 'GET', cache: 'no-store', signal: ctrl.signal });
          clearTimeout(t);
          if (!res.ok) continue;
          const data = await res.json();
          handled = true;
          if (data && data.refresh) pushAll('scrape-refresh');
          const jobs = (data && Array.isArray(data.jobs)) ? data.jobs : [];
          for (const j of jobs) relayFetchAndReturn(j); // parallel, don't await
          // #1396 Display-only: mirror non-CF scraper pages (JavDatabase/JavGuru)
          // into the relay window as their own tab so the user can watch every
          // scraper. No result is returned — the app already has the data.
          const display = (data && Array.isArray(data.display)) ? data.display : [];
          for (const du of display) openDisplayTab(du);
          break; // this endpoint works — start the next poll immediately
        } catch (e) { /* try next endpoint */ }
      }
      if (!handled) await relaySleep(3000); // app unreachable — back off, retry
    }
  } finally {
    relayRunning = false;
  }
}

// Start the loop now and keep it alive: the 1-min alarm re-invokes it if the MV3
// worker was killed and revived (relayPollLoop is idempotent).
relayPollLoop();
chrome.alarms.onAlarm.addListener((a) => { if (a.name === 'cf-push') relayPollLoop(); });
chrome.runtime.onStartup.addListener(() => relayPollLoop());
chrome.runtime.onInstalled.addListener(() => relayPollLoop());
