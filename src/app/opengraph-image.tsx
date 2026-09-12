import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/data";

export const alt = "Jaisy — Bringing Brands to Life";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpengraphImage() {
  const settings = await getSiteSettings();
  const lockup = await readFile(
    join(process.cwd(), "public", "brand", "logo-white-og.png"),
  );
  const lockupSrc = `data:image/png;base64,${lockup.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0c",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "rgba(26,179,255,0.28)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -140,
            width: 640,
            height: 640,
            borderRadius: 999,
            background: "rgba(254,47,148,0.32)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lockupSrc} alt="Jaisy" width={280} height={111} />

        <div
          style={{
            display: "flex",
            color: "#f5f5f7",
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -3,
            maxWidth: 940,
          }}
        >
          Bringing Brands to Life
        </div>

        <div
          style={{
            display: "flex",
            color: "#9a9aa5",
            fontSize: 27,
            letterSpacing: 1,
          }}
        >
          {settings.footerTagline}
        </div>
      </div>
    ),
    size,
  );
}
