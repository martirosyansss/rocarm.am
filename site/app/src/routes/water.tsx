import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { DocCta } from "@/components/rocarm/ctas";
import { QuoteForm } from "@/components/rocarm/quote-form";
import { SiteFooter, SiteNav } from "@/components/rocarm/site-chrome";
import { WaterProductPhoto } from "@/components/rocarm/water-product-photo";
import { useReveal } from "@/hooks/use-reveal";
import { ASSETS, PARAMETERS, WATER } from "@/lib/catalog";

import "./water.css";

export const Route = createFileRoute("/water")({
  component: WaterPage,
  head: () => ({
    links: [
      { href: "https://fonts.googleapis.com", rel: "preconnect" },
      { crossOrigin: "anonymous", href: "https://fonts.gstatic.com", rel: "preconnect" },
      {
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&display=swap",
        rel: "stylesheet",
      },
    ],
    meta: [
      { title: "Garni Crystalline — Armenian Natural Water | Rocarm" },
      {
        content:
          "Discover Garni Crystalline natural water, drawn from 140 metres beneath the Garni mountains, Armenia. PET, 0.5 litre glass and large formats up to 18.9 litres. Export and private label enquiries.",
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
  if (water.vol === "6 L" || water.vol === "10 L") {
    return `Garni Crystalline ${water.vol}`;
  }
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
  const { inView: legendInView, ref: legendRef } = useReveal<HTMLDivElement>();
  const formats = WATER.filter(
    (water) =>
      filter === "All formats" ||
      (filter === "Glass"
        ? water.meta.startsWith("Glass")
        : filter === "Large formats"
          ? ["6 L", "10 L", "18.9 L"].includes(water.vol)
          : category(water) === filter),
  );
  const formatCount = formats.length;

  return (
    <div className="rc rc-water">
      <SiteNav quoteHref="#water-quote" />
      <a className="rc-skip" href="#water-range">
        Skip to water formats
      </a>
      <main id="water-top">
        <section className="water-hero rc-wrap" aria-labelledby="water-title">
          <div className="water-hero-copy">
            <Link to="/" className="water-back">
              Rocarm <span aria-hidden="true">/</span> Our water
            </Link>
            <p className="water-eyebrow">Garni Crystalline · Natural water, 140 m deep</p>
            <h1 id="water-title">
              Born of
              <br />
              <em>basalt.</em>
              <br />
              Made to refresh.
            </h1>
            <p className="water-lede">
              From 140 metres beneath the Garni mountains to your everyday table. Natural Armenian
              water, bottled still or sparkling.
            </p>
            <div className="water-actions">
              <a className="water-explore" href="#water-range">
                Find your format <span aria-hidden="true">↓</span>
              </a>
              <a className="water-text-link" href="#water-source">
                Meet the source <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="water-hero-note">140 m natural source. Bottling in Yerevan since 1999.</p>
          </div>
          <figure className="water-hero-photo">
            <img
              src={`${ASSETS}/water-still-basalt.webp`}
              alt="Garni Crystalline still water bottle on wet basalt in the Garni gorge"
              width={1126}
              height={1397}
              fetchPriority="high"
            />
            <figcaption>
              <span>Garni Crystalline</span>
              <span>0.5 L · Still</span>
            </figcaption>
          </figure>
        </section>

        <nav className="water-chapters rc-wrap" aria-label="Water page sections">
          <a href="#water-range">
            <span>01</span> The collection
          </a>
          <a href="#water-source">
            <span>02</span> Our source
          </a>
          <a href="#quality">
            <span>03</span> Quality
          </a>
          <a href="#water-quote">
            <span>04</span> Trade enquiries
          </a>
        </nav>

        <section
          className="water-range water-section"
          id="water-range"
          aria-labelledby="water-range-title"
        >
          <div className="rc-wrap">
            <div className="water-section-heading">
              <div>
                <p className="water-eyebrow">01 / The collection</p>
                <h2 id="water-range-title">
                  A format for
                  <br />
                  <em>every day.</em>
                </h2>
              </div>
              <p className="water-lede">
                A small bottle on the move. A place at the table. Water for the whole office. Find
                the size that fits.
              </p>
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
                    {option}
                  </button>
                ))}
              </div>
              <p className="water-range-count" role="status">
                {formatCount} {formatCount === 1 ? "format" : "formats"}
              </p>
            </div>
            <ul className="water-products" id="water-products">
              {formats.map((water) => (
                <li key={water.img}>
                  <a
                    className="water-product"
                    href="#water-quote"
                    aria-label={`Request a quote for ${water.vol} ${formatKind(water).toLowerCase()} water`}
                    onClick={() => {
                      setSelection(water);
                      setProduct(productName(water));
                    }}
                  >
                    <div className="water-product-photo">
                      <span className="water-product-kind">{formatKind(water)}</span>
                      <WaterProductPhoto image={water.img} />
                    </div>
                    <div className="water-product-title">
                      <h3>{water.vol}</h3>
                      <span aria-hidden="true">↗</span>
                    </div>
                    <p>{water.meta}</p>
                    <span className="water-product-enquire">Enquire about this format</span>
                  </a>
                </li>
              ))}
              {filter === "All formats" ? (
                <li className="water-range-custom">
                  <p className="water-eyebrow">Private label</p>
                  <h3>
                    Your name.
                    <br />
                    <em>Our water.</em>
                  </h3>
                  <p>The same source and certified bottling line, with your brand on the label.</p>
                  <a className="water-text-link" href="#water-private-label">
                    Make it yours <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ) : null}
            </ul>
            <p className="water-range-footnote">
              Planning a shipment? Ask for case counts and a container loading plan with your quote.
            </p>
          </div>
        </section>

        <section className="water-story water-section rc-wrap" aria-labelledby="water-story-title">
          <p className="water-eyebrow water-story-eyebrow">Before the paperwork</p>
          <h2 id="water-story-title" className="water-story-title">
            Not the river.
            <br />
            <em>The mountain beneath it.</em>
          </h2>
          <ul className="water-story-frames">
            <li>
              <figure>
                <img
                  src={`${ASSETS}/water-story-basalt.webp`}
                  alt="Garni Crystalline bottle standing before towering basalt columns in the Azat gorge"
                  width={880}
                  height={1092}
                  loading="lazy"
                />
                <figcaption>
                  <span className="water-story-tag" aria-hidden="true">
                    I
                  </span>
                  <p>
                    Not the stream in front of you. Our water is drawn from 140 metres underground,
                    beneath the same basalt that shapes this gorge.
                  </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img
                  src={`${ASSETS}/water-story-spring.webp`}
                  alt="A mountain stream running over wet basalt in the gorge beside a Garni Crystalline bottle"
                  width={880}
                  height={1092}
                  loading="lazy"
                />
                <figcaption>
                  <span className="water-story-tag" aria-hidden="true">
                    II
                  </span>
                  <p>
                    It reaches us from the Garni mountains — the range that has watched over this
                    valley since long before the temple did.
                  </p>
                </figcaption>
              </figure>
            </li>
            <li>
              <figure>
                <img
                  src={`${ASSETS}/water-story-supply.webp`}
                  alt="Large-format Garni Crystalline bottle carried from the basalt gorge toward the plant"
                  width={880}
                  height={1092}
                  loading="lazy"
                />
                <figcaption>
                  <span className="water-story-tag" aria-hidden="true">
                    III
                  </span>
                  <p>
                    140 metres of stone between it and the surface — bottled in Yerevan the same day
                    it&rsquo;s drawn, in every case we ship.
                  </p>
                </figcaption>
              </figure>
            </li>
          </ul>
          <div
            className="water-legend"
            aria-labelledby="water-legend-title"
            data-in={legendInView}
            ref={legendRef}
          >
            <p className="water-eyebrow">The legend</p>
            <h3 id="water-legend-title">Not the river. The mountain that keeps it.</h3>
            <figure className="water-legend-photo">
              <img
                src={`${ASSETS}/water-legend.webp`}
                alt="Mist rising through the basalt columns of the Azat gorge near Garni, a pool of water glowing at their base"
                width={1856}
                height={2304}
                loading="lazy"
              />
            </figure>
            <div className="water-legend-body">
              <p>Long before Garni had a bottle, it had a legend.</p>
              <p>
                Below the temple, the gorge is lined with something the eye doesn&rsquo;t expect from
                stone: hundreds of six-sided columns, straight as pillars, shoulder to shoulder for
                the length of a valley. Armenians call it the Symphony of the Stones — basalt that
                cooled slowly enough, deep enough, to set into music instead of rubble.
              </p>
              <p>
                In the first century, King Trdat I — a ruler the chronicles remember for wrestling
                bulls with his bare hands — raised a temple at the mouth of that gorge and gave it to
                Mihr, god of the sun: colonnade facing east, altar turned to the valley, built from
                the same black stone as the Symphony below it. What the mountain guarded best, though,
                was never what stood above ground.
              </p>
              <p>
                A hundred and forty metres beneath the temple&rsquo;s foundations, sealed in that same
                basalt, it kept a reservoir of its own — untouched by season, by war, by two thousand
                years of pilgrims crossing the gorge overhead.
              </p>
              <p>
                No one drank from it. No one was meant to — not until someone finally listened to what
                the mountain had been holding, and asked, gently, to let a little of it through.
              </p>
              <p>
                That is the water in this bottle. Not the stream you can see. A promise the Garni
                mountains kept longer than anyone was watching — opened at last, 140 metres down, one
                case at a time.
              </p>
            </div>
          </div>
        </section>

        <section
          className="water-source water-section rc-wrap"
          id="water-source"
          aria-labelledby="water-source-title"
        >
          <figure className="water-source-photo">
            <img
              src={`${ASSETS}/plate-temple-wide.webp`}
              alt="Garni Temple overlooking the Azat river gorge in Armenia"
              width={2000}
              height={1116}
              loading="lazy"
            />
            <figcaption>Garni Temple · Azat river gorge · Armenia</figcaption>
          </figure>
          <div className="water-source-copy">
            <p className="water-eyebrow">02 / A sense of place</p>
            <h2 id="water-source-title">
              An extraordinary
              <br />
              <em>place to begin.</em>
            </h2>
            <p className="water-lede">
              Basalt columns. A mountain range holding water 140 metres down. Garni is where ours
              begins, and the place that gives it its name.
            </p>
            <p>
              Our water is drawn from 140 metres underground in the Garni mountains, not the river
              visible in the gorge. We bottle it in Yerevan, carrying that Armenian origin into
              every format.
            </p>
            <dl className="water-source-facts">
              <div>
                <dt>Our origin</dt>
                <dd>Garni, Armenia</dd>
              </div>
              <div>
                <dt>Source depth</dt>
                <dd>140 m</dd>
              </div>
              <div>
                <dt>Bottling since</dt>
                <dd>1999</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="water-film rc-wrap" aria-labelledby="water-film-title">
          <div className="water-film-heading">
            <div>
              <p className="water-eyebrow">A closer look</p>
              <h2 id="water-film-title">Meet Garni Crystalline.</h2>
            </div>
            <a
              className="water-text-link"
              href="https://www.youtube.com/watch?v=M8kg-Njyb8s"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube <span aria-hidden="true">↗</span>
            </a>
          </div>
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
                type="button"
                className="water-film-play"
                aria-label="Play the Garni Crystalline brand film"
                onClick={() => setFilmPlaying(true)}
              >
                <img
                  src={`${ASSETS}/garni-film-poster.jpg`}
                  alt=""
                  width={1280}
                  height={720}
                  loading="lazy"
                />
                <span>
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>{" "}
                  Play film
                </span>
              </button>
            )}
          </div>
          <p className="water-film-credit">Film by DOMINO Production</p>
        </section>

        <section
          className="water-quality water-section"
          id="quality"
          aria-labelledby="water-quality-title"
        >
          <div className="rc-wrap">
            <div className="water-section-heading">
              <div>
                <p className="water-eyebrow">03 / Source &amp; standards</p>
                <h2 id="water-quality-title">
                  Clear water.
                  <br />
                  <em>Clear standards.</em>
                </h2>
              </div>
              <div>
                <p className="water-lede">
                  Know what goes into your shipment. Request our quality documents and the
                  laboratory analysis for the batch.
                </p>
                <DocCta
                  href="#water-quote"
                  label="Request the quality report"
                  tag="PDF on request"
                  onClick={() => setQualityRequest(true)}
                />
              </div>
            </div>
            <div className="water-standards">
              <article>
                <img
                  src={`${ASSETS}/cert-iso22000.webp`}
                  alt=""
                  width={84}
                  height={84}
                  loading="lazy"
                />
                <div>
                  <h3>ISO 22000</h3>
                  <p>Food safety management across the bottling line.</p>
                </div>
              </article>
              <article>
                <img
                  src={`${ASSETS}/cert-iso9001.webp`}
                  alt=""
                  width={84}
                  height={84}
                  loading="lazy"
                />
                <div>
                  <h3>ISO 9001</h3>
                  <p>Quality management for a consistent process.</p>
                </div>
              </article>
              <article>
                <img src={`${ASSETS}/cert-eac.webp`} alt="" width={84} height={84} loading="lazy" />
                <div>
                  <h3>EAC</h3>
                  <p>Conformity for the Eurasian Economic Union.</p>
                </div>
              </article>
            </div>
            <details className="water-analysis">
              <summary>
                <span>What is in the batch analysis?</span>
                <span className="water-analysis-toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="water-analysis-body">
                <p>
                  Mineral composition and pH are reported for each production batch. Request the
                  signed report for the values relevant to your order.
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
          className="water-private water-section rc-wrap"
          id="water-private-label"
          aria-labelledby="water-private-title"
        >
          <div>
            <p className="water-eyebrow">Made for your market</p>
            <h2 id="water-private-title">
              Our source.
              <br />
              <em>Your signature.</em>
            </h2>
          </div>
          <div>
            <p className="water-lede">
              Build your water range with Rocarm. We fill the water under your own brand on the same
              certified line, working from your artwork.
            </p>
            <ul>
              <li>Still and sparkling water</li>
              <li>Your branding and market-specific label</li>
              <li>Packaging and order details agreed with your quote</li>
            </ul>
            <a className="water-text-link" href="#water-quote">
              Discuss private label <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section
          className="water-quote water-section"
          id="water-quote"
          aria-labelledby="water-quote-title"
        >
          <div className="water-quote-grid rc-wrap">
            <div>
              <p className="water-eyebrow">04 / Trade enquiries</p>
              <h2 id="water-quote-title">
                Bring Garni
                <br />
                <em>to your market.</em>
              </h2>
              <p className="water-lede">
                Tell us your destination, preferred formats and indicative volume. Our export desk
                will help you plan the next step.
              </p>
              <dl className="water-trade-facts">
                <div>
                  <dt>Minimum order</dt>
                  <dd>1,000 units</dd>
                </div>
                <div>
                  <dt>Available terms</dt>
                  <dd>FOB Poti / CIF your port</dd>
                </div>
                <div>
                  <dt>Prefer to email?</dt>
                  <dd>
                    <a href="mailto:info@rocarm.am">info@rocarm.am ↗</a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="water-enquiry">
              {selection ? (
                <div className="water-selection" role="status">
                  <WaterProductPhoto image={selection.img} />
                  <div>
                    <span>Your selected format</span>
                    <strong>
                      {`${selection.vol} · ${formatKind(selection)}`}
                    </strong>
                  </div>
                  <button
                    type="button"
                    aria-label="Clear selected water format"
                    onClick={() => {
                      setSelection(null);
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : null}
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
