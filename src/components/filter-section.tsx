import { FilterDemo } from "./filter-demo";
import { Reveal } from "./reveal";
import { SectionIntro } from "./section-intro";
import { Kbd } from "./kbd";

export function FilterSection() {
  return (
    <section className="relative px-5 pt-[160px] sm:px-7">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <SectionIntro
            align="left"
            eyebrow="Natural-language filters"
            title="English in, SQL in the same box."
          />
          <Reveal index={1}>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.65] text-[rgba(27,31,38,0.6)]">
              Toggle ✦ in the filter bar and describe the rows you want. The
              predicate lands in the WHERE field and the bar flips back to
              SQL — what ran is right there to read, tweak, or clear. If it
              can&rsquo;t be a filter on this table, it says so and changes
              nothing.
            </p>
            <p className="mt-6 flex items-center gap-2 text-[14px] text-[rgba(27,31,38,0.55)]">
              <Kbd>⌘</Kbd>
              <Kbd>I</Kbd>
              <span className="ml-1">while the filter bar is focused</span>
            </p>
          </Reveal>
        </div>

        <Reveal index={2}>
          <FilterDemo />
        </Reveal>
      </div>
    </section>
  );
}
