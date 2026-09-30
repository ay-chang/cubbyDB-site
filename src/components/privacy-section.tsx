import Link from "next/link";
import {
  EyeSlashIcon,
  IdentificationCardIcon,
  KeyIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { SectionIntro } from "./section-intro";

const PROMISES = [
  {
    icon: IdentificationCardIcon,
    title: "No account",
    body: "Download it and go. There's nothing to sign up for and nothing to log in to.",
  },
  {
    icon: EyeSlashIcon,
    title: "No tracking",
    body: "CubbyDB doesn't collect analytics or send anything about how you use it.",
  },
  {
    icon: KeyIcon,
    title: "Credentials stay local",
    body: "Passwords and API keys are saved on your computer and nowhere else.",
  },
  {
    icon: SparkleIcon,
    title: "AI only when you ask",
    body: "Nothing goes to an AI provider until you use Ask AI, and then only to the one you chose.",
  },
];

export function PrivacySection() {
  return (
    <section id="privacy" className="relative px-5 pt-[160px] sm:px-7">
      <div className="mx-auto max-w-[1180px]">
        <SectionIntro
          eyebrow="Privacy"
          title="Your data stays on your computer."
          lede="CubbyDB connects straight to your database. Your queries and results never pass through a server of ours."
        />
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PROMISES.map((item, i) => (
            <Reveal key={item.title} index={i}>
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#e7f5ec] text-[#15803d]">
                <item.icon size={18} weight="bold" />
              </span>
              <h3 className="mt-4 font-sans-ui text-[16.5px] font-semibold tracking-[-0.01em] text-[#141820]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[rgba(27,31,38,0.6)]">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link
            href="/privacy"
            className="text-[14.5px] text-[#141820] underline decoration-[rgba(27,31,38,0.25)] underline-offset-4 transition-colors hover:text-[#1aa35e]"
          >
            Read the privacy policy
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
