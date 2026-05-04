---
name: prd-to-plan-frontend
description: "Turn a frontend PRD into a multi-phase implementation plan using tracer-bullet vertical slices aligned with component composition patterns. Use when user wants to plan a frontend feature, break down a UI PRD, or create frontend implementation phases."
---

# PRD to Plan (Frontend)

Break a frontend PRD into a phased implementation plan using vertical slices (tracer bullets). Each slice delivers a working, visible increment. Output is a Markdown file in `./plans/`.

## Process

### 1. Confirm the PRD is in context

The PRD should already be in the conversation. If it isn't, ask the user to paste it or point you to the file.

### 2. Explore the codebase

Understand the current frontend architecture: routing, component patterns, data fetching approach, state management, styling, and test setup.

### 3. Identify durable architectural decisions

Before slicing, identify high-level decisions that span the entire feature:

- Route structure / URL patterns
- Page and section boundaries (which pages, which sections per page)
- Data ownership — which section owns which data
- Shared vs feature-scoped components
- API contracts and data shapes

These go in the plan header so every phase can reference them.

### 4. Draft vertical slices

Break the PRD into **tracer bullet** phases. Each phase is a thin vertical slice that cuts through ALL layers end-to-end.

<vertical-slice-rules>
- Each slice delivers a narrow but COMPLETE path: page shell → section → data fetching → rendering → tests
- A completed slice is demoable — something visible works in the browser
- The first slice establishes the structural pattern: page layout, first section with its own data, routing wired up
- Subsequent slices add sections, interactions, and edge cases — each building on the established pattern
- Slice by user-facing feature, NOT by technical layer (don't do "Phase 1: all components, Phase 2: all hooks")
- Each slice should include tests for the new behavior it introduces
- Do NOT include specific file names, function names, or implementation details that are likely to change
- DO include durable decisions: route paths, section boundaries, data ownership
</vertical-slice-rules>

### 5. Quiz the user

Present the proposed breakdown as a numbered list. For each phase show:

- **Title**: short descriptive name
- **User stories covered**: which user stories from the PRD this addresses

Ask the user:

- Does the granularity feel right? (too coarse / too fine)
- Should any phases be merged or split further?

Iterate until the user approves the breakdown.

### 6. Write the plan file

Create `./plans/` if it doesn't exist. Write the plan as a Markdown file named after the feature. Use the template below.

<plan-template>
# Plan: <Feature Name>

> Source PRD: <brief identifier or link>

## Architectural decisions

Durable decisions that apply across all phases:

- **Routes**: ...
- **Page / section boundaries**: ...
- **Data ownership**: which sections own which data
- **Shared components**: components reused across sections or features
- (add/remove sections as appropriate)

---

## Phase 1: <Title>

**User stories**: <list from PRD>

### What to build

A concise description of this vertical slice. Describe the end-to-end behavior from the user's perspective — what they see and can interact with when this phase is done.

### Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## Phase 2: <Title>

**User stories**: <list from PRD>

### What to build

...

### Acceptance criteria

- [ ] ...

<!-- Repeat for each phase -->
</plan-template>
