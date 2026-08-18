# younestoukal.github.io

Personal academic website for Younes Toukal — a single, dense, text-first column covering
Hero, About Me, News, Selected Projects, Activities & Training and Contact, with the CV
always one click away.

Structure follows the "dense faculty-page" convention seen on some personal researcher sites
(Amir Zamir's, for one) rather than the wider, more spaced-out card layout most other
personal sites use — one narrow column, a small-caps label above each block, thumbnail-left
rows for projects, a compact logo timeline for activities. See the commit history for the
reasoning.

Plain HTML/CSS/JS. **No build step, no dependencies** — the only external requests are to
Google Fonts. Deploys directly on GitHub Pages.

## Structure

```
index.html                      the one-page site (Hero, About Me, News, Selected Projects, Activities & Training, Contact)
acvss.html                      ACVSS detail page, linked from its Activities row
deep-learning-indaba.html       Deep Learning Indaba detail page, linked from its Activities row
ai-forge.html                   AI Forge Training detail page, linked from its Activities row
static/css/index.css            all styling; theme variables in the :root block at the top
static/js/index.js              scroll reveal, active-nav highlight, email popover, theme toggle
static/images/                  headshot, favicon, social card
static/images/projects/         one thumbnail per Selected Projects row
static/images/logos/            one logo per Activities & Training row
static/images/experience/*/     photo gallery for each Activities detail page (folder name is
                                 a legacy holdover from an earlier "Experience" section name)
static/pdfs/CV.pdf              the CV the CV links open in a new tab
.nojekyll                       serve files verbatim, no Jekyll processing
```

## Editing

Everything is in **one file**, `index.html` — no build step, no template engine, no data
file to keep in sync. Open it in any text editor (VS Code, Notepad, GitHub's own web
editor — see [Publishing a change](#publishing-a-change) below), find the block you want by
its banner comment (`<!-- Selected Projects -->` etc. — each block also has its own `<h2>`
with matching text, so Ctrl+F for the heading works too), and edit the text directly. Every
repeated row — a project, an activity, a news item — is a self-contained chunk you can copy,
paste, delete or reorder freely; nothing elsewhere in the file depends on how many there are.

Each of the recipes below is a copy-paste-and-fill-in-the-blanks operation. None of them
require touching the CSS or JS files.

### Add a project

In `index.html`, inside the **Selected Projects** section (`id="research"`), there's a
commented-out `TEMPLATE` block right above the first row, starting `<div class="project-row">`.
Copy everything between (and including) that `<div class="project-row">` and its matching
`</div>`, paste it anywhere among the other project rows, and fill in the blanks:

```html
<div class="project-row">
  <img src="./static/images/projects/PLACEHOLDER.svg" alt="[Project title] — placeholder">
  <div>
    <div class="project-row-title"><a href="[URL]" rel="noopener" target="_blank">[Project title]</a></div>
    <div class="project-row-org">[Venue, lab, dataset or collaborator]</div>
  </div>
</div>
```

`.project-row-org` is optional — delete it for a project with no venue/context line. Order on
the page follows order in the file — move a row up or down by cutting and pasting its whole
`<div class="project-row">…</div>` block earlier or later in the list.

### Remove a project

Delete everything from that project's `<div class="project-row">` to its matching `</div>`,
inclusive. Nothing else needs to change.

### Add a photo to a project

Every row already points at a placeholder image in `static/images/projects/`. Drop your real
photo or figure into that folder and either overwrite the placeholder file (keep the same
filename) or give it a new name and update the `src="…"` on that row's `<img>` — no other
markup changes needed. Any image works; it's cropped to fit automatically.

### Change a project's link

Each row's title is already a link:

```html
<div class="project-row-title"><a href="[URL]" rel="noopener" target="_blank">[Project title]</a></div>
```

Just edit the `href` — every project link currently points at
`github.com/younestoukal/<slug>`, which doesn't exist yet, so this is a TODO for all six.

### Add an Activities & Training entry

In the **Activities & Training** section (`id="experience"`), there's a commented-out
`TEMPLATE` block right above the first row, starting `<div class="activity-row">`. Copy it,
paste it anywhere among the other rows, and fill in the blanks:

```html
<div class="activity-row">
  <img src="./static/images/logos/PLACEHOLDER.svg" alt="">
  <span class="activity-row-date">[e.g. 2024, or a range]</span>
  [Title], [institution/organisation], [city, country]. [One optional clause of detail.]
</div>
```

Wrap `[Title]` in `<a href="./your-page.html">…</a>` if the entry links to its own detail
page (see below); otherwise leave it as plain text. To remove an entry, delete its whole
`<div class="activity-row">…</div>`.

**Logos** — every entry has a small logo in `static/images/logos/`, shown at its real colours
(no filter). Drop a new logo image in, same filename, done — any square-ish image works.

**Linking an entry to its own page** — `acvss.html`, `deep-learning-indaba.html` and
`ai-forge.html` are standalone pages (same nav chrome as `index.html`, reusing `index.css`)
with a description and a photo gallery. To give a new entry the same treatment: copy one of
these three files as a starting point, edit the title/meta/body/gallery, save it at the repo
root with a new filename, then wrap that entry's title text in
`<a href="./your-new-page.html">…</a>` back in `index.html`.

Every gallery photo is a placeholder in `static/images/experience/<page>/` — same drop-in
swap as any other photo on the site, and you can add more `<img>` tags to a gallery; the grid
reflows on its own.

**Clicking a gallery photo** opens it large with a lightbox (prev/next, arrow keys, a "2 / 3"
counter) — `static/js/index.js` wires this up automatically for any `.gallery` on any page, so
a new gallery on a new detail page gets it for free, no extra markup needed. A gallery with
just one photo works too; the counter and nav arrows only appear once there's more than one.

### Add or remove a News update

In the **News** section, there's a `<ul class="news-plain">` — newest entry first. Copy one
`<li>` to add an entry, or delete one to remove it:

```html
<li><span class="news-plain-date">[Month Year]</span>[What happened — a link is fine.]</li>
```

Every entry stays visible at once, on purpose — this is meant to be scanned in a glance, not
stepped through. Keep new entries newest-first; the newest date is coloured automatically by
CSS (`.news-plain li:first-child`), nothing to set by hand.

### Edit the bio, role line or degrees

The role line (`<p class="hero-role">`) is in the Hero block near the top of `index.html`.
The bio itself is the `<div class="content prose">` inside the **About Me** section — three
plain paragraphs, edit the text directly. The two degrees are folded into the last row of
**Activities & Training** rather than kept as a separate Education section; edit that row the
same way as any other activity row.

### Change contact info

Email, LinkedIn and GitHub live in one place — the **Contact** section's `<p class="contact-row">`
— plain text links, no icons:

```html
<a class="email-link" href="mailto:…">…</a>
<a href="…" rel="noopener" target="_blank">LinkedIn</a>
<a href="…" rel="noopener" target="_blank">GitHub</a>
<span class="contact-row-location">Algiers, Algeria</span>
```

**Email links** — any `<a class="email-link" href="mailto:…">` gets a click popover (full
address, Copy button, Send email link) from `static/js/index.js`, driven entirely by the
link's own `href`. Change the address there and the popover updates itself — nothing to edit
in the JS. Without JS the link still works as a plain mailto: link.

### Swap the photo

Replace `static/images/headshot.jpg` with your own image, same filename — or give it a new
name and update the `src="…"` on `<img class="about-photo">` in the **About Me** section.
Works with any aspect ratio; it's cropped to a square automatically.

### Change the accent colour

The top of `static/css/index.css` defines every colour as a named custom property, including
a separate dark-mode palette. Changing the accent is one line:

```css
:root { --accent: #873d32; }   /* chestnut */
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

Everything still to be filled in is marked with a `TODO` comment. To list them:

```powershell
Select-String -Path index.html -Pattern TODO
```

| What | Where |
|---|---|
| CV | `static/pdfs/CV.pdf` → overwrite with the real file, same name, no HTML change needed |
| Google Scholar | commented-out block in the hero; uncomment when you have a profile |
| 6 project photos | `static/images/projects/*.svg` → replace with real photos/figures |
| 6 project links | every row's link points at `github.com/younestoukal/<slug>`, which doesn't exist — replace with the real URL |
| 9 Activities gallery photos | `static/images/experience/*/photo-*.svg` → replace with real photos |
| Social card | `static/images/og-card.svg` → ideally a 1200×630 PNG |

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
