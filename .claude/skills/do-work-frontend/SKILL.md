---
name: do-work-frontend
description: "Execute a unit of work end-to-end: plan, implement, validate with typecheck and tests, then commit. Use when user wants to do work, build a feature, fix a bug, or implement a phase from a plan."
---

# Do Work

Execute a complete unit of work: plan it, build it, validate it, commit it.

## Workflow

### 1. Understand the task

Read any referenced plan or PRD. Explore the codebase to understand the relevant files, patterns, and conventions. If the task is ambiguous, ask the user to clarify scope before proceeding.

### 2. Plan the implementation (optional)

If the task has not already been planned, create a plan for it.

### 3. Implement

Work through the plan step by step.

#### React Component Composition (Nadia Makarevich pattern)

When building or refactoring React components, follow these composition rules:

- **Pages are layout shells.** A page component should have zero state and zero logic — only compose section components. If a page has a `useState` or data-fetching hook, push it down into the section that needs it.
- **Sections own their data.** Each section component colocates its data fetching, loading state, error state, and rendering. Callers never pass data down to a section — the section is self-contained.
- **Move state down.** State belongs in the smallest component that needs it. If only one section uses a piece of state, that section should own it — not a parent.
- **Split by feature, not by layer.** Group related components, hooks, and types in a feature folder (e.g. `courses/`). Don't scatter them across `components/`, `hooks/`, `types/` directories.
- **Components as children/props over config props.** Prefer passing components via `children` or render props over passing data + config objects. This avoids prop drilling and unnecessary re-renders.
- **Extract when a branch appears.** When a component has conditional rendering branches (loading/error/data), extract each branch into its own component.

#### API mocking with MSW

When a backend endpoint doesn't exist yet, define the API contract (request/response shapes) and create MSW handlers to mock it. Build the frontend against these mocks — the real backend can be wired up later.

#### Coding patterns

- **Early returns over nested ternaries.** In React components, prefer extracting conditional rendering into a helper component (or inline logic) that uses early `if`/`return` statements instead of nested ternary expressions (e.g. `isLoading ? ... : isError ? ... : ...`). This keeps each branch flat and readable.

### 4. Write tests

Write or update tests for all changed code. Follow the `frontend-tests` skill for React component and integration tests.

### 5. Validate

Run the feedback loops and fix any issues. Repeat until both pass cleanly.

```
pnpm run typecheck
pnpm run lint
pnpm run test
```

### 6. Commit

Once typecheck and tests pass, commit the work.
