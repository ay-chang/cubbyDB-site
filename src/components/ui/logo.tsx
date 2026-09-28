/**
 * The brand lockup, rebuilt as mark-path plus live text.
 *
 * The shipped lockup SVG sets "CubbyDB" with an SVG <text> element in Geist.
 * Referenced through an <img>, that text cannot see the page's webfont and
 * silently falls back to Helvetica, so the wordmark would render in the wrong
 * typeface for anyone without Geist installed locally. Splitting it means the
 * mark stays vector and the wordmark uses a real webfont that is already
 * loaded, matching the brand spec exactly: Instrument Sans 600 at -3%
 * tracking.
 *
 * The path is the knockout mark verbatim from the brand kit's
 * `icon-green.svg`. Its centre is a genuine hole, so it picks up whatever
 * surface sits behind it — never fill it in.
 */

type LogoProps = {
  /** Height of the mark in px. The wordmark scales alongside it. */
  size?: number;
  /** Mark only, no wordmark. */
  markOnly?: boolean;
  className?: string;
};

export function Logo({ size = 20, markOnly = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Mark size={size} />
      {!markOnly && (
        <span
          className="ml-2 font-sans-ui font-semibold tracking-[-0.03em] text-ink"
          style={{ fontSize: size * 0.767 }}
        >
          CubbyDB
        </span>
      )}
    </span>
  );
}

export function Mark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="CubbyDB"
      className="shrink-0"
    >
      <path
        fill="#22c55e"
        fillRule="evenodd"
        d="M28 4h44a24 24 0 0 1 24 24v44a24 24 0 0 1-24 24H28A24 24 0 0 1 4 72V28A24 24 0 0 1 28 4Zm7 32h30a10 10 0 0 1 10 10v8a10 10 0 0 1-10 10H35a10 10 0 0 1-10-10v-8a10 10 0 0 1 10-10Z"
      />
    </svg>
  );
}
