"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Example = {
  table: string;
  prompt: string;
  where: string;
  columns: [string, string, string];
  rows: { cells: [string, string, string]; match: boolean }[];
  total: string;
};

const EXAMPLES: Example[] = [
  {
    table: "orders",
    prompt: "orders over $100 last week",
    where: "total > 100 AND created_at >= now() - interval '7 days'",
    columns: ["customer", "total", "created_at"],
    total: "1,204",
    rows: [
      { cells: ["m.okafor", "184.00", "2026-09-24"], match: true },
      { cells: ["j.lindqvist", "42.50", "2026-09-23"], match: false },
      { cells: ["a.reyes", "129.99", "2026-09-22"], match: true },
      { cells: ["t.nakamura", "310.00", "2026-08-30"], match: false },
      { cells: ["s.haddad", "212.40", "2026-09-21"], match: true },
    ],
  },
  {
    table: "recipes",
    prompt: "recipes that take under 20 minutes",
    where: "cook_time_in_minutes < 20",
    columns: ["title", "cook_time", "created_at"],
    total: "53",
    rows: [
      { cells: ["Pumpkin salad", "20", "2025-12-19"], match: false },
      { cells: ["Sauce à pâte", "5", "2025-12-29"], match: true },
      { cells: ["Mushroom Risotto", "45", "2025-07-19"], match: false },
      { cells: ["Smoothie (base)", "0", "2025-12-29"], match: true },
      { cells: ["Brownie dans une tasse", "0", "2025-12-30"], match: true },
    ],
  },
  {
    table: "users",
    prompt: "users who signed up this year",
    where: "created_at >= date_trunc('year', now())",
    columns: ["email", "plan", "created_at"],
    total: "35",
    rows: [
      { cells: ["hi@lena.dev", "pro", "2026-02-11"], match: true },
      { cells: ["oskar@hey.com", "free", "2025-11-03"], match: false },
      { cells: ["priya@fastmail.com", "pro", "2026-06-28"], match: true },
      { cells: ["dan@proton.me", "free", "2026-08-14"], match: true },
      { cells: ["kim@icloud.com", "team", "2025-04-02"], match: false },
    ],
  },
];

type Phase = "typing" | "thinking" | "applied";

const TYPE_MS = 42;
const THINK_MS = 900;
const HOLD_MS = 3200;

/**
 * A looping mock of the ✦ filter bar: an English prompt types in, then the bar
 * flips back to SQL mode with the generated predicate and the grid filters
 * down to the matching rows.
 *
 * Only runs while on screen. Reduced motion shows the applied state of the
 * first example and never advances.
 */
export function FilterDemo() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const example = EXAMPLES[index];

  useEffect(() => {
    if (reduce || !visible) return;
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed < example.prompt.length) {
        timer = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase("thinking"), 500);
      }
    } else if (phase === "thinking") {
      timer = setTimeout(() => setPhase("applied"), THINK_MS);
    } else {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % EXAMPLES.length);
        setTyped(0);
        setPhase("typing");
      }, HOLD_MS);
    }

    return () => clearTimeout(timer);
  }, [reduce, visible, phase, typed, example.prompt.length]);

  const applied = reduce || phase === "applied";
  const matchCount = example.rows.filter((row) => row.match).length;

  return (
    <div
      ref={ref}
      aria-label={`Example: “${example.prompt}” becomes WHERE ${example.where}`}
      role="img"
      className="overflow-hidden rounded-[20px] border border-[rgba(27,31,38,0.09)] bg-white"
      style={{ boxShadow: "0 40px 80px -48px rgba(38,50,80,0.45)" }}
    >
      {/* Tab strip */}
      <div className="flex items-center gap-2 border-b border-[rgba(27,31,38,0.07)] bg-[#f7f8f8] px-4 py-2.5">
        <span className="h-2 w-2 rounded-[2px] bg-[#22c55e]" />
        <span className="font-mono text-[12px] text-[#141820]">{example.table}</span>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 border-b border-[rgba(27,31,38,0.07)] px-4 py-3">
        <span
          className={`w-[52px] shrink-0 font-mono text-[11.5px] font-medium tracking-[0.06em] transition-colors duration-300 ${
            applied ? "text-[#1aa35e]" : "text-[#1aa35e]"
          }`}
        >
          {applied ? "WHERE" : "✦ ASK"}
        </span>
        <div
          className={`flex h-9 min-w-0 flex-1 items-center rounded-[8px] border px-3 font-mono text-[12.5px] transition-colors duration-300 ${
            applied
              ? "border-[rgba(27,31,38,0.1)] text-[#141820]"
              : "border-[rgba(34,197,94,0.45)] bg-[rgba(34,197,94,0.04)] shadow-[0_0_0_3px_rgba(34,197,94,0.1)] text-[#141820]"
          }`}
        >
          <span className="truncate">
            {applied ? example.where : example.prompt.slice(0, typed)}
            {!applied && phase === "typing" && (
              <span className="ml-px inline-block h-[14px] w-[1.5px] translate-y-[2px] animate-pulse bg-[#141820]" />
            )}
            {phase === "thinking" && !reduce && (
              <span className="ml-2 text-[rgba(27,31,38,0.4)]">writing SQL…</span>
            )}
          </span>
        </div>
        <span className="hidden shrink-0 font-mono text-[11.5px] text-[rgba(27,31,38,0.5)] sm:inline">
          <span className="text-[#22c55e]">●</span> {applied ? matchCount : example.total} rows
        </span>
      </div>

      {/* Grid */}
      <div className="px-1.5 pb-2 font-mono text-[12px]">
        <div className="grid grid-cols-[28px_1.4fr_1fr_1fr] gap-3 px-3 py-2.5 text-[10.5px] uppercase tracking-[0.08em] text-[rgba(27,31,38,0.42)]">
          <span />
          {example.columns.map((column) => (
            <span key={column} className="truncate">
              {column}
            </span>
          ))}
        </div>
        {example.rows.map((row, i) => {
          const hidden = applied && !row.match;
          return (
            <div
              key={`${index}-${i}`}
              className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                gridTemplateRows: hidden ? "0fr" : "1fr",
                opacity: hidden ? 0 : 1,
              }}
            >
              <div className="min-h-0">
                <div className="grid grid-cols-[28px_1.4fr_1fr_1fr] gap-3 rounded-[6px] px-3 py-2 text-[#1b1f26] odd:bg-[#fafbfb]">
                  <span className="text-[rgba(27,31,38,0.35)]">{i + 1}</span>
                  {row.cells.map((cell, c) => (
                    <span key={c} className="truncate">
                      {cell}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
