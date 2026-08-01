"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Index within a group, used to stagger siblings by 50ms each. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Scroll-entry reveal. Motivated by hierarchy: content arrives as you reach it
 * rather than being pre-loaded flat on the page. Fires once, never re-plays.
 *
 * Uses the full `transform` string rather than Motion's `y` shorthand so the
 * animation is hardware-accelerated and holds up while the page is still
 * loading images.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    // Reduced motion keeps the opacity fade (it aids comprehension) and drops
    // every positional change.
    return (
      <Component
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, transform: "translateY(12px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </Component>
  );
}
