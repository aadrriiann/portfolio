// Prototype C: minimal text pager, then a white contact banner.
(() => {
  const { isWip, pageUrl } = window.projectHelpers;
  const slug = new URLSearchParams(location.search).get("p");
  const pages = window.PROJECTS.filter((q) => !isWip(q));
  const i = pages.findIndex((q) => q.slug === slug);
  if (i < 0 || pages.length < 2) return;
  const prev = pages[(i - 1 + pages.length) % pages.length];
  const next = pages[(i + 1) % pages.length];

  document.querySelector(".project-pager")?.remove();
  document.getElementById("contacto")?.remove();

  const footer = document.createElement("footer");
  footer.className = "fc";
  footer.innerHTML = `
    <nav class="fc-nav" aria-label="Otros proyectos">
      <a class="fc-prev" href="${pageUrl(prev)}">← ${prev.title}</a>
      <a class="fc-home" href="index.html#p=${encodeURIComponent(slug)}">Volver a proyectos</a>
      <a class="fc-next" href="${pageUrl(next)}">${next.title} →</a>
    </nav>
    <section class="fc-banner">
      <h2 class="fc-title">¿Hablamos?</h2>
      <a class="fc-pill" href="contact.html">Envíame un correo</a>
    </section>`;
  document.getElementById("project").append(footer);
})();
