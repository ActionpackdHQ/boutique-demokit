"use client";

import { useEffect, useRef } from "react";

export function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        video.preload = "metadata";
        video.load();
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      id="video"
      className="vid"
      controls
      muted
      playsInline
      preload="none"
      poster="/kit/demo-poster.webp"
      width={1080}
      height={1920}
      aria-label="60-second Actionpackd boutique demo"
    >
      <source src="/actionpackd-demo-video.mp4" type="video/mp4" />
    </video>
  );
}
