import { createFileRoute } from "@tanstack/react-router";

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
const SLOGAN = [
  "Your fruity mood",
  "Քո մրգային տրամադրությունը",
  "Твое фруктовое настроение",
];

const FORMATS = [
  {
    dims: "212 mm tall, 67 mm across",
    label: "216 by 40 mm",
    note: "The impulse buy. Coolers, kiosks, lunch counters.",
    vol: "0.5",
  },
  {
    dims: "318 mm tall, 93.6 mm across",
    label: "302 by 57 mm",
    note: "The table bottle. Families, canteens, events.",
    vol: "1.5",
  },
];

/** Decorative fruit in the hero. Three only, so the motion stays readable. */
const HERO_FRUIT = [
  { file: "fruit-orange.webp", h: 640, pos: "a", w: 489 },
  { file: "fruit-lime.webp", h: 640, pos: "b", w: 485 },
  { file: "fruit-pineapple.webp", h: 640, pos: "c", w: 576 },
];

function SoftDrinksPage() {
  return (
    <div className="rc rc-kb">
      <SiteNav />

      <main>
        {/* Hero: asymmetric, type as the hero, one bottle, three fruits */}
        <section aria-labelledby="kb-hero-h" className="rc-kb__hero">
          {HERO_FRUIT.map((fruit) => (
            <img
              alt=""
              aria-hidden="true"
              className={`rc-kb__fruit rc-kb__fruit--${fruit.pos}`}
              height={fruit.h}
              key={fruit.file}
              src={`${ASSETS}/${fruit.file}`}
              width={fruit.w}
            />
          ))}

          <div className="rc-kb__hero-grid rc-wrap">
            <div className="rc-kb__hero-type">
              <p className="rc-kb__eyebrow">Garni Cola, bottled in Armenia</p>
              <h1 className="rc-kb__shout" id="kb-hero-h">
                Your
                <br />
                fruity
                <br />
                <span className="rc-kb__shout-flood">mood</span>
              </h1>
              <p className="rc-kb__sub">
                Seven flavours. Two sizes. One very cold bottle. The loud half
                of a plant that has been bottling since 1999.
              </p>
              <a className="rc-kb__cta" href="/#quote">
                Request a quote
                <span aria-hidden="true" className="rc-kb__cta-arrow">
                  →
                </span>
              </a>
            </div>

            <div className="rc-kb__hero-shot">
              <img
                alt="Garni Cola with orange flavour, 0.5 litre"
                className="rc-kb__hero-bottle"
                height={900}
                src={`${ASSETS}/cola-orange.webp`}
                width={900}
              />
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div aria-hidden="true" className="rc-kb__marquee">
          <div className="rc-kb__marquee-track">
            {[0, 1].map((copy) => (
              <span className="rc-kb__marquee-group" key={copy}>
                {SLOGAN.map((line) => (
                  <span className="rc-kb__marquee-item" key={line}>
                    {line}
                    <i className="rc-kb__marquee-dot" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Flavours */}
        <section aria-labelledby="kb-fl-h" className="rc-kb__section">
          <div className="rc-wrap rc-kb__head">
            <h2 className="rc-kb__h2" id="kb-fl-h">
              Seven flavours
            </h2>
            <p className="rc-kb__lede">
              One bottle shape across the family, one label system, seven hand
              painted fruits. Mixed pallets with the water range are standard.
            </p>
          </div>

          <ul className="rc-kb__grid">
            {FLAVOURS.map((flavour) => (
              <li className={`rc-kb__card rc-flavour--${flavour.slug}`} key={flavour.slug}>
                <img
                  alt=""
                  aria-hidden="true"
                  className="rc-kb__card-fruit"
                  height={640}
                  loading="lazy"
                  src={`${ASSETS}/fruit-${flavour.fruit}.webp`}
                  width={640}
                />
                <img
                  alt={`Garni Cola ${flavour.name}`}
                  className="rc-kb__card-bottle"
                  height={900}
                  loading="lazy"
                  src={`${ASSETS}/${flavour.img}`}
                  width={900}
                />
                <div className="rc-kb__card-foot">
                  <h3 className="rc-kb__card-name">{flavour.name}</h3>
                  <p className="rc-kb__card-note">{flavour.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Formats */}
        <section aria-labelledby="kb-fmt-h" className="rc-kb__section rc-kb__section--ink">
          <div className="rc-wrap rc-kb__head">
            <h2 className="rc-kb__h2" id="kb-fmt-h">
              Two sizes
            </h2>
          </div>
          <div className="rc-wrap">
            <div className="rc-kb__formats">
              {FORMATS.map((f) => (
                <article className="rc-kb__format" key={f.vol}>
                  <span aria-hidden="true" className="rc-kb__format-num">
                    {f.vol}
                    <i>L</i>
                  </span>
                  <p className="rc-kb__format-note">{f.note}</p>
                  <dl className="rc-kb__spec">
                    <div>
                      <dt>Bottle</dt>
                      <dd>{f.dims}</dd>
                    </div>
                    <div>
                      <dt>Label</dt>
                      <dd>{f.label}</dd>
                    </div>
                    <div>
                      <dt>Marking</dt>
                      <dd>EAC</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Private label */}
        <section aria-labelledby="kb-pl-h" className="rc-kb__section rc-kb__section--flood">
          <div className="rc-wrap">
            <h2 className="rc-kb__h2" id="kb-pl-h">
              Or put your own name on it
            </h2>
            <p className="rc-kb__lede">
              The whole flavour range can be filled as private label, from your
              artwork, on the same certified line as our own brands.
            </p>
            <a className="rc-kb__cta rc-kb__cta--onflood" href="/#quote">
              Request a quote
              <span aria-hidden="true" className="rc-kb__cta-arrow">
                →
              </span>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
