---
name: improve-frontend-architecture
description: Refactor React frontend code following Nadia Makarevich's component composition patterns. Use when user wants to improve frontend architecture, decompose pages into sections, fix prop drilling, or restructure React components.
---

# Improve Frontend Architecture

Refactor React components following Nadia Makarevich's composition patterns from "Advanced React". The goal: pages become layout shells, sections become self-contained, and state lives in the smallest component that needs it.

## Composition Rules

### Pages are layout shells
A page component should have zero state and zero logic — only compose section components. If a page has a `useState` or data-fetching hook, push it down into the section that needs it.

### Sections own their data
Each section component colocates its data fetching, loading state, error state, and rendering. Callers never pass data down to a section — the section is self-contained.

### Move state down
State belongs in the smallest component that needs it. If only one section uses a piece of state, that section should own it — not a parent.

### Split by feature, not by layer
Group related components, hooks, and types in a feature folder (e.g. `courses/`). Don't scatter them across `components/`, `hooks/`, `types/` directories.

### Components as children/props over config props
Prefer passing components via `children` or render props over passing data + config objects. This avoids prop drilling and unnecessary re-renders.

### Extract when a branch appears
When a component has conditional rendering branches (loading/error/data), extract each branch into its own component.

## Process

### 1. Explore the frontend

Use the Agent tool with subagent_type=Explore to scan React components. Look for friction:

- Pages that own state or data fetching instead of delegating to sections
- Components with multiple conditional rendering branches (loading/error/data/empty) inlined
- Prop drilling — data passed through 2+ levels of components
- Feature code scattered across `components/`, `hooks/`, `types/` instead of colocated in a feature folder
- Components that receive data they could fetch themselves

### 2. Present candidates

Present a numbered list of composition improvements. For each candidate, show:

- **Component(s)**: Which files are involved
- **Friction**: What pattern is violated and why it hurts
- **Proposed structure**: What the component tree should look like after refactoring
- **Files to create/move**: New components and folder changes

Ask the user: "Which of these would you like me to fix?"

### 3. Implement

Apply the composition rules. For each refactored component:

1. Extract self-contained section components that own their data
2. Extract conditional branches into separate components
3. Colocate related files in feature folders
4. Reduce the parent to a layout shell

### 4. Validate

Run the feedback loops and fix any issues:

```
pnpm run typecheck
pnpm run lint
pnpm run test
```

Existing tests should pass without changes — composition refactors don't change behavior.
