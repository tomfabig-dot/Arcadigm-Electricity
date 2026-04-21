export type SiteStatus = "Healthy" | "Input Data Fault" | "Offline";
export type SiteType = "Cold Store" | "Retail" | "Industrial" | "Office";

export type Site = {
  id: string;
  name: string;
  address: string;
  type: SiteType;
  status: SiteStatus;
  monthlyKwh: number;
  annualBill: number;
  livePeakKw: number;
  peak7dKw: number;
  cost7d: number;
  carbon7dT: number;
  improvements: number;
  highPriorityCount: number;
};

export const sites: Site[] = [
  {
    id: "1",
    name: "Parkside Supermarket — Adelaide",
    address: "132 Greenhill Rd, Parkside, SA 5063",
    type: "Retail",
    status: "Healthy",
    monthlyKwh: 35_000,
    annualBill: 420_000,
    livePeakKw: 187.5,
    peak7dKw: 402.1,
    cost7d: 2_826,
    carbon7dT: 6.35,
    improvements: 3,
    highPriorityCount: 2,
  },
  {
    id: "2",
    name: "Dandenong Cold Store",
    address: "Unit 12, 88 South Gippsland Hwy, Dandenong South, VIC 3175",
    type: "Cold Store",
    status: "Healthy",
    monthlyKwh: 26_000,
    annualBill: 310_000,
    livePeakKw: 312,
    peak7dKw: 288,
    cost7d: 5_940,
    carbon7dT: 13.22,
    improvements: 2,
    highPriorityCount: 1,
  },
  {
    id: "3",
    name: "Ringwood Retail Park — Melbourne",
    address: "200 Maroondah Hwy, Ringwood, VIC 3134",
    type: "Retail",
    status: "Input Data Fault",
    monthlyKwh: 57_000,
    annualBill: 680_000,
    livePeakKw: 412.5,
    peak7dKw: 398.1,
    cost7d: 11_450,
    carbon7dT: 25.69,
    improvements: 2,
    highPriorityCount: 1,
  },
];

export type Priority = "High Priority" | "Medium Priority" | "Low Priority";
export type ImprovementCategory =
  | "Refrigeration"
  | "HVAC"
  | "Tariff Optimisation"
  | "Demand Peak"
  | "Lighting"
  | "Base Load";
export type ImprovementStatus = "New" | "In Progress" | "Acknowledged" | "Resolved";

export type Improvement = {
  id: string;
  siteId: string;
  title: string;
  priority: Priority;
  category: ImprovementCategory;
  status: ImprovementStatus;
  savingsPerYear: number;
  estimatedProjectCost: number;
  detail: string;
};

export const improvements: Improvement[] = [
  {
    id: "imp-1",
    siteId: "2",
    title: "Condenser Fouling Suspected",
    priority: "High Priority",
    category: "Refrigeration",
    status: "New",
    savingsPerYear: 22_400,
    estimatedProjectCost: 2_500,
    detail:
      "Refrigeration power draw has increased by 14% over the past 6 weeks without a corresponding change in ambient temperature. This pattern is consistent with condenser coil fouling — a relatively low-cost maintenance fix.",
  },
  {
    id: "imp-2",
    siteId: "2",
    title: "Tariff Review Recommended",
    priority: "Medium Priority",
    category: "Tariff Optimisation",
    status: "New",
    savingsPerYear: 11_000,
    estimatedProjectCost: 0,
    detail:
      "Your current half-hourly tariff was last reviewed 3 years ago. Based on your load profile, you may be significantly better served by a flexible time-of-use tariff. Estimated saving: $8,000-$14,000 per year.",
  },
  {
    id: "imp-3",
    siteId: "3",
    title: "HVAC Oversizing Identified",
    priority: "High Priority",
    category: "HVAC",
    status: "New",
    savingsPerYear: 31_200,
    estimatedProjectCost: 8_000,
    detail:
      "HVAC demand data shows consistent oversizing vs. occupancy patterns. BMS optimisation and setpoint adjustment could reduce HVAC energy by an estimated 20%.",
  },
  {
    id: "imp-4",
    siteId: "3",
    title: "Demand Charge Optimisation",
    priority: "Medium Priority",
    category: "Demand Peak",
    status: "In Progress",
    savingsPerYear: 26_400,
    estimatedProjectCost: 5_000,
    detail:
      "Your site incurred 7 demand charge events in the past 30 days. A demand management strategy with load scheduling could reduce these charges by an estimated $2,200/month.",
  },
  {
    id: "imp-5",
    siteId: "1",
    title: "Morning Demand Spike Detected",
    priority: "High Priority",
    category: "Demand Peak",
    status: "New",
    savingsPerYear: 18_200,
    estimatedProjectCost: 500,
    detail:
      "Your site is triggering demand charges between 07:30-09:00 Monday to Friday. Shifting refrigeration defrost cycles to 06:00 could reduce peak demand by an estimated 35 kW.",
  },
  {
    id: "imp-6",
    siteId: "1",
    title: "LED Lighting Opportunity",
    priority: "Medium Priority",
    category: "Lighting",
    status: "New",
    savingsPerYear: 12_400,
    estimatedProjectCost: 35_000,
    detail:
      "Consumption data indicates legacy fluorescent lighting across the shop floor. A full LED retrofit could reduce lighting consumption by 65% and improve Scope 2 emissions reporting.",
  },
  {
    id: "imp-7",
    siteId: "1",
    title: "Refrigeration Night Setback Not Active",
    priority: "High Priority",
    category: "Refrigeration",
    status: "Acknowledged",
    savingsPerYear: 9_800,
    estimatedProjectCost: 800,
    detail:
      "Refrigeration load profile shows continuous running at full capacity overnight. Enabling night setback mode during 23:00-06:00 could achieve 8-12% reduction in refrigeration energy.",
  },
];

export const TARIFF_AUD_PER_KWH = 0.282;
export const TARIFF_GBP_PER_KWH = TARIFF_AUD_PER_KWH;
export const GRID_INTENSITY_T_PER_KWH = 0.00063;

export type ProjectType = {
  id: string;
  name: string;
  tag: string;
  tagTone: "violet" | "slate" | "teal" | "amber" | "emerald" | "sky" | "orange";
  delivery: string;
  description: string;
  typicalSaving: string;
  payback: string;
  loadLabel: string;
  loadLabelShort: string;
  loadPctLow: number;
  loadPctHigh: number;
  loadPctDefault: number;
  improvementPct: number;
  capitalCost: number;
};

export const projectTypes: ProjectType[] = [
  {
    id: "bms",
    name: "BMS Optimisation & Recommissioning",
    tag: "BMS / Controls",
    tagTone: "violet",
    delivery: "4w delivery",
    description:
      "Review and reconfiguration of building management system setpoints, scheduling, and control sequences. Often the highest-ROI project available.",
    typicalSaving: "~8%",
    payback: "1.4yr",
    loadLabel: "Controllable loads (HVAC + Lighting)",
    loadLabelShort: "bms / controls",
    loadPctLow: 20,
    loadPctHigh: 50,
    loadPctDefault: 35,
    improvementPct: 8,
    capitalCost: 15_000,
  },
  {
    id: "compressed",
    name: "Compressed Air Optimisation",
    tag: "Compressed Air",
    tagTone: "slate",
    delivery: "5w delivery",
    description:
      "Variable speed compressor controls, leak detection and repair programme, pressure optimisation. Typical saving: 20-35% of compressor energy.",
    typicalSaving: "~18%",
    payback: "1.8yr",
    loadLabel: "Compressed air system",
    loadLabelShort: "compressed air",
    loadPctLow: 10,
    loadPctHigh: 30,
    loadPctDefault: 18,
    improvementPct: 18,
    capitalCost: 22_000,
  },
  {
    id: "hvac-vsd",
    name: "HVAC Variable Speed Drives",
    tag: "HVAC & Ventilation",
    tagTone: "teal",
    delivery: "6w delivery",
    description:
      "Retrofit of VSDs to AHU fan motors and pumps. Savings scale with existing oversizing — typically 20-40% reduction in HVAC electrical load.",
    typicalSaving: "~15%",
    payback: "2yr",
    loadLabel: "HVAC & fan loads",
    loadLabelShort: "hvac & ventilation",
    loadPctLow: 15,
    loadPctHigh: 40,
    loadPctDefault: 25,
    improvementPct: 15,
    capitalCost: 28_000,
  },
  {
    id: "led",
    name: "LED Lighting Retrofit",
    tag: "LED Lighting",
    tagTone: "amber",
    delivery: "8w delivery",
    description:
      "Full replacement of fluorescent and HID lighting with high-efficiency LED. Includes controls, occupancy sensors, and daylight harvesting where applicable.",
    typicalSaving: "~5.5%",
    payback: "2.5yr",
    loadLabel: "Lighting load",
    loadLabelShort: "led lighting",
    loadPctLow: 8,
    loadPctHigh: 25,
    loadPctDefault: 15,
    improvementPct: 5.5,
    capitalCost: 45_000,
  },
  {
    id: "pf",
    name: "Power Factor Correction",
    tag: "Power Factor",
    tagTone: "emerald",
    delivery: "3w delivery",
    description:
      "Automatic power factor correction panel to reduce reactive power charges and reduce current draw on main incomer. Particularly effective for high-load refrigeration sites.",
    typicalSaving: "~4%",
    payback: "1.2yr",
    loadLabel: "Reactive power losses",
    loadLabelShort: "power factor",
    loadPctLow: 3,
    loadPctHigh: 12,
    loadPctDefault: 7,
    improvementPct: 4,
    capitalCost: 12_000,
  },
  {
    id: "refrig",
    name: "Refrigeration Controls Upgrade",
    tag: "Refrigeration",
    tagTone: "sky",
    delivery: "6w delivery",
    description:
      "Installation of electronic expansion valves, EC fan motors, and advanced refrigeration management system. Reduces refrigeration energy by 15-25%.",
    typicalSaving: "~12%",
    payback: "2.2yr",
    loadLabel: "Refrigeration system",
    loadLabelShort: "refrigeration",
    loadPctLow: 20,
    loadPctHigh: 60,
    loadPctDefault: 35,
    improvementPct: 12,
    capitalCost: 35_000,
  },
  {
    id: "solar",
    name: "Rooftop Solar PV",
    tag: "Solar PV",
    tagTone: "orange",
    delivery: "12w delivery",
    description:
      "Grid-connected solar PV installation for self-consumption. Sized to match daytime load profile. Includes monitoring and half-hourly export metering.",
    typicalSaving: "~10%",
    payback: "4.5yr",
    loadLabel: "Daytime grid consumption",
    loadLabelShort: "solar pv",
    loadPctLow: 35,
    loadPctHigh: 75,
    loadPctDefault: 55,
    improvementPct: 10,
    capitalCost: 85_000,
  },
];

export type Role = "Client Admin" | "Regional Manager" | "Site Manager" | "Viewer";
export type UserStatus = "Active" | "Invited" | "Pending";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
  sites: string[];
  status: UserStatus;
  lastActive: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "u-1",
    name: "Sarah Thornton",
    email: "s.thornton@parkside-retail.com.au",
    role: "Client Admin",
    sites: ["All sites"],
    status: "Active",
    lastActive: "Today, 09:14",
  },
  {
    id: "u-2",
    name: "James Whitfield",
    email: "j.whitfield@parkside-retail.com.au",
    role: "Regional Manager",
    sites: ["Parkside Supermarket — Adelaide", "Dandenong Cold Store"],
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: "u-3",
    name: "Priya Mehta",
    email: "p.mehta@parkside-retail.com.au",
    role: "Site Manager",
    sites: ["Parkside Supermarket — Adelaide"],
    status: "Active",
    lastActive: "3 days ago",
  },
  {
    id: "u-4",
    name: "Tom Bradley",
    email: "t.bradley@parkside-retail.com.au",
    role: "Site Manager",
    sites: ["Dandenong Cold Store"],
    status: "Invited",
    lastActive: "—",
  },
  {
    id: "u-5",
    name: "Claire Evans",
    email: "c.evans@parkside-retail.com.au",
    role: "Viewer",
    sites: ["Ringwood Retail Park — Melbourne"],
    status: "Active",
    lastActive: "6 days ago",
  },
];

export type HHMeterStatus = "Connected" | "Error" | "Not configured";
export type HHMeter = {
  siteId: string;
  nmi: string;
  provider: string;
  lastDataPoint: string;
  hhActive: boolean;
  status: HHMeterStatus;
  errorMessage?: string;
};

export const hhMeters: HHMeter[] = [
  {
    siteId: "1",
    nmi: "2001234567",
    provider: "Fiskil (CDR)",
    lastDataPoint: "Today, 06:30",
    hhActive: true,
    status: "Connected",
  },
  {
    siteId: "2",
    nmi: "6305432109",
    provider: "Fiskil (CDR)",
    lastDataPoint: "3 days ago",
    hhActive: true,
    status: "Error",
    errorMessage:
      "Data gap detected (3 days). Your CDR consent may need to be re-authorised. Reconnect via the Consumer Data Right, or contact your retailer.",
  },
  {
    siteId: "3",
    nmi: "—",
    provider: "—",
    lastDataPoint: "—",
    hhActive: false,
    status: "Not configured",
  },
];

export type SubMeter = {
  id: string;
  siteId: string;
  circuit: string;
  online: boolean;
  lastReading: string;
};

export const subMeters: SubMeter[] = [
  { id: "sm-1", siteId: "1", circuit: "Main incomer", online: true, lastReading: "2 min ago" },
  { id: "sm-2", siteId: "1", circuit: "Refrigeration", online: true, lastReading: "3 min ago" },
  { id: "sm-3", siteId: "2", circuit: "Compressor bank A", online: true, lastReading: "1 min ago" },
  { id: "sm-4", siteId: "2", circuit: "Compressor bank B", online: false, lastReading: "14 hrs ago" },
  { id: "sm-5", siteId: "3", circuit: "HVAC — East wing", online: false, lastReading: "Not deployed" },
];

export type Report = {
  id: string;
  siteId: string;
  title: string;
  period: string;
  pages: number;
  publishedAt: string;
};

export const reports: Report[] = [
  {
    id: "r-1",
    siteId: "2",
    title: "Dandenong Cold Store — Q1 2026 Review",
    period: "Jan–Mar 2026",
    pages: 18,
    publishedAt: "2026-04-08",
  },
  {
    id: "r-2",
    siteId: "1",
    title: "Parkside Supermarket — Q1 2026 Review",
    period: "Jan–Mar 2026",
    pages: 14,
    publishedAt: "2026-04-05",
  },
];

export function portfolioTotals() {
  const annualBill = sites.reduce((a, s) => a + s.annualBill, 0);
  const monthlyKwh = sites.reduce((a, s) => a + s.monthlyKwh, 0);
  const monthlySpend = Math.round(annualBill / 12 / 100) * 100;
  const openImprovements = improvements.filter((i) => i.status !== "Resolved").length;
  const potentialSavings = improvements
    .filter((i) => i.status !== "Resolved")
    .reduce((a, i) => a + i.savingsPerYear, 0);
  const sitesWithImprovements = new Set(
    improvements.filter((i) => i.status !== "Resolved").map((i) => i.siteId),
  ).size;
  return {
    annualBill,
    monthlyKwh,
    monthlySpend,
    openImprovements,
    potentialSavings,
    sitesWithImprovements,
    siteCount: sites.length,
    reportsCount: reports.length,
  };
}

export function demandSeries(peakKw: number) {
  const pts: { t: string; kw: number; peak: number }[] = [];
  const start = new Date("2026-04-11T00:00:00Z");
  const peak = peakKw;
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h += 6) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + d);
      date.setUTCHours(h);
      const isWeekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
      const workHour = h >= 6 && h < 22;
      const base = workHour ? peak * (isWeekend ? 0.55 : 0.78) : peak * 0.28;
      const noise = ((d * 11 + h * 3) % 7) - 3;
      pts.push({
        t: `${date.toUTCString().slice(0, 3)} ${date.getUTCDate()} ${String(h).padStart(2, "0")}:00`,
        kw: Math.max(8, Math.round(base + noise)),
        peak: Math.round(peak * 0.95),
      });
    }
  }
  return pts;
}

export function aud(n: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);
}

export const gbp = aud;
