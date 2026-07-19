# गणपती बाप्पा मोरया — Ganpati Festival Invitation Website

A festive, single-page digital invitation for a Ganesh Festival celebration, written in Marathi. Built with React, Vite, and Tailwind CSS, with animations, a countdown to Bappa's arrival, and a "save invitation as image" feature so guests can download the card straight to their phone.

## Features

- **Marathi throughout** — hero, invitation card, program schedule, countdown, and footer.
- **Animated hero** with a Ganpati Bappa photo, floating petals, and confetti on load.
- **Invitation card** with host name, date, time, and venue.
- **Countdown timer** to the festival date (14 September 2026).
- **Program schedule** timeline — पूजा, आरती, भोजन, आरती, भजन.
- **Save as image** — captures the invitation card via `html2canvas-pro` and downloads it as a PNG. On phones this lands in the gallery/Downloads.
- **Background aarti audio** toggle.

## Tech Stack

- [React 19](https://react.dev/)
- [Vite 8](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via the Vite plugin — no PostCSS config)
- [Framer Motion](https://www.framer.com/motion/) for animations
- [lucide-react](https://lucide.dev/) for icons
- [canvas-confetti](https://github.com/catdad/canvas-confetti) for the confetti burst
- [html2canvas-pro](https://github.com/yorickshan/html2canvas-pro) for image capture (the `-pro` fork is required because Tailwind v4 uses `oklch()` colors that the original html2canvas can't parse)

## Getting Started

Prerequisites: [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The dev server runs on `$PORT` (default `8443`) and binds to `0.0.0.0`, so it's reachable from other devices on your network. Open the URL printed in the terminal. Changes hot-reload automatically.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run format` | Format the code with oxfmt |

## Project Structure

```
.
├── public/
│   ├── ganpati-bappa.jpg    # Hero image
│   └── host-image.jpeg      # Host avatar on the invitation card
├── src/
│   ├── App.tsx              # The entire single-page app
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles + Tailwind import
├── index.html
├── vite.config.ts
└── package.json
```

## Customizing the Invitation

Most content lives in [src/App.tsx](src/App.tsx):

- **Host name** — search for `यजमान` and edit the `<h2>` below it.
- **Date / time / venue** — the three-column grid in the invitation card section.
- **Countdown target** — the `targetDate` value in the `useEffect` near the top of `App`.
- **Program schedule** — the array of `{ time, title, desc }` objects in the schedule section.
- **Images** — replace `public/ganpati-bappa.jpg` (hero) and `public/host-image.jpeg` (host avatar). If you change the filename or extension, update the matching `src="..."` in `App.tsx`.

## Notes

- This project was scaffolded with Figma Make; `vite.config.ts` contains Figma-specific plugins that are safe to leave as-is for standard local development.
- The background aarti audio currently points at a placeholder track. Swap the `<source src="...">` in `App.tsx` for a real aarti file (put it in `public/` and reference it as `/your-file.mp3`).

गणपती बाप्पा मोरया! 🙏
