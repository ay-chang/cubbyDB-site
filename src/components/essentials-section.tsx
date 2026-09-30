import {
  ClockCounterClockwiseIcon,
  CodeIcon,
  GitDiffIcon,
  PaletteIcon,
  PencilSimpleIcon,
  PlugsConnectedIcon,
  ShieldCheckIcon,
  TableIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { SectionIntro } from "./section-intro";

/** The basics someone switching from another client checks for first. Opens
 *  /features, so its heading is the page's h1. */
const ESSENTIALS = [
  {
    icon: CodeIcon,
    title: "SQL editor",
    body: "Autocomplete from your live schema, formatting, and EXPLAIN in one keystroke.",
  },
  {
    icon: TableIcon,
    title: "Browse without SQL",
    body: "Open any table and sort, filter, and page through it like a spreadsheet.",
  },
  {
    icon: PencilSimpleIcon,
    title: "Edit in place",
    body: "Change cells, add and delete rows, import a CSV, or export results.",
  },
  {
    icon: PlugsConnectedIcon,
    title: "Several connections at once",
    body: "Keep production, staging, and local open side by side, each with its own tabs.",
  },
  {
    icon: ShieldCheckIcon,
    title: "SSH tunnels",
    body: "Reach databases behind a bastion host, and approve its key the first time.",
  },
  {
    icon: TreeStructureIcon,
    title: "Structure and diagrams",
    body: "See a table's columns, indexes, and keys, or its relationships as an ER diagram.",
  },
  {
    icon: GitDiffIcon,
    title: "Schema compare",
    body: "Diff two schemas, even across connections, and get migration SQL to review.",
  },
  {
    icon: ClockCounterClockwiseIcon,
    title: "History and saved queries",
    body: "Every query you run is kept, and the ones you care about are a click away.",
  },
  {
    icon: PaletteIcon,
    title: "Themes and shortcuts",
    body: "Eight themes, twenty accent colors, and keyboard shortcuts you can rebind.",
  },
];

export function EssentialsSection() {
  return (
    <section id="features" className="relative px-5 pt-[64px] sm:px-7">
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          as="h1"
          eyebrow="The essentials"
          title="Everything you'd expect."
          lede="The everyday tools are all here, so switching doesn't mean giving anything up."
        />
        {/* One reveal for the whole grid: per-card reveals left a partly
            scrolled-in row showing empty cards. */}
        <Reveal
          variant="scale"
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-[rgba(27,31,38,0.08)] bg-[rgba(27,31,38,0.08)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {ESSENTIALS.map((item) => (
            <div key={item.title} className="bg-white p-7">
              <item.icon size={22} className="text-[#15803d]" />
              <h3 className="mt-4 font-sans-ui text-[16.5px] font-semibold tracking-[-0.01em] text-[#141820]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[rgba(27,31,38,0.6)]">
                {item.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
