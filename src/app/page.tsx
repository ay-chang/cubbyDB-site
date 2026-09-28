import { Hero } from "@/components/hero";
import { AskAiSection } from "@/components/ask-ai-section";
import { FilterSection } from "@/components/filter-section";
import { CubbiesSection } from "@/components/cubbies-section";
import { EssentialsSection } from "@/components/essentials-section";
import { ClosingCta } from "@/components/closing-cta";
import { Footer } from "@/components/footer";
import { getMacDownload } from "@/lib/releases";

/**
 * Homepage: hero and product shot, then the AI assistant, natural-language
 * filters, cubbies, the rest of the feature set, and a closing download CTA.
 * One light page throughout.
 */
export default async function Home() {
  const macDownload = await getMacDownload();

  return (
    <div className="relative overflow-x-clip">
      <Hero macDownload={macDownload} />
      <AskAiSection />
      <FilterSection />
      <CubbiesSection />
      <EssentialsSection />
      <ClosingCta macDownload={macDownload} />
      <Footer macDownload={macDownload} />
    </div>
  );
}
