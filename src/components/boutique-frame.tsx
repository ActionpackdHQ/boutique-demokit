"use client";

import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { AAVARNA_DEMO } from "@/lib/site";
import { cn } from "@/lib/utils";

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
    <div ref={host} className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10">
      {!shouldLoad && (
        <div className="flex min-h-56 flex-col items-start justify-center gap-3 p-4">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            The Aavarna preview stays unloaded until you reach it, so the rest of this page opens
            quickly.
          </p>
          <button
            type="button"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-2xl px-4 text-base font-semibold",
            )}
            onClick={() => setShouldLoad(true)}
          >
            Show the boutique here
          </button>
        </div>
      )}
      {shouldLoad && (
        <div className="relative h-[70vh] min-h-[28rem] bg-background">
          {status === "loading" && (
            <p className="absolute inset-x-0 top-4 z-10 text-center text-sm text-muted-foreground">
              Loading the Aavarna boutique demo…
            </p>
          )}
          <iframe
            title="Aavarna boutique demo"
            src={AAVARNA_DEMO}
            className="h-full w-full border-0"
            loading="lazy"
            onLoad={() => setStatus("ready")}
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
      <p className="border-t border-foreground/10 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        If the preview does not load, use Try it yourself to open Aavarna in a new tab.
      </p>
    </div>
  );
}
