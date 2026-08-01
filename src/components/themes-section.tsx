import { Reveal } from "./reveal";
import { Shot } from "./ui/shot";

/** The 8 shipped themes, in the order the Appearance panel lists them. */
const THEMES = [
  "Light",
  "Paper",
  "Dark",
  "Midnight",
  "Charcoal",
  "Slate",
  "One Dark",
  "Dracula",
];

/** Accent presets, light-mode values, straight from the app's palette table. */
const ACCENTS = [
  { name: "Indigo", hex: "#5e6ad2" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Cyan", hex: "#0891b2" },
  { name: "Teal", hex: "#0d9488" },
  { name: "Green", hex: "#16a34a" },
  { name: "Amber", hex: "#d97706" },
  { name: "Orange", hex: "#ea580c" },
  { name: "Red", hex: "#e11d3f" },
  { name: "Pink", hex: "#db2777" },
  { name: "Purple", hex: "#7c3aed" },
];

/**
 * Sidecar layout: the swatch rail holds the left column and the panel it
 * controls fills the right, so the two read as one control surface.
 */
export function ThemesSection() {
  return (
    <section
      id="themes"
      className="relative border-t border-line-soft px-6 py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="max-w-[12ch] text-[clamp(1.9rem,4.2vw,3.25rem)] font-medium leading-[1.03] tracking-[-0.035em]">
              Eight themes. Ten accents.
            </h2>
            <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-ink-muted">
              Every theme is a full palette rather than a filter over one base,
              and each keeps its faintest text tiers legible. Both choices
              persist across launches.
            </p>
          </Reveal>

          <Reveal index={1} className="mt-10">
            <ul className="flex flex-wrap gap-1.5">
              {THEMES.map((theme) => (
                <li
                  key={theme}
                  className="label rounded-xs border border-line px-2.5 py-1.5 text-ink-muted"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={2} className="mt-8 border-t border-line-soft pt-8">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {ACCENTS.map((accent) => (
                <li key={accent.name} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: accent.hex }}
                  />
                  <span className="text-[13px] text-ink-muted">
                    {accent.name}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal index={1} className="lg:col-span-8">
          <Shot
            src="/shots/appearance.png"
            alt="CubbyDB's Appearance settings, with the eight theme presets laid out and a row of accent colour swatches below them."
            sizes="(max-width: 1024px) 100vw, 780px"
          />
        </Reveal>
      </div>
    </section>
  );
}
