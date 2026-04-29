# AuditAI

A modern, high-performance landing page and registration flow for **AuditAI**—an AI-powered bookkeeping and auditing platform designed to automate the grunt work of financial reviews.

Built with a sleek, professional "Icy Blue" aesthetic, the interface features smooth animations, dynamic bento-grid layouts, and interactive components that convey trust, speed, and cutting-edge artificial intelligence.

## ✨ Features

- **Dynamic Typography & Branding**: Custom "AUDIT AI" swoosh logo and premium typography using Space Grotesk and Satoshi fonts.
- **Engaging Hero Section**: High-conversion copy paired with subtle glowing gradients and modern dark-mode native styling.
- **Problem vs. Solution Matrix**: A clear, visually contrasting comparison highlighting the pain points of manual bookkeeping versus the AuditAI advantage.
- **Interactive Features Bento Grid**: A perfectly interlocked, responsive grid highlighting key capabilities like Duplicate Detection, Anomaly Flagging, and Universal Parsing.
- **"Live AI" FAQ Section**: Questions don't just expand—the answers dynamically type themselves out to simulate real-time AI generation.
- **Multi-Step Registration Wizard**: The premium tier "Upgrade" flow utilizes a sleek, 3-step animated wizard (Account -> Secure Payment -> Confirmation) rather than a long, dull scrolling form.
- **Dark-Reader Locked**: Custom meta-tags ensure the carefully crafted dark theme remains untouched by third-party browser extensions.

## 🛠 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

First, ensure you have Node.js installed. Then, clone the repository and install the dependencies:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

The project follows the standard Next.js App Router structure:
- `src/app/` - Contains the main routing, global CSS, and the root layout.
  - `(auth)/signup/page.tsx` - The dynamic multi-step registration wizard.
- `src/components/` - Highly reusable, modular UI components.
  - `Header.tsx` - Navigation and premium branding.
  - `HeroSection.tsx` - Primary call to action.
  - `ProblemSolution.tsx` - The visual contrast section.
  - `FeaturesBento.tsx` - The interlocking feature grid.
  - `FaqSection.tsx` - Typewriter-effect FAQs.
  - `PricingSection.tsx` - Interactive pricing tiers.

## 🎨 Design Philosophy

The UI is designed to feel like a high-end, reliable B2B SaaS product. By avoiding generic "AI sparkles" and opting for crisp layouts, subtle glowing icy-blue accents (`#0ea5e9`), and sophisticated multi-step interactions, the interface builds immediate trust with professional accounting firms.
