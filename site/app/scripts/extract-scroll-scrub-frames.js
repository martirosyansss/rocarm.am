// Browser-side snippet for regenerating scroll-scrub frame sequences from a
// source clip, run via the gstack `browse` tool (no ffmpeg dependency —
// seeks the video and rasterizes each frame to canvas in-browser).
//
// Usage (from a shell with the browse binary on hand, dev server running):
//   B=~/.claude/skills/gstack/browse/dist/browse
//   $B goto http://localhost:5174/
//   $B wait --load
//   $B js "window.__extractConfig = { url: 'http://localhost:5174/assets/world/scene-01.mp4', count: 40, quality: 0.78 }; 'ok'"
//   $B eval site/app/scripts/extract-scroll-scrub-frames.js
//   # poll window.__extractDone, then:
//   $B js "JSON.stringify(window.__frames)" --out manifest.json --raw
//   # then decode-scroll-scrub-frames.mjs turns manifest.json into numbered .webp files
//
// window.__extractConfig: { url: string, count: number, quality: number (0-1) }
// Evenly samples `count` timestamps across the clip's duration and pushes a
// WebP data URL per frame into window.__frames; sets window.__extractDone
// when finished. See AGENTS.md's "The engine is done" section for why this
// replaced direct video-element seeking in the live component.
(function () {
  const CONFIG = window.__extractConfig;
  if (!CONFIG) {
    window.__extractDone = true;
    window.__extractError = "no config";
    return "no config";
  }
  const { url, count, quality } = CONFIG;
  window.__extractDone = false;
  window.__extractError = null;
  window.__frames = [];

  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = url;

  video.addEventListener("error", () => {
    window.__extractError = "video error";
    window.__extractDone = true;
  });

  video.addEventListener(
    "loadedmetadata",
    () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      const duration = video.duration;
      let i = 0;

      function next() {
        if (i >= count) {
          window.__extractDone = true;
          return;
        }
        const t = count === 1 ? 0 : (i / (count - 1)) * duration * 0.999;
        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          window.__frames.push(canvas.toDataURL("image/webp", quality));
          i++;
          next();
        };
        video.addEventListener("seeked", onSeeked);
        video.currentTime = t;
      }
      next();
    },
    { once: true }
  );

  document.body.appendChild(video);
  return "started";
})();
