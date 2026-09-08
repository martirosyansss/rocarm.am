// Decodes a JSON array of data: URLs (written by extract-scroll-scrub-frames.js
// via the browse tool) into numbered .webp files under public/assets/world/frames.
// Names each file fNNN.webp, matching the frameUrl() convention in
// scroll-scrub.tsx (`${frames.base}/f${padded}.webp`) — outDir is expected to
// already be scoped to one scene (e.g. .../frames/scene-01), so no extra
// filename prefix is needed.
// Usage: bun scripts/decode-scroll-scrub-frames.mjs <manifest.json> <outDir>
const [, , manifestPath, outDir] = process.argv;

const frames = JSON.parse(await Bun.file(manifestPath).text());
await Bun.$`mkdir -p ${outDir}`;

for (let i = 0; i < frames.length; i++) {
  const dataUrl = frames[i];
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const bytes = Buffer.from(base64, "base64");
  const name = `f${String(i + 1).padStart(3, "0")}.webp`;
  await Bun.write(`${outDir}/${name}`, bytes);
}

console.log(`wrote ${frames.length} frames to ${outDir}`);
