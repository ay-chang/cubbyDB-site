import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PRICE } from "@/lib/pricing";

export const alt = "CubbyDB: a better home for your Postgres databases";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The link preview every page shares on Hacker News, Reddit, X, and Slack.
export default async function OpenGraphImage() {
  const assets = join(process.cwd(), "src/assets/og");
  const [serif, serifItalic, sans, mono, screenshot] = await Promise.all([
    readFile(join(assets, "InstrumentSerif-Regular.ttf")),
    readFile(join(assets, "InstrumentSerif-Italic.ttf")),
    readFile(join(assets, "Geist-Medium.ttf")),
    readFile(join(assets, "GeistMono-Regular.ttf")),
    readFile(join(assets, "app.png")),
  ]);
  const screenshotSrc = `data:image/png;base64,${screenshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            "radial-gradient(70% 60% at 50% 0%, rgba(34,197,94,0.16), rgba(34,197,94,0) 70%), #fbfbfc",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40 }}>
          <svg viewBox="0 0 100 100" width={40} height={40}>
            <path
              fill="#22c55e"
              fillRule="evenodd"
              d="M28 4h44a24 24 0 0 1 24 24v44a24 24 0 0 1-24 24H28A24 24 0 0 1 4 72V28A24 24 0 0 1 28 4Zm7 32h30a10 10 0 0 1 10 10v8a10 10 0 0 1-10 10H35a10 10 0 0 1-10-10v-8a10 10 0 0 1 10-10Z"
            />
          </svg>
          <span style={{ fontSize: 32, color: "#141820", letterSpacing: "-0.03em" }}>CubbyDB</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 22,
            fontFamily: "Instrument Serif",
            fontSize: 64,
            lineHeight: 1.04,
            color: "#141820",
          }}
        >
          <div style={{ display: "flex" }}>
            A better&nbsp;<span style={{ fontStyle: "italic" }}>home</span>&nbsp;for your
          </div>
          <div style={{ display: "flex" }}>Postgres databases.</div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontFamily: "Geist Mono",
            fontSize: 20,
            letterSpacing: "0.08em",
            color: "#1aa35e",
          }}
        >
          MAC · WINDOWS · LINUX · {PRICE} ONCE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            padding: 8,
            paddingBottom: 0,
            background: "#ffffff",
            border: "1px solid rgba(27,31,38,0.09)",
            borderBottom: "none",
            borderRadius: "18px 18px 0 0",
            boxShadow: "0 30px 60px -30px rgba(38,50,80,0.45)",
          }}
        >
          <img
            src={screenshotSrc}
            width={1000}
            height={625}
            style={{ borderRadius: "12px 12px 0 0" }}
            alt=""
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Geist", data: sans, style: "normal", weight: 500 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
