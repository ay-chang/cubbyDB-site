import { Reveal } from "./reveal";

/**
 * The one dark plate on the page. It exists to break the grey and to give the
 * positioning claim somewhere to land at full size. Not a testimonial: there
 * is no customer to quote yet, and inventing one would be worse than saying it
 * plainly in the product's own voice.
 */
export function Statement() {
  return (
    <section className="relative px-6 pb-28 md:pb-40">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="overflow-hidden rounded-md bg-ink-block px-8 py-20 md:px-16 md:py-28">
          <p className="label text-white/60">The whole pitch</p>

          <p className="mt-10 max-w-[17ch] text-[clamp(2.25rem,6vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
            No seat count. No login. No trial timer.
          </p>

          <div className="mt-14 grid max-w-[62ch] grid-cols-1 gap-8 sm:grid-cols-2">
            <p className="text-[15px] leading-relaxed text-white/65">
              The paid clients are good software. They are also a subscription
              and a licence server. CubbyDB is a desktop app you download once
              and keep.
            </p>
            <p className="text-[15px] leading-relaxed text-white/65">
              Saved connections, tabs, and query history live in a local file.
              The only thing it reaches out for is the update check on launch.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
