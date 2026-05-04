# AuditAI: Professional AI-Powered Financial Auditing

AuditAI is a sophisticated, enterprise-grade auditing platform designed for modern accounting firms. It leverages advanced artificial intelligence to automate complex financial reviews, identifying anomalies, duplicates, and compliance risks with precision and speed.

## Core Capabilities

### AI-Driven Transaction Analysis
Utilizes specialized models to perform deep-pass audits of financial data, identifying high-risk transactions and patterns that traditional manual reviews might overlook.

### Multi-Tenant Architecture
Designed for accounting firms of all sizes. Supports isolated firm management where administrators can oversee multiple clients, team members, and reporting cycles within a secure, unified environment.

### Automated Report Generation
Produces structured, executive-level audit reports with prioritized risk rankings (Audit Red), detailed anomaly descriptions, and recommended actions.

### Professional Multi-Step Onboarding
A refined registration workflow designed for high-end B2B users. Features secure firm account creation and integrated billing workflows for seamless transition from trial to professional tiers.

## Technical Implementation

### Backend Infrastructure
- **Framework**: Next.js 15+ (App Router)
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Prisma 7 (with Neon Driver Adapter)
- **Authentication**: Auth.js (NextAuth) with secure JWT session management and role-based access control (RBAC).

### Frontend Standards
- **Aesthetic**: Custom "Icy Blue" professional palette with high-contrast risk cues.
- **Styling**: Tailwind CSS with custom design tokens for consistency.
- **Interactions**: Framer Motion for subtle, purposeful transitions.
- **Typography**: Space Grotesk and Satoshi (High-legibility professional typefaces).

## Infrastructure & Integration

### Database Management
AuditAI utilizes a dual-connection architecture for maximum reliability:
- **Pooled Connections**: Optimized for low-latency application runtime via Neon's serverless pooler.
- **Direct Connections**: Dedicated channels for schema migrations and administrative maintenance.

### Security & Privacy
- Secure password hashing using bcrypt.
- Token-based session persistence.
- Role-based permissions for Admin, Accountant, and Junior Staff tiers.

## Development Setup

### Prerequisites
- Node.js (Latest LTS)
- PostgreSQL (or Neon account)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   DATABASE_URL="your_pooled_url"
   DIRECT_URL="your_direct_url"
   NEXTAUTH_SECRET="your_secret"
   ```
4. Synchronize the database schema:
   ```bash
   npx prisma db push
   ```
5. Initialize the development server:
   ```bash
   npm run dev
   ```

## Design Philosophy
AuditAI is built on the principle of "Technical Trust." The interface prioritizes clarity, performance, and professional aesthetics over generic trends. By utilizing monochromatic depth and purposeful micro-animations, the platform provides a reliable toolset for high-stakes financial environments.
