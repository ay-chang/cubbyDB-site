import type { MetadataRoute } from "next";

const SITE = "https://cubbydb.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/features", "/pricing", "/vs/tableplus", "/changelog", "/privacy", "/terms"].map((path) => ({
    url: `${SITE}${path}`,
  }));
}
