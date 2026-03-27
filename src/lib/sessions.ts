export type FocusArea = "AI" | "Blockchain" | "Infrastructure";

export type Session = {
  id: string;
  code: string;
  title: string;
  track: string;
  tags: string[];
  focusArea: FocusArea;
  start: string;
  end: string;
  room: string;
  speakers: string[];
  summary: string;
};

export const sessions: Session[] = [
  {
    id: "brk2-107",
    code: "BRK2-107",
    title: "Agentic Systems: From Orchestration to Autonomy",
    track: "AI",
    focusArea: "AI",
    tags: ["agentic", "planning", "safety"],
    start: "Apr 17 · 10:30",
    end: "Apr 17 · 11:30",
    room: "Caesars Forum · Summit 215",
    speakers: ["Christopher Snook", "Google Cloud AI"],
    summary:
      "A deep dive on BRK2-107 with live patterns for planner/executor loops, guardrails, and evals at scale.",
  },
  {
    id: "aix-220",
    code: "AIX-220",
    title: "Multi-Agent DAGs for Critical Infrastructure",
    track: "AI",
    focusArea: "AI",
    tags: ["multi-agent", "infra", "resilience"],
    start: "Apr 17 · 14:00",
    end: "Apr 17 · 15:00",
    room: "Venetian · Toscana 3601",
    speakers: ["Christopher Snook", "SRE Guild"],
    summary:
      "Designing resilient, self-healing orchestrations for cloud and edge footprints with safety interlocks.",
  },
  {
    id: "brk3-411",
    code: "BRK3-411",
    title: "Realtime Safeguards for Agentic Chains",
    track: "AI",
    focusArea: "AI",
    tags: ["evals", "red teaming", "policy"],
    start: "Apr 18 · 09:00",
    end: "Apr 18 · 10:00",
    room: "Caesars Forum · Octavius 14",
    speakers: ["Policy Lab"],
    summary:
      "Live red-teaming of agentic pipelines with streaming policy enforcement and rollback mechanics.",
  },
  {
    id: "web3-101",
    code: "WEB3-101",
    title: "Ledger-Native Architectures for Enterprises",
    track: "Web3",
    focusArea: "Blockchain",
    tags: ["ledger", "tokenomics", "compliance"],
    start: "Apr 17 · 16:00",
    end: "Apr 17 · 17:00",
    room: "Venetian · Bellini 2001",
    speakers: ["World Tokenomic Forum"],
    summary:
      "Patterns for compliant token rails, custody, and treasury ops for Fortune 500 deployments.",
  },
  {
    id: "defi-204",
    code: "DEFI-204",
    title: "Programmable Incentives: Tokenomics as Control Layer",
    track: "Web3",
    focusArea: "Blockchain",
    tags: ["incentives", "staking", "governance"],
    start: "Apr 18 · 11:30",
    end: "Apr 18 · 12:30",
    room: "Caesars Forum · Summit 222",
    speakers: ["Christopher Snook", "LedgerX"],
    summary:
      "How incentive gradients steer network behavior; treasury simulations and risk envelopes for production.",
  },
  {
    id: "erc-legacy",
    code: "TBIS-LEGACY",
    title: "ERC20 Pioneer Retrospective: TBIS and Beyond",
    track: "Web3",
    focusArea: "Blockchain",
    tags: ["erc20", "pioneer", "history"],
    start: "Apr 19 · 13:00",
    end: "Apr 19 · 14:00",
    room: "Wynn · Petrus 3",
    speakers: ["Christopher Snook"],
    summary:
      "Lessons from the original ERC20 wave, TBIS legacy, and what modular token rails unlock next.",
  },
  {
    id: "infra-310",
    code: "INFRA-310",
    title: "Zero-Downtime Mesh for Hybrid Edge",
    track: "Infrastructure",
    focusArea: "Infrastructure",
    tags: ["mesh", "hybrid", "latency"],
    start: "Apr 17 · 15:30",
    end: "Apr 17 · 16:30",
    room: "Caesars Forum · Octavius 18",
    speakers: ["NetOps Guild"],
    summary:
      "Designing latency-aware service meshes spanning on-prem and cloud with graceful degradation paths.",
  },
  {
    id: "gvp-ops",
    code: "GVP-OPS",
    title: "The Geotab Vibe: Fleet Telemetry at Scale",
    track: "Infrastructure",
    focusArea: "Infrastructure",
    tags: ["geotab", "telemetry", "slo"],
    start: "Apr 18 · 10:30",
    end: "Apr 18 · 11:30",
    room: "Venetian · Lando 4202",
    speakers: ["Geotab Engineering"],
    summary:
      "Inside Geotab's telemetry firehose, SLO governance, and the observability spine for connected fleets.",
  },
  {
    id: "geotab-llm",
    code: "GEOTAB-AI",
    title: "Applied Agentic Ops for Mobility",
    track: "AI",
    focusArea: "AI",
    tags: ["geotab", "agentic", "ops"],
    start: "Apr 18 · 15:00",
    end: "Apr 18 · 16:00",
    room: "Caesars Forum · Summit 219",
    speakers: ["Geotab Labs"],
    summary:
      "Agentic playbooks for fleet routing, anomaly response, and live-driver coaching with human-in-the-loop.",
  },
  {
    id: "infra-ops",
    code: "OPS-219",
    title: "SRE for Mission-Critical AI",
    track: "Infrastructure",
    focusArea: "Infrastructure",
    tags: ["sre", "ai", "resilience"],
    start: "Apr 19 · 09:30",
    end: "Apr 19 · 10:30",
    room: "Venetian · Murano 3205",
    speakers: ["SRE Guild", "Christopher Snook"],
    summary:
      "Runbooks, chaos drills, and observability contracts tailored for agentic production systems.",
  },
  {
    id: "block-risk",
    code: "LEDGER-305",
    title: "Ledger Risk Radar",
    track: "Web3",
    focusArea: "Blockchain",
    tags: ["risk", "custody", "ops"],
    start: "Apr 20 · 11:00",
    end: "Apr 20 · 12:00",
    room: "Wynn · Latour 2",
    speakers: ["Custody Alliance"],
    summary:
      "Operational risk playbooks for ledgers: key ceremonies, custody tiers, and response to protocol shocks.",
  },
  {
    id: "edge-ai",
    code: "EDGE-AI",
    title: "Edge AI Pipelines with On-Device Guardrails",
    track: "AI",
    focusArea: "AI",
    tags: ["edge", "guardrails", "privacy"],
    start: "Apr 20 · 13:30",
    end: "Apr 20 · 14:30",
    room: "Caesars Forum · Summit 207",
    speakers: ["Edge AI"],
    summary:
      "Building on-device agent loops with privacy budgets, streaming evals, and constrained tool access.",
  },
  {
    id: "ai-sec",
    code: "AI-SEC",
    title: "Security Boundaries for Agentic Stacks",
    track: "AI",
    focusArea: "AI",
    tags: ["security", "pki", "segmentation"],
    start: "Apr 20 · 15:00",
    end: "Apr 20 · 16:00",
    room: "Venetian · Zeno 4703",
    speakers: ["Blue Team"],
    summary:
      "PKI, workload identity, and network blast-radius design for tool-using LLM systems.",
  },
  {
    id: "chain-interop",
    code: "CHAIN-220",
    title: "Interoperable Ledgers and Cross-Domain Identity",
    track: "Web3",
    focusArea: "Blockchain",
    tags: ["interop", "identity", "zk"],
    start: "Apr 19 · 16:00",
    end: "Apr 19 · 17:00",
    room: "Caesars Forum · Summit 201",
    speakers: ["Identity Guild"],
    summary:
      "Bridging chains with zk-based credentials, minimizing MEV, and maintaining compliance envelopes.",
  },
  {
    id: "infra-mesh",
    code: "MESH-404",
    title: "Cross-Cloud Mesh Reliability Drills",
    track: "Infrastructure",
    focusArea: "Infrastructure",
    tags: ["cross-cloud", "resilience", "traffic"],
    start: "Apr 20 · 10:00",
    end: "Apr 20 · 11:00",
    room: "Venetian · Lando 4306",
    speakers: ["Traffic Ops"],
    summary:
      "Load-shed patterns, brownout strategies, and failure domains for multi-cloud service meshes.",
  },
  {
    id: "geotab-ledger",
    code: "GEO-LEDGER",
    title: "Geotab Ledger for Mobility Commerce",
    track: "Web3",
    focusArea: "Blockchain",
    tags: ["geotab", "mobility", "tokens"],
    start: "Apr 17 · 12:30",
    end: "Apr 17 · 13:30",
    room: "Venetian · Marcello 4405",
    speakers: ["Geotab Labs"],
    summary:
      "Tokenized tolling, settlements, and microservices for fleet commerce on a compliant ledger.",
  },
];

export const presetFilters: Record<
  string,
  { label: string; codes?: string[]; tags?: string[] }
> = {
  agentic: {
    label: "Agentic Systems",
    codes: ["BRK2-107", "AIX-220", "BRK3-411", "AI-SEC", "EDGE-AI"],
    tags: ["agentic", "evals", "planning"],
  },
  blockchain: {
    label: "Blockchain / Tokenomics",
    codes: ["WEB3-101", "DEFI-204", "TBIS-LEGACY", "LEDGER-305", "CHAIN-220", "GEO-LEDGER"],
    tags: ["ledger", "tokenomics", "erc20"],
  },
  geotab: {
    label: "The Geotab Vibe",
    codes: ["GVP-OPS", "GEOTAB-AI", "GEO-LEDGER"],
    tags: ["geotab"],
  },
};
