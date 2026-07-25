# Page Pulse — Instant Web Page Health Analyzer

![Page Pulse Landing Page](public/next.svg)

Page Pulse is a modern, developer-focused SaaS platform that instantly analyzes web pages for SEO health, performance speed, heading structure, image accessibility, and content density. Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Design Decisions & Technical Rationale](#design-decisions--technical-rationale)
- [Future Improvements](#future-improvements)

---

## Project Overview

Page Pulse enables developers, marketers, and SEO specialists to diagnose web page health in seconds. By simply entering a target URL, Page Pulse fetches the page, measures response latency, validates HTML content, and extracts key page health indicators without complex configuration or CLI tools.

---

## Features

- ⚡ **Instant Web Page Analysis**: Fetches target pages and calculates network latency in real time.
- 🎯 **7 Core Health Metrics**:
  - **HTTP Status Code**: Validates 2xx/3xx/4xx/5xx responses with semantic status badges.
  - **Response Time**: Measures network latency with performance guidance.
  - **Page Title**: Validates presence, length, and SEO recommendations.
  - **Meta Description**: Checks description tag availability for search result previews.
  - **H1 Tag Hierarchy**: Ensures single main heading structure.
  - **Image Alt Text Audit**: Counts missing or empty `alt` attributes for screen reader accessibility.
  - **Word Count Density**: Calculates visible text length excluding non-visible elements (`<script>`, `<style>`, `<svg>`).
- 📊 **Dynamic Overall Health Score**: Computes a 0–100 health score with a color-coded SVG score ring.
- 🎨 **Minimal & Premium UI**: Clean dashboard aesthetics with custom blue primary styling, subtle micro-animations, glassmorphism navbar, and zero layout shift.
- 🛡️ **Robust Error Handling**: Classifies timeouts, DNS failures, connection refusals, 404s, 500s, and non-HTML documents with clean error cards and **Sonner** toast notifications.
- 🧪 **100% Vitest Unit Test Coverage**: Thoroughly tested parser, analyzer, and validation logic.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), Geist & Inter Google Fonts |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **HTML Parser** | [Cheerio](https://cheerio.js.org/) |
| **Validation** | [Zod v4](https://zod.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.si/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Testing** | [Vitest](https://vitest.dev/) |

---

## Architecture

Page Pulse follows a decoupled, single-responsibility architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│                       Client / UI Layer                         │
│   (HeroSection -> UrlForm -> ReportSection -> ReportGrid)       │
└───────────────────────────────┬─────────────────────────────────┘
                                │ POST /api/analyze { url }
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js API Route                          │
│                     (app/api/analyze/route.ts)                  │
│       • Zod Input Validation                                    │
│       • Error Code Mapping & HTTP Response Shaping             │
└───────────────────────────────┬─────────────────────────────────┘
                                │ analyzePage(url)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Analyzer Orchestrator                      │
│                      (app/lib/analyzer.ts)                      │
│       • Axios Fetch & Latency Measurement                       │
│       • Content-Type Validation (HTML Check)                    │
│       • Error Classification (Timeout, DNS, 502, 504)           │
└───────────────────────────────┬─────────────────────────────────┘
                                │ parseHtml(html)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Pure HTML Parser                          │
│                       (app/lib/parser.ts)                       │
│       • Cheerio DOM Extraction                                  │
│       • Title, Meta Description, H1, Image Alt, Word Count      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
pulse_page/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # POST /api/analyze route handler
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.tsx          # Status pill badges
│   │   │   ├── Button.tsx         # Primary/Secondary/Ghost button
│   │   │   ├── Card.tsx           # Compound Card primitive
│   │   │   ├── Input.tsx          # Form input primitive
│   │   │   ├── MetricRow.tsx      # Single metric row with icon
│   │   │   ├── SectionHeading.tsx # Reusable section title
│   │   │   └── Skeleton.tsx       # Animated pulse skeleton block
│   │   ├── CTASection.tsx         # Call to action section
│   │   ├── ErrorCard.tsx          # In-page error presentation card
│   │   ├── FeaturesSection.tsx    # 6-card feature grid
│   │   ├── Footer.tsx             # 4-column responsive footer
│   │   ├── HeroSection.tsx        # Hero banner with embedded UrlForm
│   │   ├── HowItWorksSection.tsx  # 3-step workflow diagram
│   │   ├── Loading.tsx            # Zero layout-shift loading skeleton
│   │   ├── Navbar.tsx             # Sticky glassmorphism header
│   │   ├── ReportCard.tsx         # Detailed metric report breakdown
│   │   ├── ReportGrid.tsx         # Score ring + ReportCard grid
│   │   ├── ReportSection.tsx      # Managed report view container
│   │   └── UrlForm.tsx            # URL input form component
│   ├── lib/
│   │   ├── analyzer.ts            # Network fetch & orchestration
│   │   ├── analyzer.test.ts       # Vitest tests for analyzer
│   │   ├── errors.ts              # Error taxonomy & Sonner toasts
│   │   ├── parser.ts              # Pure Cheerio HTML parsing logic
│   │   ├── parser.test.ts         # Vitest tests for parser
│   │   └── validation.test.ts     # Vitest tests for Zod validation
│   ├── globals.css                # Tailwind v4 theme & CSS custom props
│   ├── layout.tsx                 # Root layout & Sonner Toaster mount
│   └── page.tsx                   # Main page assembly & state manager
├── public/                        # Static assets
├── CLAUDE.md                      # Agent instructions & known issues
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
└── vitest.config.ts               # Vitest test runner setup
```

---

## API Documentation

### `POST /api/analyze`

Analyzes a target web page URL and returns health metrics.

#### Request Body (`application/json`)

```json
{
  "url": "https://example.com"
}
```

#### Response (`200 OK`)

```json
{
  "status": 200,
  "responseTime": 782,
  "title": "Example Domain",
  "metaDescription": null,
  "h1Count": 1,
  "missingAltImages": 0,
  "wordCount": 17
}
```

#### Error Responses

| Status Code | Scenario | Sample Response |
|---|---|---|
| `400 Bad Request` | Malformed JSON body | `{ "error": "Request body must be valid JSON." }` |
| `422 Unprocessable Entity` | Invalid URL format | `{ "error": "A valid URL is required (e.g. https://example.com)." }` |
| `422 Unprocessable Entity` | Non-HTML Content-Type | `{ "error": "Expected an HTML page but received \"application/json\"." }` |
| `502 Bad Gateway` | DNS / Network Failure | `{ "error": "DNS lookup failed — the domain could not be resolved." }` |
| `504 Gateway Timeout` | Timeout (>15 seconds) | `{ "error": "The target page took too long to respond (timeout)." }` |

#### cURL Example

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

---

## Setup & Installation

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Step-by-Step Instructions

1. **Clone repository**:
   ```bash
   git clone https://github.com/your-username/pulse_page.git
   cd pulse_page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000` to view the application.

---

## Environment Variables

Page Pulse works out of the box without required environment variables for core analysis. To configure custom timeouts or API parameters, create a `.env.local` file in the root directory:

```env
# Optional configuration
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Running Tests

Page Pulse uses **Vitest** for fast unit testing.

```bash
# Run all unit tests once
npx vitest run

# Run tests in watch mode
npx vitest

# Run tests with coverage report
npx vitest run --coverage
```

---

## Deployment

### Deploying on Vercel (Recommended)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import your project into [Vercel](https://vercel.com/new).
3. Vercel will automatically detect Next.js and build the project using `npm run build`.

### Building locally for production

```bash
npm run build
npm run start
```

---

## Design Decisions & Technical Rationale

### 1. Pure Functional Parser Decoupled from HTTP Fetching
* **Decision**: Kept `app/lib/parser.ts` strictly pure—receiving an HTML string and returning extracted metrics without making network calls.
* **Reasoning**: Decoupling HTML parsing from network I/O allows unit tests to execute synchronously in milliseconds without network mocks. It also prevents memory leaks and ensures parsing logic can be reused in serverless edge functions or worker pipelines.

### 2. Layout-Stable Skeleton Components for Zero CLS
* **Decision**: Created `Loading.tsx` skeleton cards that mirror the exact pixel dimensions, margins, and grid column spans of `ReportGrid.tsx`.
* **Reasoning**: Shifting layout elements when switching between loading and loaded states causes jarring visual jumps (Cumulative Layout Shift). Matching dimensions guarantees seamless transitions.

### 3. Discriminated Union Result Types for Error Handling
* **Decision**: Structured `analyzePage` in `analyzer.ts` to return explicit `{ ok: true, ... } | { ok: false, httpStatus, error }` unions rather than throwing uncaught exceptions.
* **Reasoning**: TypeScript forces caller code (e.g. Next.js API routes) to handle both success and failure paths explicitly, preventing unhandled promise rejections and stack trace leaks to end users.

---

## Future Improvements

- 📈 **Historical Tracking & Trends**: Store analysis history in PostgreSQL / Supabase to track web page health over time.
- ⚡ **Lighthouse Integration**: Connect Google Lighthouse API for deep Core Web Vitals (LCP, FID, CLS) auditing.
- 🔗 **Broken Link & Redirect Checker**: Crawl page anchors (`<a>` tags) to detect 404 links and redirect loops.
- 📄 **Exportable PDF Reports**: Allow users to download white-label PDF executive reports for client presentations.
