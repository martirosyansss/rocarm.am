import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { SiteFooter, SiteNav } from "@/components/rocarm/site-chrome";
import { useReveal } from "@/hooks/use-reveal";
import { ASSETS, FLAVOURS } from "@/lib/catalog";

import "./soft-drinks.css";

/**
 * Intrinsic size of the bottle art, so the browser reserves the right box.
 * Re-exported from the 3000px mockup masters at twice the old density: the
 * hero paints the bottle at ~136 × 442 CSS px, which a 900px-tall source met
 * exactly 1:1 on a 2× display, leaving compression artefacts nowhere to hide.
 */
const SHOT = { h: 1800, w05: 546, w15: 508 };

/**
 * Bagel Fat One carries Latin only, so the display stack hands Armenian to
 * Noto Sans Armenian and Cyrillic to Rubik — both heavy enough to sit beside
 * it in the slogan ticker. Google serves each script as its own unicode-range
 * face, so a visitor only downloads the ones their page actually paints.
 */
const FONTS =
  "https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Noto+Sans+Armenian:wght@700&family=Outfit:wght@400;500;700&family=Rubik:wght@700&display=swap";

export const Route = createFileRoute("/soft-drinks")({
  component: SoftDrinksPage,
  head: () => ({
    links: [
      { href: "https://fonts.googleapis.com", rel: "preconnect" },
      { crossOrigin: "anonymous", href: "https://fonts.gstatic.com", rel: "preconnect" },
      { href: FONTS, rel: "stylesheet" },
    ],
    meta: [
      { title: "Garni Cola | Rocarm" },
      {
        content:
          "Seven fruit flavours of Armenian carbonated soft drink in 0.5 and 1.5 litre PET. EAC marked, private label available.",
        name: "description",
      },
    ],
  }),
});

/** The approved slogan, in the three languages the brand book carries. */
const SLOGAN = [
  "Your fruity mood",
  "Քո մրգային տրամադրությունը",
  "Твое фруктовое настроение",
];

/**
 * Fizz rising behind the bottle. Fixed offsets rather than random ones, so the
 * server and the client paint the same bubbles and React never rehydrates them.
 */
const FIZZ = [
  { delay: 0, dur: 6.5, size: 9, x: 34 },
  { delay: 2.4, dur: 7.5, size: 6, x: 44 },
  { delay: 1.1, dur: 5.8, size: 12, x: 58 },
  { delay: 3.6, dur: 8, size: 7, x: 65 },
  { delay: 4.7, dur: 6.8, size: 10, x: 40 },
  { delay: 1.9, dur: 7.2, size: 5, x: 70 },
];

/** The case for the range, in the four numbers a buyer actually asks for. */
const FACTS = [
  { k: "Bottling in Yerevan, on our own line.", n: "1999" },
  { k: "Fruit flavours. One bottle shape, one label system.", n: "7" },
  { k: "Minimum order in units. Mixed pallets with the water range.", n: "1,000" },
  { k: "Marked for the Eurasian Union. ISO 22000 and ISO 9001 line.", n: "EAC" },
];

/**
 * Both bottles are drawn to one scale, so the pair reads as a true size
 * comparison: `mm` is the height off the technical drawing, and the tallest
 * bottle fills the shot. One flavour runs in both rows, so only the format varies.
 */
const TALLEST_MM = 318;
const SIZED = FLAVOURS.find((f) => f.slug === "orange") ?? FLAVOURS[0];

const FORMATS = [
  {
    dims: "212 × 67 mm",
    img: SIZED.img,
    label: "216 × 40 mm",
    mm: 212,
    note: "The impulse buy. Coolers, kiosks, lunch counters.",
    vol: "0.5",
  },
  {
    dims: "318 × 93.6 mm",
    img: SIZED.img15,
    label: "302 × 57 mm",
    mm: 318,
    note: "The table bottle. Families, canteens, events.",
    vol: "1.5",
  },
];

/** Rises into place once it reaches the middle of the viewport. */
function Rise({
  children,
  className,
  step,
}: {
  children: ReactNode;
  className?: string;
  step?: 2 | 3;
}) {
  const { inView, ref } = useReveal<HTMLDivElement>();
  return (
    <div
      className={["rc-gc__rise", step ? `rc-gc__rise--${step}` : "", className]
        .filter(Boolean)
        .join(" ")}
      data-in={inView}
      ref={ref}
    >
      {children}
    </div>
  );
}

/**
 * The flavour rail. Tabs scroll the matching card to the middle, and the rail
 * reports back which card sits there, so the two stay in step whichever one
 * the visitor drives.
 */
function FlavourRail() {
  const railRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(FLAVOURS[0].slug);

  /*
   * Whichever card sits nearest the middle of the rail is the active one, with
   * both ends pinned: the first and last cards can never actually reach the
   * middle, so measuring alone would leave their tabs unreachable.
   */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const sync = () => {
      const cards = [...rail.querySelectorAll<HTMLElement>("[data-slug]")];
      if (cards.length === 0) {
        return;
      }
      const end = rail.scrollWidth - rail.clientWidth;
      if (rail.scrollLeft <= 2) {
        setActive(cards[0].dataset.slug ?? "");
        return;
      }
      if (rail.scrollLeft >= end - 2) {
        setActive(cards.at(-1)?.dataset.slug ?? "");
        return;
      }

      const middle = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      let nearest = cards[0];
      let shortest = Number.POSITIVE_INFINITY;
      for (const card of cards) {
        const box = card.getBoundingClientRect();
        const gap = Math.abs(box.left + box.width / 2 - middle);
        if (gap < shortest) {
          shortest = gap;
          nearest = card;
        }
      }
      setActive(nearest.dataset.slug ?? "");
    };

    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    return () => rail.removeEventListener("scroll", sync);
  }, []);

  const jumpTo = (slug: string) => {
    railRef.current
      ?.querySelector<HTMLElement>(`[data-slug="${slug}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  };

  return (
    <>
      <ul className="rc-gc__tabs rc-wrap">
        {FLAVOURS.map((flavour) => (
          <li className={`rc-flavour--${flavour.slug}`} key={flavour.slug}>
            <button
              aria-current={active === flavour.slug}
              className="rc-gc__tab"
              onClick={() => jumpTo(flavour.slug)}
              type="button"
            >
              {flavour.name}
            </button>
          </li>
        ))}
      </ul>

      <ul className="rc-gc__rail" ref={railRef}>
        {FLAVOURS.map((flavour, index) => (
          <li
            className={`rc-gc__card rc-flavour--${flavour.slug}`}
            data-slug={flavour.slug}
            key={flavour.slug}
          >
            <span aria-hidden="true" className="rc-gc__card-no">
              {String(index + 1).padStart(2, "0")}
            </span>
            <img
              alt=""
              aria-hidden="true"
              className="rc-gc__card-fruit"
              height={640}
              loading="lazy"
              src={`${ASSETS}/fruit-${flavour.fruit}.webp`}
              width={640}
            />
            <img
              alt={`Garni Cola ${flavour.name}`}
              className="rc-gc__card-bottle"
              height={SHOT.h}
              loading="lazy"
              src={`${ASSETS}/${flavour.img}`}
              width={SHOT.w05}
            />
            <h3 className="rc-gc__card-name">{flavour.name}</h3>
            <p className="rc-gc__card-note">{flavour.note}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function SoftDrinksPage() {
  return (
    <div className="rc rc-gc">
      <SiteNav />

      <main>
        {/* Hero: cocoa half for the words, butter half for the sun stand */}
        <section aria-labelledby="gc-hero-h" className="rc-gc__hero">
          <div className="rc-gc__hero-copy">
            <p className="rc-gc__eyebrow">Garni Cola · Bottled in Armenia</p>
            <h1 className="rc-gc__display rc-gc__h1" id="gc-hero-h">
              Your fruity mood
            </h1>
            <p className="rc-gc__lede rc-gc__hero-sub">
              Seven flavours. Two sizes. One very cold bottle. The loud half of
              a plant that has been bottling since 1999.
            </p>
            <a className="rc-gc__cta" href="/#quote">
              Request a quote
              <span aria-hidden="true" className="rc-gc__cta-arrow">
                →
              </span>
            </a>
          </div>

          {/* The arch holds the scene AND the product, so the bottle can be
              grounded against the horizon instead of floating beside it. Only
              the painted shapes are hidden from assistive tech; the bottle is
              real content and keeps its alt text. */}
          <div className="rc-gc__hero-stage">
            <div className="rc-gc__arch">
              <span aria-hidden="true" className="rc-gc__rays" />
              <span aria-hidden="true" className="rc-gc__cloud rc-gc__cloud--l" />
              <span aria-hidden="true" className="rc-gc__cloud rc-gc__cloud--r" />
              <span aria-hidden="true" className="rc-gc__halo" />
              <span aria-hidden="true" className="rc-gc__knoll" />
              <span aria-hidden="true" className="rc-gc__ground" />
              <span aria-hidden="true" className="rc-gc__cast" />
              {FIZZ.map((bubble) => (
                <span
                  aria-hidden="true"
                  className="rc-gc__bub"
                  key={`${bubble.x}-${bubble.size}-${bubble.delay}`}
                  style={
                    {
                      "--bub-delay": `${bubble.delay}s`,
                      "--bub-dur": `${bubble.dur}s`,
                      "--bub-size": `${bubble.size}px`,
                      "--bub-x": `${bubble.x}%`,
                    } as CSSProperties
                  }
                />
              ))}
              <div className="rc-gc__stand">
                <img
                  alt="Garni Cola with orange flavour, 0.5 litre"
                  className="rc-gc__hero-bottle"
                  height={SHOT.h}
                  src={`${ASSETS}/cola-orange.webp`}
                  width={SHOT.w05}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slogan ticker, in all three languages */}
        <div aria-hidden="true" className="rc-gc__ticker">
          <div className="rc-gc__ticker-track">
            {[0, 1].map((copy) => (
              <span className="rc-gc__ticker-group" key={copy}>
                {SLOGAN.map((line) => (
                  <span className="rc-gc__ticker-item" key={line}>
                    {line}
                    <i className="rc-gc__ticker-star">✳</i>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Flavours */}
        <section aria-labelledby="gc-fl-h" className="rc-gc__section">
          <Rise className="rc-wrap rc-gc__head">
            <h2 className="rc-gc__display rc-gc__h2" id="gc-fl-h">
              Seven flavours
            </h2>
            <p className="rc-gc__lede">
              One bottle shape across the family, one label system, seven hand
              painted fruits. Pick a flavour, or take the whole shelf.
            </p>
          </Rise>

          <FlavourRail />
        </section>

        {/* The case for the range */}
        <section aria-labelledby="gc-why-h" className="rc-gc__section rc-gc__section--cocoa">
          <div className="rc-wrap">
            <Rise className="rc-gc__head">
              <h2 className="rc-gc__display rc-gc__h2" id="gc-why-h">
                Why Garni Cola
              </h2>
              <p className="rc-gc__lede">
                A small plant that has been doing one thing for a quarter of a
                century, with the paperwork your compliance team needs.
              </p>
            </Rise>

            <Rise step={2}>
              <dl className="rc-gc__facts">
                {FACTS.map((fact) => (
                  <div className="rc-gc__fact" key={fact.n}>
                    <dt>{fact.n}</dt>
                    <dd>{fact.k}</dd>
                  </div>
                ))}
              </dl>
            </Rise>
          </div>
        </section>

        {/* Formats */}
        <section aria-labelledby="gc-fmt-h" className="rc-gc__section">
          <div className="rc-wrap">
            <Rise className="rc-gc__head">
              <h2 className="rc-gc__display rc-gc__h2" id="gc-fmt-h">
                Two sizes
              </h2>
              <p className="rc-gc__lede">
                Drawn to one scale, so the pair reads the way it sits on a
                shelf.
              </p>
            </Rise>

            <Rise step={2}>
              <div className="rc-gc__formats">
                {FORMATS.map((format) => (
                  <article className="rc-gc__format" key={format.vol}>
                    <div className="rc-gc__format-shot">
                      <img
                        alt={`Garni Cola ${SIZED.name}, ${format.vol} litre bottle`}
                        className="rc-gc__format-bottle"
                        height={SHOT.h}
                        loading="lazy"
                        src={`${ASSETS}/${format.img}`}
                        style={
                          { "--rc-format-scale": format.mm / TALLEST_MM } as CSSProperties
                        }
                        width={format.mm === TALLEST_MM ? SHOT.w15 : SHOT.w05}
                      />
                    </div>

                    <div className="rc-gc__format-body">
                      <span aria-hidden="true" className="rc-gc__format-num">
                        {format.vol}
                        <i>L</i>
                      </span>
                      <p className="rc-gc__format-note">{format.note}</p>
                      <dl className="rc-gc__spec">
                        <div>
                          <dt>Bottle</dt>
                          <dd>{format.dims}</dd>
                        </div>
                        <div>
                          <dt>Label</dt>
                          <dd>{format.label}</dd>
                        </div>
                        <div>
                          <dt>Marking</dt>
                          <dd>EAC</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                ))}
              </div>
            </Rise>
          </div>
        </section>

        {/* Private label */}
        <section aria-labelledby="gc-pl-h" className="rc-gc__section rc-gc__section--butter">
          <Rise className="rc-wrap rc-gc__closer">
            <h2 className="rc-gc__display rc-gc__h2" id="gc-pl-h">
              Or put your own name on it
            </h2>
            <p className="rc-gc__lede">
              The whole flavour range can be filled as private label, from your
              artwork, on the same certified line as our own brands.
            </p>
            <a className="rc-gc__cta rc-gc__cta--cream" href="/#quote">
              Request a quote
              <span aria-hidden="true" className="rc-gc__cta-arrow">
                →
              </span>
            </a>
          </Rise>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
