/* Scroll scrub React/TanStack reference implementation. */

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import "./scroll-scrub.css";

export interface ScrollScrubFrameSequence {
  /** Directory URL (no trailing slash), e.g. "/assets/world/frames/scene-01". */
  base: string;
  /** Frames are named f001.webp .. f{count}.webp inside `base`. */
  count: number;
  /** Zero-pad width for the frame number. Defaults to 3. */
  pad?: number;
}

export interface ScrollScrubScene {
  id: string;
  label: string;
  /** Exact first frame of the deployed desktop sequence. */
  poster: string;
  /** Exact first frame of mobileFrames; provide whenever mobileFrames is set. */
  mobilePoster?: string;
  frames: ScrollScrubFrameSequence;
  mobileFrames?: ScrollScrubFrameSequence;
  title: string;
  body: string;
  kicker?: string;
  tags?: string[];
  actions?: ReactNode;
  align?: "left" | "right";
  /** Viewport-heights assigned to this scene. More distance means slower scrub. */
  scroll?: number;
  /** 0..0.6. Slow the middle of the clip without changing either seam frame. */
  linger?: number;
  objectPosition?: string;
  mobileObjectPosition?: string;
}

export interface ScrollScrubConnector {
  /** Exact first frame of this connector sequence; never substitute a scene still. */
  poster: string;
  /** Exact first frame of mobileFrames; provide whenever mobileFrames is set. */
  mobilePoster?: string;
  frames: ScrollScrubFrameSequence;
  mobileFrames?: ScrollScrubFrameSequence;
  scroll?: number;
}

export interface ScrollScrubTheme {
  background: string;
  ink: string;
  muted: string;
  accent: string;
}

export interface ScrollScrubProps {
  scenes: ScrollScrubScene[];
  /** Leave empty for continuous-forward architecture A. */
  connectors?: (ScrollScrubConnector | null)[];
  theme: ScrollScrubTheme;
  className?: string;
  onActiveSectionChange?: (index: number) => void;
}

interface Segment {
  key: string;
  kind: "scene" | "connector";
  sectionIndex: number;
  nextSectionIndex: number;
  poster: string;
  mobilePoster?: string;
  frames: ScrollScrubFrameSequence;
  mobileFrames?: ScrollScrubFrameSequence;
  weight: number;
  linger: number;
  objectPosition: string;
  mobileObjectPosition: string;
  scene?: ScrollScrubScene;
}

interface RuntimeSegment extends Segment {
  band: HTMLElement;
  layer: HTMLElement;
  start: number;
  end: number;
  current: number;
  target: number;
  visible: boolean;
  loading: boolean;
  ready: boolean;
  failed: boolean;
  loadedSource?: string;
  canvas?: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D;
  frameImages?: (ImageBitmap | null)[];
  frameCount: number;
  loadedFrameCount: number;
  settledFrameCount: number;
  paintedFrame: number;
  abort?: AbortController;
}

interface Controller {
  jumpToSection: (index: number) => void;
}

type ThemeStyle = CSSProperties & Record<`--ss-${string}`, string | number>;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (value: number) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

const lingerEase = (value: number, amount: number) => {
  const x = clamp(value);
  const linger = clamp(amount, 0, 0.6);
  const centered = x - 0.5;
  return (1 - linger) * x + linger * (4 * centered ** 3 + 0.5);
};

const frameUrl = (frames: ScrollScrubFrameSequence, index: number) =>
  `${frames.base}/f${String(index + 1).padStart(frames.pad ?? 3, "0")}.webp`;

const frameSequenceKey = (frames: ScrollScrubFrameSequence) =>
  `${frames.base}:${frames.count}`;

function buildSegments(
  scenes: ScrollScrubScene[],
  connectors: (ScrollScrubConnector | null)[]
): Segment[] {
  const result: Segment[] = [];

  for (const [index, scene] of scenes.entries()) {
    if (scene.mobileFrames && !scene.mobilePoster) {
      throw new Error(`Scene ${scene.id} needs mobilePoster for mobileFrames`);
    }
    result.push({
      frames: scene.frames,
      key: `scene:${scene.id}`,
      kind: "scene",
      linger: scene.linger ?? 0,
      mobileFrames: scene.mobileFrames,
      mobilePoster: scene.mobilePoster,
      mobileObjectPosition:
        scene.mobileObjectPosition ?? scene.objectPosition ?? "50% 50%",
      nextSectionIndex: index,
      objectPosition: scene.objectPosition ?? "50% 50%",
      poster: scene.poster,
      scene,
      sectionIndex: index,
      weight: scene.scroll ?? 1.4,
    });

    const connector = connectors[index];
    if (index < scenes.length - 1 && connector?.frames) {
      if (connector.mobileFrames && !connector.mobilePoster) {
        throw new Error(
          `Connector after ${scene.id} needs mobilePoster for mobileFrames`
        );
      }
      const nextScene = scenes[index + 1];
      result.push({
        frames: connector.frames,
        key: `connector:${scene.id}:${nextScene.id}`,
        kind: "connector",
        linger: 0,
        mobileFrames: connector.mobileFrames,
        mobilePoster: connector.mobilePoster,
        mobileObjectPosition:
          nextScene.mobileObjectPosition ??
          nextScene.objectPosition ??
          "50% 50%",
        nextSectionIndex: index + 1,
        objectPosition: nextScene.objectPosition ?? "50% 50%",
        poster: connector.poster,
        sectionIndex: index,
        weight: connector.scroll ?? 0.8,
      });
    }
  }

  return result;
}

export function ScrollScrub({
  scenes,
  connectors,
  theme,
  className,
  onActiveSectionChange,
}: ScrollScrubProps) {
  const rootRef = useRef<HTMLElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const onActiveRef = useRef(onActiveSectionChange);
  const [activeSection, setActiveSection] = useState(0);
  const segments = useMemo(
    () => buildSegments(scenes, connectors ?? []),
    [connectors, scenes]
  );

  // Keep the latest callback reachable from the scroll loop without making it a
  // dependency of the controller effect. Synced in an effect, never during
  // render — a render-phase ref write breaks under React Compiler.
  useEffect(() => {
    onActiveRef.current = onActiveSectionChange;
  }, [onActiveSectionChange]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || segments.length === 0) {
      return;
    }

    const layerNodes = [
      ...root.querySelectorAll<HTMLElement>("[data-scroll-scrub-layer]"),
    ];
    const bandNodes = [
      ...root.querySelectorAll<HTMLElement>("[data-scroll-scrub-band]"),
    ];
    if (
      layerNodes.length !== segments.length ||
      bandNodes.length !== segments.length
    ) {
      throw new Error("ScrollScrub segment markup is out of sync");
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    const smallViewport = window.matchMedia("(max-width: 860px)");
    const isMobile = () => coarsePointer || smallViewport.matches;
    const framesFor = (segment: RuntimeSegment) =>
      isMobile() && segment.mobileFrames ? segment.mobileFrames : segment.frames;
    const runtime: RuntimeSegment[] = segments.map((segment, index) => ({
      ...segment,
      band: bandNodes[index],
      current: 0,
      end: 0,
      failed: false,
      frameCount: 0,
      layer: layerNodes[index],
      loadedFrameCount: 0,
      loading: false,
      paintedFrame: -1,
      ready: false,
      settledFrameCount: 0,
      start: 0,
      target: 0,
      visible: index === 0,
    }));

    let active = -1;
    let destroyed = false;
    let dirty = true;
    let frame = 0;
    let rootTop = 0;
    let total = 1;
    let viewportHeight = window.innerHeight;
    let layoutWidth = window.innerWidth;

    const unloadFrames = (segment: RuntimeSegment) => {
      segment.abort?.abort();
      for (const bitmap of segment.frameImages ?? []) {
        bitmap?.close();
      }
      segment.canvas?.remove();
      delete segment.canvas;
      delete segment.ctx;
      delete segment.frameImages;
      delete segment.loadedSource;
      segment.frameCount = 0;
      segment.loadedFrameCount = 0;
      segment.settledFrameCount = 0;
      segment.paintedFrame = -1;
      segment.loading = false;
      segment.ready = false;
      segment.failed = false;
      segment.current = segment.target;
      delete segment.layer.dataset.framePainted;
      delete segment.layer.dataset.frameFailed;
    };

    const layout = () => {
      const pageY = window.scrollY || window.pageYOffset;
      rootTop = root.getBoundingClientRect().top + pageY;
      viewportHeight = window.innerHeight;
      layoutWidth = window.innerWidth;

      for (const segment of runtime) {
        const key = frameSequenceKey(framesFor(segment));
        if (segment.loadedSource && segment.loadedSource !== key) {
          unloadFrames(segment);
        }
        const rect = segment.band.getBoundingClientRect();
        segment.start = rect.top + pageY - rootTop;
        segment.end = segment.start + rect.height;
      }
      total = Math.max(runtime.at(-1)?.end ?? viewportHeight, viewportHeight);
      dirty = true;
    };

    const loadFrames = (segment: RuntimeSegment) => {
      const source = framesFor(segment);
      const key = frameSequenceKey(source);
      if (
        reduceMotion ||
        destroyed ||
        segment.loading ||
        segment.ready ||
        segment.failed ||
        !source.count
      ) {
        return;
      }

      segment.loading = true;
      segment.loadedSource = key;
      segment.frameCount = source.count;
      segment.frameImages = new Array(source.count).fill(null);
      segment.abort = new AbortController();
      const request = segment.abort;
      const images = segment.frameImages;

      const canvas = document.createElement("canvas");
      canvas.className = "scroll-scrub__canvas";
      segment.canvas = canvas;
      segment.layer.append(canvas);
      segment.ctx = canvas.getContext("2d") ?? undefined;

      for (let index = 0; index < source.count; index++) {
        fetch(frameUrl(source, index), { signal: request.signal })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Frame failed: ${response.status}`);
            }
            return response.blob();
          })
          .then((blob) => createImageBitmap(blob))
          .then((bitmap) => {
            if (
              request.signal.aborted ||
              segment.loadedSource !== key ||
              segment.frameImages !== images
            ) {
              bitmap.close();
              return;
            }
            images[index] = bitmap;
            segment.loadedFrameCount++;
            segment.settledFrameCount++;
            if (segment.canvas && index === 0) {
              segment.canvas.width = bitmap.width;
              segment.canvas.height = bitmap.height;
            }
            segment.ready = true;
            segment.loading = segment.settledFrameCount < source.count;
            dirty = true;
          })
          .catch((error) => {
            if (
              request.signal.aborted ||
              (error instanceof Error && error.name === "AbortError") ||
              segment.loadedSource !== key
            ) {
              return;
            }
            segment.settledFrameCount++;
            segment.loading = segment.settledFrameCount < source.count;
            if (segment.loadedFrameCount === 0 && !segment.loading) {
              segment.failed = true;
              segment.layer.dataset.frameFailed = "true";
            }
          });
      }
    };

    const nearestLoadedFrame = (segment: RuntimeSegment, target: number) => {
      const images = segment.frameImages;
      if (!images) {
        return -1;
      }
      if (images[target]) {
        return target;
      }
      for (let offset = 1; offset < images.length; offset++) {
        const before = target - offset;
        const after = target + offset;
        if (before >= 0 && images[before]) {
          return before;
        }
        if (after < images.length && images[after]) {
          return after;
        }
        if (before < 0 && after >= images.length) {
          break;
        }
      }
      return -1;
    };

    const readScroll = () => {
      const pageY = window.scrollY || window.pageYOffset;
      const y = clamp(pageY - rootTop, 0, total);
      const crossfade = 0.1 * viewportHeight;
      let currentIndex = 0;

      for (const [index, segment] of runtime.entries()) {
        if (y >= segment.start) {
          currentIndex = index;
        }

        const length = Math.max(segment.end - segment.start, 1);
        const local = clamp((y - segment.start) / length);
        segment.target = segment.linger
          ? lingerEase(local, segment.linger)
          : local;

        let outside = 0;
        if (y < segment.start) {
          outside = segment.start - y;
        }
        if (y > segment.end) {
          outside = y - segment.end;
        }
        let opacity = smoothstep(1 - outside / Math.max(crossfade, 1));
        if (reduceMotion) {
          opacity = outside === 0 ? 1 : 0;
        }

        segment.visible = opacity > 0.001;
        segment.layer.style.opacity = String(opacity);
        segment.layer.style.zIndex = index === currentIndex ? "2" : "1";

        if (
          y > segment.start - 1.5 * viewportHeight &&
          y < segment.end + 1.5 * viewportHeight
        ) {
          loadFrames(segment);
        }
      }

      const current = runtime[currentIndex];
      const currentLength = Math.max(current.end - current.start, 1);
      const currentProgress = clamp((y - current.start) / currentLength);
      const nextActive =
        current.kind === "connector" && currentProgress >= 0.5
          ? current.nextSectionIndex
          : current.sectionIndex;

      if (nextActive !== active) {
        active = nextActive;
        root.dataset.activeSection = String(active);
        setActiveSection(active);
        onActiveRef.current?.(active);
      }

      root.style.setProperty("--ss-progress", String(clamp(y / total)));
    };

    const updateFrames = () => {
      for (const segment of runtime) {
        if (!segment.ready || !segment.ctx || !segment.frameImages) {
          continue;
        }
        if (
          !segment.visible &&
          Math.abs(segment.current - segment.target) < 0.002
        ) {
          continue;
        }

        // Canvas paints are synchronous, so unlike video-seeking there is no
        // in-flight operation to wait on: `current` tracks `target` every
        // frame and we paint whatever it resolves to immediately.
        segment.current += (segment.target - segment.current) * 0.2;
        const frameIndex = Math.round(
          clamp(segment.current, 0, 1) * (segment.frameCount - 1)
        );
        const paintIndex = nearestLoadedFrame(segment, frameIndex);
        if (paintIndex === -1 || paintIndex === segment.paintedFrame) {
          continue;
        }
        const bitmap = segment.frameImages[paintIndex];
        if (!bitmap) {
          continue;
        }
        segment.ctx.drawImage(bitmap, 0, 0);
        segment.paintedFrame = paintIndex;
        segment.layer.dataset.framePainted = "true";
      }
    };

    const tick = () => {
      if (destroyed) {
        return;
      }
      if (dirty) {
        dirty = false;
        readScroll();
      }
      updateFrames();
      frame = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      dirty = true;
    };
    const onResize = () => {
      if (coarsePointer && window.innerWidth === layoutWidth) {
        return;
      }
      layout();
    };

    controllerRef.current = {
      jumpToSection(index) {
        const segment = runtime.find(
          (candidate) =>
            candidate.kind === "scene" && candidate.sectionIndex === index
        );
        if (!segment) {
          return;
        }
        const top =
          rootTop + segment.start + 0.15 * (segment.end - segment.start);
        window.scrollTo({
          behavior: reduceMotion ? "auto" : "smooth",
          top,
        });
      },
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", layout);

    layout();
    frame = window.requestAnimationFrame(tick);

    return () => {
      destroyed = true;
      controllerRef.current = null;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", layout);
      root.style.removeProperty("--ss-progress");
      delete root.dataset.activeSection;

      for (const segment of runtime) {
        unloadFrames(segment);
        segment.layer.style.removeProperty("opacity");
        segment.layer.style.removeProperty("z-index");
      }
    };
  }, [segments]);

  if (scenes.length === 0) {
    return null;
  }

  const themeStyle: ThemeStyle = {
    "--ss-accent": theme.accent,
    "--ss-bg": theme.background,
    "--ss-ink": theme.ink,
    "--ss-muted": theme.muted,
  };

  return (
    <section
      className={["scroll-scrub", className].filter(Boolean).join(" ")}
      ref={rootRef}
      style={themeStyle}
    >
      <div className="scroll-scrub__stage">
        <div aria-hidden="true" className="scroll-scrub__media">
          {segments.map((segment, index) => {
            const layerStyle: ThemeStyle = {
              "--ss-mobile-position": segment.mobileObjectPosition,
              "--ss-object-position": segment.objectPosition,
            };
            return (
              <figure
                className={`scroll-scrub__layer scroll-scrub__layer--${segment.kind}`}
                data-scroll-scrub-layer=""
                key={segment.key}
                style={layerStyle}
              >
                <picture className="scroll-scrub__picture">
                  {segment.mobilePoster ? (
                    <source
                      media="(hover: none) and (pointer: coarse), (max-width: 860px)"
                      srcSet={segment.mobilePoster}
                    />
                  ) : null}
                  <img
                    alt=""
                    className="scroll-scrub__poster"
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading={index === 0 ? "eager" : "lazy"}
                    src={segment.poster}
                  />
                </picture>
              </figure>
            );
          })}
        </div>

        <div aria-hidden="true" className="scroll-scrub__progress">
          <span />
        </div>

        <nav aria-label="Scroll chapters" className="scroll-scrub__route">
          {scenes.map((scene, index) => (
            <button
              aria-current={activeSection === index ? "step" : undefined}
              className="scroll-scrub__route-button"
              key={scene.id}
              onClick={() => controllerRef.current?.jumpToSection(index)}
              type="button"
            >
              <span>{scene.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="scroll-scrub__story">
        {segments.map((segment) => {
          const bandStyle: CSSProperties = {
            minHeight: `${Math.max(segment.weight, 0.2) * 100}dvh`,
          };

          if (segment.kind === "connector") {
            return (
              <div
                aria-hidden="true"
                className="scroll-scrub__connector-band"
                data-scroll-scrub-band=""
                key={segment.key}
                style={bandStyle}
              />
            );
          }

          const { scene } = segment;
          if (!scene) {
            return null;
          }
          const Heading = segment.sectionIndex === 0 ? "h1" : "h2";

          return (
            <article
              className="scroll-scrub__chapter"
              data-align={scene.align ?? "left"}
              data-scroll-scrub-band=""
              id={scene.id}
              key={segment.key}
              style={bandStyle}
            >
              <div className="scroll-scrub__chapter-pin">
                <div className="scroll-scrub__copy">
                  {scene.kicker ? (
                    <p className="scroll-scrub__kicker">{scene.kicker}</p>
                  ) : null}
                  <Heading className="scroll-scrub__title">
                    {scene.title}
                  </Heading>
                  <p className="scroll-scrub__body">{scene.body}</p>
                  {scene.tags?.length ? (
                    <ul className="scroll-scrub__tags">
                      {scene.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                  {scene.actions ? (
                    <div className="scroll-scrub__actions">{scene.actions}</div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
