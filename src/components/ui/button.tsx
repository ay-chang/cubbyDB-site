import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md";
  className?: string;
  /** True when `href` is a direct file asset rather than a page. Skips the
   *  external-link new-tab treatment: a download doesn't navigate anywhere,
   *  so target="_blank" on one just flashes an empty tab that immediately
   *  closes once the browser starts saving the file. */
  download?: boolean;
};

/**
 * Mono, uppercase, near-square. Two variants only: a solid near-black fill and
 * a hairline outline. Both carry a real border so the outline variant never
 * reads as bare text floating on the canvas.
 */
export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  download = false,
}: ButtonProps) {
  const sizing =
    size === "sm" ? "h-8 px-3 text-[10.5px]" : "h-11 px-5 text-[11px]";

  const styles =
    variant === "solid"
      ? "border-ink-block bg-ink-block text-canvas hover:bg-ink"
      : "border-line bg-transparent text-ink hover:border-ink hover:bg-panel-bright";

  const isExternalPage = href.startsWith("http") && !download;

  return (
    <a
      href={href}
      className={`pressable inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xs border font-mono uppercase tracking-[0.16em] ${sizing} ${styles} ${className}`}
      {...(isExternalPage ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
    </a>
  );
}
