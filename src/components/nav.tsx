"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./ui/logo";
import type { getMacDownload } from "@/lib/releases";

/**
 * Empty while the page is hero-only: every section anchor these pointed at is
 * unmounted, and a nav that scrolls nowhere is worse than no nav. Repopulate
 * when sections come back.
 */
const SECTIONS: { href: string; label: string }[] = [];

type NavProps = {
  macDownload: Awaited<ReturnType<typeof getMacDownload>>;
};

/**
 * Plain mono type rather than boxed pills. With the outer rule gone there is
 * nothing for a bordered chip to sit on, and five separate outlines across the
 * top of the page competed with the headline underneath them.
 *
 * The only bordered thing left is the primary action, which is the one item
 * that should read as pressable.
 */
export function Nav({ macDownload }: NavProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="flex items-center justify-between px-6 py-5 md:px-10"
        style={{
          // A wash rather than a hard bar: the canvas fades in behind the
          // chrome once content is scrolling under it, so the labels stay
          // readable without drawing an edge across the page.
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--canvas) 82%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
          transition:
            "background-color 260ms cubic-bezier(0.23, 1, 0.32, 1), backdrop-filter 260ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <a href="#top" className="pressable" aria-label="CubbyDB, back to top">
          <Logo size={22} />
        </a>

        {SECTIONS.length > 0 && (
          <nav className="hidden items-center gap-8 md:flex">
            {SECTIONS.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="pressable label text-ink-muted hover:text-ink"
              >
                {section.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ay-chang/cubbyDB"
            target="_blank"
            rel="noreferrer"
            className="pressable label hidden text-ink-muted hover:text-ink sm:block"
          >
            GitHub
          </a>
          <a
            href={macDownload.href}
            className="pressable label flex h-8 items-center gap-1.5 rounded-xs border border-ink-block bg-ink-block px-3.5 text-canvas hover:bg-ink"
            // A resolved asset link downloads on click and shouldn't get the
            // new-tab treatment; the releases-page fallback is a real page
            // and should, same as any other external link.
            {...(macDownload.isDirectAsset
              ? { download: true }
              : { target: "_blank", rel: "noreferrer" })}
          >
            <ArrowRightIcon size={11} weight="bold" />
            Download
          </a>
        </div>
      </div>
    </header>
  );
}
