export interface Project {
  slug: string
  title: string
  client: string
  industry: string
  category: string
  videoType: string
  vimeoId: string | null
  youtubeId: string | null
  thumbnail: string
  year: string
  role: string
  deliverables: string[]
  summary: string
  overview: string
  challenge: string
  solution: string
  keyPoints: string[]
  gallery: string[]
  featured: boolean
}

export interface AnimationStyle {
  id: string
  name: string
  tagline: string
  image: string
  description: string
}

export const WORK_CATEGORIES = [
  'All',
  'SaaS',
  'E-commerce',
  'Cybersecurity',
  'Blockchain & FinTech',
  'Brand & Culture',
  'Tech / Event',
] as const

export const ANIMATION_STYLES: AnimationStyle[] = [
  {
    "id": "2d-character",
    "name": "2D Character",
    "tagline": "Empathetic character storytelling",
    "image": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/839ec8b5-a26a-4c8b-b5ba-56cfcb5cd6b6/6.2.png",
    "description": "Relatable human characters and emotional narrative arcs that connect users to your product on a personal level."
  },
  {
    "id": "2d-flat-vector",
    "name": "2D Flat / Vector",
    "tagline": "Clean, bold, modern branding",
    "image": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/a342a6a1-0f80-4166-b603-3f87cc5767c9/2.png",
    "description": "Crisp vector geometry, bold color blocking, and fluid kinetic transitions tailored for high-growth tech brands."
  },
  {
    "id": "3d-animation",
    "name": "3D Animation",
    "tagline": "Depth, realism & dynamic lighting",
    "image": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/8b7d62e9-d7f9-4682-819d-32c527a9bcfc/3.1.png",
    "description": "Sophisticated 3D spaces, product cutaways, and tactile textures that elevate brand perception and technical prestige."
  },
  {
    "id": "3d-isometric",
    "name": "3D Isometric",
    "tagline": "System architectures & data pipelines",
    "image": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/1a724382-d65b-436a-8b30-2b37d94c3170/18.png",
    "description": "Architectural perspectives that make multi-tiered software infrastructure, cloud topologies, and hardware networks clear at a glance."
  },
  {
    "id": "ui-ux-animation",
    "name": "UI/UX Animation",
    "tagline": "Kinetic product interactions",
    "image": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/f9a36421-e9ff-4c88-b4d6-7a09a42cdd48/10.10.png",
    "description": "Reimagined software UI walkthroughs with magnified gestures, slick micro-interactions, and frictionless feature demonstrations."
  },
  {
    "id": "collage-mixed-media",
    "name": "Collage & Mixed Media",
    "tagline": "Boundary-pushing visual textures",
    "image": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/eaaa1901-a120-4de8-8986-0df9f8a3434f/7.png",
    "description": "Combining live-action photographic elements, archival textures, vector geometry, and hand-drawn accents for unforgettable cultural impact."
  }
]

export const PROJECTS: Project[] = [
  {
    "slug": "amazon-earth-month-campaign-video-e-commerce-animation",
    "title": "Amazon Earth Month",
    "client": "Amazon",
    "industry": "E-commerce & Sustainability",
    "category": "E-commerce",
    "videoType": "Campaign Video",
    "vimeoId": "880084073",
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/83b54ee2-9fac-4f56-ba4b-d95446222af3/9.png",
    "year": "2023",
    "role": "Creative Concept, Storyboarding, 2D Animation, Sound Design",
    "deliverables": [
      "2D Vector Animation",
      "Campaign Storyboarding",
      "Character Illustration",
      "Sound & Audio Design",
      "Internal & External Distribution"
    ],
    "summary": "An environmental awareness campaign video for Amazon to inspire sustainable habits and eco-friendly packaging.",
    "overview": "This video was created for Amazon's environmental campaign to raise awareness about reducing plastic usage and encouraging waste recycling. Through captivating visuals and thoughtful motion design, we aimed to highlight the importance of sustainable habits and inspire viewers to take action for a greener future. Every frame was crafted to reflect Amazon's commitment to environmental responsibility.",
    "challenge": "How to make corporate sustainability guidance feel engaging, actionable, and warm rather than preachy or bureaucratic.",
    "solution": "We developed an intuitive visual narrative around \"The Five R’s\": Reduce Energy Consumption, Reuse, Repurpose boxes into everyday creations, Refuse single-use plastics, and Recycle properly.",
    "keyPoints": [
      "Reduce Energy Consumption: Turning lights off and optimizing workstation power",
      "Reuse: Promoting reusable bottles and everyday sustainable habits",
      "Repurpose: Transforming Amazon shipping boxes into garden tools or kids' play crafts",
      "Refuse & Recycle: Guiding proper disposal streams across global fulfillment centers"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/6438f36b-50d0-45ff-8db7-e3e620d3522a/Gif-1.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/fbc7a6b9-e2b2-47ea-9b2a-8bb6eaddfe62/Gif-2.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/40054897-36db-495f-8099-44fc955bf39f/Gif-3.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/f79f6a1a-6b96-4e40-9038-fb8035b75939/Gif-4.gif"
    ],
    "featured": true
  },
  {
    "slug": "amazon-activities-explainer-video-e-commerce",
    "title": "Amazon Activities & Loss Prevention",
    "client": "Amazon",
    "industry": "E-commerce Logistics",
    "category": "E-commerce",
    "videoType": "Explainer Video",
    "vimeoId": "881937676",
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/a42c1a2d-49b6-451b-b4f7-84d900ccbc1d/Amazon.png",
    "year": "2023",
    "role": "Visual Scripting, 2D Motion Design, UI Animation",
    "deliverables": [
      "Explainer Video",
      "2D Character Motion",
      "Workflow Diagrams",
      "Sound Effects"
    ],
    "summary": "Internal security and operational workflow explainer video created for Amazon's Loss Prevention team.",
    "overview": "A high-impact 2D animated explainer video for Amazon's Loss Prevention and Operational Security teams. It simplifies intricate internal security processes, tracking mechanisms, and fulfillment safety workflows into clear, reassuring visual communication for associates and leadership worldwide.",
    "challenge": "Explaining rigorous loss prevention protocols without creating fear or operational friction for frontline fulfillment staff.",
    "solution": "Constructed an empathetic, character-led animated narrative that illustrates safety, accountability, and seamless operational flow.",
    "keyPoints": [
      "Translating multi-step compliance protocols into easy-to-follow visual cues",
      "Unified brand palette respecting Amazon's core design guidelines",
      "High-energy character animation with relatable warehouse scenarios"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/9ac4eb7c-f27d-43ec-aa7a-5d2bda8d171a/1-04.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/69a3ec8d-161c-467e-845f-9e826fe3d346/1-08.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/a7c1664b-40cd-4ec3-a916-e74d25cd3117/1-09.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/5deb71f7-f66d-490a-b614-d6f33b519212/1-17.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/433a02aa-124f-47b1-9d83-5d32b9ea81c1/1-21.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/9e3df4af-f854-449f-98c5-f14fe66fcc1f/1-23.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/bcba22ee-7b2b-4c1a-b477-f01ba3f6ca13/wrist.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/74cd1dcb-0198-4415-bdcb-156a06dacffb/Hand-squeezes.gif"
    ],
    "featured": false
  },
  {
    "slug": "mezmo-explainer-video-data-observability-saas-animation",
    "title": "Mezmo Telemetry Pipeline",
    "client": "Mezmo",
    "industry": "Data Observability / SaaS",
    "category": "SaaS",
    "videoType": "Explainer Video",
    "vimeoId": "864685553",
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/4a64a9eb-df3b-4bb7-a4ac-40e135aa23c0/10.png",
    "year": "2023",
    "role": "Art Direction, 3D/2D Hybrid Motion, Sound Design",
    "deliverables": [
      "Technical Explainer Video",
      "Abstract Data Pipeline Visuals",
      "Product Architecture Animation",
      "Voiceover & Mixing"
    ],
    "summary": "Turning complex telemetry pipeline data observability into a clear, compelling product story for enterprise SaaS buyers.",
    "overview": "Mezmo Telemetry Pipeline helps engineering organizations collect, transform, and route telemetry data to control exploding cloud costs and drive actionability. With Mezmo, teams can centralize data from disparate sources via an open platform, apply custom processors to filter and transform data in-flight, and route it to platforms like Splunk, Datadog, New Relic, Grafana, and Prometheus.",
    "challenge": "Telemetry data flow is inherently abstract and invisible. Showing how data is intercepted, enriched, sampled, and routed without boring technical diagrams was critical.",
    "solution": "Designed an energetic geometric visual world with neon circuit conduits, floating 3D toruses, and data nodes that make real-time pipeline transformations tactile and visually satisfying.",
    "keyPoints": [
      "Visualizing ingestion from multi-cloud, Kubernetes, and legacy log streams",
      "Demonstrating in-stream cost optimization and deduplication before destination ingest",
      "High-tempo rhythm tuned to tech executives and DevOps team leads"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/7db205f8-d454-4a01-ae89-c2fac91c4b49/1.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/0d95fa02-95fc-4555-8612-ef5588711e2f/2.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/49983672-59b2-47b4-8964-8b005b1fd967/1747733138410-04e1f8e2-7483-4170-acf7-f392f64f1049_39.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/11623ccb-c2ba-4e0f-98c2-b6aef6a2b7d9/1747733138410-04e1f8e2-7483-4170-acf7-f392f64f1049_47.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/d76d62a3-0ebc-4908-84a6-f27d28b408c3/3.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/fbe257e7-b2aa-4791-8b67-7697b12e87e2/6.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/b4539245-771c-4a21-bf2c-437099c2d7fc/7.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/24b50f55-67fa-48a6-8084-7cb4e205bfc9/12.gif"
    ],
    "featured": true
  },
  {
    "slug": "vulcanlabs-core-values-brand-video",
    "title": "Vulcanlabs Core Values",
    "client": "Vulcanlabs",
    "industry": "Mobile Tech & AI",
    "category": "Brand & Culture",
    "videoType": "Brand Video",
    "vimeoId": "1086001252",
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/9c4c2f66-ded5-43c3-b853-addd23106014/4.6.png",
    "year": "2024",
    "role": "Script Adaptation, Character Design, 2D Animation",
    "deliverables": [
      "Brand Film",
      "Custom Character Assets",
      "Typography Animation",
      "Bilingual Sound Design"
    ],
    "summary": "Bringing company culture and core values to life through vibrant 2D motion design for team building and recruitment.",
    "overview": "An animated brand culture film for Vulcanlabs that celebrates the studio's foundational pillars: Integrity, Ownership, and Collaboration. Built to inspire internal teams and attract top global engineering talent, the video combines dynamic typography with expressive character animation.",
    "challenge": "Corporate values videos often sound generic. The challenge was injecting authentic personality and infectious energy into abstract virtues.",
    "solution": "Framed each core value as a shared superhero journey, using explosive transitions and playful interactions that illustrate teamwork in action.",
    "keyPoints": [
      "Integrity: Building enduring relationships through radical honesty and trust",
      "Ownership: Taking proactive responsibility and turning complex obstacles into shared victories",
      "Collaboration: Harmonizing diverse skill sets to build world-class mobile products"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/f3d3f6cc-e7e6-4f8f-a78d-3312147b04ed/1.3.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/08bb56f8-619e-4a0f-a840-372f6a343e03/3.11.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/f0997a6d-2554-456f-9618-f5408c3ec37f/4.6.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/10b3930d-3dd1-4ebb-b9a6-530448e3cc99/4.20.png"
    ],
    "featured": true
  },
  {
    "slug": "sisense-connect-explainer-video-saas-analytics",
    "title": "Sisense Connect — Ingestion & AI Modeling",
    "client": "Sisense",
    "industry": "Business Intelligence & Embedded Analytics",
    "category": "SaaS",
    "videoType": "Explainer Video",
    "vimeoId": null,
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/90f27209-9b20-4d0d-af44-4a5120453fec/9.png",
    "year": "2023",
    "role": "Product Storytelling, UI/UX Motion, 2D Animation",
    "deliverables": [
      "Part 1 of 3 Video Series",
      "UI Motion Graphics",
      "Data Connector Visualizations"
    ],
    "summary": "Demonstrating how businesses connect 400+ data sources, apply AI data modeling, and centralize actionable intelligence.",
    "overview": "Sisense is a leading embedded analytics platform that helps companies integrate powerful data insights directly into their products and workflows. For this project, we produced an explainer video focused on Sisense's data connection capabilities — showing how businesses can use over 400 data connectors to centralize information, apply AI-assisted data modeling, and extract actionable insights that drive real decisions.",
    "challenge": "Connecting databases, APIs, and cloud warehouses is dry. We needed to show the immense power of 400+ connectors effortlessly.",
    "solution": "Created a kinetic UI animation language that highlights fluid drag-and-drop connectors and real-time AI alerting.",
    "keyPoints": [
      "Unifying 400+ connectors into a centralized modeling canvas",
      "AI-assisted data relationship mapping and anomaly detection",
      "Setting the foundation for embedded product analytics"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/12fc24ca-c8bc-46cb-b215-ec9c5d6a13c4/3.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/06276e4b-412f-4afa-93ab-d5042d134b22/4.3.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/33fd036e-e651-4656-b70a-b9e2699c36b5/6.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/d2f69ea3-6e77-4fad-8a38-e987e0a28bb8/7.png"
    ],
    "featured": false
  },
  {
    "slug": "sisense-build-explainer-video-saas-analytics",
    "title": "Sisense Build — Embedded Dashboard Iteration",
    "client": "Sisense",
    "industry": "Business Intelligence & Embedded Analytics",
    "category": "SaaS",
    "videoType": "Explainer Video",
    "vimeoId": null,
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/e09f882d-7969-4ced-b740-c4751f4c5673/8.png",
    "year": "2023",
    "role": "Product Architecture Animation, UI Motion, Code Visualization",
    "deliverables": [
      "Part 2 of 3 Video Series",
      "Developer Experience Showcase",
      "Embedded UI Framework Animation"
    ],
    "summary": "Showing developers and analysts how to build customized, branded analytics experiences using no-code, low-code, and code-forward tooling.",
    "overview": "The second installment in the Sisense trilogy. While the first video focused on data ingestion, Sisense Build showcases what happens next: constructing analytics dashboards and embedding them seamlessly into host SaaS applications. The video demonstrates how developers can work in their native languages (Python, JavaScript, React) while business users leverage drag-and-drop components.",
    "challenge": "Appealing equally to non-technical product managers and hard-core frontend engineers.",
    "solution": "Structured a split visual progression demonstrating code-forward API capabilities on one side and intuitive visual builders on the other.",
    "keyPoints": [
      "No-code, low-code, and full-code customization pathways",
      "White-label embedding that perfectly matches the host product styling",
      "Rapid deployment of interactive chart components"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/0ab35e6f-6a42-491b-b3d4-049008753c1f/2.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/95175c2e-c2a0-463c-8598-9feee6c7c651/4.2.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/0b88aa47-858c-4dbb-8b91-fd503c1fca9d/5.2.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/9285c6b8-492d-456a-92b8-147bde542079/8.png"
    ],
    "featured": false
  },
  {
    "slug": "safous-product-demo-video-cybersecurity-animation",
    "title": "Safous Zero Trust Remote Access",
    "client": "Safous",
    "industry": "Cybersecurity / Zero Trust",
    "category": "Cybersecurity",
    "videoType": "Product Demo Video",
    "vimeoId": "657702408",
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/49f94d01-f284-4ac9-ac52-94fc79d0b885/30.png",
    "year": "2023",
    "role": "Cybersecurity Explainer, Technical Architecture, 2D Motion",
    "deliverables": [
      "Product Demo Video",
      "Zero Trust Architecture Diagram",
      "Threat Vector Animations"
    ],
    "summary": "Visualizing zero-trust cybersecurity architectures and Privileged Remote Access for enterprise decision-makers.",
    "overview": "Animated product demo for Safous — visualizing zero-trust cybersecurity solutions through clear 2D motion design for enterprise decision-makers. Privileged Remote Access provides end-to-end protection for every environment — IT, OT, IoT, or APIs — under a single Zero Trust framework with integrated PAM. Secure corporate networks, industrial systems, and more through one unified platform.",
    "challenge": "Making complex network topologies (OT/IT/IoT, PAM, reverse proxies) intuitive in under 90 seconds.",
    "solution": "Designed an elegant isometric cyber-space where perimeter vulnerabilities are sealed by instantaneous identity verification.",
    "keyPoints": [
      "Visualizing the principle of Never Trust, Always Verify",
      "Unified access for distributed workforces and contractor logins",
      "Zero latency clientless browser-based deployment"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/5ec321c2af33de48734cc929/1589849189154-90WSI722LNMGO75GG191/Aro+Ha_0393.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/2ce731b1-0327-410f-a938-64d49dc9acf9/1.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/bfb30ac0-2ef5-4b7f-9bc0-35dc484d2cbb/6.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/865032e9-a66b-4cfd-88d2-4c7408d700c6/7.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/44f6a874-3540-4ab1-a049-bab5c49ee9ee/11.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/b158de76-64ca-4533-9196-fde6cff52a73/14.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/22d1d5b9-8145-4a43-b06a-6e9c2bd8b6f8/30.png"
    ],
    "featured": true
  },
  {
    "slug": "sisense-delight-explainer-video-saas-analytics",
    "title": "Sisense Delight — End-User Data Experience",
    "client": "Sisense",
    "industry": "Business Intelligence & Embedded Analytics",
    "category": "SaaS",
    "videoType": "Explainer Video",
    "vimeoId": null,
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/75ca4757-a147-4dc8-927d-fc9818665e27/5.png",
    "year": "2023",
    "role": "UI Animation, Customer Experience Storyboarding, 2D Motion",
    "deliverables": [
      "Part 3 of 3 Video Series",
      "User Experience Showcase",
      "Interactive Dashboard Visuals"
    ],
    "summary": "Revealing the final end-user experience of embedded intelligence — turning raw analytics into daily delight.",
    "overview": "The grand finale of the three-part Sisense explainer series. Delight shows how product managers, developers, and everyday end users interact with data daily. From on-demand visualization testing to branded interactive filters and proactive notifications that pop up right inside their daily workflows.",
    "challenge": "Conveying that analytics isn't just charts — it's about immediate decision-making and product stickiness.",
    "solution": "Focused on human moments: the satisfaction of a business user discovering a trend and executing an action in a single click.",
    "keyPoints": [
      "Point-and-click visualization discovery for product leads",
      "Polishing grayscale prototypes into branded, vibrant UI components",
      "Contextual AI alerts delivered directly to mobile and desktop screens"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/3050dd63-8e22-474b-a2bb-22e43f3e0fbd/6.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/d8180707-374a-4e7f-ac66-1ac5650dda41/7.2.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/cc5a53e6-1ef5-4e23-80c7-76326e658444/8.2.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/d9d15619-dc80-4297-9492-d76ee774ce91/10.3.png"
    ],
    "featured": false
  },
  {
    "slug": "kameo-explainer-video-remote-workforce-saas-animation",
    "title": "Kameo On-Demand Workforce",
    "client": "Kameo",
    "industry": "HR Tech & SaaS",
    "category": "SaaS",
    "videoType": "Explainer Video",
    "vimeoId": null,
    "youtubeId": "1R_Mywx6yY0",
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/752c1126-a7cc-4ecf-b5e0-1a4535ea0936/Thumb.png",
    "year": "2023",
    "role": "Character Animation, Script Visualization, Sound Design",
    "deliverables": [
      "Explainer Video",
      "Character Rigs",
      "Product Demo Scenes"
    ],
    "summary": "Simplifying on-demand workforce matchmaking for businesses needing flexible, rapid talent deployment.",
    "overview": "An energetic animated explainer video for Kameo — a SaaS platform connecting enterprise operations with vetted, on-demand specialized workforce. 2D motion design engineered to cut through noisy HR tech marketing and deliver instant comprehension.",
    "challenge": "Balancing the dual needs of employers needing fast staffing and workers seeking reliable opportunities.",
    "solution": "Created a dual-perspective narrative that tracks an urgent staffing request through instant matching, credential verification, and on-site check-in.",
    "keyPoints": [
      "Vibrant character design that reflects diverse talent pools",
      "Automated compliance, verification, and payroll flows simplified",
      "High conversion video asset for landing page hero placement"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/451ae4b5-0312-4c1d-9fee-b799a3524c52/1.1.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/27d4bdcb-5136-4727-ad13-866138304e33/2.7.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/acd0f28a-529d-45e2-b94a-657f21c4006d/3.1.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/62952c2c-26fb-41c5-9618-8ac42f9357ab/4.4.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/a404a42b-0bdb-4481-966f-124902cfd3e1/7.2.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/038d6cb2-c2ca-4c09-aa30-6059b7a8d588/11.2.png"
    ],
    "featured": false
  },
  {
    "slug": "tomochain-explainer-video-blockchain-tech-animation",
    "title": "TomoChain Layer 1 Architecture",
    "client": "TomoChain",
    "industry": "Blockchain & Web3 Infrastructure",
    "category": "Blockchain",
    "videoType": "Explainer Video",
    "vimeoId": "648006387",
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/c0938c6c-db9d-4901-8cfd-6005cb40e233/Z3b-01.png",
    "year": "2023",
    "role": "Cryptographic Motion Design, 3D Isometric, Sound Design",
    "deliverables": [
      "Protocol Explainer Video",
      "Consensus Visualization",
      "Technical Diagram Animation"
    ],
    "summary": "Visualizing high-performance Proof-of-Stake Voting consensus and zero-fee transactions for global Web3 developers.",
    "overview": "A deep-dive cryptographic explainer video for TomoChain (now Viction), highlighting its Proof-of-Stake Voting (PoSV) consensus, near-zero transaction fees, and instant settlement speed. Tailored to educate developers, node validators, and institutional partners.",
    "challenge": "Consensus mechanisms are mathematically dense. We needed to communicate 2-second block times and 150 Masternodes clearly.",
    "solution": "Designed an ethereal futuristic visual matrix showing validator nodes voting in synchronized harmony, processing blocks in real time.",
    "keyPoints": [
      "Proof-of-Stake Voting (PoSV) consensus visualized in 3D isometric space",
      "Masternode election cycles and double-validation security architecture",
      "Frictionless user onboarding with near-zero gas fee abstractions"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/5ec321c2af33de48734cc929/1589849187024-0XJZ75CAPXF6P7N6TJOC/Aro+Ha_0428.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/ebe9536f-ae38-4201-98cc-1a262f157aea/1a2125108685451.5fc4c70e39559.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/078e28ef-e60d-496a-9fef-3bbfdc400432/b3f094108685451.5fc4c70e38dc8.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/a5faa40e-37f6-479e-bc24-99b1b4b9a3ae/8fb976108685451.5fc4c70e36b2b.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/4d71889a-039d-4f30-a130-faceb33227a7/18a202108685451.5fc4c70e37fb4.jpg",
      "https://images.squarespace-cdn.com/content/v1/5ec321c2af33de48734cc929/1589849187794-IV2PQUC9FSDWU3QTDL8V/Aro+Ha_0010.jpg"
    ],
    "featured": true
  },
  {
    "slug": "amazon-grocery-explainer-video-e-commerce",
    "title": "Amazon Fresh & Grocery Logistics",
    "client": "Amazon",
    "industry": "E-commerce & Retail Tech",
    "category": "E-commerce",
    "videoType": "Explainer Video",
    "vimeoId": null,
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/732aae3a-9d4d-46d9-8918-c26b99ff99be/Untitled+Project_Amazon+Grocery+16x9_2026-03-23_20.25.32.png",
    "year": "2023",
    "role": "Storyboarding, Vector Animation, Character Design",
    "deliverables": [
      "Explainer Video",
      "Customer Journey Map",
      "Retail Motion Design"
    ],
    "summary": "Unpacking the future of seamless grocery shopping, intelligent fulfillment, and doorstep cold-chain delivery.",
    "overview": "Explaining Amazon's sophisticated grocery delivery ecosystem — from intelligent regional cold storage to autonomous order batching and temperature-controlled doorstep delivery. Crafted to communicate freshness, speed, and reliability.",
    "challenge": "Illustrating cold-chain logistics without looking sterile or industrial.",
    "solution": "Used vibrant fresh food palettes, charming character interactions, and playful motion timing that highlights care and quality.",
    "keyPoints": [
      "End-to-end journey from online cart checkout to front porch delivery",
      "Intelligent routing and insulated packaging guarantees",
      "Reassuring communication tailored to everyday consumers"
    ],
    "gallery": [],
    "featured": false
  },
  {
    "slug": "amazon-peak",
    "title": "Amazon PEAK Season Operations",
    "client": "Amazon",
    "industry": "Global Logistics & Supply Chain",
    "category": "E-commerce",
    "videoType": "Explainer Video",
    "vimeoId": "800928613",
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/035d2c27-274d-41ec-8945-a2409b0b8cee/Thumb-06.png",
    "year": "2023",
    "role": "High-energy Motion Design, Storyboarding, Sound Design",
    "deliverables": [
      "Operational Video",
      "Team Motivation Video",
      "Process Flow Animation"
    ],
    "summary": "Rallying global fulfillment teams and aligning operational processes for peak holiday shopping volume.",
    "overview": "Amazon PEAK is the ultimate stress-test for worldwide supply chains. This high-energy animated video was produced to prepare, align, and motivate fulfillment operations teams ahead of peak holiday shopping volumes, emphasizing teamwork, safety, and logistical precision.",
    "challenge": "Conveying the immense scale of millions of parcels moving daily while prioritizing associate wellbeing.",
    "solution": "A rhythmic, inspirational motion graphics sequence that celebrates the frontline workers and smart automation keeping the world moving.",
    "keyPoints": [
      "Dynamic speed ramps and synchronized package sortation flows",
      "Safety protocols seamlessly integrated into every step",
      "Celebratory, uplifting musical pacing and sound design"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/486e44ce-d68c-4b5b-89db-eae36fe0c6e9/PEAK.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/ab57d610-1a5e-43bb-9848-90b6d769734a/4.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/85624c0c-0d51-4aa8-9ed6-8b093fb5f6bf/5.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/30a7a7a4-7bb6-4f2a-92b1-6df98c34d647/6.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/dbebc84a-a1bc-4e85-88d7-d5c670162b70/7.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/6f948bc4-a769-4d0b-ac72-a46ba25bf8e8/9.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/4202e759-fdf3-4906-9196-05055e663002/11.gif",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/2f760675-3c26-4154-883a-0f8244f958e0/12.gif"
    ],
    "featured": true
  },
  {
    "slug": "tripadvisor-beauty-to-go-explainer-video-travel-app-animation",
    "title": "Tripadvisor Beauty To Go",
    "client": "Tripadvisor",
    "industry": "Travel & Mobile Apps",
    "category": "Travel & Mobile App",
    "videoType": "Explainer Video",
    "vimeoId": null,
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/a252d52d-00af-4fb5-beb3-abb98ee281ba/Untitled+Project_Tripadvisor+16x9_2026-03-23_20.57.42.png",
    "year": "2023",
    "role": "Mobile UI Animation, Character Illustration, Sound Design",
    "deliverables": [
      "App Launch Explainer Video",
      "In-App Onboarding Snippets",
      "Social Cutdowns"
    ],
    "summary": "Connecting globetrotters with trusted wellness, beauty, and spa services on-the-go wherever they travel.",
    "overview": "An animated launch video for Tripadvisor's Beauty To Go travel initiative. Designed to help travelers instantly find, book, and review local wellness and beauty services in unfamiliar cities worldwide.",
    "challenge": "Inspiring confidence when booking self-care services in overseas locations.",
    "solution": "A breezy travelogue animation following a tourist navigating a busy metropolis and finding peaceful, vetted sanctuaries effortlessly.",
    "keyPoints": [
      "Seamless mobile UI screen mockups embedded into stylized travel vignettes",
      "Instant location-based recommendations and multi-currency booking flows",
      "Joyful, warm color palette evoking vacation serenity"
    ],
    "gallery": [],
    "featured": false
  },
  {
    "slug": "fizen-explainer-video-blockchain-tech-animation",
    "title": "Fizen Web3 Super App",
    "client": "Fizen",
    "industry": "FinTech & Web3 Payments",
    "category": "Blockchain & FinTech",
    "videoType": "Explainer Video",
    "vimeoId": "648015053",
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/431a78ed-dead-46a0-8dcd-a8511ca204d8/3.5-01.png",
    "year": "2023",
    "role": "FinTech UI Animation, 2D Motion Graphics, Scriptwriting",
    "deliverables": [
      "Product Launch Video",
      "Mobile Payment Demos",
      "Social Ad Cuts"
    ],
    "summary": "Bridging cryptocurrency with real-world spending across 25,000+ merchants with Apple Pay & Google Pay integration.",
    "overview": "Fizen is a crypto super-app that makes decentralized finance spendable in the physical world. This explainer video highlights how users can hold their crypto safely, earn yield, and spend it instantaneously on hotel bookings, travel tickets, and daily coffee with virtual debit cards.",
    "challenge": "Overcoming the stereotype that Web3 apps are clunky, risky, and unusable for daily commerce.",
    "solution": "Showcased lightning-quick tap-to-pay transactions with zero jargon, framing Fizen as the lifestyle wallet of modern digital nomads.",
    "keyPoints": [
      "Instant virtual crypto card generation linked to Apple Pay and Google Wallet",
      "Global gift cards and merchant integrations across 100+ countries",
      "Ultra-clean pastel visual aesthetic that demystifies digital assets"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/5ec321c2af33de48734cc929/1589849189154-90WSI722LNMGO75GG191/Aro+Ha_0393.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/9c4251ad-aea2-48f2-b225-030601255552/hi-01.jpg",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/f6210bda-4b7b-4d69-ae0b-aab81d2f98e8/Polkafi+new_Polkafi_2021-12-15_14.57.16.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/35106cee-434e-4d1e-b669-d278aefae05d/Polkafi+new_Polkafi_2021-12-15_14.57.33.png"
    ],
    "featured": false
  },
  {
    "slug": "pstudio-core-values-brand-video",
    "title": "PSTUDIO Core Values — Precise, Agile, Elegant",
    "client": "PSTUDIO",
    "industry": "Motion Design & Strategy",
    "category": "Creative Studio",
    "videoType": "Brand Video",
    "vimeoId": null,
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/1773550191835-7MFBHB3294QJ3GO8Q6EK/Thumbnail.png",
    "year": "2024",
    "role": "Creative Direction, Experimental Animation, Custom Sound Score",
    "deliverables": [
      "Studio Manifesto Video",
      "Design System Showcase",
      "Interactive Case Study Assets"
    ],
    "summary": "Our studio manifesto: how precision, agility, and business empathy turn animations into quantifiable commercial results.",
    "overview": "A visual manifesto showcasing the guiding philosophy of PSTUDIO. From our origins as craft-focused keyframe artists in Ho Chi Minh City to strategic partners solving bottom-line revenue problems for tech leaders worldwide.",
    "challenge": "Standing out in a saturated motion design landscape by demonstrating strategic business value.",
    "solution": "A hyper-polished, self-referential tour-de-force showcasing every animation technique in our repertoire, grounded in business clarity.",
    "keyPoints": [
      "Crafted with millimeter typographic precision and tailored easing curves",
      "Demonstrating our core belief: The best video is the one your customer finally understands",
      "100% designed, directed, and animated in-house"
    ],
    "gallery": [
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/51263ef4-46f5-4f5f-a954-6447be86856f/1-01.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/f52390a1-49cb-4875-ad90-1a6421af9e1c/2-01.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/5733cb3d-d65d-41f4-8c0b-a5a6c14a020f/3-01.png",
      "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/1d3f80d1-f098-43f2-bf6f-c7434d771d18/Thumbnail.png"
    ],
    "featured": true
  },
  {
    "slug": "meta-global-hackathon-event-video-tech",
    "title": "Meta Global Hackathon",
    "client": "Meta",
    "industry": "Big Tech / Open Source Developer Ecosystem",
    "category": "Tech / Event",
    "videoType": "Event Video",
    "vimeoId": null,
    "youtubeId": null,
    "thumbnail": "https://images.squarespace-cdn.com/content/v1/616d9e6d71f4f91a6e04df8b/91ae3471-db89-43f2-977d-d0b07dc5b7c1/4.png",
    "year": "2023",
    "role": "Event Branding Animation, Motion Graphics, Audio Engineering",
    "deliverables": [
      "Global Hackathon Teaser Video",
      "Keynote Opening Sequence",
      "Winner Ceremony Motion Package"
    ],
    "summary": "Igniting developer passion and celebrating open source innovation for Meta's premier global hackathon.",
    "overview": "High-octane keynote opener and event branding video produced for Meta's Global Developer Hackathon. Designed to electrify thousands of participating engineers, students, and founders building the future of AI and open web technologies.",
    "challenge": "Creating a universal, boundary-pushing visual language that resonates with elite software engineers worldwide.",
    "solution": "Combined kinetic typography, terminal syntax motifs, and neon generative vector shapes that pulse with competitive excitement.",
    "keyPoints": [
      "Kinetic code-syntax typographic animation and neon wireframes",
      "High-impact audio mastering designed for massive auditorium playback",
      "Modular motion kit adapted across live streams, stages, and social clips"
    ],
    "gallery": [],
    "featured": true
  }
]

export function getAllProjects(): Project[] {
  return PROJECTS
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}

export function getAdjacentProjects(currentSlug: string): {
  prev: Project
  next: Project
} {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug)
  const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length
  const nextIndex = (currentIndex + 1) % PROJECTS.length
  return {
    prev: PROJECTS[prevIndex],
    next: PROJECTS[nextIndex],
  }
}
