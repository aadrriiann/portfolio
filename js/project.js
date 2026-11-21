(() => {
  const root = document.getElementById("project");
  const { isWip, statusMeta, pageUrl } = window.projectHelpers;
  const slug = new URLSearchParams(window.location.search).get("p");
  const project = window.PROJECTS.find((p) => p.slug === slug);

  function textEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = text;
    return el;
  }

  function linkEl(label, url, className) {
    const a = textEl("a", className, label);
    a.href = url;
    return a;
  }

  function externalLink(label, url, className) {
    const a = linkEl(label, url, className);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  // Pill links reuse the contact call-to-action look.
  function pills(className, links) {
    const row = textEl("div", className ? `contact-links ${className}` : "contact-links", "");
    row.append(...links);
    return row;
  }

  function button(className, text, label, onClick) {
    const b = textEl("button", className, text);
    b.type = "button";
    b.setAttribute("aria-label", label);
    b.addEventListener("click", onClick);
    return b;
  }

  function section(kicker, title, content) {
    const s = document.createElement("section");
    s.className = "project-section";
    s.append(textEl("p", "kicker", kicker), textEl("h2", "", title), content);
    return s;
  }

  function list(tag, className, items, render) {
    const el = document.createElement(tag);
    el.className = className;
    el.append(...items.map(render));
    return el;
  }

  function renderMissing() {
    document.title = "Proyecto no encontrado — Adrián Vázquez";
    const box = textEl("div", "project-missing", "");
    box.append(
      textEl("h1", "", "Proyecto no encontrado."),
      pills("", [linkEl("← Volver a proyectos", "index.html#projects")])
    );
    root.append(box);
  }

  function header(p) {
    const el = document.createElement("header");
    el.className = "project-header";
    el.append(textEl("p", "kicker", statusMeta(p)), textEl("h1", "", p.title), textEl("p", "hero-text", p.summary));
    const actions = [
      ...(p.web ? [externalLink("Ver web", p.web, "pill-primary")] : []),
      ...(p.links || []).map((l) => externalLink(l.label, l.url)),
    ];
    if (actions.length) el.append(pills("", actions));
    return el;
  }

  function cover(p) {
    if (p.image) {
      const img = document.createElement("img");
      img.className = "project-cover";
      img.src = p.image;
      img.alt = p.title;
      img.width = 768;
      img.height = 512;
      return img;
    }
    const block = textEl("div", "project-cover project-cover-empty", p.title);
    block.style.setProperty("--hue", p.hue || 210);
    block.setAttribute("aria-hidden", "true");
    return block;
  }

  // Native <dialog> lightbox; returns a function that opens it at an image index.
  function lightbox(items) {
    const dialog = textEl("dialog", "lightbox", "");
    dialog.setAttribute("aria-label", "Galería");
    const img = document.createElement("img");
    const caption = textEl("figcaption", "", "");
    const figure = document.createElement("figure");
    figure.append(img, caption);
    let index = 0;

    const show = (i) => {
      index = (i + items.length) % items.length;
      img.src = items[index].src;
      img.alt = items[index].caption;
      caption.textContent = items[index].caption;
    };

    dialog.append(figure, button("lightbox-close", "×", "Cerrar", () => dialog.close()));
    if (items.length > 1) {
      dialog.append(
        button("lightbox-prev", "‹", "Imagen anterior", () => show(index - 1)),
        button("lightbox-next", "›", "Imagen siguiente", () => show(index + 1))
      );
      dialog.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") show(index - 1);
        else if (e.key === "ArrowRight") show(index + 1);
      });
    }
    // The dialog fills the viewport, so a click on the dialog itself is a click outside the image.
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
    document.body.append(dialog);

    return (i) => {
      show(i);
      dialog.showModal();
    };
  }

  function gallery(items) {
    const open = lightbox(items);
    return list("div", "project-gallery", items, (item, i) => {
      const shot = textEl("button", "project-shot", "");
      shot.type = "button";
      shot.addEventListener("click", () => open(i));
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption;
      img.loading = "lazy";
      shot.append(img);
      const figure = document.createElement("figure");
      figure.append(shot, textEl("figcaption", "", item.caption));
      return figure;
    });
  }

  function tech(p, d) {
    if (d.tech && d.tech.length) {
      return list("dl", "project-tech", d.tech, (t) => {
        const row = document.createElement("div");
        row.append(textEl("dt", "", t.name), textEl("dd", "", t.use));
        return row;
      });
    }
    if (p.stack && p.stack.length) return list("ul", "chip-list", p.stack, (s) => textEl("li", "", s));
    return null;
  }

  // Staircase URL that jumps straight back to this project's card.
  const backUrl = (p) => "index.html#p=" + encodeURIComponent(p.slug);

  // Previous / back / next row; previous and next among the projects that have a page, cycling at both ends.
  function pager(p) {
    const pages = window.PROJECTS.filter((q) => !isWip(q));
    const nav = textEl("nav", "project-pager", "");
    nav.setAttribute("aria-label", "Otros proyectos");
    const home = linkEl("Volver a proyectos", backUrl(p), "project-pager-home");
    if (pages.length < 2) {
      nav.append(home);
      return nav;
    }
    const i = pages.indexOf(p);
    const prev = pages[(i - 1 + pages.length) % pages.length];
    const next = pages[(i + 1) % pages.length];
    nav.append(
      linkEl(`← ${prev.title}`, pageUrl(prev), "project-pager-prev"),
      home,
      linkEl(`${next.title} →`, pageUrl(next), "project-pager-next")
    );
    return nav;
  }

  function render(p) {
    const d = p.details || {};
    const overview = d.overview || p.description;
    const techList = tech(p, d);
    document.title = `${p.title} — Adrián Vázquez`;
    root.append(
      ...[
        pills("project-topbar", [linkEl("← Volver a proyectos", backUrl(p))]),
        header(p),
        cover(p),
        overview && section("Resumen", "Qué es", textEl("p", "hero-text", overview)),
        d.role && section("Mi parte", "Qué hice yo", textEl("p", "hero-text", d.role)),
        d.features && d.features.length &&
          section("Producto", "Funcionalidades", list("ul", "project-features", d.features, (f) => textEl("li", "", f))),
        d.gallery && d.gallery.length && section("Capturas", "Galería", gallery(d.gallery)),
        techList && section("Stack", "Tecnologías", techList),
        d.learned && section("Balance", "Lo que aprendí", textEl("p", "hero-text", d.learned)),
        pager(p),
      ].filter(Boolean)
    );
  }

  // Work-in-progress projects have no page yet.
  if (!project || isWip(project)) renderMissing();
  else render(project);
})();
