export const geminiItinerary = {
  arrival: "Apr 17 at LAS 09:52 via DL2922 (First Class)",
  hotel: "Homewood Suites by Hilton Las Vegas City Center (Conf: 80545966)",
  shift: "Move to Luxor Apr 21 for Google Cloud Next",
};

export type TimelineEvent = {
  title: string;
  when: string; // ISO timestamp
  location?: string;
};

export const geminiCountdowns: TimelineEvent[] = [
  {
    title: "Shift to Luxor",
    when: "2026-04-21T12:00:00-07:00",
    location: "Luxor",
  },
  {
    title: "Sphere: Postcards From Earth",
    when: "2026-04-19T19:30:00-07:00",
    location: "Sphere",
  },
  {
    title: "Adobe Summit Pre-Con Labs",
    when: "2026-04-19T13:00:00-07:00",
    location: "Venetian / Sands Expo",
  },
  {
    title: "Wynn Signature $400 NLH",
    when: "2026-04-20T11:00:00-07:00",
    location: "Wynn Poker Room",
  },
  {
    title: "Venetian $1,100 NLH Flight",
    when: "2026-04-17T11:10:00-07:00",
    location: "Venetian Poker",
  },
];

export const geminiDays = [
  {
    day: "Fri, Apr 17",
    focus: "Arrival + AI Foundations",
    items: [
      "Check-in Homewood Suites (Conf: 80545966)",
      "AI & Automation Workshop (join afternoon track)",
    ],
  },
  {
    day: "Sat, Apr 18",
    focus: "Immersive Reality",
    items: ["Meow Wolf Omega Mart (AREA15)", "Arte Museum Las Vegas (projection mapping)",],
  },
  {
    day: "Sun, Apr 19",
    focus: "Simulation & Pre-Summit",
    items: ["Sphere: Postcards From Earth (16K wrap)", "Adobe Summit pre-con labs (AI-native CX)",],
  },
  {
    day: "Mon, Apr 20",
    focus: "Specialized AI",
    items: [
      "Intl. Conf. on AI & Big Data in Biomed",
      "SANS AI Cybersecurity Summit track",
    ],
  },
];

export const geminiExperiences = [
  {
    title: "AI & Automation Workshop",
    vibe: "Enterprise AI implementation",
    note: "Afternoon join-in after arrival",
  },
  {
    title: "Meow Wolf: Omega Mart (AREA15)",
    vibe: "Immersive AV + narrative systems",
    note: "High data/art hybrid; portals and sensor-driven scenes",
  },
  {
    title: "Arte Museum Las Vegas",
    vibe: "Projection mapping + responsive environments",
    note: "Tranquil, sensor-aware digital nature",
  },
  {
    title: "Sphere: Postcards From Earth",
    vibe: "16K wrap LED + 4D effects",
    note: "Infra spectacle; low-latency rendering",
  },
  {
    title: "Adobe Summit Pre-Con",
    vibe: "AI-native CX orchestration",
    note: "Hands-on labs; content at scale",
  },
];

export const geminiPoker = {
  series: [
    {
      name: "Wynn April Signature Series",
      window: "Apr 20–May 3",
      highlights: [
        "$400 NLH $100K GTD (Apr 20 11:00)",
        "$200 NLH Turbo $10K GTD (Apr 20 18:00)",
      ],
      reg: "On-site at Wynn Poker Room (Encore)",
    },
    {
      name: "Venetian DeepStack Extravaganza II",
      window: "Apr 1–May 17",
      highlights: [
        "$1,100 NLH $200K GTD flights (Apr 17–18 11:10)",
        "$200 NLH Bounty $10K GTD nightly (18:10)",
        "$250 NLH $100K GTD (Apr 20 11:10)",
      ],
      reg: "On-site; track via Venetian Poker homepage",
    },
  ],
  rooms: [
    {
      name: "Resorts World",
      vibe: "RFID, PokerAtlas, tech-forward",
      tip: "Good for quick reg + data-rich tables",
    },
    {
      name: "Aria",
      vibe: "Modern, daily $140–$240 events",
      tip: "Two dailies (1p/7p) with solid structures",
    },
    {
      name: "Horseshoe",
      vibe: "WSOP home, turbo daily structures",
      tip: "Fast levels; back-to-room by midnight",
    },
  ],
};

export const geminiSessions = [
  {
    title: "Agentic Cloud (Opening Keynote)",
    when: "Apr 22 09:00–10:30",
    vibe: "Vision: assistants → agents",
  },
  {
    title: "Scaling Claude: Anthropic TPU Strategy",
    when: "Apr 22 11:00–11:45",
    vibe: "Hardcore infra for LLM scale",
  },
  {
    title: "NVIDIA Omniverse for Physical AI",
    when: "Apr 22 11:00–11:20",
    vibe: "Digital twins for immersive worlds",
  },
  {
    title: "Get Real: Agents in the Autonomous Era",
    when: "Apr 23 10:30–11:45",
    vibe: "Production agentic systems",
  },
  {
    title: "AI Multi-Agent Systems Happy Hour",
    when: "Apr 22 18:00–20:00 at Rí Rá (Mandalay Place)",
    vibe: "Networking; poker-adjacent crowd",
  },
];
