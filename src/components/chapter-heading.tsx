type ChapterHeadingProps = {
  number: string;
  kicker: string;
  title: string;
  lede: string;
  /**
   * "light" is fixed light-mode colour. "flip" reads the interpolated tokens
   * defined on [data-mode-flip], so the heading tracks the page from light
   * mode to dark instead of being written for one of them.
   */
  tone?: "light" | "flip";
};

/**
 * The opener both chapters share: a top rule, a number-and-kicker rail beside
 * the title, then the lede in a second grid row under an empty rail cell.
 */
export function ChapterHeading({
  number,
  kicker,
  title,
  lede,
  tone = "light",
}: ChapterHeadingProps) {
  const flip = tone === "flip";
  const rule = flip ? "border-[var(--flip-rule)]" : "border-[rgba(27,31,38,0.1)]";
  const muted = flip ? "text-[var(--flip-muted)]" : "text-[rgba(27,31,38,0.42)]";
  const accent = flip ? "text-[var(--flip-accent)]" : "text-[#1aa35e]";
  const ink = flip ? "text-[var(--flip-ink)]" : "text-[#141820]";
  const body = flip ? "text-[var(--flip-body)]" : "text-[rgba(27,31,38,0.58)]";

  return (
    <div>
      <div className={`border-t ${rule}`} />
      <div className="grid grid-cols-1 gap-2 pt-[30px] md:grid-cols-[minmax(0,120px)_minmax(0,1fr)] md:gap-10">
        <div className="flex flex-col gap-2">
          <span className={`font-mono text-[11.5px] tracking-[0.16em] uppercase ${muted}`}>
            {number}
          </span>
          <span className={`font-mono text-[11.5px] tracking-[0.16em] uppercase ${accent}`}>
            {kicker}
          </span>
        </div>
        <div className="max-w-[26ch]">
          <h2
            className={`font-serif-hero text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.04] tracking-[-0.005em] ${ink}`}
          >
            {title}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 pt-[26px] md:grid-cols-[minmax(0,120px)_minmax(0,1fr)] md:gap-10">
        <div className="hidden md:block" />
        <p className={`max-w-[56ch] text-[16.5px] leading-[1.75] ${body}`}>{lede}</p>
      </div>
    </div>
  );
}
