import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// Lockfiles sit above this directory (the Tauri app's, and a stray one in the
// home directory), so Turbopack's auto-detection picks the wrong root and warns.
// Pin it to this folder. Resolved from the config's own URL because `__dirname`
// is not reliable here.
const here = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: here,
  },
  images: {
    // Next 16 requires every quality a component asks for to be allowlisted.
    // 90 is for the app screenshot: the default 75 is visibly soft on UI
    // captures full of small text.
    qualities: [75, 90],
  },
};

export default nextConfig;
