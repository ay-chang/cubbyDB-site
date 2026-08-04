import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";
import { Reveal } from "./reveal";
import { HeroShot } from "./hero-shot";
import type { getMacDownload } from "@/lib/releases";

type HeroProps = {
  macDownload: Awaited<ReturnType<typeof getMacDownload>>;
};

/**
 * Headline, one line of support, two actions, then the product. Nothing in the
 * margins: the corner statistics and the rule caption went with the frame, and
 * without them the screenshot is the only thing competing with the headline,
 * which is the point.
 */
export function Hero({ macDownload }: HeroProps) {
  return (
    // Bottom padding lives here rather than on the shot: with the page trimmed
    // to hero-and-footer, the capture would otherwise sit flush on the footer
    // rule.
    <section id="top" className="relative pb-28 md:pb-40">
      <div className="mx-auto max-w-[1500px] px-6 pt-28 text-center md:pt-32">
        <Reveal>
          <h1 className="mx-auto max-w-[16ch] text-[clamp(2.5rem,6.2vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.045em] text-balance">
            The Postgres client you stop noticing.
          </h1>
        </Reveal>

        <Reveal index={1}>
          <p className="mx-auto mt-7 max-w-[46ch] text-[16px] leading-relaxed text-ink-muted">
            Schema tree, SQL editor, editable results grid. Free, open source,
            and native on every desktop.
          </p>
        </Reveal>

        <Reveal
          index={2}
          className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
        >
          <Button
            href={macDownload.href}
            download={macDownload.isDirectAsset}
          >
            <ArrowRightIcon size={11} weight="bold" />
            Download for macOS
          </Button>
          <Button href="https://github.com/ay-chang/cubbyDB" variant="outline">
            View source
          </Button>
        </Reveal>
      </div>

      <HeroShot />
    </section>
  );
}
