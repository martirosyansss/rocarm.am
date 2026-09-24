import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, Play, Plus, X } from "lucide-react";

import { DocCta, ProductSheetLink } from "@/components/rocarm/ctas";
import { QuoteForm } from "@/components/rocarm/quote-form";
import { SiteFooter, SiteNav } from "@/components/rocarm/site-chrome";
import { WaterProductPhoto } from "@/components/rocarm/water-product-photo";
import { ASSETS, PARAMETERS, WATER } from "@/lib/catalog";

import "./water.css";

export const Route = createFileRoute("/water")({
  component: WaterPage,
  head: () => ({
    meta: [
      { title: "Garni Crystalline — Armenian Natural Water | Rocarm" },
      {
        content:
          "Meet Garni Crystalline natural Armenian water. Still or sparkling, in PET, glass and large formats from 0.33 to 18.9 litres. Explore the range and request an export quote.",
        name: "description",
      },
    ],
  }),
});

const FILTERS = ["All formats", "Still", "Sparkling", "Glass", "Large formats"] as const;
type Filter = (typeof FILTERS)[number];
type Water = (typeof WATER)[number];

function category(water: Water): "Still" | "Sparkling" | "For coolers" {
  if (water.img === "water-189.webp") return "For coolers";
  return water.meta.includes("sparkling") ? "Sparkling" : "Still";
}

function productName(water: Water) {
  if (water.vol === "6 L" || water.vol === "10 L") return `Garni Crystalline ${water.vol}`;
  if (water.meta.startsWith("Glass")) {
    return `Garni Crystalline 0.5 L glass ${category(water).toLowerCase()}`;
  }
  const kind = category(water);
  return `Garni Crystalline ${kind === "For coolers" ? "18.9 L" : kind.toLowerCase()}`;
}

function formatKind(water: Water) {
  return `${water.meta.startsWith("Glass") ? "Glass · " : ""}${category(water)}`;
}

function WaterPage() {
  const [filter, setFilter] = useState<Filter>("All formats");
  const [selection, setSelection] = useState<Water | null>(null);
  const [product, setProduct] = useState("Garni Crystalline still");
  const [qualityRequest, setQualityRequest] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const formats = WATER.filter(
    (water) =>
      filter === "All formats" ||
      (filter === "Glass"
        ? water.meta.startsWith("Glass")
        : filter === "Large formats"
          ? ["6 L", "10 L", "18.9 L"].includes(water.vol)
          : category(water) === filter),
  );

  return (
    <div className="rc rc-water">
      <SiteNav quoteHref="#water-quote" />
      <a className="rc-skip" href="#water-range">
        Skip to water formats
      </a>
      <main id="water-top">
        <section className="water-hero" aria-labelledby="water-title">
          <div className="water-hero-inner rc-wrap">
            <div className="water-hero-heading">
              <div className="water-hero-brand">
                <img
                  src={`${ASSETS}/garni-wordmark.svg`}
                  alt="Garni Crystalline"
                  width={117}
                  height={40}
                />
                <p>
                  Natural water
                  <br />
                  From Garni, Armenia
                </p>
              </div>
              <h1 id="water-title">
                Naturally
                <br />
                <span>Armenian.</span>
              </h1>
              <p className="water-hero-statement">
                One origin. Still or sparkling.
                <br />A little of Armenia in every bottle.
              </p>
            </div>
            <div className="water-hero-copy">
              <a className="water-button water-explore" href="#water-range">
                Explore the collection <ArrowDown size={20} aria-hidden="true" />
              </a>
              <span className="water-hero-availability">PET &amp; glass · 0.33–18.9 L</span>
            </div>
            <div className="water-hero-art">
              <p className="water-hero-edition">The Garni Crystalline collection</p>
              <figure className="water-hero-product water-hero-product--still">
                <img
                  className="water-hero-bottle"
                  src={`${ASSETS}/water-15-source.jpg`}
                  alt="Garni Crystalline 1.5 L still water in its original bottle"
                  width={881}
                  height={2489}
                  fetchPriority="high"
                />
                <figcaption>
                  <span>Still</span>
                  <span>1.5 L</span>
                </figcaption>
              </figure>
              <figure className="water-hero-product water-hero-product--sparkling">
                <img
                  className="water-hero-bottle"
                  src={`${ASSETS}/water-05-gas-source.jpg`}
                  alt="Garni Crystalline 0.5 L sparkling water in its original bottle"
                  width={937}
                  height={2583}
                />
                <figcaption>
                  <span>Sparkling</span>
                  <span>0.5 L</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="water-hero-provenance">
            <div className="water-hero-provenance-inner rc-wrap">
              <p className="water-hero-since">
                <span>Bottled in Armenia</span>
                <strong>Since 1999.</strong>
              </p>
              <p className="water-hero-range">
                <strong>
                  One source.
                  <br />
                  Eleven formats.
                </strong>
                <span>
                  For everyday moments.
                  <br />
                  For every table.
                </span>
              </p>
              <a className="water-hero-origin" href="#water-source">
                <span>
                  It starts in Garni<small>Discover our source</small>
                </span>
                <ArrowUpRight size={28} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="water-range water-section"
          id="water-range"
          aria-labelledby="water-range-title"
        >
          <div className="rc-wrap">
            <div className="water-section-heading">
              <div>
                <p className="water-eyebrow">The collection</p>
                <h2 id="water-range-title">Choose your format.</h2>
              </div>
              <p className="water-lede">Still or sparkling. PET, glass and large formats.</p>
            </div>
            <div className="water-range-toolbar">
              <div className="water-filters" role="group" aria-label="Filter water formats">
                {FILTERS.map((option) => (
                  <button
                    type="button"
                    key={option}
                    aria-pressed={filter === option}
                    aria-controls="water-products"
                    onClick={() => setFilter(option)}
                  >
                    {filter === option && <Check size={15} aria-hidden="true" />}
                    {option}
                  </button>
                ))}
              </div>
              <p className="water-range-count" role="status">
                {formats.length} formats
              </p>
            </div>
            <ul className="water-products" id="water-products">
              {formats.map((water) => (
                <li key={water.img}>
                  <a
                    className="water-product"
                    data-kind={category(water)}
                    href="#water-quote"
                    aria-label={`Request a quote for ${water.vol} ${formatKind(water).toLowerCase()} water`}
                    onClick={() => {
                      setSelection(water);
                      setProduct(productName(water));
                    }}
                  >
                    <div className="water-product-photo">
                      <WaterProductPhoto image={water.img} framing="compact" />
                    </div>
                    <div className="water-product-info">
                      <div className="water-product-title">
                        <h3>{water.vol}</h3>
                        <span aria-hidden="true">
                          <ArrowUpRight size={20} />
                        </span>
                      </div>
                      <p className="water-product-meta">
                        <span className="water-product-kind">
                          {category(water) === "For coolers" ? "Cooler" : category(water)}
                        </span>
                        <span>
                          {water.meta.startsWith("Glass")
                            ? "Glass"
                            : water.meta.startsWith("Returnable")
                              ? "Returnable"
                              : "PET"}
                        </span>
                      </p>
                      <span className="water-product-enquire">Request a quote</span>
                    </div>
                  </a>
                </li>
              ))}
              {filter === "All formats" && (
                <li className="water-range-custom">
                  <div>
                    <p className="water-eyebrow">Private label</p>
                    <h3>
                      Your brand.
                      <br />
                      Our source.
                    </h3>
                    <p className="water-custom-copy">
                      Still and sparkling water, bottled under your own label.
                    </p>
                  </div>
                  <a className="water-text-link" href="#water-private-label">
                    Explore private label <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                </li>
              )}
            </ul>
            <div className="water-range-footnote">
              <p>Planning a mixed shipment? Let’s find your combination.</p>
              <ProductSheetLink />
            </div>
          </div>
        </section>

        <section
          className="water-source water-section"
          id="water-source"
          aria-labelledby="water-source-title"
        >
          <div className="water-source-grid rc-wrap">
            <div className="water-source-copy">
              <p className="water-eyebrow">Our origin</p>
              <h2 id="water-source-title">
                Beneath the
                <br />
                Garni mountains.
              </h2>
              <div className="water-source-story">
                <p className="water-source-depth">
                  <strong>
                    140<span>m</span>
                  </strong>
                  <span>beneath the Garni mountains</span>
                </p>
                <p>
                  Drawn beneath Armenian basalt. Bottled in Yerevan since 1999. The same source, in
                  every bottle.
                </p>
              </div>
            </div>
            <div className="water-film">
              <div className="water-film-player">
                {filmPlaying ? (
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/M8kg-Njyb8s?autoplay=1&playsinline=1&rel=0"
                    title="Garni Crystalline brand film by DOMINO Production"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={(event) => event.currentTarget.focus()}
                  />
                ) : (
                  <button
                    className="water-film-play"
                    type="button"
                    aria-label="Play the Garni Crystalline brand film"
                    onClick={() => setFilmPlaying(true)}
                  >
                    <img
                      src={`${ASSETS}/garni-film-poster.jpg`}
                      alt="The bottling line shown in the Garni Crystalline brand film"
                      width={1280}
                      height={720}
                      loading="lazy"
                    />
                    <span>
                      <Play size={18} fill="currentColor" aria-hidden="true" /> Watch the film
                    </span>
                  </button>
                )}
              </div>
              <p className="water-film-credit">
                <span>Garni, Armenia</span>
                <span>Film by DOMINO Production</span>
              </p>
            </div>
          </div>
        </section>

        <div className="water-business water-section rc-wrap">
          <section className="water-quality" id="quality" aria-labelledby="water-quality-title">
            <div className="water-quality-intro">
              <p className="water-eyebrow">Source &amp; standards</p>
              <h2 id="water-quality-title">Quality, documented.</h2>
              <p>
                From food safety to the composition of your batch. The details are available for
                your review.
              </p>
            </div>
            <div className="water-quality-evidence">
              <div className="water-standards" aria-label="Quality standards">
                {[
                  ["ISO 22000", "cert-iso22000.webp", "Food safety"],
                  ["ISO 9001", "cert-iso9001.webp", "Quality management"],
                  ["EAC", "cert-eac.webp", "Conformity"],
                ].map(([name, img, caption]) => (
                  <div key={name}>
                    <img src={`${ASSETS}/${img}`} alt="" width={60} height={60} loading="lazy" />
                    <strong>{name}</strong>
                    <span>{caption}</span>
                  </div>
                ))}
              </div>
              <DocCta
                href="#water-quote"
                label="Request the quality report"
                tag="PDF on request"
                onClick={() => setQualityRequest(true)}
              />
              <details className="water-analysis">
                <summary>
                  What is in the batch analysis?
                  <Plus size={20} aria-hidden="true" />
                </summary>
                <div className="water-analysis-body">
                  <p>
                    Mineral composition and pH are reported for each batch. Request the signed
                    report for the values relevant to your order.
                  </p>
                  <table>
                    <caption>Values are supplied in the batch certificate.</caption>
                    <thead>
                      <tr>
                        <th scope="col">Parameter</th>
                        <th scope="col">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PARAMETERS.map((row) => (
                        <tr key={row.name}>
                          <td>{row.name}</td>
                          <td>{row.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          </section>
          <section
            className="water-private"
            id="water-private-label"
            aria-labelledby="water-private-title"
          >
            <div className="water-private-copy">
              <p className="water-eyebrow">Private label</p>
              <h2 id="water-private-title">
                Made for
                <br />
                your brand.
              </h2>
              <p>Natural Armenian water, bottled for your brand on the same certified line.</p>
              <ul className="water-private-list">
                <li>Still and sparkling formats</li>
                <li>Your artwork and market-specific label</li>
                <li>Packaging agreed with your quote</li>
              </ul>
              <a className="water-button" href="#water-quote">
                Discuss private label <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </div>
            <img
              className="water-private-photo"
              src={`${ASSETS}/photo-crates.webp`}
              alt="Garni branded crates with glass bottles at the plant"
              width={1600}
              height={900}
              loading="lazy"
            />
          </section>
        </div>

        <section
          className="water-quote water-section"
          id="water-quote"
          aria-labelledby="water-quote-title"
        >
          <div className="water-quote-grid rc-wrap">
            <div className="water-quote-copy">
              <p className="water-eyebrow">Trade enquiries</p>
              <h2 id="water-quote-title">Let’s talk water.</h2>
              <p className="water-lede">
                Share your destination, preferred formats and indicative volume. Our export team
                will prepare your quote.
              </p>
              <dl className="water-trade-facts">
                <div>
                  <dt>Minimum order</dt>
                  <dd>1,000 units</dd>
                </div>
                <div>
                  <dt>Shipping terms</dt>
                  <dd>FOB Poti / CIF your port</dd>
                </div>
                <div>
                  <dt>Our reply</dt>
                  <dd>Within one working day</dd>
                </div>
              </dl>
              <a className="water-quote-email" href="mailto:info@rocarm.am">
                info@rocarm.am <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </div>
            <div className="water-enquiry">
              {selection && (
                <div className="water-selection" role="status">
                  <WaterProductPhoto image={selection.img} />
                  <div>
                    <span>Your selected format</span>
                    <strong>{`${selection.vol} · ${formatKind(selection)}`}</strong>
                  </div>
                  <button
                    type="button"
                    aria-label="Clear selected water format"
                    onClick={() => {
                      setSelection(null);
                      setProduct("Garni Crystalline still");
                    }}
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
              )}
              <QuoteForm
                qualityRequest={qualityRequest}
                onCancelQualityRequest={() => setQualityRequest(false)}
                product={product}
                onProductChange={(value) => {
                  setProduct(value);
                  setSelection(null);
                }}
                requestDetails={
                  selection
                    ? `Requested water format: ${selection.vol}, ${formatKind(selection).toLowerCase()}.`
                    : undefined
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
