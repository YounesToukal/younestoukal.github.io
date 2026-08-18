# younestoukal.github.io

Personal academic website for Younes Toukal — a single scrolling page covering About,
Education, Research & Projects, Experience, Skills and Contact, with the CV always one
click away.

Plain HTML/CSS/JS. **No build step, no dependencies** — the only external requests are to
Google Fonts. Deploys directly on GitHub Pages.

## Structure

```
index.html                      the whole site (all content lives here)
static/css/index.css            all styling; theme variables in the :root block at the top
static/js/index.js              scroll reveal, active-nav highlight, footer year, theme toggle
static/images/                  headshot, favicon, social card
static/images/projects/         one photo per Research & Projects card
static/images/experience/       one photo per Experience entry
static/pdfs/CV.pdf              the CV the Download buttons point at
.nojekyll                       serve files verbatim, no Jekyll processing
```

## Editing

**Content** — all of it is in `index.html`. Sections are separated by banner comments.

**Theme** — the top of `static/css/index.css` defines every colour, font and dimension as a
custom property, including a dark-mode variant. Changing the accent is one line:

```css
:root { --accent: #873d32; }   /* chestnut */
```

**Adding a photo to a project card or Experience entry** — every card and Experience entry
already has an `<img>` pointed at a placeholder in `static/images/projects/` or
`static/images/experience/`. Drop the real photo in, keep (or update) the filename, done —
same pattern as the headshot. No other markup changes needed.

**Adding another Experience entry** — copy one `<li class="experience-item">` block in the
Experience section and edit its contents; the layout, nav highlighting and scroll-reveal all
pick it up automatically.

## Remaining placeholders

Everything still to be filled in is marked with a `TODO` comment. To list them:

```powershell
Select-String -Path index.html -Pattern TODO
```

| What | Where |
|---|---|
| CV | `static/pdfs/CV.pdf` → overwrite with the real file, same name, no HTML change needed |
| Public email | `index.html` — appears in the hero button and the contact list |
| LinkedIn URL | `index.html` — hero button and contact list |
| Google Scholar | commented-out block in the hero; uncomment when you have a profile |
| USTHB degree details | Education section — exact title and years |
| Poster judging venue | Academic Service line |
| 6 project photos | `static/images/projects/*.svg` → replace with real photos/figures |
| ACVSS dates, location, role | Experience section |
| Deep Learning Indaba details | Experience section — year, location, role, what you did there |
| 2 experience photos | `static/images/experience/*.svg` → replace with real photos |
| Social card | `static/images/og-card.svg` → ideally a 1200×630 PNG |

The bio in the About section is a **draft** written from the project plan, not dictated —
read it and edit before publishing.

## Preview locally

Any static server works. With Node installed:

```powershell
npx --yes serve .
```

Then open the URL it prints. Opening `index.html` directly via `file://` also works, though
the `download` attribute on the CV button behaves differently there.

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
