# DR.WEEE — Circular Systems Platform Documentation

Welcome to the **DR.WEEE** architectural and brand identity documentation repository. This directory contains the complete design system specifications, brand philosophy, color token dictionaries, and engineering guidelines governing the website and regional digital touchpoints.

---

## 📚 Documentation Index

| Document | Purpose |
| :--- | :--- |
| **[STYLE_DIRECTION.md](./STYLE_DIRECTION.md)** | Visual philosophy, typography hierarchy, grid system, layout wireframes, motion & smooth scrolling rules, and RTL (Arabic) guidelines. |
| **[BRAND_IDENTITY.md](./BRAND_IDENTITY.md)** | Core brand story, mission, voice & tone, logo usage, mascot guidelines, and photography art direction. |
| **[COLORS_AND_TOKENS.md](./COLORS_AND_TOKENS.md)** | Complete color token palette (HEX, RGB, HSL, CSS variables), contrast ratios, and dark/light surface application matrix. |

---

## 🏗️ Platform Overview & Tech Stack

DR.WEEE's digital presence is built on a high-performance, responsive, zero-framework static architecture optimized for instant load times, verified SEO, and seamless multi-lingual rendering across the MENA region and Europe.

- **Markup & Structure**: Semantic HTML5 with accessible ARIA milestones and structured JSON-LD schema metadata.
- **Styling Architecture**: Vanilla CSS3 design system anchored by CSS custom properties, responsive clamp calculations, and utility classes (`css/rebrand.css`, `css/sitewide.css`, `css/drweee-theme.css`).
- **Typography Suite**:
  - Primary Display: **Space Grotesk** (Tight tracking `-0.06em`, technical editorial brutality).
  - Primary Body: **Manrope** (Clean geometric humanist for maximum reading comfort).
  - Monospace / Micro-labels: **DM Mono** (Telemetry benchmarks, kickers, timestamps, badges).
  - Arabic Typography: **IBM Plex Sans Arabic** (Full RTL harmony with geometric matching weights).
- **Internationalization (i18n)**: Instant client-side switching between **English (`en`)**, **Arabic (`ar`, RTL)**, and **Italian (`it`)** backed by synchronized JSON dictionaries in `locales/`.
- **Analytics & Telemetry**: Google Tag Manager (`GTM-CLIENT_ID`) with GA4 enhanced ecommerce/events, and Microsoft Clarity integration for page heatmaps and user session playback.

---

## 📁 Repository Directory Map

```text
drweee-website-main/
├── about.html                   # Founding story, 6 group companies, leadership & milestones
├── contact.html                 # Dispatch line, operational status, multi-purpose inquiry form
├── impact.html                  # Audited ESG telemetry, stream yields, carbon offsets & 2030 goals
├── index.html                   # Homepage (Hero, brief, streams, sovereign tech, sectors, FAQ, CTA)
├── privacy.html                 # Legal privacy policy
├── public-certificate.html      # Publicly shareable verification certificate for corporate clients
├── services.html                # 11 circular enterprise solutions, ITAD, toner, and machinery
├── terms.html                   # Terms of service
├── css/
│   ├── drweee-theme.css         # Master design tokens & dockable header/footer rules
│   ├── rebrand.css              # 2026 editorial circular-tech design system & components
│   ├── sitewide.css             # Final authority layer, card system, responsive resets
│   ├── main.css                 # Base resets, variables, legacy compatibility
│   ├── components.css           # Buttons, forms, modals, navigation widgets
│   └── rtl.css                  # Bi-directional mirroring for Arabic language layout
├── images/
│   ├── favicon/                 # Full webmanifest & PWA favicon suite
│   ├── facilities/              # Operational facility and circular processing photos
│   ├── logos/                   # DR.WEEE SVG/PNG official logos and mascot
│   ├── manufacturing/           # Sovereign smart shredder machinery photography
│   └── services/                # High-res material fractions and workshop imagery
├── js/
│   ├── main.js                  # Smooth scrolling, intersection reveals, header includes, auth
│   ├── i18n.js                  # Dynamic localization switcher & DOM translation engine
│   ├── analytics.js             # GTM dataLayer events + Microsoft Clarity heatmap snippet
│   └── server.js                # Express production/development runtime
├── locales/
│   ├── en.json                  # English string dictionary
│   ├── ar.json                  # Arabic string dictionary (RTL)
│   └── it.json                  # Italian string dictionary
├── readme/                      # 👈 Brand Identity, Style Direction & Color Tokens
└── scripts/
    └── fix-producttypecode.js   # Microsoft Dataverse CRM catalog synchronization utility
```

---

## 🚀 Local Development

To run the platform locally with full dynamic include fetching (`includes/header.html`, `includes/footer.html`):

```bash
# Option A: Fast Static Server (Python)
python -m http.server 8080

# Option B: Node.js Express Server
npm install
npm run dev
```

Visit `http://localhost:8080/index.html` in your browser.
