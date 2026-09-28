"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Index within a group; siblings stagger by 90ms each. */
  index?: number;
  /** Extra seconds before starting, on top of the stagger. */
  delay?: number;
  /**
   * "up" rises and sharpens out of a blur — text and small blocks.
   * "scale" also grows in from slightly smaller — media frames and cards.
   */
  variant?: "up" | "scale";
  className?: string;
  as?: "div" | "li" | "section";
};

const EASE = [0.16, 1, 0.3, 1] as const;

const FROM = {
  up: { opacity: 0, y: 28, filter: "blur(6px)" },
  scale: { opacity: 0, y: 48, scale: 0.96, filter: "blur(8px)" },
};

/**
 * Scroll-entry reveal. Plays once, the first time the block is a little way
 * into the viewport — the negative bottom margin holds it back until it's
 * properly on screen, so the motion is actually seen rather than finishing
 * just below the fold.
 *
 * Reduced motion keeps the opacity fade and drops movement and blur.
 */
export function Reveal({
  children,
  index = 0,
  delay = 0,
  variant = "up",
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduce ? { opacity: 0 } : FROM[variant]}
      whileInView={
        reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: reduce ? 0.4 : variant === "scale" ? 1.1 : 0.85,
        delay: delay + index * 0.09,
        ease: EASE,
      }}
    >
      {children}
    </Component>
  );
}
