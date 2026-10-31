# Fero Ferto — Interactive Product Demo

A self-contained MVP demo of the Fero Ferto *AI-powered workforce intelligence platform*,
built for pitching to incubation teams (e.g. QSTP) and to delivery companies.
Everything runs locally in the browser: **no accounts, no API keys, no backend calls.**

## What this is

Fero Ferto is a **manpower company**: it connects trained delivery riders with delivery
companies (eFOOD, BOX Delivery, Wolt, FreshCart in the demo). The demo dashboard shows
how a shared workforce console would work:

- companies hire riders and monitor workforce performance,
- riders find new opportunities at specific companies,
- Fero Ferto coordinates availability, matching and forecasting in the middle.

## How to run it

```bash
npm install     # first time only
npm run dev     # starts Nuxt dev server (default http://localhost:3000)
```

Then open **http://localhost:3000/demo**.
Production build: `npm run build && npm run preview` → same `/demo` route.

## Ways to reach the demo from the website

| Entry point | Path |
| --- | --- |
| Header button **"Request a demo"** | `/demo` |
| Navbar item **"Live demo"** | `/demo` |
| Home hero button **"Open the live demo"** | `/demo` |
| Contact page banner **"Open the live demo"** | `/demo` |

## The six demo sections (`/demo`)

1. **Overview** — total / available / on-shift / off-duty riders, workforce utilization %,
   riders-on-the-road chart (Today / Week toggle), status donut, operational pulse.
2. **Rider management** — 30 fictional riders with avatars, locations, skills, employers,
   ratings, workload bars. Search + 4 filters + sortable list. Click a card for the full
   profile (shifts, experience with companies, workload).
3. **Smart matching** — a company enters its staffing requirement
   (company, area, riders needed, shift window, preferred hours). A *transparent*
   scoring algorithm sorts the network: location 40 pts, availability overlap 30,
   skill fit 15, workload headroom 15, +6 bonus for riders who already worked with the
   hiring company. Every card lists *why* it was recommended.
4. **Workforce intelligence** — weekday × hour demand heatmap, workload distribution
   histogram, utilization by zone, 8-week performance trend (on-time % vs utilization).
5. **Forecasting** — next-7-days riders needed vs available + gap (table + line chart),
   hour-slot view with a suggested staffing plan. **Clearly labelled "Demo prediction ·
   simulated data".**
6. **AI assistant** — chat with quick-question chips. **Rules-based and transparent**:
   answers are generated locally from the demo dataset by keyword matching in
   `app/utils/demo-analytics.ts` — no LLM is connected, and the UI says so.

## What is real vs simulated

- ❌ No live rider data — all 30 riders, companies, ratings and series are fictional
  seed data in `app/utils/demo-data.ts`.
- ❌ No real AI/LLM — matching is deterministic weighted scoring; the assistant is
  keyword rules. Both are labelled as such in the UI.
- ✅ Fully working algorithms, charts, filters and interactions.

## Suggested 3-minute pitch flow (for the recording)

1. Land on **FeroFerto.com** → click **"Request a demo"** → demo banner explains it's simulated.
2. **Overview**: sweep through the totals card → Today chart → point at utilization %.
3. **Rider management**: show a couple of profiles, use one filter (e.g. "Kifisia" / "On shift").
4. **Smart matching**: run "eFOOD, Koukaki, 4 riders, Midday (12–18)" — narrate one
   recommendation and its reasons.
5. **Intelligence**: hover the heatmap peaks, show utilization by zone.
6. **Forecasting**: point at the Friday/Saturday gap → "the platform tells you *before* the weekend".
7. **AI assistant**: click the four suggested questions — the answers come straight from the same data.

## Key files

- `app/pages/demo.vue` — demo shell, tabs, demo banner
- `app/components/demo/` — Overview / Riders / Matching / Intelligence / Forecast / Assistant + charts
- `app/utils/demo-data.ts` — fictional seed data (+ `demo-analytics.ts` — scoring & assistant logic)
- `app/app.vue` — site entry points
