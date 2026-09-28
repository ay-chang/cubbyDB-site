import Image from "next/image";
import { SiteHeader } from "./site-header";
import type { getMacDownload } from "@/lib/releases";

type HeroProps = {
  macDownload: Awaited<ReturnType<typeof getMacDownload>>;
};

/**
 * Header, headline, CTAs, and the product shot, on the flat page colour
 * (#fbfbfc, set on body).
 */
export function Hero({ macDownload }: HeroProps) {
  return (
    <section id="top" className="relative z-[1]">
      <SiteHeader macDownload={macDownload} />

      <div className="relative z-[3] mx-auto max-w-[1320px] px-5 pt-[84px] text-center sm:px-7">
        <h1 className="mx-auto max-w-[26ch] text-balance font-serif-hero text-[clamp(2.5rem,4.9vw,4.1rem)] leading-[1.06] tracking-[-0.005em] text-[#141820]">
          Built for how you actually use a database.
        </h1>
        <p className="mx-auto mt-[26px] max-w-[78ch] text-balance text-[17px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
          Including the best AI harness in any database client — schema-aware,
          read-only by construction, and open source so you can see exactly
          what it sends.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={macDownload.href}
            {...(macDownload.isDirectAsset
              ? { download: true }
              : { target: "_blank", rel: "noreferrer" })}
            className="rounded-full bg-[#141820] px-8 py-4 text-[15.5px] font-medium text-white"
            style={{ boxShadow: "0 16px 34px -16px rgba(20,24,32,0.6)" }}
          >
            Download for macOS
          </a>
          <a
            href="https://github.com/ay-chang/cubbyDB"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[rgba(27,31,38,0.14)] bg-[rgba(255,255,255,0.72)] px-8 py-4 text-[15.5px] font-medium text-[#141820]"
          >
            View source
          </a>
        </div>
        <p className="mt-[22px] text-[13.5px] text-[rgba(27,31,38,0.5)]">
          Free and open source · macOS, Windows, Linux
        </p>
      </div>

      <div className="relative z-[3] mx-auto max-w-[1240px] px-5 pt-[76px] sm:px-7">
        <div
          className="rounded-t-[20px] border border-b-0 border-[rgba(27,31,38,0.08)] bg-white p-2 pb-0"
          style={{ boxShadow: "0 50px 110px -55px rgba(38,50,80,0.55)" }}
        >
          <Image
            src="/marketing/app-light.webp"
            alt="CubbyDB browsing the recipes table: schema tree on the left, a WHERE filter bar above an editable results grid."
            width={2000}
            height={1250}
            quality={90}
            preload
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="block h-auto w-full rounded-t-[13px]"
          />
        </div>
      </div>
    </section>
  );
}
