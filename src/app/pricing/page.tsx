import type { Metadata } from "next";
import { CheckIcon, EnvelopeSimpleIcon, KeyIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { HeroHeadline, Rise } from "@/components/hero-motion";
import { Reveal } from "@/components/reveal";
import { getMacDownload } from "@/lib/releases";
import {
  CHECKOUT_URL,
  CUSTOMER_PORTAL_URL,
  MAX_COMPUTERS,
  PRICE,
  RELEASES_URL,
  SUPPORT_EMAIL,
  TRIAL_DAYS,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing — CubbyDB",
  description: `Try CubbyDB free for ${TRIAL_DAYS} days, then buy it once for ${PRICE}. No subscription, every future update included.`,
};

const INCLUDED = [
  "SQL editor with autocomplete, formatting, and EXPLAIN",
  "Editable results grid, filters, import and export",
  "Ask AI — schema-aware and read-only by construction",
  "Cubbies, saved queries, history, and the command palette",
  `Use it on up to ${MAX_COMPUTERS} of your computers`,
  "Every future update, at no extra cost",
];

const STEPS = [
  {
    icon: DownloadSimpleIcon,
    title: `Try it free for ${TRIAL_DAYS} days`,
    body: "Download CubbyDB and use every feature. No account, no card.",
  },
  {
    icon: EnvelopeSimpleIcon,
    title: "Buy a license",
    body: "Checkout takes a minute. Your license key arrives by email right away.",
  },
  {
    icon: KeyIcon,
    title: "Paste in your key",
    body: "In CubbyDB, open Settings → License and activate. That's it — it's yours.",
  },
];

const FAQS = [
  {
    q: "Is this a subscription?",
    a: `No. You pay ${PRICE} once and CubbyDB is yours to keep, including every future update.`,
  },
  {
    q: "What happens when the trial ends?",
    a: `After ${TRIAL_DAYS} days CubbyDB asks for a license key before you can keep using it. Nothing is deleted — your connections, saved queries, and history are all there the moment you activate.`,
  },
  {
    q: "How many computers can I use it on?",
    a: `Up to ${MAX_COMPUTERS} of your own — say a work laptop, a personal laptop, and a desktop. Moving to a new machine? Remove the license in Settings on the old one to free its slot. For a team, buy one license per person.`,
  },
  {
    q: "Does the AI assistant cost extra?",
    a: "No. Ask AI is included. It runs on your own Anthropic or OpenAI API key, or your existing ChatGPT or Claude subscription, so there's nothing more to pay us.",
  },
  {
    q: "Which platforms are supported?",
    a: "macOS (Apple silicon and Intel), Windows, and Linux. One license covers all of them.",
  },
  {
    q: "What if it's not for me?",
    a: `Email ${SUPPORT_EMAIL} within 30 days of buying for a full refund, no questions asked.`,
  },
  {
    q: "I lost my license key.",
    a: "Find it again anytime in the customer portal linked from your receipt, or email us and we'll send it over.",
  },
];

export default async function PricingPage() {
  const macDownload = await getMacDownload();
  const downloadProps = macDownload.isDirectAsset
    ? { download: true }
    : { target: "_blank", rel: "noreferrer" };

  return (
    <div className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(34,197,94,0.14), rgba(34,197,94,0) 70%)",
        }}
      />
      <SiteHeader macDownload={macDownload} />

      <main className="relative z-[2]">
        <section className="mx-auto max-w-[1180px] px-5 pt-[64px] text-center sm:px-7">
          <Rise>
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#1aa35e] uppercase">
              Pricing
            </p>
          </Rise>
          <HeroHeadline
            className="mx-auto mt-5 max-w-[18ch] text-balance font-serif-hero text-[clamp(2.6rem,5vw,4.3rem)] leading-[1.04] tracking-[-0.01em] text-[#141820]"
            words={[
              { text: "One" },
              { text: "price." },
              { text: "Yours" },
              { text: "for", italic: true },
              { text: "good.", italic: true },
            ]}
          />
          <Rise delay={0.4}>
            <p className="mx-auto mt-6 max-w-[54ch] text-balance text-[18px] leading-[1.6] text-[rgba(27,31,38,0.58)]">
              Try every feature free for {TRIAL_DAYS} days. When you&rsquo;re ready, a single
              purchase unlocks CubbyDB for life — no subscription, no seats, no renewals.
            </p>
          </Rise>
        </section>

        <Rise delay={0.55} distance={32} className="mx-auto max-w-[980px] px-5 pt-14 sm:px-7">
          <div
            className="grid overflow-hidden rounded-[24px] border border-[rgba(27,31,38,0.09)] bg-white md:grid-cols-[1fr_1.15fr]"
            style={{ boxShadow: "0 50px 110px -60px rgba(38,50,80,0.5)" }}
          >
            <div className="flex flex-col justify-between gap-10 border-b border-[rgba(27,31,38,0.08)] p-8 sm:p-10 md:border-r md:border-b-0">
              <div>
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 100 100" width={26} height={26} aria-hidden="true">
                    <path
                      fill="#22c55e"
                      fillRule="evenodd"
                      d="M28 4h44a24 24 0 0 1 24 24v44a24 24 0 0 1-24 24H28A24 24 0 0 1 4 72V28A24 24 0 0 1 28 4Zm7 32h30a10 10 0 0 1 10 10v8a10 10 0 0 1-10 10H35a10 10 0 0 1-10-10v-8a10 10 0 0 1 10-10Z"
                    />
                  </svg>
                  <span className="font-sans-ui text-[19px] font-semibold tracking-[-0.03em] text-[#141820]">
                    CubbyDB
                  </span>
                  <span className="ml-1 rounded-full bg-[#e4f3ea] px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-[#0f7a37] uppercase">
                    Lifetime
                  </span>
                </div>
                <div className="mt-8 flex items-end gap-2">
                  <span className="font-serif-hero text-[76px] leading-[0.9] text-[#141820]">
                    {PRICE}
                  </span>
                  <span className="pb-2 text-[15px] text-[rgba(27,31,38,0.55)]">
                    one time
                  </span>
                </div>
                <p className="mt-3 text-[14.5px] leading-[1.55] text-[rgba(27,31,38,0.58)]">
                  Pay once, keep it forever. Taxes are calculated at checkout.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={CHECKOUT_URL}
                  className="pressable rounded-full bg-[#141820] px-8 py-4 text-center text-[15.5px] font-medium text-white hover:-translate-y-px hover:bg-[#232833]"
                  style={{ boxShadow: "0 16px 34px -16px rgba(20,24,32,0.6)" }}
                >
                  Buy CubbyDB
                </a>
                <a
                  href={macDownload.href}
                  {...downloadProps}
                  className="pressable rounded-full border border-[rgba(27,31,38,0.14)] px-8 py-4 text-center text-[15.5px] font-medium text-[#141820] hover:border-[rgba(27,31,38,0.28)]"
                >
                  Start {TRIAL_DAYS}-day free trial
                </a>
                <p className="mt-1 text-center text-[12.5px] text-[rgba(27,31,38,0.45)]">
                  Secure checkout by Polar · 30-day refund
                </p>
              </div>
            </div>

            <div className="bg-[#fbfbfc] p-8 sm:p-10">
              <p className="font-mono text-[10.5px] tracking-[0.16em] text-[rgba(27,31,38,0.5)] uppercase">
                Everything included
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.45] text-[#1b1f26]">
                    <span className="mt-[1px] flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e4f3ea]">
                      <CheckIcon size={12} weight="bold" className="text-[#0f7a37]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-[rgba(27,31,38,0.08)] pt-6 text-[13.5px] leading-[1.55] text-[rgba(27,31,38,0.55)]">
                macOS, Windows, and Linux — one license covers all three.{" "}
                <a
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#141820] underline decoration-[rgba(27,31,38,0.25)] underline-offset-4 transition-colors hover:text-[#1aa35e]"
                >
                  All downloads
                </a>
              </p>
            </div>
          </div>
        </Rise>

        <section className="mx-auto max-w-[1080px] px-5 pt-[140px] sm:px-7">
          <Reveal>
            <h2 className="text-center font-serif-hero text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] text-[#141820]">
              How it works
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} index={i}>
                <div className="h-full rounded-[20px] border border-[rgba(27,31,38,0.08)] bg-white p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#e4f3ea]">
                      <step.icon size={19} className="text-[#0f7a37]" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.16em] text-[rgba(27,31,38,0.35)]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[17px] font-medium text-[#141820]">{step.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-[rgba(27,31,38,0.58)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[760px] px-5 pt-[140px] pb-[120px] sm:px-7">
          <Reveal>
            <h2 className="text-center font-serif-hero text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] text-[#141820]">
              Questions
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-[rgba(27,31,38,0.08)] border-y border-[rgba(27,31,38,0.08)]">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium text-[#141820] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-[20px] leading-none text-[rgba(27,31,38,0.4)] transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-10 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center text-[14px] text-[rgba(27,31,38,0.55)]">
            Something else?{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[#141820] underline decoration-[rgba(27,31,38,0.25)] underline-offset-4 hover:text-[#1aa35e]"
            >
              {SUPPORT_EMAIL}
            </a>
            {" · "}
            <a
              href={CUSTOMER_PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[#141820] underline decoration-[rgba(27,31,38,0.25)] underline-offset-4 hover:text-[#1aa35e]"
            >
              Customer portal
            </a>
          </p>
        </section>
      </main>

      <Footer macDownload={macDownload} />
    </div>
  );
}
