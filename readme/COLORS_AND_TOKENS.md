# DR.WEEE Color Palette & Design Tokens

## 🎨 1. Core Color Palette Matrix

The DR.WEEE palette balances **deep industrial darks**, **high-visibility circular accents**, and **warm editorial paper surfaces**.

```
┌────────────────────────────────────────────────────────────────────────┐
│  #101a18            #102f28            #17634e            #d9f36a      │
│  Deep Ink           Forest Slate       Emerald            Vibrant Lime │
│  (Dark Ground)      (Tailored Canvas)  (Primary Accent)   (Signal Lime)│
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│  #ff704d            #f1eee4            #f4f7ef            #ffffff      │
│  Tangerine          Cream Canvas       Paper Grey         Pure Surface │
│  (Kicker/Hazard)    (Light Sections)   (Card Surfaces)    (Content)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 2. Color Values Specification

| Token Name | HEX | RGB | HSL | Role & Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Deep Ink** | `#101a18` | `rgb(16, 26, 24)` | `hsl(168, 24%, 8%)` | Primary dark background, high-contrast hero, typography base |
| **Forest Slate** | `#102f28` | `rgb(16, 47, 40)` | `hsl(166, 49%, 12%)` | Tailored hero background, deep dark cards, brand foundation |
| **Emerald Core** | `#17634e` | `rgb(23, 99, 78)` | `hsl(163, 62%, 24%)` | Primary brand green, borders, secondary action links, icons |
| **Vibrant Lime** | `#d9f36a` | `rgb(217, 243, 106)` | `hsl(71, 84%, 68%)` | Primary CTA buttons, `<em>` headline accents, glow orbs, badges |
| **Tangerine Accent** | `#ff704d` | `rgb(255, 112, 77)` | `hsl(12, 100%, 65%)` | Kicker pulse dots, section numbers (`01`), hazard stream tags |
| **Editorial Cream** | `#f1eee4` | `rgb(241, 238, 228)` | `hsl(46, 32%, 92%)` | Light background sections (`rebrand-section--cream`) |
| **Paper Surface** | `#f4f7ef` | `rgb(244, 247, 239)` | `hsl(83, 31%, 95%)` | Light body ground, card surfaces, table backgrounds |
| **Muted Slate** | `#5c665f` | `rgb(92, 102, 95)` | `hsl(138, 5%, 38%)` | Secondary body text on light surfaces |
| **Muted Mist** | `#b7c1b8` | `rgb(183, 193, 184)` | `hsl(126, 8%, 74%)` | Secondary text on dark surfaces |
| **Card Border Light**| `rgba(16, 47, 40, 0.12)` | — | — | Standard borders on white/cream card surfaces |
| **Card Border Dark** | `rgba(217, 243, 106, 0.25)` | — | — | Glowing borders on dark telemetry cards |

---

## 💻 3. CSS Custom Properties Reference

Add or reference these variables in stylesheets:

```css
:root {
    /* Brand Colors */
    --dr-ink:            #101a18;
    --dr-forest:         #102f28;
    --dr-emerald:        #17634e;
    --dr-lime:           #d9f36a;
    --dr-tangerine:      #ff704d;
    --dr-cream:          #f1eee4;
    --dr-paper:          #f4f7ef;
    --dr-surface:        #ffffff;
    --dr-slate:          #42554d;
    --dr-muted:          #5c665f;
    --dr-mist:           #b7c1b8;

    /* Borders */
    --dr-border-light:   rgba(16, 47, 40, 0.12);
    --dr-border-dark:    rgba(255, 255, 255, 0.15);
    --dr-border-lime:    rgba(217, 243, 106, 0.35);

    /* Gradients */
    --dr-grad-hero:      linear-gradient(135deg, #102f28 0%, #17634e 65%, #24755a 100%);
    --dr-grad-accent:    linear-gradient(90deg, #17634e 0%, #d9f36a 100%);
    --dr-grad-bar:       linear-gradient(90deg, #145b4b, #62b995, #d9f36a);

    /* Border Radii */
    --dr-radius-sm:      8px;
    --dr-radius-md:      16px;
    --dr-radius-lg:      24px;
    --dr-radius-xl:      28px;
    --dr-radius-full:    999px;

    /* Shadows */
    --dr-shadow-sm:      0 4px 12px rgba(16, 47, 40, 0.04);
    --dr-shadow-md:      0 12px 32px rgba(16, 47, 40, 0.06);
    --dr-shadow-lg:      0 20px 50px rgba(0, 0, 0, 0.28);
}
```

---

## ⚡ 4. Application Rules & Hierarchy

### A. Dark Surface Contexts (Heros, Sovereign Tech, Carbon, Footer)
- Background: `--dr-ink` or `--dr-grad-hero`.
- Primary Headline: `#ffffff` with `<em>` highlighted in `--dr-lime`.
- Body copy: `--dr-mist` or `rgba(244, 247, 239, 0.85)`.
- Cards on dark: `rgba(255, 255, 255, 0.06)` with backdrop blur and `--dr-border-lime`.
- Primary Action: `--dr-lime` background with `--dr-ink` text.

### B. Light Surface Contexts (Method, Materials, Sectors, FAQ)
- Background: `--dr-cream` (`#f1eee4`) or `--dr-paper` (`#f4f7ef`).
- Primary Headline: `--dr-ink` (`#101a18`) with `<em>` highlighted in `--dr-emerald` or `--dr-tangerine`.
- Body copy: `--dr-muted` (`#5c665f`).
- Cards on light: Pure white (`#ffffff`), 1.5px `--dr-border-light`, top 4px accent gradient line.
- Primary Action: Dark button (`background: #101a18; color: #d9f36a;`).

### C. Contrast & Accessibility Compliance (WCAG 2.1)
- **Vibrant Lime (`#d9f36a`) on Dark Ink (`#101a18`)**: Contrast ratio **14.2:1** (Exceeds WCAG AAA requirement of 7:1).
- **Dark Ink (`#101a18`) on Vibrant Lime (`#d9f36a`)**: Contrast ratio **14.2:1** (Exceeds WCAG AAA for CTA buttons).
- **Deep Ink (`#101a18`) on Cream Canvas (`#f1eee4`)**: Contrast ratio **13.8:1** (Exceeds WCAG AAA).
- **Emerald Core (`#17634e`) on White (`#ffffff`)**: Contrast ratio **6.4:1** (Exceeds WCAG AA for text and icons).
