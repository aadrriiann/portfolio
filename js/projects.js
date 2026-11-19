// Each object is a card on the staircase; array order is the order going down.
// To add a project: copy a block and fill title, course, tag, summary, description, stack, links, hue.
// status: "wip" marks a project in development (it does not open); without status it is finished.
// web: published URL. Finished projects open the detail panel if they have web or links. links: extra links (e.g. "Código").
// image: 768x512 thumbnail, a path in assets/; without it the card uses a gradient from hue.
window.PROJECTS = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

