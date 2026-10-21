export interface PlaygroundItem {
  id: string
  number: string
  title: string
  category: string
  image: string
  videoUrl: string
  description: string
  year: string
  aspectRatio: string
  // Thứ tự hiển thị trong hàng ngang (theo thiết kế Figma 168:680)
  rowIndex: number
  // Tọa độ chụm (Pile / Cluster) ban đầu tại trung tâm
  pile: { x: number; y: number; rotate: number; scale: number; zIndex: number }
  // Tọa độ bung tỏa (Scatter) căn thẳng thớm theo hệ grid
  scatter: {
    // Vị trí trên hệ 12 cột chuẩn Figma Grid (desktop)
    colStart: number
    colSpan: number
    y: number
    rotate: number
    scale: number
    // Tọa độ tương đối thích ứng cho Mobile/Tablet (% offset từ tâm)
    mobile: { xPercent: number; yPercent: number; scale: number }
  }
}

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: 'dome-architecture',
    number: '01',
    title: 'Classical Dome & Spatial Perspective',
    category: 'Spatial Design & Light',
    image: '/image/playground/dome.webp',
    videoUrl: '/video/PSTUDIO SIZZLE REEL.mp4',
    description: 'An exploration of architectural depth, sunlight refraction, and classical cathedral forms rendered in real-time kinetic perspective.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 0,
    // Pile: chụm tự nhiên ở góc trái trên của chồng card
    pile: { x: -140, y: -30, rotate: -11, scale: 0.95, zIndex: 1 },
    // Scatter: Hàng trên, Cột 1 - 3 (thẳng tắp, rotate: 0, nhỏ gọn)
    scatter: {
      colStart: 1,
      colSpan: 3,
      y: -310,
      rotate: 0,
      scale: 0.88,
      mobile: { xPercent: -27, yPercent: -35, scale: 0.85 },
    },
  },
  {
    id: 'hypnotic-spiral',
    number: '02',
    title: 'Hypnotic Radial Harmonics',
    category: 'Kinetic Motion & Loops',
    image: '/image/playground/spiral.webp',
    videoUrl: '/video/PSTUDIO SIZZLE REEL.mp4',
    description: 'Mathematical spiral curves that cycle infinitely. Study on optical rhythm, rotational velocity, and golden ratio spiral stairs.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 1,
    pile: { x: -35, y: -55, rotate: 4, scale: 0.95, zIndex: 4 },
    // Scatter: Hàng trên, Cột 5 - 8 (căn giữa, đẩy cao lên y: -350 để không che chữ We love making)
    scatter: {
      colStart: 5,
      colSpan: 4,
      y: -350,
      rotate: 0,
      scale: 0.84,
      mobile: { xPercent: 0, yPercent: -43, scale: 0.82 },
    },
  },
  {
    id: 'wild-campfire',
    number: '03',
    title: 'Campfire & Organic Fluids',
    category: 'Atmospheric Motion',
    image: '/image/playground/fire.webp',
    videoUrl: '/video/PSTUDIO\'S CORE VALUE.mp4',
    description: 'Particle combustion and organic fluid simulation of crackling embers, smoke turbulence, and ambient warmth under starlight.',
    year: '2026',
    aspectRatio: 'aspect-[16/10]',
    rowIndex: 5,
    pile: { x: 130, y: -25, rotate: 12, scale: 0.94, zIndex: 2 },
    // Scatter: Hàng trên, Cột 10 - 12 (căn lề phải, thẳng tắp với Cột 10-12)
    scatter: {
      colStart: 10,
      colSpan: 3,
      y: -310,
      rotate: 0,
      scale: 0.88,
      mobile: { xPercent: 27, yPercent: -35, scale: 0.85 },
    },
  },
  {
    id: 'golden-sunset',
    number: '04',
    title: 'Golden Hour Ocean Drift',
    category: 'Color Grading & Lighting',
    image: '/image/playground/sunset.webp',
    videoUrl: '/video/PSTUDIO SIZZLE REEL.mp4',
    description: 'A study of golden-hour twilight on undulating ocean swells. Subtle wave displacement and soft atmospheric haze.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 3,
    pile: { x: -110, y: 35, rotate: -6, scale: 0.96, zIndex: 5 },
    // Scatter: Hàng giữa, Cột 1 - 3 (thẳng hàng dọc 100% với Thẻ 1 dome-architecture!)
    scatter: {
      colStart: 1,
      colSpan: 3,
      y: 0,
      rotate: 0,
      scale: 0.88,
      mobile: { xPercent: -30, yPercent: -13, scale: 0.82 },
    },
  },
  {
    id: 'creative-atelier',
    number: '05',
    title: 'The Creative Atelier',
    category: 'Physical Craft & Set Design',
    image: '/image/playground/studio.webp',
    videoUrl: '/video/PSTUDIO\'S CORE VALUE.mp4',
    description: 'Morning light streaming into our studio atelier. Miniature prototypes, typography mockups, and the tactile joy of handmade creativity.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 4,
    pile: { x: 0, y: 15, rotate: -2, scale: 0.98, zIndex: 6 },
    // Scatter: Hàng dưới, Cột 2 - 5 (đẩy xuống y: 335 để không che chữ Cool Stuff)
    scatter: {
      colStart: 2,
      colSpan: 4,
      y: 335,
      rotate: 0,
      scale: 0.84,
      mobile: { xPercent: -27, yPercent: 33, scale: 0.85 },
    },
  },
  {
    id: 'highlands-mist',
    number: '06',
    title: 'Highlands Mist & Adventure',
    category: 'Environmental Storytelling',
    image: '/image/playground/mountain.webp',
    videoUrl: '/video/PSTUDIO SIZZLE REEL.mp4',
    description: 'Dynamic volumetric fog drifting across rugged ridge lines. Capturing the solitary thrill of exploring untamed terrain.',
    year: '2026',
    aspectRatio: 'aspect-[16/10]',
    rowIndex: 2,
    pile: { x: 120, y: 40, rotate: 8, scale: 0.94, zIndex: 3 },
    // Scatter: Hàng giữa, Cột 10 - 12 (thẳng hàng dọc 100% với Thẻ 3 wild-campfire!)
    scatter: {
      colStart: 10,
      colSpan: 3,
      y: 0,
      rotate: 0,
      scale: 0.88,
      mobile: { xPercent: 30, yPercent: -13, scale: 0.82 },
    },
  },
  {
    id: 'curious-alpaca',
    number: '07',
    title: 'Curious Highlands Wanderer',
    category: 'Character & Expressive Motion',
    image: '/image/playground/alpaca.webp',
    videoUrl: '/video/PSTUDIO\'S CORE VALUE.mp4',
    description: 'A playful character vignette exploring expressive eye contact, micro-head tilts, and spontaneous personality in motion design.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 6,
    pile: { x: 10, y: -10, rotate: 5, scale: 0.99, zIndex: 7 },
    // Scatter: Hàng dưới, Cột 8 - 11 (đẩy xuống y: 335 để không che chữ Cool Stuff)
    scatter: {
      colStart: 8,
      colSpan: 4,
      y: 335,
      rotate: 0,
      scale: 0.84,
      mobile: { xPercent: 27, yPercent: 33, scale: 0.85 },
    },
  },
  {
    id: 'neon-metropolis',
    number: '08',
    title: 'Neon Metropolis & Cyber Visions',
    category: 'Future Urbanism',
    image: '/image/Work/10.webp',
    videoUrl: '/video/PSTUDIO SIZZLE REEL.mp4',
    description: 'Reflective glass facades, volumetric neon glow, and nocturnal architectural compositions.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 7,
    pile: { x: 40, y: 30, rotate: 6, scale: 0.95, zIndex: 8 },
    scatter: {
      colStart: 1,
      colSpan: 3,
      y: 0,
      rotate: 0,
      scale: 0.88,
      mobile: { xPercent: 0, yPercent: 0, scale: 0.85 },
    },
  },
  {
    id: 'kinetic-fluidity',
    number: '09',
    title: 'Abstract Kinetic Sculptures',
    category: '3D Form Exploration',
    image: '/image/Work/4.6.webp',
    videoUrl: "/video/PSTUDIO'S CORE VALUE.mp4",
    description: 'Sculptural dynamic curves dancing with liquid chrome reflections and tactile physics.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 8,
    pile: { x: -60, y: -20, rotate: -4, scale: 0.95, zIndex: 9 },
    scatter: {
      colStart: 4,
      colSpan: 3,
      y: 0,
      rotate: 0,
      scale: 0.88,
      mobile: { xPercent: 0, yPercent: 0, scale: 0.85 },
    },
  },
  {
    id: 'brand-odyssey',
    number: '10',
    title: 'Brand Odyssey & Identity',
    category: 'Motion Identity',
    image: '/image/Work/Amazon.webp',
    videoUrl: '/video/PSTUDIO SIZZLE REEL.mp4',
    description: 'Dynamic brand storytelling, kinetic typography rhythms, and bold visual pacing.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 9,
    pile: { x: 80, y: 10, rotate: 3, scale: 0.95, zIndex: 10 },
    scatter: {
      colStart: 7,
      colSpan: 3,
      y: 0,
      rotate: 0,
      scale: 0.88,
      mobile: { xPercent: 0, yPercent: 0, scale: 0.85 },
    },
  },
  {
    id: 'geometric-echoes',
    number: '11',
    title: 'Geometric Echoes & Rhythm',
    category: 'Generative Design',
    image: '/image/Work/Thumb-06.webp',
    videoUrl: "/video/PSTUDIO'S CORE VALUE.mp4",
    description: 'Vibrant modular grids and color transitions celebrating the harmony of geometric design.',
    year: '2026',
    aspectRatio: 'aspect-[4/3]',
    rowIndex: 10,
    pile: { x: -30, y: 40, rotate: -7, scale: 0.95, zIndex: 11 },
    scatter: {
      colStart: 10,
      colSpan: 3,
      y: 0,
      rotate: 0,
      scale: 0.88,
      mobile: { xPercent: 0, yPercent: 0, scale: 0.85 },
    },
  },
]
