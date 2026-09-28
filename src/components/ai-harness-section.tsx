import { ChapterHeading } from "./chapter-heading";
import { DemoVideo } from "./demo-video";

/**
 * Chapter 01. The opener is light-only — it is long gone off the top before
 * the transition starts — but this chapter's tail (the media plate and the
 * two-up row) is inside data-mode-flip, so it changes mode along with the
 * rest of the page.
 *
 * That is what keeps the runway short. The ramp has to start while nothing
 * light-only is still on screen; when the tail was written for light mode
 * that meant waiting for it to clear the top entirely, and the only way to
 * buy the flip enough room was a very long blank runway between the
 * chapters. A tail that stays legible in both modes lets the ramp begin
 * while it is still on screen, so the padding below is now just chapter
 * rhythm rather than a window the transition has to fit inside.
 *
 * The two-up row carries data-scroll-light-end: ScrollBackdrop reads its
 * bounding box every frame to place the ramp.
 */
export function AiHarnessSection() {
  return (
    <section className="relative z-[1] mt-[150px] pb-[min(12vh,120px)]">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <ChapterHeading
          number="01"
          kicker="The AI harness"
          title="The best AI in any database client."
          lede="Schema-aware, read-only by construction, and open source so you can see exactly what it sends. Bring your own key or sign in with Codex — every request shows the tables it included, and nothing it produces can modify your data."
        />
      </div>

      <div data-mode-flip>
      {/* Capped narrower than the content column on purpose. The recording is
          1920px wide, and at the full 1240px column a 2x display asks for
          ~2320px — so it was being upscaled ~1.2x and looked soft. 1000px
          lands it at roughly 1:1. */}
      <div className="mx-auto max-w-[1040px] px-5 md:px-10 pt-[72px]">
        <DemoVideo
          src="/marketing/ai-demo-light.mp4"
          label="Screen recording of both AI features: connecting a Claude account, asking the assistant questions about the data and seeing the SQL it ran, then toggling ✦ in the filter bar to turn a plain-English prompt into a WHERE clause that re-filters the grid."
        />
      </div>

      <div
        data-scroll-light-end
        className="mx-auto max-w-[1240px] px-5 md:px-10 pt-16"
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-[72px]">
          <div className="flex max-w-[44ch] flex-col gap-[14px]">
            <h3
              className="font-sans-ui text-[22px] leading-[1.28] font-semibold tracking-[-0.02em]"
              style={{ color: "var(--flip-ink)" }}
            >
              English in, SQL in the same box
            </h3>
            <p
              className="text-[16.5px] leading-[1.75]"
              style={{ color: "var(--flip-body)" }}
            >
              Toggle ✦ inside the filter bar, or ⌘I while it&rsquo;s focused.
              Describe the rows you want; the predicate lands in the WHERE
              field and the bar flips back to SQL mode — what ran is right
              there to read, tweak, or clear like anything you typed. If it
              can&rsquo;t be a filter on this table, it says so and changes
              nothing.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-3 rounded-2xl border px-[18px] py-4"
              style={{
                backgroundColor: "var(--flip-card-1)",
                borderColor: "var(--flip-border-2)",
                boxShadow:
                  "0 1px 2px var(--flip-card-shadow-near), 0 20px 44px -26px var(--flip-card-shadow-far)",
              }}
            >
              <span className="text-[13px]" style={{ color: "var(--flip-accent)" }}>
                ✦
              </span>
              <span
                className="font-mono text-[12.5px]"
                style={{ color: "var(--flip-ink)" }}
              >
                orders over $100 last week
              </span>
            </div>
            <div
              className="flex justify-center text-[14px]"
              style={{ color: "var(--flip-muted)" }}
            >
              ↓
            </div>
            <div
              className="flex items-center gap-3 rounded-2xl border px-[18px] py-4"
              style={{
                backgroundColor: "var(--flip-card-1)",
                borderColor: "var(--flip-border-2)",
                boxShadow:
                  "0 1px 2px var(--flip-card-shadow-near), 0 20px 44px -26px var(--flip-card-shadow-far)",
              }}
            >
              <span
                className="font-mono text-[11.5px] tracking-[0.08em]"
                style={{ color: "var(--flip-accent)" }}
              >
                WHERE
              </span>
              <span
                className="font-mono text-[12.5px]"
                style={{ color: "var(--flip-ink)" }}
              >
                total &gt; 100 AND created_at &gt;= now() - interval &apos;7
                days&apos;
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
