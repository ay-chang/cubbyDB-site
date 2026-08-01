import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

const STATS = [
  {
    label: "Themes",
    caption: "complete palettes, not filters",
    value: 8,
    body: "Two light and six dark, including One Dark and Dracula matched to their own sourced values.",
    tone: "panel",
  },
  {
    label: "Accents",
    caption: "buttons, active states, keywords",
    value: 10,
    body: "One tuned variant per light and dark family, applied over whichever theme is running.",
    tone: "accent",
  },
  {
    label: "Desktops",
    caption: "one Rust core, one React UI",
    value: 3,
    body: "macOS, Windows, and Linux installers, each signed and published on every version tag.",
    tone: "bright",
  },
];

const TONES: Record<string, string> = {
  panel: "bg-panel",
  accent: "bg-accent-tint",
  bright: "bg-panel-bright",
};

/**
 * The editorial statistic band. Numerals carry the display serif; everything
 * around them stays on Geist and mono, which is what keeps the serif from
 * reading as decoration.
 */
export function Capabilities() {
  return (
    <section id="capabilities" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <p className="label text-ink-soft">What ships in the window</p>
          <h2 className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
            built once, tuned everywhere
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-3 md:mt-24 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              index={i}
              className={`flex min-h-[380px] flex-col justify-between rounded-md border border-line-soft p-8 md:min-h-[440px] ${TONES[stat.tone]}`}
            >
              <div>
                <h3 className="text-[19px] font-medium tracking-[-0.01em]">
                  {stat.label}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-ink-soft">
                  {stat.caption}
                </p>
                <p className="mt-7 max-w-[34ch] text-[14.5px] leading-relaxed text-ink-muted">
                  {stat.body}
                </p>
              </div>

              <p className="mt-12 font-display text-[clamp(4rem,8vw,6.5rem)] leading-none tracking-[-0.03em]">
                <CountUp to={stat.value} />
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
