import type { CSSProperties } from "react";

import { ASSETS } from "@/lib/catalog";

import "./water-product-photo.css";

// Original source files are served byte-for-byte. Framing accounts for their
// existing whitespace, preserving the catalogue volume scale and aligned bases.
const SOURCE_PHOTOS: Record<string, { src: string; height: number; bottom: number }> = {
  "water-10.webp": { src: "water-10-source.jpg", height: 67.3905, bottom: 3.799 },
  "water-15.webp": { src: "water-15-source.jpg", height: 73.677, bottom: 3.5135 },
  "water-189.webp": { src: "water-189-source.jpg", height: 106.5701, bottom: -2.3271 },
  "water-033.webp": { src: "water-033-source.jpg", height: 53.8716, bottom: 4.6381 },
  "water-05.webp": { src: "water-05-source.jpg", height: 60.8004, bottom: 5.0987 },
  "water-05-gas.webp": { src: "water-05-gas-source.jpg", height: 59.6912, bottom: 5.2143 },
  "water-10-gas.webp": { src: "water-10-gas-source.jpg", height: 67.2413, bottom: 3.799 },
  "water-6l.webp": { src: "water-6l-source.webp", height: 87.231, bottom: 2.1836 },
  "water-10l.webp": { src: "water-10l-source.webp", height: 95.2654, bottom: 1.8321 },
};

export function WaterProductPhoto({
  image,
  framing = "standard",
}: {
  image: string;
  framing?: "standard" | "compact";
}) {
  const source = SOURCE_PHOTOS[image];
  // A denser catalogue frame reduces spare headroom while keeping smaller
  // formats visibly smaller. The source photographs and their proportions stay
  // unchanged; standard framing remains the default for other routes/previews.
  const height = source && framing === "compact" ? 36 + source.height * 0.65 : source?.height;
  const bottom =
    source && height && framing === "compact"
      ? 6 - ((6 - source.bottom) * height) / source.height
      : source?.bottom;
  const style = source
    ? ({
        "--photo-height": `${height}%`,
        "--photo-bottom": `${bottom}%`,
      } as CSSProperties)
    : undefined;

  return (
    <span
      className="rc-water-shot"
      data-format={image}
      data-framing={framing}
      data-source={source ? "original" : "studio"}
      style={style}
      aria-hidden="true"
    >
      <img
        className="rc-water-shot__bottle"
        src={`${ASSETS}/${source?.src ?? image.replace(".webp", "-clean.webp")}`}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
