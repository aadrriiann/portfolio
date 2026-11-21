// Prototype B: borderless thumbnail pager, then a centred contact card.
(() => {
  const { isWip, pageUrl } = window.projectHelpers;
  const slug = new URLSearchParams(location.search).get("p");
  const pages = window.PROJECTS.filter((q) => !isWip(q));
  const i = pages.findIndex((q) => q.slug === slug);
  if (i < 0 || pages.length < 2) return;
  const prev = pages[(i - 1 + pages.length) % pages.length];
  const next = pages[(i + 1) % pages.length];

  // Cover image, or the hue gradient used by cards without an image.
  const media = (q) =>
    q.image
      ? `<img class="fb-thumb" src="${q.image}" alt="" loading="lazy" />`
      : `<span class="fb-thumb fb-hue" style="--hue: ${q.hue || 210}"></span>`;

  const link = (q, label, cls) => `
    <a class="fb-link ${cls}" href="${pageUrl(q)}">
      ${media(q)}
      <span class="fb-text">
        <span class="kicker">${label}</span>
        <span class="fb-title">${q.title}</span>
      </span>
    </a>`;

  document.querySelector(".project-pager")?.remove();
  document.getElementById("contacto")?.remove();

  const footer = document.createElement("footer");
  footer.className = "fb";
  footer.innerHTML = `
    <nav class="fb-pager" aria-label="Otros proyectos">
      ${link(prev, "← Anterior", "fb-prev")}
      ${link(next, "Siguiente →", "fb-next")}
    </nav>
    <section class="fb-contact">
      <p class="kicker">Contacto</p>
      <h2 class="fb-contact-title">¿Hablamos?</h2>
      <p class="fb-contact-text">Estoy abierto a prácticas y colaboraciones. Cuéntame de qué va tu proyecto y te digo en qué te puedo ayudar.</p>
      <div class="contact-links"><a class="pill-primary" href="contact.html">Envíame un correo</a></div>
    </section>`;
  document.getElementById("project").append(footer);
})();
