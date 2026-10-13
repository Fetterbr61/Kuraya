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

## [2.0.3-beta.4] — 2026-10-13 — the new logo, everywhere

### Changed

- New logo: the original dancer with her whole body (hair, hands, feet and the
  pole), in front of the red sun. Used for the program icon, the taskbar and
  tray icon and the About box. (#1915)
- The logo now shows faintly behind every page and every dialog, so Kuraya is
  recognisable everywhere. In the light theme the square turns white and the
  dancer black; the red sun stays. (#1915)

## [2.0.3-beta.3] — 2026-10-13 — About Kuraya

### Added

- Help → **About Kuraya**: version and date, which edition you have, the
  project page, and the list of open-source licenses Kuraya uses. (#1914)

## [2.0.3-beta.2] — 2026-10-13 — update reminder on the Help button

### Added

- When a newer version is ready, the Help button shows a green dot and its menu
  says "Install Kuraya <version>", also after you chose "Later". Choosing
  "Skip this version" removes the dot. (#1913)

### Changed

- The project page's comparison table is grouped and tidier, and no longer
  lists the Tube browser, which the public edition does not contain.

## [2.0.3-beta.1] — 2026-10-13 — safer deleting, better actors, help on every button

The public test release that collects everything from the 2.0.2 betas.

### Safer

- Right-clicking a movie that is not selected now acts on that movie only, like
  Windows Explorer (hold Ctrl to add it to a selection). A selection left over
  from an earlier job can no longer ride along into "Delete Permanently".
  After a right-click job on several movies they are deselected. (#1910)
- The delete question lists every movie, shows the count in big red letters and
  makes "Cancel - keep them" the big, pre-selected button. (#1910)

### Actors

- The scraper shows each actor as a card with ALL her photos; click one to make
  it the photo used everywhere. (#1903)
- Male actors that only some sites list (they show the whole cast) are hidden,
  with a line to bring one back with a click. The same rule is used by Metadata
  Backfill. (#1903, #1904, #1911)
- One entry per actress whatever the spelling ("Haruka Kitagawa" /
  "Kitagawa Haruka" / one word), in the scraper, Movie Details and the actor
  list. (#1902, #1908)
- Each actor card shows her bio (born, height, measurements, cup) and whether
  the name was already in the file or just came from the scrape, plus how many
  other movies of yours she is in. (#1906, #1909)
- Photos and bios of a scraped cast are fetched in the background; the actor
  list picks up new actresses and new photos by itself. (#1899, #1906, #1911)
- In a bulk scrape, names you type in stay with their own movie. (#1907)

### Everything else

- Every button, switch and menu entry explains itself when you hover it.
  (#1891-#1898)
- Less drive work at start-up. (#1901)
- The scraper's Play button and photo boxes no longer overflow. (#1904)
- The freeze detector also notices when the window stops reacting. (#1905)

### Also in this release (from the 2.0.2 betas)

- **Edit Everything…** (right-click) is the one editor for title, genres
  g1–g4, series, studio and director; changing a series asks whether to change
  only this movie or the whole series. Edit Genres g1–g4 is back in the menu.
- The right-click menu is grouped (Play, Open Folder, Movie …), every entry
  explains itself, "Flag for Review" is now called **Mismatch**, and items that
  did nothing are gone.
- Series Browser merges all sites, no "choose a source" step; the series name
  you pick in the scraper is the one saved.
- Scraper: picking the right movie from "Multiple Movies Found" works the
  first time.
- Subtitles: speech-to-text really runs again (it was skipped and "finished"
  in a second), and a site's uniform tag alone no longer blocks subtitles.
- Actor photos: no more photos of a different actress with the same first
  name; a run no longer restarts from an old resume point.
- Calmer start-up (less drive work), no more hangs while the Task Console runs
  on Auto, and no freeze when you come back to the window.
- Clicking the taskbar icon shows the running Kuraya instead of starting a
  second one; the tray icon no longer leaves a ghost after a restart.
- Recent searches: newest on top, no half-typed entries.
- Duplicates-folder movies show with their fanart; the Android remote finds the
  PC by itself (no IP address to type).
- Installing a new version removes the old program files first, and Kuraya
  finds its own scripts next to Kuraya.exe.
- The public edition contains nothing from the developer's own setup.

## [2.0.2-beta.23] — 2026-10-13 — backfill filters men, actor list gets new photos

### Fixed

- Metadata Backfill now uses the same actor rule as the scraper: one entry per
  actress whatever the spelling, and names that only MissAV/JavTrailers/
  JavLibrary list (they list men too) are left out. (#1911)
- The actor list shows new photos as soon as the background photo search
  finishes a batch, instead of a grey box until the next start. (#1911)

## [2.0.2-beta.22] — 2026-10-13 — no more deleting movies you did not mean to

### Fixed

- Right-clicking a movie that is not selected now selects ONLY that movie (hold
  Ctrl to add it to the selection instead), like Windows Explorer. Before, it
  was ADDED to whatever was still selected from an earlier job, so "Delete
  Permanently" also hit those movies. (#1910)
- After a right-click action on several movies finishes, they are deselected.
  (#1910)
- The bulk delete question lists EVERY movie (not the first 5), shows the count
  in big red letters, and "Cancel - keep them" is the big button. (#1910)

## [2.0.2-beta.21] — 2026-10-12 — room for all actors, and where each came from

### Changed

- The scraper's actor box grows with the number of actors instead of cutting
  them off at a fixed height. (#1909)
- Each actor card says whether the name was already in the movie's file or
  just came from the scrape (or was typed by you), and in how many other
  movies of your library she is. (#1909)

## [2.0.2-beta.20] — 2026-10-12 — actor photos in Movie Details

### Fixed

- Movie Details and the actor list now find an actor's photos whatever the
  spelling of the name (reversed, or written as one word), like the scraper
  already did. Kitagawa Haruka had photos in the scraper but a grey box in
  Movie Details. (#1908)

## [2.0.2-beta.19] — 2026-10-12 — actors per movie in a bulk scrape

### Fixed

- Scraping several movies at once: actor names you type in by hand now go to
  THAT movie only. Before, every movie in the batch got the typed names of the
  movie on screen when you pressed Apply. (#1907)
- Genres and actors typed on the movie on screen are no longer lost when you
  press Apply without first going to another movie. (#1907)

## [2.0.2-beta.18] — 2026-10-12 — actor bios in the scraper

### Added

- The scraper shows each actor's bio under the photos (born, height,
  measurements, cup); hover it for the whole bio. "No bio yet" when the
  background search has not found one. (#1906)

### Fixed

- A newly scraped actress now shows up in the actor list about 10 seconds
  after the scrape is applied, not only after the next start. (#1906)
- The "hidden" line names JavLibrary too. (#1906)

## [2.0.2-beta.17] — 2026-10-12 — freeze detector sees the window too

### Changed

- The freeze detector now also notices when the WINDOW stops reacting (mouse,
  keyboard, drawing) while the program itself keeps working, and writes what
  was running at that moment to `Logs\reports\freeze_watchdog.txt`. (#1905)

## [2.0.2-beta.16] — 2026-10-12 — scraper layout fixes

### Fixed

- The Play button no longer overflows: icon, PLAY VIDEO and the file name now
  sit on one line. (#1904)
- The grey "no photo" box no longer overflows; it shows a short reason and the
  full reason when you hover it. Actor photos are bigger. (#1904)
- Male actors that JavLibrary lists (it shows the whole cast, not only
  actresses) are now hidden too, and a stray "×" is removed from scraped names
  ("Kita Kouji×"). (#1904)

## [2.0.2-beta.15] — 2026-10-12 — actor cards, no male actors

### Changed

- The scraper shows each actor as a card with **all her photos**. Click a photo
  to make it the one shown in the actor browser and movie details (green frame
  and check mark). An actor without a photo shows why: not found on the photo
  sites, photo search waiting, or no photo yet. (#1903)
- **Male actors are left out.** JAV-GURU, R18.dev, Warashi and JavLibrary list
  only actresses; MissAV and JavTrailers list the whole cast. When an
  actress-only site found the movie, names only MissAV/JavTrailers give are
  hidden and not saved. A small line under the actors lists them - click a name
  to keep it after all. (#1903)
- The same actor is now also saved only once, whatever the spelling (before,
  only the screen showed her once). (#1903)
- The Play button in the scraper is much smaller, so there is more room. (#1903)

## [2.0.2-beta.14] — 2026-10-12 — less drive work after starting

### Fixed

- Kuraya no longer walks through every folder on all your library drives a few
  minutes after every start. That check now runs at most once a day; in between,
  the list from the cache and the live folder watcher are used. (#1901)
- The inbox subtitle check after starting only opens inbox folders that changed
  since the last check, instead of all of them. Folders with a Japanese
  subtitle still waiting for translation are still checked every start. (#1901)
- The scraper no longer lists the same actress several times when sites spell
  her name differently ("Kitagawa Haruka", "Haruka Kitagawa", "Kitagawaharuka",
  "Anna KAMI"). The first spelling is kept, and her photo is found for every
  spelling. (#1902)

## [2.0.2-beta.13] — 2026-10-12 — actor photos while you scrape

### Added

- Scraping a movie now also fetches photos and bios for its actors in the
  background (Task Console: "Actor photos & bios (after scraping)"). No
  separate actor scraper run needed for new movies. It waits while you run the
  actor photo scraper yourself, and you can pause or stop it. (#1899)
- The scraper shows a small photo before each actor name. Click it to see all
  her photos and tick the main photo used by the actor browser and movie
  details. (#1900)

### Fixed

- A chosen main actor photo was forgotten after a restart. (#1900)

## [2.0.2-beta.12] — 2026-10-12 — every control has a tooltip, no dead buttons

### Fixed

- The last controls without a tooltip got one. Buttons that did nothing when
  clicked are gone: the previous/next arrows and the edit pencil in the movie
  details window, and the help icon in the duplicate window. (#1898)
- Genre review → the **"Add to..." list** next to an unknown genre now works: the
  genre is added to the category you pick and kept for sorting. Before, picking
  a category did nothing. (#1898)
- The "fill bios" switch in Media Tools explains in plain words what it does. (#1898)

## [2.0.2-beta.11] — 2026-10-12 — every button explains itself; nothing personal in the public edition

### Added

- **Every button, switch, tab, menu entry and dropdown now has a tooltip** that
  says in plain words what it does (and, for risky ones, what happens to your
  files). About 1,430 controls in total — each text was written from what that
  control really does, not guessed. (#1891)
- All tooltip texts are collected in one list, `docs/TOOLTIP_TEXTS.txt`, so a
  button can be found by screen, label or icon — the raw material for the user
  manual. It is rebuilt with `python tools/dev/Export_Tooltips.py`. (#1892)

### Fixed

- The subtitle watcher that starts with Kuraya now watches **your** library and
  inbox folders from Settings. Before, it looked at three fixed folders from the
  developer's PC and did nothing on yours. (#1897)
- The public download no longer contains the developer's own tools, folder names
  or notes: only the scripts Kuraya really starts are included, and every release
  is checked for personal data before it can be published. (#1897)
- Media Tools → Metadata: with all sections open the page showed a yellow
  "BOTTOM OVERFLOWED" stripe and hid the lower buttons. The controls area now
  scrolls. (#1893)
- Actor photo scraper: a run that started from an old, left-over resume point
  skipped every actor ("Actors remaining: 0", everything 0). The scraper now
  ignores a resume point that is not in the current list and starts from the
  beginning. (#1894)

### For developers

- The tooltip guard (`#1860`) now checks all of `lib/` (not just `lib/ui/`) and
  more control types (tabs, list tiles, dropdowns, dialog options). Baseline: 20
  controls left, all explained in `docs/TOOLTIP_TEXTS.txt`. (#1895)

## [2.0.2-beta.10] — 2026-10-12 — one editor, series names, JavGuru links, no extra windows

### Changed

- Right-click: **Edit Everything…** is the one editor (title, genres g1–g4,
  metadata and files on one page). The separate Edit Genres / Edit Metadata /
  Rename items are gone; the full file editor and the renamer are buttons in
  it, and it has a clear **Done — Close** button. (#1869, #1870, #1872)
- Changing genres or a series name for a movie in a series asks: only these
  movies, or the whole series? Renaming a series lists every movie in it. (#1868, #1877)
- The editor shows the current Series / Studio / Director, also when several
  movies are selected. (#1874, #1875)
- Series Browser: no more "choose a source" — all sites are merged; a renamed
  series is still found by its original name; outlet (5GVG-…) and FANZA (DK…)
  editions count as owned; new filter **Uncensored available**; counters follow
  the filters. (#1878, #1879, #1880, #1881, #1884)
- Scraper: the series name you pick or edit is the one saved; the movie's own
  series name comes first; starred R18.dev words are filled in. (#1887, #1888)
- Subtitles: a website's uniform tag alone no longer blocks subtitles (184
  movies freed). (#1889)
- Tray icon library updated (hot restart no longer leaves a ghost icon). (#1871)

### Fixed

- JavGuru download links work again (also the -MR uncensored posts), shown as
  UNC. (#1882, #1883)
- Clicking the taskbar icon opened a new Kuraya each time instead of showing the
  open one. (#1885)
- The window froze for seconds when you came back to it. (#1886)
- Recent searches: newest on top, no half-typed entries. (#1876)
- Actor photos: no more photos of a different actress with the same first name;
  imggle.net photos download again. (#1890)

## [2.0.2-beta.9] — 2026-10-11 — Edit Genres is back in the right-click menu

### Fixed

- Right-click → Edit ▸ → **Edit Genres g1–g4…** is back (it went missing when
  the menu was put into groups). For a movie in a series it asks whether the
  change is for this movie only or for the whole series. Works for one movie
  and for several selected movies. (#1867)

## [2.0.2-beta.8] — 2026-10-11 — picking a movie works the first time

### Fixed

- In the scraper, picking the right movie from "Multiple Movies Found" seemed
  to need two or three tries. The first pick did work, but loading that page
  can take up to 1½ minutes and the card kept saying "Select one" meanwhile.
  The card now says it is fetching, and clicking it again just tells you to
  wait instead of starting over. (#1866)

## [2.0.2-beta.7] — 2026-10-11 — transcribe really runs; clean installs

### Fixed

- Subtitles were "made" in a fraction of a second: the speech-to-text step
  could not start, but the app still called the movie transcribed, and the
  translate step then marked it as a movie without speech. Now a step that
  did not run is reported as an error with the reason, the movie is tried
  again later, and it is never marked "no speech". The 9 movies wrongly
  marked today were un-marked. (#1864)
- The app now finds its own scripts next to Kuraya.exe as well, not only in
  the folder it was started from. (#1864)

### Changed

- Installing a new version first removes the old program files, so nothing
  from an older version is left behind. Your settings, logs and cache are
  kept. (#1865)

## [2.0.2-beta.6] — 2026-10-11 — clickable while the Task Console runs on Auto

### Fixed

- With the Task Console on Auto, the app could hang for up to 13 seconds at a
  time. The subtitle job re-read every subtitle file of all your favourite
  movies over and over, although they all have English subtitles already. It
  now uses the list the app already keeps in memory and only reads the drive
  for favourites that still need a subtitle. (#1863)

## [2.0.2-beta.5] — 2026-10-11 — calmer start-up

### Fixed

- After a restart the drives worked hard for several minutes and the app felt
  frozen. Two start-up jobs read every movie folder on all drives at the same
  time, and one of them made the window wait for each read. The picture
  look-up now reads the drives in the background without blocking the window,
  and the full folder check waits 5 minutes so it does not compete with it.
  (#1862)

## [2.0.2-beta.4] — 2026-10-10 — tooltips in the right-click menu

### Changed

- Every entry in the right-click menu, including the group names, now shows
  a short explanation when you rest the mouse on it for half a second. (#1859)

## [2.0.2-beta.3] — 2026-10-10 — tidy right-click menu

### Changed

- The right-click menu on a movie is now grouped: Play, Open Folder, Movie
  Details and Quick Edit at the top, then **Edit ▸ Scrape ▸ Subtitles ▸ Mark ▸
  Organize ▸** (and Find ▸ / Tools ▸ in the full version), and Delete last in
  red. Picking a group opens it in the same place; **‹ Back** goes up again.
  Several selected movies get the same groups. (#1858)
- "Flag for Review" is now called **Mismatch**, the same word as on the movie
  card and in the remote, so it is easy to find and remove. (#1858)
- Removed from the menu: Edit Genres (Quick Edit does it), and items that did
  nothing yet (Hide from Library, Check Scrapers for several movies) or belong
  to the old subtitle pipeline (Whisper queue, Boost audio). (#1858)

## [2.0.2-beta.2] — 2026-10-10 — the remote finds the PC by itself

### New

- The Android remote no longer needs the PC's IP address typed in. When it
  starts and can't reach the PC, it looks for Kuraya on your Wi-Fi and
  connects by itself. In the remote's Settings there is also a
  **Find my PC automatically** button. Needs remote 2.0.1 or newer. (#1855)

## [2.0.2-beta.1] — 2026-10-10 — duplicates show with the Fanart flag

New version line 2.0.2 (2026-10-10).

### Fixed

- The Duplicates folder movies were added without their fanart/poster
  information, so with **Flags: Fanart** (the normal setting) they were still
  hidden. They are now read like every other movie in the library. (#1853)

## [2.0.1-beta.35] — 2026-10-10 — Duplicates source shows the duplicates

### Fixed

- Choosing **Duplicates** as source showed nothing. The Duplicates folder is
  now sorted in sub-folders (maker, genres …), but the app only looked at its
  top level, so it never found the movie folders inside. It now looks through
  all sub-folders every time. (#1852)

## [2.0.1-beta.34] — 2026-10-10 — faster keyword search

### Fixed

- A keyword search could take almost 3 minutes: MissAV, JavTrailers and
  JavLibrary each waited 75 seconds for an Edge tab stuck on a Cloudflare
  check before trying another way. After one such wait, the app now skips the
  Edge tab for that site for 5 minutes and uses FlareSolverr straight away
  (about 15 seconds). (#1851)

## [2.0.1-beta.33] — 2026-10-08 — real uncensored badge in search

### Fixed

- Movies whose code contains "UC" (JUC-, RBUC- …) were shown as an
  uncensored upgrade ("UC · HAVE CENSORED") in search results, and the links
  found were the normal censored version. The uncensored check now looks for a
  separate "uc" tag, never letters inside the movie code. (#1850)

## [2.0.1-beta.32] — 2026-10-08 — no 2-minute freeze after the subtitle scan

### Fixed

- After the subtitle job finished scanning, the app froze for minutes while it
  sorted the list, because it read every folder's date from disk again and
  again. Each date is now read once, without blocking the app. (#1831)

## [2.0.1-beta.31] — 2026-10-07 — no freeze while the subtitle job scans

### Fixed

- The app no longer freezes while the Task Console shows "Scanning..." for
  Transcribe + Translate. The job used to walk every folder on all library
  drives and open every subtitle file; it now asks Kuraya's own movie list
  which movies have no English subtitle and only checks those. (#1830)

## [2.0.1-beta.30] — 2026-10-07 — catch short freezes

### Changed

- The freeze watchdog now records every hang of 3 seconds or more (was 8), so
  short freezes show up in the log with what the app was doing. (#1829)

## [2.0.1-beta.29] — 2026-10-07 — choose your Subtitle Edit

### Changed

- New setting "Subtitle Edit program" (Settings > Paths > Tools): the
  Subtitle Edit that right-click > Open in Subtitle Edit starts. Point it at
  Subtitle Edit 5 to use that one. Before, the path was fixed to
  C:\Program Files\Subtitle Edit. (#1828)

## [2.0.1-beta.28] — 2026-10-07 — no freeze when the remote refreshes

### Fixed

- The PC no longer freezes when the Android remote loads or refreshes its
  movie list. The PC used to scan the whole Duplicates folder from disk (with
  an ffmpeg check per movie) every time; it now uses the list it already has
  in memory. (#1826)

## [2.0.1-beta.27] — 2026-10-07 — icon 20 % bigger

### Changed

- The Kuraya icon is zoomed in another 20 %. (#1825)

## [2.0.1-beta.26] — 2026-10-07 — icon without the square

### Changed

- The Kuraya icon is now just the sun and the dancer, without the dark square,
  so it fills the whole icon and looks as big as the other apps on a dark
  taskbar. (#1824)

## [2.0.1-beta.25] — 2026-10-07 — bigger icon

### Changed

- The Kuraya icon is zoomed in 25 % on the logo, so it looks bigger on the
  taskbar and the desktop. (#1822)
- Kuraya now gives Windows its icon in the exact size your screen needs, big
  and small, instead of one size Windows had to scale. (#1823)
- The Android remote has the Kuraya logo as its app icon, and a dark Kuraya
  start-up screen with a big logo. (#1821, #1822)
- The public remote hides New Releases (it is all about download links), and
  Tube search on the remote works in the public build too. (#1820)

## [2.0.1-beta.24] — 2026-10-07 — settings safety copy

### Fixed

- Kuraya now keeps a second copy of your settings in `%APPDATA%\Kuraya`.
  If the settings file in the Kuraya folder is ever missing, Kuraya restores
  from that copy instead of starting empty (no libraries, an empty cache).
  (#1819)

## [2.0.1-beta.23] — 2026-10-07 — easier setup

### Changed

- Setup -> browser extension: one button per browser you have ("Add to Edge",
  "Add to Chrome"). It opens the browser's extensions page and copies the
  extension folder for you, so you only switch on Developer mode, click
  "Load unpacked" and paste. (Browsers only let you add an extension yourself.)
  (#1817)
- Setup -> JDownloader 2: "I have it - browse" to point at JDownloader2.exe
  yourself, and "Choose watch folder" with a folder picker. (#1817)
- The welcome guide on an empty library has a close button. "Show the welcome
  guide" brings it back. (#1818)

## [2.0.1-beta.22] — 2026-10-06 — subtitles after scraping

### Fixed

- Movies that come from the Pre-Inbox now get their English subtitle in the
  Inbox after scraping. Before, the subtitle job looked for them in the old
  Pre-Inbox folder, did not find them, and showed "done" in the Task Console
  without making a subtitle. (#1815)
- The app no longer freezes for about half a minute when many Pre-Inbox movies
  move to the Inbox at once. Each new folder used to reload the whole library
  to look itself up. (#1816)
- Pre-Inbox no longer seems to run twice: "Item n of N" now counts only the
  movies that still need work. (#1814)

## [2.0.1-beta.21] — 2026-10-06 — covers in Compare & decide

### Fixed
- Pre-Inbox → **Compare & decide** shows the covers (fanart + poster) of both copies again instead of "No images available" (#1813)

---

## [2.0.1-beta.20] — 2026-10-06 — browser extension explained

### Changed
- **Setup → Tools** explains the optional **browser extension for Edge/Chrome** (faster scraping of Cloudflare-protected sites) with step-by-step install and a button that opens its folder. Also on the website and the project page (#1812)
- Browser extension 1.7.15 — talks to Kuraya on this PC only (#1811)

---

## [2.0.1-beta.19] — 2026-10-06 — copy text again

### Fixed
- You can select and copy text again — actress names, DVD-IDs, titles — in **Movie Details**, the **Scraper** and the **Pre-Inbox** comparison (#1810)

---

## [2.0.1-beta.18] — 2026-10-06 — bigger icon

### Changed
- The Kuraya icon fills its whole space, so the sun and the dancer look about a third bigger on the taskbar and in the Start menu (#1809)

---

## [2.0.1-beta.17] — 2026-10-06 — no more freeze at start

### Fixed
- **Kuraya froze for up to two minutes after starting** with a big library. A cover-image warm-up that was meant to run in the background read every movie folder before the first screen. It now really runs in the background and the window responds straight away (#1807)

---

## [2.0.1-beta.16] — 2026-10-06 — updates built in

### New
- **Automatic updates:** Kuraya tells you when a new version is out and installs it with one click (Install now / Later / Skip this version). Also under **Help → Check for updates**. Your settings, folders and library are kept (#1805)
- **Only one Kuraya at a time** on the same library cache — starting it again brings the open window to the front instead of risking damage to the database (#1804)

### Changed
- 21 software libraries updated to their latest safe versions, including two that their makers had withdrawn (#1803)

---

## [2.0.1-beta.15] — 2026-10-06 — measuring the startup freeze

### Changed
- Kuraya measures how long the first sort/filter of a big library takes and records it in the log, to find the cause of a freeze some users see right after starting (#1802)

---

## [2.0.1-beta.14] — 2026-10-06 — Duplicates folder, correct explanation

### Changed
- The **Duplicates folder** is for DVD-IDs that clash: two *different* movies with the same DVD-ID. "Keep both" moves both there so neither overwrites the other — now explained in Settings → Folders, on the website and on GitHub (#1796b)

### Fixed
- The welcome screen no longer flashes at every start while your library is still loading — you see "Loading your library…" instead (#1801)

---

## [2.0.1-beta.13] — 2026-10-06 — subtitles must fit

### Changed
- When a new copy replaces a movie you own, its old subtitle is only kept if it **fits**: same length = kept; only a different intro = every line is moved to match the new audio (lip-sync); anything else = the old one is switched off (.old) and a new subtitle is made from the new copy's own audio (#1799)
- Pre-Inbox: a movie you already own now says **"WAITING FOR YOU"** with its own **Compare & decide** button, instead of an hourglass that looked frozen (#1800)

### Fixed
- Pre-Inbox: after deciding, the movie's card disappears instead of staying as "waiting" (#1800)

---

## [2.0.1-beta.12] — 2026-10-06 — subtitles: only what is missing

### Changed
- Automatic transcription + translation works through **Favourites → Inbox → Library** and only takes movies **without** an English subtitle. An existing subtitle is never redone automatically (right-click still can). When nothing is missing, the graphics card is free for the other jobs (#1798)

---

## [2.0.1-beta.11] — 2026-10-06 — Duplicates folder explained

### Changed
- Website explains what the **Duplicates folder** is for (#1796)

---

## [2.0.1-beta.10] — 2026-10-06 — cleaner toolbar

### Changed
- Toolbar: every button is a dark chip with a white icon, in every dark theme (#1795)
- Toolbar: the left and right sides are balanced, so the search box is never cut off (#1795)

### Fixed
- Setup always shows the folder page with **Browse**, also when you update — it used to skip it and install over the last folder (#1794)

---

## [2.0.1-beta.9] — 2026-10-06 — Help and problem reports

### New
- **Help** button (blue ?, top right): *What every button does*, *Troubleshooting* and **Report a problem** — Kuraya saves a log report on your Desktop and opens the problem page; just drag the file in. The report never contains passwords, API keys or settings (#1793)
- **Troubleshooting** page with quick fixes for the most common problems: fetterbr61.github.io/Kuraya/troubleshooting.html (#1793)

### Fixed
- Actor Photos said "With photo 0" although photos were there (#1792)
- A "?" placeholder picture was saved as an actress photo (#1792)

---

## [2.0.1-beta.8] — 2026-10-06 — actor photo sources shown

### Changed
- The actor photo scraper shows which sources answered for each actress (Warashi, JavDatabase, DMM, SexTB) and counts all four at the end — before, only Warashi was listed although all four were used (#1791)

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
- Removed every remaining folder fixed to the developer's drives: sorting fallback (one fixed drive → the movie's own drive), genre-sort base folders (→ your library folders), converter order, series-browser download folder (→ your Downloads, setting `downloadFolder`), folder-browser thumbnails (`C:\Temp` → `Cashe\video_thumbs`), ImageMagick (`H:\` → setting `imageMagickPath` or PATH), Desktop paths (→ your own home folder) (#1747)
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
