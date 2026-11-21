// Each object is a card on the staircase; array order is the order going down.
// To add a project: copy a block and fill slug, title, course, tag, summary, description, stack, links, hue.
// slug: id used in the project page URL (project.html?p=<slug>) and in the return hash (index.html#p=<slug>).
// Every card opens project.html?p=<slug>.
// status: "wip" marks a project in development (an "En desarrollo" label on the card and the page); without status it is finished.
// web: published URL ("Ver web"). links: extra links (e.g. "Código").
// image: 768x512 thumbnail, a path in assets/; without it the card uses a gradient from hue.
// details (optional, every field optional): case-study content for the project page.
//   overview (falls back to description), role, features: [text], tech: [{ name, use }] (falls back to stack),
//   next: [text] (upcoming work, "Próximos pasos"), learned, gallery: [{ src, caption }].
window.PROJECTS = [
  {
    slug: "beavr-crm",
    title: "Beavr CRM",
    course: "Sistemas de gestión empresarial",
    tag: "Next.js · Supabase",
    summary: "CRM hecho en clase: oportunidades, empresas, contactos, RRHH y facturación.",
    description:
      "CRM desarrollado en clase para comerciales y personal interno. Gestiona oportunidades de venta, empresas y contactos, e incluye un módulo de RRHH (plantilla, fichajes, vacaciones y nóminas en PDF), ventas y facturación, un generador de webs públicas con plantillas y un asistente con IA que lee facturas a partir de una foto.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Chart.js"],
    web: "https://beavr-crm.vercel.app/",
    links: [{ label: "Código", url: "https://github.com/aadrriiann/crm-table" }],
    image: "assets/beavr-crm.png",
    hue: 200,
    details: {
      overview:
        "Beavr es un ERP para pequeñas empresas desarrollado en la asignatura de Sistemas de gestión empresarial. Reúne en una sola aplicación el CRM comercial, la gestión de personal, las ventas y la creación de webs para clientes, pensado para comerciales y personal interno.",
      role:
        "Proyecto en pareja con Jaime Enguita. Mi parte principal fue el módulo de ventas y facturación y el asistente con IA, que lee una factura a partir de una foto y la registra. También colaboré en el CRM base: oportunidades, empresas y contactos.",
      features: [
        "Embudo de oportunidades por estado (nueva, contactada, propuesta, ganada y perdida) con panel de resumen y gráficos.",
        "Fichas de empresas y contactos, con responsable asignado.",
        "RRHH: plantilla, fichajes, vacaciones y nóminas en PDF con firma.",
        "Ventas y facturación con indicadores y acciones sobre cada factura.",
        "Asistente con IA: chat y lectura de facturas a partir de una foto.",
        "Generador de webs públicas para clientes con dos plantillas.",
        "Tema claro y oscuro.",
      ],
      tech: [
        { name: "Next.js", use: "Rutas, páginas y API del servidor (leads y asistente con IA)." },
        { name: "React y TypeScript", use: "Interfaz por componentes con tipado estricto." },
        { name: "Tailwind CSS", use: "Estilos y tema claro y oscuro con variables." },
        { name: "Supabase (PostgreSQL)", use: "Base de datos, inicio de sesión y migraciones SQL." },
        { name: "Chart.js", use: "Gráficos del panel de resumen." },
        { name: "pdf-lib", use: "Generación de las nóminas en PDF." },
        { name: "AI SDK y OpenRouter", use: "Chat del asistente y lectura de facturas." },
        { name: "Vitest y PGlite", use: "Tests de la lógica de negocio y de las migraciones sobre un Postgres en memoria." },
      ],
      learned:
        "Organizar una aplicación grande por módulos dentro de una jerarquía ERP, trabajar en pareja con ramas y revisiones en Git y probar las migraciones de base de datos antes de aplicarlas. También integrar un modelo de IA de forma útil y controlada dentro de una aplicación de gestión.",
      gallery: [
        { src: "assets/beavr-crm.png", caption: "Resumen del módulo CRM: oportunidades, embudo y distribución por estado." },
        { src: "assets/beavr/oportunidades.jpg", caption: "Tablero de oportunidades por estado, del lead a la venta." },
        { src: "assets/beavr/ventas.jpg", caption: "Ventas y facturación: indicadores y vendido frente a facturado por mes." },
        { src: "assets/beavr/sitios.jpg", caption: "Módulo web: sitios de clientes generados con plantillas." },
      ],
    },
  },
  {
    slug: "rankgym",
    title: "RankGym",
    course: "Bases de datos",
    tag: "Next.js · Supabase",
    summary: "App web para registrar récords de fuerza, competir con amigos y ver el ranking.",
    description:
      "Aplicación web para registrar récords de fuerza, añadir amigos y consultar el ranking. Tiene un backend propio con rutas API en Next.js (patrón BFF), inicio de sesión con Google mediante Supabase Auth y una base de datos PostgreSQL con usuarios, amistades, récords, ejercicios y rangos.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    links: [{ label: "Código", url: "https://github.com/aadrriiann/proyecto-bddts" }],
    image: "assets/rankgym.png",
    hue: 48,
  },
  {
    slug: "tull-arquitectura",
    title: "Tull Arquitectura",
    course: "Prácticas",
    tag: "Web corporativa",
    summary: "Web de un estudio de bioarquitectura, hecha durante mis prácticas.",
    description:
      "Web del estudio de bioarquitectura Tull Arquitectura, desarrollada durante mis prácticas. Presenta el estudio, sus proyectos de bioconstrucción con galerías de fotos y los datos de contacto, con textos en español e inglés.",
    stack: [],
    web: "https://tullarquitectura.com",
    links: [],
    image: "assets/tull.jpg",
    hue: 18,
  },
  {
    slug: "armario-virtual",
    title: "Armario Virtual",
    status: "wip",
    course: "Proyecto personal",
    tag: "Flutter · Android",
    summary: "App Android para fotografiar mi ropa, organizarla y que me sugiera qué ponerme hoy.",
    description:
      "Aplicación Android que funciona como un armario virtual: fotografío cada prenda, el fondo se quita en el propio móvil con ML Kit y la organizo por secciones. Sugiere un outfit diario con reglas de color y estilo, sin IA ni conexión.",
    stack: ["Flutter", "Dart", "SQLite", "ML Kit"],
    links: [],
    hue: 330,
    details: {
      overview:
        "Aplicación Android que funciona como un armario virtual: fotografío cada prenda por delante y por detrás y la organizo sin tener que abrir el armario. Cada mañana me sugiere qué ponerme con las prendas que tengo disponibles.",
      role: "Proyecto personal: diseño, desarrollo y pruebas hechos por mí, para usarlo a diario.",
      features: [
        "Fotos de cada prenda por delante y por detrás, desde la cámara o la galería.",
        "El fondo de la foto se quita en el propio móvil con ML Kit y la prenda queda sobre un fondo liso.",
        "El color de cada prenda se detecta solo a partir de la foto.",
        "Secciones como Clase, Casa o Fiesta; una prenda puede estar en varias.",
        "Prendas no disponibles (en la lavadora, prestadas, por arreglar) con su motivo.",
        "Outfit del día con reglas de color, contraste y estilo, que aprende de los votos a favor y en contra.",
        "Funciona sin conexión: todo se guarda en el móvil con SQLite.",
      ],
      tech: [
        { name: "Flutter y Dart", use: "Aplicación Android con Material 3." },
        { name: "SQLite (sqflite)", use: "Prendas, secciones y votos guardados en el móvil, con migraciones de esquema." },
        { name: "ML Kit", use: "Recorte del fondo de las fotos en el propio dispositivo." },
        { name: "image", use: "Procesado de píxeles y cálculo del color dominante." },
        { name: "Provider", use: "Estado de la aplicación." },
        { name: "flutter_test", use: "Tests de la base de datos, el recorte y las reglas del outfit." },
      ],
      next: [
        "Probarla a diario en un móvil real y pulir los detalles.",
        "Copia de seguridad opcional en la nube para no perder el armario al cambiar de móvil.",
      ],
    },
  },
  {
    slug: "battleverse",
    title: "Battleverse",
    status: "wip",
    course: "Proyecto personal",
    tag: "Java · libGDX",
    summary: "Videojuego de lucha 2D en plataformas: un jugador contra la IA con cuatro personajes.",
    description:
      "Juego de lucha 2D de escritorio. Cuatro personajes jugables con ataques normal, fuerte y especial, energía y retroceso, contra un enemigo controlado por IA en una arena.",
    stack: ["Java", "libGDX", "Gradle"],
    links: [{ label: "Código", url: "https://github.com/aadrriiann/battleverse" }],
    hue: 270,
    details: {
      overview:
        "Videojuego de lucha 2D de escritorio en el que un jugador se enfrenta a un enemigo controlado por la IA en una arena con plataformas.",
      role: "Proyecto personal: programación del juego, la IA del enemigo y el sistema de combate.",
      features: [
        "Cuatro personajes jugables: REX, VOLT, NYX y BRUTUS, cada uno con sus estadísticas.",
        "Ataques normal, fuerte y especial, con energía y retroceso.",
        "Enemigo controlado por IA.",
        "Arena con plataformas y colisiones.",
        "Menú principal y selección de personaje con animaciones por sprites.",
      ],
      tech: [
        { name: "Java 21", use: "Lógica del juego." },
        { name: "libGDX", use: "Motor 2D: pantallas, sprites, entrada y bucle de juego." },
        { name: "LWJGL 3", use: "Versión de escritorio." },
        { name: "Gradle", use: "Compilación y ejecución del proyecto." },
      ],
      next: ["Modo carrera.", "Modo versus para dos jugadores.", "Pantalla de opciones."],
    },
  },
  {
    slug: "tfg",
    title: "TFG",
    status: "wip",
    course: "Trabajo de fin de grado",
    tag: "Flutter · Supabase",
    summary: "App social para jugadores competitivos: buscar compañeros, chat, valoraciones y torneos.",
    description:
      "Proyecto de fin de grado en equipo de tres personas. App Android para encontrar compañeros de juego (LoL, Valorant, EA FC, Fortnite, Rocket League), evitar jugadores tóxicos y organizar torneos. Yo me encargo de la parte social: búsqueda de grupo, chat, emparejamiento automático y valoraciones.",
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL"],
    links: [],
    hue: 140,
    details: {
      overview:
        "App Android para jugadores competitivos: encontrar compañeros de partida, evitar a los jugadores tóxicos y organizar torneos. Funciona con varios juegos: LoL, Valorant, EA FC, Fortnite y Rocket League.",
      role:
        "Proyecto de fin de grado en equipo de tres personas (con Jaime y Jorge). Yo me encargo de la parte social: la lista de búsqueda de grupo con filtros, el chat, el emparejamiento automático y las valoraciones entre jugadores.",
      features: [
        "Búsqueda de grupo con lista y filtros por juego y rango.",
        "Chat entre jugadores.",
        "Emparejamiento automático.",
        "Valoraciones opcionales con estrellas y comentario.",
        "Torneos de eliminación directa.",
        "Perfil con juegos favoritos y rangos.",
      ],
      tech: [
        { name: "Flutter y Dart", use: "Aplicación Android." },
        { name: "Supabase", use: "Inicio de sesión con correo y Google, base de datos y almacenamiento." },
        { name: "PostgreSQL", use: "Tablas de grupos, chats, emparejamiento, valoraciones y torneos, con seguridad por filas." },
        { name: "Git y GitHub", use: "Trabajo en equipo con una rama por persona y tarea." },
      ],
      next: [
        "Terminar la búsqueda de grupo y el chat.",
        "Emparejamiento automático y valoraciones.",
        "Torneos.",
        "Más adelante: estadísticas de Riot y lectura de resultados desde capturas.",
      ],
    },
  },
];

// Helpers shared by helix.js and project.js.
window.projectHelpers = (() => {
  const isWip = (p) => p.status === "wip";
  const metaText = (p) => `${p.course} · ${p.tag}`;
  return {
    isWip,
    metaText,
    statusMeta: (p) => metaText(p) + (isWip(p) ? " · En desarrollo" : ""),
    pageUrl: (p) => "project.html?p=" + encodeURIComponent(p.slug),
  };
})();
