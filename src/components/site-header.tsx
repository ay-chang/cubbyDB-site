import Link from "next/link";
import type { getMacDownload } from "@/lib/releases";

type SiteHeaderProps = {
  macDownload: Awaited<ReturnType<typeof getMacDownload>>;
};

/**
 * Sits inline at the top of the hero rather than fixed/sticky — the hero's
 * own background scrolls away with it. Nothing here tracks scroll position;
 * that behaviour belongs to ScrollBackdrop, further down the page.
 */
export function SiteHeader({ macDownload }: SiteHeaderProps) {
  return (
    <div className="relative z-[3] mx-auto flex max-w-[1280px] items-center justify-between px-5 py-[26px] sm:px-7">
      <Link href="/" className="flex items-center gap-3">
        <svg
          viewBox="0 0 100 100"
          width={30}
          height={30}
          role="img"
          aria-label="CubbyDB"
          className="block shrink-0"
        >
          <path
            fill="#22c55e"
            fillRule="evenodd"
            d="M28 4h44a24 24 0 0 1 24 24v44a24 24 0 0 1-24 24H28A24 24 0 0 1 4 72V28A24 24 0 0 1 28 4Zm7 32h30a10 10 0 0 1 10 10v8a10 10 0 0 1-10 10H35a10 10 0 0 1-10-10v-8a10 10 0 0 1 10-10Z"
          />
        </svg>
        <span className="font-sans-ui text-[23px] leading-none font-semibold tracking-[-0.03em] text-[#141820]">
          CubbyDB
        </span>
      </Link>

      <nav className="flex items-center gap-1.5 text-[14.5px]">
        <Link
          href="/#ask-ai"
          className="hidden rounded-full px-4 py-[9px] text-[rgba(27,31,38,0.7)] transition-colors hover:text-[#1aa35e] sm:inline-block"
        >
          Features
        </Link>
        <Link
          href="/pricing"
          className="rounded-full px-4 py-[9px] text-[rgba(27,31,38,0.7)] transition-colors hover:text-[#1aa35e]"
        >
          Pricing
        </Link>
        <a
          href={macDownload.href}
          className="rounded-full border border-[rgba(27,31,38,0.09)] bg-[rgba(255,255,255,0.7)] px-4 py-[9px] text-[#1b1f26] transition-colors hover:text-[#1aa35e]"
          {...(macDownload.isDirectAsset
            ? { download: true }
            : { target: "_blank", rel: "noreferrer" })}
        >
          Download
        </a>
      </nav>
    </div>
  );
}
