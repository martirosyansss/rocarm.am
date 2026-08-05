import { createFileRoute } from "@tanstack/react-router";

import { QuoteCta } from "@/components/rocarm/ctas";
import { SiteFooter, SiteNav } from "@/components/rocarm/site-chrome";
import { ASSETS, FLAVOURS } from "@/lib/catalog";

export const Route = createFileRoute("/soft-drinks")({
  component: SoftDrinksPage,
  head: () => ({
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
const SLOGAN = ["Your fruity mood", "Քո մրգային տրամադրությունը", "Твое фруктовое настроение"];

const FORMATS = [
  {
    detail: "Height 212 mm, diameter 67 mm. Label 216 by 40 mm.",
    note: "The impulse format. Coolers, kiosks, lunch counters.",
    vol: "0.5 L",
  },
  {
    detail: "Height 318 mm, diameter 93.6 mm. Label 302 by 57 mm.",
    note: "The table format. Families, canteens, events.",
    vol: "1.5 L",
  },
];

function SoftDrinksPage() {
  return (
    <div className="rc rc-fizz">
      <SiteNav />

      <main>
        {/* Hero */}
        <section aria-labelledby="c-hero-h" className="rc-fizz__hero">
          <img alt="" aria-hidden="true" className="rc-fizz__drift rc-fizz__drift--1" src={`${ASSETS}/fruit-orange.webp`} />
          <img alt="" aria-hidden="true" className="rc-fizz__drift rc-fizz__drift--2" src={`${ASSETS}/fruit-lime.webp`} />
          <img alt="" aria-hidden="true" className="rc-fizz__drift rc-fizz__drift--3" src={`${ASSETS}/fruit-cherry.webp`} />
          <img alt="" aria-hidden="true" className="rc-fizz__drift rc-fizz__drift--4" src={`${ASSETS}/fruit-pineapple.webp`} />
          <img alt="" aria-hidden="true" className="rc-fizz__drift rc-fizz__drift--5" src={`${ASSETS}/fruit-banana.webp`} />
          <img alt="" aria-hidden="true" className="rc-fizz__drift rc-fizz__drift--6" src={`${ASSETS}/fruit-mango.webp`} />

          <div className="rc-wrap rc-fizz__hero-body">
            <h1 className="rc-fizz__shout" id="c-hero-h">
              Your fruity mood
            </h1>
            <p className="rc-fizz__sub">
              Seven flavours, two sizes, one very cold bottle. Garni Cola has
              been the fun half of the plant since the water got serious.
            </p>
            <QuoteCta href="/#quote" label="Request a quote" />
          </div>

          <div className="rc-fizz__lineup" role="presentation">
            {FLAVOURS.map((flavour, i) => (
              <img
                alt=""
                className="rc-fizz__bottle"
                key={flavour.slug}
                src={`${ASSETS}/${flavour.img}`}
                style={{ animationDelay: `${i * 0.22}s` }}
              />
            ))}
          </div>
        </section>

        {/* Slogan marquee */}
        <div aria-hidden="true" className="rc-marquee">
          <div className="rc-marquee__track">
            {[0, 1].map((copy) => (
              <span className="rc-marquee__group" key={copy}>
                {SLOGAN.map((line) => (
                  <span className="rc-marquee__item" key={line}>
                    {line}
                    <i className="rc-marquee__dot" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Flavours */}
        <section aria-labelledby="c-fl-h" className="rc-fizz__section">
          <div className="rc-wrap">
            <h2 className="rc-fizz__h2" id="c-fl-h">
              Seven flavours
            </h2>
            <p className="rc-fizz__lede">
              One bottle shape across the family, one label system, seven hand
              painted fruits. Mixed pallets with the water range are standard.
            </p>
          </div>

          <div className="rc-fizz__grid">
            {FLAVOURS.map((flavour) => (
              <article
                className={`rc-tile rc-flavour--${flavour.slug}`}
                key={flavour.slug}
              >
                <img
                  alt=""
                  aria-hidden="true"
                  className="rc-tile__fruit"
                  loading="lazy"
                  src={`${ASSETS}/fruit-${flavour.fruit}.webp`}
                />
                <img
                  alt={`Garni Cola ${flavour.name}`}
                  className="rc-tile__bottle"
                  loading="lazy"
                  src={`${ASSETS}/${flavour.img}`}
                />
                <div className="rc-tile__foot">
                  <h3 className="rc-tile__name">{flavour.name}</h3>
                  <p className="rc-tile__note">{flavour.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Formats */}
        <section aria-labelledby="c-fmt-h" className="rc-fizz__section rc-fizz__section--dark">
          <div className="rc-wrap">
            <h2 className="rc-fizz__h2" id="c-fmt-h">
              Two sizes
            </h2>
            <div className="rc-fmt">
              {FORMATS.map((f) => (
                <article className="rc-fmt__card" key={f.vol}>
                  <span className="rc-fmt__vol rc-figure">{f.vol}</span>
                  <p className="rc-fmt__note">{f.note}</p>
                  <p className="rc-fmt__detail rc-figure">{f.detail}</p>
                  <span className="rc-fmt__mark">EAC</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Private label */}
        <section aria-labelledby="c-pl-h" className="rc-fizz__section rc-fizz__cta">
          <div className="rc-wrap">
            <h2 className="rc-fizz__h2" id="c-pl-h">
              Or put your own name on it
            </h2>
            <p className="rc-fizz__lede">
              The whole flavour range can be filled as private label, from your
              artwork, on the same certified line as our own brands.
            </p>
            <QuoteCta href="/#quote" label="Request a quote" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
