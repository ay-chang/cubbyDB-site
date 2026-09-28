"use client";

import { Fragment, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Word = { text: string; italic?: boolean };

/**
 * The hero headline, word by word: each rises a little and sharpens out of a
 * blur. Plays on mount rather than on scroll — the hero is already in view.
 *
 * The animated words are aria-hidden and a single sr-only copy carries the
 * accessible name, so a screen reader hears the sentence rather than a word
 * at a time. Reduced motion keeps a plain fade.
 */
export function HeroHeadline({ words, className }: { words: Word[]; className?: string }) {
  const reduce = useReducedMotion();
  const label = words.map((w) => w.text).join(" ");

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="shown"
      transition={{ staggerChildren: 0.06, delayChildren: 0.1 }}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word.text}-${i}`}>
            <motion.span
              className={`inline-block ${word.italic ? "italic" : ""}`}
              variants={
                reduce
                  ? {
                      hidden: { opacity: 0 },
                      shown: { opacity: 1, transition: { duration: 0.4 } },
                    }
                  : {
                      hidden: { opacity: 0, y: "0.28em", filter: "blur(10px)" },
                      shown: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.9, ease: EASE },
                      },
                    }
              }
            >
              {word.text}
            </motion.span>
            {/* Real breakable space so the headline still wraps normally. */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </motion.h1>
  );
}

type RiseProps = {
  children: ReactNode;
  /** Seconds after page load. */
  delay?: number;
  /** How far it travels, in px. The product shot uses a longer rise. */
  distance?: number;
  className?: string;
};

/** Fades a block up into place on mount. Used for everything under the headline. */
export function Rise({ children, delay = 0, distance = 14, className }: RiseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: distance }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.4 : 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
