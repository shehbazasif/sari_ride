// ─────────────────────────────────────────────────────────────────────────────
// Fero Ferto — Interactive Product Demo seed data
// ALL DATA IS FICTIONAL. No real riders, companies or personal information.
// ─────────────────────────────────────────────────────────────────────────────

export type RiderStatus = 'available' | 'assigned' | 'unavailable'
export type Vehicle = 'motorbike' | 'e-bike' | 'bicycle' | 'car'

export const COMPANIES = ['eFOOD', 'BOX Delivery', 'Wolt', 'FreshCart'] as const
export type Company = typeof COMPANIES[number]

export interface DemoRider {
  id: number
  name: string
  location: string
  zone: string
  vehicle: Vehicle
  skills: string[]
  status: RiderStatus
  /** Current employer via Fero Ferto (null = between contracts, open to offers) */
  currentCompany: Company | null
  /** Companies the rider has already worked with — smooth onboarding */
  experience: string[]
  /** Shifts open today as [startHour, endHour) pairs, 24h clock */
  shifts: [number, number][]
  hoursThisWeek: number
  maxHoursPerWeek: number
  assignmentsToday: number
  assignmentsMonth: number
  rating: number
  onTimePct: number
  /** Short self-reported availability for the week (display only) */
  availability: string
}

export const LOCATIONS = [
  'Monastiraki', 'Koukaki', 'Exarcheia', 'Psiri', 'Pangrati',
  'Kifisia', 'Marousi', 'Nea Ionia', 'Zografou',
  'Glyfada', 'Nea Smyrni', 'Alimos', 'Palaio Faliro',
  'Piraeus', 'Kerameikos', 'Peristeri'
]

export const ZONES = ['Athens Center', 'North Athens', 'South Coast', 'West & Ports']

export const zoneOf: Record<string, string> = {
  'Monastiraki': 'Athens Center', 'Koukaki': 'Athens Center', 'Exarcheia': 'Athens Center',
  'Psiri': 'Athens Center', 'Pangrati': 'Athens Center',
  'Kifisia': 'North Athens', 'Marousi': 'North Athens', 'Nea Ionia': 'North Athens', 'Zografou': 'North Athens',
  'Glyfada': 'South Coast', 'Nea Smyrni': 'South Coast', 'Alimos': 'South Coast', 'Palaio Faliro': 'South Coast',
  'Piraeus': 'West & Ports', 'Kerameikos': 'West & Ports', 'Peristeri': 'West & Ports'
}

export const DELIVERY_SKILLS = ['food', 'parcels', 'groceries', 'b2b']

// Fictional riders. Tuple form kept compact, expanded to DemoRider below.
// [name, location, vehicle, skills, status, shifts, hrsWeek, maxHrs, today, month, rating, onTime, weeklyAvailability]
type Row = [string, string, Vehicle, string[], RiderStatus, [number, number][], number, number, number, number, number, number, string]

const rows: Row[] = [
  ['Nikos Alexiou', 'Monastiraki', 'motorbike', ['food', 'b2b'], 'assigned', [[10, 16], [18, 24]], 38, 40, 14, 186, 4.9, 97, 'Mon–Sat, day & evening'],
  ['Maria Stavrou', 'Koukaki', 'e-bike', ['food', 'groceries'], 'available', [[9, 15], [17, 23]], 30, 36, 2, 150, 4.8, 95, 'Mon–Fri, lunch + dinner'],
  ['Dimitris Papadakis', 'Exarcheia', 'motorbike', ['food'], 'available', [[11, 17], [19, 24]], 34, 40, 3, 167, 4.6, 93, 'Mon–Sat, afternoons'],
  ['Eleni Karagianni', 'Psiri', 'bicycle', ['food'], 'available', [[10, 15]], 22, 24, 1, 98, 4.7, 96, 'Tue–Thu, mornings'],
  ['Yannis Georgiou', 'Pangrati', 'motorbike', ['food', 'parcels'], 'assigned', [[12, 20]], 36, 40, 12, 190, 4.5, 91, 'Wed–Sun, all day'],
  ['Sofia Nikolaidou', 'Kifisia', 'car', ['groceries', 'b2b'], 'available', [[8, 14]], 26, 36, 0, 120, 4.8, 98, 'Mon–Thu, mornings'],
  ['Petros Vasiliou', 'Marousi', 'motorbike', ['food', 'b2b'], 'assigned', [[9, 17]], 40, 40, 16, 198, 4.4, 89, 'Mon–Fri, full time'],
  ['Katerina Dimou', 'Nea Ionia', 'e-bike', ['food', 'parcels'], 'available', [[13, 21]], 28, 32, 2, 131, 4.6, 94, 'Every day, afternoons'],
  ['Costas Mantalos', 'Zografou', 'bicycle', ['food', 'groceries'], 'available', [[10, 16], [18, 22]], 24, 30, 1, 105, 4.3, 90, 'Mon–Fri, split shifts'],
  ['Anna Foka', 'Zografou', 'motorbike', ['food'], 'assigned', [[14, 23]], 35, 38, 11, 172, 4.7, 95, 'Tue–Sat, evening'],
  ['George Laskaris', 'Glyfada', 'motorbike', ['food', 'b2b'], 'available', [[9, 14], [17, 23]], 32, 40, 2, 148, 4.8, 96, 'Mon–Sat, day & evening'],
  ['Rania Pappa', 'Glyfada', 'e-bike', ['food'], 'available', [[15, 22]], 25, 30, 1, 112, 4.5, 92, 'Thu–Sun, evenings'],
  ['Vasilis Trakas', 'Nea Smyrni', 'motorbike', ['food', 'parcels'], 'assigned', [[10, 18]], 37, 40, 13, 181, 4.6, 93, 'Every day, daytime'],
  ['Ino Katsari', 'Nea Smyrni', 'bicycle', ['groceries'], 'available', [[8, 13]], 20, 24, 0, 87, 4.7, 97, 'Weekdays, early'],
  ['Loukas Serdes', 'Alimos', 'car', ['groceries', 'b2b'], 'available', [[9, 16]], 30, 38, 1, 129, 4.4, 88, 'Mon–Fri, mornings'],
  ['Despina Roussou', 'Alimos', 'e-bike', ['food'], 'available', [[17, 23]], 21, 24, 0, 92, 4.6, 94, 'Weekends + evenings'],
  ['Alex Aliprantis', 'Palaio Faliro', 'motorbike', ['food', 'b2b'], 'assigned', [[11, 19]], 39, 40, 15, 195, 4.8, 96, 'Mon–Sat, daytime'],
  ['Elsa Mavridou', 'Palaio Faliro', 'e-bike', ['food', 'parcels'], 'unavailable', [], 12, 24, 0, 54, 4.2, 86, 'Off this week (exam period)'],
  ['Theodoris Antonopoulos', 'Piraeus', 'motorbike', ['food', 'parcels', 'b2b'], 'assigned', [[9, 17]], 40, 40, 15, 201, 4.7, 94, 'Mon–Sat, full time'],
  ['Maria Timi', 'Piraeus', 'e-bike', ['food'], 'available', [[12, 18], [19, 23]], 27, 34, 2, 117, 4.5, 91, 'Wed–Sun, afternoons'],
  ['Panagiotis Vezis', 'Piraeus', 'bicycle', ['food', 'groceries'], 'available', [[10, 16]], 23, 30, 1, 99, 4.3, 89, 'Wed–Fri, mid-day'],
  ['Sofia Kalantzi', 'Kerameikos', 'e-bike', ['food'], 'unavailable', [], 0, 20, 0, 0, 4.0, 82, 'On leave until next week'],
  ['Chris Bakos', 'Kerameikos', 'motorbike', ['food', 'b2b'], 'available', [[13, 22]], 33, 40, 1, 141, 4.6, 92, 'Mon–Sat, afternoons'],
  ['Vera Liosatou', 'Peristeri', 'e-bike', ['food', 'parcels'], 'available', [[8, 14], [16, 21]], 29, 34, 2, 124, 4.5, 93, 'Every day, split shifts'],
  ['Marios Psychas', 'Peristeri', 'car', ['b2b', 'groceries'], 'available', [[7, 13]], 24, 36, 0, 101, 4.4, 90, 'Mon–Fri, early mornings'],
  ['Nina Eleftheriou', 'Exarcheia', 'e-bike', ['parcels'], 'unavailable', [], 18, 24, 0, 66, 4.1, 84, 'Off today'],
  ['Stathis Vranos', 'Koukaki', 'motorbike', ['food', 'b2b'], 'available', [[11, 19]], 38, 40, 1, 160, 4.7, 94, 'Thu–Mon, daytime'],
  ['Lena Stavrianou', 'Pangrati', 'e-bike', ['food', 'groceries'], 'assigned', [[15, 23]], 36, 38, 12, 178, 4.9, 98, 'Every day, evenings'],
  ['Bill Doukas', 'Marousi', 'bicycle', ['food'], 'unavailable', [], 16, 24, 0, 58, 4.2, 85, 'Off today'],
  ['Nelly Andreadou', 'Glyfada', 'car', ['groceries', 'b2b', 'parcels'], 'available', [[9, 15], [17, 22]], 31, 40, 1, 133, 4.6, 95, 'Mon–Sat, flexible']
]

const pickCompany = (i: number) => COMPANIES[i % COMPANIES.length] as Company

export const RIDERS: DemoRider[] = rows.map((r, i) => ({
  id: i + 1,
  name: r[0],
  location: r[1],
  zone: zoneOf[r[1]] || 'Athens Center',
  vehicle: r[2],
  skills: r[3],
  status: r[4],
  // Employer assignment is deterministic fictional data: riders on shift have
  // a current company, some free riders stay contracted for their next wave.
  currentCompany: r[4] === 'assigned' || (i % 3 === 0) ? pickCompany(i) : null,
  experience: [pickCompany(i), pickCompany(i * 2 + 1)].filter((c, j, a) => a.indexOf(c) === j),
  shifts: r[5],
  hoursThisWeek: r[6],
  maxHoursPerWeek: r[7],
  assignmentsToday: r[8],
  assignmentsMonth: r[9],
  rating: r[10],
  onTimePct: r[11],
  availability: r[12]
}))

// ── Historical & forecast series (fictional, deterministic) ──────────────────

export const PERFORMANCE_TREND = [
  { week: 'W1', onTime: 87, utilization: 58 },
  { week: 'W2', onTime: 88, utilization: 61 },
  { week: 'W3', onTime: 90, utilization: 63 },
  { week: 'W4', onTime: 89, utilization: 66 },
  { week: 'W5', onTime: 92, utilization: 69 },
  { week: 'W6', onTime: 93, utilization: 71 },
  { week: 'W7', onTime: 94, utilization: 70 },
  { week: 'W8', onTime: 95, utilization: 73 }
]

/** Predicted riders needed vs capacity for the next 7 days (demo forecast). */
export const DEMAND_FORECAST = [
  { day: 'Tomorrow', label: 'Tue', demand: 24, capacity: 22 },
  { day: '+1 day', label: 'Wed', demand: 26, capacity: 24 },
  { day: '+2 days', label: 'Thu', demand: 25, capacity: 25 },
  { day: '+3 days', label: 'Fri', demand: 31, capacity: 26 },
  { day: '+4 days', label: 'Sat', demand: 34, capacity: 27 },
  { day: '+5 days', label: 'Sun', demand: 30, capacity: 23 },
  { day: '+6 days', label: 'Mon', demand: 23, capacity: 22 }
]

/** Weighted hotspots: which zone is likely short next weekend (demo). */
export const ZONE_DEMAND_GAP = DEMAND_FORECAST.reduce<Record<string, number>>((acc, d) => {
  const gap = Math.max(0, d.demand - d.capacity)
  const share: Record<string, number> = { 'Athens Center': 0.3, 'North Athens': 0.24, 'South Coast': 0.3, 'West & Ports': 0.16 }
  for (const z of ZONES) acc[z] = (acc[z] || 0) + Math.round(gap * (share[z] || 0))
  return acc
}, {})
