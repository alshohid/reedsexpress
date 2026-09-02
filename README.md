<div align="center">

  <h1>🚚 Fleetos pro</h1>

  <p>
    A production-oriented, multi-tenant freight &amp; logistics dispatch management platform.
    <br/>
    Powered by <strong>Next.js 16</strong> (App Router), <strong>React 19</strong>, <strong>TypeScript</strong> and <strong>Redux Toolkit / RTK Query</strong>.
  </p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
    <img alt="React" src="https://img.shields.io/badge/React-19-087ea4?style=flat-square&logo=react" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss" />
    <img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux_Toolkit-2.2-764abc?style=flat-square&logo=redux" />
  </p>

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Role-based workspaces](#role-based-workspaces)
- [Screenshots](#screenshots)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Authentication & API architecture](#authentication--api-architecture)
- [Design mode (mock API)](#design-mode-mock-api)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## About

Fleetos Pro is a web application for managing day-to-day freight and logistics operations: dispatching loads, onboarding carriers and drivers, tracking shipments, generating invoices and financial statements, and administering pricing plans and organizations.

The application is split into three isolated, role-scoped workspaces — **Dispatcher**, **Admin** and **Super Admin** — all sharing a single codebase, a common UI kit, and one Redux Toolkit / RTK Query data layer that performs automatic access-token refresh on `401` responses.

## Features

- **Role-based dashboards** — dedicated experiences for dispatchers, admins and super admins with route-level isolation.
- **Secure authentication** — JWT access + refresh tokens with silent, single-flight token refresh and logout-on-expiry handling.
- **Carrier & driver management** — carrier onboarding, documents, driver performance and availability.
- **Load dispatching** — assigned-load views, load detail, and new-load intake across dispatcher workflows.
- **Live tracking & communications** — monitoring and communication surfaces for active operations.
- **Finance suite** — invoices, statements (with generation flows) and pricing-plan management.
- **Reporting & analytics** — charts, performance tables and revenue trends powered by Chart.js and Recharts.
- **PDF & QR support** — document/statement export via `jspdf` and QR rendering via `react-qr-code`.
- **Design / mock mode** — run the entire UI without a backend (see [Design mode](#design-mode-mock-api)).
- **Theming & responsive UI** — shadcn/ui (new-york) primitives, Radix UI, Tailwind CSS v4, and dark/light theme switch.

## Role-based workspaces

| Workspace | Base route | Highlights |
| --- | --- | --- |
| **Dispatcher** | `/dispatcher/dashboard` | Overview, reports, carriers, drivers, loads, communications, documents, invoices, statements, settings, support, live tracking |
| **Admin** | `/admin/dashboard` | Overview, user management, dispatchers, carriers, documents, support, invoices, statements, pricing plan, performance, reports |
| **Super Admin** | `/super-admin/dashboard` | Overview, user management, organizations, dispatcher management, performance, documents, carriers, support, invoices, statements, pricing plan, analytics |

Public pages: `/login`, `/sign-up`, `/forgot-password`. The root `/` redirects visitors to `/login`, and unauthenticated users visiting a protected route are redirected to login.

## Screenshots

Screenshots are stored in `public/screenshots/`:

| File | Screen |
| --- | --- |
| `login_sm.png` | Login page |
| `dashboard.png` | Dispatcher dashboard |
| `login_lg.png` | Login page |
| `admin-sm.png` | Dispatcher dashboard |

| Login (Mobile) | Login (Desktop) |
| :---: | :---: |
| ![Login mobile](/public/screenshots/login_sm.png) | ![Login desktop](/public/screenshots/login_lg.png) |

| Dispatcher Dashboard (Desktop) | Dispatcher Dashboard (Mobile) |
| :---: | :---: |
| ![Dispatcher Dashboard](/public/screenshots/dashboard.png) | ![Dispatcher Dashboard mobile](/public/screenshots/admin-sm.png) |

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.1 (App Router), React 19, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4, shadcn/ui (new-york), Radix UI, tailwind-merge, class-variance-authority |
| State & data | Redux Toolkit 2.2, React Redux 9, RTK Query (with base-query refresh logic) |
| Icons | lucide-react, react-icons, custom SVG components (`src/icons`) |
| Charts | Chart.js + react-chartjs-2, Recharts |
| Forms | react-hook-form |
| Dates | date-fns, react-day-picker |
| PDF & QR | jspdf, react-qr-code |
| Misc | js-cookie (auth cookies), react-hot-toast, country-data-list, react-circle-flags |
| Lint | ESLint 9 (`eslint-config-next` core-web-vitals + TypeScript) |
| Package manager | npm (lockfile: `package-lock.json`) |

## Getting started

### Prerequisites

- **Node.js** `20.9+` (required by Next.js 16)
- **npm** `10+`

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env.local` file in the project root and adjust the values:

```bash
# URL of the Fleetos Pro backend API (trailing slash is optional)
NEXT_PUBLIC_API_BASE_URL=http://192.168.7.42:4010/api

# When true, all API calls return deterministic mock responses (no backend needed).
# Set to "false" to talk to the real backend.
NEXT_PUBLIC_DESIGN_MODE=true
```

> `.env*` files are git-ignored. Never commit real credentials or secrets.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/login`.

> In **design mode**, use any email — the role is derived from it: emails containing `super` → Super Admin,
> `dispatcher` → Dispatcher, anything else → Admin (see [Design mode](#design-mode-mock-api)).

### 4. Production build & local preview

```bash
npm run build && npm run start
```

## Environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | No | `http://192.168.7.42:4010/api` | Base URL of the backend REST API consumed by RTK Query. Trailing slashes are normalized away. |
| `NEXT_PUBLIC_DESIGN_MODE` | No | `true` | Set to `false` to disable mock API responses and connect to the real backend. |

## Available scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `next dev` | Start the development server with hot reload |
| `build` | `next build` | Create an optimized production build |
| `start` | `next start` | Serve the production build (run after `build`) |
| `lint` | `eslint` | Lint the codebase with ESLint 9 |
## Project structure

```text
reeds-express/
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── (public)/                   # /login, /sign-up, /forgot-password
│   │   ├── (protected)/                # role-scoped route groups
│   │   │   ├── (dispatcher)/           #   /dispatcher/dashboard/*
│   │   │   ├── (admin)/                #   /admin/dashboard/*
│   │   │   └── (super-admin)/          #   /super-admin/dashboard/*
│   │   ├── layout.tsx                  # Root layout (Redux, Theme, Sidebar providers)
│   │   ├── not-found.tsx               # 404 page
│   │   └── globals.css                 # Tailwind v4 entry + design tokens
│   ├── components/                     # Feature + shared UI
│   │   ├── ui/                         # shadcn/ui primitives (button, card, table, badge…)
│   │   ├── admin/                      # Admin-workspace components
│   │   ├── dispatcher/                 # Dispatcher-workspace components
│   │   ├── super-admin/                # Super-admin components
│   │   ├── carriers/ invoices/ statements/ plans/ …
│   ├── context/                        # ThemeContext, SidebarContext
│   ├── hooks/                          # useAuth, useModal, useAdminSupportChat
│   ├── icons/                          # Custom SVG icon components
│   ├── layout/                         # AppHeader, AppSidebar, Backdrop
│   ├── lib/                            # env, routes, auth config, sidebar config, helpers
│   ├── redux/
│   │   ├── api/                        # baseApi (RTK Query) + design-mode responder
│   │   ├── features/                   # auth slice + admin feature slices
│   │   ├── services/                   # API service modules
│   │   ├── store.ts                    # Redux store configuration
│   │   └── ReduxProvider.tsx
│   ├── sharedComponents/               # Auth forms, role dashboard shells, footer
│   └── types/                          # Domain TypeScript types (auth, dispatcher, driver…)
├── public/                             # Static assets, logos, fonts
├── components.json                     # shadcn/ui configuration
├── next.config.ts                      # Next.js config (SVGR loader, remote image domains)
├── eslint.config.mjs                   # ESLint 9 flat config
└── tsconfig.json                       # Path alias: @/* → project root
```

Key files to know:

- `src/lib/env.ts` — single source of truth for environment variables.
- `src/redux/api/baseApi.ts` — RTK Query base query with bearer-token injection and automatic token refresh.
- `src/redux/features/auth/authSlice.ts` — auth state, credentials and tokens.
- `src/lib/auth/config.ts` — role normalization, auth cookie names and role → default-route mapping.
- `src/lib/sidebarConfig.tsx` — navigation definitions for each role.

## Authentication & API architecture

### Auth flow

1. `POST /auth/login` returns the access token, refresh token and the user role.
2. Tokens are persisted to Redux (`auth` slice) and browser cookies (`jr_auth_token`, `jr_refresh_token`, `jr_auth_role`).
3. Every RTK Query request attaches `Authorization: Bearer <token>` and `access_token: <token>` headers.
4. On a `401` (except for the refresh request itself) the app performs a **single-flight** `POST /auth/refresh-token` call — concurrent failures share one in-flight refresh promise.
5. If refresh succeeds, new tokens are dispatched to the store and the original request is retried.
6. If refresh fails, the user is logged out and redirected to `/login`.

### Route guarding

Roles are normalized to `dispatcher | admin | super-admin | null`. Each protected route group
(`(protected)/(dispatcher)`, `(protected)/(admin)`, `(protected)/(super-admin)`) is scoped to its role, and
`getDefaultRouteForRole` / `resolvePostLoginPath` decide where a user lands after login.

### Design mode (mock API)

When `NEXT_PUBLIC_DESIGN_MODE=true` (the default), the RTK Query base query short-circuits and returns deterministic
mock payloads built in `src/redux/api/designMode.ts`, so the entire UI can be explored without a backend:

- `POST /auth/login` derives the role from the email address: emails containing `super` → Super Admin, `dispatcher` → Dispatcher, otherwise Admin.
- Dashboard stats endpoints (`/dispatcher/dashboard/stats`, `/admin/dashboard/states`, `/super-admin/dashboard/stats`, …) return empty-shaped payloads that match the dashboard contracts.
- Generic `GET` endpoints return empty paginated collections; other methods return a success envelope.

Set `NEXT_PUBLIC_DESIGN_MODE=false` to connect the dashboard to the real Fleetos Pro API.

## Deployment

### Node-based hosting (VPS / Docker / on-premise)

```bash
npm ci
npm run build
npm start   # serves the production build; HOST / PORT can be provided via env
```

`NEXT_PUBLIC_*` variables are inlined at build time, so configure them **before** running `npm run build`.

### Vercel

1. Import the repository into Vercel (framework preset: **Next.js**).
2. Add `NEXT_PUBLIC_API_BASE_URL` (and set `NEXT_PUBLIC_DESIGN_MODE=false` for production) under Project → Settings → Environment Variables.
3. Deploy from the `main` branch.

> **Note:** any external image hosts used by `next/image` must be registered in `next.config.ts`
> (`images.domains`). If the API or CDN host changes, update the list before deploying.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Every list shows empty data | `NEXT_PUBLIC_DESIGN_MODE=true` — mock responses are active. Set it to `false`. |
| Env changes have no effect | `NEXT_PUBLIC_*` values are inlined at build/start time — restart `npm run dev` after editing. |
| API calls fail with CORS errors | The backend must allow the dashboard's origin (dev or production host). |
| Redirect loop / constant `401` at login | Session refresh failed and the app logged the user out — check JWT clocks and the refresh-token endpoint. |
| `next/image` errors for remote images | Add the offending host to `images.domains` in `next.config.ts`. |
| Port 3000 already in use | Run with another port: `npm run dev -- -p 3001`. |

## Contributing

1. Create a feature branch off `main` (prefix convention: `feat/`, `fix/`, `chore/`, `refactor/`).
2. Keep changes scoped to the workspace you touch and reuse the shared UI kit and existing patterns.
3. Run checks before pushing:

   ```bash
   npm run lint
   npm run build
   ```

4. Write descriptive conventional commit messages (e.g. `feat(dispatcher): add load export`).
5. Open a pull request with a summary and screenshots for any UI changes.

## License

Private repository — all rights reserved. This project is not licensed for public distribution.
