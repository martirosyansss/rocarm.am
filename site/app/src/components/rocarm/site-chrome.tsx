import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { QuoteCta } from "@/components/rocarm/ctas";
import { ASSETS } from "@/lib/catalog";

function RocarmMark({ inNav = false }: { inNav?: boolean }) {
  return (
    <Link className={`rc-brand-mark${inNav ? " rc-nav__mark" : ""}`} to="/" aria-label="Rocarm home">
      <img alt="" height={458} src={`${ASSETS}/logo-rocarm.webp`} width={520} />
      <span className="rc-nav__wordmark">Rocarm</span>
    </Link>
  );
}

/** Shared header. One line at desktop, 72px tall. */
export function SiteNav({ quoteHref = "/#quote" }: { quoteHref?: string }) {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = () => {
      if (menu.current) menu.current.open = false;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        close();
        menu.current.querySelector("summary")?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) close();
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    desktop.addEventListener("change", close);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      desktop.removeEventListener("change", close);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);
  return (
    <header className="rc-nav">
      <div className="rc-nav__inner">
        <RocarmMark inNav />
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
        <QuoteCta href={quoteHref} />
        <details
          className="rc-nav__mobile"
          ref={menu}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              event.currentTarget.open = false;
          }}
        >
          <summary aria-label="Navigation menu">
            Menu <span aria-hidden="true">＋</span>
          </summary>
          <nav
            aria-label="Mobile sections"
            className="rc-nav__drawer"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a") && menu.current) {
                menu.current.open = false;
                menu.current.querySelector("summary")?.focus();
              }
            }}
          >
            <Link to="/water">
              Water <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/soft-drinks">
              Soft drinks <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/water" hash="quality">
              Quality <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/" hash="export">
              Export <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/" hash="private-label">
              Private label <span aria-hidden="true">↗</span>
            </Link>
            <a href={quoteHref}>
              Request a quote <span aria-hidden="true">→</span>
            </a>
          </nav>
        </details>
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
          <RocarmMark />
          <p className="rc-body" style={{ marginTop: "18px", maxWidth: "38ch" }}>
            Rocarm LLC. Natural spring water and soft drinks, bottled in Armenia since 1999.
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
