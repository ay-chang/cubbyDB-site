import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — CubbyDB",
  description: "The terms that govern your use of CubbyDB and cubbydb.com.",
};

const EFFECTIVE_DATE = "August 11, 2026";

// TODO(you): replace with your actual name or business entity, and a real
// contact address, before publishing. A Terms of Service is a contract
// between your users and a specific legal person — it can't name a
// placeholder.
const RESPONSIBLE_PARTY = "[your name or business entity]";
const CONTACT_EMAIL = "[contact email]";

const SECTIONS: { id: string; title: string }[] = [
  { id: "introduction", title: "Introduction" },
  { id: "the-software", title: "The Software" },
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
              CubbyDB is free, open-source desktop software, licensed under the MIT License. It
              runs locally on your own device and connects directly to the database and any
              third-party services you configure — it does not route your database connections,
              queries, or results through servers we operate.
            </p>
            <p>
              Your use, copying, modification, and distribution of CubbyDB&rsquo;s source code are
              governed by the MIT License included with the repository, not by these Terms. These
              Terms instead cover your use of the built application and this website, including the
              disclaimers and limits below.
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
              any claim arising from the Services will not exceed the amount you paid us to use
              them, which, for the free and open-source CubbyDB application, is zero.
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
