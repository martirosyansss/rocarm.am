import { createFileRoute } from "@tanstack/react-router";

import { DocCta, QuoteCta } from "@/components/rocarm/ctas";
import { SiteFooter, SiteNav } from "@/components/rocarm/site-chrome";
import { ASSETS, PARAMETERS, WATER } from "@/lib/catalog";

export const Route = createFileRoute("/water")({
  component: WaterPage,
  head: () => ({
    meta: [
      { title: "Garni Crystalline | Rocarm" },
      {
        content:
          "Armenian natural spring water, still and sparkling, in seven formats from 0.33 to 18.9 litres. ISO 22000, ISO 9001 and EAC certified.",
        name: "description",
      },
    ],
  }),
});

function WaterPage() {
  return (
    <div className="rc">
      <SiteNav />

      <main>
        <section aria-labelledby="w-hero-h" className="rc-hero">
          <img
            alt=""
            className="rc-hero__bg"
            src={`${ASSETS}/plate-hero.webp`}
          />
          <div className="rc-hero__body rc-wrap">
            <h1 className="rc-h1" id="w-hero-h">
              Garni Crystalline
            </h1>
            <p className="rc-lede" style={{ marginTop: "20px" }}>
              Natural spring water from the gorge below the Garni Temple, still
              and sparkling, bottled in Yerevan since 1999.
            </p>
            <div style={{ marginTop: "30px" }}>
              <QuoteCta href="/#quote" />
            </div>
          </div>
        </section>

        <section aria-labelledby="w-range-h" className="rc-section">
          <div className="rc-wrap">
            <h2 className="rc-h2" id="w-range-h">
              Seven formats
            </h2>
            <p className="rc-lede" style={{ marginTop: "18px" }}>
              Every format ships on standard euro pallets. Case counts and
              container loading plans come with the quote.
            </p>
          </div>
          <div className="rc-wrap" style={{ marginTop: "clamp(28px, 3.5vw, 52px)" }}>
            <div className="rc-rail">
              {WATER.map((item) => (
                <article className="rc-rail__card" key={`${item.vol}-${item.img}`}>
                  <div className="rc-rail__shot">
                    <img alt="" loading="lazy" src={`${ASSETS}/${item.img}`} />
                  </div>
                  <span className="rc-rail__vol rc-figure">{item.vol}</span>
                  <span className="rc-rail__meta">{item.meta}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="w-src-h" className="rc-band">
          <img
            alt="The Garni Temple above the Azat river gorge"
            className="rc-band__img"
            loading="lazy"
            src={`${ASSETS}/plate-temple-wide.webp`}
          />
          <div className="rc-band__cap rc-wrap">
            <h2 className="rc-h3" id="w-src-h">
              Where it comes from
            </h2>
            <p className="rc-body" style={{ marginTop: "10px", maxWidth: "44ch" }}>
              The spring rises in the Azat river gorge, filtered through the
              basalt columns that give the valley its name.
            </p>
          </div>
          <img
            alt="Garni Crystalline at the water"
            className="rc-band__inset"
            loading="lazy"
            src={`${ASSETS}/photo-spring.webp`}
          />
        </section>

        <section aria-labelledby="w-q-h" className="rc-section" id="quality">
          <div className="rc-wrap">
            <h2 className="rc-h2" id="w-q-h">
              Certified batch by batch
            </h2>
            <div
              style={{
                display: "grid",
                gap: "clamp(34px, 5vw, 80px)",
                gridTemplateColumns: "1fr",
                marginTop: "clamp(28px, 3.5vw, 52px)",
              }}
            >
              <div>
                <p className="rc-body" style={{ marginBottom: "26px", maxWidth: "54ch" }}>
                  Every shipment travels with a current certificate of analysis
                  covering the parameters below. Ask for the latest report and we
                  send the signed laboratory document, not a marketing sheet.
                </p>
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
                    Union.
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
          </div>
        </section>

        <section className="rc-section rc-section--tight">
          <div className="rc-wrap">
            <h2 className="rc-h2">Also available under your own brand</h2>
            <p className="rc-lede" style={{ margin: "18px 0 30px" }}>
              The full water range can be filled as private label, on the same
              certified line, from your artwork.
            </p>
            <QuoteCta href="/#quote" label="Request a quote" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
