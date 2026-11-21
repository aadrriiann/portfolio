// Prototype D: one end card with the next project and the contact pitch side by side.
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
      ? `<img class="fd-thumb" src="${q.image}" alt="" loading="lazy" />`
      : `<span class="fd-thumb fd-hue" style="--hue: ${q.hue || 210}"></span>`;

  document.querySelector(".project-pager")?.remove();
  document.getElementById("contacto")?.remove();

  const footer = document.createElement("footer");
  footer.className = "fd";
  footer.innerHTML = `
    <div class="fd-card">
      <a class="fd-next" href="${pageUrl(next)}">
        <span class="kicker">Siguiente proyecto</span>
        <span class="fd-next-title">${next.title}</span>
        ${media(next)}
        <span class="fd-next-cta">Ver proyecto →</span>
      </a>
      <section class="fd-contact">
        <p class="kicker">Contacto</p>
        <h2 class="fd-contact-title">¿Hablamos?</h2>
        <p class="fd-contact-text">Estoy abierto a prácticas y colaboraciones. Cuéntame de qué va tu proyecto y te digo en qué te puedo ayudar.</p>
        <div class="contact-links"><a class="pill-primary" href="contact.html">Envíame un correo</a></div>
      </section>
    </div>
    <a class="fd-prev" href="${pageUrl(prev)}">← Anterior: ${prev.title}</a>`;
  document.getElementById("project").append(footer);
})();
