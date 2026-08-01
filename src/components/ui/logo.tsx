/**
 * The brand lockup, rebuilt as mark-path plus live text.
 *
 * The shipped lockup SVG sets "CubbyDB" with an SVG <text> element in Geist.
 * Referenced through an <img>, that text cannot see the page's webfont and
 * silently falls back to Helvetica, so the wordmark would render in the wrong
 * typeface for anyone without Geist installed locally. Splitting it means the
 * mark stays vector and the wordmark uses the real Geist that is already
 * loaded, matching the brand spec exactly: SemiBold 600 at -2% tracking.
 *
 * The path is the knockout mark verbatim from
 * `brand/mark-knockout/cubbydb-mark-knockout.svg`. Its centre is a genuine
 * hole, so it picks up whatever surface sits behind it.
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
          className="ml-2 font-semibold tracking-[-0.02em] text-ink"
          style={{ fontSize: size * 0.86 }}
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
      viewBox="0 0 256 256"
      role="img"
      aria-label="CubbyDB"
      className="shrink-0"
    >
      <path
        fill="#3ECF6E"
        fillRule="evenodd"
        d="M70 0h116a70 70 0 0 1 70 70v116a70 70 0 0 1-70 70H70a70 70 0 0 1-70-70V70A70 70 0 0 1 70 0Zm34.5 81.5h47a23 23 0 0 1 23 23v47a23 23 0 0 1-23 23h-47a23 23 0 0 1-23-23v-47a23 23 0 0 1 23-23Z"
      />
    </svg>
  );
}
