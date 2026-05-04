@AGENTS.md

# My Project

## Overview
Jedi Academy is a Next.js 16 web app for browsing and managing Jedi training courses. 
The frontend uses React 19, TanStack Query, and Tailwind CSS. 
The backend is a REST API (`/api/courses`) backed by SQLite (better-sqlite3) with a layered architecture: controllers, services, and repositories. 
Tests use Vitest with React Testing Library and MSW.


## Package Manager
Use pnpm (not npm or yarn).

## Commands
- Typecheck: `pnpm typecheck`
- Test: `pnpm test`
- Lint: `pnpm lint`