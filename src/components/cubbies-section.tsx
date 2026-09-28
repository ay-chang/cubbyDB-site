import { Reveal } from "./reveal";
import { SectionIntro } from "./section-intro";
import { Kbd } from "./kbd";

const ENTRIES = [
  { icon: "▦", label: "public.subscriptions", kind: "Table" },
  { icon: "▦", label: "public.users", kind: "Table" },
  { icon: "⌗", label: "cancels by plan.sql", kind: "Query" },
  { icon: "✦", label: "Why did MRR dip in August?", kind: "AI chat", accent: true },
  { icon: "ƒ", label: "refresh_mrr_daily", kind: "Function" },
];

const POINTS = [
  {
    title: "Pointers, never copies",
    body: "Edit a saved query and every cubby pointing at it reflects the change. Deleting a cubby never deletes what it pointed at.",
  },
  {
    title: "The schema tree pins itself",
    body: "The active cubby's tables collect in a group above the tree — additive, so the filter still searches everything.",
  },
  {
    title: "The assistant inherits it",
    body: "A cubby's tables reach Ask AI in full column detail, even on schemas large enough that everything else gets abbreviated.",
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
        <Reveal className="order-2 lg:order-1">
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
                {ENTRIES.map((entry) => (
                  <li
                    key={entry.label}
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
                  </li>
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
            lede="A named set of tables, saved queries, AI chats, and structure views for one task. Close the laptop mid-investigation; come back Thursday to the same tabs."
          />
          <Reveal index={1}>
            <dl className="mt-9 flex flex-col gap-6">
              {POINTS.map((point) => (
                <div key={point.title} className="border-l-2 border-[rgba(34,197,94,0.5)] pl-4">
                  <dt className="font-sans-ui text-[16px] font-semibold tracking-[-0.01em] text-[#141820]">
                    {point.title}
                  </dt>
                  <dd className="mt-1 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
                    {point.body}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-[rgba(27,31,38,0.55)]">
              <span className="flex items-center gap-1.5">
                <Kbd>⌘</Kbd>
                <Kbd>D</Kbd>
                <span className="ml-1">add active tab</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>⌘</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>C</Kbd>
                <span className="ml-1">toggle panel</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
