"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const PHRASES = [
  "Querying Geotab telemetry...",
  "Analyze fleet anomaly response...",
  "Execute tokenomic settlement...",
  "Locate Snook in the Venetian...",
];

export function AgenticCommand({ value, onChange }: Props) {
  const [placeholder, setPlaceholder] = useState("");
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = PHRASES[phraseIndex.current];
      setPlaceholder(current.slice(0, charIndex.current));
      charIndex.current += 1;
      if (charIndex.current > current.length) {
        setTimeout(() => {
          charIndex.current = 0;
          phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
        }, 1400);
      }
    }, 95);
    return () => clearInterval(interval);
  }, []);

  const cursorClass = useMemo(
    () => (value ? "bg-emerald-400" : "bg-purple-500"),
    [value]
  );

  return (
    <div className="relative group w-full">
      <div className="absolute -inset-0.5 rounded-xl bg-purple-600/30 blur transition duration-500 group-hover:opacity-80" />
      <div className="relative flex items-center gap-2 rounded-xl border border-purple-500/40 bg-black/60 px-4 py-3 font-mono shadow-[0_0_25px_rgba(168,85,247,0.35)]">
        <span className="text-purple-300">&gt;</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-purple-50 placeholder-purple-900 outline-none"
        />
        <div className={`h-4 w-1 animate-pulse ${cursorClass}`} />
      </div>
    </div>
  );
}
