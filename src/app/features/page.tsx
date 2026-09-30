import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { EssentialsSection } from "@/components/essentials-section";
import { PrivacySection } from "@/components/privacy-section";
import { ClosingCta } from "@/components/closing-cta";
import { Footer } from "@/components/footer";
import { getMacDownload } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Features — CubbyDB",
  description:
    "SQL editor, table browsing and editing, multiple connections, SSH tunnels, schema compare, ER diagrams, and more, in a Postgres client that keeps your data on your computer.",
};

export default async function FeaturesPage() {
  const macDownload = await getMacDownload();

  return (
    <div className="relative overflow-x-clip">
      <SiteHeader macDownload={macDownload} />
      <main>
        <EssentialsSection />
        <PrivacySection />
      </main>
      <ClosingCta macDownload={macDownload} />
      <Footer macDownload={macDownload} />
    </div>
  );
}
