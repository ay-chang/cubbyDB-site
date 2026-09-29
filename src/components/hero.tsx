import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./site-header";
import { HeroHeadline, Rise } from "./hero-motion";
import type { getMacDownload } from "@/lib/releases";
import { PRICE, TRIAL_DAYS } from "@/lib/pricing";

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
        <Rise>
          <p className="font-mono text-[11px] tracking-[0.18em] text-[#1aa35e] uppercase">
            Postgres client for Mac, Windows and Linux
          </p>
        </Rise>
        <HeroHeadline
          className="mx-auto mt-5 max-w-[22ch] text-balance font-serif-hero text-[clamp(2.7rem,5.4vw,4.6rem)] leading-[1.04] tracking-[-0.01em] text-[#141820]"
          words={[
            { text: "A" },
            { text: "better" },
            { text: "home", italic: true },
            { text: "for" },
            { text: "your" },
            { text: "Postgres" },
            { text: "databases." },
          ]}
        />
        <Rise delay={0.55}>
          <p className="mx-auto mt-7 max-w-[60ch] text-balance text-[18px] leading-[1.6] text-[rgba(27,31,38,0.58)]">
            Browse, query, and edit your data in a client built for Postgres alone, with an AI
            assistant that can{" "}
            <span className="font-medium text-[#141820]">read everything and change nothing</span>.
          </p>
        </Rise>
        <Rise delay={0.7}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={macDownload.href}
              {...(macDownload.isDirectAsset
                ? { download: true }
                : { target: "_blank", rel: "noreferrer" })}
              className="pressable inline-block rounded-full bg-[#141820] px-8 py-4 text-[15.5px] font-medium text-white hover:-translate-y-px hover:bg-[#232833]"
              style={{ boxShadow: "0 16px 34px -16px rgba(20,24,32,0.6)" }}
            >
              Download free trial
            </a>
            <Link
              href="/pricing"
              className="pressable inline-block rounded-full border border-[rgba(27,31,38,0.14)] bg-[rgba(255,255,255,0.72)] px-8 py-4 text-[15.5px] font-medium text-[#141820] hover:-translate-y-px hover:border-[rgba(27,31,38,0.28)] hover:bg-white"
            >
              Buy once for {PRICE}
            </Link>
          </div>
          <p className="mt-[22px] text-[13.5px] text-[rgba(27,31,38,0.5)]">
            {TRIAL_DAYS} days free with full access · Then {PRICE} once, no subscription
          </p>
        </Rise>
      </div>

      <Rise
        delay={0.9}
        distance={48}
        className="relative z-[3] mx-auto max-w-[1240px] px-5 pt-[76px] sm:px-7"
      >
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
      </Rise>
    </section>
  );
}
