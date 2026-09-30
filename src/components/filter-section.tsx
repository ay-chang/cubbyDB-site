import { FilterDemo } from "./filter-demo";
import { Reveal } from "./reveal";
import { SectionIntro } from "./section-intro";

export function FilterSection() {
  return (
    <section className="relative px-5 pt-[160px] sm:px-7">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <SectionIntro
            align="left"
            eyebrow="Filters"
            title="Describe the rows you want."
          />
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.65] text-[rgba(27,31,38,0.6)]">
              Type what you&rsquo;re looking for, like &ldquo;orders over $100 last
              week,&rdquo; and CubbyDB turns it into a WHERE clause on the table
              you&rsquo;re viewing. The SQL stays in the filter bar, so you can read
              it, adjust it, or clear it. Prefer writing SQL yourself? The same bar
              takes that too.
            </p>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={0.15}>
          <FilterDemo />
        </Reveal>
      </div>
    </section>
  );
}
