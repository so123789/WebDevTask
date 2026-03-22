# Mangalam HDPE Pipes – Product Page

A responsive product detail page for **Mangalam HDPE Pipes**, built as a front-end assignment. No frameworks — just vanilla HTML, CSS, and JavaScript.

---

## What's in this project

```
Assignment/
├── index.html       # Main page (only page)
├── styles.css       # All styling, including responsive breakpoints
├── script.js        # Carousel, FAQ accordion, tabs, zoom, form logic
└── assets/
    ├── Banner/      # Hero carousel images, badge icons, check icons
    └── Header/      # Logo image
```

---

## Features

- **Image carousel** with zoom-on-hover (desktop) and thumbnail selector
- **Technical specs table** — scrollable on mobile
- **FAQ accordion** — one item open at a time
- **Applications carousel** — horizontally scrollable cards
- **Process tabs** (desktop) / accordion (mobile) — same content, different UI
- **Responsive design** — works on desktop, tablet, and mobile (down to 360px)
- **Hamburger menu** — mobile nav with Escape key support and focus trap
- **Catalogue form** — send-catalogue-by-email CTA

---

## How to run

There's no build step. Just open the file:

used VS Code Live Server



## Browser support

Tested on:
- Chrome 120+
- Edge 120+
- Firefox 121+

Should work fine on Safari too but wasn't explicitly tested.

---

## Responsive breakpoints

| Breakpoint | Target |
|---|---|
| > 900px | Full desktop layout |
| ≤ 900px | Tablet – reduced padding |
| ≤ 768px | Mobile – hamburger menu, stacked banner |
| ≤ 480px | Small phones – 16px side padding |

---

## Accessibility

A few things that were intentionally added:

- Skip-to-content link (press `Tab` on page load to see it)
- All images have `alt` text; decorative icons have `alt=""`
- Keyboard-navigable hamburger menu — `Escape` closes it, focus returns to button
- FAQ buttons use `aria-expanded` and `aria-controls`
- Process tabs use `role="tablist"` / `role="tab"`
- Visually-hidden label on the email input
- Global `:focus-visible` ring for keyboard users

---


---

## Tech used

- HTML5 (semantic elements, ARIA attributes)
- CSS3 (custom properties, flexbox, grid, `@media` queries, `position: sticky`)
- Vanilla JavaScript (DOM events, no jQuery, no bundler)

---

