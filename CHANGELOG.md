# Kuraya — Changelog

Every version of Kuraya, newest first. The version number lives in three places
that must always agree (a test fails the build if they don't):
`pubspec.yaml`, `lib/app_version.dart` and the newest heading below.

Numbering: **MAJOR.MINOR.PATCH** — PATCH = fixes only, MINOR = new features,
MAJOR = a change that breaks settings or data.
**Test versions** carry `-beta.N` (0.9.0-beta.1, 0.9.0-beta.2 …); the app then
shows "(test version)". Drop the suffix for a normal release (1.0.0). Each entry lists the
FEATURE_REGISTRY numbers (#NNNN) that went into it, so every change can be
traced back to its full explanation. Release = raise the number in all three
places, write the entry, `git tag v<number>`.

The Android remote app has its own version and changelog in the Kuraya-Remote
repository.

---

## [2.0.1-beta.7] — 2026-10-06 — Actor Photos fix

### Fixed
- Media Tools → **Actor Photos** showed a grey screen on a new install (no actor photos yet) (#1789)

---

## [2.0.1-beta.6] — 2026-10-06 — move folder content

### New
- Changing a folder in Settings asks whether its **content should move along**. Same drive = instant; another drive = copy first, then Kuraya asks before removing the old copies. Nothing is ever overwritten, and you can stop it in the Task Console (#1788)

---

## [2.0.1-beta.5] — 2026-10-06 — work folders ready

### Changed
- The Subtitle queue, Hardsub extraction and Duplicates folders are created inside the Kuraya folder automatically when they are not set yet. Folders you chose yourself are never changed (#1787)

---

## [2.0.1-beta.4] — 2026-10-06 — installer folder fix

### Fixed
- Setup no longer puts Kuraya in a doubled `...\Kuraya\Kuraya` folder left over from an old version — it suggests the right folder and brings your settings along (#1786)
- Choosing your own library folder in Setup replaces Kuraya's empty starter folder, so you don't end up with two libraries (#1785)

---

## [2.0.1-beta.3] — 2026-10-06 — version in the title

### Changed
- The window title shows the version right after the name, e.g. "Kuraya 2.0.1 Beta 3" (#1784)
- New help page on the website: **what every button does** — fetterbr61.github.io/Kuraya/buttons.html (#1783)

---

## [2.0.1-beta.2] — 2026-10-06 — public version tidy-up

### Changed
- Scat Japan, JAV Porn Club, Pornolab, Rinryu and Body Fluids are gone from the public version everywhere: scraping, **Scraper Calibration** and **Settings** (#1778, #1782)
- **Local & LAN browser** works like the Android remote: only movies are shown (no torrents, subtitles or installers), plus Home, **All movies** (every movie in all subfolders) and **Not in app** (hide movies already in your library) (#1781)

---

## [2.0.1-beta.1] — 2026-10-06 — Kuraya 2.0.1 Beta

Kuraya moves to version **2.0.1 Beta** (the 0.9 betas above were the first test rounds).

### Changed
- **Tube browser** is back in every version — browse, play and keep favourites; downloading stays switched off in the public version (#1776)

---

## [0.9.0-beta.15] — 2026-10-06 — new logo position

### Changed
- The Kuraya logo: the dancer now sits lower in front of the sun (program, Setup and tray icon) (#1775)
- The logo is shown as a faint background behind the library (#1775)

---

## [0.9.0-beta.14] — 2026-10-06 — Kuraya's own player everywhere

### Fixed
- **Play** in Movie Details, the duplicate compare and the multi-file window opened Windows' default player (VLC). They now use Kuraya's own player (#1772)
- Series Browser showed a blank card for an owned movie whose cover was only on disk (#1774)

### Changed
- The "AI SUB" / "ENG SUB" badges are gone from the movie card — the T / E / D letters at the bottom already show it (#1773)

---

## [0.9.0-beta.13] — 2026-10-06 — New Releases button

### Changed
- **New Releases** has its own big button in the top toolbar (it was hidden in the View list). Press it again to go back to your library (#1769)
- The big toolbar buttons are always **centred** in the window, whatever is on the left or right (#1770)
- **Tidier filter and sort lists** (#1771):
  - **Sort** keeps only real sort orders (12 instead of 18)
  - **Content** drops options that repeat the badge letters, and gains the two "Censored: checked for uncensored?" lists (moved from Sort)
  - **Badge letters** now match the movie card: subtitles are filtered by **T** (transcript), **E** (English made by Kuraya) and **D** (downloaded English)
  - **Flags** drops a duplicate of "Minor-flagged"

### Fixed
- "Soft Eng Subs" actually listed movies with **burned-in** subtitles — the wrong-named option is gone (#1771)

---

## [0.9.0-beta.12] — 2026-10-06 — English subtitles without a key

### New
- **Free English subtitles.** Without a DeepSeek key, Kuraya now makes English straight from the movie audio with Whisper (the same as Subtitle Edit's "Translate to English"). Free and on your own PC; the English is rougher (#1767)
- **DeepSeek key box** in Setup → Tools, plus a one-time popup explaining what the key is, what it costs (about 3 US cents per movie) and how to get one. Add a key and Kuraya makes better English and upgrades the free subtitles automatically (#1766, #1767)

- **Beta testers wanted** section on the project page and in the release notes (#1768)

### Fixed
- A translation that failed no longer shows as "finished — sub ready" (#1767)

---

## [0.9.0-beta.11] — 2026-10-06 — clearer welcome screen

### Fixed
- The welcome screen now says when your folders are set but the library is still empty, and shows how many movies are **waiting in your Inbox** with a **Process Inbox** button right there (#1765)
- Step 2 (helper tools) gets its green tick once FFmpeg is installed (#1765)

---

## [0.9.0-beta.10] — 2026-10-06 — the Kuraya logo

### Changed
- The **Kuraya logo** (dancer in front of the rising sun) is now the program icon — Kuraya.exe, the installer, the taskbar, the Start menu and the system tray (#1763)

### Fixed
- Setup: choosing a folder with **Browse** installs into exactly that folder — no extra `Kuraya` subfolder added (#1764)

---

## [0.9.0-beta.9] — 2026-10-06 — a real Windows installer

### New
- **Kuraya-Setup.exe** — a normal Windows installer: Start-menu entry, optional desktop shortcut, uninstall from Windows Settings > Apps. No administrator rights needed (#1761)
- **Updating = run the newer Setup**: it finds your installation and replaces only the program files — settings, folders, cache and tools stay (#1761)
- The zip stays available as a portable alternative (#1761)

---

## [0.9.0-beta.8] — 2026-10-06 — updates keep your settings

### Changed
- The download now always unpacks into **one folder called `Kuraya`** — unzip a new version to the same place, answer **Replace**, and your settings, folders, cache and tools stay (#1760)
- If a new version is unzipped somewhere else, it **takes over the previous install's settings** on its first start — no Setup, nothing to set again (#1760)

---

## [0.9.0-beta.7] — 2026-10-06 — cleaner transcribe progress

### Fixed
- The Transcribe card in the Task Console no longer fills up with technical library warnings — it shows only the movie and its progress (#1759)

---

## [0.9.0-beta.6] — 2026-10-06 — quieter start, simpler toolbar

### Changed
- A new install starts with background tasks **Auto OFF** — nothing runs on its own until you switch Auto on in the Task Console (#1758)
- Developer tools removed from the public toolbar: Ollama vs DeepSeek comparison, Subtitle Coverage matrix, NMP standard clean-up, Genre/Tag web search (#1758)

---

## [0.9.0-beta.5] — 2026-10-06 — cleaner cards and sort panel

### Changed
- **One status row on the movie card**: `V F P N │ B T E D` at the bottom — Video, Fanart, Poster, NMP │ Burned-in, Transcript, English made by Kuraya, Downloaded English. The separate S/E/D boxes at the top are gone; hover a letter to see the files behind it (#1756)
- **Sort panel in the scraping window tidied**: "type path" and "re-read" are small icons with tooltips, "confirm" (apply to the whole series) only shows when the movie has a series, and the four 🔗 g1–g4 chips are one compact chip (#1757)
- The **auto-sort** switch moved from the scraping window to **Settings > Scraping** — it was a global setting, not about the movie on screen (#1757)

---

## [0.9.0-beta.4] — 2026-10-06 — loading screen, Setup and a welcome guide

### Fixed
- The **Setup window now opens by itself** on a new install — it never did, because it was only triggered when movies were already in the database (#1750)
- No more PowerShell / console windows popping up — Kuraya now has one hidden console that all its helper programs share (#1752)
- The close dialog was in Danish — now English ("Quit? Do you want to close Kuraya?") (#1751)
- The Task Console no longer pops up on its own when Auto is switched OFF — open it from the toolbar when you want it (#1750)
- The window no longer stays white while Kuraya starts: a loading screen with a spinner shows what is happening (#1749)
- The first start of a new install is much faster — the scraper health check (which test-scrapes several sites, about a minute) now runs in the background (#1749)

### New
- A new install **creates its own Library, Inbox and Pre-Inbox folders** inside the Kuraya folder, so it works at once; Setup explains you can change them any time in Settings > Paths (#1754)
- The **CF Cookie Bridge** browser extension (Edge/Chrome) is now in the download, in the `Browser extension` folder — it makes scraping Cloudflare-protected sites fast (#1753)
- **Welcome guide** on an empty library: the four steps to your first movies, with Open Setup and Scan library buttons (#1750)

---

## [0.9.0-beta.3] — 2026-10-06 — no more fixed drive folders

### Fixed
- Removed every remaining folder fixed to the developer's drives: sorting fallback (`K:\Sorted` → the movie's own drive), genre-sort base folders (→ your library folders), converter order, series-browser download folder (→ your Downloads, setting `downloadFolder`), folder-browser thumbnails (`C:\Temp` → `Cashe\video_thumbs`), ImageMagick (`H:\` → setting `imageMagickPath` or PATH), Desktop paths (→ your own home folder) (#1747)
- A new test fails the build if a fixed drive folder ever returns to the code (#1747)

### Changed
- Setup's tool list (full version only) also lists JDownloader 2 and uTorrent (#1747)

---

## [0.9.0-beta.2] — 2026-10-06 — fixes from the first test install

### Fixed
- A new install pointed its Pre-Inbox (and hardsub folder) at the developer's own `K:\` drive — a new install now starts with **no** folders set; they are chosen in Setup (#1746)
- Default tool and folder paths lost their backslashes (`…DesktopTools`), so tools in `Desktop\Tools` were never found and the anime-whisper check looked in the wrong place — now tested with real values (#1746)
- A new install spread its cache files (`objectbox`, `series_cache`, …) over the program folder instead of `Cashe\` (#1746)
- The program is shipped as **Kuraya.exe** (was `new_media_player.exe`) (#1745)
- Project file guard can no longer move `settings.json` or other files the app reads (#1745)
- User guide: how to update and remove (there is no uninstaller — it is portable) (#1746)

### Changed
- GitHub repository tidied (root 179 → 25 files; no library lists) and a PayPal donate button added (#1745)
- The source on GitHub now includes the build files (`CMakeLists.txt`) and app icons that the first upload missed (#1746)

---

## [0.9.0-beta.1] — 2026-10-06 — first numbered version (TEST version)

Everything built before this date (#1–#1723) is the base of this version; the
full history is in FEATURE_REGISTRY.md. Highlights of the last stretch:

### New
- **Kuraya name, slogan and branding** — "Where Your Japanese Adult Movies Lives." (#1727, #1730, #1733, #1736)
- **Public build** — download / torrent / link features hidden behind the public-build switch, with a preview button (#1726, #1728)
- **Movie Details page** (#1724)
- **R18.dev** as a metadata source and as a series source (#1725, #1731, #1734)
- **First-start Setup** — choose folders, see which helper tools are missing, download portable tools into `Kuraya\Tools`; a feature that needs a missing tool now says so (#1741)
- **Version number + changelog** (#1742)
- **User guide** — HOW_KURAYA_WORKS.txt in the download and docs/how-kuraya-works.md (#1743)

### Fixed
- g1 genre no longer takes the "receiver" word (Submissive-Woman, Amateur-Girls) as the one in control (#1738)
- JavLibrary link lookups run one at a time, 4 s apart — a burst had triggered a Cloudflare ban (#1739)
- No user-specific `C:\Users\...` paths left in the app or the scripts it runs (#1740, #1740b)
- Video Repair failed every swap with "file in use" (#1735)
- Task Console overflowed at the bottom (#1737)
- Hardsub-OCR banner showed program code (#1729)
