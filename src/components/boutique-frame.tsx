"use client";

import { useEffect, useRef, useState } from "react";

import { AAVARNA_DEMO } from "@/lib/site";

export function BoutiqueFrame() {
  const host = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [status, setStatus] = useState<"waiting" | "loading" | "ready">("waiting");

  useEffect(() => {
    const node = host.current;
    if (!node || shouldLoad) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    setStatus("loading");
    const timer = window.setTimeout(() => setStatus("ready"), 8000);
    return () => window.clearTimeout(timer);
  }, [shouldLoad]);

  return (
    <div ref={host} className="frame">
      {!shouldLoad && (
        <div className="frame-hold">
          <p>The Aavarna preview stays unloaded until you reach it, so this page opens quickly.</p>
          <button type="button" className="btn btn-g" onClick={() => setShouldLoad(true)}>
            Show the boutique here
          </button>
        </div>
      )}
      {shouldLoad && (
        <div className="frame-view">
          {status === "loading" && <p className="frame-status">Loading the Aavarna boutique demo…</p>}
          <iframe
            title="Aavarna boutique demo"
            src={AAVARNA_DEMO}
            loading="lazy"
            onLoad={() => setStatus("ready")}
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
      <p className="muted">
        If the preview does not load, open{" "}
        <a href={AAVARNA_DEMO}>Aavarna</a>.
      </p>
    </div>
  );
}
