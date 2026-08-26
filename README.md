# PStudio - Strategic Explainer Video Studio Website

Website chính thức của **PStudio** — Creative studio chuyên về Video giải thích chiến lược (Strategic Explainer Videos) cho các doanh nghiệp B2B SaaS & Công nghệ.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Lottie](https://lottiefiles.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Fonts**: Inter & Outfit (Google Fonts)

---

## 🛠️ Cài đặt & Chạy cục bộ (Local Development)

### Yêu cầu:
- Node.js >= 18.17.0
- npm / yarn / pnpm

### Các bước:

1. **Clone repository:**
   ```bash
   git clone <REPO_URL>
   cd PStudio
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy dev server:**
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để xem trang web.

4. **Build production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Cấu trúc thư mục (Project Structure)

```text
PStudio/
├── public/                  # Static assets (images, videos, Lottie animations)
│   ├── image/               # Artwork, client logos, thumbnails
│   ├── lottie/              # JSON Lottie animation files
│   └── video/               # Sizzle reel & demo video files
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── blog/            # Blog list & Dynamic article pages (/blog/[slug])
│   │   ├── layout.tsx       # Root layout & Metadata
│   │   ├── page.tsx         # Homepage
│   │   ├── robots.ts        # SEO robots.txt generator
│   │   └── sitemap.ts       # Dynamic XML sitemap generator
│   ├── components/          # Reusable UI Components
│   │   ├── Navbar.tsx       # Navigation bar (Sticky & Auto-hide)
│   │   ├── Hero.tsx         # Hero section
│   │   ├── QuoteSection.tsx # Quote / Sizzle Reel showcase
│   │   ├── Testimonials.tsx # Client logos & Social proof
│   │   ├── Process.tsx      # 3-step process cards
│   │   ├── SelectedWork.tsx # Featured project & Metrics section
│   │   ├── FAQ.tsx          # Frequently asked questions accordion
│   │   ├── CalloutFooter.tsx# Contact callout & Footer
│   │   └── FigmaGrid.tsx    # 12-column grid visual overlay (Shift + G)
│   ├── data/                # Static data & Blog markdown/JSON content
│   └── lib/                 # Utility functions
├── tailwind.config.js       # Custom colors, fonts, spacing tokens
└── tsconfig.json            # TypeScript configuration
```

---

## 💡 Tính năng nổi bật

- **Figma Grid Overlay**: Bấm phím tổ hợp `Shift + G` trên bàn phím để bật/tắt lưới 12 cột (Figma Grid 24px margin & gutter) phục vụ việc căn chỉnh thiết kế.
- **Dynamic SEO & Sitemap**: Tự động tạo `sitemap.xml` và `robots.txt` chuẩn SEO, hỗ trợ OpenGraph metadata cho từng bài viết blog.
- **Responsive & Performance**: Tối ưu chuẩn responsive từ mobile, tablet đến màn hình desktop lớn.

---

## 🚢 Hướng dẫn Deploy lên Production

Dự án Next.js sẵn sàng triển khai tốt nhất trên:
- **Vercel** (Khuyên dùng): Kết nối trực tiếp với GitHub repo, tự động build và cấp phát chứng chỉ SSL/CDN toàn cầu.
- **Cloudflare Pages / AWS Amplify / Netlify**: Hỗ trợ build Next.js output chuẩn.
