---
name: frontend-tests
description: Write front-end component and integration tests following Kent C. Dodds' testing philosophy using React Testing Library and Vitest. Use when writing tests, creating test files, or when user mentions testing components, integration tests, or test coverage.
---

# Frontend Testing (Kent C. Dodds Style)

## Core Principles

1. **Test user behavior, not implementation** — never test internal state, component instances, or method calls. Test what the user sees and does.
2. **The more your tests resemble the way your software is used, the more confidence they give you.**
3. **Prefer integration tests** — test components together with their children rather than shallow rendering or mocking everything.
4. **Avoid testing implementation details** — no snapshotting component trees, no asserting on state variables, no checking internal method calls.

## Query Priority (strict order)

Use the most accessible query available, in this order:

1. `getByRole` — first choice, always. Mirrors how assistive tech and users find elements.
2. `getByLabelText` — for form fields.
3. `getByPlaceholderText` — only if no label exists.
4. `getByText` — for non-interactive elements with visible text.
5. `getByDisplayValue` — for filled form elements.
6. `getByAltText` — for images.
7. `getByTitle` — rarely.
8. `getByTestId` — **last resort only**. If you reach for this, first consider adding an accessible role or label instead.

## Rules

- **Never use** `container.querySelector`, `wrapper.find`, or DOM traversal.
- **Never use** snapshot tests for component output.
- **Never assert** on CSS classes, inline styles, or component props directly.
- **Use `screen`** — always import and query from `screen`, not from the render return value.
- **Use `userEvent` over `fireEvent`** — `userEvent` simulates real user interactions (typing, clicking) more accurately.
- **Use `waitFor` or `findBy*`** for async assertions — never use manual timers or sleep.
- **Arrange-Act-Assert** — structure every test clearly.
- **One behavior per test** — each `it()` tests one user-facing behavior.
- **Name tests as user outcomes** — e.g., `it('shows error message when form is submitted empty')`, not `it('sets error state to true')`.

## Assertions

- **Prefer asserting on user-visible outcomes** — text appearing, elements showing/hiding, navigation happening. This is the gold standard.
- **Callback prop assertions (`toHaveBeenCalledWith`) are acceptable only for reusable components tested in isolation**, where the callback is the component's public API. Always prefer asserting on visible outcomes when the parent is available to render.
- **Never assert on internal state, instance methods, or implementation details.**

## What NOT to Test

- Third-party library internals (trust your dependencies)
- Exact DOM structure or element order
- CSS / styling 
- Constants or static config objects

## Mocking Guidelines

- **Mock network requests**, not components — use MSW (Mock Service Worker)
- **Mock only at system boundaries** — API calls, browser APIs, timers.
- **Never mock child components** — render the real tree. Integration > isolation.
- If a mock is needed, prefer `vi.fn()` for callbacks passed as props.
