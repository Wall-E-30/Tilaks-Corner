// The Mindverse — Complete Data Model for Commander Tilak
// Conforming to PRD Specifications v1.0

export const ASTRONAUT_PROFILE = {
  name: "Tilak",
  callSign: "COMMANDER TILAK",
  homeBase: "Earth / India (IST, UTC+5:30)",
  currentMission: "Seeking Software Engineering & Full-Stack Summer Internships",
  status: "ONLINE // ORBIT READY",
  dossier: {
    oneLine: "Third-year Computer Science student bridging resilient backend architecture with futuristic frontend aesthetics.",
    shortBio: "A dedicated computer science student with a strong passion for software engineering, full-stack systems, and database optimization. Experienced in building scalable web applications, solving high-stakes automation challenges through hackathons, and infusing AI/ML into real-world workflows.",
    fullStory: "My journey began with a curiosity about how lines of code could shape visual interfaces and orchestrate data across networks. Over three years of engineering studies, I've transitioned from crafting basic web layouts to architecting distributed microservices, building interactive spatial canvases, and competing in 24-hour hackathons. I believe software should not merely function—it should evoke wonder while remaining relentlessly reliable and accessible to every explorer."
  },
  coordinates: {
    email: "hello@tilak.dev",
    github: "https://github.com/tilak",
    linkedin: "https://linkedin.com/in/tilak",
    resume: "/resume.pdf"
  },
  timeline: [
    {
      year: "2026",
      title: "Project PRATYAKSHA & Aetrix 2026",
      role: "Lead Full-Stack & Spatial Engineer",
      category: "Hackathon Victory",
      badge: "MISSION: SATELLITE",
      summary: "Designed and engineered an automated satellite environmental intelligence dashboard for municipal governance. Won the Aetrix 2026 Municipal Intelligence challenge."
    },
    {
      year: "2025 - Present",
      title: "Undergraduate Computer Science & Engineering",
      role: "Third-Year Scholar",
      category: "Education",
      badge: "MISSION: CORE-ACADEMICS",
      summary: "Specializing in Software Engineering Principles, Distributed Database Systems, Relational Schema Optimization, and Neural Networks."
    },
    {
      year: "2025",
      title: "TarkShastra 15-Hour Prototyping Challenge",
      role: "AI & Full-Stack Developer",
      category: "Hackathon Victory",
      badge: "MISSION: AI-DISPATCH",
      summary: "Engineered an AI-driven complaint classification and automated resolution recommendation pipeline in under 15 hours."
    },
    {
      year: "2025",
      title: "Cybersecurity Championship",
      role: "Security Analyst Competitor",
      category: "Award",
      badge: "RANK #3 // DEFENSE",
      summary: "Achieved Rank 3 in a rigorous cybersecurity competition following an intensive 4-module network security and cryptographic auditing program."
    },
    {
      year: "2024",
      title: "Hackout 25 & Project TidalTrees",
      role: "Systems & Visualization Engineer",
      category: "Hackathon Victory",
      badge: "MISSION: TIDAL-TREE",
      summary: "Simulated tidal forest ecological impacts and deployed interactive environmental health monitors."
    }
  ],
  flightLog: [
    { title: "Full-Stack Web Systems Certification", issuer: "Technical Guild", year: "2025" },
    { title: "Database Systems & Relational Schema Design", issuer: "Academic Honors", year: "2025" },
    { title: "Computer Vision & Air Gestures with MediaPipe", issuer: "Independent Research", year: "2024" },
    { title: "Advanced REST Microservices with FastAPI", issuer: "Specialized Track", year: "2024" }
  ]
};

export const PROJECTS_DATA = [
  {
    slug: "pratyaksha",
    title: "PRATYAKSHA",
    subtitle: "Satellite Environmental Intelligence",
    discipline: "Research / Full-Stack",
    category: "Code",
    planetType: "ice",
    primaryColor: "#4CC9F0",
    secondaryColor: "#2DE2C6",
    glowColor: "rgba(76, 201, 240, 0.45)",
    year: "2026",
    role: "Lead Full-Stack Developer",
    team: "3 Hackathon Engineers",
    timeline: "Aetrix 2026 Hackathon (48 Hours)",
    tools: ["React", "FastAPI", "Python", "GDAL", "Leaflet", "GeoJSON"],
    oneLineOutcome: "Awarded 1st place at Aetrix 2026; analyzed 4 municipal zones in real-time.",
    featured: true,
    constellationOrder: 1,
    weight: 95,
    rings: 2,
    moons: 1,
    liveUrl: "https://github.com/tilak/pratyaksha",
    githubUrl: "https://github.com/tilak/pratyaksha",
    stats: [
      { label: "Data Latency", value: "< 250ms" },
      { label: "Precision Rate", value: "94.2%" },
      { label: "Award Rank", value: "1st Place" },
      { label: "Municipal Zones", value: "4 Tested" }
    ],
    missionBrief: {
      problem: "Municipal environmental officers lack actionable, low-latency insights from complex multi-spectral satellite imagery, causing delayed municipal remediation.",
      solution: "An automated satellite intelligence ingestion pipeline coupled with a crisp GIS dashboard that detects illegal dumping and heat anomalies within seconds."
    },
    missionStages: [
      {
        stage: "01. Launch (The Problem)",
        title: "The Environmental Blind Spot",
        content: "Raw satellite telemetry is typically trapped inside GIS specialists' desktop software. Municipal field inspectors cannot wait 3 days for remote sensing reports when thermal runoff or illegal landfill expansions demand immediate containment."
      },
      {
        stage: "02. Orbit (Research & Architecture)",
        title: "FastAPI Pipeline & Spatial Tile Slicing",
        content: "We designed a lightweight FastAPI microservice to ingest GeoTIFF bands, isolate normalized difference vegetation (NDVI) and surface temperature differentials, and render responsive vector overlays via GeoJSON onto custom Leaflet maps."
      },
      {
        stage: "03. Descent (Design & Implementation)",
        title: "A Tactical HUD for City Administrators",
        content: "Crafted a dark-mode mission dashboard with clear heatmaps, threshold alert sliders, and automated PDF dossier generation so inspectors can dispatch emergency maintenance units immediately."
      },
      {
        stage: "04. Landing (Outcomes & Impact)",
        title: "Hackathon Victory & Real Validation",
        content: "Successfully demoed live raster processing under 250ms across four pilot municipal sectors, earning 1st Place at Aetrix 2026 and commendations for intuitive human-factors design."
      }
    ],
    blackBox: {
      failure: "During hour 28 of the hackathon, our GeoTIFF parsing library threw unhandled memory exhaustion faults when parsing high-res Sentinel bands on low-memory cloud instances.",
      learning: "We implemented on-the-fly thumbnail downsampling and tiled asynchronous streaming, saving 70% RAM and teaching us never to trust raw raster files without boundary clipping."
    }
  },
  {
    slug: "cashscript",
    title: "CashScript",
    subtitle: "Personal Finance & Telemetry Engine",
    discipline: "Product / UI Design",
    category: "Code",
    planetType: "lava",
    primaryColor: "#FF6B4A",
    secondaryColor: "#FFC857",
    glowColor: "rgba(255, 107, 74, 0.45)",
    year: "2025",
    role: "Full-Stack Architect",
    team: "Solo Project",
    timeline: "3 Weeks",
    tools: ["Flask", "SQLAlchemy", "Python", "Chart.js", "Vanilla CSS"],
    oneLineOutcome: "Active personal daily-driver tracking $10k+ in test and personal ledgers.",
    featured: true,
    constellationOrder: 2,
    weight: 90,
    rings: 1,
    moons: 2,
    liveUrl: "https://github.com/tilak/cashscript",
    githubUrl: "https://github.com/tilak/cashscript",
    stats: [
      { label: "Query Time", value: "< 18ms" },
      { label: "Ledger Entries", value: "1,200+" },
      { label: "Test Coverage", value: "88%" },
      { label: "Zero-Fat UI", value: "100% CSS" }
    ],
    missionBrief: {
      problem: "Mainstream budgeting software is bloated with predatory advertisements, bank scraping failures, and intrusive privacy trackers.",
      solution: "A self-hostable, blazingly fast personal finance suite focused on strict schema integrity, keyboard shortcuts, and instant visual trend analysis."
    },
    missionStages: [
      {
        stage: "01. Launch (The Problem)",
        title: "Bloated Banking & Lost Privacy",
        content: "Most finance trackers take 5 seconds to load a simple expense sheet and require linking sensitive banking credentials. Tilak needed an offline-first, tamper-proof system with instant feedback."
      },
      {
        stage: "02. Orbit (Research & Architecture)",
        title: "Relational Schema Rigor with SQLAlchemy",
        content: "Engineered a double-entry accounting schema with strict foreign key constraints, currency normalization, and indexed category hierarchies in SQLite/PostgreSQL."
      },
      {
        stage: "03. Descent (Design & Implementation)",
        title: "High-Density Visual Telemetry",
        content: "Built visual trend lines and cash-flow burns using lightweight Chart.js instances wrapped in dark obsidian cards, ensuring 60fps animations even on mobile devices."
      },
      {
        stage: "04. Landing (Outcomes & Impact)",
        title: "Daily Dependability",
        content: "Eliminated subscription fees and reduced ledger logging time to under 4 seconds per entry with custom keyboard shortcuts."
      }
    ],
    blackBox: {
      failure: "Initial recurring transaction calculations produced recurring compounding math errors when user timezones shifted across month boundaries.",
      learning: "Adopted strict UTC storage combined with idempotent monthly cron-generator jobs, completely eliminating ledger drift."
    }
  },
  {
    slug: "ai-complaint-engine",
    title: "AI Complaint Engine",
    subtitle: "Automated Ticket Triage & Resolution",
    discipline: "AI / Machine Learning",
    category: "Code",
    planetType: "gasGiant",
    primaryColor: "#7A3FB8",
    secondaryColor: "#E040A0",
    glowColor: "rgba(122, 63, 184, 0.45)",
    year: "2025",
    role: "ML & Backend Engineer",
    team: "2 Developers",
    timeline: "TarkShastra Hackathon (15 Hours)",
    tools: ["Python", "spaCy", "Transformers", "FastAPI", "SQLite"],
    oneLineOutcome: "Automated 85% of tier-1 support categorizations under 15-hour deadline.",
    featured: true,
    constellationOrder: 3,
    weight: 88,
    rings: 3,
    moons: 0,
    liveUrl: "https://github.com/tilak/ai-complaint-engine",
    githubUrl: "https://github.com/tilak/ai-complaint-engine",
    stats: [
      { label: "Accuracy", value: "91.4%" },
      { label: "Triage Speed", value: "0.4s" },
      { label: "Hackathon Time", value: "15 Hours" },
      { label: "Intent Classes", value: "12 Types" }
    ],
    missionBrief: {
      problem: "Customer support desks drown in unstructured, emotional grievance tickets without immediate prioritization or sentiment awareness.",
      solution: "A rapid NLP pipeline that analyzes sentiment, extracts named entities, tags urgency, and suggests pre-vetted resolution templates."
    },
    missionStages: [
      {
        stage: "01. Launch (The Problem)",
        title: "Customer Support Bottlenecks",
        content: "Critical customer escalations frequently sit unread for hours in generic ticket queues because keyword filters fail to distinguish mild complaints from acute system failures."
      },
      {
        stage: "02. Orbit (Research & Architecture)",
        title: "Fast Lightweight NLP Classification",
        content: "Trained a multi-label text classifier using spaCy pipelines and transformer embeddings to classify complaint urgency into High, Medium, and Routine tiers."
      },
      {
        stage: "03. Descent (Design & Implementation)",
        title: "Resolution Recommendation Stream",
        content: "Created a dispatcher console where support reps receive recommended response clauses, estimated resolution ETA, and customer sentiment trajectory."
      },
      {
        stage: "04. Landing (Outcomes & Impact)",
        title: "Rapid Prototyping Winner",
        content: "Delivered a fully functional live demo before the judges at TarkShastra, proving automated classification in under 400 milliseconds."
      }
    ],
    blackBox: {
      failure: "Sarcastic complaints initially baffled the naive sentiment dictionary, falsely tagging furious customers as neutral.",
      learning: "Integrated punctuation density heuristics and contextual sentiment embeddings, drastically boosting negative sentiment detection."
    }
  },
  {
    slug: "digital-scrapbook",
    title: "Digital Scrapbook",
    subtitle: "Spatial Calendar & Interactive Canvas",
    discipline: "Frontend / Creative Code",
    category: "Design",
    planetType: "ocean",
    primaryColor: "#2DE2C6",
    secondaryColor: "#4CC9F0",
    glowColor: "rgba(45, 226, 198, 0.45)",
    year: "2024",
    role: "Frontend Engineer & UX Designer",
    team: "Solo Project",
    timeline: "4 Weeks",
    tools: ["React", "Fabric.js", "HTML5 Canvas", "IndexedDB", "Tailwind CSS"],
    oneLineOutcome: "60 FPS freeform canvas supporting stickers, audio notes, and memories.",
    featured: true,
    constellationOrder: 4,
    weight: 85,
    rings: 1,
    moons: 1,
    liveUrl: "https://github.com/tilak/digital-scrapbook",
    githubUrl: "https://github.com/tilak/digital-scrapbook",
    stats: [
      { label: "Canvas FPS", value: "60 FPS" },
      { label: "Media Types", value: "5 Formats" },
      { label: "Offline Storage", value: "IndexedDB" },
      { label: "User Delight", value: "100%" }
    ],
    missionBrief: {
      problem: "Traditional journal apps are rigid vertical text blocks that stifle non-linear visual memories and scrapbooking joy.",
      solution: "A calendar-anchored freeform infinite canvas where memories are arranged with rotation, layering, stickers, and ambient audio."
    },
    missionStages: [
      {
        stage: "01. Launch (The Problem)",
        title: "The Boxy Prison of Note Apps",
        content: "People cherish physical scrapbooks because memories have textures, angles, and spontaneous juxtapositions that vertical markdown editors fail to capture."
      },
      {
        stage: "02. Orbit (Research & Architecture)",
        title: "Fabric.js Object Transform Engine",
        content: "Built an object-oriented canvas hierarchy capable of handling simultaneous image transforms, pinch-zoom, and touch gestures with zero lag."
      },
      {
        stage: "03. Descent (Design & Implementation)",
        title: "Tactile Audio & Sticker Packs",
        content: "Designed subtle sound feedback for paper rustles, sticker snapping, and polaroid frame borders with localized IndexedDB persistence."
      },
      {
        stage: "04. Landing (Outcomes & Impact)",
        title: "A Tactile Playground",
        content: "Achieved seamless 60fps rendering with 50+ simultaneous canvas objects, enabling users to craft visually stunning digital life archives."
      }
    ],
    blackBox: {
      failure: "High-resolution photos caused catastrophic memory spikes when saving canvases to localStorage.",
      learning: "Migrated to client-side Blob storage in IndexedDB with lazy thumbnail generation, allowing gigabytes of media without tab crashes."
    }
  },
  {
    slug: "tidaltrees",
    title: "TidalTrees",
    subtitle: "Mangrove & Coastal Ecosystem Monitor",
    discipline: "Data / Visualization",
    category: "Research",
    planetType: "desertRinged",
    primaryColor: "#FFC857",
    secondaryColor: "#FF6B4A",
    glowColor: "rgba(255, 200, 87, 0.45)",
    year: "2024",
    role: "Data Visualization Engineer",
    team: "3 Hackathon Engineers",
    timeline: "Hackout 25 Hackathon",
    tools: ["React", "Three.js", "D3.js", "Python"],
    oneLineOutcome: "Built 3D tidal salinity and canopy growth simulation model.",
    featured: false,
    weight: 78,
    rings: 2,
    moons: 0,
    liveUrl: "https://github.com/tilak/tidaltrees",
    githubUrl: "https://github.com/tilak/tidaltrees",
    stats: [
      { label: "Simulation Speed", value: "30 FPS" },
      { label: "Data Points", value: "5,000+" },
      { label: "Ecosystems", value: "Coastal Delta" }
    ],
    missionBrief: {
      problem: "Ecologists lack interactive web-based 3D models to communicate tidal salinity erosion to non-technical policy makers.",
      solution: "A dynamic Three.js tidal surge simulator visualizing mangrove root density and carbon sink retention over 10-year timelines."
    },
    missionStages: [
      {
        stage: "01. Launch (The Problem)",
        title: "Invisible Coastal Erosion",
        content: "Complex ecological datasets are inaccessible to policy makers deciding coastal mangrove preservation budgets."
      },
      {
        stage: "02. Orbit (Research & Architecture)",
        title: "Parametric Root Geometry",
        content: "Generated procedural root networks in Three.js parameterized by tide height and soil salinity coefficients."
      },
      {
        stage: "03. Descent (Design & Implementation)",
        title: "Interactive Timeline Scrubbing",
        content: "Provided policy makers with a timeline slider showing 2025 to 2045 projected coastline protection."
      },
      {
        stage: "04. Landing (Outcomes & Impact)",
        title: "Hackout 25 Recognition",
        content: "Earned top honors for environmental impact and exceptional 3D visual communication."
      }
    ],
    blackBox: {
      failure: "Procedural geometry updates choked the render loop on laptops without dedicated GPUs.",
      learning: "Switched to instanced meshes and custom vertex shaders, multiplying performance by 6x."
    }
  },
  {
    slug: "quantum-synth",
    title: "Aura Soundscape Engine",
    subtitle: "Spatial Generative Audio Synthesizer",
    discipline: "Creative Code / Audio",
    category: "Creative",
    planetType: "crystal",
    primaryColor: "#E040A0",
    secondaryColor: "#7A3FB8",
    glowColor: "rgba(224, 64, 160, 0.45)",
    year: "2026",
    role: "Audio Systems Explorer",
    team: "Solo Exploration",
    timeline: "In Orbit",
    tools: ["Web Audio API", "WebAssembly", "Canvas 2D"],
    oneLineOutcome: "Upcoming deep space generative audio project currently in orbit.",
    featured: false,
    unexplored: true,
    weight: 70,
    rings: 1,
    moons: 0,
    liveUrl: "#",
    githubUrl: "#",
    stats: [
      { label: "Status", value: "In Orbit" },
      { label: "Launch Window", value: "Late 2026" }
    ],
    missionBrief: {
      problem: "Digital audio workstations require heavy local downloads and lack interactive generative web spaces.",
      solution: "A lightweight Web Audio ambient generative engine based on planetary harmonic ratios."
    },
    missionStages: [
      {
        stage: "01. Launch",
        title: "Unexplored Frontier",
        content: "Currently in theoretical design and DSP frequency profiling. Telemetry coming soon."
      }
    ],
    blackBox: {
      failure: "Pending orbital release.",
      learning: "Exploration in progress."
    }
  }
];

export const SKILLS_COCKPIT = {
  propulsion: [
    { name: "React & Modern Web", level: "Expert", tier: "Daily Thruster", desc: "Hooks, Fiber reconciliation, state machines, high-speed UI" },
    { name: "Python & FastAPI / Flask", level: "Expert", tier: "Daily Thruster", desc: "REST microservices, async worker queues, data pipelines" },
    { name: "SQL & Relational Architecture", level: "Confident", tier: "Core Propulsion", desc: "PostgreSQL, SQLite, complex schema design, query optimization" },
    { name: "JavaScript / TypeScript (ESNext)", level: "Expert", tier: "Daily Thruster", desc: "Functional patterns, DOM APIs, async concurrency, clean patterns" },
    { name: "HTML5 Canvas & Creative Code", level: "Confident", tier: "Core Propulsion", desc: "Fabric.js, 2D particle fields, mathematical layouts, SVG manipulation" }
  ],
  navigation: [
    { name: "Git & Version Control", level: "Expert", desc: "Branching strategies, rebase workflows, continuous CI readiness" },
    { name: "Three.js & GSAP", level: "Confident", desc: "3D scene graphs, smooth parallax transitions, timeline orchestrations" },
    { name: "Docker & Containerization", level: "Confident", desc: "Multi-stage builds, environment isolation, deploy uniformity" },
    { name: "Postman & API Design", level: "Expert", desc: "OpenAPI contracts, test suites, edge case fuzzing" },
    { name: "Figma & Design Tokens", level: "Confident", desc: "Color theory, component systems, typographic scale, UX flows" }
  ],
  lifeSupport: [
    { name: "Hackathon Rapid Prototyping", level: "Expert", desc: "Zero to MVP in 15-48 hours under pressure with validated demos" },
    { name: "Cross-Functional Communication", level: "Expert", desc: "Translating engineering trade-offs into plain English for stakeholders" },
    { name: "Curiosity & Independent Research", level: "Expert", desc: "Deep diving into documentation and RFCs to crack tricky edge cases" },
    { name: "Humility & Code Reviews", level: "Confident", desc: "Treating feedback as propulsion and keeping PRs focused and clean" }
  ],
  fuelGauge: [
    { name: "Distributed Systems & Raft Consensus", progress: "Active Deep Dive", eta: "Q3 2026" },
    { name: "Rust & High-Performance WebAssembly", progress: "Active Laboratory", eta: "Q4 2026" },
    { name: "GLSL Shader Programming & Post-Processing", progress: "Experiments in progress", eta: "Ongoing" }
  ]
};

export const UNFINISHED_IDEAS = [
  {
    id: "moon-1",
    title: "HoloDesk: Air-Gesture Window Manager",
    status: "Prototype",
    crater: "Alpha Crater",
    discipline: "Computer Vision",
    summary: "A webcam-based hand-gesture engine using MediaPipe to drag, snap, and resize web apps in 3D space.",
    whatIsMissing: "Lower CPU load on low-tier webcams and smoother pinch-release hysteresis.",
    tags: ["OpenCV", "MediaPipe", "React"]
  },
  {
    id: "moon-2",
    title: "GraphMind: Personal Knowledge Nebula",
    status: "Sketch",
    crater: "Beta Basin",
    discipline: "Knowledge Graph",
    summary: "Visualizing markdown notes as an interconnected gravitational galaxy where related ideas attract.",
    whatIsMissing: "High-performance WebGL graph force-directed layout that doesn't melt the GPU over 2,000 nodes.",
    tags: ["D3-Force", "WebGL", "Markdown"]
  },
  {
    id: "moon-3",
    title: "LocalFirst Sync: Zero-Cloud Journal",
    status: "Paused",
    crater: "Gamma Ridge",
    discipline: "Distributed State",
    summary: "Peer-to-peer encrypted sync engine running over WebRTC without a central server database.",
    whatIsMissing: "Clean conflict-free replicated data type (CRDT) merge strategy for rich media blobs.",
    tags: ["WebRTC", "Yjs", "IndexedDB"]
  }
];

export const CURIOSITIES_BLACK_HOLE = [
  {
    topic: "CRDTs & Local-First Software",
    pull: "Gravitational Maximum",
    type: "Architecture",
    notes: "How software can be owned entirely by the human on the device, syncing seamlessly across p2p swarms."
  },
  {
    topic: "Procedural Shaders & Raymarching",
    pull: "Strong Gravitational Field",
    type: "Graphics",
    notes: "Rendering photorealistic celestial phenomena using pure mathematical distance fields in 100 lines of GLSL."
  },
  {
    topic: "Low-Latency Audio in the Browser",
    pull: "Moderate Orbit",
    type: "Audio Tech",
    notes: "AudioWorklet threads, WebAssembly DSP filters, and real-time polyphonic synthesis without jitter."
  },
  {
    topic: "Information Architecture in Sci-Fi Interfaces",
    pull: "Strong Gravitational Field",
    type: "Design / UX",
    notes: "Why fictional aerospace telemetry feels immersive, and how to bring that clarity to real software tools."
  },
  {
    topic: "Relational Query Optimizers",
    pull: "Moderate Orbit",
    type: "Systems",
    notes: "How PostgreSQL transforms SQL syntax trees into cost-estimated physical execution plans."
  },
  {
    topic: "Bio-Mimetic Robotics & Micro-Locomotion",
    pull: "Outer Orbit",
    type: "Hardware & Nature",
    notes: "How nature solves navigation and balance in turbulent environments with minimal compute power."
  }
];

export const ORBIT_AMBITIONS = [
  {
    ring: "Now (0 - 3 Months)",
    timeframe: "NOW",
    role: "Full-Stack Software Engineering Intern",
    focus: "Contributing to high-leverage production web applications, optimizing API latency, and learning from senior staff engineers.",
    targets: ["Land a challenging summer internship", "Publish 2 in-depth case studies", "Master advanced React reconciliation"]
  },
  {
    ring: "6 Months (Autumn 2026)",
    timeframe: "6 MO",
    role: "Core Systems Contributor",
    focus: "Deepening distributed systems knowledge, building production microservices in Rust/Go, and leading hackathon teams.",
    targets: ["Ship an open-source developer utility", "Reach 1,000 GitHub stars on a lab experiment", "Complete coursework with top honors"]
  },
  {
    ring: "2 Years (Graduate Launch)",
    timeframe: "2 YRS",
    role: "Full-Stack Software Engineer",
    focus: "Designing mission-critical backend architectures and crafting distinctive, consumer-grade digital experiences.",
    targets: ["Design an enterprise-scale distributed pipeline", "Mentor junior student developers", "Speak at a developer tech conference"]
  },
  {
    ring: "Someday (Deep Space)",
    timeframe: "SOMEDAY",
    role: "Founding Engineer & Product Architect",
    focus: "Building tools that augment human creativity, scientific discovery, and open-source accessibility.",
    targets: ["Found an impactful software studio", "Design tools for space or environmental intelligence", "Build an enduring open-source community"]
  }
];

export const SHOOTING_STAR_FACTS = [
  "I learned to code at 2 a.m. because I wouldn't go to sleep until a button glowed with the exact right aura.",
  "I believe the greatest developer superpower is reading error stack traces with genuine curiosity instead of frustration.",
  "My sketchbooks and wireframe napkins outnumber my shoes three to one.",
  "I can identify typeface families from across the room by looking at their lowercase 'g' and uppercase 'R'.",
  "Fuel mixture: freshly brewed chai, ambient lo-fi playlists, and a strict hackathon countdown clock.",
  "The very first interactive project I ever built was an animated digital birthday card with sound effects.",
  "Whenever I hit a difficult programming bug, I step back and watch space telescope documentaries to reset my perspective.",
  "I name my test branches and experimental database schemas after moons and deep-space probes.",
  "Dream collaboration: Building an interactive digital exhibit bridging an art museum with an aerospace observatory.",
  "I believe dark mode isn't just a theme—it's a sanctuary for concentration and night-time creativity.",
  "At my first hackathon, our team's demo failed 7 minutes before the deadline, and we fixed it with 40 seconds to spare.",
  "I prefer clean semantic CSS and intentional math over loading five giant UI component libraries.",
  "Double-entry bookkeeping math in CashScript taught me more about database constraints than any textbook.",
  "I practice videography on weekends because cinematic lighting directly informs how I treat digital shadows and contrast.",
  "If you caught this shooting star, Commander Tilak grants you priority clearance to send a transmission!"
];

export const ASTRONAUT_QUOTES = [
  "Welcome aboard, explorer. Pick a planet to initiate landing sequence.",
  "That glowing turquoise sphere over there? Project PRATYAKSHA. It won 1st Place at Aetrix 2026.",
  "Houston, a recruiter has entered our orbit! Engaging Fast Lane navigation.",
  "Careful near that accretion disk—the Black Hole contains rabbit holes that might consume your afternoon.",
  "Every line of telemetry here was engineered with purpose. No fake percentages allowed.",
  "You've drifted into deep space. Don't worry, Mission Control will guide you back safely."
];
