# younestoukal.github.io

Personal academic website for Younes Toukal — an al-folio-style layout (fixed navbar and
scroll-progress bar, floated profile photo, bibliography-row project list, a compact logo
timeline for activities) covering About, News, Selected Work, Activities & Training and
Contact, with a matching CV page and light/dark theme toggle.

Plain HTML/CSS/JS. **No build step, no dependencies** — the only external requests are to
Google Fonts. Deploys directly on GitHub Pages.

## Structure

```
index.html                      the homepage (About, News, Selected Work, Activities & Training, Contact)
cv.html                         the CV page, linked from the navbar's "cv" item
acvss.html                      ACVSS detail page, linked from its Activities row
deep-learning-indaba.html       Deep Learning Indaba detail page, linked from its Activities row
ai-forge.html                   AI Forge Training detail page, linked from its Activities row
static/images/                  headshot, favicon, social card
static/images/projects/         one thumbnail per Selected Work row
static/images/logos/            one logo per Activities & Training row
static/images/experience/*/     photo gallery for each Activities detail page
static/pdfs/CV.pdf              the file the CV page's PDF icon opens in a new tab
.nojekyll                       serve files verbatim, no Jekyll processing
```

Each of the five HTML files is self-contained — its own `<style>` block, not a shared
stylesheet — so there's no `static/css/index.css` to keep in sync; every colour is a custom
property in that file's own `:root` block near the top (see
[Change the accent colour](#change-the-accent-colour)).

`index-old.html`, `acvss-old.html`, `deep-learning-indaba-old.html` and
`ai-forge-old.html` are the previous dense-single-column design, kept as a reference/backup —
not linked from anywhere live.

## Editing

No build step, no template engine, no data file to keep in sync. Open the file you want in
any text editor (VS Code, Notepad, GitHub's own web editor — see
[Publishing a change](#publishing-a-change) below), find the block by its `<h2>` heading or
`id`, and edit the text directly. Every repeated row — a News entry, a Selected Work item, an
Activities row, a gallery photo — is a self-contained chunk you can copy, paste, delete or
reorder freely; nothing elsewhere in the file depends on how many there are.

Each of the recipes below is a copy-paste-and-fill-in-the-blanks operation, using the
commented-out `TEMPLATE` block sitting right above the first entry in each list.

### Add or remove a News update

In `index.html`'s **News** section (`id="news"`), copy one `<tr>` row (newest first) to add
an entry, or delete one to remove it:

```html
<tr><th>[Month Year, or just a year]</th><td>[What happened — a <a href="...">link</a> is fine.]</td></tr>
```

### Add or remove a Selected Work item

In `index.html`'s **Selected Work** section (`id="work"`), copy an `<li>` block from
`ol.bibliography` and fill in the blanks:

```html
<li>
  <div class="bib-row">
    <div class="bib-thumb"><img src="./static/images/projects/PLACEHOLDER.svg" alt=""></div>
    <div class="bib-body">
      <div class="bib-title">[Project title]</div>
      <div class="bib-author"><em>Younes Toukal</em></div>
      <div class="bib-periodical"><em>[Venue, lab or context]</em>, [Year]</div>
      <div class="bib-links">
        <a href="[URL]" rel="noopener" target="_blank">Code</a>
      </div>
    </div>
  </div>
</li>
```

`.bib-links` is optional — drop the whole `div` for an item with nothing to link to. Delete
the whole `<li>…</li>` to remove an item.

### Add a photo to a Selected Work item

Every row points at a placeholder image in `static/images/projects/`. Drop your real photo or
figure into that folder and either overwrite the placeholder file (keep the same filename) or
give it a new name and update the row's `src="…"` — no other markup changes needed. Any image
works; it's cropped to fit automatically.

### Add or remove an Activities & Training entry

In `index.html`'s **Activities & Training** section (`id="activities"`), copy an `<li>` block
from `ol.activities` and fill in the blanks:

```html
<li>
  <div class="act-row">
    <div class="act-thumb"><img src="./static/images/logos/PLACEHOLDER.svg" alt=""></div>
    <div class="act-body">
      <div class="bib-title">[Title]</div>
      <div class="bib-periodical">[Date] &middot; [City, country] &middot; [Organisation]</div>
    </div>
  </div>
</li>
```

Wrap `[Title]` in `<a href="./your-page.html">…</a>` if the entry links to its own detail page
(see below); otherwise leave it as plain text. Delete the whole `<li>…</li>` to remove an
entry.

**Logos** — every entry has a small logo in `static/images/logos/`, framed in a uniform chip
so differently-sized/coloured source images still sit consistently. Drop a new logo image in,
same filename, done — any square-ish image works.

**Linking an entry to its own page** — `acvss.html`, `deep-learning-indaba.html` and
`ai-forge.html` are standalone detail pages (same navbar as `index.html`, a photo gallery with
a click-to-enlarge lightbox). To give a new entry the same treatment: copy one of these three
files as a starting point, edit the title/meta/body/gallery, save it at the repo root with a
new filename, then wrap that entry's title text in `<a href="./your-new-page.html">…</a>` back
in `index.html`.

Every gallery photo is a placeholder in `static/images/experience/<page>/` — same drop-in swap
as any other photo, and you can add more `<img>` tags to `.gallery`; the grid and the lightbox
both pick up new photos automatically, no other markup to touch.

### Edit the bio or research interests

The bio is the `<div class="clearfix">` inside the **About** section of `index.html` — plain
paragraphs and a `<ul>`, edit the text directly.

### Change contact info

Email, GitHub and LinkedIn live in the footer's `.contact-icons` row at the bottom of
`index.html` — three icon links:

```html
<a href="mailto:…" title="email">…</a>
<a href="…" rel="noopener" target="_blank" title="GitHub">…</a>
<a href="…" rel="noopener" target="_blank" title="LinkedIn">…</a>
```

Just edit the `href` on the one you want to change.

### Swap the photo

Replace `static/images/headshot.jpg` with your own image, same filename — or give it a new
name and update the `src="…"` on `<img>` inside `.profile` in the **About** section. Works
with any aspect ratio; it's cropped to fit automatically.

### Change the accent colour

Each of the five HTML files defines its own colours as named custom properties near the top
of its `<style>` block, in both the light (`:root`) and dark-mode blocks. Changing the accent
means editing `--theme` in all five files:

```css
:root{ --theme:#ea4335; }
```

## Publishing a change

**Without git or a terminal, straight from the browser** — go to the repository on
github.com, click into `index.html` (or any file), click the pencil icon to edit, make your
change, and click "Commit changes" at the bottom. GitHub Pages rebuilds automatically and the
live site updates within a minute or two. This works for any file in the repo, including
images — use "Add file → Upload files" to add a photo.

**With git, from a local clone** — edit the file, [preview it locally](#preview-locally) to
check it looks right, then:

```powershell
git add -A
git commit -m "Describe what changed"
git push
```

Same result: Pages rebuilds automatically after the push.

## Remaining placeholders

Everything still to be filled in:

| What | Where |
|---|---|
| CV | `static/pdfs/CV.pdf` → overwrite with the real file, same name, no HTML change needed |
| Selected Work photos | `static/images/projects/*.svg` → replace with real photos/figures |
| Selected Work links | every item's `[Code]` link points at `github.com/younestoukal/<slug>`, which doesn't exist — replace with the real URL |
| Activities gallery photos | `static/images/experience/*/photo-*.svg` → replace with real photos |

Content has been fact-checked against your CV (`Resume - Younes Toukal.pdf`) — identity,
education, contact email and most Activities entries are sourced from it directly, not
drafted. ACVSS and Deep Learning Indaba are the exceptions — you mentioned them directly and
they don't appear on that CV, so their dates and locations were confirmed separately (ACVSS:
19–29 Jul 2026, Google AICC, Accra, Ghana — acvss.ai; Deep Learning Indaba: 2–7 Aug 2026,
Pan-Atlantic University, Lagos, Nigeria — deeplearningindaba.com).

## Preview locally

Any static server works. With Node installed:

```powershell
npx --yes serve .
```

Then open the URL it prints. Opening `index.html` directly via `file://` also works.

## Initial setup

Already done for this repo — kept here for reference. The repository must be named exactly
`younestoukal.github.io` for the user-site URL to work with no configuration.

```powershell
git remote add origin https://github.com/younestoukal/younestoukal.github.io.git
git push -u origin main
```

Then in the repository: **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
The site goes live at <https://younestoukal.github.io> within a minute or two. After that,
every future change just needs [Publishing a change](#publishing-a-change) above.

## Licence

All rights reserved — see [LICENSE](LICENSE).
