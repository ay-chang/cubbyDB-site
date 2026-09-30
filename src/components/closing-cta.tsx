import Link from "next/link";
import type { getMacDownload } from "@/lib/releases";
import { PRICE, RELEASES_URL, TRIAL_DAYS } from "@/lib/pricing";
import { Reveal } from "./reveal";

type ClosingCtaProps = {
  macDownload: Awaited<ReturnType<typeof getMacDownload>>;
};

export function ClosingCta({ macDownload }: ClosingCtaProps) {
  return (
    <section className="relative px-5 pt-[180px] pb-24 sm:px-7">
      <Reveal variant="scale" className="mx-auto max-w-[1180px]">
        <div
          className="relative overflow-hidden rounded-[32px] bg-[#141820] px-6 py-20 text-center sm:px-12 sm:py-24"
          style={{
            backgroundImage:
              "radial-gradient(70% 90% at 50% 0%, rgba(34,197,94,0.22), rgba(34,197,94,0) 65%)",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            width={44}
            height={44}
            aria-hidden="true"
            className="mx-auto block"
          >
            <path
              fill="#22c55e"
              fillRule="evenodd"
              d="M28 4h44a24 24 0 0 1 24 24v44a24 24 0 0 1-24 24H28A24 24 0 0 1 4 72V28A24 24 0 0 1 28 4Zm7 32h30a10 10 0 0 1 10 10v8a10 10 0 0 1-10 10H35a10 10 0 0 1-10-10v-8a10 10 0 0 1 10-10Z"
            />
          </svg>
          <h2 className="mx-auto mt-8 max-w-[18ch] text-balance font-serif-hero text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[1.04] text-white">
            Try it on your own database.
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-[17px] leading-[1.6] text-[rgba(255,255,255,0.6)]">
            Every feature is free for {TRIAL_DAYS} days, with no account and no card. If it earns
            a place in your day, it&rsquo;s {PRICE} once.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={macDownload.href}
              {...(macDownload.isDirectAsset
                ? { download: true }
                : { target: "_blank", rel: "noreferrer" })}
              className="pressable rounded-full bg-white px-8 py-4 text-[15.5px] font-medium text-[#141820] hover:bg-[#eef2ef]"
            >
              Download free trial
            </a>
            <Link
              href="/pricing"
              className="pressable rounded-full border border-[rgba(255,255,255,0.18)] px-8 py-4 text-[15.5px] font-medium text-white hover:border-[rgba(255,255,255,0.35)]"
            >
              Buy once for {PRICE}
            </Link>
          </div>
          <p className="mt-6 text-[13.5px] text-[rgba(255,255,255,0.4)]">
            {macDownload.version && <>Version {macDownload.version} · </>}
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-[rgba(255,255,255,0.25)] underline-offset-4 transition-colors hover:text-white"
            >
              Windows &amp; Linux
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
