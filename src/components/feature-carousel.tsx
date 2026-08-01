"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";

const SLIDES = [
  {
    title: "Cascading\ndelete preview",
    body: "Delete a row that others reference and CubbyDB walks the dependent tree first, grouped by table, transitively. Confirm and it all goes in one transaction, or none of it does.",
    footnote: "The pattern Django's admin uses",
  },
  {
    title: "Schema-aware\nautocomplete",
    body: "Table names after FROM, column names after an alias, resolved from the query's own JOIN clauses so it knows what the alias points at. Fuzzy, so what you type need not be a prefix.",
    footnote: "Tab accepts, Enter runs",
  },
  {
    title: "Foreign-key\nnavigation",
    body: "Right-click a cell that references another row to jump straight to it. Filter columns are quoted, so the mixed-case names TypeORM and Prisma generate resolve instead of erroring.",
    footnote: "Works in both directions",
  },
  {
    title: "CSV in,\nCSV out",
    body: "Import parses client-side and lands rows in the grid as unsaved drafts, matched to columns by header name. Nothing inserts until you review and commit.",
    footnote: "Export carries a configurable delimiter",
  },
  {
    title: "Cancel\nmid-flight",
    body: "Escape sends a real Postgres cancel request for whatever is running on that connection. Queries on your other open connections are untouched.",
    footnote: "Comes back as SQLSTATE 57014",
  },
];

/**
 * A peek carousel: the active slide sits centre, its neighbours bleed in from
 * either side at reduced opacity so the deck reads as continuous.
 *
 * Built on native scroll-snap rather than a transformed track. That buys touch
 * swiping and keyboard scrolling for free, keeps the motion on the compositor,
 * and means the slide geometry is whatever CSS says it is with no width maths
 * to drift out of sync.
 *
 * The active index comes from an IntersectionObserver, never a scroll handler.
 */
export function FeatureCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = Number((entry.target as HTMLElement).dataset.slide);
          setIndex(i);
        });
      },
      { root: track, threshold: 0.6 },
    );

    track.querySelectorAll("[data-slide]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const go = useCallback(
    (delta: number) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector<HTMLElement>("[data-slide]");
      if (!card) return;
      const step = card.offsetWidth + 20;
      track.scrollBy({
        left: delta * step,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [reduce],
  );

  return (
    <section
      id="features"
      className="relative overflow-hidden border-y border-line-soft bg-canvas-deep py-28 md:py-36"
    >
      <Reveal className="px-6 text-center">
        <h2 className="mx-auto max-w-[16ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
          the parts you keep
        </h2>
      </Reveal>

      <div className="relative mt-16 md:mt-20">
        <div
          ref={trackRef}
          // <main> no longer insets this section, so the centring pad is a
          // straight half-viewport minus half a card.
          className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto overscroll-x-contain px-[calc(50vw-min(43vw,340px))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((slide, i) => {
            const active = i === index;
            return (
              <article
                key={slide.title}
                data-slide={i}
                className="flex w-[min(86vw,680px)] shrink-0 snap-center flex-col justify-between rounded-md border border-line-soft bg-panel-bright"
                style={{
                  opacity: active ? 1 : 0.34,
                  transition: reduce
                    ? "none"
                    : "opacity 380ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <header className="flex items-center gap-2 border-b border-line-soft px-7 py-3.5">
                  <ArrowRightIcon
                    size={10}
                    weight="bold"
                    className="text-accent"
                  />
                  <span className="label text-ink-soft">
                    {String(i + 1).padStart(2, "0")} of{" "}
                    {String(SLIDES.length).padStart(2, "0")}
                  </span>
                </header>

                <div className="px-7 py-10 md:px-10 md:py-14">
                  <h3 className="whitespace-pre-line text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                    {slide.title}
                  </h3>
                  <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink-muted">
                    {slide.body}
                  </p>
                </div>

                <footer className="border-t border-line-soft px-7 py-4">
                  <span className="text-[13px] text-ink-soft">
                    {slide.footnote}
                  </span>
                </footer>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous feature"
            className="pressable flex h-10 w-10 items-center justify-center rounded-xs border border-line bg-panel-bright text-ink hover:border-ink disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowLeftIcon size={14} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === SLIDES.length - 1}
            aria-label="Next feature"
            className="pressable flex h-10 w-10 items-center justify-center rounded-xs border border-line bg-panel-bright text-ink hover:border-ink disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowRightIcon size={14} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}
