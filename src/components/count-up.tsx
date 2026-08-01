"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CountUpProps = {
  to: number;
  duration?: number;
};

/**
 * Counts a statistic up once it is on screen. Motivated by hierarchy: the
 * numeral is the point of its card, and the movement is what sends the eye
 * there first. Fires once.
 *
 * Reduced motion renders the final value directly rather than setting it from
 * the effect, so there is no throwaway render at zero and no state write on
 * mount.
 */
export function CountUp({ to, duration = 1.1 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  // Seeded with the real figure, not 0. It is what server-renders, what a
  // no-JS reader sees, and what survives if the animation never runs, so the
  // worst case is a correct static number rather than a permanent "0".
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? to : value}
    </span>
  );
}
