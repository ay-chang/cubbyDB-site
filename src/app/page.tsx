import { Hero } from "@/components/hero";
import { AskAiSection } from "@/components/ask-ai-section";
import { FilterSection } from "@/components/filter-section";
import { CubbiesSection } from "@/components/cubbies-section";
import { ClosingCta } from "@/components/closing-cta";
import { Footer } from "@/components/footer";
import { getMacDownload } from "@/lib/releases";

/**
 * Homepage: hero and product shot, the three features nobody else has (Ask AI,
 * natural-language filters, cubbies), and a closing download CTA. The
 * everyday essentials and privacy live on /features.
 */
export default async function Home() {
  const macDownload = await getMacDownload();

  return (
    <div className="relative overflow-x-clip">
      <Hero macDownload={macDownload} />
      <AskAiSection />
      <FilterSection />
      <CubbiesSection />
      <ClosingCta macDownload={macDownload} />
      <Footer macDownload={macDownload} />
    </div>
  );
}
