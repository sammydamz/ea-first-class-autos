# DESIGN.md - OpenCode Inspired Design System

AI coding platform. Developer-centric dark theme.

## Overview

OpenCode's marketing site is rendered entirely in Berkeley Mono — every word on the page, from the 38px hero headline down to the 14px footer fine print, sits in the same monospaced face. The visual identity comes from that single typographic decision: the page reads like a manpage or a static-site README, complete with bracketed `[+]` / `[-]` / `[x]` ASCII markers used in place of icons or bullets, and a wordmark rendered as block-pixel ASCII art at the top of the nav. There is no sans-serif anywhere, no display face, no italics, no decorative ornament — the system is one font and one weight away from being a 1990s `whatis` page rendered at modern resolutions.

The chrome is austere: warm cream canvas (`#fdfcfc` with a faint blush), nearly-black ink (`#201d1d`), and a 4-tier neutral gray ladder for body, metadata, and disabled text. Cards don't exist as raised surfaces — sections are just hairline-bordered text blocks (1px) sitting directly on the canvas with 96px air between them. The single "visual" moment in the entire system is a full-bleed dark hero card (true near-black) that mocks up the OpenCode TUI itself: a terminal frame with `tab` / `ctrl-p` keybinding hints, a "Build" command line, and the OpenCode wordmark rendered as a pixel-block ASCII title.

**Key Characteristics:**
- 100% Berkeley Mono typography across every text role — no sans-serif fallback anywhere in the chrome
- Warm cream canvas (#fdfcfc) as the only body background — no surface alternation across sections
- Single dark surface (#201d1d) reserved exclusively for the hero TUI mockup
- 4px radius on every interactive element; sections themselves are sharp rectangles bordered in 1px hairline
- ASCII bracket markers (`[+]`, `[-]`, `[x]`) used as bullet glyphs in feature lists and FAQ rows
- Block-pixel ASCII wordmark in the primary nav and inside the hero TUI — the brand identity is its own ASCII art
- 96px rhythm between every section, with no decorative dividers; only thin 1px rules separate content blocks

## Colors

### Brand & Accent
- **Ink** (`#201d1d`): the brand's only "color." Headlines, body text, primary CTA fill, nav links, and every solid icon.
- **Ink Deep** (`#0f0000`): pressed-state for the primary CTA.
- **Cream** (`#fdfcfc`): the brand's signature warm white. Used for every page body, every card surface.

### Surface
- **Canvas Cream** (`#fdfcfc`): every page body, every card.
- **Soft Surface** (`#f8f7f7`): text-input default background, testimonial row fill.
- **Surface Card** (`#f1eeee`): install-snippet pill, disabled button fill.
- **Surface Dark** (`#201d1d`): the hero TUI mockup background.
- **Surface Dark Elevated** (`#302c2c`): the prompt-row inside the hero TUI mockup.
- **Hairline** (`rgba(15,0,0,0.12)`): 1px section divider.
- **Hairline Strong** (`#646262`): tab strip's bottom rule and stronger inline divider.

### Text
- **Ink** (`#201d1d`): headlines, body text, primary nav links.
- **Charcoal** (`#302c2c`): subtly softer body where pure ink is too heavy.
- **Body** (`#424245`): default paragraph text and FAQ answers.
- **Mute** (`#646262`): tab labels (default state), metadata, footer link text.
- **Stone** (`#6e6e73`): least-emphasis utility text.
- **Ash** (`#9a9898`): disabled text and secondary annotation.

### Semantic
- **Accent** (`#007aff`): primary informational signal, in-product link color.
- **Danger** (`#ff3b30`): destructive confirmation, error state.
- **Warning** (`#ff9f0a`): caution callouts.
- **Success** (`#30d158`): positive confirmation, in-TUI success indicator.

## Typography

### Font Family
**Berkeley Mono** is the proprietary monospaced face used across every text role. Open-source substitutes:
- **JetBrains Mono** — closest match for stroke contrast and x-height.
- **IBM Plex Mono** — official secondary fallback.
- **Geist Mono** — modern alternative with similar geometric construction.

### Hierarchy
| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| display-xl | 38px | 700 | 1.5 | Hero headline |
| heading-md | 16px | 700 | 1.5 | Section label |
| body-md | 16px | 400 | 1.5 | Body copy, paragraph text |
| body-strong | 16px | 500 | 1.5 | Inline emphasis, primary nav link |
| button-md | 16px | 500 | 2.0 | Every button label |
| caption-md | 14px | 400 | 2.0 | Footer link text, badge label |

## Layout

### Spacing System
- **Base unit:** 8px (with finer 1/2/4px steps available)
- **Tokens:** 1px, 4px, 8px, 12px, 16px, 24px, 32px, 96px (section)
- **Universal section rhythm:** 96px vertical gap between major content blocks
- **Section internal padding:** 16px vertical, no horizontal padding

### Grid & Container
- **Max width:** ~960px content column for body sections
- **Hero TUI mockup:** full-bleed within ~1100px content frame

## Elevation & Depth
| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | Default for body sections, list rows, hero text block |
| 1 — Hairline rule | 1px solid translucent warm tint | Section dividers |
| 2 — Hairline strong | 1px solid #646262 | Tab strip bottom rule |
| 3 — Inverted dark | #201d1d fill | Hero TUI mockup, dark CTA pill |

No drop shadows in the system. Nothing lifts, nothing floats.

## Shapes

### Border Radius
| Token | Value | Use |
|---|---|---|
| none | 0px | Sections, hero TUI mockup, primary nav, footer |
| sm | 4px | Every interactive element — buttons, inputs, badges |
| full | 9999px | Avatar circles in testimonials |

## Components

### Buttons
**Primary CTA:** Background #201d1d, text #fdfcfc, 4px radius, 4px 20px padding, ~36px height.
Pressed: background #0f0000.

**Secondary:** Background #fdfcfc, text #201d1d, 1px solid #646262 border, 4px 20px padding, 4px radius.

**Tab:** Transparent background, text #646262, 8px 16px padding.
Active: text #201d1d with 2px #9a9898 bottom underline.

**Disabled:** Background #f1eeee, text #9a9898, 4px radius.

### Badges
**News badge:** Background #201d1d, text #fdfcfc, 14px, 2px 8px padding, 4px radius.

### Inputs
**Text input:** Background #f8f7f7, text #201d1d, 1px solid hairline border, 8px 12px padding, ~40px height, 4px radius.
Focused: background #fdfcfc, border 1px solid #201d1d.

**Textarea:** Background #f8f7f7, text #201d1d, 1px solid hairline, 12px padding, 4px radius.

### Cards
**Hero TUI mockup:** Full-bleed #201d1d, padding 64px 32px, contains ASCII wordmark and faux terminal interface.

**List row:** Background #fdfcfc, text #424245, 16px, 8px 0 padding, starts with ASCII bracket marker.

**FAQ row:** Background #fdfcfc, text #201d1d, 16px, 12px 0 padding, 1px hairline bottom rule.

**Testimonial row:** Background #f8f7f7, text #424245, 16px, 16px 20px padding, 4px radius.

### Navigation
**Primary nav:** Background #fdfcfc, text #201d1d, 16px bold, ~56px height, 1px hairline bottom rule.
Layout: ASCII wordmark left, nav links center-right, Download CTA far right.

### Footer
**Footer section:** Background #fdfcfc, text #424245, 14px, 32px 0 padding, 1px hairline top rule.
Top row: 5-column link grid. Bottom row: copyright left, utility cluster right.

## Do's and Don'ts

### Do
- Render every text role in Berkeley Mono (or JetBrains Mono/IBM Plex Mono substitute)
- Keep #fdfcfc as the only body background
- Use ASCII bracket markers (`[+]`, `[-]`, `[x]`) as bullets
- Anchor the dark hero TUI mockup exactly once per landing page
- Use 4px radius on interactive elements, 0px on containers
- Stack sections at 96px rhythm with 1px hairline rules between them

### Don't
- Don't introduce a sans-serif body font
- Don't add drop shadows, gradients, or atmospheric backgrounds
- Don't replace ASCII bracket markers with SVG icons
- Don't use semantic accent colors on marketing CTAs
- Don't pad cards with 24px+ internal padding
- Don't render the wordmark as a vector logo — always block-pixel ASCII

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| desktop-large | 1280px+ | Default — 960px content column, 5-up footer |
| desktop | 1024px | Same layout; nav remains horizontal |
| tablet | 850px | Footer collapses to 2-up; two-column forms stack |
| tablet-narrow | 768px | Primary nav becomes hamburger; Download CTA stays visible |
| mobile | 640px | Single-column; hero display 38px → ~28px; section padding tightens |

### Touch Targets
All interactive elements meet WCAG AA at ~36–40px height range.

### Collapsing Strategy
- **Primary nav:** desktop horizontal → hamburger at 768px
- **Hero TUI:** full-bleed at every breakpoint
- **Footer:** 5-up → 2-up at tablet → 1-up at mobile
- **Section padding:** 96px → 64px tablet → 48px mobile
- **Hero headline:** 38px → ~28px at mobile
