import { Mark } from "./ui/logo";

const REPO = "https://github.com/ay-chang/cubbyDB";

const LINKS = [
  { href: REPO, label: "GitHub" },
  { href: `${REPO}/releases`, label: "Releases" },
  { href: `${REPO}/blob/main/FEATURES.md`, label: "Features" },
  { href: `${REPO}/blob/main/LICENSE`, label: "License" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line-soft px-6 py-10">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="label flex items-center gap-2.5 text-ink-soft">
          <Mark size={14} />
          MIT licensed. Tauri, React, Postgres.
        </p>
        <ul className="flex flex-wrap items-center gap-5">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="pressable label text-ink-muted hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
