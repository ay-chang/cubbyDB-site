import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { AiSection } from "@/components/ai-section";
import { Footer } from "@/components/footer";
import { getMacDownload } from "@/lib/releases";

/**
 * v0.1 landing page: what it is, what it looks like, where to get it.
 *
 * Ask AI is the one feature section, and it is here for the reason the others
 * are not: a read-only guarantee enforced in three independent places is
 * something a competitor cannot claim by shipping a checkbox.
 *
 * The statistics band, query plate, feature carousel, themes sidecar, dark
 * statement and shortcuts table are all still in `src/components/` and still
 * work. They are unmounted rather than deleted, because the honest version of
 * this page today has nothing to put in them: themes, accent colours and a
 * command palette are table stakes for a SQL client, and listing them next to
 * DataGrip or TablePlus advertises how short the list is. Mount them back when
 * there is something in them worth a competitor's attention.
 */
export default async function Home() {
  // Resolved once here, on the server, and threaded to both the nav and hero
  // download buttons — one fetch instead of two, and both always agree.
  const macDownload = await getMacDownload();

  return (
    <>
      <Nav macDownload={macDownload} />
      <main className="flex-1">
        <Hero macDownload={macDownload} />
        <AiSection />
      </main>
      <Footer />
    </>
  );
}
