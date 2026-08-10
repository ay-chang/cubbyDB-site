"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { Shot } from "./ui/shot";
import { WordReveal } from "./word-reveal";

/**
 * Three claims, in the order a skeptic asks them: can it hurt me, does it
 * actually know my database, and can I check its work.
 *
 * Safety leads because it's the only one of the three that's structural rather
 * than a quality judgment — the other two are things every tool of this kind
 * claims, and the first one is verifiable in the source.
 *
 * Every slide carries exactly three `points` of the same rough length. That's
 * a layout constraint as much as an editorial one: the deck advances in place
 * beside a fixed image, and the min-height below is sized to the tallest
 * slide, so lengthening one means raising that number too.
 */
const SLIDES = [
  {
    label: "Read-only",
    title: "It can't write.\nBy construction, not by policy.",
    body: "Asking it to change something isn't refused by a prompt that could be talked around. There is no write path for it to reach.",
    points: [
      "No write methods exposed to the tool layer at all",
      "One SELECT-family statement, checked against an allowlist",
      "Run in a READ ONLY transaction, always rolled back",
    ],
  },
  {
    label: "Schema-aware",
    title: "It knows your schema,\nso it doesn't guess.",
    body: "Your real structure goes in alongside the question, so it joins on the keys you actually have instead of inventing plausible ones.",
    points: [
      "Tables, columns, types, nullability, and foreign keys",
      "Enum values and row estimates, so status columns resolve",
      "Pulls deeper detail on demand on large schemas",
    ],
  },
  {
    label: "Inspectable",
    title: "Every query\nis on the table.",
    body: "The answer is never the only thing you get. Each step shows the statement behind it, and any result can leave as a file.",
    points: [
      "The exact SQL and the row count, step by step",
      "Copy it, or open it in the SQL editor and keep working",
      "Download CSV exports the full result set, at any size",
    ],
  },
];

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * The slide travels on the axis the arrows imply — forward sends the outgoing
 * copy left and brings the incoming in from the right. Without the sign the
 * deck reads as three unrelated fades rather than one moving thing.
 */
const DECK = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 28 : -28 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.34, ease: EASE, staggerChildren: 0.045, delayChildren: 0.05 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -22 : 22,
    transition: { duration: 0.18, ease: "easeIn" as const },
  }),
};

/** Children ride the parent's variant names, so this staggers for free. */
const LINE = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

/** Reduced motion keeps the crossfade — it signals the change — and nothing else. */
const DECK_STILL = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};
const LINE_STILL = { enter: {}, center: {}, exit: {} };

export function AiSection() {
  const [[index, direction], setSlide] = useState([0, 0]);
  const reduce = useReducedMotion();
  const slide = SLIDES[index];

  // Dragging is a touch affordance. On a mouse, a horizontal drag across a
  // block of prose is what text selection is for, so it stays off there.
  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const sync = () => setCanDrag(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const paginate = useCallback((delta: number) => {
    setSlide(([current]) => {
      const next = current + delta;
      if (next < 0 || next > SLIDES.length - 1) return [current, 0];
      return [next, delta];
    });
  }, []);

  const jumpTo = useCallback((target: number) => {
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  }, []);

  return (
    <section id="ask-ai" className="relative px-6 pt-16 pb-28 md:pt-20 md:pb-40">
      <div className="mx-auto max-w-[1240px]">
        {/* The heading sits outside `Reveal` deliberately: `WordReveal` runs
            its own entrance, and nesting it inside one would fade the block in
            while the words were still rising out of their masks. */}
        <div className="text-center">
          <Reveal>
            <p className="label text-ink-soft">Ask AI</p>
          </Reveal>
          <h2 className="mx-auto mt-5 max-w-[20ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
            <WordReveal text="ask anything. change nothing." delay={0.08} />
          </h2>
          <Reveal index={2}>
            <p className="mx-auto mt-7 max-w-[52ch] text-[16px] leading-relaxed text-ink-muted">
              It reads your schema, writes the SQL, and shows you every query it
              ran. Modifying your data isn&rsquo;t a setting it respects —
              it&rsquo;s a thing it cannot do.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:mt-24 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Shot
              src="/shots/ai-workspace.png"
              alt="CubbyDB with the Ask AI panel open beside the recipes grid: the assistant answers how many recipes contain beef, shows the SELECT it ran, and previews a joined export with a Download CSV button."
              width={2000}
              height={1250}
              sizes="(max-width: 1024px) 100vw, 720px"
            />
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal index={1}>
              {/* Arrow keys work once focus is anywhere in the deck — which
                  the arrow buttons themselves provide, so this adds no extra
                  tab stop of its own. */}
              <div
                role="group"
                aria-roledescription="carousel"
                aria-label="What Ask AI does"
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") paginate(-1);
                  if (event.key === "ArrowRight") paginate(1);
                }}
              >
                {/* Min-height holds the tallest slide so advancing the deck
                    never moves the arrows under the reader's cursor. */}
                <div
                  aria-live="polite"
                  className="min-h-[424px] sm:min-h-[352px] lg:min-h-[424px]"
                >
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={reduce ? DECK_STILL : DECK}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag={canDrag ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.16}
                      onDragEnd={(_, info) => {
                        const throw_ = info.offset.x + info.velocity.x * 0.14;
                        if (throw_ < -60) paginate(1);
                        else if (throw_ > 60) paginate(-1);
                      }}
                    >
                      <motion.p
                        variants={reduce ? LINE_STILL : LINE}
                        className="label text-ink-soft"
                      >
                        {slide.label}
                      </motion.p>
                      <motion.h3
                        variants={reduce ? LINE_STILL : LINE}
                        className="mt-5 whitespace-pre-line text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.035em]"
                      >
                        {slide.title}
                      </motion.h3>
                      <motion.p
                        variants={reduce ? LINE_STILL : LINE}
                        className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-ink-muted"
                      >
                        {slide.body}
                      </motion.p>
                      <ul className="mt-7 flex flex-col gap-3 border-t border-line-soft pt-7">
                        {slide.points.map((point) => (
                          <motion.li
                            key={point}
                            variants={reduce ? LINE_STILL : LINE}
                            className="flex items-start gap-3"
                          >
                            {/* Drawn rather than an icon import: at this size
                                a glyph's own metrics fight the text baseline. */}
                            <span
                              aria-hidden="true"
                              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
                            <span className="text-[14px] leading-relaxed text-ink-muted">
                              {point}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-line-soft pt-6">
                  <div className="flex items-center gap-1.5">
                    {SLIDES.map((item, i) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-label={`Show ${item.label}`}
                        aria-current={i === index}
                        className="group py-2"
                      >
                        {/* Literal hex rather than the var(): Motion tweens
                            colour channels, and it cannot interpolate between
                            two unresolved custom properties — they'd snap. */}
                        <motion.span
                          className="block h-1 rounded-full"
                          animate={{
                            width: i === index ? 22 : 6,
                            backgroundColor: i === index ? "#0f7a37" : "#c9cdd2",
                          }}
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { duration: 0.36, ease: EASE }
                          }
                        />
                      </button>
                    ))}
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => paginate(-1)}
                      disabled={index === 0}
                      aria-label="Previous claim"
                      className="pressable flex h-9 w-9 items-center justify-center rounded-xs border border-line bg-panel-bright text-ink hover:border-ink disabled:pointer-events-none disabled:opacity-35"
                    >
                      <ArrowLeftIcon size={13} weight="bold" />
                    </button>
                    <button
                      type="button"
                      onClick={() => paginate(1)}
                      disabled={index === SLIDES.length - 1}
                      aria-label="Next claim"
                      className="pressable flex h-9 w-9 items-center justify-center rounded-xs border border-line bg-panel-bright text-ink hover:border-ink disabled:pointer-events-none disabled:opacity-35"
                    >
                      <ArrowRightIcon size={13} weight="bold" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <p className="mx-auto mt-20 max-w-[58ch] text-center text-[15px] leading-relaxed text-ink-soft md:mt-28">
            Bring your own model: Anthropic, OpenAI, or Codex through ChatGPT
            sign-in. Your key stays on your machine.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
