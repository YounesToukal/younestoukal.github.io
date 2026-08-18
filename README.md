# younestoukal.github.io

Personal academic website for Younes Toukal — a single scrolling page covering About,
Education, Research & Projects, Experience and Contact, with the CV always one click away.

Content and structure follow the convention used by most personal researcher sites (kept
lean, no skills/tools tag clouds, no soft-skills or volunteering sections) rather than
mirroring a CV one-to-one — see the commit history for the reasoning.

Plain HTML/CSS/JS. **No build step, no dependencies** — the only external requests are to
Google Fonts. Deploys directly on GitHub Pages.

## Structure

```
index.html                      the whole site (all content lives here)
static/css/index.css            all styling; theme variables in the :root block at the top
static/js/index.js              scroll reveal, active-nav highlight, footer year, theme toggle
static/images/                  headshot, favicon, social card
static/images/projects/         one photo per Research & Projects card
static/pdfs/CV.pdf              the CV the CV links open in a new tab
.nojekyll                       serve files verbatim, no Jekyll processing
```

## Editing

Everything is in **one file**, `index.html` — no build step, no template engine, no data
file to keep in sync. Open it in any text editor (VS Code, Notepad, GitHub's own web
editor — see [Publishing a change](#publishing-a-change) below), find the section you want
by its banner comment (`<!-- Research / Projects -->` etc.), and edit the text directly.
Every repeated block — a project, an education entry, an experience entry — is a
self-contained chunk you can copy, paste, delete or reorder freely; nothing elsewhere in the
file depends on how many of them there are.

Each of the recipes below is a copy-paste-and-fill-in-the-blanks operation. None of them
require touching the CSS or JS files.

### Add a project

In `index.html`, search for `TEMPLATE` inside the Research & Projects section — right above
`<div class="cards">` there's a commented-out block starting `<article class="card">`. Copy
everything between (and including) `<article class="card">` and `</article>`, paste it
anywhere inside `<div class="cards">…</div>`, then fill in the bracketed placeholders:

```html
<article class="card">
  <img class="card-image" src="./static/images/projects/PLACEHOLDER.svg"
       alt="[Project title] — placeholder">
  <div class="card-body">
    <h3 class="card-title">[Project title]</h3>
    <p class="card-org">[Venue, lab or collaborator — optional]</p>
    <p class="card-desc">
      [Two or three sentences: what it is, what was hard about it, what you built.]
    </p>
  </div>
</article>
```

Order on the page follows order in the file — move a card up or down by cutting and pasting
its whole `<article>…</article>` block earlier or later in the list.

### Remove a project

Delete everything from that project's `<article class="card">` to its matching `</article>`,
inclusive. Nothing else needs to change.

### Add a photo to a project

Every card already points at a placeholder image in `static/images/projects/`. Drop your
real photo or figure into that folder and either overwrite the placeholder file (keep the
same filename) or give it a new name and update the `src="…"` on that card's `<img>` — no
other markup changes needed. Any image works; it's cropped to fit automatically.

### Add a link to a project (paper, code, demo, report)

Copy the commented-out `.card-links` example in the first project card:

```html
<div class="card-links">
  <a class="link-arrow" href="[URL]" rel="noopener" target="_blank">Code</a>
  <a class="link-arrow" href="[URL]" rel="noopener" target="_blank">Report</a>
</div>
```

Paste it inside a card's `.card-body`, right after `.card-desc`, and edit the URLs and link
text (add or remove `<a>` lines freely). Cards without this block render cleanly as-is.

### Add an Education or Experience entry

Both sections use the same pattern. In the Education section, right above
`<ul class="timeline">`, there's a commented-out `TEMPLATE` block starting
`<li class="timeline-item">`. Copy it, paste it inside either section's `<ul>…</ul>`, and
fill in the blanks:

```html
<li class="timeline-item">
  <div class="timeline-date">[e.g. 2024 – Present, or just a year]</div>
  <div class="timeline-body">
    <h3 class="timeline-title">[Degree / role title]</h3>
    <p class="timeline-org">
      <img class="timeline-logo" src="./static/images/logos/PLACEHOLDER.svg" alt="">
      [Institution or organisation]
      <span class="timeline-location">[City, Country]</span>
    </p>
    <p class="timeline-detail">
      [One line of detail — thesis topic, key coursework, what the role involved.]
    </p>
  </div>
</li>
```

`.timeline-logo`, `.timeline-location` and `.timeline-detail` are all optional — delete any
you don't need. See Deep Learning Indaba in the Experience section for an example with no
detail line. To remove an entry, delete its whole `<li>…</li>`.

**Institution logos** — every entry has a small logo in `static/images/logos/` (currently
placeholder initial badges). Drop a real logo image in, same filename, done — it's
grayscale-filtered by CSS so any colour logo still sits calmly in the page. Any square-ish
image works.

### Edit the bio, role line or tagline

All three live in the Hero and About sections near the top of `index.html` — the role line
(`<p class="hero-role">`), the tagline underneath it, and the About paragraphs. Just edit the
text in place.

### Change contact info

Email, LinkedIn and GitHub each appear in two places — the Hero action row and the Contact
section — so update both when you change one. The email address only needs to be right in
the `href="mailto:…"`; the popover (see below) reads it from there automatically, so the
visible text can say anything.

**Email links** — any `<a class="email-link" href="mailto:…">` gets a click popover (full
address, Copy button, Send email link) from `static/js/index.js`, driven entirely by the
link's own `href`. Change the address there and the popover updates itself — nothing to edit
in the JS. Without JS the link still works as a plain mailto: link.

### Swap the photo

Replace `static/images/headshot.jpg` with your own image, same filename — or give it a new
name and update the `src="…"` on `<img class="hero-portrait">`. Works with any aspect ratio;
it's cropped to a square automatically.

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
| ACVSS date/location | Experience section |
| Deep Learning Indaba year/location | Experience section |
| Social card | `static/images/og-card.svg` → ideally a 1200×630 PNG |

Content has been fact-checked against your CV (`Resume - Younes Toukal.pdf`) — identity,
education, contact email and most experience entries are sourced from it directly, not
drafted. ACVSS and Deep Learning Indaba are the exceptions — you mentioned them directly but
they don't appear on that CV, so their dates are still placeholders.

The Skills, Soft Skills, Volunteering and "Other Training" sections from an earlier pass
were removed after comparing against real researcher personal sites (Zamir, Bachmann,
Atanov, and others) — none of them carry that kind of CV-style content, so it didn't belong
here either. What's left maps closely to what those sites actually include.

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
