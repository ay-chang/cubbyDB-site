"use client";

import { useEffect, useRef } from "react";

/**
 * Fraction of a viewport of scroll the colour ramp runs over. This is the
 * duration knob: it is geometric, so it slows the flip and the flip back by
 * the same amount. Raise it to make the transition longer.
 */
const RAMP = 0.4;

/**
 * Where the ramp begins, as a fraction of the viewport: the last light block's
 * bottom edge at this height above the fold. It can be positive — i.e. the
 * flip starts while that block is still on screen — because chapter 01's tail
 * is inside data-mode-flip and stays legible in either mode. That head start
 * is what lets the runway between the chapters be short.
 */
const START_AT = 0.35;

/**
 * How hard the eased value chases the target each frame. This is feel, not
 * duration — it adds drift so the colour lags the scroll slightly instead of
 * tracking it 1:1. Lower is lazier, but it also lets the backdrop trail
 * further behind on a fast scroll, so it cannot go much below this without
 * chapter 01's dark ink meeting a backdrop that has not finished returning
 * to light.
 */
const DRIFT = 0.12;

function clamp(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * Smootherstep rather than smoothstep. Both ease the ends, but this one is
 * steeper through the middle, and the middle is where chapter 02's text and
 * its background pass through similar mid-tones on their way to swapping.
 * Crossing that band faster keeps the washed-out moment brief without
 * shortening the transition as a whole.
 */
function ease(value: number) {
  return value * value * value * (value * (value * 6 - 15) + 10);
}

/**
 * The light→dark transition: a fixed colour layer behind the whole page,
 * plus the mode flip of chapter 02 that rides along with it. Both are CSS
 * expressions over --t; this component's only job is to write that number.
 *
 * Every section is transparent so this is the only background that changes
 * colour. A section painting its own fill would cut in at a fixed scroll
 * position and draw a hard edge; a gradient attached to the section would
 * scroll past as static geometry and not read as a transition at all.
 * Animating one layer behind everything is what makes the page itself appear
 * to change mode.
 *
 * Progress comes from the bounding rect of the last light content block
 * (data-scroll-light-end), not a scroll listener, so it keeps working if the
 * page ever scrolls inside a container. It holds at 0 until that block has
 * risen past START_AT, then ramps to dark over ~40% of a viewport. Scrolling
 * back up runs the whole thing in reverse.
 *
 * Chapter 02 reads the same `--t` and flips with the page rather than being
 * written for dark mode. That is what keeps the runway short. Chapter 02's first content crosses
 * the bottom edge before the light block clears the top, so there is no
 * scroll position where both are off screen; a page that only swapped its
 * backdrop would need a full viewport of blank padding to avoid stranding
 * white text on a light page. A chapter that is legible in both modes needs
 * none of it — it simply arrives in whichever mode the page is currently in.
 */
export function ScrollBackdrop() {
  const currentRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = 0;

    const root = document.documentElement;

    const paint = () => {
      const lightEnd = document.querySelector("[data-scroll-light-end]");

      if (lightEnd) {
        const lightBot = lightEnd.getBoundingClientRect().bottom;
        const vh = window.innerHeight;
        const progress = clamp((vh * START_AT - lightBot) / (vh * RAMP));

        // Reduced motion skips the ramp and snaps at the boundary.
        const target = reduceMotion
          ? progress >= 1
            ? 1
            : 0
          : ease(progress);

        let t = currentRef.current ?? target;
        if (reduceMotion) {
          t = target;
        } else {
          // Symmetric: the ramp is long enough now that the target is
          // already back at 0 well before chapter 01 re-enters the viewport,
          // so the return no longer needs to outrun the forward direction
          // the way it did when the ramp was short.
          t += (target - t) * DRIFT;
          if (Math.abs(target - t) < 0.002) t = target;
        }
        currentRef.current = t;

        // One write, one number. The backdrop's own colour and every colour
        // ramp in chapter 02 are expressed against --t in CSS, so nothing
        // here can leave them in different modes — a script that fails or
        // goes stale leaves the whole page consistently light rather than
        // darkening the page under light-mode text.
        root.style.setProperty("--t", String(t));
      }

      raf = requestAnimationFrame(paint);
    };

    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundColor:
          "color-mix(in srgb, #141820 calc(var(--t) * 100%), #fbfbfc)",
      }}
    />
  );
}
