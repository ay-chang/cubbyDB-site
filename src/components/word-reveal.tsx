"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

type WordRevealProps = {
  text: string;
  /** Seconds before the first word starts, to sit it after a sibling reveal. */
  delay?: number;
  className?: string;
};

/**
 * Reveals a heading word by word, staggered left to right.
 *
 * Two deliberate constraints, both there because the first version of this
 * component made the heading vanish outright:
 *
 * 1. **The observer stays on this outer element**, never on the words. A word
 *    that starts displaced cannot be its own trigger — IntersectionObserver
 *    clips its intersection rect against ancestor overflow and against the
 *    element's own transformed position, so a displaced word can report 0%
 *    visible, never fire, and stay hidden because it is hidden. This wrapper
 *    is in normal flow and never transformed, so it always registers, and the
 *    words follow it by variant name.
 *
 * 2. **No clipping mask.** Rising each word out of an `overflow-hidden` box
 *    looks better, but a clipped word is exactly what created the deadlock
 *    above, and the effect is not worth reintroducing the shape of that bug.
 *    Without it this component fails the way every other `Reveal` on the site
 *    fails — an element left at `opacity: 0` if its observer never fires —
 *    which is a known-good baseline rather than a new failure mode. It is not
 *    a guarantee the text appears: that still rests on point 1.
 */
export function WordReveal({ text, delay = 0, className }: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {/* The animated spans are aria-hidden, so the accessible name comes from
          a single uninterrupted copy rather than from words a screen reader
          would otherwise announce one at a time. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <motion.span
              className="inline-block"
              variants={
                reduce
                  ? {
                      hidden: { opacity: 0 },
                      shown: { opacity: 1, transition: { duration: 0.3 } },
                    }
                  : {
                      hidden: { opacity: 0, y: "0.28em", filter: "blur(10px)" },
                      shown: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
            >
              {word}
            </motion.span>
            {/* A real, breakable text node between the inline-blocks: a
                non-breaking space would stop the heading wrapping mid-line. */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </motion.span>
  );
}
