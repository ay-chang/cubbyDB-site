const REPO = "ay-chang/cubbyDB";
const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;

type MacDownload = {
  /** Direct asset URL if resolved, otherwise the releases page as a fallback. */
  href: string;
  /** True once `href` points at the actual .dmg, so callers can skip the
   *  new-tab/noreferrer treatment a normal external link gets — a file
   *  download shouldn't flash open a tab that immediately closes. */
  isDirectAsset: boolean;
  version: string | null;
};

/**
 * Resolves the current macOS installer straight from GitHub Releases, so the
 * primary CTA downloads the .dmg on click instead of dropping the visitor on
 * the releases page to find it themselves.
 *
 * Release filenames carry the version (`CubbyDB_0.1.4_universal.dmg`), so the
 * asset is matched by its `_universal.dmg` suffix rather than a hardcoded
 * name — that match survives every future version bump with no code change.
 *
 * Cached for five minutes via Next's fetch extension. An hour was too long in
 * practice — a fresh release kept serving the previous installer for the rest
 * of the window. Five minutes is 12 requests/hour per region, still far under
 * GitHub's 60-req/hour unauthenticated limit regardless of site traffic, since
 * this fetch is server-side and shared across visitors, not one per pageview.
 *
 * Never throws. A failed or rate-limited request falls back to the releases
 * page, so the button always leads somewhere real.
 */
export async function getMacDownload(): Promise<MacDownload> {
  const fallback: MacDownload = {
    href: RELEASES_PAGE,
    isDirectAsset: false,
    version: null,
  };

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return fallback;

    const release = (await res.json()) as {
      tag_name?: string;
      assets?: { name: string; browser_download_url: string }[];
    };

    const dmg = release.assets?.find((asset) =>
      asset.name.endsWith("_universal.dmg"),
    );
    if (!dmg) return fallback;

    return {
      href: dmg.browser_download_url,
      isDirectAsset: true,
      version: release.tag_name?.replace(/^v/, "") ?? null,
    };
  } catch {
    return fallback;
  }
}
