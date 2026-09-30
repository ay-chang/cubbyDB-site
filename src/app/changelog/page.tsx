import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { CHANGELOG } from "@/lib/changelog";
import { getMacDownload } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Changelog — CubbyDB",
  description: "Everything new in each version of CubbyDB, the Postgres client for Mac, Windows, and Linux.",
};

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default async function ChangelogPage() {
  const macDownload = await getMacDownload();

  return (
    <div className="relative overflow-x-clip">
      <SiteHeader macDownload={macDownload} />

      <main className="relative mx-auto max-w-[980px] px-5 pt-[64px] pb-[120px] sm:px-7">
        <p className="font-mono text-[11px] tracking-[0.18em] text-[#1aa35e] uppercase">
          Changelog
        </p>
        <h1 className="mt-5 font-serif-hero text-[clamp(2.6rem,5vw,4rem)] leading-[1.04] text-[#141820]">
          What&rsquo;s new in CubbyDB
        </h1>
        <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
          Every update is free for everyone with a license. CubbyDB tells you when a new version
          is ready and installs it in one click.
        </p>

        <ol className="mt-16 flex flex-col">
          {CHANGELOG.map((entry) => (
            <li
              key={entry.version}
              id={`v${entry.version}`}
              className="grid scroll-mt-10 gap-4 border-t border-[rgba(27,31,38,0.08)] py-12 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10"
            >
              <div className="md:sticky md:top-10 md:self-start">
                <p className="font-sans-ui text-[20px] font-semibold tracking-[-0.02em] text-[#141820]">
                  {entry.version}
                </p>
                <p className="mt-1 font-mono text-[12px] text-[rgba(27,31,38,0.45)]">
                  <time dateTime={entry.date}>{DATE_FORMAT.format(new Date(entry.date))}</time>
                </p>
              </div>
              <div className="flex min-w-0 flex-col gap-8">
                {entry.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-[16px] font-medium text-[#141820]">{section.heading}</h2>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.68)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#22c55e]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </main>

      <Footer macDownload={macDownload} />
    </div>
  );
}
