import {
  AppleLogoIcon,
  LinuxLogoIcon,
  WindowsLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";
import { Reveal } from "./reveal";

const RELEASES = "https://github.com/ay-chang/cubbyDB-releases/releases/latest";

export function DownloadSection() {
  return (
    <section
      id="download"
      className="relative border-t border-line-soft px-6 py-28 text-center md:py-40"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="mx-auto max-w-[14ch] font-display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.02] tracking-[-0.025em]">
            point it at a database
          </h2>
          <p className="mx-auto mt-7 max-w-[48ch] text-[15px] leading-relaxed text-ink-muted">
            Installers for all three desktops are published to GitHub Releases,
            and the app checks for a newer one on launch.
          </p>
        </Reveal>

        <Reveal
          index={1}
          className="mt-11 flex flex-wrap items-center justify-center gap-2.5"
        >
          <Button href={RELEASES}>
            <AppleLogoIcon size={13} weight="fill" />
            Download for macOS
          </Button>
          <Button href={RELEASES} variant="outline">
            <WindowsLogoIcon size={13} weight="fill" />
            Windows
          </Button>
          <Button href={RELEASES} variant="outline">
            <LinuxLogoIcon size={13} weight="fill" />
            Linux
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
