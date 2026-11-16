"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { REGISTER_URL } from "@/lib/site";

type RegisterLinkProps = {
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
};

export function RegisterLink({ children, className, magnetic = false }: RegisterLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [shift, setShift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const active = magnetic && fine && !reduce;

  return (
    <a
      ref={ref}
      href={REGISTER_URL}
      className={className}
      style={{
        transform: `translate3d(${shift.x}px, ${shift.y}px, 0)`,
        transition: active ? "transform 90ms linear" : "transform 280ms ease",
      }}
      onMouseMove={(event) => {
        if (!active || !ref.current) return;
        const box = ref.current.getBoundingClientRect();
        const x = event.clientX - (box.left + box.width / 2);
        const y = event.clientY - (box.top + box.height / 2);
        setShift({ x: x * 0.22, y: y * 0.32 });
      }}
      onMouseEnter={() => {
        document.documentElement.dataset.ctaHover = "1";
      }}
      onMouseLeave={() => {
        setShift({ x: 0, y: 0 });
        delete document.documentElement.dataset.ctaHover;
      }}
    >
      {children}
    </a>
  );
}
