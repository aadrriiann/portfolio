// Prototype A: the next project is the protagonist, then a compact contact row.
(() => {
  const { isWip, pageUrl } = window.projectHelpers;
  const slug = new URLSearchParams(location.search).get("p");
  const pages = window.PROJECTS.filter((q) => !isWip(q));
  const i = pages.findIndex((q) => q.slug === slug);
  if (i < 0 || pages.length < 2) return;
  const prev = pages[(i - 1 + pages.length) % pages.length];
  const next = pages[(i + 1) % pages.length];

  // Cover image, or the hue gradient used by cards without an image.
  const media = (q, cls) =>
    q.image
      ? `<img class="${cls}" src="${q.image}" alt="" loading="lazy" />`
      : `<span class="${cls} fa-hue" style="--hue: ${q.hue || 210}"></span>`;

  document.querySelector(".project-pager")?.remove();
  document.getElementById("contacto")?.remove();

  const footer = document.createElement("footer");
  footer.className = "fa";
  footer.innerHTML = `
    <a class="fa-next" href="${pageUrl(next)}">
      ${media(next, "fa-bg")}
      <span class="fa-next-body">
        <span class="kicker">Siguiente proyecto</span>
        <span class="fa-next-title">${next.title}</span>
        <span class="fa-next-cta">Ver proyecto →</span>
      </span>
    </a>
    <a class="fa-prev" href="${pageUrl(prev)}">← Anterior: ${prev.title}</a>
    <div class="fa-contact">
      <div>
        <h2 class="fa-contact-title">¿Te interesa mi trabajo?</h2>
        <p class="fa-contact-text">Estoy abierto a prácticas y colaboraciones.</p>
      </div>
      <div class="contact-links"><a class="pill-primary" href="contact.html">Envíame un correo</a></div>
    </div>`;
  document.getElementById("project").append(footer);
})();
