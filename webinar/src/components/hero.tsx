"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Countdown } from "@/components/countdown";
import { HeroVisual } from "@/components/hero-visual";
import { RegisterLink } from "@/components/register-link";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>
            <span className="kicker">Dream it. Bot it.</span>
            <span className="display">
              Live<span className="stop">.</span>
            </span>
          </h1>
          <p className="lede">
            One Sunday. One idea.
            <br />
            Your first bot.
          </p>
        </div>
        <motion.div className="hero-visual" style={{ y }}>
          <HeroVisual />
        </motion.div>
        <div className="hero-action">
          <p className="meta">
            <span>Sunday, 29 November 2026</span>
            <span aria-hidden="true">·</span>
            <span>Live online</span>
            <span aria-hidden="true">·</span>
            <span>₹99</span>
            <span aria-hidden="true">·</span>
            <span>2 hours</span>
          </p>
          <p className="soon">Time announced soon</p>
          <Countdown />
          <RegisterLink className="btn" magnetic>
            Register
          </RegisterLink>
        </div>
      </div>
    </section>
  );
}
