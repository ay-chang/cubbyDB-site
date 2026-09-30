import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { ComparisonTable } from "@/components/comparison-table";
import { Reveal } from "@/components/reveal";
import { CUBBYDB_ROW, TABLEPLUS_ROW } from "@/lib/competitors";
import { getMacDownload } from "@/lib/releases";
import { MAX_COMPUTERS, PRICE, TRIAL_DAYS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "TablePlus Alternative for Postgres — CubbyDB",
  description: `Looking for a TablePlus alternative? CubbyDB is a Postgres client for Mac, Windows, and Linux with a read-only AI assistant, for ${PRICE} once with every future update.`,
};

const DIFFERENCES = [
  {
    title: "Pay once, updated forever",
    body: `CubbyDB is ${PRICE} with every future update included. TablePlus's single-device license is $99 and includes a year of updates, then you renew to keep getting them.`,
  },
  {
    title: `${MAX_COMPUTERS} computers on one license`,
    body: "Use the same license on a work laptop, a personal laptop, and a desktop, on any mix of Mac, Windows, and Linux.",
  },
  {
    title: "An AI assistant that can't change your data",
    body: "Ask questions in plain English. It reads your schema, runs read-only queries, shows every query it ran, and works with the Claude or ChatGPT subscription you already have.",
  },
  {
    title: "Built only for Postgres",
    body: "Cubbies for saving a task's tables and queries together, filters you can describe in plain English, schema compare, ER diagrams, and plain-English explanations of each index.",
  },
];

const FAQS = [
  {
    q: "Can I try CubbyDB before switching?",
    a: `Yes. Every feature is free for ${TRIAL_DAYS} days with no account and no card. You can keep TablePlus installed and use both while you decide.`,
  },
  {
    q: "Does it work with Supabase, Neon, and RDS?",
    a: "Yes. CubbyDB works with any Postgres database you can reach with a connection string, including through an SSH bastion. It also reconnects on its own when a serverless database like Neon wakes up from being idle.",
  },
  {
    q: "Will CubbyDB add MySQL or other databases?",
    a: "No. CubbyDB is deliberately Postgres-only, so every feature can be built around how Postgres works.",
  },
];

export default async function TablePlusComparisonPage() {
  const macDownload = await getMacDownload();
  const downloadProps = macDownload.isDirectAsset
    ? { download: true }
    : { target: "_blank", rel: "noreferrer" };

  return (
    <div className="relative overflow-x-clip">
      <SiteHeader macDownload={macDownload} />

      <main className="relative mx-auto max-w-[980px] px-5 pt-[64px] pb-[120px] sm:px-7">
        <p className="font-mono text-[11px] tracking-[0.18em] text-[#1aa35e] uppercase">
          CubbyDB vs TablePlus
        </p>
        <h1 className="mt-5 max-w-[20ch] text-balance font-serif-hero text-[clamp(2.6rem,5vw,4rem)] leading-[1.04] text-[#141820]">
          A TablePlus alternative built for Postgres.
        </h1>
        <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
          TablePlus is a solid client that works with many databases. If Postgres is the one you
          use, CubbyDB goes deeper on it, includes an AI assistant, and costs a fifth as much.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={macDownload.href}
            {...downloadProps}
            className="pressable rounded-full bg-[#141820] px-7 py-3.5 text-[15px] font-medium text-white hover:-translate-y-px hover:bg-[#232833]"
          >
            Download free trial
          </a>
          <Link
            href="/pricing"
            className="pressable rounded-full border border-[rgba(27,31,38,0.14)] px-7 py-3.5 text-[15px] font-medium text-[#141820] hover:border-[rgba(27,31,38,0.28)]"
          >
            See pricing
          </Link>
        </div>

        <Reveal className="mt-16">
          <ComparisonTable rows={[CUBBYDB_ROW, TABLEPLUS_ROW]} />
        </Reveal>

        <section className="mt-24">
          <h2 className="font-serif-hero text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.08] text-[#141820]">
            What&rsquo;s different
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {DIFFERENCES.map((item, i) => (
              <Reveal
                key={item.title}
                index={i % 2}
                className="rounded-[20px] border border-[rgba(27,31,38,0.08)] bg-white p-7"
              >
                <h3 className="font-sans-ui text-[17px] font-semibold tracking-[-0.01em] text-[#141820]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.6)]">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[20px] bg-[#f2f4f3] p-8 sm:p-10">
          <h2 className="font-sans-ui text-[19px] font-semibold tracking-[-0.015em] text-[#141820]">
            When TablePlus is the better choice
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.68)]">
            <li>
              You work with MySQL, SQLite, Redis, or other databases besides Postgres. CubbyDB only
              supports Postgres.
            </li>
            <li>You want to browse your databases from an iPhone or iPad.</li>
          </ul>
        </section>

        <section className="mt-24">
          <h2 className="font-serif-hero text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.08] text-[#141820]">
            Questions
          </h2>
          <div className="mt-8 divide-y divide-[rgba(27,31,38,0.08)] border-y border-[rgba(27,31,38,0.08)]">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="text-[16px] font-medium text-[#141820]">{faq.q}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[rgba(27,31,38,0.6)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer macDownload={macDownload} />
    </div>
  );
}
