import Link from "next/link";
import type { getMacDownload } from "@/lib/releases";
import { SUPPORT_EMAIL } from "@/lib/pricing";

type FooterProps = {
  macDownload: Awaited<ReturnType<typeof getMacDownload>>;
};

export function Footer({ macDownload }: FooterProps) {
  const linkClass =
    "text-[rgba(27,31,38,0.6)] transition-colors hover:text-[#1aa35e]";

  return (
    <footer className="relative border-t border-[rgba(27,31,38,0.08)]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-6 px-5 py-8 text-[14px] sm:px-7">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 100 100" width={20} height={20} aria-hidden="true">
            <path
              fill="#22c55e"
              fillRule="evenodd"
              d="M28 4h44a24 24 0 0 1 24 24v44a24 24 0 0 1-24 24H28A24 24 0 0 1 4 72V28A24 24 0 0 1 28 4Zm7 32h30a10 10 0 0 1 10 10v8a10 10 0 0 1-10 10H35a10 10 0 0 1-10-10v-8a10 10 0 0 1 10-10Z"
            />
          </svg>
          <span className="font-sans-ui font-semibold tracking-[-0.03em] text-[#141820]">
            CubbyDB
          </span>
          <span className="ml-2 text-[rgba(27,31,38,0.45)]">
            A Postgres client for macOS, Windows, and Linux
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/features" className={linkClass}>
            Features
          </Link>
          <Link href="/pricing" className={linkClass}>
            Pricing
          </Link>
          <a
            href={macDownload.href}
            className={linkClass}
            {...(macDownload.isDirectAsset
              ? { download: true }
              : { target: "_blank", rel: "noreferrer" })}
          >
            Download
          </a>
          <Link href="/changelog" className={linkClass}>
            Changelog
          </Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
            Support
          </a>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
          <Link href="/terms" className={linkClass}>
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
