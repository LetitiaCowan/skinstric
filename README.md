# Skinstric AI

A React frontend for **Skinstric**, an AI-powered skincare company — built as contract frontend work. The app walks a user through a guided skin analysis: capture or upload a photo, send it to Skinstric's AI backend, and get back a personalized breakdown of predicted demographics with confidence scores, presented through custom interactive visualizations.

👉 **Live Site:** https://skinstric-five.vercel.app/

## How it works

The app is a multi-step flow, each step its own route:

1. **Landing (`/`)** — animated intro built with GSAP timelines; hover interactions reveal "Discover A.I." and "Take Test" entry points.
2. **Info capture (`/testing`)** — collects the user's name and location, then posts it to Skinstric's live API to kick off a session.
3. **Photo capture (`/results`)** — the user provides a photo two ways:
   - **Live webcam capture**, with a custom permission flow, live video preview, and canvas-based still capture — no external camera library, built from scratch on top of `navigator.mediaDevices`.
   - **Gallery upload**, as a fallback for users who'd rather not use their camera.
   
   The image is sent to Skinstric's AI analysis endpoint, and the result — predicted race, age, and gender with per-category confidence scores — comes back from a real backend, not mocked data.
4. **Category menu (`/options`)** — a diamond-shaped nav for exploring different analysis categories. Demographics is live; Cosmetic Concerns, Skin Type Details, and Weather are scaffolded in the UI as planned next steps.
5. **Results (`/final`)** — an interactive breakdown of the AI's predictions: a category selector (Race / Age / Sex), an animated SVG confidence ring that redraws as you switch categories or drill into individual predicted values, and a ranked list of every value the model considered with its confidence percentage.

## Notable technical details

- **Real API integration** — the app calls two live Google Cloud Function endpoints (`skinstricPhaseOne` for session start, `skinstricPhaseTwo` for image analysis), not a mocked or local dataset.
- **Custom webcam capture hook** — handles camera permissions, live `<video>` streaming, canvas frame capture, and stream teardown, with its own permission-request UI rather than the browser default.
- **Animated, data-driven confidence chart** — a hand-built SVG ring (not a charting library) whose stroke offset is calculated from the selected prediction's confidence score, with a size that adapts across five breakpoints.
- **GSAP-driven interactions** on the landing page, using paired timelines to animate two independent text elements in sync on hover.
- Fully responsive, from mobile through desktop, styled with Tailwind CSS.

## Tech stack

- React 19 + React Router 7
- Tailwind CSS
- GSAP (animation)
- Axios (API calls)
- Create React App / react-scripts

## Getting started

```bash
git clone https://github.com/LetitiaCowan/skinstric.git
cd skinstric
npm install
npm start
```

Runs at [http://localhost:3000](http://localhost:3000). Note that the info-capture and photo-analysis steps call Skinstric's live backend endpoints, so those steps require network access to those services.

## Status

Built as a contract engagement; the core analysis flow (intro → capture → AI results) is complete. Cosmetic Concerns, Skin Type Details, and Weather were scoped as future categories and are visible but disabled in the UI.
