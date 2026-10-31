// ─────────────────────────────────────────────────────────────────────────────
// Fero Ferto — transparent demo analytics.
// Every number is explainable and derived only from the fictional seed data
// in demo-data.ts. No real AI model is connected; the "assistant" is a
// rules-based demo responder.
// ─────────────────────────────────────────────────────────────────────────────

import { DELIVERY_SKILLS, DEMAND_FORECAST, LOCATIONS, RIDERS, ZONES, ZONE_DEMAND_GAP, type DemoRider } from './demo-data'

// ── Workforce totals ─────────────────────────────────────────────────────────

export interface WorkforceStats {
  total: number
  available: number
  assigned: number
  unavailable: number
  /** Share of contracted weekly hours actually scheduled, 0-100 */
  utilization: number
  avgRating: number
  overloaded: DemoRider[]
  newThisWeek: DemoRider[] // idle riders (few hours booked) likely to accept work
}

export function workforceStats(riders: DemoRider[] = RIDERS): WorkforceStats {
  const total = riders.length
  const available = riders.filter(r => r.status === 'available').length
  const assigned = riders.filter(r => r.status === 'assigned').length
  const unavailable = riders.filter(r => r.status === 'unavailable').length
  const hours = riders.reduce((s, r) => s + r.hoursThisWeek, 0)
  const max = riders.reduce((s, r) => s + r.maxHoursPerWeek, 0)
  const avgRating = total ? riders.reduce((s, r) => s + r.rating, 0) / total : 0
  const overloaded = riders.filter(r => r.hoursThisWeek / r.maxHoursPerWeek >= 0.9)
  const newThisWeek = riders.filter(r => r.status === 'available' && r.hoursThisWeek / r.maxHoursPerWeek <= 0.7)
  return { total, available, assigned, unavailable, utilization: max ? Math.round((hours / max) * 100) : 0, avgRating: Math.round(avgRating * 10) / 10, overloaded, newThisWeek }
}

/** Riders whose shifts cover hour h (for the availability-by-hour chart). */
export function ridersOnAtHour(riders: DemoRider[] = RIDERS, hour: number): number {
  return riders.filter(r => r.status !== 'unavailable' && r.shifts.some(([a, b]) => hour >= a && hour < b)).length
}

// ── Zones / locations ────────────────────────────────────────────────────────

export interface ZoneStat {
  zone: string
  riders: number
  available: number
  utilization: number
  gapNextWeekend: number
}

export function zoneStats(riders: DemoRider[] = RIDERS): ZoneStat[] {
  const gap = ZONE_DEMAND_GAP
  return ZONES.map((zone) => {
    const inZone = riders.filter(r => r.zone === zone)
    const hours = inZone.reduce((s, r) => s + r.hoursThisWeek, 0)
    const max = inZone.reduce((s, r) => s + r.maxHoursPerWeek, 0)
    return {
      zone,
      riders: inZone.length,
      available: inZone.filter(r => r.status === 'available').length,
      utilization: max ? Math.round((hours / max) * 100) : 0,
      gapNextWeekend: gap[zone] || 0
    }
  })
}

// ── Heatmap: working pattern per weekday × hour (weighted demo pattern) ──────

export interface HeatCell { day: number, hour: number, value: number }

export function weeklyPattern(): HeatCell[] {
  const cells: HeatCell[] = []
  // Fictional delivery demand shape: lunch peak ~13h, dinner peak ~20h,
  // stronger Fri–Sun. Scaled by how many riders live in the zone… replaced by
  // a steady curve so the chart stays stable between renders.
  const dayBoost = [0.7, 0.85, 0.9, 0.95, 1.15, 1.25, 1.1]
  for (let day = 0; day < 7; day++) {
    for (let hour = 10; hour <= 23; hour++) {
      const lunch = Math.exp(-Math.pow(hour - 13, 2) / 4)
      const dinner = Math.exp(-Math.pow(hour - 20, 2) / 3)
      const value = Math.round((lunch * 8 + dinner * 12) * (dayBoost[day] || 1))
      cells.push({ day, hour, value })
    }
  }
  return cells
}

// ── Shift windows for the matching form ──────────────────────────────────────

export const SHIFT_OPTIONS = [
  { label: 'Morning (08–14)', from: 8, to: 14 },
  { label: 'Midday (12–18)', from: 12, to: 18 },
  { label: 'Evening (17–23)', from: 17, to: 23 },
  { label: 'Full day (08–23)', from: 8, to: 23 }
] as const

export function overlapHours(shifts: [number, number][], from: number, to: number): number {
  return shifts.reduce((sum, [a, b]) => sum + Math.max(0, Math.min(b, to) - Math.max(a, from)), 0)
}

// ── Explainable rider matching ───────────────────────────────────────────────

export interface MatchRequest {
  location: string
  count: number
  from: number // preferred start hour
  to: number // preferred end hour
  skill: string
  /** Hiring company — veterans of it onboard faster (demo bonus) */
  company?: string
}

export interface MatchResult {
  rider: DemoRider
  score: number
  eligible: boolean // required availability fully covered by a shift
  reasons: string[]
}

/**
 * The demo algorithm is deterministic and explainable (max 100):
 *  40  location: same neighbourhood 40 / same zone 22 / elsewhere 8
 *  30  availability overlap with preferred hours
 *  15  skill match on chosen delivery type
 *  15  headroom: lighter weekly workload scores higher
 *  +6  bonus if the rider already worked with the hiring company
 */
export function matchRiders(req: MatchRequest, riders: DemoRider[] = RIDERS): MatchResult[] {
  const zone = zoneOf[req.location]
  const results = riders.map((rider) => {
    const reasons: string[] = []
    let score = 0

    // Location component
    let locationScore: number
    if (rider.location === req.location) {
      locationScore = 40
      reasons.push(`Based in ${req.location} — zero relocation`)
    } else if (rider.zone === zone) {
      locationScore = 22
      reasons.push(`Same zone as ${req.location} (${rider.zone}) — short ride`)
    } else {
      locationScore = 8
      reasons.push(`Based in ${rider.location} — would need to reposition`)
    }
    score += locationScore

    // Availability overlap component
    const need = req.to - req.from
    const overlapActual = overlapHours(rider.shifts, req.from, req.to)
    const availScore = Math.round(30 * Math.min(1, overlapActual / Math.max(1, need)))
    score += availScore
    const requiredCovered = rider.shifts.some(([a, b]) => a <= req.from && b >= req.to)
    if (overlapActual <= 0) reasons.push('No shift overlaps the preferred hours today')
    else if (availScore === 30) reasons.push(`${overlapActual}h fully inside the preferred window`)
    else reasons.push(`${overlapActual}h of ${need}h preferred hours covered`)

    // Skill component
    let skillScore: number
    if (rider.skills.includes(req.skill)) {
      skillScore = 15
      reasons.push(`Experienced in ${req.skill} deliveries`)
    } else {
      skillScore = 5
      reasons.push(`Has skills in ${rider.skills.join(', ')} — would need a short brief on ${req.skill}`)
    }
    score += skillScore

    // Headroom component
    const headroom = 1 - rider.hoursThisWeek / rider.maxHoursPerWeek
    const headScore = Math.round(15 * headroom)
    score += headScore
    if (headroom >= 0.3) reasons.push(`Only ${rider.hoursThisWeek}h of ${rider.maxHoursPerWeek}h booked — room for more work`)
    else reasons.push(`Heavily booked (${rider.hoursThisWeek}/${rider.maxHoursPerWeek}h)`)

    if (req.company && rider.experience.includes(req.company)) {
      score = Math.min(100, score + 6)
      reasons.push(`Already worked with ${req.company} — onboarding takes a day, not a week`)
    }

    if (rider.status !== 'available') reasons.push('Currently on a shift — add to next wave instead')

    return { rider, score: Math.min(100, score), eligible: requiredCovered && rider.status !== 'unavailable', reasons }
  })

  return results.sort((a, b) => b.score - a.score)
}

export const MATCH_OPTIONS = { locations: LOCATIONS, skills: DELIVERY_SKILLS }

// ── Rules-based assistant (no LLM attached — demo only) ──────────────────────

export interface AssistantReply {
  text: string
  points?: string[]
  cta?: string
  riderNames?: string[]
}

export function assistantAnswer(question: string, stats = workforceStats(), zones = zoneStats()): AssistantReply {
  const q = question.toLowerCase()
  const busiestZone = [...zones].sort((a, b) => b.gapNextWeekend - a.gapNextWeekend)[0]!
  const hungryZone = [...zones].sort((a, b) => b.utilization - a.utilization)[0]!

  const names = (rs: DemoRider[]) => rs.slice(0, 5).map(r => `${r.name} (${r.location})`)

  if (/(how many|available|availability)/.test(q) && /(today|now|riders)/.test(q)) {
    return {
      text: `Right now ${stats.available} of ${stats.total} registered riders are available, ${stats.assigned} are already on shifts and ${stats.unavailable} are off.`,
      points: [
        'Next peak tonight between 19:00–21:00.',
        `${stats.newThisWeek.length} available riders are under-booked this week and can take more work.`
      ],
      riderNames: names(stats.newThisWeek)
    }
  }

  if (/(overload|overwork|too much|burn)/.test(q)) {
    return {
      text: `${stats.overloaded.length} riders are at 90%+ of their contracted weekly hours. Scheduling more work for them risks late deliveries and burnout.`,
      points: ['Shift the overflow to under-booked available riders in the same zone.', 'Watch on-time % — it drops on overloaded riders.'],
      riderNames: names(stats.overloaded)
    }
  }

  if (/(which area|where|minneed|needs more|more riders|shortage|area needs)/.test(q) || /area/.test(q)) {
    return {
      text: `${busiestZone.zone} is the highest-pressure zone: the demo forecast expects the largest rider gap there over the next weekend.`,
      points: [
        `${busiestZone.zone} currently has ${busiestZone.riders} riders, of which ${busiestZone.available} are available.`,
        `Estimated gap for the next busy stretch: ~${busiestZone.gapNextWeekend} riders (demo prediction).`,
        `Recruiting tip: focus outreach in ${busiestZone.zone} and ${hungryZone.zone}.`
      ]
    }
  }

  if (/(forecast|demand|next week|weekend|tomorrow|busy)/.test(q)) {
    const peak = [...DEMAND_FORECAST].sort((a, b) => b.demand - a.demand)[0]!
    const gapPeak = [...DEMAND_FORECAST].sort((a, b) => (b.demand - b.capacity) - (a.demand - a.capacity))[0]!
    return {
      text: `The demo forecast expects demand to peak on ${peak.day} (${peak.demand} riders needed) with the largest capacity gap of ~${gapPeak.demand - gapPeak.capacity} riders on ${gapPeak.day}.`,
      points: ['Weekend demand runs about 30% above weekday baseline.', 'These are simulated predictions for the demo, not live forecasts.']
    }
  }

  if (/(utili[sz]ation|efficien|improve|optimi)/.test(q)) {
    return {
      text: `Workforce utilization is at ${stats.utilization}% of contracted hours, and average rider rating is ${stats.avgRating}.`,
      points: [
        `Move work from ${hungryZone.zone} (${hungryZone.utilization}% utilized) to zones with headroom.`,
        `Ask the ${stats.newThisWeek.length} under-booked riders to cover surge slots.`,
        'Balancing split shifts against demand peaks typically adds 5–10 utilization points (demo estimate).'
      ],
      riderNames: names(stats.newThisWeek)
    }
  }

  if (/(match|recommend|hire|who)/.test(q)) {
    return {
      text: 'Try the Smart Rider Matching tab: enter a location, the number of riders, the shift window and the delivery type, and the demo explains its scoring for every suggestion.',
      points: ['Matching weights: location 40, availability 30, skills 15, workload headroom 15.']
    }
  }

  // Sub-question fallback: treat as a location keyword if it names one
  const locationHit = LOCATIONS.find(l => q.includes(l.toLowerCase()))
  if (locationHit) {
    const inLoc = RIDERS.filter(r => r.location === locationHit || r.zone === zoneOf[locationHit])
    const st = workforceStats(inLoc)
    return {
      text: `${locationHit}: ${st.total} riders in the zone, ${st.available} available right now, ${st.assigned} on shift.`,
      points: [`${Math.round((st.available / Math.max(1, st.total)) * 100)}% of the local roster is free. Use Smart Rider Matching for a scored shortlist there.`]
    }
  }

  return {
    text: `I'm a rules-based demo assistant, not a live AI model, so I answer from the demo dataset: ${stats.total} riders, ${stats.available} available, ${stats.assigned} assigned, ${stats.unavailable} off, utilization ${stats.utilization}%.`,
    points: [
      'Try: "How many riders are available today?", "Which riders are overloaded?", "Which area needs more riders?" or "How can I improve utilization?".'
    ]
  }
}
