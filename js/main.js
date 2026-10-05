(() => {
  const params = new URLSearchParams(window.location.search);
  const toast = document.getElementById("toast");

  if (params.get("success") === "1" && toast) {
    toast.classList.add("show");
    window.setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  const trail = document.getElementById("cursor-trail");
  const tctx = trail.getContext("2d");
  const dots = [];

  function resizeTrail() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    trail.width = Math.floor(innerWidth * dpr);
    trail.height = Math.floor(innerHeight * dpr);
    trail.style.width = innerWidth + "px";
    trail.style.height = innerHeight + "px";
    tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function paintTrail() {
    tctx.clearRect(0, 0, innerWidth, innerHeight);
    tctx.fillStyle = "#fff";
    for (let i = dots.length - 1; i >= 0; i--) {
      const d = dots[i];
      d.life -= 0.035;
      if (d.life <= 0) {
        dots.splice(i, 1);
        continue;
      }
      tctx.globalAlpha = d.life * 0.55;
      tctx.beginPath();
      tctx.arc(d.x, d.y, 1.4 * d.life, 0, Math.PI * 2);
      tctx.fill();
    }
    tctx.globalAlpha = 1;
    requestAnimationFrame(paintTrail);
  }

  window.addEventListener("pointermove", (e) => {
    dots.push({ x: e.clientX, y: e.clientY, life: 1 });
    if (dots.length > 80) dots.shift();
  });

  resizeTrail();
  window.addEventListener("resize", resizeTrail);
  paintTrail();
})();
