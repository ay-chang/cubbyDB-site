import { Reveal } from "./reveal";
import { WordReveal } from "./word-reveal";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "center" | "left";
};

/**
 * The heading every section below the hero opens with: a small green eyebrow,
 * a serif title in the hero's face, and an optional lede. Deliberately the
 * same type ramp as the hero so the page reads as one piece.
 *
 * Enters in three beats: eyebrow, then the title word by word (the same
 * motion as the hero headline), then the lede once the title has mostly
 * landed.
 */
export function SectionIntro({
  eyebrow,
  title,
  lede,
  align = "center",
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto text-center" : ""}>
      <Reveal>
        <p className="text-[14px] font-medium text-[#1aa35e]">{eyebrow}</p>
      </Reveal>
      <h2
        className={`mt-4 max-w-[20ch] text-balance font-serif-hero text-[clamp(2.2rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.005em] text-[#141820] ${centered ? "mx-auto" : ""}`}
      >
        <WordReveal text={title} delay={0.1} />
      </h2>
      {lede && (
        <Reveal delay={0.45}>
          <p
            className={`mt-5 max-w-[58ch] text-balance text-[17px] leading-[1.6] text-[rgba(27,31,38,0.6)] ${centered ? "mx-auto" : ""}`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
