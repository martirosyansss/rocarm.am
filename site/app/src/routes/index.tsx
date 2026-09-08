import { Link, createFileRoute } from "@tanstack/react-router";

import { BannerCta, DocCta, RangeCta } from "@/components/rocarm/ctas";
import { ExportMap } from "@/components/rocarm/export-map";
import { QuoteForm } from "@/components/rocarm/quote-form";
import { SiteFooter, SiteNav } from "@/components/rocarm/site-chrome";
import { ASSETS, FIGURES, PARAMETERS } from "@/lib/catalog";
import { scrollScrubScenes } from "@/scroll-scrub-scenes";

const [heroScene] = scrollScrubScenes;

export const Route = createFileRoute("/")({
  component: Index,
});

const PRIVATE_LABEL = [
  {
    body: "Your brand on our line. Still and sparkling water in PET or glass, and the full soft drink range.",
    title: "Both categories",
  },
  {
    body: "We work from your artwork or adapt it to the bottle. Label sizes are fixed by the format, everything else is yours.",
    title: "Your artwork",
  },
  {
    body: "The same ISO 22000 and ISO 9001 line that fills our own brands. No separate standard for contract work.",
    title: "Same certified line",
  },
];

function Index() {
  return (
    <div className="rc">
      <SiteNav />

      <main id="top">
        {/* Hero — static, no scroll-driven animation */}
        <section aria-labelledby="hero-h" className="rc-home-hero">
          <img alt="" className="rc-home-hero__img" fetchPriority="high" src={heroScene.poster} />
          <div className="rc-home-hero__cap rc-wrap">
            <p className="rc-eyebrow">{heroScene.kicker}</p>
            <h1 className="rc-h1" id="hero-h" style={{ marginTop: "16px" }}>
              {heroScene.title}
            </h1>
            <p className="rc-lede" style={{ marginTop: "18px" }}>
              {heroScene.body}
            </p>
            {heroScene.tags && heroScene.tags.length > 0 ? (
              <ul className="rc-tags">
                {heroScene.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        {/* Composition and certificates — proof, not mood: real lab values and
            real cert marks, the same data a compliance team would ask for. */}
        <section aria-labelledby="proof-h" className="rc-section" id="composition">
          <div className="rc-wrap">
            <p className="rc-eyebrow">Composition and certificates</p>
            <h2 className="rc-h2" id="proof-h" style={{ marginTop: "16px" }}>
              What the basalt leaves behind
            </h2>
            <p className="rc-lede" style={{ marginTop: "18px" }}>
              Climaveneta, Kaeser, STM and Siat run the plant, and the water
              meets no open air between the source and the cap. Low
              mineralisation, stable through the year, verified batch by batch
              in our own laboratory before a pallet leaves.
            </p>
          </div>

          <div
            className="rc-wrap"
            style={{
              display: "grid",
              gap: "clamp(34px, 5vw, 80px)",
              gridTemplateColumns: "1fr",
              marginTop: "clamp(28px, 3.5vw, 52px)",
            }}
          >
            <div>
              <table className="rc-table">
                <caption
                  className="rc-note"
                  style={{ captionSide: "bottom", paddingTop: "14px", textAlign: "left" }}
                >
                  Values are issued per production batch and are not published
                  as fixed figures.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Parameter</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {PARAMETERS.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td className="rc-figure">{row.unit}</td>
                      <td>Batch certificate</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="rc-h3">Standards held</h3>
              <div className="rc-certs" style={{ marginTop: "22px" }}>
                <img alt="ISO 22000 certified" loading="lazy" src={`${ASSETS}/cert-iso22000.webp`} />
                <img alt="ISO 9001 certified" loading="lazy" src={`${ASSETS}/cert-iso9001.webp`} />
                <img alt="EAC conformity" loading="lazy" src={`${ASSETS}/cert-eac.webp`} />
              </div>
              <ul className="rc-standards">
                <li className="rc-body">
                  <strong>ISO 22000</strong> food safety management, hazard
                  control across the whole line.
                </li>
                <li className="rc-body">
                  <strong>ISO 9001</strong> quality management, so every batch
                  repeats the last one.
                </li>
                <li className="rc-body">
                  <strong>EAC</strong> conformity for the Eurasian Economic
                  Union — cleared for your market alongside ISO for everyone
                  else.
                </li>
              </ul>
              <div style={{ marginTop: "28px" }}>
                <DocCta href="/#quote" label="Request the quality report" tag="PDF on request" />
              </div>
              <div className="rc-photos">
                <img
                  alt="Filled cases on the Rocarm bottling floor in Yerevan"
                  loading="lazy"
                  src={`${ASSETS}/photo-crates.webp`}
                />
                <img
                  alt="School group touring the Rocarm plant in protective clothing"
                  loading="lazy"
                  src={`${ASSETS}/photo-plant-tour.webp`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Two brands, two pages */}
        <section aria-labelledby="brands-h" className="rc-section">
          <div className="rc-wrap">
            <h2 className="rc-h2 rc-rise" id="brands-h">
              One plant, two brands
            </h2>
            <p className="rc-lede" style={{ marginTop: "20px" }}>
              Rocarm LLC has bottled in Yerevan since 1999. Natural spring water
              under Garni Crystalline, carbonated soft drinks under Garni Cola,
              on the same certified line.
            </p>
          </div>

          <div className="rc-diptych" style={{ marginTop: "clamp(32px, 4vw, 64px)" }}>
            <article className="rc-diptych__panel">
              <img
                alt=""
                className="rc-diptych__bg"
                loading="lazy"
                src={`${ASSETS}/plate-hero.webp`}
              />
              <div className="rc-diptych__body">
                <h3 className="rc-h3">Garni Crystalline</h3>
                <p className="rc-body" style={{ margin: "12px 0 22px", maxWidth: "42ch" }}>
                  Still and sparkling spring water. Seven formats from 0.33 to
                  18.9 litres, in PET and glass.
                </p>
                <RangeCta to="/water">See the water</RangeCta>
              </div>
            </article>

            <article className="rc-diptych__panel rc-diptych__panel--cola">
              <img
                alt=""
                className="rc-diptych__bg"
                loading="lazy"
                src={`${ASSETS}/cola-orange.webp`}
              />
              <div className="rc-diptych__body">
                <h3 className="rc-h3">Garni Cola</h3>
                <p className="rc-body" style={{ margin: "12px 0 22px", maxWidth: "42ch" }}>
                  Seven fruit flavours in 0.5 and 1.5 litre PET. Hand painted
                  fruit artwork, one bottle shape across the family.
                </p>
                <RangeCta to="/soft-drinks">See the soft drinks</RangeCta>
              </div>
            </article>
          </div>
        </section>

        {/* Source band */}
        <section aria-labelledby="band-h" className="rc-band">
          <img
            alt="The Garni Temple above the Azat river gorge"
            className="rc-band__img"
            loading="lazy"
            src={`${ASSETS}/plate-temple-wide.webp`}
          />
          <div className="rc-band__cap rc-wrap">
            <h2 className="rc-h3" id="band-h">
              The gorge below the temple
            </h2>
            <p className="rc-body" style={{ marginTop: "10px", maxWidth: "44ch" }}>
              Basalt has been filtering this water since long before anyone
              raised a column above it.
            </p>
          </div>
          <img
            alt="Garni Crystalline at the water"
            className="rc-band__inset"
            loading="lazy"
            src={`${ASSETS}/photo-spring.webp`}
          />
        </section>

        {/* Export */}
        <section aria-labelledby="export-h" className="rc-section rc-export" id="export">
          <div className="rc-wrap">
            <p className="rc-eyebrow">For importers and distributors</p>
            <h2 className="rc-h2" id="export-h" style={{ marginTop: "16px" }}>
              Where we ship
            </h2>
            <p className="rc-lede" style={{ marginTop: "18px" }}>
              Three markets today, four opening now, and thirty two more where
              we are ready to talk. Every route on the map starts at the plant
              in Yerevan, FOB Poti or CIF your port.
            </p>
          </div>

          <div className="rc-wrap" style={{ marginTop: "clamp(26px, 3.4vw, 46px)" }}>
            <ExportMap />
          </div>

          <div className="rc-figs" style={{ marginTop: "clamp(28px, 3.5vw, 48px)" }}>
            {FIGURES.map((figure) => (
              <div className="rc-fig" key={figure.k}>
                <span className="rc-fig__n">{figure.n}</span>
                <span className="rc-fig__k">{figure.k}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Private label */}
        <section aria-labelledby="pl-h" className="rc-section rc-section--tight" id="private-label">
          <div className="rc-wrap">
            <h2 className="rc-h2" id="pl-h">
              We bottle under your own brand
            </h2>
            <p className="rc-lede" style={{ marginTop: "18px" }}>
              Private label is a standing part of what we do. If you are a
              retail chain or a distributor with your own brand, we fill it.
            </p>

            <dl className="rc-pl" style={{ marginTop: "clamp(28px, 3.5vw, 48px)" }}>
              {PRIVATE_LABEL.map((item) => (
                <div className="rc-pl__item" key={item.title}>
                  <dt className="rc-h3">{item.title}</dt>
                  <dd className="rc-body">{item.body}</dd>
                </div>
              ))}
            </dl>

            <p className="rc-note" style={{ marginTop: "26px", maxWidth: "62ch" }}>
              Minimum runs, artwork deadlines and lead times depend on the
              format and the season. Ask and we quote them for your case.
            </p>

            <div style={{ marginTop: "clamp(30px, 4vw, 52px)" }}>
              <BannerCta
                href="#quote"
                note="Tell us the market, the volume, and whether it is our brand or yours."
                title="Start a conversation about your market"
              />
            </div>
          </div>
        </section>

        {/* Quote */}
        <section aria-labelledby="quote-h" className="rc-section rc-section--tight" id="quote">
          <div className="rc-wrap">
            <h2 className="rc-h2" id="quote-h">
              Request a quote
            </h2>
            <p className="rc-lede" style={{ margin: "18px 0 clamp(28px, 3.5vw, 44px)" }}>
              The more you tell us about the market and the format, the more
              exact the first offer is.
            </p>
            <QuoteForm />
            <p className="rc-note" style={{ marginTop: "30px" }}>
              Looking for a specific product? See{" "}
              <Link className="rc-inline-link" to="/water">
                the water range
              </Link>{" "}
              or{" "}
              <Link className="rc-inline-link" to="/soft-drinks">
                the soft drinks
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
