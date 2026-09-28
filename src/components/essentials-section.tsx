import {
  CommandIcon,
  DesktopIcon,
  FileCsvIcon,
  LightningIcon,
  PaletteIcon,
  TableIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { SectionIntro } from "./section-intro";

const FEATURES = [
  {
    icon: TableIcon,
    title: "An editable grid",
    body: "Edit cells in place, paste rows in as drafts, and commit the lot with ⌘S.",
  },
  {
    icon: LightningIcon,
    title: "A real SQL editor",
    body: "Run the statement at the cursor with ⌘↵, EXPLAIN or EXPLAIN ANALYZE it, and cancel with Esc.",
  },
  {
    icon: CommandIcon,
    title: "Command palette",
    body: "⌘K jumps to any table or column in the schema without touching the tree.",
  },
  {
    icon: FileCsvIcon,
    title: "CSV in and out",
    body: "Import a CSV into a table, or export any result set in full, at any size.",
  },
  {
    icon: PaletteIcon,
    title: "8 themes, 10 accents",
    body: "Complete palettes, not filters — including One Dark and Dracula matched to their sources.",
  },
  {
    icon: DesktopIcon,
    title: "Native everywhere",
    body: "One Rust core on macOS, Windows, and Linux, with signed installers on every release.",
  },
];

export function EssentialsSection() {
  return (
    <section id="features" className="relative px-5 pt-[180px] sm:px-7">
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          eyebrow="Everything else"
          title="And all the parts of a good client."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-[rgba(27,31,38,0.08)] bg-[rgba(27,31,38,0.08)] sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} index={i % 3} className="bg-[#fbfbfc] p-8">
              <feature.icon size={22} weight="regular" className="text-[#1aa35e]" />
              <h3 className="mt-5 font-sans-ui text-[17px] font-semibold tracking-[-0.01em] text-[#141820]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
                {feature.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href="https://github.com/ay-chang/cubbyDB/blob/main/FEATURES.md"
            target="_blank"
            rel="noreferrer"
            className="text-[15px] font-medium text-[#141820] underline decoration-[rgba(27,31,38,0.2)] underline-offset-4 transition-colors hover:decoration-[#1aa35e]"
          >
            Read the full feature list →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
