# Star Wars Application Style Guide

## Color Palette

### Primary Colors
| Name            | Hex       | Usage                              |
|-----------------|-----------|------------------------------------|
| Deep Space      | `#0b0b0f` | Primary background                 |
| Crawl Gold      | `#f5c518` | Primary actions, links, accents    |
| Amber Glow      | `#ffd54f` | Highlights, hover states           |
| Imperial Gray   | `#1a1a22` | Cards, panels, secondary surfaces  |

### Secondary Colors
| Name            | Hex       | Usage                              |
|-----------------|-----------|------------------------------------|
| Saber Blue      | `#4fc3f7` | Info states, secondary accents     |
| Saber Green     | `#66bb6a` | Success states, confirmations      |
| Sith Red        | `#ef5350` | Errors, destructive actions        |
| Lightsaber Glow | `#b388ff` | Decorative accents, special states |

### Neutral Colors
| Name            | Hex       | Usage                              |
|-----------------|-----------|------------------------------------|
| Star White      | `#e8eaed` | Primary text on dark backgrounds   |
| Dust Gray       | `#9e9e9e` | Secondary text, placeholders       |
| Nebula Gray     | `#2a2a34` | Borders, dividers                  |
| Void Black      | `#050507` | Deepest backgrounds, overlays      |

---

## Typography

### Font Stack

Use **Lexend** as the primary font for readability with a distinctive, modern character, paired with **Orbitron** for display headings that evoke the sci-fi feel without sacrificing legibility.

```css
--font-primary: 'Lexend', 'Segoe UI', system-ui, sans-serif;
--font-display: 'Orbitron', 'Lexend', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

> **Why Lexend?** It was designed for enhanced readability with optimized letter spacing and a warm, geometric personality — distinctive without sacrificing legibility.
> **Why not Star Jedi / Aurebesh fonts?** They are iconic but hard to read at body sizes. Reserve them for logos or decorative elements only.

### Type Scale

| Level | Font          | Size   | Weight | Line Height | Usage                  |
|-------|---------------|--------|--------|-------------|------------------------|
| H1    | Orbitron      | 2.5rem | 700    | 1.2         | Page titles            |
| H2    | Orbitron      | 1.75rem| 600    | 1.3         | Section headings       |
| H3    | Lexend        | 1.25rem| 600    | 1.4         | Subsection headings    |
| Body  | Lexend        | 1rem   | 400    | 1.6         | Paragraphs, UI text    |
| Small | Lexend        | 0.875rem| 400   | 1.5         | Captions, helper text  |
| Mono  | JetBrains Mono| 0.875rem| 400   | 1.5         | Code, data, terminals  |

### Letter Spacing
- **Orbitron headings:** `0.05em` (slightly tracked out for the sci-fi feel)
- **Body text:** `0` (default, optimized for reading)
- **Uppercase labels:** `0.1em`

---

## Spacing & Layout

### Spacing Scale (base: 4px)
```
--space-xs:  4px
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  32px
--space-2xl: 48px
--space-3xl: 64px
```

### Grid
- 12-column grid
- Max content width: `1200px`
- Gutter: `24px`
- Side padding (mobile): `16px`

---

## Spatial Composition

Add visual interest through subtle layering and weighted proportions:

### Weighted Grid Columns
- Use **uneven column ratios** (e.g., `1.4fr 1fr`) to create visual rhythm without breaking structure
- Let the last item in a grid span full width for natural hierarchy

### Overlapping Accents
- Section headings can **overlap the divider line** with a gold gradient accent
- Decorative corner marks or bracket accents around featured content:
  ```css
  .featured::before,
  .featured::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--crawl-gold);
  }
  .featured::before { top: -4px; left: -4px; border-right: none; border-bottom: none; }
  .featured::after { bottom: -4px; right: -4px; border-left: none; border-top: none; }
  ```

---

## Components

### Buttons

```
Primary:    bg: Crawl Gold (#f5c518), text: Deep Space, border-radius: 4px
Hover:      bg: Amber Glow (#ffd54f), text: Deep Space
Secondary:  bg: transparent, border: 1px solid Crawl Gold, text: Crawl Gold
Danger:     bg: Sith Red (#ef5350), text: Star White
Disabled:   bg: Nebula Gray (#2a2a34), text: Dust Gray, opacity: 0.6
```

- Padding: `12px 24px`
- Font: Lexend, 0.875rem, weight 600, uppercase, letter-spacing 0.05em
- Subtle `box-shadow: 0 0 8px rgba(245, 197, 24, 0.4)` glow on hover for primary

### Cards

```
Background:  Imperial Gray (#1a1a22)
Border:      1px solid Nebula Gray (#2a2a34)
Radius:      8px
Padding:     24px
Shadow:      0 4px 16px rgba(0, 0, 0, 0.4)
```

- On hover: subtle border glow `border-color: Crawl Gold` with transition

### Inputs

```
Background:  Void Black (#050507)
Border:      1px solid Nebula Gray (#2a2a34)
Text:        Star White (#e8eaed)
Placeholder: Dust Gray (#9e9e9e)
Focus:       border-color: Crawl Gold, box-shadow: 0 0 6px rgba(245, 197, 24, 0.25)
Radius:      4px
Padding:     10px 14px
```

---

## Iconography

- Style: outlined, 1.5px stroke, rounded caps
- Size: 20px (default), 16px (small), 24px (large)
- Color: inherit from text color
- Recommended set: **Lucide** or **Phosphor** (clean, geometric, fits the theme)

---

## Effects & Motion

### Glow Effects
Use sparingly for interactive elements and emphasis:
```css
/* Gold glow - for focused/active elements */
box-shadow: 0 0 10px rgba(245, 197, 24, 0.3),
            0 0 20px rgba(245, 197, 24, 0.1);

/* Amber highlight - for featured/special items */
box-shadow: 0 0 10px rgba(255, 213, 79, 0.3);
```

### Transitions
- Duration: `150ms` for micro-interactions, `300ms` for layout shifts
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Never animate more than `opacity`, `transform`, `box-shadow`, and `border-color` for performance

### Background Texture & Depth
Layer multiple techniques to create atmosphere and depth:

```css
/* Base background with radial gradient warmth */
background: radial-gradient(ellipse at 20% 50%, #f5c51810 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, #ffd54f08 0%, transparent 40%),
            #0b0b0f;

/* Film grain overlay (apply via ::after pseudo-element) */
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* inline noise SVG */
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}

/* Geometric accent lines — decorative diagonal strokes */
.geo-accent {
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 40px,
    rgba(245, 197, 24, 0.03) 40px,
    rgba(245, 197, 24, 0.03) 41px
  );
}

/* Scanline texture for panels */
.scanlines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  border-radius: inherit;
}
```

### Micro-Interactions
Go beyond simple glow — add personality to hover states:
```css
/* Card tilt on hover (subtle 3D lift) */
.card:hover {
  transform: perspective(800px) rotateX(-1deg) rotateY(1deg) translateY(-4px);
}

/* Button magnetic pull — scale + inset shadow */
.btn--primary:hover {
  transform: scale(1.03);
  box-shadow: 0 0 8px rgba(245, 197, 24, 0.4),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2);
}

/* Input underline sweep on focus */
.input:focus {
  background: linear-gradient(var(--void-black), var(--void-black)) padding-box,
              linear-gradient(90deg, var(--crawl-gold), var(--amber-glow), var(--crawl-gold)) border-box;
  border: 1px solid transparent;
}

/* Tag shimmer on hover */
.card__tag:hover {
  background-size: 200% 100%;
  background-position: -100% 0;
  transition: background-position 600ms ease;
}
```

---

## Accessibility

- Maintain **WCAG AA** contrast ratio (4.5:1 for text, 3:1 for large text)
- Star White (`#e8eaed`) on Deep Space (`#0b0b0f`) = **15.6:1** contrast ratio
- Crawl Gold (`#f5c518`) on Deep Space (`#0b0b0f`) = **10.5:1** contrast ratio
- Amber Glow (`#ffd54f`) on Deep Space (`#0b0b0f`) = **13.2:1** contrast ratio
- All interactive elements must have visible focus indicators (the gold glow serves this)
- Do not rely on color alone to convey meaning — pair with icons or text labels

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use Orbitron for headings only | Use decorative fonts for body text |
| Keep glow effects subtle | Overuse neon glows on every element |
| Use the dark palette consistently | Mix light and dark surfaces randomly |
| Let the gold color draw attention to key items | Use Sith Red for non-error elements |
| Add star-field textures subtly in backgrounds | Add animated starfields that distract |
| Layer textures (grain, scanlines, geometry) for depth | Use generic fonts (Inter, Roboto, Arial) |
| Use weighted grid columns for visual rhythm | Skip textures — flat backgrounds feel lifeless |
| Use 3D perspective transforms for hover states | Use flat, identical column widths everywhere |
