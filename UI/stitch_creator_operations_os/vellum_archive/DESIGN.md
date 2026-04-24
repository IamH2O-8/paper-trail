# Design System Strategy: The Editorial Architect

This design system is a high-end, editorial-inspired framework specifically engineered for a premium content operating system. It departs from the "SaaS-standard" look of rigid grids and heavy borders, moving instead toward a "Digital Curator" aesthetic. The goal is to make documentation feel like a collection of bespoke assets rather than a spreadsheet.

## 1. Creative North Star: "The Digital Curator"
The system is built on the philosophy of **Quiet Authority**. We treat content as high-value artifacts. By utilizing intentional asymmetry, expansive negative space, and tonal layering, we create an environment that feels organized but not clinical. The interface should feel like a high-end physical studio—warm, spacious, and tactile.

---

## 2. Color & Tonal Architecture
The palette is rooted in warm neutrals to reduce eye strain and evoke a sense of premium "paper" quality.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. 
*   **The Method:** Boundaries must be defined through background color shifts. Use `surface-container-low` for large section backgrounds and `surface-container-lowest` for the cards sitting atop them. 
*   **The Goal:** A seamless, organic transition that feels integrated, not boxed in.

### Surface Hierarchy & Nesting
Depth is achieved by stacking Material surface tiers. 
1.  **Level 0 (Base):** `surface` (`#fef8f3`) — The "desk" or foundation.
2.  **Level 1 (Sections):** `surface-container-low` (`#f8f3ee`) — Defines major workspace areas.
3.  **Level 2 (Active Cards):** `surface-container-lowest` (`#ffffff`) — The highest point of focus for content pieces.

### The "Glass & Gradient" Rule
To add soul to primary actions:
*   **Primary CTAs:** Use a subtle linear gradient from `primary` (`#091627`) to `primary-container` (`#1e2b3c`) at a 135-degree angle. This prevents buttons from looking "flat" or "cheap."
*   **Floating Navigation:** Utilize `surface-bright` at 80% opacity with a `backdrop-blur` of 24px. This "Glassmorphism" effect allows the warm background tones to bleed through, maintaining a cohesive visual flow.

---

## 3. Typography: Editorial Sophistication
We pair **Epilogue** (Display/Headlines) with **Manrope** (Body/Labels) to balance creative personality with professional legibility.

*   **Display-LG (Epilogue):** 3.5rem. Used for high-level dashboard greetings or primary document titles. It should feel authoritative.
*   **Headline-MD (Epilogue):** 1.75rem. The workhorse for section headers. Use generous letter-spacing (-0.02em) to maintain a modern, tight look.
*   **Body-LG (Manrope):** 1rem. All documentation content uses this scale. Ensure a line-height of at least 1.6 for maximum breathability.
*   **Labels (Manrope):** Use `label-md` (0.75rem) in uppercase with +0.05em tracking for secondary metadata to distinguish it from body text.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are largely replaced by **Tonal Layering**.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-low` background. The slight delta in hex value provides enough contrast for the human eye to perceive depth without the "noise" of a shadow.
*   **Ambient Shadows:** If a floating element (like a modal or dropdown) requires a shadow, use a "Natural Bloom" approach. Shadow color: `on-surface` (`#1d1b19`) at 5% opacity, with a Blur of 40px and a Y-offset of 12px.
*   **The Ghost Border Fallback:** If accessibility requirements demand a container edge, use a "Ghost Border": `outline-variant` (`#c5c6cd`) at 15% opacity. Never use 100% opaque borders.

---

## 5. Components

### Cards & Panels
*   **The Forbiddance:** No divider lines. Separate content using `body-sm` vertical spacing or subtle tonal shifts between header and body.
*   **Styling:** Use `xl` (1.5rem) corner radius for main cards to emphasize the "spacious panel" personality.

### Primary Buttons
*   **Style:** `primary` gradient fill, `on-primary` text.
*   **Shape:** `full` (pill-shaped) to provide a soft contrast to the rectangular layout of cards.
*   **State:** On hover, shift the gradient intensity rather than adding a stroke.

### Status Chips
Status is conveyed through "Soft Glow" indicators rather than harsh blocks of color.
*   **Ready/Complete:** `on-tertiary-container` text on a background that is 10% opacity of the green status color.
*   **In Progress:** Use `secondary` for a neutral, active feel.
*   **Blocked:** Use `error-container` with `on-error-container` text.

### Input Fields
*   **Style:** Minimalist. No bottom border. Instead, use a `surface-container-high` fill with a `md` (0.75rem) radius.
*   **Focus State:** Transition the background to `primary-fixed-dim` and add a "Ghost Border" of `primary`.

### Navigation Rails
*   Instead of a standard sidebar, use a wide, asymmetric rail. Use the `surface-container-low` background to separate the nav from the main workspace without using a line.

---

## 6. Do's & Don'ts

### Do:
*   **Embrace Asymmetry:** Align a title to the left and a CTA to the far right with significant white space between them.
*   **Use Large Padding:** If you think there is enough padding inside a card, add 8px more. Premium feels like "space."
*   **Focus on Typography:** Let the scale of the text do the work of a border.

### Don't:
*   **Don't use Dividers:** Never use `<hr>` or 1px solid lines to separate list items. Use 16px of `surface-container` background or simply 24px of white space.
*   **Don't use Pure Black:** Ensure all "black" text uses `on-surface` (`#1d1b19`) to keep the warmth of the system intact.
*   **Don't Over-round Small Elements:** Use `sm` (0.25rem) for small elements like checkboxes, while keeping `xl` for large cards. Mixing the rounding scale adds visual intentionality.