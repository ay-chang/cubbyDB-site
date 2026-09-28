"use client";

import { useEffect, useRef } from "react";

/** How far outside the viewport still counts as "coming up", in px. */
const MARGIN = 300;

type DemoVideoProps = {
  src: string;
  /** Described for screen readers; the recording carries no audio. */
  label: string;
  aspectRatio?: string;
};

/**
 * A muted, looping screen recording in place of the design's placeholder plate.
 *
 * Nothing is fetched until the plate is near the viewport: the element renders
 * with no `src` at all, and the source is attached imperatively on first
 * intersection. A plain autoplay video starts downloading during page load,
 * competing with the hero image over a section most visitors have not reached.
 *
 * Playback then tracks two things rather than firing once:
 *   - intersection, so it pauses while scrolled away instead of decoding
 *     frames nobody is looking at;
 *   - document visibility, because a browser suspends media in a hidden tab
 *     and a one-shot play() would simply never resume afterwards.
 *
 * `muted` and `playsInline` are what make autoplay permitted at all — without
 * both, iOS Safari and Chrome's autoplay policy refuse to start it.
 *
 * The source is attached to the DOM node directly rather than through state:
 * it sidesteps the ordering problem where play() runs before React has
 * committed the src, and this component never needs to re-render.
 */
export function DemoVideo({ src, label, aspectRatio = "16 / 9" }: DemoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Derived from the live rect rather than cached from the observer. A
    // cached flag goes stale: the observer may not run while the tab is
    // hidden, so on returning to a visible tab the element can be on screen
    // while the last remembered value still says it is not.
    const nearViewport = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > -MARGIN && r.top < window.innerHeight + MARGIN;
    };

    const sync = () => {
      if (!nearViewport() || document.visibilityState !== "visible") {
        el.pause();
        return;
      }
      if (!el.src) el.src = src;
      // Rejects if the autoplay policy declines or the element goes away
      // mid-call; unhandled it would log on every load.
      el.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      () => {
        sync();
      },
      // Begin fetching slightly before it scrolls in, so it is ready to play
      // by the time the plate is actually on screen.
      { rootMargin: `${MARGIN}px 0px` },
    );

    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="block w-full rounded-[20px] border border-[rgba(27,31,38,0.1)] bg-white object-cover"
      style={{ aspectRatio }}
    />
  );
}
