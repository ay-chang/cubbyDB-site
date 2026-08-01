import { Reveal } from "./reveal";

const GROUPS = [
  {
    heading: "Editor",
    items: [
      { keys: ["Cmd", "K"], label: "Jump to any table or column" },
      { keys: ["Cmd", "Enter"], label: "Run the statement at the cursor" },
      { keys: ["Cmd", "Shift", "Enter"], label: "Run the whole tab" },
      { keys: ["Cmd", "Shift", "E"], label: "EXPLAIN the same target" },
      { keys: ["Cmd", "Shift", "A"], label: "EXPLAIN ANALYZE" },
      { keys: ["Esc"], label: "Cancel the running query" },
    ],
  },
  {
    heading: "Grid and tabs",
    items: [
      { keys: ["Cmd", "S"], label: "Save the query, or commit pending edits" },
      { keys: ["Cmd", "F"], label: "Find in results" },
      { keys: ["Cmd", "C"], label: "Copy the selected cell or rows" },
      { keys: ["Cmd", "V"], label: "Paste rows in as drafts" },
      { keys: ["Cmd", "T"], label: "New tab" },
      { keys: ["Cmd", "W"], label: "Close the active tab" },
    ],
  },
];

/**
 * Twelve shortcuts is past where a flat list reads well, so they are chunked
 * into the two places they actually apply.
 */
export function ShortcutsSection() {
  return (
    <section className="relative border-t border-line-soft px-6 py-28 md:py-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(1.9rem,4.2vw,3.25rem)] font-medium leading-[1.03] tracking-[-0.035em]">
            The keyboard does most of the work.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-ink-muted">
            Cmd on macOS, Ctrl on Windows and Linux. Settings carries the full
            catalog, grouped by where each one is active.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 md:mt-20 md:grid-cols-2">
          {GROUPS.map((group, groupIndex) => (
            <Reveal key={group.heading} index={groupIndex}>
              <h3 className="label text-ink-soft">{group.heading}</h3>
              <ul className="mt-5 border-t border-line-soft">
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-6 border-b border-line-soft py-3.5"
                  >
                    <span className="text-[14.5px] text-ink-muted">
                      {item.label}
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                      {item.keys.map((key) => (
                        <kbd
                          key={key}
                          className="rounded-xs border border-line bg-panel-bright px-1.5 py-0.5 font-mono text-[11px] text-ink"
                        >
                          {key}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
