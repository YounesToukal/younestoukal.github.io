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

**Content** — all of it is in `index.html`. Sections are separated by banner comments.

**Email links** — any `<a class="email-link" href="mailto:...">` gets a click popover
(full address, Copy button, Send email link) from `static/js/index.js`, driven entirely by
the link's own `href` — change the address there and the popover picks it up automatically.
Without JS the link still works as a plain mailto: link.

**Theme** — the top of `static/css/index.css` defines every colour, font and dimension as a
custom property, including a dark-mode variant. Changing the accent is one line:

```css
:root { --accent: #873d32; }   /* chestnut */
```

**Adding a photo to a project card** — every card already has an `<img>` pointed at a
placeholder in `static/images/projects/`. Drop the real photo/figure in, keep (or update)
the filename, done — same pattern as the headshot. No other markup changes needed.

**Adding a link to a project card** (paper, code, demo, report) — copy the commented-out
`.card-links` example in the first card. Cards without one render cleanly as-is.

**Adding another Experience entry** — copy one `<li class="timeline-item">` block in the
Experience section (it reuses the same compact timeline as Education) and edit its contents;
nav highlighting and scroll-reveal pick it up automatically.

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

## Deploy

The repository must be named exactly `younestoukal.github.io` for the user-site URL to work
with no configuration.

```powershell
git remote add origin https://github.com/younestoukal/younestoukal.github.io.git
git push -u origin main
```

Then in the repository: **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
The site goes live at <https://younestoukal.github.io> within a minute or two.

## Licence

All rights reserved — see [LICENSE](LICENSE).
