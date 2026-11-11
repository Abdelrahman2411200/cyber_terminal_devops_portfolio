# Abdelrahman Mohamed Ahmed — Portfolio

A modern, high-performance, single-page developer portfolio showcasing cloud-native architectures, distributed microservices (Java/Spring Boot, Python/FastAPI), and DevOps automation (Kubernetes, Terraform, CI/CD, Observability).

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Key Features

- **Single Source of Truth (`data/content.ts`)**: Update all personal info, skills, projects, and architecture details in one typed file.
- **Interactive System Architecture Showcase**: Interactive topology visualizer of the Event Management Platform highlighting API Gateway, Kafka Transactional Outbox, Saga orchestrator, and OpenTelemetry observability collectors.
- **Filterable Projects Matrix**: Categorized views (`Backend`, `DevOps`, `Full-Stack`, `AI`) with deep-dive modal inspection.
- **Dark-only design**: Manrope typography, a restrained violet palette, custom project diagrams, and a subtle animated background that respects reduced-motion preferences.
- **Direct CV Download**: Linked to [Abdelrahman_CV.pdf](file:///e:/Abdelrahman_Mohamed/public/Abdelrahman_CV.pdf) with one-click resume download.
- **Accessible & SEO Ready**: JSON-LD Structured Data, Open Graph metadata, sitemap, semantic markup, and `prefers-reduced-motion` compliance.

---

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build & Export Static Site**:
   ```bash
   npm run build
   ```
   This generates an optimized static export in the `out/` folder.

Development uses `.next-dev/`, production uses `.next/`, and browser tests use `.next-e2e/`. These separate caches keep a production build from replacing JavaScript used by an open localhost preview. Serve the export over HTTP rather than opening `out/index.html` directly.

### Browser regression checks

```bash
npx playwright install chromium
npm run test:e2e
```

The suite checks desktop and mobile navigation, project filters, case studies, search, architecture controls, PDF downloads, copying email (including restricted previews), dark-only rendering, and reduced motion. It also fails on runtime errors or failed Next.js assets.

To use an installed Chrome browser in PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm run test:e2e
```

Set `PORTFOLIO_TEST_URL` to run the same checks against an already running preview or static export.

---

## 📝 How to Update Your Content

To customize or add new projects and skills, simply edit [`data/content.ts`](file:///e:/Abdelrahman_Mohamed/data/content.ts):
- **Personal Info**: Update name, bio, social links, rotating headlines, or contact details.
- **Skills**: Add or modify categories and skill pills in `skills`.
- **Featured Projects**: Add new project objects to `featuredProjects`.
- **Academic Projects**: Update coursework items in `academicProjects`.
- **Architecture Showcase**: Edit nodes, flows, and resiliency guarantees in `architectureShowcase`.

---

## 🌐 Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
1. Push this repository to your GitHub account (`https://github.com/Abdelrahman2411200`).
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository. Vercel automatically detects Next.js.
4. Click **Deploy**.

### Option 2: Deploy to GitHub Pages
1. In `package.json`, ensure `npm run build` generates the static `out/` folder.
2. In GitHub repository settings -> **Pages**, select **GitHub Actions** as the build and deployment source.
3. Deploy the `out/` directory.

---

## 📄 License

MIT © Abdelrahman Mohamed Ahmed
