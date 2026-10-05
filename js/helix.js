(() => {
  const section = document.getElementById("projects");
  const stage = document.getElementById("helix-stage");
  const canvas = document.getElementById("helix");
  const hudTitle = document.getElementById("hud-title");
  const hudMeta = document.getElementById("hud-meta");
  const hudSummary = document.getElementById("hud-summary");
  const hudIndex = document.getElementById("hud-index");
  const detail = document.getElementById("detail");
  const dMeta = document.getElementById("detail-meta");
  const dTitle = document.getElementById("detail-title");
  const dText = document.getElementById("detail-text");
  const dStack = document.getElementById("detail-stack");
  const dLinks = document.getElementById("detail-links");

  const PROJECTS = window.PROJECTS;
  const n = PROJECTS.length;
  // Geometría de la escalera: cada escalón gira STEP_A rad y sube RISE; las cartas van cada GAP escalones.
  const STEP_A = 0.45, RISE = 0.17, GAP = 8, LEAD = 6, R_CARD = 3.15;
  const STEPS = LEAD * 2 + (n - 1) * GAP + 1;
  const cardStep = (i) => LEAD + i * GAP;

  section.style.setProperty("--n", n);

  let renderer, scene, camera, spiral, meshes;
  let entry = 0;
  let sp = 0; // progreso de scroll suavizado (0..1)
  let currentIndex = 0;
  const raycaster = new THREE.Raycaster();
  const _ptr = new THREE.Vector2();
  const _world = new THREE.Vector3();
  const _ndc = new THREE.Vector3();
  const clock = { t: 0 };

  const vertexShader = `
    varying vec2 vUv;
    varying float vDepth;
    void main() {
      vUv = uv;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vDepth = -mv.z;
      gl_Position = projectionMatrix * mv;
    }
  `;

  const fragmentShader = `
    uniform sampler2D map;
    uniform float dither;
    uniform float time;
    varying vec2 vUv;
    varying float vDepth;

    float bayer(vec2 p) {
      vec2 i = mod(floor(p), 4.0);
      float idx = i.x + i.y * 4.0;
      float m[16];
      m[0]=0.0; m[1]=8.0; m[2]=2.0; m[3]=10.0;
      m[4]=12.0; m[5]=4.0; m[6]=14.0; m[7]=6.0;
      m[8]=3.0; m[9]=11.0; m[10]=1.0; m[11]=9.0;
      m[12]=15.0; m[13]=7.0; m[14]=13.0; m[15]=5.0;
      int ii = int(idx);
      float v = 0.0;
      for (int k = 0; k < 16; k++) if (k == ii) v = m[k];
      return v / 16.0;
    }

    void main() {
      vec4 col = texture2D(map, vUv);
      float far = smoothstep(6.0, 14.0, vDepth);
      float amount = dither * (0.15 + far * 0.85);
      float b = bayer(gl_FragCoord.xy + time);
      float lum = dot(col.rgb, vec3(0.299, 0.587, 0.114));
      float d = step(b, lum + 0.12);
      vec3 dithered = mix(vec3(0.02), vec3(0.92), d);
      vec3 mixed = mix(col.rgb, dithered, amount);
      float edge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
      float frame = smoothstep(0.0, 0.03, edge);
      mixed *= 0.35 + 0.65 * (1.0 - far);
      gl_FragColor = vec4(mixed * frame, 1.0);
    }
  `;

  function makeTexture(project, index) {
    const c = document.createElement("canvas");
    c.width = 768;
    c.height = 512;
    const g = c.getContext("2d");
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    let img = null;

    function paint() {
      const hue = project.hue || 210;
      const grd = g.createLinearGradient(0, 0, 768, 512);
      grd.addColorStop(0, `hsl(${hue} 18% 10%)`);
      grd.addColorStop(1, `hsl(${(hue + 40) % 360} 22% 18%)`);
      g.fillStyle = grd;
      g.fillRect(0, 0, 768, 512);
      if (img) {
        g.drawImage(img, 0, 0, 768, 512);
        const sh = g.createLinearGradient(0, 160, 0, 512);
        sh.addColorStop(0, "rgba(0,0,0,0)");
        sh.addColorStop(1, "rgba(0,0,0,0.88)");
        g.fillStyle = sh;
        g.fillRect(0, 0, 768, 512);
      }
      g.fillStyle = "rgba(255,255,255,0.7)";
      g.font = "500 22px Inter, sans-serif";
      g.fillText(String(index + 1).padStart(2, "0"), 48, 64);
      g.fillStyle = "#fff";
      g.font = "800 54px Syne, Inter, sans-serif";
      wrapText(g, project.title, 48, img ? 410 : 250, 670, 62);
      g.fillStyle = "rgba(255,255,255,0.8)";
      g.font = "500 20px Inter, sans-serif";
      g.fillText(`${project.course}  ·  ${project.tag}`, 48, 470);
      tex.needsUpdate = true;
    }

    paint();
    document.fonts && document.fonts.ready.then(paint);
    if (project.image) {
      const im = new Image();
      im.onload = () => {
        img = im;
        paint();
      };
      im.src = project.image;
    }
    return tex;
  }

  function wrapText(g, text, x, y, maxW, lineH) {
    const words = text.split(" ");
    let line = "";
    let yy = y;
    for (const w of words) {
      const test = line + w + " ";
      if (g.measureText(test).width > maxW) {
        g.fillText(line, x, yy);
        line = w + " ";
        yy += lineH;
      } else line = test;
    }
    g.fillText(line, x, yy);
  }

  function scrollTarget() {
    const r = section.getBoundingClientRect();
    return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
  }

  function pose(p) {
    // Girar y subir la escalera para que la carta activa quede delante, en el centro.
    const a0 = cardStep(0) * STEP_A - Math.PI / 2;
    const a1 = cardStep(n - 1) * STEP_A - Math.PI / 2;
    spiral.rotation.y = a0 + (a1 - a0) * p;
    spiral.position.y = -(cardStep(0) + (cardStep(n - 1) - cardStep(0)) * p) * RISE;
    meshes.forEach((m, i) => {
      const appear = THREE.MathUtils.clamp(entry * (n + 1) - i * 0.5, 0, 1);
      const s = appear * appear * (3 - 2 * appear);
      m.scale.set(s, s, s);
      m.material.uniforms.time.value = clock.t * 8;
    });
  }

  function nearestIndex() {
    let best = 0;
    let bestScore = Infinity;
    meshes.forEach((m, i) => {
      m.getWorldPosition(_world);
      _ndc.copy(_world).project(camera);
      const score = Math.abs(_ndc.x) * 0.85 + Math.abs(_ndc.y) * 0.35 - _ndc.z * 2;
      if (score < bestScore) {
        bestScore = score;
        best = i;
      }
    });
    return best;
  }

  function updateHud() {
    const i = nearestIndex();
    currentIndex = i;
    const p = PROJECTS[i];
    hudIndex.textContent = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    hudTitle.textContent = p.title;
    hudMeta.textContent = `${p.course} · ${p.tag}`;
    hudSummary.textContent = p.summary;
  }

  function pick(e) {
    const r = canvas.getBoundingClientRect();
    _ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(_ptr, camera);
    const hits = raycaster.intersectObjects(meshes, false);
    return hits.length ? hits[0].object.userData.index : -1;
  }

  const isOpen = () => !detail.hidden;

  function openDetail(i) {
    const p = PROJECTS[i];
    dMeta.textContent = `${p.course} · ${p.tag}`;
    dTitle.textContent = p.title;
    dText.textContent = p.description || p.summary;
    dStack.replaceChildren(
      ...(p.stack || []).map((s) => {
        const li = document.createElement("li");
        li.textContent = s;
        return li;
      })
    );
    dLinks.replaceChildren(
      ...(p.links || []).map((l) => {
        const a = document.createElement("a");
        a.href = l.url;
        a.textContent = l.label;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        return a;
      })
    );
    detail.hidden = false;
    stage.classList.add("detail-open");
  }

  function closeDetail() {
    detail.hidden = true;
    stage.classList.remove("detail-open");
  }

  function animate() {
    requestAnimationFrame(animate);
    const r = section.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return; // fuera de pantalla: no dibujar
    clock.t += 0.016;
    if (r.top < innerHeight * 0.85) entry = Math.min(1, entry + 0.012);
    sp += (scrollTarget() - sp) * 0.1;
    pose(sp);
    renderer.render(scene, camera);
    updateHud();
  }

  function onResize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 80);
    camera.position.set(1.6, 0.15, 9.4);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    spiral = new THREE.Group();
    scene.add(spiral);

    // Columna central y escalones de la escalera de caracol
    const height = STEPS * RISE;
    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, height + 4, 16),
      new THREE.MeshBasicMaterial({ color: 0x141414 })
    );
    column.position.y = height / 2;
    spiral.add(column);
    const stepGeo = new THREE.BoxGeometry(1.6, 0.07, 0.55);
    const edgeGeo = new THREE.EdgesGeometry(stepGeo);
    const fillMat = new THREE.MeshBasicMaterial({ color: 0x0d0d0d });
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
    for (let k = 0; k < STEPS; k++) {
      const a = k * STEP_A;
      const step = new THREE.Group();
      step.add(new THREE.Mesh(stepGeo, fillMat), new THREE.LineSegments(edgeGeo, lineMat));
      step.position.set(Math.cos(a) * 1.9, k * RISE, Math.sin(a) * 1.9);
      step.rotation.y = -a;
      spiral.add(step);
    }

    // Cartas de proyecto, en el borde exterior de la escalera
    meshes = PROJECTS.map((p, i) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: { map: { value: makeTexture(p, i) }, dither: { value: 0.85 }, time: { value: 0 } },
        vertexShader,
        fragmentShader,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.55, 1.7), mat);
      const a = cardStep(i) * STEP_A;
      mesh.position.set(Math.cos(a) * R_CARD, cardStep(i) * RISE, Math.sin(a) * R_CARD);
      mesh.rotation.set(-0.06, Math.PI / 2 - a, 0);
      mesh.userData.index = i;
      spiral.add(mesh);
      return mesh;
    });

    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", (e) => canvas.classList.toggle("pointer", pick(e) >= 0));
    canvas.addEventListener("click", (e) => {
      const i = pick(e);
      if (i >= 0) openDetail(i);
      else closeDetail();
    });
    document.getElementById("detail-close").addEventListener("click", closeDetail);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDetail();
      else if (e.key === "Enter" && !isOpen() && e.target === document.body) openDetail(currentIndex);
    });
    sp = scrollTarget();
    animate();
  }

  init();
})();
