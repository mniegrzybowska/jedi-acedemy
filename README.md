# Jedi Academy

A web application for browsing and managing Jedi training courses. Built with Next.js 16, React 19, and SQLite.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TanStack Query, Tailwind CSS
- **Backend:** REST API (`/api/courses`) with layered architecture (controllers, services, repositories)
- **Database:** SQLite via better-sqlite3
- **Testing:** Vitest, React Testing Library, MSW

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `pnpm dev`         | Start development server |
| `pnpm build`       | Production build         |
| `pnpm start`       | Start production server  |
| `pnpm lint`        | Run ESLint               |
| `pnpm typecheck`   | Run TypeScript checks    |
| `pnpm test`        | Run tests                |
| `pnpm test:watch`  | Run tests in watch mode  |