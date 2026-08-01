"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Shot } from "./ui/shot";

/**
 * The product settles into the page as you scroll past the hero: it starts
 * slightly lifted and scaled back, then arrives at rest. Scroll-linked rather
 * than time-based, so it tracks the reader instead of playing at them.
 *
 * Driven by motion values, never React state, so no frame of this re-renders
 * the tree.
 */
export function HeroShot() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Both edges must be valid tokens. "start 0.25" is not one, and an unparsed
  // edge collapses the range so progress never leaves 0.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 1]);

  return (
    <div ref={ref} className="relative z-10 mx-auto mt-16 max-w-[1240px] px-6 md:mt-20">
      <motion.div style={reduce ? undefined : { scale, y, opacity }}>
        <Shot
          src="/shots/app-workspace.png"
          alt="CubbyDB browsing the recipes table: schema tree on the left, a WHERE filter bar above an editable results grid."
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </motion.div>
    </div>
  );
}
