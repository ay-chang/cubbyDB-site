import { Reveal } from "./reveal";
import { SectionIntro } from "./section-intro";

const ENTRIES = [
  { icon: "▦", label: "public.subscriptions", kind: "Table" },
  { icon: "▦", label: "public.users", kind: "Table" },
  { icon: "⌗", label: "cancels by plan.sql", kind: "Query" },
  { icon: "✦", label: "Why did MRR dip in August?", kind: "AI chat", accent: true },
  { icon: "ƒ", label: "refresh_mrr_daily", kind: "Function" },
];

const POINTS = [
  {
    title: "References, not copies",
    body: "A cubby stores what a saved query, table, or chat is — not a copy of it. Edit the query elsewhere and every cubby pointing at it stays current. Delete the cubby and the thing it pointed at is untouched.",
  },
  {
    title: "Its tables sit above your schema tree",
    body: "Open a cubby and its tables collect in their own section at the top of the tree, so you're not hunting for them — the search box still filters your whole schema, not just what's pinned.",
  },
  {
    title: "Ask AI already knows what's in it",
    body: "While a cubby is open, its tables go to Ask AI in full column detail on every question — even on a schema large enough that everything else gets abbreviated.",
  },
];

/**
 * A cubby is a named set of references for one task. The mock on the left is
 * a single card rather than a stack: it's the thing being described, and the
 * three properties sit beside it as plain copy.
 */
export function CubbiesSection() {
  return (
    <section id="cubbies" className="relative px-5 pt-[160px] sm:px-7">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <Reveal variant="scale" className="order-2 lg:order-1">
          <div
            className="rounded-[28px] p-6 sm:p-10"
            style={{
              background:
                "radial-gradient(90% 80% at 0% 100%, rgba(34,197,94,0.13), rgba(34,197,94,0) 60%), #f2f4f3",
            }}
          >
            <div
              className="rounded-[18px] border border-[rgba(27,31,38,0.08)] bg-white"
              style={{ boxShadow: "0 30px 60px -36px rgba(38,50,80,0.4)" }}
            >
              <div className="flex items-center gap-3 border-b border-[rgba(27,31,38,0.07)] px-5 py-4">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                <span className="text-[15px] font-medium text-[#141820]">
                  Q3 churn investigation
                </span>
                <span className="ml-auto text-[12.5px] text-[rgba(27,31,38,0.45)]">
                  5 entries
                </span>
              </div>
              <ul className="p-2">
                {ENTRIES.map((entry, i) => (
                  <Reveal
                    as="li"
                    key={entry.label}
                    index={i}
                    delay={0.35}
                    className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] text-[#1b1f26]"
                  >
                    <span
                      className={`w-4 shrink-0 text-center text-[13px] ${entry.accent ? "text-[#1aa35e]" : "text-[rgba(27,31,38,0.35)]"}`}
                    >
                      {entry.icon}
                    </span>
                    <span className="truncate">{entry.label}</span>
                    <span className="ml-auto shrink-0 text-[12px] text-[rgba(27,31,38,0.4)]">
                      {entry.kind}
                    </span>
                  </Reveal>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-[rgba(27,31,38,0.07)] px-5 py-3.5">
                <span className="text-[13px] text-[rgba(27,31,38,0.5)]">
                  Reopen as 5 tabs
                </span>
                <span className="rounded-full bg-[#141820] px-3.5 py-1.5 text-[12.5px] font-medium text-white">
                  Open cubby
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionIntro
            align="left"
            eyebrow="Cubbies"
            title="Put the work down. Pick it back up."
            lede="A named group of tables, saved queries, AI chats, and structure views for one task. Open it later and every tab comes back at once."
          />
          <dl className="mt-9 flex flex-col gap-6">
            {POINTS.map((point, i) => (
              <Reveal
                key={point.title}
                index={i}
                delay={0.4}
                className="border-l-2 border-[rgba(34,197,94,0.5)] pl-4"
              >
                <dt className="font-sans-ui text-[16px] font-semibold tracking-[-0.01em] text-[#141820]">
                  {point.title}
                </dt>
                <dd className="mt-1 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
                  {point.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
