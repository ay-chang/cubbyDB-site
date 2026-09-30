import type { Metadata } from "next";
import { Playfair_Display, Instrument_Serif, Instrument_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { PRICE, TRIAL_DAYS } from "@/lib/pricing";
import "./globals.css";

// Reserved for the statistic numerals and the two section titles. Everything
// structural stays on Geist.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Headline serif and UI sans for the marketing homepage (hero, chapter
// headings, wordmark). Geist stays the body/structural face everywhere else.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cubbydb.com"),
  title: "CubbyDB — A better home for your Postgres databases",
  description:
    `A fast, lightweight Postgres client with a clean, modern feel, and an AI assistant that can read everything and change nothing. Free for ${TRIAL_DAYS} days, then ${PRICE} once.`,
  openGraph: {
    title: "CubbyDB — A better home for your Postgres databases",
    description:
      `A fast, lightweight Postgres client with a read-only AI assistant. Free for ${TRIAL_DAYS} days, then ${PRICE} once.`,
    type: "website",
    siteName: "CubbyDB",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${instrumentSerif.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      {/* Column layout so the footer is pushed to the bottom on displays taller
          than the page. With the content trimmed to hero-and-footer this is
          reachable on a 1440p screen. */}
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <div className="grain-overlay" aria-hidden="true" />
        {/* Cookieless page-view analytics; see /privacy. */}
        <Analytics />
      </body>
    </html>
  );
}
