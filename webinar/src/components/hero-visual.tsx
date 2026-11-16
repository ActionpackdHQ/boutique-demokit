"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BotCanvas = dynamic(() => import("./bot-canvas"), { ssr: false });

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowMemory = typeof memory === "number" && memory > 0 && memory <= 2;
    if (!reduce && desktop && !connection?.saveData && !lowMemory && webglAvailable()) {
      setLive(true);
    }
  }, []);

  return (
    <div className="hero-stage" data-ready={ready ? "true" : "false"} aria-hidden="true">
      <div className="orb-fallback" />
      {live ? <BotCanvas onReady={() => setReady(true)} /> : null}
    </div>
  );
}
