---
name: Quiet Things
colors:
  surface: '#111415'
  surface-dim: '#111415'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1d'
  surface-container: '#1e2021'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333536'
  on-surface: '#e2e2e3'
  on-surface-variant: '#c7c6cb'
  inverse-surface: '#e2e2e3'
  inverse-on-surface: '#2e3132'
  outline: '#919095'
  outline-variant: '#46464b'
  surface-tint: '#c7c6cb'
  primary: '#c7c6cb'
  on-primary: '#2f3035'
  primary-container: '#0b0c10'
  on-primary-container: '#7a7a7f'
  inverse-primary: '#5e5e63'
  secondary: '#a9c8f8'
  on-secondary: '#0c3158'
  secondary-container: '#2a4a73'
  on-secondary-container: '#9bbae9'
  tertiary: '#93cdf5'
  on-tertiary: '#00344c'
  tertiary-container: '#000e18'
  on-tertiary-container: '#4581a5'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e3e2e8'
  primary-fixed-dim: '#c7c6cb'
  on-primary-fixed: '#1a1b20'
  on-primary-fixed-variant: '#46464b'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a9c8f8'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#284870'
  tertiary-fixed: '#c7e7ff'
  tertiary-fixed-dim: '#93cdf5'
  on-tertiary-fixed: '#001e2e'
  on-tertiary-fixed-variant: '#004c6c'
  background: '#111415'
  on-background: '#e2e2e3'
  surface-variant: '#333536'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '300'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '300'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '400'
    lineHeight: 32px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-reading:
    fontFamily: Playfair Display
    fontSize: 17px
    fontWeight: '300'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-ui:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies quiet contemplation, intellectual gravity, and intimate literary craft. Designed for long-form essays, personal journals, and poetic observations, the interface uses a vibrant dark-mode palette to elevate written thought with striking contrast. The aesthetic pairs the gravitas of traditional broadsheet publication with the restraint of modernist dark-mode utility.

The visual mood is deliberate, nocturnal, and serene. It eliminates high-frequency noise, jarring animations, and saturated distractions, inviting readers into an undisturbed, book-like sanctuary.

## Colors
The palette is built strictly from calibrated vibrant dark tones to maintain tonal coherence and high legibility.

- **Background Canvas (`#0B0C10`)**: The foundational void; an immersive, deep dark blue-black that minimizes eye strain during extended reading sessions.
- **Surface Elevation (`#1F4068`)**: Used for cards, floating navigation bars, and reading modals, providing a deep oceanic contrast.
- **Borders & Rules (`#4E89AE`)**: Subdued, architectural dividers used to ground content blocks and demarcate margins.
- **Primary Text (`#C5C6C7`)**: High-legibility neutral tone for editorial titles, primary headlines, and active states.
- **Reading Body (`#C5C6C7`)**: A balanced neutral tone to prevent glare against deep dark backgrounds.
- **Secondary & Meta (`#4E89AE`)**: For timestamps, word counts, bylines, and passive controls.
- **Interactive Accents (`#1F4068`)**: For active focus rings, hover indicators, and understated textual links.

## Typography
Typography is the structural core of the platform. It creates a deliberate dichotomy between classic literary reflection and modern editorial utility:

- **Playfair Display (Editorial Serif)**: Assigned to essays, long-form narratives, article titles, section headliners, and pulled quotes. The generous x-height and warm structural serifs provide rhythmic, bookish cadence in low light.
- **Inter (Utilitarian Sans)**: Assigned to body UI, system alerts, table of contents indices, publication dates, read times, and button elements. It provides quiet, modern precision without demanding visual priority.
- **JetBrains Mono (Monospace Labels)**: Assigned to metadata, tags, and technical indicators, providing crisp contrast.
- **Reading Measure**: Essay prose should never exceed 68 characters per line (`max-w-prose` / ~680px), locked to `body-reading` with ample line spacing (`lineHeight: 30px`) to preserve line isolation during prolonged nocturnal reading.

## Layout & Spacing
The layout follows a centered column structure flanked by broad, generous margins. Rather than filling the viewport horizontally, the page treats whitespace as an acoustic buffer.

- **Content Grid**: A centered 12-column architecture spanning a maximum container width of `1120px` for multi-column article listings and archival indices.
- **Long-Form Reading Column**: Constrained centrally to `680px` on desktop, allowing footnotes and margin notes to settle subtly into the side gutters.
- **Responsive Adaptations**:
  - **Mobile (<768px)**: Canvas margins collapse to `1.25rem` (`margin-mobile`), gutter shrinks to `1rem`, and secondary metadata snaps below primary headlines.
  - **Tablet (768px - 1024px)**: Canvas margins adjust to `2rem`, standard gutters to `1.25rem`.
  - **Desktop (>1024px)**: Wide `3rem` margins allow the content to sit tranquilly in the center of the viewport without tension.

## Elevation & Depth
Depth is produced via subtle tonal stepping, micro-borders, and tactile glass accents rather than heavy cast shadows:

- **Surface Layering**: The primary canvas rests at `#0B0C10`. Elevated containers, cards, and dropdowns sit at `#1F4068`. High-level modals sit at `#4E89AE`.
- **Low-Contrast Outlines**: Every elevated card and floating boundary is defined by a 1px border rendered in `#4E89AE`.
- **Frosted Glass (Navigation & Floating Controls)**: Top navigation bars and floating reading progress trays utilize a backdrop blur of `16px` combined with a semi-transparent surface of `rgba(31, 64, 104, 0.75)` and a crisp lower border of `rgba(78, 137, 174, 0.2)`.
- **Shadow Profile**: Where floating panels require separation from text underneath, use an ultra-diffused shadow: `0 12px 32px -8px rgba(0, 0, 0, 0.65)`.

## Shapes
The shape language is understated, soft, and architectural. 

- **Base Radius (`rounded`, 0.25rem / 4px)**: Applied to interactive chips, small tags, text inputs, and action buttons. It softens edges while preserving the disciplined structure of a printed sheet.
- **Card & Container Radius (`rounded-lg`, 0.5rem / 8px)**: Applied to article cards, preview panels, and dialogue overlays.
- **Modal & Large Surfaces (`rounded-xl`, 0.75rem / 12px)**: Reserved exclusively for reading panels, lightbox overlays, and search modals.
- Circular geometry is restricted strictly to user avatars and circular playback controls.

## Components

### Buttons
- **Primary Action**: Background of `#1F4068` with `#C5C6C7` text, 1px border of `#4E89AE`, `rounded` corners (4px), using `Inter` 13px medium. On hover: background `#4E89AE`.
- **Ghost / Minimalist**: Transparent background, `#4E89AE` text. On hover: `#C5C6C7` text with a faint background of `rgba(78, 137, 174, 0.1)`.
- **Editorial Text Links**: Inline links within articles feature an underline offset of 4px with a 1px border of `#4E89AE` that transitions to `#C5C6C7` on hover.

### Chips & Topic Tags
- Compact tags formatted with `label-sm` in `JetBrains Mono`, uppercase with tracking (`0.08em`).
- Surface: `#1F4068` with a 1px outline of `#4E89AE`, text colored `#C5C6C7`. Hover shifts text to `#C5C6C7` and border to `#4E89AE`.

### Article Cards & Previews
- Minimalist containers rendered in flat `#1F4068` or transparent with a simple top separator rule.
- Layout displays the category and date in `label-md` (`#4E89AE`), followed by a headline in `headline-md` (`Playfair Display`, `#C5C6C7`), and a 2-line excerpt in `body-ui` (`#C5C6C7`).
- Hover triggers a subtle foreground text shift without aggressive physical transformation.

### Lists & Archival Indexes
- Flat row layouts separated by a hairline 1px border of `#4E89AE`.
- Left-aligned title in `Playfair Display` 18px; right-aligned date and estimated read time in `JetBrains Mono` 12px monospace.

### Input Fields & Newsletter Subscription
- Background of `#1F4068` with a 1px `#4E89AE` border and `rounded` corners.
- Text input in `Inter` 14px `#C5C6C7`, placeholder text in `#4E89AE`.
- Focus state reveals a precise, low-glow ring of `rgba(78, 137, 174, 0.3)` and border change to `#4E89AE`.

### Reading Components
- **Blockquotes**: Left-aligned with a 2px vertical border of `#4E89AE`, padded left by `space-lg`, set in italicized `Playfair Display` 19px with `#C5C6C7` text color.
- **Reading Progress Bar**: A 2px high rule pinned to the top of the viewport or glass header, progressing in `#4E89AE`.
- **Footnotes / Margin Notes**: Rendered in `body-sm` with dimmed `#4E89AE` ink, transitioning into focus when referenced.