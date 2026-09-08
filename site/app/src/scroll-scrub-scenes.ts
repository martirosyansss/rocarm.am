/**
 * Scene data for the scroll-scrub journey.
 *
 * Single-shot: ONE continuous 15s take of the Garni Temple colonnade, cut into
 * five consecutive slices so each chapter of copy gets its own scroll band.
 * The slices are consecutive frames of the SAME render, so there is nothing to
 * match at a join: slice N's last frame is slice N+1's first frame by
 * construction.
 *
 * Each scene plays as a preloaded frame sequence (40 WebP frames per scene,
 * desktop and mobile) painted to canvas — see AGENTS.md for why this replaced
 * video-element seeking.
 *
 * Every `poster` is generated from its own ENCODED clip, after encoding.
 * Keep this array a module constant.
 */
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

/** Brand tokens, from design-brief.md. */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#006FBA",
  background: "#08131B",
  ink: "#F2F6F8",
  muted: "#8AA0AE",
};

const FRAME_COUNT = 40;

const frames = (sceneId: string) => ({
  base: `/assets/world/frames/${sceneId}`,
  count: FRAME_COUNT,
});

const mobileFrames = (sceneId: string) => ({
  base: `/assets/world/frames/${sceneId}-mobile`,
  count: FRAME_COUNT,
});

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    body: "The spring rises in the gorge below the Garni Temple, filtered through basalt long before the temple was built.",
    frames: frames("scene-01"),
    id: "source",
    kicker: "Bottling since 1999",
    label: "Source",
    mobileFrames: mobileFrames("scene-01"),
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    poster: "/assets/world/scene-01-poster.png",
    scroll: 1.6,
    tags: ["Armenia", "Natural spring"],
    title: "Water from a historical source",
  },
  {
    body: "Low mineralisation, stable through the year, verified batch by batch in our own laboratory before a pallet leaves.",
    frames: frames("scene-02"),
    id: "composition",
    label: "Composition",
    mobileFrames: mobileFrames("scene-02"),
    mobilePoster: "/assets/world/scene-02-mobile-poster.png",
    poster: "/assets/world/scene-02-poster.png",
    scroll: 1.5,
    tags: ["Lab verified"],
    title: "What the basalt leaves behind",
  },
  {
    body: "Climaveneta, Kaeser, STM and Siat run the plant. The water meets no open air between the source and the cap.",
    frames: frames("scene-03"),
    id: "production",
    label: "Production",
    mobileFrames: mobileFrames("scene-03"),
    mobilePoster: "/assets/world/scene-03-mobile-poster.png",
    poster: "/assets/world/scene-03-poster.png",
    scroll: 1.5,
    tags: ["ISO 22000", "ISO 9001"],
    title: "European lines, Armenian water",
  },
  {
    body: "EAC for the Eurasian Union, ISO for everyone else, and a quality report your compliance team can actually read.",
    frames: frames("scene-04"),
    id: "documents",
    label: "Documents",
    mobileFrames: mobileFrames("scene-04"),
    mobilePoster: "/assets/world/scene-04-mobile-poster.png",
    poster: "/assets/world/scene-04-poster.png",
    scroll: 1.5,
    tags: ["EAC", "ISO 22000", "ISO 9001"],
    title: "Cleared for your market",
  },
  {
    body: "From 1,000 units. PET and glass, still and sparkling, private label on request, FOB Poti or CIF your port.",
    frames: frames("scene-05"),
    id: "logistics",
    label: "Logistics",
    mobileFrames: mobileFrames("scene-05"),
    mobilePoster: "/assets/world/scene-05-mobile-poster.png",
    poster: "/assets/world/scene-05-poster.png",
    scroll: 1.7,
    tags: ["MOQ 1,000", "FOB / CIF"],
    title: "On a pallet, in a container",
  },
];
