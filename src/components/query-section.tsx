import { Reveal } from "./reveal";
import { Shot } from "./ui/shot";

const NOTES = [
  {
    key: "Cmd K",
    body: "Searches every table and column across all open connections at once, not just the one in front of you.",
  },
  {
    key: "Cmd Enter",
    body: "Runs the statement your cursor sits in. Shift adds the whole tab, so the buffer is never accidental.",
  },
  {
    key: "Cmd Shift E",
    body: "EXPLAIN on the same target. The plan returns through the normal grid, searchable and exportable.",
  },
];

/**
 * Wide plate: headline held left, the capture running the full container, and
 * the annotations reading as a caption rail beneath it rather than a card row.
 */
export function QuerySection() {
  return (
    <section className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[19ch] text-[clamp(1.9rem,4.2vw,3.25rem)] font-medium leading-[1.03] tracking-[-0.035em]">
            Find the table, then run the query.
          </h2>
        </Reveal>

        <Reveal index={1} className="mt-12 md:mt-16">
          <Shot
            src="/shots/command-palette.png"
            alt="The CubbyDB command palette open over the results grid, listing every table in the public schema with its row count."
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 border-t border-line-soft md:grid-cols-3">
          {NOTES.map((note, i) => (
            <Reveal
              key={note.key}
              index={i}
              className={`border-b border-line-soft py-7 md:border-b-0 md:pr-10 ${
                i > 0 ? "md:border-l md:border-line-soft md:pl-10" : ""
              }`}
            >
              <span className="label inline-flex rounded-xs border border-line px-2 py-1 text-ink">
                {note.key}
              </span>
              <p className="mt-4 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-muted">
                {note.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
