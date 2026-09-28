import { EyeIcon, LockKeyIcon, TreeStructureIcon } from "@phosphor-icons/react/dist/ssr";
import { DemoVideo } from "./demo-video";
import { Reveal } from "./reveal";
import { SectionIntro } from "./section-intro";

/**
 * Ordered the way a skeptic asks: can it hurt me, does it know my database,
 * can I check its work. Safety leads because it is the one claim that is
 * structural rather than a quality judgement.
 */
const PILLARS = [
  {
    icon: LockKeyIcon,
    title: "Read-only by construction",
    body: "There's no write path for it to reach — not a prompt that could be talked around.",
    points: [
      "No write methods exposed to the tool layer",
      "SELECT-family statements only, allowlisted",
      "Runs in a READ ONLY transaction, always rolled back",
    ],
  },
  {
    icon: TreeStructureIcon,
    title: "Knows your schema",
    body: "Your real structure goes in with the question, so it joins on keys you actually have.",
    points: [
      "Tables, columns, types, nullability, foreign keys",
      "Enum values and row estimates",
      "Pulls deeper detail on demand for large schemas",
    ],
  },
  {
    icon: EyeIcon,
    title: "Shows its work",
    body: "The answer is never the only thing you get. Every step carries the statement behind it.",
    points: [
      "The exact SQL and row count, step by step",
      "Open any query in the editor and keep going",
      "Export the full result set as CSV",
    ],
  },
];

const PROVIDERS = ["Anthropic key", "OpenAI key", "Claude subscription", "ChatGPT subscription"];

export function AskAiSection() {
  return (
    <section id="ask-ai" className="relative px-5 pt-[140px] sm:px-7">
      <div className="mx-auto max-w-[1240px]">
        <SectionIntro
          eyebrow="Ask AI"
          title="Ask anything. Change nothing."
          lede="An assistant that reads your schema, writes the SQL, and shows you every query it ran. Modifying your data isn't a setting it respects — it's something it cannot do."
        />

        {/* The recording is 1920px wide; capping the frame near 1040px keeps
            it close to 1:1 on a 2x display instead of upscaling it soft. */}
        <Reveal variant="scale" className="mx-auto mt-16 max-w-[1080px]">
          <div
            className="rounded-[28px] border border-[rgba(27,31,38,0.06)] p-2.5 sm:p-3.5"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 0%, rgba(34,197,94,0.14), rgba(34,197,94,0) 60%), #f2f4f3",
            }}
          >
            <DemoVideo
              src="/marketing/ai-demo-light.mp4"
              label="Screen recording of both AI features: connecting a Claude account, asking the assistant questions about the data and seeing the SQL it ran, then toggling ✦ in the filter bar to turn a plain-English prompt into a WHERE clause that re-filters the grid."
            />
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-[1080px] grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              index={i}
              className="md:border-l md:border-[rgba(27,31,38,0.08)] md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#e7f5ec] text-[#15803d]">
                <pillar.icon size={18} weight="bold" />
              </span>
              <h3 className="mt-5 font-sans-ui text-[18px] font-semibold tracking-[-0.015em] text-[#141820]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
                {pillar.body}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {pillar.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[rgba(27,31,38,0.72)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#22c55e]"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-2.5 text-[14px] text-[rgba(27,31,38,0.55)]">
          <span className="mr-1">Bring your own model</span>
          {PROVIDERS.map((provider) => (
            <span
              key={provider}
              className="rounded-full border border-[rgba(27,31,38,0.1)] bg-white px-3.5 py-1.5 font-medium text-[#1b1f26]"
            >
              {provider}
            </span>
          ))}
          <span className="ml-1">· your key stays on your machine</span>
        </Reveal>
      </div>
    </section>
  );
}
