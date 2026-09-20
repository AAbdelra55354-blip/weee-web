# DR.WEEE Style Direction & Visual Philosophy

## 🎯 1. Design Philosophy: Industrial Circular-Tech (2026)

DR.WEEE's visual identity shifts away from generic "green leaf" environmental clichés. Instead, it positions DR.WEEE as a **sovereign circular-engineering and technology leader** — disciplined, technical, audit-ready, and operational.

Key characteristics:
- **Technical Brutalism meets High-Precision Luxury**: Crisp typography, mono-spaced telemetry, technical grid overlays, and deep contrast.
- **Editorial Legibility**: Asymmetric layouts, generous spacing, numbered section indexes (`01 / THE BRIEF`, `02 / THE METHOD`), and italicized accent headlines (`<em>`).
- **Verifiable Accountability**: Highlighting kilograms diverted, data sanitized under NIST standards, and real manufacturing throughput instead of abstract promises.

---

## 🔤 2. Typography Hierarchy & Rules

The brand uses a curated 4-typeface system tailored for technical accuracy and multi-lingual elegance:

```css
:root {
    --rebrand-display: 'Space Grotesk', -apple-system, sans-serif;
    --rebrand-body:    'Manrope', -apple-system, sans-serif;
    --rebrand-mono:    'DM Mono', monospace;
    --rebrand-arabic:  'IBM Plex Sans Arabic', sans-serif;
}
```

### Typeface Roles:
1. **Space Grotesk (Primary Display)**:
   - Used for all major page headlines (`h1`, `h2`), large statistical numbers (`stat-counter`), and card titles.
   - **Styling**: Bold (700/800), tight letter-spacing (`-0.05em` to `-0.07em`), tight line-height (`0.92` to `1.05`).
   - Highlight accents inside headlines are rendered with `<em>` tags colored in **Vibrant Lime (`#d9f36a`)** or **Tangerine (`#ff704d`)**.
2. **Manrope (Primary Body)**:
   - Used for lead paragraphs, card descriptions, navigation labels, and UI controls.
   - **Styling**: Medium/Semi-bold (500/600), comfortable line-height (`1.65` to `1.75`), letter-spacing (`-0.01em`).
3. **DM Mono (Technical Telemetry & Micro-Labels)**:
   - Used for section counters (`01 / THE BRIEF`), capability badges, units of measure (`t`, `kg`, `MWh`), and ticker statuses.
   - **Styling**: All-caps, tracked letter-spacing (`+0.1em` to `+0.14em`), font size `0.65rem` to `0.78rem`.
4. **IBM Plex Sans Arabic (Arabic Typography)**:
   - Automatically engaged when `<html dir="rtl">` or `<html lang="ar">` is active.
   - Unifies headlines, body, and technical labels with natural, modern Naskh geometric harmony without clipping or baseline drift.

---

## 📐 3. Layout Architecture & Wireframe Components

### A. Fixed Full-Width Draped Header (74px)
- **Position**: `position: fixed; top: 0; left: 0; width: 100%; height: 74px; z-index: 1000;`
- **Surface**: High-transparency white (`rgba(255, 255, 255, 0.94)`) with frosted glass backdrop blur (`backdrop-filter: blur(16px)`).
- **Elements**:
  - Logo + Wordmark (`DR.WEEE` with `Circular Systems` sub-label).
  - Pill navigation bar (`nav__list`) containing rounded pill items and Flaticon icons.
  - Multi-lingual switch toggle (EN / AR / IT) with sliding indicator.
  - Primary Contact CTA button (`btn--primary`).

### B. The Tailored Hero (`rebrand-hero--tailored`)
Every major pillar page (`about.html`, `services.html`, `impact.html`, `contact.html`) features the signature tailored hero:
- **Atmospheric Canvas**: Deep dark forest gradient (`linear-gradient(135deg, #102f28, #17634e)`).
- **Grid Mesh Overlay**: 64px x 64px linear-gradient grid lines at 20% opacity.
- **Ambient Glow Orb**: Radial gradient positioned top-right emitting soft lime ambient light.
- **Left Column**:
  - `rebrand-kicker`: Monospace tag with a pulsing orange/lime dot.
  - `h1`: Massive display headline with tight tracking and italicized accent.
  - `hero-lead-text`: High-clarity executive summary paragraph.
  - `hero-quick-chips`: Pill-shaped anchor navigation chips jumping to page sections.
  - `rebrand-hero__actions`: Primary lime CTA button + outline secondary link.
- **Right Column (Hero Telemetry Console)**:
  - Frosted glass console card (`hero-capability-card` or `hero-impact-telemetry`) with 2px lime border.
  - Header with title and live operational status badge.
  - 4-quadrant live telemetry metrics with animated counters.
  - Bottom strip with chain-of-custody or location status.

### C. Standard Section Intro Grid (`rebrand-section__intro`)
- 3-column or split grid:
  - Column 1: Monospace section identifier (`02 / MATERIAL PURITY`).
  - Column 2: Large display `h2` heading with `<em>` emphasis.
  - Column 3: Concise contextual description paragraph (`max-width: 380px`).

### D. Structured Card System
- Cards do not look like generic white boxes. Every card features:
  - Subtle dark border (`1.5px solid rgba(16, 47, 40, 0.12)`).
  - Top accent indicator line (`linear-gradient(90deg, #17634e, #d9f36a)`).
  - Hover interaction: `-6px` vertical lift with shadow bloom (`0 16px 36px rgba(16, 47, 40, 0.08)`).
  - Monospace category badges and prominent numerical metrics.

---

## 🎬 4. Motion, Animations & Smooth Scrolling

### A. Silky Smooth Scrolling
- Enabled globally via CSS:
  ```css
  html {
      scroll-behavior: smooth !important;
  }
  section[id], [id] {
      scroll-margin-top: 92px; /* Clears fixed 74px header with 18px breathing room */
  }
  ```
- Anchor links in JavaScript dynamically calculate the exact offset of `#header` to guarantee perfect positioning regardless of banner presence or screen size.

### B. Scroll Reveal Engine (`.rebrand-reveal`)
- Elements throughout the website fade in and rise smoothly into place as they enter the viewport:
  ```css
  .rebrand-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
  }
  .rebrand-reveal.is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
  }
  ```
- Handled by a lightweight `IntersectionObserver` with a `0.08` threshold and `-40px` root margin to ensure animations feel immediate and silky.

### C. Live Telemetry Pulse Animation
```css
@keyframes impactPulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.6; }
    100% { transform: scale(1); opacity: 1; }
}
```

---

## 🌐 5. RTL & Arabic Localization Rules

When browsing in Arabic (`lang="ar"` or `dir="rtl"`):
1. **Typeface**: Automatically applies `'IBM Plex Sans Arabic'` to all elements with appropriate line-heights (`1.6` for headlines, `1.8` for body).
2. **Directional Inversion**:
   - Flex containers invert naturally; chevron and arrow icons flip direction (`fa-arrow-right` rotates 180°).
   - Margins and paddings use logical properties or explicit `[dir="rtl"]` overrides in `css/rtl.css`.
3. **Badge Wrapping Safeguards**:
   - Headers with badges (`.hero-capability-card__header`) feature `flex-wrap: wrap; gap: 12px;` so extended Arabic phrases never overlap or clip badges.
