"use client";

import { useEffect, useMemo, useState } from "react";
import { presetFilters, Session } from "@/lib/sessions";
import { staticSessions } from "@/lib/staticSessions";
import { TokenRain } from "@/components/TokenRain";
import { AgenticCommand } from "@/components/AgenticCommand";
import {
  geminiItinerary,
  geminiDays,
  geminiExperiences,
  geminiPoker,
  geminiSessions,
  geminiCountdowns,
} from "@/content/geminiHighlights";

type RemoteSession = {
  id?: string;
  session_id?: string;
  title?: string;
  topic?: string;
  tags?: string[];
  location?: string;
  start?: string;
  end?: string;
  date_time?: string;
  speakers?: { name?: string }[] | string[];
  description?: string;
};

type PublicFeed = {
  sessions?: Session[];
};

function applyFilters(data: Session[], filterKey: string | null, query: string) {
  const preset = filterKey ? presetFilters[filterKey] : null;
  return data.filter((s) => {
    const matchesPreset = preset
      ? (preset.codes?.includes(s.code) ?? false) ||
        (preset.tags?.some((t) => s.tags.includes(t)) ?? false)
      : true;
    const q = query.trim().toLowerCase();
    const matchesQuery = q
      ? s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      : true;
    return matchesPreset && matchesQuery;
  });
}

export default function Home() {
  const privateConsoleUrl = process.env.NEXT_PUBLIC_PRIVATE_CONSOLE_URL;
  const [activeFilter, setActiveFilter] = useState<string | null>("agentic");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Session[]>(staticSessions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSessions() {
      const shape = (items: RemoteSession[]) =>
        items
          .filter((item) => item?.title)
          .map((item, idx) => {
            const track = item.topic || "AI";
            const focusArea: Session["focusArea"] = /block|ledger|web3/i.test(track)
              ? "Blockchain"
              : /infra|ops|network/i.test(track)
                ? "Infrastructure"
                : "AI";
            return {
              id: item.id || `sess-${idx}`,
              code: item.session_id || item.id || `S-${idx}`,
              title: item.title || "Untitled session",
              track,
              focusArea,
              tags: [
                item.topic,
                ...(item.tags ?? []),
                ...(item.location ? [item.location] : []),
              ].filter(Boolean) as string[],
              start: item.start || item.date_time || "",
              end: item.end || "",
              room: item.location || "TBD",
              speakers: (item.speakers || []).map((s) =>
                typeof s === "string" ? s : s.name || "Speaker"
              ),
              summary: item.description || "No abstract provided.",
            } satisfies Session;
          });

      try {
        // Prefer published public feed if provided
        if (process.env.NEXT_PUBLIC_PUBLIC_FEED_URL) {
          const pubRes = await fetch(process.env.NEXT_PUBLIC_PUBLIC_FEED_URL);
          if (pubRes.ok) {
            const feed = (await pubRes.json()) as PublicFeed;
            if (feed.sessions?.length) {
              setData(feed.sessions);
              return;
            }
          }
        }
        const res = await fetch(
          "https://fhoffa.github.io/google-cloud-next-2026-unofficial-scrape/data.json"
        );
        if (!res.ok) throw new Error("Failed to fetch sessions");
        const raw = await res.json();
        setData(shape(raw as RemoteSession[]));
      } catch (e) {
        try {
          const localUrl = new URL("./data.json", window.location.href).toString();
          const localRes = await fetch(localUrl);
          if (!localRes.ok) throw new Error("Local cache unavailable");
          const localRaw = await localRes.json();
          setData(shape(localRaw as RemoteSession[]));
          setError((e as Error).message + " (using local cache)");
        } catch (localErr) {
          setError((e as Error).message + `; local cache failed: ${(localErr as Error).message}`);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, []);

  const filtered = useMemo(
    () => applyFilters(data, activeFilter, search),
    [data, activeFilter, search]
  );

  const visible = filtered.length ? filtered : data;

  const liveNowIds = useMemo(() => new Set(visible.slice(0, 2).map((s) => s.id)), [visible]);

  const countdowns = useMemo(() => {
    const tripStart = new Date("2026-04-17T00:00:00-07:00").getTime();
    const now = Date.now();
    return geminiCountdowns
      .map((ev) => {
        const ts = new Date(ev.when).getTime();
        const deltaMs = ts - now;
        const deltaHours = Math.max(0, Math.floor(deltaMs / (1000 * 60 * 60)));
        const deltaDays = Math.floor(deltaHours / 24);
        const remHours = deltaHours % 24;
        const spanMs = Math.max(1, ts - tripStart);
        const progress = Math.min(1, Math.max(0, 1 - deltaMs / spanMs));
        return { ...ev, deltaMs, label: `${deltaDays}d ${remHours}h`, progress };
      })
      .sort((a, b) => a.deltaMs - b.deltaMs)
      .filter((ev) => ev.deltaMs > 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <div className="absolute inset-0 card-grid-bg opacity-50" aria-hidden />
      <TokenRain count={32} speed={0.55} />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-amber-300 shadow-[0_0_20px_rgba(168,85,247,0.55)]" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200">The Agentic Architect</p>
                <h1 className="text-xl font-semibold text-white">Christopher M. Snook</h1>
              </div>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 shadow-[0_0_18px_rgba(56,189,248,0.35)] md:flex">
              <span className="text-emerald-300">●</span> Cyberpunk High-Stakes Mode
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-2 text-xs text-purple-100 shadow-[0_0_16px_rgba(168,85,247,0.45)] md:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Wallet Connected: 0xSN00K · Ledger Sync: OK
            </div>
            {privateConsoleUrl && (
              <a
                href={privateConsoleUrl}
                className="hidden items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100 shadow-[0_0_16px_rgba(56,189,248,0.45)] md:flex"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" /> Private Console
              </a>
            )}
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8 lg:grid lg:grid-cols-[320px_1fr] lg:gap-8">
          <aside className="glass-panel relative rounded-2xl p-6">
            <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs text-amber-200">
              Founder & Architect
            </div>
            <h2 className="text-lg font-semibold text-white">Christopher M. Snook</h2>
            <p className="mt-2 text-sm text-white/70">
              3x #1 Bestselling Author · Chairman of World Tokenomic Forum · ERC20 Pioneer (TBIS Legacy)
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Agentic Systems strategist
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400" /> Blockchain & Tokenomics architect
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300" /> Infrastructure realism & scale
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-amber-200">Homewood Suites</p>
                <p className="font-semibold text-white">Conf: 80545966</p>
                <p className="text-[11px] text-white/60">Status: Confirmed</p>
              </div>
              <div className="rounded-lg border border-purple-500/60 bg-gradient-to-br from-purple-900/50 to-amber-900/40 px-3 py-2 shadow-[0_0_18px_rgba(168,85,247,0.35)]">
                <p className="text-cyan-200">Shift to Luxor</p>
                <p className="font-semibold text-white">April 21</p>
                <p className="text-[11px] text-emerald-200">Status: Scheduled</p>
              </div>
            </div>
            <div className="mt-5 space-y-2 text-xs text-white/70">
              <p className="text-amber-200">Itinerary Sync</p>
              <p>{geminiItinerary.arrival}</p>
              <p>{geminiItinerary.hotel}</p>
              <p>{geminiItinerary.shift}</p>
            </div>
          </aside>

          <section className="relative flex flex-col gap-5">
            <div className="glass-panel rounded-2xl p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Snook&apos;s Immersion</p>
                  <h3 className="text-2xl font-semibold text-white">Curated Sessions</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(presetFilters).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        activeFilter === key
                          ? "bg-gradient-to-r from-purple-500 to-amber-300 text-black shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                          : "border border-white/10 bg-white/5 text-white/80 hover:border-purple-400/60"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                <AgenticCommand value={search} onChange={setSearch} />
                {activeFilter && (
                  <button
                    onClick={() => setActiveFilter(null)}
                    className="text-sm text-amber-200 underline decoration-amber-200/60 underline-offset-4"
                  >
                    Clear preset
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {loading && (
                <div className="col-span-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  [SYSTEM NOTICE]: Syncing external uplink...
                </div>
              )}
              {!loading && error && (
                <div className="col-span-full rounded-xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-100">
                  Direct uplink interrupted; displaying cached intelligence. Integrity: 99.8%. ({error})
                </div>
              )}
              {visible.map((session) => (
                <article
                  key={session.id}
                  className="neon-border card-glitch-hover relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-[1px]"
                >
                  <div className="glass-panel relative h-full rounded-[15px] p-4">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-amber-200">
                        {session.code}
                      </span>
                      {liveNowIds.has(session.id) && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] uppercase tracking-wide text-emerald-200">
                          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-300" />
                          Live Pulse
                        </span>
                      )}
                      <span
                        className="rounded-full px-3 py-1 text-[11px] uppercase tracking-wide"
                        style={{
                          background:
                            session.focusArea === "AI"
                              ? "rgba(168,85,247,0.2)"
                              : session.focusArea === "Blockchain"
                                ? "rgba(247,201,72,0.2)"
                                : "rgba(56,189,248,0.2)",
                          color:
                            session.focusArea === "AI"
                              ? "#e9d5ff"
                              : session.focusArea === "Blockchain"
                                ? "#fef3c7"
                                : "#cffafe",
                          borderColor:
                            session.focusArea === "AI"
                              ? "rgba(168,85,247,0.6)"
                              : session.focusArea === "Blockchain"
                                ? "rgba(247,201,72,0.6)"
                                : "rgba(56,189,248,0.6)",
                        }}
                      >
                        {session.focusArea}
                      </span>
                    </div>
                    <h4 className="mt-3 text-lg font-semibold text-white">{session.title}</h4>
                    <p className="mt-2 text-sm text-white/70 line-clamp-3">{session.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{session.start}</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{session.room}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {session.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-purple-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <section className="mx-auto mb-6 w-full max-w-6xl grid gap-4 px-6 lg:grid-cols-3">
          <div className="glass-panel rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Countdowns</p>
              <span className="text-xs text-white/60">Gemini feed</span>
            </div>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              {countdowns.map((ev) => (
                <div
                  key={ev.title}
                  title={`${ev.title} • ${new Date(ev.when).toLocaleString()}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{ev.title}</p>
                      <p className="text-amber-200 text-xs">{ev.location ?? ""}</p>
                    </div>
                    <span className="rounded-full bg-amber-300/20 px-2 py-1 text-[11px] text-amber-100">
                      {ev.label}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-amber-300"
                      style={{ width: `${Math.round(ev.progress * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Itinerary</p>
              <span className="text-xs text-white/60">Gemini feed</span>
            </div>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              {geminiDays.map((d) => (
                <div key={d.day} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <p className="text-white font-medium">{d.day}</p>
                  <p className="text-amber-200 text-xs">{d.focus}</p>
                  <ul className="mt-1 space-y-1 text-xs text-white/70">
                    {d.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Immersions</p>
              <span className="text-xs text-white/60">Gemini feed</span>
            </div>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              {geminiExperiences.map((exp) => (
                <div
                  key={exp.title}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  <p className="text-white font-medium">{exp.title}</p>
                  <p className="text-amber-200 text-xs">{exp.vibe}</p>
                  <p className="text-white/70 text-xs">{exp.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Poker Overlap</p>
              <span className="text-xs text-white/60">Gemini feed</span>
            </div>
            <div className="mt-3 space-y-3 text-sm text-white/80">
              {geminiPoker.series.map((s) => (
                <div key={s.name} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <p className="text-white font-medium">{s.name}</p>
                  <p className="text-amber-200 text-xs">{s.window}</p>
                  <ul className="mt-1 space-y-1 text-xs text-white/70">
                    {s.highlights.map((h) => (
                      <li key={h}>• {h}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-white/60">{s.reg}</p>
                </div>
              ))}
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-white font-medium">Rooms</p>
                <ul className="mt-1 space-y-1 text-xs text-white/70">
                  {geminiPoker.rooms.map((r) => (
                    <li key={r.name}>
                      <span className="text-amber-200">{r.name}:</span> {r.vibe} — {r.tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Key Sessions</p>
              <span className="text-xs text-white/60">Gemini feed</span>
            </div>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              {geminiSessions.map((s) => (
                <div key={s.title} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <p className="text-white font-medium">{s.title}</p>
                  <p className="text-amber-200 text-xs">{s.when}</p>
                  <p className="text-white/70 text-xs">{s.vibe}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="fixed bottom-6 right-6 z-30 w-80 glass-panel rounded-2xl p-4 shadow-[0_0_30px_rgba(247,201,72,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Off-Chain Operations</p>
              <h4 className="text-lg font-semibold text-white">Wynn + Venetian</h4>
            </div>
            <span className="rounded-full bg-amber-300/20 px-3 py-1 text-xs text-amber-100">Apr 17–20</span>
          </div>
          <div className="mt-3 space-y-2 text-sm text-white/80">
            <div className="rounded-lg border border-amber-400/50 bg-amber-500/10 px-3 py-2">
              <div className="flex items-center justify-between">
                <p>Wynn Signature Series — $600 NLH</p>
                <span className="rounded-full bg-amber-300/20 px-2 py-1 text-[11px] text-amber-100">Stakes: Med</span>
              </div>
              <p className="text-xs text-white/60">Apr 18 12:00</p>
            </div>
            <div className="rounded-lg border border-purple-400/40 bg-purple-500/10 px-3 py-2">
              <div className="flex items-center justify-between">
                <p>Venetian DeepStack — $800 NLH</p>
                <span className="rounded-full bg-purple-300/20 px-2 py-1 text-[11px] text-purple-100">Stakes: High</span>
              </div>
              <p className="text-xs text-white/60">Apr 19 11:00</p>
            </div>
            <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2">
              <div className="flex items-center justify-between">
                <p>Venetian Mystery Bounty — $400</p>
                <span className="rounded-full bg-emerald-300/20 px-2 py-1 text-[11px] text-emerald-100">Stakes: Wild</span>
              </div>
              <p className="text-xs text-white/60">Apr 20 14:00</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
