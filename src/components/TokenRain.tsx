"use client";

import { useEffect, useRef } from "react";

type Props = {
  count?: number;
  speed?: number;
};

export function TokenRain({ count = 24, speed = 0.6 }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const tokens = Array.from({ length: count }, (_, i) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("r", `${8 + Math.random() * 10}`);
      circle.setAttribute("fill", "url(#tokenGradient)");
      circle.setAttribute("opacity", "0.75");
      g.appendChild(circle);
      svg.appendChild(g);

      const startX = Math.random() * 100;
      const startY = -20 - Math.random() * 60;
      const drift = -10 + Math.random() * 20;
      const duration = 18 + Math.random() * 14;
      const delay = -(Math.random() * duration);

      const animate = () => {
        const now = performance.now() / 1000;
        const y = ((now * speed * 40 + delay * 40) % 160) - 20 + startY;
        const x = startX + Math.sin(now * 0.6 + i) * 6 + drift;
        g.setAttribute("transform", `translate(${x} ${y})`);
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      return g;
    });

    return () => {
      tokens.forEach((g) => g.remove());
    };
  }, [count, speed]);

  return (
    <svg
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full token-fade"
      viewBox="0 0 100 140"
      aria-hidden
    >
      <defs>
        <radialGradient id="tokenGradient" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f7c948" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#a855f7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
        </radialGradient>
      </defs>
    </svg>
  );
}
