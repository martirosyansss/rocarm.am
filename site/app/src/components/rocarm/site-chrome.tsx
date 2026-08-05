import { Link } from "@tanstack/react-router";

import { QuoteCta } from "@/components/rocarm/ctas";
import { ASSETS } from "@/lib/catalog";

/** Shared header. One line at desktop, 72px tall. */
export function SiteNav() {
  return (
    <header className="rc-nav">
      <div className="rc-nav__inner">
        <Link className="rc-nav__mark" to="/">
          <img alt="Rocarm" src={`${ASSETS}/logo-rocarm.webp`} />
          <span className="rc-nav__wordmark">Rocarm</span>
        </Link>
        <nav aria-label="Sections" className="rc-nav__links">
          <Link className="rc-nav__link" to="/water">
            Water
          </Link>
          <Link className="rc-nav__link" to="/soft-drinks">
            Soft drinks
          </Link>
          <Link className="rc-nav__link" hash="quality" to="/water">
            Quality
          </Link>
          <Link className="rc-nav__link" hash="export" to="/">
            Export
          </Link>
        </nav>
        <QuoteCta href="/#quote" />
      </div>
    </header>
  );
}

/** Shared footer. */
export function SiteFooter() {
  return (
    <footer className="rc-foot">
      <div className="rc-wrap rc-foot__grid">
        <div>
          <img
            alt="Garni Crystalline"
            src={`${ASSETS}/logo-garni.webp`}
            style={{ height: "46px", width: "auto" }}
          />
          <p className="rc-body" style={{ marginTop: "18px", maxWidth: "38ch" }}>
            Rocarm LLC. Natural spring water and soft drinks, bottled in Armenia
            since 1999.
          </p>
        </div>
        <div>
          <h2 className="rc-h3" style={{ fontSize: "15px" }}>
            Contact
          </h2>
          <p className="rc-body" style={{ marginTop: "14px" }}>
            <a href="tel:+37460504050">+374 60 50 40 50</a>
            <br />
            <a href="mailto:info@rocarm.am">info@rocarm.am</a>
          </p>
        </div>
        <div>
          <h2 className="rc-h3" style={{ fontSize: "15px" }}>
            Plant
          </h2>
          <p className="rc-body" style={{ marginTop: "14px" }}>
            Mayak quarter 44/1
            <br />
            Jrvezh, Yerevan 0089
            <br />
            Armenia
          </p>
        </div>
      </div>
      <div className="rc-wrap" style={{ marginTop: "42px" }}>
        <p className="rc-note">&copy; 2026 Rocarm LLC</p>
      </div>
    </footer>
  );
}
