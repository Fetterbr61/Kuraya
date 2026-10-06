<h1 align="center">Kuraya 蔵屋</h1>
<p align="center"><b>Where Your Japanese Adult Movies Lives.</b></p>
<p align="center"><i>The JAV library that runs itself.</i></p>
<p align="center">
  <a href="https://github.com/Fetterbr61/Kuraya/releases"><img alt="latest release" src="https://img.shields.io/github/v/release/Fetterbr61/Kuraya?include_prereleases&label=version&color=orange"></a>
  <img alt="platform" src="https://img.shields.io/badge/platform-Windows%2010%2F11-blue">
  <img alt="status" src="https://img.shields.io/badge/status-beta%20(test%20version)-yellow">
  <img alt="18+" src="https://img.shields.io/badge/adults-18%2B-red">
  <a href="https://paypal.me/supportkuraya"><img alt="Donate" src="https://img.shields.io/badge/donate-PayPal-00457C?logo=paypal"></a>
</p>

<!-- TESTERS-WANTED:START  (#1768: take out everything from here to TESTERS-WANTED:END when we have enough testers; the release notes copy this block automatically) -->
## 🧪 Beta testers wanted

Kuraya is in **beta**, and we are looking for a few people to try it on their own collection before the first stable release.

- **What you do:** install the latest **Setup** from [Releases](https://github.com/Fetterbr61/Kuraya/releases), use Kuraya with your own library for a week or two, and tell us what breaks, what is confusing and what is missing.
- **What you need:** a Windows 10/11 PC and a JAV collection (adults 18+ only). An NVIDIA graphics card helps for the subtitle features.
- **How to join:** [open a "Tester sign-up" issue](https://github.com/Fetterbr61/Kuraya/issues/new?title=Tester%20sign-up) and say roughly how many movies you have and which graphics card you use. Bugs and ideas go in [Issues](https://github.com/Fetterbr61/Kuraya/issues) too.

*This request will be taken down once we have enough testers.*
<!-- TESTERS-WANTED:END -->

---

## You don't have a collection problem. You have a *time* problem.

Thousands of files named `abp112.mp4`, `[HD]SONE-804-C.mkv`, `CD1`, `CD2`.
Half without covers. Japanese titles you can't read. Three copies of the same film on
three drives. No subtitles. And every tool you try does **one** of those jobs — then
leaves the other ten to you.

**Kuraya does all of it.** Point it at your drives and it identifies every film,
fetches the cover, title, cast, studio and genres, translates them into English,
files everything into a clean folder structure, finds the duplicates, makes English
subtitles from the audio — and plays it all in one place.

> Organisers show you what you have. **Kuraya does the work.**

---

## Why Kuraya and not the others

Most JAV tools fall into one of two camps. Kuraya is both — and then some.

| | Scraper tools | Media servers + plugins | **Kuraya** |
|---|:---:|:---:|:---:|
| Identify films by DVD-ID, fetch metadata & covers | ✅ | ⚠️ via plugins | ✅ **several sources at once, you pick the best** |
| See *every* source's result side by side | ❌ | ❌ | ✅ |
| Rename & file into a clean folder tree | ✅ | ❌ | ✅ **Studio → genres → film, under the 255-char limit** |
| Built-in player & cover browser | ❌ | ✅ | ✅ |
| Actress database with photos & bios | ⚠️ | ⚠️ | ✅ **multi-source, de-duplicated** |
| English titles & series names | ⚠️ | ❌ | ✅ **translated and written back to disk** |
| English **subtitles made from the audio** | ❌ | ❌ | ✅ **Whisper + AI translation, hands-off** |
| Duplicate detection (ID, file content, *sound*) | ❌ | ❌ | ✅ |
| Self-healing: health scans, repairs, quarantine | ❌ | ❌ | ✅ |
| Shrink huge files to HEVC — *proven* sound & picture | ❌ | ❌ | ✅ |
| Stream your own library to your phone | ❌ | ✅ | ✅ **free Android remote** |
| Browse & play any drive or LAN share — movies only | ❌ | ⚠️ | ✅ **built-in, no clutter** |
| Browse the tube sites inside the app | ❌ | ❌ | ✅ **built-in Tube browser, player & favourites** |
| Tested on a library of **18,000+ films** | — | — | ✅ |

*(✅ yes · ⚠️ partly / depends on setup · ❌ no — compared to typical tools in each camp.)*

---

## What it feels like

### 🧠 It knows every film
Kuraya reads the DVD-ID out of even the messiest file name, asks several movie
databases **at the same time**, and shows you every answer as a card: cover, title,
cast, genres. Take the best of each — or let automatic mode decide for a thousand films
while you sleep. Titles come back clean: no site watermarks, no junk tags, no 40-genre
soup (max 6, de-duplicated).

### 🗂️ It files your library like a librarian would
```
D:\Sorted\Natural High\Dominant-Men\Molester\Office-Lady\Train\NHDTC-216\
```
Studio first, then **who is in control, what happens, to whom, and where**. Browse it
in Kuraya or straight in Explorer. Paths are kept under Windows' 255-character limit
automatically — long titles are shortened in file names, never lost.

### 🈶 It gives you English subtitles — from the audio
No subtitle on the internet? Kuraya transcribes the Japanese speech on your own
graphics card (Whisper, with a model tuned for this content) and translates it into
natural English. A real subtitle you already have is **never overwritten**, and a
failed one is never written — no empty files pretending to be done.

### 🎭 It knows the cast
A full actress database: photos and bios from several sources, duplicates removed,
aliases understood. Click a name, see every film she is in.

### 🩺 It keeps itself healthy
A background guard checks your library in small steps while you use it: missing
covers, broken files, leftover junk, duplicate copies across drives. Safe fixes in one
click. Nothing is deleted without asking — and what is removed goes to a **quarantine**
first, so it can be put back.

### 💾 It saves you terabytes
Optional converter: re-encodes oversized files to HEVC, then **checks the length,
picture and sound** before it replaces anything. A result that is bigger, shorter or
silent is thrown away and the original kept.

### 📂 It plays anything, anywhere on your network
Not everything is in the library yet? The **Local & LAN browser** opens any drive or
network share and shows **only the movies** — no torrents, subtitles or installers in
the way. Sort, change the grid size and play straight away in Kuraya's own player.

### 📺 The tube sites, built in
The **Tube browser** searches the popular tube sites from inside Kuraya and plays the
videos in the same player — no browser tabs, no pop-up ads. Keep the ones you like as
**favourites** and find them again in one click.

### 📱 It comes with you
The free **Kuraya-Remote** Android app streams your own collection to any phone or
tablet in the house. Your files never leave your network.

---

## Your library stays yours

- **Local first.** Your files never leave your drives. No account, no cloud library.
- **No tracking.** Kuraya sends nothing to its developers — ever.
- **You choose the AI.** Local AI with Ollama on your own PC, or a cloud model only if
  *you* add a key. Movie lookups send just the DVD-ID.
- **Portable.** Everything Kuraya needs lives in its own folder. Delete the folder and
  it is gone. Nothing is installed into Windows.

---

## Get started in two minutes

1. Download **`Kuraya-Setup-<version>.exe`** from [Releases](../../releases) and run it.
   *(Windows may warn because the program is not signed: More info > Run anyway.)*
2. Updates: just run the newer Setup - it keeps all your settings and folders.
   *(Prefer portable? Use the `-win64.zip` - see the guide.)*
3. The **Setup** window walks you through it: choose your movie folders, and let
   Kuraya download the free helper tools it needs (FFmpeg and friends) into its own
   folder.

The full guide is **[How Kuraya works](docs/how-kuraya-works.md)** (also
`HOW_KURAYA_WORKS.txt` inside the download). What changed in each version:
**[CHANGELOG](CHANGELOG.md)**.

**Requirements:** Windows 10/11 (64-bit). An NVIDIA graphics card is recommended for
subtitle making and fast conversion. Docker Desktop for sites behind Cloudflare.

---

## ❤ Support Kuraya

Kuraya is free, with no ads and no tracking. If it saves you hours of sorting,
renaming and subtitle hunting, a donation keeps it growing — new sources, better
subtitles, more fixes.

<p align="center"><a href="https://paypal.me/supportkuraya"><img alt="Donate with PayPal" src="https://img.shields.io/badge/Donate-PayPal-00457C?style=for-the-badge&logo=paypal"></a></p>

**[paypal.me/supportkuraya](https://paypal.me/supportkuraya)** — any amount is appreciated. Thank you!

---

## Status

Kuraya is in **beta** — every main feature is in place and it has been tested on a
library of 18,000+ films, but you may meet bugs. Found one? Open an issue with the version number
(top of the log) and the file `Cashe\error_snapshot.txt`.

---

<p align="center"><sub>For adults (18+) only. Kuraya manages files you own; it does not
provide, host or download any video content.</sub></p>
