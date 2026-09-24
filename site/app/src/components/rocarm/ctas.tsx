/**
 * Bespoke chrome. Every call to action on this site is its own component with
 * its own interaction identity, per design-brief.md. There is deliberately no
 * shared button utility class.
 */
import { Link } from "@tanstack/react-router";
import type { MouseEventHandler, ReactNode } from "react";

/** Primary. Framed accent block; the arrow slides on hover. */
export function QuoteCta({
  href = "#quote",
  label = "Request a quote",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a className="rc-quote-cta" href={href}>
      {label}
      <span aria-hidden="true" className="rc-quote-cta__arrow">
        &#8594;
      </span>
    </a>
  );
}

/** Range link. An oversized line whose baseline rule extends across on hover. */
export function RangeCta({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link className="rc-range-cta" to={to}>
      {children}
    </Link>
  );
}

/** Document link. Inline, underlined, carries its own file tag. */
export function DocCta({
  href,
  label,
  tag,
  onClick,
}: {
  href: string;
  label: string;
  tag: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a className="rc-doc-cta" href={href} onClick={onClick}>
      {label}
      <span className="rc-doc-cta__tag">{tag}</span>
    </a>
  );
}

/** Public assortment sheet; no enquiry is needed to download it. */
export function ProductSheetLink() {
  return (
    <a className="rc-product-sheet" href="/documents/rocarm-product-range.pdf" download>
      <span>
        <strong>Product range &amp; formats</strong>
        <small>Download PDF · 2 pages</small>
      </span>
      <span aria-hidden="true">↓</span>
    </a>
  );
}

/** Closing banner. The ground inverts to accent on hover. */
export function BannerCta({ href, note, title }: { href: string; note: string; title: string }) {
  return (
    <a className="rc-banner-cta" href={href}>
      {title}
      <span>{note}</span>
    </a>
  );
}
