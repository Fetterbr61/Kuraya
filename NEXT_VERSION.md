# Coming in the next version of Kuraya

Changes made since the last public release (**2.0.5-beta.5**). They arrive with the next update; this page grows as the work goes on.

- Movie Sorter: the Synonyms and Blacklist tabs now say they come ready-made and when you would change them
- Searching for several names with a comma (for example two actresses) now works everywhere; names stored with an underscore were not found once a comma was typed
- Every search box in Kuraya now follows the same rule: space = all words, comma = any of them. Before, about fifteen boxes (Settings, Movie Sorter, blacklists, the actors view and more) each searched their own way. New Releases' actress search takes several names with a comma
- Every search box also looks the same now: same colours in every theme, a clear (x) button as soon as you type, and a short note saying what space and comma do - hover the magnifier for the full explanation
- The PC no longer freezes for several seconds when the phone remote refreshes its movie list - the list is now built from what Kuraya already knows instead of looking into every movie folder
- The "Clean Cache" toolbar button (the bin with a clock) no longer freezes Kuraya for about 12 seconds - it checks the folders in the background
- Pressing play on the phone remote no longer freezes the PC for several seconds when the movie's drive has to wake up
- "Remove actor from all files" works again - it could not find the movie files after the folder rename, so nothing was removed
- Settings: every API key field has a button that opens the page where you create or change the key
- Genre Location Review: the "I understand" box before moving folders can be ticked again - before, Apply never became active when folders had to move
- The faint Kuraya logo is now the background of Settings, Media Tools, Tube Search and the Local & LAN browser too, not only the main screen
- Help → What every button does: the full list is now a manual with 12 chapters in the order you meet them in Kuraya (Getting started, Main screen, a movie, Inbox, Scraping, ... Settings), with the names you see on screen
- Task Console: Actor Photos & Bios is now a box like the others. Tick it to fetch photos and bios for the actors waiting in the queue, untick it to stop; nothing in the queue is lost. The actors of the movie open in the scraper window still get their photos straight away
- Actor photos: when a photo site cannot be reached (Warashi has been down since late October), an actress is no longer marked 'no photo found' - she is tried again later instead of being given up on
- Actor photos: javmodel.com is a new source for photos and bios (birthday, height, measurements, blood type, Japanese name) while Warashi is down. Its photos now carry the javmodel label, and the Scraping Stopped box lists what this run found per site instead of the photos already on disk
- Sort By Badge Letters: "N - Missing NMP" listed almost the whole library (18954 of 18982) and "F - Missing Fanart" listed movies whose cards show fanart. The filters now use the same rule as the letters on the card
- The cause is fixed too: the library scan, moves, renames and edits no longer forget whether a movie has its NMP, fanart and poster files. One Scan Library brings the existing movies right
- Same kind of fixes found in a check: re-scraping an inbox movie with a new DVD-ID no longer moves it out of the inbox; the Chinese/Japanese/English burned-subs filters no longer show old numbers after a Pre-Inbox run; the T/E/D filters read the same subtitle files as the letters on the card
- "F - Missing Fanart" listed every inbox movie: the inbox scan, the single-movie rescan and the edit windows set only the NMP flag. They now set fanart and poster too, and the check that guards this now demands all three
