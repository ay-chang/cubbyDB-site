import type { Metadata } from "next";
import { MAX_COMPUTERS, SUPPORT_EMAIL, TRIAL_DAYS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Terms of Service — CubbyDB",
  description: "The terms that govern your use of CubbyDB and cubbydb.com.",
};

const EFFECTIVE_DATE = "September 28, 2026";

// A Terms of Service is a contract between your users and a specific legal
// person — switch this to a business entity if you form one.
const RESPONSIBLE_PARTY = "Allen Chang";
const CONTACT_EMAIL = SUPPORT_EMAIL;

const SECTIONS: { id: string; title: string }[] = [
  { id: "introduction", title: "Introduction" },
  { id: "the-software", title: "The Software" },
  { id: "license", title: "Your License" },
  { id: "purchases", title: "Purchases and Refunds" },
  { id: "ai-providers", title: "AI Features and Third-Party Providers" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to These Terms" },
  { id: "contact", title: "Contact" },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[760px] px-6 pb-32 pt-32 md:px-10">
      <p className="label text-ink-soft">Legal</p>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-5xl">
        Terms of Service
      </h1>
      <p className="label mt-4 text-ink-muted">
        Effective and last updated: {EFFECTIVE_DATE}
      </p>

      <nav className="mt-10 rounded-md border border-line-soft bg-panel-bright p-5">
        <p className="label text-ink-soft">On this page</p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="pressable text-sm text-ink-muted hover:text-ink"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-14 flex flex-col gap-14">
        <section id="introduction">
          <h2 className="text-xl font-medium text-ink">Introduction</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) are an agreement between you and{" "}
              {RESPONSIBLE_PARTY} (&ldquo;CubbyDB,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;), governing your use of the CubbyDB desktop application and the
              cubbydb.com website (together, the &ldquo;Services&rdquo;).
            </p>
            <p>
              By downloading, installing, or using CubbyDB, or by using cubbydb.com, you agree to
              these Terms. If you do not agree, do not use the Services.
            </p>
          </div>
        </section>

        <section id="the-software">
          <h2 className="text-xl font-medium text-ink">The Software</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              CubbyDB is proprietary desktop software. It runs locally on your own device and
              connects directly to the database and any third-party services you configure — it
              does not route your database connections, queries, or results through servers we
              operate. The only information it sends us is what&rsquo;s needed to activate and
              periodically re-check a license key.
            </p>
            <p>
              You may use CubbyDB free of charge for a {TRIAL_DAYS}-day evaluation period starting
              from its first launch. Continuing to use it after that period requires a license.
            </p>
          </div>
        </section>

        <section id="license">
          <h2 className="text-xl font-medium text-ink">Your License</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              CubbyDB is licensed, not sold. Buying a license gives you a personal, perpetual,
              non-exclusive, non-transferable right to use CubbyDB on up to {MAX_COMPUTERS} devices
              that you own or control, including updates we release in the future. A license is for
              one person; each member of a team needs their own.
            </p>
            <p>
              You may not share or resell your license key, or copy, modify, reverse engineer,
              decompile, or redistribute CubbyDB, or circumvent its trial or licensing checks,
              except to the extent applicable law expressly permits it. We may deactivate a license
              key that has been shared publicly, refunded, or charged back.
            </p>
          </div>
        </section>

        <section id="purchases">
          <h2 className="text-xl font-medium text-ink">Purchases and Refunds</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              Licenses are sold through Polar Software, Inc., which acts as our merchant of record
              and reseller. Polar processes your payment and collects any applicable sales tax or
              VAT, and your purchase is also subject to Polar&rsquo;s terms.
            </p>
            <p>
              If CubbyDB isn&rsquo;t right for you, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="pressable text-ink hover:text-accent">
                {CONTACT_EMAIL}
              </a>{" "}
              within 30 days of your purchase for a full refund. A refunded license key is
              deactivated.
            </p>
          </div>
        </section>

        <section id="ai-providers">
          <h2 className="text-xl font-medium text-ink">AI Features and Third-Party Providers</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              CubbyDB includes an optional AI assistant that you may configure to use one of
              several providers: an Anthropic API key, an OpenAI API key, your own Codex CLI
              account, or your own Claude Code CLI account. You choose and authenticate with these
              providers yourself, directly with the provider — CubbyDB never receives, stores, or
              transmits your API keys or OAuth credentials to us, and we do not operate any server
              that your requests pass through.
            </p>
            <p>
              When you choose to connect a subscription-based provider (such as Codex or Claude
              Code) instead of an API key, you are using your own account under that provider&rsquo;s
              own terms of service and usage policies. Those policies can, and in some cases do,
              restrict how subscription or OAuth-based sign-in may be used by third-party software.
              It is your responsibility to review and comply with the terms of any AI provider you
              connect, including whether your intended use is permitted by that provider at all.
            </p>
            <p>
              CubbyDB is not affiliated with, endorsed by, or operated by Anthropic or OpenAI. We
              are not responsible for, and expressly disclaim any liability arising from, a
              provider&rsquo;s decision to throttle, suspend, or terminate your account, or otherwise
              limit your access, as a result of using it through CubbyDB or any other third-party
              tool. Enabling a subscription-based provider in CubbyDB is entirely optional and is
              done at your own discretion and risk.
            </p>
          </div>
        </section>

        <section id="acceptable-use">
          <h2 className="text-xl font-medium text-ink">Acceptable Use</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>You agree not to use the Services to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>violate applicable law or another person&rsquo;s rights;</li>
              <li>
                access, or attempt to access, data or systems you are not authorized to connect to;
              </li>
              <li>
                distribute malware or otherwise interfere with the security or integrity of
                cubbydb.com or its infrastructure; or
              </li>
              <li>
                misrepresent CubbyDB&rsquo;s affiliation with, or endorsement by, any third-party
                provider or service it can connect to.
              </li>
            </ul>
          </div>
        </section>

        <section id="disclaimers">
          <h2 className="text-xl font-medium text-ink">Disclaimers</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              The Services are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of
              any kind, express or implied, including warranties of merchantability, fitness for a
              particular purpose, and non-infringement. We do not warrant that CubbyDB will be
              error-free, that any AI-generated output or SQL will be accurate, or that any
              third-party provider will remain available or accessible through CubbyDB.
            </p>
            <p>
              You are solely responsible for reviewing any SQL statement, including one suggested
              by the AI assistant, before running it against a database that matters to you.
            </p>
          </div>
        </section>

        <section id="liability">
          <h2 className="text-xl font-medium text-ink">Limitation of Liability</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              To the fullest extent permitted by law, {RESPONSIBLE_PARTY} will not be liable for
              any indirect, incidental, special, consequential, or punitive damages, or any loss of
              data, arising from your use of the Services — including, without limitation, any
              action a third-party AI provider takes against your account. Our total liability for
              any claim arising from the Services will not exceed the amount you paid for your
              CubbyDB license.
            </p>
          </div>
        </section>

        <section id="changes">
          <h2 className="text-xl font-medium text-ink">Changes to These Terms</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              We may update these Terms from time to time. When we make a material change, we will
              update the date at the top of this page, and CubbyDB may ask you to review and accept
              the updated Terms again before continuing to use a feature that requires acceptance.
            </p>
          </div>
        </section>

        <section id="contact">
          <h2 className="text-xl font-medium text-ink">Contact</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
            <p>
              Questions about these Terms can be sent to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="pressable text-ink hover:text-accent">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
