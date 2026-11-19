# Portfolio

## 1. Product
- Personal portfolio of Adrián Vázquez (DAM student, Salesianos). Static site, UI copy in Spanish.
- Two pages: `index.html` (hero, 3D project "staircase", contact call-to-action) and `contact.html` (contact form).
- Projects are cards on a 3D spiral staircase (three.js). Scrolling down descends the stairs (card 01 at the top); click a card (or Enter) opens a detail panel; Esc closes it.
- Users: recruiters and people who want to contact him (inferred from the copy: "abierto a prácticas, colaboraciones").

## 2. Data and backend
- No backend, no database, no build step. All project data lives in `js/projects.js` (`window.PROJECTS`).
- Contact form posts to the FormSubmit service (`https://formsubmit.co/<address>`, address hard-coded in `contact.html`); nothing is stored here.
- Production URL: `https://portfolio-psi-brown-11.vercel.app` (used in the `og:*`/`twitter:*` meta tags of both pages and as the `_next` fallback in `contact.html`).
- Do not touch: the `name`/hidden `_*` fields of the form (FormSubmit options), the `form-next` id (used by the inline script in `contact.html`), and the element ids used by `js/helix.js` and `js/main.js`
  (`helix`, `helix-stage`, `projects`, `hud-*`, `detail*`, `toast`, `cursor-trail`).

## 3. Stack (no package files; versions taken from the HTML)
- Plain HTML5, CSS and vanilla JavaScript (IIFEs, no modules, no bundler).
- three.js 0.160.0 loaded from cdnjs (`https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js`).
- Google Fonts: Inter (400-600) and Syne (700-800).
- Script order matters in `index.html`: three.js -> `projects.js` (defines `window.PROJECTS`) -> `helix.js` -> `main.js`.

## 4. Folder map
- `index.html` - main page: hero, `#projects` stage with the canvas, contact section, toast.
- `contact.html` - contact form page (no JS files; a small inline script sets `_next` to the current origin).
- `css/style.css` - all styles for both pages.
- `js/projects.js` - project cards data (title, course, tag, summary, description, stack, links, image, hue).
- `js/helix.js` - three.js scene: stairs, cards, dither shader, scroll pose, HUD, detail panel; plain project list if three.js fails to load.
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
- Cache busting: `?v=N` per file in `index.html` (e.g. `helix.js?v=10`) (`contact.html` only loads the CSS). Bump the number in every page that references the file after changing it.
- To add a project: copy a block in `js/projects.js` and fill `title, course, tag, summary, description, stack, links, image, hue`,
  plus `status: "wip"` (in development: shows a toast, never opens) or `web` (published URL). A finished project opens the panel if it has `web` or any `links`
  (the panel shows "Ver web" when `web` exists, then `links`, e.g. `{ label: "Código", url }`); with neither it shows a toast.
  `image` is a 768x512 picture file in `assets/` (no base64). Without `image` the card uses a gradient from `hue`.
- `prefers-reduced-motion`: no cursor trail; the helix keeps the scroll-driven pose but has no dither animation, entry scale-in or scroll smoothing.
- Existing comments and UI text are in Spanish; new code and comments in English (global rule). UI text stays Spanish.

## 7. Design system
- Tokens in `css/style.css` `:root`: `--bg #050505`, `--fg #f4f4f4`, `--muted rgba(244,244,244,.55)`. Black and white only, no accent colour.
- Headings use Syne 800 with negative letter-spacing; body uses Inter.
- Buttons and links are pills (`border-radius: 999px`); panels use 14px and 24px radii; white fill on dark for primary actions.
- No shared component library; reuse existing classes (`.kicker`, `.hero-text`, `.contact-links a`, `.detail-*`).
- No emoji. Keep new UI inside this palette.

## 8. Environment variables
- None. No `.env`, no secrets. The FormSubmit target address is public in `contact.html`.

## 9. Git
- Repository on branch `main`, remote `origin` = `https://github.com/aadrriiann/portfolio.git`. Features are merged into `main` with merge commits.
- Branches `feature/*`, `fix/*`; Conventional Commits, e.g. `feat(projects): add Battleverse card` (global rules). Do not push without being asked.

## 10. Known problems
- None known.
