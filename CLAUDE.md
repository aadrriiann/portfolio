# Portfolio

## 1. Product
- Personal portfolio of Adrián Vázquez (DAM student, Salesianos). Static site, UI copy in Spanish.
- Three pages: `index.html` (hero, 3D project "staircase", contact call-to-action), `project.html?p=<slug>` (project case study) and `contact.html` (contact form).
- Projects are cards on a 3D spiral staircase (three.js). Scrolling down descends the stairs (card 01 at the top); click a finished card (or Enter) opens its page in the same tab; a wip card shows a toast.
- The project page's "Volver a proyectos" links to `index.html#p=<slug>`, which jumps the staircase straight to that card.
- Users: recruiters and people who want to contact him (inferred from the copy: "abierto a prácticas, colaboraciones").

## 2. Data and backend
- No backend, no database, no build step. All project data lives in `js/projects.js` (`window.PROJECTS`), which also defines `window.projectHelpers` (`isWip`, `statusMeta`, `pageUrl`) shared by `helix.js` and `project.js`.
- Contact form posts to the FormSubmit service (`https://formsubmit.co/<address>`, address hard-coded in `contact.html`); nothing is stored here.
- Production URL: `https://portfolio-psi-brown-11.vercel.app` (used in the `og:*`/`twitter:*` meta tags of both pages and as the `_next` fallback in `contact.html`).
- Do not touch: the `name`/hidden `_*` fields of the form (FormSubmit options), the `form-next` id (used by the inline script in `contact.html`), and the element ids used by `js/helix.js`, `js/project.js` and `js/main.js`
  (`helix`, `helix-stage`, `projects`, `hud-*`, `project`, `toast`, `cursor-trail`).
- OG tags of `project.html` are static generic values (no build step to generate them per project).

## 3. Stack (no package files; versions taken from the HTML)
- Plain HTML5, CSS and vanilla JavaScript (IIFEs, no modules, no bundler).
- three.js 0.160.0 loaded from cdnjs (`https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js`).
- Google Fonts: Inter (400-600) and Syne (700-800).
- Script order matters: `index.html` three.js -> `projects.js` (defines `window.PROJECTS`) -> `helix.js` -> `main.js`; `project.html` `projects.js` -> `project.js` -> `main.js`.

## 4. Folder map
- `index.html` - main page: hero, `#projects` stage with the canvas, contact section, toast.
- `project.html` - project page shell (`#project`, contact section, toast); content rendered by `js/project.js`.
- `contact.html` - contact form page (no JS files; a small inline script sets `_next` to the current origin).
- `css/style.css` - all styles for both pages.
- `js/projects.js` - project data (slug, title, course, tag, summary, description, stack, links, image, hue, details) and shared helpers.
- `js/helix.js` - three.js scene: stairs, cards, dither shader, scroll pose, HUD, card click to the project page, `#p=<slug>` return; plain project list (titles link to the pages) if three.js fails to load.
- `js/project.js` - reads `?p=<slug>` and renders the project page (header, cover, sections, `<dialog>` gallery lightbox, previous/next); "Proyecto no encontrado." for unknown or wip slugs.
- `js/main.js` - success toast (`?success=1`) and the cursor-trail canvas.
- `assets/` - card images (`beavr-crm.png`, `rankgym.png`, `tull.jpg`) and the 1200x630 link-preview image `og-image.png`.

## 5. Commands (run from `Portfolio/`)
- Install: none.
- Dev: `python -m http.server 8000`, then open `http://localhost:8000`.
- Lint / typecheck / test: TODO (none configured).
- Build: none; the folder is deployed as is.

## 6. Code conventions
- Reference file: `js/main.js` (small IIFE, `const` + arrow functions, 2-space indent, double quotes, semicolons).
- CSS: class-based, `:root` custom properties, one section per area with a `/* ---------- ... ---------- */` banner, breakpoint at `max-width: 720px`.
- Cache busting: `?v=N` per file in every page that loads it (e.g. `helix.js?v=13`); `index.html`, `project.html` and `contact.html` share the same numbers. Bump the number in every page that references the file after changing it.
- To add a project: copy a block in `js/projects.js` and fill `slug, title, course, tag, summary, description, stack, links, image, hue`,
  plus `status: "wip"` (in development: shows a toast, has no page) or `web` (published URL). Every finished project opens `project.html?p=<slug>`
  (its header shows "Ver web" when `web` exists, then `links`, e.g. `{ label: "Código", url }`).
  `image` is a 768x512 picture file in `assets/` (no base64). Without `image` the card and the page cover use a gradient from `hue`.
- Optional `details` (every field optional) fills the project page: `overview` (fallback `description`), `role`, `features: [text]`,
  `tech: [{ name, use }]` (fallback: `stack` as chips), `learned`, `gallery: [{ src, caption }]`. Sections without data are not rendered.
- `prefers-reduced-motion`: no cursor trail; the helix keeps the scroll-driven pose but has no dither animation, entry scale-in or scroll smoothing.
- Existing comments and UI text are in Spanish; new code and comments in English (global rule). UI text stays Spanish.

## 7. Design system
- Tokens in `css/style.css` `:root`: `--bg #050505`, `--fg #f4f4f4`, `--muted rgba(244,244,244,.55)`. Black and white only, no accent colour.
- Headings use Syne 800 with negative letter-spacing; body uses Inter.
- Buttons and links are pills (`border-radius: 999px`); panels use 14px and 24px radii; white fill on dark for primary actions.
- No shared component library; reuse existing classes (`.kicker`, `.hero-text`, `.contact-links a` pills with `.pill-primary` for the white-fill action, `.chip-list`).
- Project HUD sits on the left, vertically centred (bottom on mobile); a soft gradient (`#helix-stage::before`) keeps it readable over the stairs.
- Project page: centred 1080px column, sections as `.kicker` + Syne h2, 1px `rgba(255,255,255,.12)` borders on images, 2-column lists/gallery that collapse to 1 at 720px; no entrance animations.
- No emoji. Keep new UI inside this palette.

## 8. Environment variables
- None. No `.env`, no secrets. The FormSubmit target address is public in `contact.html`.

## 9. Git
- Repository on branch `main`, remote `origin` = `https://github.com/aadrriiann/portfolio.git`. Features are merged into `main` with merge commits.
- Branches `feature/*`, `fix/*`; Conventional Commits, e.g. `feat(projects): add Battleverse card` (global rules). Do not push without being asked.

## 10. Known problems
- None known.
