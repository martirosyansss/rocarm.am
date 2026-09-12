import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { DocCta, QuoteCta, RangeCta } from "@/components/rocarm/ctas";
import { ExportMap } from "@/components/rocarm/export-map";
import { QuoteForm } from "@/components/rocarm/quote-form";
import { SiteFooter, SiteNav } from "@/components/rocarm/site-chrome";
import { ASSETS, PARAMETERS } from "@/lib/catalog";
import { scrollScrubScenes } from "@/scroll-scrub-scenes";

import "./home.css";

const [heroScene] = scrollScrubScenes;

/** Fraunces carries the display type; body stays on the site's own Satoshi. */
const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&display=swap";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [
      { href: "https://fonts.googleapis.com", rel: "preconnect" },
      { crossOrigin: "anonymous", href: "https://fonts.gstatic.com", rel: "preconnect" },
      { href: FONTS, rel: "stylesheet" },
    ],
  }),
});

/**
 * Ordering terms an importer compares before writing. Every line here is a fact
 * already established elsewhere in this repo (catalog.ts formats, the FIGURES
 * MOQ, the incoterms in the export copy, EAC marking from the brand pages).
 *
 * DELIBERATELY ABSENT until Rocarm supplies them — publishing guessed values
 * would have a buyer planning a container on numbers that are not real:
 *   - units per case and cases per pallet, per SKU
 *   - pallets per 20' and 40' container, and pallet type
 *   - shelf life per format
 *   - HS heading per product group
 *   - production lead time from order confirmation
 */
const ORDERING = [
  { k: "Minimum order", v: "1,000 units" },
  { k: "Pallets", v: "Mixed pallets across the water and soft drink range" },
  { k: "Packaging", v: "PET and glass, still and sparkling" },
  { k: "Water formats", v: "0.33 / 0.5 / 1.0 / 1.5 / 6 / 10 / 18.9 L; glass in 0.5 L" },
  { k: "Soft drink formats", v: "0.5 / 1.5 L, seven flavours" },
  { k: "Marking", v: "EAC, and your market's label on request" },
  { k: "Terms", v: "FOB Poti or CIF your port" },
];

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
  {
    body: "Label language, your importer's details and the barcode for the market you sell into. Tell us the destination and we set the artwork proof against it before the run.",
    title: "Your market on the label",
  },
];

function Index() {
  const [qualityRequest, setQualityRequest] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(false);
  return (
    <div className="rc rc-dossier">
      <SiteNav />
      <a className="rc-skip" href="#brands">
        Skip to products
      </a>
      <main id="top">
        <section aria-labelledby="hero-h" className="rc-dossier__cover">
          <img
            alt="The Garni Temple above the Azat river gorge at dawn"
            className="rc-dossier__cover-img"
            fetchPriority="high"
            height={1116}
            src={`${ASSETS}/plate-temple-wide.webp`}
            width={2000}
          />
          <div className="rc-dossier__cover-text rc-wrap">
            <p className="rc-dossier__tag">Armenia &middot; Bottling since 1999</p>
            <h1 className="rc-dossier__h1" id="hero-h">
              {heroScene.title}
            </h1>
            <p className="rc-dossier__lede">
              Natural spring water and soft drinks, bottled in Armenia. Our brands or your private
              label, ready for your market.
            </p>
            <div className="rc-home-actions">
              <QuoteCta />
              <a className="rc-home-link" href="#brands">
                Explore our brands <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <p className="rc-dossier__cover-caption rc-wrap">
            Garni Temple &middot; Azat river gorge
          </p>
        </section>

        <div className="rc-home-facts rc-wrap" aria-label="At a glance">
          <p>
            <strong>Since 1999</strong>
            <span>Bottled in Yerevan</span>
          </p>
          <p>
            <strong>Two brands</strong>
            <span>Water &amp; soft drinks</span>
          </p>
          <p>
            <strong>1,000 units</strong>
            <span>Minimum order</span>
          </p>
          <p>
            <strong>Your label</strong>
            <span>Private label available</span>
          </p>
        </div>

        <section aria-labelledby="brands-h" className="rc-dossier__section" id="brands">
          <div className="rc-home-heading rc-wrap">
            <div>
              <p className="rc-dossier__tag">Our collections</p>
              <h2 id="brands-h">
                One source of pride.
                <br />
                <em>Two distinct characters.</em>
              </h2>
            </div>
            <p className="rc-dossier__lede">
              The clarity of Garni Crystalline. The colour of Garni Cola. Two ranges from the same
              certified plant, with formats for retail and hospitality.
            </p>
          </div>
          <div className="rc-dossier__diptych rc-wrap">
            <article className="rc-dossier__panel">
              <Link
                to="/water"
                className="rc-home-product-photo"
                aria-label="Explore Garni Crystalline water"
              >
                <img
                  alt="Garni Crystalline still spring water on wet basalt beside the gorge stream"
                  className="rc-dossier__panel-bg"
                  loading="lazy"
                  width={1126}
                  height={1397}
                  src={`${ASSETS}/water-still-basalt.webp`}
                />
              </Link>
              <div className="rc-dossier__panel-body">
                <p className="rc-home-product-meta">Spring water &middot; Still &amp; sparkling</p>
                <h3>Garni Crystalline</h3>
                <p>
                  From the basalt of the Garni gorge. Formats from 0.33 to 18.9 litres, including 6
                  and 10 litre bottles, with PET and glass options.
                </p>
                <RangeCta to="/water">Explore the water range</RangeCta>
              </div>
            </article>
            <article className="rc-dossier__panel">
              <Link
                to="/soft-drinks"
                className="rc-home-product-photo rc-home-product-photo--cola"
                aria-label="Explore Garni Cola soft drinks"
              >
                <img
                  alt=""
                  className="rc-dossier__panel-bg"
                  loading="lazy"
                  width={1254}
                  height={1254}
                  src={`${ASSETS}/cola-citrus-background.webp`}
                />
                <span className="rc-home-product-shadow" aria-hidden="true" />
                <img
                  className="rc-home-product-bottle"
                  alt="Garni Cola orange bottle with juicy citrus slices against a bright orange and yellow backdrop"
                  src={`${ASSETS}/cola-orange.webp`}
                  loading="lazy"
                  width={546}
                  height={1800}
                />
              </Link>
              <div className="rc-dossier__panel-body">
                <p className="rc-home-product-meta">Soft drinks &middot; Seven flavours</p>
                <h3>Garni Cola</h3>
                <p>
                  From classic cola to tarragon and bright citrus. A colourful family in 0.5 and 1.5
                  litre bottles.
                </p>
                <RangeCta to="/soft-drinks">Discover all seven flavours</RangeCta>
              </div>
            </article>
          </div>
        </section>

        <section aria-labelledby="film-h" className="rc-home-film rc-wrap" id="film">
          <div className="rc-home-film-heading">
            <div>
              <p className="rc-dossier__tag">The brand film</p>
              <h2 id="film-h">Garni Crystalline, in motion.</h2>
            </div>
            <a
              className="rc-home-link"
              href="https://www.youtube.com/watch?v=M8kg-Njyb8s"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="rc-home-film-player">
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
                className="rc-home-film-play"
                type="button"
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
                <span className="rc-home-film-play-label">
                  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                  Play film
                </span>
              </button>
            )}
          </div>
          <p className="rc-home-film-credit">
            Garni Crystalline &middot; Film by DOMINO Production
          </p>
        </section>

        <section
          aria-labelledby="proof-h"
          className="rc-dossier__section rc-home-proof"
          id="composition"
        >
          <div className="rc-home-proof-grid rc-wrap">
            <div>
              <p className="rc-dossier__tag">Source &amp; standards</p>
              <h2 id="proof-h">
                From basalt.
                <br />
                <em>Verified by the batch.</em>
              </h2>
              <p className="rc-dossier__lede">
                Spring water from the gorge below Garni Temple. Checked in our own laboratory before
                a pallet leaves the plant.
              </p>
              <div className="rc-dossier__seals">
                <img
                  alt="ISO 22000"
                  loading="lazy"
                  width={84}
                  height={84}
                  src={`${ASSETS}/cert-iso22000.webp`}
                />
                <img
                  alt="ISO 9001"
                  loading="lazy"
                  width={84}
                  height={84}
                  src={`${ASSETS}/cert-iso9001.webp`}
                />
                <img
                  alt="EAC"
                  loading="lazy"
                  width={84}
                  height={84}
                  src={`${ASSETS}/cert-eac.webp`}
                />
              </div>
              <p className="rc-body">
                ISO 22000 food safety &middot; ISO 9001 quality management &middot; EAC conformity
              </p>
              <details className="rc-home-details">
                <summary>
                  What we test <span aria-hidden="true">+</span>
                </summary>
                <p className="rc-body">
                  Results are issued for each production batch. Request the quality report to review
                  the analysis.
                </p>
                <ul className="rc-dossier__terms rc-dossier__params">
                  {PARAMETERS.map((row) => (
                    <li key={row.name}>
                      <span>{row.name}</span>
                      <b>{row.unit === "pH" ? "\u2014" : row.unit}</b>
                    </li>
                  ))}
                </ul>
              </details>
              <details className="rc-home-details">
                <summary>
                  Documents with your shipment <span aria-hidden="true">+</span>
                </summary>
                <ul className="rc-home-document-list">
                  <li>Batch certificate of analysis and certificate of origin.</li>
                  <li>Packing list and commercial invoice.</li>
                  <li>Copies of ISO 22000, ISO 9001 and EAC certificates.</li>
                  <li>Label artwork proof agreed before production.</li>
                </ul>
              </details>
              <DocCta
                href="#quote"
                label="Request the quality report"
                tag="PDF on request"
                onClick={() => setQualityRequest(true)}
              />
            </div>
            <figure className="rc-home-plant">
              <img
                alt="Filled Garni cases on the bottling floor"
                loading="lazy"
                width={1200}
                height={900}
                src={`${ASSETS}/photo-crates.webp`}
              />
              <figcaption>
                <strong>Our plant. Your next shipment.</strong>
                <span>Bottled and packed in Yerevan, Armenia.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="export-h" className="rc-dossier__section rc-wrap" id="export">
          <div className="rc-home-heading">
            <div>
              <p className="rc-dossier__tag">Export partnerships</p>
              <h2 id="export-h">
                From Armenia.
                <br />
                <em>To your market.</em>
              </h2>
            </div>
            <p className="rc-dossier__lede">
              Shipping to Russia, Ukraine and Moldova. Welcoming new distribution partners, with FOB
              Poti or CIF delivery to your port.
            </p>
          </div>
          <div className="rc-home-export-grid">
            <div className="rc-home-map">
              <ExportMap />
            </div>
            <div className="rc-home-ordering">
              <h3>Plan your first order</h3>
              <ul className="rc-dossier__terms">
                {ORDERING.map((row) => (
                  <li key={row.k}>
                    <span>{row.k}</span>
                    <b>{row.v}</b>
                  </li>
                ))}
              </ul>
              <p className="rc-note">
                Case counts, loading plans, shelf life and lead times come with your format-specific
                quote.
              </p>
              <a className="rc-home-link" href="#quote">
                Discuss your market <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="pl-h"
          className="rc-dossier__section rc-wrap rc-home-private"
          id="private-label"
        >
          <div>
            <p className="rc-dossier__tag">Private label</p>
            <h2 id="pl-h">
              Our craft.
              <br />
              <em>Your name.</em>
            </h2>
            <p className="rc-dossier__lede">
              Water or soft drinks, filled for your brand on the same certified line.
            </p>
            <a className="rc-home-link" href="#quote">
              Let's build your range <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="rc-dossier__clauses">
            {PRIVATE_LABEL.map((item) => (
              <div className="rc-dossier__clause" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="quote-h" className="rc-dossier__section rc-home-quote" id="quote">
          <div className="rc-wrap rc-home-quote-grid">
            <div>
              <p className="rc-dossier__tag">Let's talk</p>
              <h2 id="quote-h">
                Your next shipment
                <br />
                <em>starts here.</em>
              </h2>
              <p className="rc-dossier__lede">
                Ask for a quote, samples or the quality report. Our export desk replies within one
                working day.
              </p>
              <a className="rc-home-link" href="mailto:info@rocarm.am">
                info@rocarm.am <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="rc-note">
                Prefer a call? <a href="tel:+37460504050">+374 60 50 40 50</a>
              </p>
            </div>
            <QuoteForm
              qualityRequest={qualityRequest}
              onCancelQualityRequest={() => setQualityRequest(false)}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
