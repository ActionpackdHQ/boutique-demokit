"use client";

import { useEffect, useState } from "react";

import { EVENT_INSTANT } from "@/lib/site";

const TARGET = new Date(EVENT_INSTANT).getTime();

function parts(remaining: number) {
  const total = Math.max(0, Math.floor(remaining / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [
    ["Days", days],
    ["Hours", hours],
    ["Minutes", minutes],
    ["Seconds", seconds],
  ] as const;
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = now === null ? null : TARGET - now;
  const cells = remaining === null ? parts(0) : parts(remaining);

  return (
    <div className="countdown" aria-live="polite">
      <p className="countdown-label">Until Sunday, 29 November 2026</p>
      <ol>
        {cells.map(([label, value]) => (
          <li key={label}>
            <span>{now === null ? "00" : String(value).padStart(2, "0")}</span>
            <small>{label}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
