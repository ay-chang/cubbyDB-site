import type { Metadata } from "next";
import Link from "next/link";
import { SUPPORT_EMAIL } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Privacy Policy — CubbyDB",
  description:
    "What CubbyDB stores, what it sends, and to whom. No accounts, no analytics, and your database never passes through our servers.",
};

const EFFECTIVE_DATE = "September 29, 2026";

// Same legal person as the Terms — change both together if you form a business.
const RESPONSIBLE_PARTY = "Allen Chang";
const CONTACT_EMAIL = SUPPORT_EMAIL;

const SECTIONS: { id: string; title: string }[] = [
  { id: "summary", title: "Summary" },
  { id: "on-your-computer", title: "What Stays on Your Computer" },
  { id: "network", title: "When CubbyDB Connects to the Internet" },
  { id: "not-collected", title: "What We Don't Collect" },
  { id: "purchases", title: "Purchases" },
  { id: "website", title: "The Website" },
  { id: "support", title: "Email Support" },
  { id: "sharing", title: "Who We Share Data With" },
  { id: "your-choices", title: "Your Choices and Rights" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact" },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2 className="text-xl font-medium text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[760px] px-6 pb-32 pt-32 md:px-10">
      <p className="label text-ink-soft">Legal</p>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-5xl">Privacy Policy</h1>
      <p className="label mt-4 text-ink-muted">Effective and last updated: {EFFECTIVE_DATE}</p>

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
        <Section id="summary" title="Summary">
          <p>
            This policy explains what information the CubbyDB desktop app and the cubbydb.com
            website handle, and who receives it. CubbyDB is made by {RESPONSIBLE_PARTY}
            (&ldquo;we,&rdquo; &ldquo;us&rdquo;).
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>CubbyDB has no user accounts and collects no analytics or usage data.</li>
            <li>
              It connects directly to your databases. Your connection details, queries, and results
              never pass through a server we operate.
            </li>
            <li>
              It goes online on its own only to check for updates and to check your license key.
            </li>
            <li>
              When you use Ask AI, the information needed to answer is sent to the AI provider you
              chose, and to no one else.
            </li>
          </ul>
        </Section>

        <Section id="on-your-computer" title="What Stays on Your Computer">
          <p>
            Everything you create in CubbyDB is saved only in the app&rsquo;s data folder on your
            computer: saved connections (including passwords and SSH settings), query history, saved
            queries, cubbies, AI chats and settings (including any AI API keys), trusted SSH host
            keys, and your license key. We can&rsquo;t see any of it.
          </p>
          <p>
            If you turn on the optional AI audit log, its record of what was sent to the AI provider
            is also kept only on your computer.
          </p>
        </Section>

        <Section id="network" title="When CubbyDB Connects to the Internet">
          <p>CubbyDB makes network connections in these situations only:</p>
          <ul className="flex list-disc flex-col gap-3 pl-5">
            <li>
              <strong className="font-medium text-ink">Your databases.</strong> CubbyDB connects to
              the databases and SSH hosts you set up, directly from your computer.
            </li>
            <li>
              <strong className="font-medium text-ink">Update checks.</strong> When it starts, and
              when you check manually, CubbyDB downloads a small file from GitHub describing the
              latest version. Updates themselves are downloaded from GitHub. GitHub receives the
              standard information any web request includes, such as your IP address.
            </li>
            <li>
              <strong className="font-medium text-ink">License checks.</strong> When you activate a
              license key, CubbyDB sends the key and your computer&rsquo;s name to Polar, our
              payment provider, so you can recognize your computers in the list of activations.
              About once a week afterward, it sends the key and its activation ID to Polar to confirm
              the license is still valid. During the free trial, nothing is sent.
            </li>
            <li>
              <strong className="font-medium text-ink">Ask AI and AI filters.</strong> When you use
              an AI feature, CubbyDB sends your question along with the context needed to answer it
              to the provider you chose: Anthropic or OpenAI with your own API key, or your Claude
              or ChatGPT subscription through the Claude Code or Codex tools. That context can
              include table and column names and types, sample rows and query results, and code
              from repositories you&rsquo;ve attached. The provider&rsquo;s own privacy policy
              applies to what it receives. We never receive it.
            </li>
          </ul>
        </Section>

        <Section id="not-collected" title="What We Don't Collect">
          <p>
            CubbyDB doesn&rsquo;t collect analytics, crash reports, or usage statistics, and it has
            no advertising. We don&rsquo;t know which databases you connect to, what you query, or
            how often you use the app.
          </p>
        </Section>

        <Section id="purchases" title="Purchases">
          <p>
            Purchases are handled by Polar Software, Inc., which acts as the merchant of record.
            Polar collects the details needed to process your payment, such as your name, email
            address, billing address, and payment information, under its own privacy policy. We
            receive your name, email address, order details, and license key so we can support
            your purchase. We never see your full payment card details.
          </p>
        </Section>

        <Section id="website" title="The Website">
          <p>
            cubbydb.com is hosted by Vercel, which keeps standard server logs such as IP address,
            browser type, and pages requested. The website doesn&rsquo;t use analytics or
            advertising cookies. Download links point to GitHub, which receives the request when
            you download CubbyDB.
          </p>
        </Section>

        <Section id="support" title="Email Support">
          <p>
            If you email us, we receive your email address and whatever you include in your
            message, and use it only to help you. Our email is hosted by Zoho.
          </p>
        </Section>

        <Section id="sharing" title="Who We Share Data With">
          <p>
            We don&rsquo;t sell or rent personal information. The only services that handle it are
            the ones named in this policy: Polar for purchases and licenses, GitHub for downloads
            and updates, Vercel for the website, Zoho for email, and the AI provider you choose
            when you use an AI feature. We may also disclose information if the law requires it.
          </p>
        </Section>

        <Section id="your-choices" title="Your Choices and Rights">
          <p>
            Data stored by the app is yours to delete: removing CubbyDB&rsquo;s data folder erases
            it. Removing a license in Settings deactivates it with Polar.
          </p>
          <p>
            To ask what information we hold about you from a purchase or support email, or to have
            it corrected or deleted, email us. We may need to keep purchase records for as long as
            tax and accounting law requires.
          </p>
        </Section>

        <Section id="children" title="Children">
          <p>
            CubbyDB is not directed at children under 13, and we don&rsquo;t knowingly collect
            information from them.
          </p>
        </Section>

        <Section id="changes" title="Changes to This Policy">
          <p>
            If we change this policy, we&rsquo;ll update the date at the top of this page. For a
            significant change, we&rsquo;ll also note it in the{" "}
            <Link href="/changelog" className="pressable text-ink hover:text-accent">
              changelog
            </Link>
            .
          </p>
        </Section>

        <Section id="contact" title="Contact">
          <p>
            Questions about privacy can be sent to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="pressable text-ink hover:text-accent">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}
