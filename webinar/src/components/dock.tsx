"use client";

import { useEffect, useState } from "react";

import { RegisterLink } from "@/components/register-link";

export function Dock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const button = document.querySelector(".hero-action .btn");
    if (!button) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div className="dock">
      <span>₹99 · 2 hours</span>
      <RegisterLink className="btn btn-small">Register</RegisterLink>
    </div>
  );
}
