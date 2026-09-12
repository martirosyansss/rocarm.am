import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

import { QuoteForm } from "@/components/rocarm/quote-form";
import { SiteFooter, SiteNav } from "@/components/rocarm/site-chrome";
import { SoftDrinkProductPhoto } from "@/components/rocarm/soft-drink-product-photo";
import { useReveal } from "@/hooks/use-reveal";
import { ASSETS, FLAVOURS } from "@/lib/catalog";
import "./soft-drinks.css";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,800,100,1&family=Noto+Sans+Armenian:wght@700&family=Outfit:wght@400;500;700&family=Rubik:wght@700&display=swap";

export const Route = createFileRoute("/soft-drinks")({
  component: SoftDrinksPage,
  head: () => ({
    links: [
      { href: "https://fonts.googleapis.com", rel: "preconnect" },
      { crossOrigin: "anonymous", href: "https://fonts.gstatic.com", rel: "preconnect" },
      { href: FONTS, rel: "stylesheet" },
    ],
    meta: [
      { title: "Garni Cola — Find your fruity mood | Rocarm" },
      {
        name: "description",
        content:
          "Meet seven colourful Garni Cola soft drinks, bottled in Armenia. Explore the flavours in 0.5 L and 1.5 L, with wholesale and private label enquiries welcome.",
      },
    ],
  }),
});

const SLOGAN = ["Your fruity mood", "Քո մրգային տրամադրությունը", "Твое фруктовое настроение"];
// Flavours shown on the supplied Groupլ.png labels; glass capacity is not confirmed.
const GLASS_FLAVOURS = ["Orange", "Tarragon", "Pear", "Mojito"];
const FLAVOUR_COPY: Record<string, { note: string; character: string }> = {
  cola: { note: "A familiar favourite with a lively fizz.", character: "Classic cola" },
  orange: { note: "A little citrus sunshine in every sip.", character: "Bright & citrusy" },
  cherry: { note: "Bold cherry flavour. A beautifully bright mood.", character: "Rich & fruity" },
  pear: { note: "Mellow pear flavour with a sparkling twist.", character: "Soft & mellow" },
  tarragon: {
    note: "The distinctive herbal favourite of the Caucasus.",
    character: "Green & herbal",
  },
  lime: { note: "A zingy citrus flavour that keeps things lively.", character: "Zesty & bright" },
  tropic: {
    note: "Pineapple, banana and mango. A tropical escape.",
    character: "Tropical & sunny",
  },
};
const FACTS = [
  { n: "1999", title: "Our story began", note: "Bottled on our own line in Yerevan, Armenia." },
  {
    n: "7",
    title: "Ways to find your favourite",
    note: "From classic cola to distinctive tarragon.",
  },
  {
    n: "1,000",
    title: "Units to get started",
    note: "Mixed pallets with our water range available.",
  },
  {
    n: "EAC",
    title: "Product documentation",
    note: "EAC marked. Ask for specifications and certificates.",
  },
];
const SHOT = { h: 1800, w05: 546, w15: 508 };
const TALLEST_MM = 318;
const SIZED = FLAVOURS.find((f) => f.slug === "orange") ?? FLAVOURS[0];
const FORMATS = [
  {
    dims: "212 × 67 mm",
    img: SIZED.img,
    label: "216 × 40 mm",
    mm: 212,
    title: "Ready to go.",
    vol: "0.5",
  },
  {
    dims: "318 × 93.6 mm",
    img: SIZED.img15,
    label: "302 × 57 mm",
    mm: 318,
    title: "Made to share.",
    vol: "1.5",
  },
];

function Rise({ children, className }: { children: ReactNode; className?: string }) {
  const { inView, ref } = useReveal<HTMLDivElement>();
  return (
    <div
      className={["rc-gc__rise", className].filter(Boolean).join(" ")}
      data-in={inView}
      ref={ref}
    >
      {children}
    </div>
  );
}

function FlavourRail({ onRequest }: { onRequest: (name: string) => void }) {
  const railRef = useRef<HTMLUListElement>(null);
  const tabsRef = useRef<HTMLUListElement>(null);
  const requested = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let settleTimer: ReturnType<typeof setTimeout>;
    const settle = () => {
      requested.current = null;
    };
    const sync = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 180);
      if (requested.current !== null) return;
      const cards = [...rail.querySelectorAll<HTMLElement>("[data-slug]")];
      const end = rail.scrollWidth - rail.clientWidth;
      if (rail.scrollLeft <= 2) {
        setActive(0);
        return;
      }
      if (rail.scrollLeft >= end - 2) {
        setActive(cards.length - 1);
        return;
      }
      const edge =
        rail.getBoundingClientRect().left + parseFloat(getComputedStyle(rail).paddingLeft);
      let nearest = 0;
      cards.forEach((card, index) => {
        if (
          Math.abs(card.getBoundingClientRect().left - edge) <
          Math.abs(cards[nearest].getBoundingClientRect().left - edge)
        )
          nearest = index;
      });
      setActive(nearest);
    };
    const manual = () => {
      requested.current = null;
    };
    rail.addEventListener("scroll", sync, { passive: true });
    rail.addEventListener("pointerdown", manual, { passive: true });
    rail.addEventListener("wheel", manual, { passive: true });
    return () => {
      clearTimeout(settleTimer);
      rail.removeEventListener("scroll", sync);
      rail.removeEventListener("pointerdown", manual);
      rail.removeEventListener("wheel", manual);
    };
  }, []);

  useEffect(() => {
    const tabs = tabsRef.current;
    const button = tabs?.querySelectorAll("button")[active];
    if (!tabs || !button) return;
    const parent = tabs.getBoundingClientRect(),
      child = button.getBoundingClientRect();
    if (child.left < parent.left + 20) tabs.scrollBy({ left: child.left - parent.left - 20 });
    else if (child.right > parent.right - 20)
      tabs.scrollBy({ left: child.right - parent.right + 20 });
  }, [active]);

  const jumpTo = (index: number) => {
    const rail = railRef.current;
    const next = Math.max(0, Math.min(FLAVOURS.length - 1, index));
    const card = rail?.querySelectorAll<HTMLElement>("[data-slug]")[next];
    if (!rail || !card) return;
    requested.current = next;
    setActive(next);
    rail.scrollTo({
      left:
        rail.scrollLeft +
        card.getBoundingClientRect().left -
        rail.getBoundingClientRect().left -
        parseFloat(getComputedStyle(rail).paddingLeft),
    });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      event.key === "ArrowRight"
        ? Math.min(index + 1, 6)
        : event.key === "ArrowLeft"
          ? Math.max(index - 1, 0)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 6
              : null;
    if (next === null) return;
    event.preventDefault();
    jumpTo(next);
    tabsRef.current?.querySelectorAll("button")[next]?.focus({ preventScroll: true });
  };

  return (
    <>
      <nav aria-label="Choose a flavour">
        <ul className="rc-gc__tabs rc-wrap" ref={tabsRef}>
          {FLAVOURS.map((flavour, index) => (
            <li className={`rc-flavour--${flavour.slug}`} key={flavour.slug}>
              <button
                aria-controls="gc-flavour-rail"
                aria-current={active === index}
                className="rc-gc__tab"
                onClick={() => jumpTo(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                type="button"
              >
                <span aria-hidden="true" className="rc-gc__flavour-dot" />
                {flavour.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="rc-gc__range-controls rc-wrap">
        <span aria-live="polite" aria-atomic="true">
          <b>{String(active + 1).padStart(2, "0")}</b> / 07{" "}
          <span className="rc-gc__range-name">{FLAVOURS[active].name}</span>
        </span>
        <div>
          <button
            aria-controls="gc-flavour-rail"
            aria-label="Previous flavours"
            disabled={active === 0}
            onClick={() => jumpTo(active - 1)}
            type="button"
          >
            ←
          </button>
          <button
            aria-controls="gc-flavour-rail"
            aria-label="Next flavours"
            disabled={active === FLAVOURS.length - 1}
            onClick={() => jumpTo(active + 1)}
            type="button"
          >
            →
          </button>
        </div>
      </div>
      <ul
        aria-label="Garni Cola flavours"
        className="rc-gc__rail rc-gc__campaign-rail"
        id="gc-flavour-rail"
        ref={railRef}
      >
        {FLAVOURS.map((flavour, index) => (
          <li
            className={`rc-gc__campaign-card rc-flavour--${flavour.slug}`}
            data-active={active === index}
            data-slug={flavour.slug}
            key={flavour.slug}
          >
            <div className="rc-gc__campaign-frame">
              <span className="rc-gc__taste-note">{FLAVOUR_COPY[flavour.slug].character}</span>
              <SoftDrinkProductPhoto slug={flavour.slug} name={flavour.name} />
            </div>
            <div className="rc-gc__campaign-caption">
              <div className="rc-gc__campaign-heading">
                <h3>{flavour.name}</h3>
                <span>0.5 L · 1.5 L</span>
              </div>
              <p>{FLAVOUR_COPY[flavour.slug].note}</p>
              <a
                className="rc-gc__text-link"
                href="#gc-enquiry"
                onClick={() => onRequest(flavour.name)}
                aria-label={`Enquire about ${flavour.name}`}
              >
                Enquire about this flavour <span aria-hidden="true">↗</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
      <p className="rc-gc__collection-note rc-wrap">
        For your shop, café or next big gathering.{" "}
        <a href="#gc-enquiry" onClick={() => onRequest("")}>
          Let’s talk Garni Cola <span aria-hidden="true">↗</span>
        </a>
      </p>
    </>
  );
}

function SoftDrinksPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [motionPlaying, setMotionPlaying] = useState(true);
  const [requestedFlavour, setRequestedFlavour] = useState("");
  const [requestedGlass, setRequestedGlass] = useState(false);
  const [product, setProduct] = useState("Garni Cola");

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const syncVisibility = () => {
      page.dataset.tabVisible = String(!document.hidden);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
        }
      },
      { threshold: 0 },
    );
    page
      .querySelectorAll(".rc-gc__hero-art, .rc-gc__ticker")
      .forEach((node) => observer.observe(node));
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  const requestFlavour = (name: string) => {
    setRequestedFlavour(name);
    setRequestedGlass(false);
    setProduct("Garni Cola");
  };
  return (
    <div className="rc rc-gc" data-motion={motionPlaying ? "on" : "off"} ref={pageRef}>
      <a className="rc-gc__skip" href="#gc-fl-h">
        Skip to flavours
      </a>
      <SiteNav quoteHref="#gc-enquiry" />
      <main>
        <section aria-labelledby="gc-hero-h" className="rc-gc__hero">
          <div className="rc-gc__hero-copy">
            <p className="rc-gc__eyebrow">Garni Cola · Bottled in Armenia</p>
            <h1 className="rc-gc__display rc-gc__h1" id="gc-hero-h">
              <span>Your</span> <span className="rc-gc__hero-accent">fruity</span>{" "}
              <span>mood.</span>
            </h1>
            <p className="rc-gc__lede rc-gc__hero-sub">
              A little sunshine. A lot of flavour.
              <br />
              Meet your new favourite Armenian soda.
            </p>
            <a className="rc-gc__cta" href="#gc-fl-h">
              Explore the flavours{" "}
              <span aria-hidden="true" className="rc-gc__cta-arrow">
                →
              </span>
            </a>
            <p className="rc-gc__hero-detail">
              <span className="rc-gc__detail-dot" aria-hidden="true" />
              Seven flavours <span aria-hidden="true">·</span> Best enjoyed cold
            </p>
          </div>
          <Rise className="rc-gc__hero-art">
            <button
              aria-label={motionPlaying ? "Pause animations" : "Play animations"}
              aria-pressed={motionPlaying}
              className="rc-gc__motion-toggle"
              onClick={() => setMotionPlaying((playing) => !playing)}
              type="button"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
                <path
                  fill="currentColor"
                  d={motionPlaying ? "M3 2h3v12H3zM10 2h3v12h-3z" : "M4 2l10 6-10 6z"}
                />
              </svg>
              {motionPlaying ? "Pause" : "Play"}
            </button>
            <img
              alt=""
              className="rc-gc__hero-scene"
              src={`${ASSETS}/cola-studio-scene-720.webp`}
              srcSet={`${ASSETS}/cola-studio-scene-720.webp 720w, ${ASSETS}/cola-studio-scene-1400.webp 1400w`}
              sizes="(max-width: 939px) 100vw, 56vw"
              width={1400}
              height={1400}
              decoding="async"
            />
            <div className="rc-gc__hero-pack rc-gc__hero-pack--cherry">
              <SoftDrinkProductPhoto
                slug="cherry"
                name="Cherry"
                className="rc-gc__hero-pack-photo"
                eager
              />
            </div>
            <div className="rc-gc__hero-pack rc-gc__hero-pack--lime">
              <SoftDrinkProductPhoto
                slug="lime"
                name="Lime"
                className="rc-gc__hero-pack-photo"
                eager
              />
            </div>
            <div className="rc-gc__hero-pack rc-gc__hero-pack--orange">
              <SoftDrinkProductPhoto
                slug="orange"
                name="Orange"
                className="rc-gc__hero-pack-photo"
                priority
              />
            </div>
          </Rise>
        </section>
        <div aria-hidden="true" className="rc-gc__ticker">
          <div className="rc-gc__ticker-track">
            {[0, 1].map((copy) => (
              <div className="rc-gc__ticker-group" key={copy}>
                {SLOGAN.map((line) => (
                  <span className="rc-gc__ticker-item" key={line}>
                    {line}
                    <i>✳</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <section aria-labelledby="gc-fl-h" className="rc-gc__section rc-gc__collection">
          <Rise className="rc-wrap rc-gc__head">
            <p className="rc-gc__eyebrow">The colourful collection</p>
            <h2 className="rc-gc__display rc-gc__h2" id="gc-fl-h">
              Find your flavour.
            </h2>
            <p className="rc-gc__lede">
              Citrus days. Cherry moments. A classic cola mood.
              <br className="rc-gc__desktop-break" /> There’s a Garni Cola for every kind of you.
            </p>
          </Rise>
          <FlavourRail onRequest={requestFlavour} />
        </section>
        <section aria-labelledby="gc-fmt-h" className="rc-gc__section rc-gc__sizes">
          <div className="rc-wrap">
            <Rise className="rc-gc__head">
              <p className="rc-gc__eyebrow">Your day, your way</p>
              <h2 className="rc-gc__display rc-gc__h2" id="gc-fmt-h">
                Your day. Your size.
              </h2>
              <p className="rc-gc__lede">All seven flavours, in 0.5 L and 1.5 L PET.</p>
            </Rise>
            <Rise className="rc-gc__stagger">
              <div className="rc-gc__formats">
                {FORMATS.map((format) => (
                  <article className="rc-gc__format" key={format.vol}>
                    <div className="rc-gc__format-shot">
                      <img
                        alt={`Garni Cola ${SIZED.name}, ${format.vol} litre bottle`}
                        className="rc-gc__format-bottle"
                        height={SHOT.h}
                        loading="lazy"
                        decoding="async"
                        src={`${ASSETS}/${format.img}`}
                        style={{ "--rc-format-scale": format.mm / TALLEST_MM } as CSSProperties}
                        width={format.mm === TALLEST_MM ? SHOT.w15 : SHOT.w05}
                      />
                    </div>
                    <div className="rc-gc__format-body">
                      <h3 className="rc-gc__format-num">
                        {format.vol}
                        <i>L</i>
                      </h3>
                      <p className="rc-gc__format-title">{format.title}</p>
                      <details className="rc-gc__spec">
                        <summary>
                          Bottle details <span aria-hidden="true">+</span>
                        </summary>
                        <dl>
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
                      </details>
                    </div>
                  </article>
                ))}
              </div>
            </Rise>
          </div>
        </section>
        <section aria-labelledby="gc-glass-h" className="rc-gc__section rc-gc__glass">
          <div className="rc-wrap rc-gc__glass-grid">
            <Rise className="rc-gc__glass-art">
              <img
                alt="Garni Cola glass bottles: Orange, Tarragon, Pear and Mojito"
                decoding="async"
                height={2723}
                loading="lazy"
                sizes="(max-width: 819px) 90vw, 52vw"
                src={`${ASSETS}/cola-glass-collection-1000.webp`}
                srcSet={`${ASSETS}/cola-glass-collection-1000.webp 1000w, ${ASSETS}/cola-glass-collection-1800.webp 1800w`}
                width={4353}
              />
            </Rise>
            <Rise className="rc-gc__glass-copy">
              <p className="rc-gc__eyebrow">Garni Cola · Glass collection</p>
              <h2 className="rc-gc__display rc-gc__h2" id="gc-glass-h">
                A little more sparkle.
              </h2>
              <p className="rc-gc__lede">Four colourful flavours, dressed for the table.</p>
              <ul className="rc-gc__glass-flavours" aria-label="Glass collection flavours">
                {GLASS_FLAVOURS.map((flavour) => (
                  <li key={flavour} data-flavour={flavour.toLowerCase()}>
                    {flavour}
                  </li>
                ))}
              </ul>
              <a
                className="rc-gc__text-link"
                href="#gc-enquiry"
                onClick={() => {
                  setRequestedFlavour("");
                  setRequestedGlass(true);
                  setProduct("Garni Cola");
                }}
              >
                Ask about the glass collection <span aria-hidden="true">↗</span>
              </a>
            </Rise>
          </div>
        </section>
        <section aria-labelledby="gc-why-h" className="rc-gc__section rc-gc__section--cocoa">
          <div className="rc-wrap">
            <Rise className="rc-gc__trade-head">
              <div>
                <p className="rc-gc__eyebrow">From our home to your shelves</p>
                <h2 className="rc-gc__display rc-gc__h2" id="gc-why-h">
                  Good taste.
                  <br />
                  Good company.
                </h2>
              </div>
              <p className="rc-gc__lede">
                Made in Armenia, ready for your next chapter. Stock our colourful range or make it
                your own with private label bottling.
              </p>
            </Rise>
            <Rise className="rc-gc__stagger">
              <dl className="rc-gc__facts">
                {FACTS.map((fact) => (
                  <div className="rc-gc__fact" key={fact.n}>
                    <dt>{fact.n}</dt>
                    <dd>
                      <strong>{fact.title}</strong>
                      <span>{fact.note}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Rise>
          </div>
        </section>
        <section
          aria-labelledby="gc-enquiry-h"
          className="rc-gc__section rc-gc__section--butter"
          id="gc-enquiry"
        >
          <div className="rc-wrap rc-gc__enquiry-grid">
            <div className="rc-gc__enquiry-copy">
              <p className="rc-gc__eyebrow">Wholesale &amp; private label</p>
              <h2 className="rc-gc__display rc-gc__h2" id="gc-enquiry-h">
                Let’s make
                <br />
                someone’s day.
              </h2>
              <p className="rc-gc__lede">
                Stock Garni Cola or create your own label. Tell us what you have in mind.
              </p>
              <a className="rc-gc__text-link" href="mailto:info@rocarm.am">
                info@rocarm.am <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="rc-gc__enquiry-form">
              {(requestedFlavour || requestedGlass) && (
                <div
                  className="rc-gc__selection"
                  key={requestedGlass ? "glass" : requestedFlavour}
                  role="status"
                >
                  <span>
                    Your pick:{" "}
                    <strong>{requestedGlass ? "Glass collection" : requestedFlavour}</strong>
                    {!requestedGlass && " · 0.5 L & 1.5 L"}
                  </span>
                  <button
                    aria-label={requestedGlass ? "Clear glass selection" : "Clear selected flavour"}
                    onClick={() => {
                      setRequestedFlavour("");
                      setRequestedGlass(false);
                    }}
                    type="button"
                  >
                    ×
                  </button>
                </div>
              )}
              <QuoteForm
                product={product}
                onProductChange={(value) => {
                  setProduct(value);
                  if (value !== "Garni Cola") {
                    setRequestedFlavour("");
                    setRequestedGlass(false);
                  }
                }}
                requestDetails={
                  requestedGlass
                    ? "Interested in the Garni Cola glass bottle collection. Please share available flavours, bottle sizes and ordering details."
                    : requestedFlavour
                      ? `Interested in Garni Cola ${requestedFlavour}, 0.5 L / 1.5 L.`
                      : "Enquiry from the Garni Cola soft drinks collection."
                }
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
