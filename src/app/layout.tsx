import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Reserved for the statistic numerals and the two section titles. Everything
// structural stays on Geist.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CubbyDB - a desktop Postgres client that's pleasant to use",
  description:
    "Schema tree, SQL editor, editable results grid, and a command palette. Free, open source, and native on macOS, Windows, and Linux.",
  openGraph: {
    title: "CubbyDB",
    description:
      "A desktop Postgres client that's pleasant to use. Free and open source.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      {/* Column layout so the footer is pushed to the bottom on displays taller
          than the page. With the content trimmed to hero-and-footer this is
          reachable on a 1440p screen. */}
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
