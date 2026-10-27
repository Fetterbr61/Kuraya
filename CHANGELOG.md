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

## [2.0.5-beta.1] — 2026-10-24 — pause and resume every job, themes everywhere, copyable text, a safer video converter

- In short: every long job in the Task Console can be paused, resumed and stopped; every page, dialog and button follows the chosen theme; text in windows can be marked and copied; the video converter keeps its originals in NMP_Trash and leaves its end result on screen; the scraper shows the whole cover; many Upgrades, subtitle and Pre-Inbox fixes. Everything is listed below.

- New: **Kuraya Remote for Windows** - the same remote as on Android, for a laptop (unzip and start Kuraya_Remote.exe). Both remotes now start without a default PC address, and the remote's file browser uses the address you entered instead of a fixed one

- Actor photos & bios: Stop now always stops the job, also when the download of one actor hangs. A job that makes no progress for 20 minutes is stopped by itself and the remaining actors carry on (#2073)
- Video converter: the original file is now moved to NMP_Trash (a dated folder on the same drive) after it has been replaced by the smaller version, instead of being deleted for good (#2072)
- Video converter: when a run finishes, the result (how many were converted, skipped, failed and how much space was saved) now stays on screen until you close it. A later automatic run can no longer wipe it (#2071)
- **Download Guard** (full edition) also stops a movie you deleted earlier, not only movies you own. The prompt says "You deleted ..." and nothing in your library changes (#2068)
- Scraper: the cover preview in the left panel now fits the picture, so a full DVD cover is shown whole. The Play button is a small chip on the picture instead of its own row (#2069, #2070)
- **Download Guard** (full edition): a browser add-on that stops a torrent or download link for a movie you already own before it reaches uTorrent, so the tracker never counts it. The owned movie gets today's date as date added. The tray icon shows how many movies it knows and has a Rescan button (#2067)
- Each scraper now has a link to its website, in the scraper list before scraping and in Settings, so you can open the site in your browser when its tab has disappeared or the site wants a check (#2066).
- Pre-Inbox: a movie whose title the content filter excludes from subtitles no longer gets stuck in the Pre-Inbox; it moves on to the Inbox without a subtitle (#2065b).
- Guide and README: a yes/no comparison of the Pre-Inbox and putting files straight into the Inbox, and why the Pre-Inbox is worth using. Corrected: the Pre-Inbox no longer makes the subtitle before the movie moves on (it is made in the background in the Inbox), and it checks whether this file is censored, not whether an uncensored version exists (#2065).
- Pre-Inbox: the middle panel now follows the movie that is being worked on, also after a loose file was moved into its own folder or when the movie arrived after the window was opened (#2064).
- Combine (burn subtitles from a hardsub copy into the uncensored copy) is now safe: it checks for free space first, keeps the original library video on the same drive (fast, no big copy), puts everything back and tells you if a step fails, and sends replaced files to the trash folder instead of deleting them (#2063).
- Fixed: exporting series paths to CSV no longer crashes when the file is open in Excel (it says so instead); a locked temporary file no longer stops a whole video-conversion run; Stop in the movie scraper no longer throws when its stop file cannot be written (#2062).
- Themes: all of Flutter's own buttons, dialogs, menus, input fields, chips, tabs and switches now follow the chosen theme in one consistent style (flex_color_scheme). Fixed: the right-click menu stayed dark in Picasa Light, so its text could not be read (#2061).
- Themes are now easy to add or change: every colour of a theme (pages, panels, text, buttons, movie cards, toolbar) lives in one list, and a new theme shows up in the theme picker and Settings automatically (#2060).
- Themes, step 1: the right-click menus and their dialogs (rename, move, delete confirmation, multi-part files) now follow the chosen theme instead of fixed colours (#2059).
- Every job in the Task Console can now be paused and resumed, not only stopped: series move, sort to V2, folder move, genre rename, long-path fix, background translation, repair scan, short titles, loose movies to Pre-Inbox and actor photo top-up. Pause always waits until the current movie is finished (#2058).
- Transcribe + Translate batches and 'Bake translations' over the whole library can now be paused, resumed and stopped from the Task Console (#2057).
- Fixed: Stop in the Task Console now stops a Transcribe + Translate batch. The batch has its own card; Stop lets the current movie finish and then ends the batch (#2056).
- Every bulk job (right-click on several movies, bulk scraping) now runs in alphabetical ID order, with numbers in natural order (ABP-2 before ABP-10) (#2055).
- Subtitle content filter: the 'transcribe then translate' path now checks the movie's genres and series too, not only the file name, so every path follows the same rule (#2054).
- Local subtitle translation now prefers gemma4:12b (about twice as fast, same quality and wording in tests); the previous Gemma 4 model is used when it is not installed (#2053).
- Text in dialogs and windows can now be marked with the mouse and copied (Ctrl+C), like in any Windows program. The movie grid and the very large result windows are left out on purpose (an app-wide selection froze the app) (#2052).
- Movie Details: the texts (title, ID, actress names, rows) can now be selected with the mouse and copied (#2051).
- The subtitle fit check now covers the whole library (not only uncensored) and keeps running in the background: a movie whose folder changes (new video or subtitle) is checked again a few minutes later (#2050).
- New right-click entry for several movies: 'Subtitle does not fit - make a new one'. The old subtitle files are set aside (renamed .misfit, not deleted) and a new subtitle is made from the movie's own sound. Downloaded or extracted English subtitles are never touched (#2049).
- Fixed: Start in the actor photo scraper closed its window at once (it looked for the actor list in an old cache folder). Background actor photos are now also saved in the real cache folder (#2048).
- Fixed: after replacing a movie with an uncensored copy, the movie could lose its UNCENSORED banner a few seconds later, because a background update wrote back an old copy of the movie info. It now checks that the file did not change in the meantime (#2047).
- New one-time background check of uncensored movies: does the English subtitle still fit the video? Movies where the subtitle ends after the video, or before 70 % of it, show under the filter 'S - Subtitle may not fit (uncensored)'. Nothing is changed automatically (#2046).
- Replace keeping the library name: the old movie's subtitle is now checked against the new video. Same length keeps it, a shifted start is retimed, a different cut parks it as .old so a fresh one is made (#2045).
- Uncensored scrape: when the normal sites have nothing, it now also checks JavGuru MR, JavLibrary, MissAV and Sukebei, the same way as the favorites check in Upgrades, so it no longer reports 'no results' for movies that are findable there (#2043).
- Uncensored search: a movie searched without finding anything is searched again after 7 days (new releases and links appear); movies where one was found stay marked as searched (#2042).
- Downloads: when fetching links for an uncensored copy, JavGuru is now tried first (its MR posts have Rapidgator links), then MissAV, then JavLibrary (#2041).
- Upgrades: movies that arrived after the last full load (for example just moved into the Inbox) now count as owned and censored right away, so a favorite you just added is included in the favorites check (#2040).
- Upgrades: a MissAV page only counts as an uncensored copy when the movie ID is in the page's title; before, MissAV's "not found" page (which also contains the ID) produced false finds such as the Chinese spanking videos (#2039). Press Reset on the Upgrades tab to clear earlier false finds.

- Upgrades, Favorites only: a movie that was already on screen is now recognised when it is found again (before, the search carried on to the next source), and every checked favorite writes one log line saying where it was found or that nothing was found (#2038).

- Upgrades, Favorites only: the limit now counts the favorites checked in this run; before, the 48 upgrades already on screen used it up and the search stopped after about 28 favorites (#2037).

- Upgrades, Favorites only: JavLibrary is checked too - after the two JavGuru sections and before MissAV - for uncensored / MR RapidGator links that users post in its comments (#2036).

- Upgrades, Favorites only: JavGuru is searched inside its sections - first "Decensored (MR)", then "English subbed" (#2035).

- Upgrades, Favorites only: every favorite is now checked by itself, in this order: JavGuru MR section, JavGuru Subs section, MissAV, Sukebei - stopping at the first find. JavGuru first because it always has the download link. When JavGuru refuses Kuraya's own request, its search page is read through the browser (#2034).

- Browser extension 1.7.20: a normal page that only carries Cloudflare's background script is no longer taken for a "verify you are human" page (MissAV list page 3 was thrown away every time) (#2033).

- Upgrades: JavGuru answers "too many requests" to the app's own request but works fine in the browser, so its list pages are now fetched through the browser when that happens (#2032).

- Upgrades: with "RG only" on, SexTB (Nitroflare only) is skipped in the upgrade search too (#2031).

- Upgrades search no longer gives up on a busy or blocked site: JavGuru "too many requests" and server errors are retried after 20 s, 60 s and 120 s (or the wait the site asks for), MissAV and SexTB pages behind Cloudflare are retried twice with a longer wait; the status line counts down the wait and Cancel still works (#2030).

- Upgrades: when a source could not be checked (JavGuru busy with "too many requests", MissAV timing out behind Cloudflare, SexTB errors), the result line now says so, e.g. "NOT checked this time: JavGuru (too many requests), MissAV (timed out) - try again later" (#2029).

- The Sukebei upgrade search now accepts exactly the same uncensored markers as Kuraya's filename list (MR, Reducing Mosaic, uncensored, leak, 無修正, 破壊 …), from one shared list, and checks only the torrent's name (#2028).

- "-MR" and "Reducing Mosaic" count as uncensored in one shared rule, protected by an automatic check so it cannot be changed by mistake again (#2027).

- Fixed: the one-time subtitle index pass of the previous build rebuilt each movie without its "has NMP / fanart / poster" flags, so cards showed the NMP as missing. The pass now keeps the flags, runs again once (about 3 minutes after start, when nothing else is busy) and restores them from each movie folder (#2025).

- Sukebei search for uncensored versions: "[Reducing Mosaic]" (MR) torrents are offered again; they count as uncensored in this library, as before (#2026, undoes #2024).

- Upgrades tab: a live countdown above the controls, for example "300 favorites can be upgraded · checked 120 · found 5 · not found 115 · 180 left to check" (#2023).

- Upgrades tab: one plain sentence above the controls says what is being checked (favorites or all movies), how many can be upgraded and how many upgrades were found; the progress counter now counts inside that choice (not all 18,637 movies); and the same movie no longer shows as two Sukebei cards (#2022).

- New Releases, Upgrades tab: a "Favorites only" switch next to the limit. It shows only your favorites in the list at once (the other found upgrades stay saved) and makes the next search check only your favorites (#2021).

- Subtitles made by the local model are named .Gemma4.EN.srt; existing .DeepSeek.EN.srt files keep their name, and both count as the finished English subtitle everywhere. If DeepSeek has no key or its balance runs out, the movie is translated locally instead of getting no subtitle (#2020).

- The library cache now stores each movie's subtitle names (before, about 98 % of movies looked like they had no subtitle to the filters and the Task Console counts). New scans store them, and a one-time background pass fills the existing movies when nothing else is busy (#2019).

- The subtitle line in the Task Console now names the queue it is checking (Inbox or library) and always shows both queues, for example "Inbox 0 · Library 18,546 left", so the Inbox no longer looks forgotten (#2018).

- "Open in Subtitle Edit" now uses the Subtitle Edit 5 portable folder in the Kuraya tools folder by default (#2017).

- czkawka (duplicate and broken-file finder) now lives in the Kuraya tools folder like the other tools, so it finds FFmpeg next to it; the default path is {tools}\czkawka_cli.exe (#2016).

- The public edition translates subtitles with local AI (Ollama, Gemma 4 when installed) and no longer has any DeepSeek setting; the guide, README and website say so (#2015).

- Subtitle translation keeps using DeepSeek until the account balance is gone: a timeout or network error is retried (5 s, 15 s, 40 s) instead of switching to the local model; only an empty balance, a missing key or three failed retries use the local model (#2014).

- When DeepSeek is off or fails, the local translation (now Gemma 4) uses the same intimate style: kissing, licking and breathing sounds become natural English sound words, with a glossary taken from the real translations (#2013).

- The local AI model is now Qwen 3.5 (9B): faster and smaller than the old Qwen 3 14B, and it follows the answer format better in the genre test (#2011).

- Right-click menu: hover a group (Names & Info, Get Info, Flags ...) and its functions open at the side at once, no click needed (#2010).

- Add to Series now also sets the movie's series name and updates the library list at once, so the series viewer shows it straight away (#2008).

- Add to Series is now also in the right-click menu for several selected movies, and does everything in one step: series name, genres, and moving each folder to its new place (never the old Level1/Level2/Level3 layout) (#2007, #2009).

- The browser extension no longer opens a second empty window when two sources start at the same moment, closes the blank start page of its window, and removes leftover empty scraper windows (extension 1.7.19) (#2006).

- The browser extension no longer leaves old scraper windows and pages behind: every page it opens is marked, and any marked page that is not the one tab for its source is closed, in every window. Pages you open yourself are never touched (extension 1.7.18) (#2005).

- Actress photos now come from more than one source automatically: in the background, in small batches and only when nothing else is busy, Kuraya checks JavDatabase, DMM and SexTB for actresses whose photos all came from one source and adds new photos next to the old ones without removing anything. Every new photo records which site it came from, and the repeated source names in the labels are fixed (#2004).

- In the scrape window, the sort-folder and genre pickers are greyed out until the scrape of that movie is done (#2003).

- The Pre-Inbox now recognises every video type Kuraya supports (for example .flv, .ts, .mpg, .webm); before, files like MLDO-044.flv were ignored (#2002).

- The README, the guide and the website now say clearly that every movie needs its DVD-ID in the file name, and that files with a normal text name are not recognised (#2000).

- Helper programs (the subtitle watcher, OCR, transcription, repair checks) now close together with Kuraya even when it is stopped abruptly, so no PowerShell windows are left running (#1999).

- The right-click menu is regrouped by purpose: Names & Info, Get Info (Scrape), Subtitles, Flags, Move & Sort, Downloads & Upgrades, Video & Repair and a new Whole Library group; Find Replacement (No Sound) now sits under Downloads & Upgrades (#1997).

- New right-click entry "Find Uncensored - choose movies": search your favorites, what the grid shows, or the whole library, and skip movies that already have an uncensored version (#1996).

- With Rapidgator-only on, SexTB and EroAsia (which only have Nitroflare) are no longer searched at all (#1995).

- Find Replacement (No Sound) now searches every source the app knows (it was missing SexTB and EroAsia) and its status text names them all (#1994).

- Find Replacement (No Sound) is now also available when several movies are selected; it goes through them one at a time and you can stop at any point (#1993).

- Right-clicking several movies now also offers Repair Video, Tag for Ad-Removal and Unlock Genres for all of them at once (#1992).

- Sorted folders no longer repeat the same genre twice in one path, no longer get a performer name glued to a genre (Slut-Yui, Married-Woman-Mio), and no longer use generic words like Actor / Actress as genre folders (#1991).

- The repair scan now also checks that each movie's length fits its file size, so files with a wrong length in the header are sent to repair before they are compressed (#1990).

- The repair scan now only checks that each movie can start (a quick header check) instead of decoding every movie fully, so it finishes in minutes instead of many hours (#1989).

- The repair scan now shows an estimated percentage and time left in the Task Console (#1988).

- Stopping the repair scan now also stops the video checkers it started, so nothing keeps running in the background (#1987).

- The repair scan (broken videos) can now be paused and resumed from the Task Console, and shows how long it has been running (#1986).

- The converter now also waits for the broken-video scan to finish, then for all the repairs it finds, before it compresses or remuxes anything (#1985).

- The converter (compressing and remuxing) now always waits for the video repair to finish first, and starts the repair itself when files are waiting for it (#1984).

- The converter window no longer starts a new movie on the previous movie's full green bar (#1983).

- R18.dev now really counts with the priority you set (it was treated as last, so its title was never picked first); the automatic title/field pick now knows every scraper in the priority list (#1982).

- The browser helper no longer keeps a tab open on SexTB, so its ads stop opening new pages; SexTB is read without a browser tab instead. Reload the extension (version 1.7.17) (#1981).

- Fixed a rare loss of a movie's info file when two things updated the same folder at the same moment (for example while converting many fanarts to posters) (#1980).

- Poster view: a movie that has its poster file but no poster tag in its info file no longer shows the red NEEDS SCRAPING tile; the card now finds the poster the same way the green P badge does (#1979).

- The movie grid no longer freezes for 10+ seconds: the Folder dropdown listed every folder of the library (about 21,000); it now shows the 300 biggest makers, and deeper folders are reached through "show this maker's catalogue" (#1978).

- Changes made while Kuraya was closed are picked up quietly a few minutes after start by checking folder times, instead of reading through the drives (#1975).

- The background health check no longer goes through the whole library over and over: it does one full check a day and otherwise only checks folders that changed, so the drives can rest (#1974).

- The app no longer freezes when the subtitle work starts: finding movies that still need an English translation now uses the library cache instead of reading every subtitle file on all drives (#1973).

- Actress photo search also reads the "Alias" line of her JAV-GURU page, so a woman who works under several names gets her photos found under all of them (#1963).

- The Android remote now shows the actress photo you picked as the main one, not just the first photo found (#1968).

- In Actor Details "Blood Type:" now stays on one line (#1967).

- On the Android remote, a male actor without a photo now shows a grey picture saying "MALE ACTOR" instead of an empty person icon (#1966).

- In the scraping window every actress photo now shows the site it came from, and male actors (listed by JAV-GURU under "Actor") get a big blue "MALE ACTOR" line and no photo search (#1964, #1965).

- Actress photo search now also looks for the second name JavLibrary lists in brackets, for example "Aida Asuka (Takashima Yuika)", so actresses who work under two names get their photos (#1963).


- Scraping now also makes the poster: after you press Apply, Kuraya cuts the poster from the fanart you chose, in the background like the actress photos. A newly chosen fanart replaces the old poster (#1960).
- The program icon now fills its square in the taskbar like other apps (#1959).

- Scan Library now notices movie files that lie loose in a library folder (Kuraya only reads movies that are in their own folder). It lists them and offers to move the ones with a DVD-ID in the name to the Pre-Inbox, where they are checked, scraped, renamed and filed as usual. Files without a DVD-ID stay where they are. Nothing is overwritten (#1958).
- A file name with a website glued in front with "@" (like hhd800.com@IPX-177.mp4) now gives the right DVD-ID (IPX-177) instead of the site name (#1958).

## [2.0.4-beta.1] — 2026-10-18 — face-checked actor photos, no more freezes in the scraper and Refill Missing, black theme

- Also in this release: everything from the test versions 2.0.3-beta.5 to 2.0.3-beta.10 (fewer hiccups while subtitles are queued, smoother remote streaming, you choose how much videos are compressed, do not download what you deleted before, less freezing while the video converter scans, the scraper window no longer holds back the mouse).

- Scraper priority is now one small panel with everything visible; drag to reorder, so a number can only be used by one scraper (#1956).

- When Pre-Inbox is finished it just closes; it no longer opens the scraping window by itself (#1955).

- The app no longer walks all drives once a day to double-check owned movies; it trusts the cache and the folder watcher (#1954).

- Deleting a movie now first stops any transcription, translation or conversion working on it, then deletes (#1953).

- A movie whose file name contains an "&" (stored as &amp; in the info file) no longer shows NEEDS SCRAPING by mistake. (#1949)
- Right-click → Edit → "Check & Fix Names + Info to Standard" is back: checks and fixes the folder and file names, the subtitle names and the info file of the selected movies against all the rules, and asks before renaming. (#1947). It now also checks the content of the info file (.nmp) and lists what is wrong before it rewrites it: junk in the title, missing year or maker, more than 6 genres, blacklisted genres, not-allowed actor names, a wrong DVD-ID, old tags
- "Move by amount" (green button in the toolbar): choose how many GB or movies to move and where from (the whole view or one drive); Kuraya selects them from the top of the grid and asks for the destination. No need to select first. (#1943)
- Selection limit: a new toolbar button lets you set, BEFORE you select, the most movies or the most GB you can select; selecting (click, Shift-click, Select all) stops at the limit. Handy for moving a set amount between drives. (#1942)
- Moving several movies to another folder or drive now asks how much: all of them, only the first N movies, or up to a number of GB. (#1941)
- New Releases: movies you tick in one tab are kept when you go to another tab (New, Upgrades, Keywords, Similar, Actress ...); the selections are merged, not thrown away. (#1939)
- minnano-av.com (the Japanese actress database) is now a standard actor source: aliases (stage names), birth date and Japanese name are saved per actress, and two names with the same minnano-av id are noted as one woman. (#1938)
- Less drive reading: the actor photo list is rebuilt only when the photo folder really changed, and the folder watcher now tells the background subtitle scan and the photo list when something really changed, so unchanged folders are never read again; the actor list refresh is limited to every 5 minutes. This removes the spinning-mouse stalls. (#1934, #1935)
- Face check now also catches the same photo saved twice at a different size or with a white border (20 more found in the first run). (#1933)
- A photo that shows another actress's face (a good photo under the wrong name) is moved to the right actress instead of being thrown out, when the face match is strong. (#1931)
- Photos that arrive outside a normal batch (r18.dev) are face-checked too, so duplicates and wrong-person photos no longer linger. (#1930); during a long photo fetch the face check also runs every ~2.5 minutes
- r18.dev is now a standard actor source: for every scraped movie, its actresses get their r18 id, Japanese name and (when missing) a photo; two names with the same r18 id are noted as the same woman. (#1929)
- Face check also joins photos of the same actress saved under two spellings (e.g. Ruri Saijo and Saijou Ruri) under one name, only when the faces agree; the other name becomes an alias. (#1927)
- Actor names that differ only in how a long vowel is written (Saijo / Saijou / Saijoh) now count as the same actress, so their photos sit in one group. (#1927)
- Closing the scraper window with X (or Esc) now forgets the scrape. "Resume" only appears after you press Stop or Minimize, or if Kuraya crashed. (#1902)
- A red "No" cross next to the Resume button (toolbar and floating button) drops the paused scrape for good. (#1902)
- The scraper no longer reads its genre files (about 0.9 MB) while drawing, which could hold the mouse back for a few seconds; they load in the background when it opens. (#1904)
- The scraper no longer loads the whole movie database from disk when it opens or checks 'already in library' - it uses the list already in memory (this was the multi-second stall). (#1905)
- Actor photos are fetched while you scrape: the actors of the movie on screen go first, and their photos appear in the scraper within a minute or so. (#1906)
- Video search "Add screenshot": works again, and pastes a screenshot from the clipboard (Win+Shift+S) first. (#1907)
- Video search by screenshot now works with only a screenshot (it did nothing when the description box was empty), and it reads the on-screen text to build search terms. (#1908)
- Video search by screenshot now searches the sites with the actress name plus an English title keyword (like "Tamaki Mai widow"), then widens if nothing is found - the way a Google search finds it. (#1909)
- Fixed a total freeze (5+ minutes, "Not Responding") that could hit while scraping: when background actor photos finished, Kuraya re-read the whole actors folder once per actor. It now refreshes the photo list in the background and reads the folder at most once. (#1913)
- The Kuraya icon and logo now have a pure black background, edge to edge, so no square edge shows on a black desktop or taskbar. (#1914)
- Dark theme: the page background is now pure black, matching the logo; panels and the toolbar stay slightly lighter. (#1915)
- The old "Dark" theme is removed; Picasa Dark (now black) is the dark theme and the default. Anyone who had "Dark" gets Picasa Dark. (#1916)
- The "Professional" theme is removed as well; it also opens as Picasa Dark. Two themes are left: Picasa Dark and Picasa Light. (#1917)
- Remote (tablet) playback: lighter picture filters so the tablet no longer drops frames, and the PC sends the video in smaller, steadier pieces in smooth mode. Needs the new remote app on the tablet. (#1919)
- Refill Missing: for kinky movies (BDSM, femdom, bondage...) Rinryu is the first priority and its title, series, actors and genres are never overwritten; other sources only fill what Rinryu left empty. Also fixed a crash for movies whose stored actors/genres were saved in the longer form. (#1921, #1922)
- Movies in the known Rinryu series (Doris, Livestock Candidate Club, Livestock Chair Way, Meat Toilet Way, Perverted Torture Princess, Project Zero (Next), Pure Gold, Tongue Doll Way, Tsumikisha, Yapoo's Market (Venus)) always get Rinryu first. (#1922)
- Fixed the 3-minute freeze after Refill Missing: it started the old automatic genre sort over the whole library (and could move folders). That automatic step is now off; sorting only happens when you start it in Movie Sorter. (#1923)
- Removed the old "Auto-Sort Movies" entry from the tray menu; it used the old sorter and could undo the new folder layout. (#1924)
- Checked every other mover: right-click "Move to genre folder" now moves into the new layout (Maker, then genre folders) like the Movie Sorter; the old automatic fanart sorter can no longer move movies. (#1925)
- Actor photos are now checked by FACE: duplicates, covers and photos of the wrong person are moved out (reversible) and the same check runs after every automatic photo fetch. (#1926)
- Picasa Dark theme (the one most people use) is now black too: pages pure black, panels near-black, on every screen and dialog. The Kuraya logo shows in colour on black, empty parts of the page and fades out over covers and text. (#1918) (#1915)
- Actor photos that were the same picture for several different actresses are moved out of the cache (reversible); the scraper fetches proper ones. (#1903)

**Also since the last public test version (2.0.3-beta.4):**

- The scraper window used to read ~26,000 actor photo files in one go while drawing, so mouse and keyboard stalled 3–6 seconds. The photo list is now built in the background; the small round photos appear a moment later. (#1900)
- The background subtitle-watcher PowerShell now closes when Kuraya exits (all other PowerShell helpers were already tracked). (#1901)
- Kuraya froze for seconds while the video converter went through thousands of
- Movies you downloaded and then deleted on purpose now carry a red label
- Settings → Media → **Video compression**: choose *smallest* (480p), *balanced*
- Streaming to the Android remote stuttered: the PC blew a 540p movie up to
- The mouse froze for several seconds again and again while the subtitle
- Actress photos: the same picture could be saved under many actresses with
- The guide and the website now describe Edit Everything, series renaming,

## [2.0.3-beta.10] — 2026-10-14 — scraper window no longer holds back the mouse

- The scraper window used to read ~26,000 actor photo files in one go while drawing, so mouse and keyboard stalled 3–6 seconds. The photo list is now built in the background; the small round photos appear a moment later. (#1900)
- The background subtitle-watcher PowerShell now closes when Kuraya exits (all other PowerShell helpers were already tracked). (#1901)

## [2.0.3-beta.9] — 2026-10-14 — less freezing while the video converter scans

### Fixed

- Kuraya froze for seconds while the video converter went through thousands of
  files that were already handled: it checked the disk for every single file on
  the main thread and wrote one log line per file. It now knows from one scan
  which files need attention and writes a short progress line instead. (#1899)

## [2.0.3-beta.8] — 2026-10-14 — do not download what you deleted before

### Added

- Movies you downloaded and then deleted on purpose now carry a red label
  "DELETED BEFORE" on their card in New Releases (all tabs incl. Keywords), in
  the Series Browser and in the "Multiple Movies Found" window. When you
  download several movies at once, those are skipped; Kuraya asks once if you
  want to download them anyway. (#1898)

## [2.0.3-beta.7] — 2026-10-14 — you choose how much videos are compressed

### Added

- Settings → Media → **Video compression**: choose *smallest* (480p), *balanced*
  (540p, the default and the same as before), *best* (720p) or *custom*
  (your own resolution and a quality number). The converter still only runs
  when you start it and never makes a file bigger. (#1897)

## [2.0.3-beta.6] — 2026-10-14 — smoother remote streaming

### Fixed

- Streaming to the Android remote stuttered: the PC blew a 540p movie up to
  1080p before sending it over WiFi (about 4 times the data for no better
  picture). It now never scales above the original height. (#1896)

## [2.0.3-beta.5] — 2026-10-14 — fewer hiccups while subtitles are queued

### Fixed

- The mouse froze for several seconds again and again while the subtitle
  worker checked the library: it re-read and re-checked the same unchanged
  subtitle files on every pass. It now remembers each folder and only checks
  again when something in that folder changed. (#1893)
- Actress photos: the same picture could be saved under many actresses with
  the same first name (one photo under up to 84 names). 2,348 wrong photos
  were set aside, and a new check refuses a picture that already belongs to
  a different actress. (#1894)

### Added

- The guide and the website now describe Edit Everything, series renaming,
  the Series Browser, automatic actress photos, and have a page listing every
  button by screen. (#1895)

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
