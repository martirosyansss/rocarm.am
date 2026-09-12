import { ASSETS } from "@/lib/catalog";

/** Pre-rendered approved composite: original silhouette, label and square canvas.
 * The unchanged transparent margins preserve the exact CSS bottle scale.
 * Editable sources and export procedure: design/soft-drinks-v3.
 */
export function SoftDrinkProductPhoto({
  slug,
  name,
  className = "rc-gc__campaign-image",
  eager = false,
  priority = false,
}: {
  slug: string;
  name: string;
  className?: string;
  eager?: boolean;
  priority?: boolean;
}) {
  return (
    <img
      alt={`Garni Cola ${name}, 0.5 litre bottle`}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      height={1800}
      loading={eager || priority ? "eager" : "lazy"}
      sizes="(max-width: 480px) 110vw, (max-width: 1099px) 520px, 614px"
      src={`${ASSETS}/cola-${slug}-web-1000.webp`}
      srcSet={`${ASSETS}/cola-${slug}-web-1000.webp 1000w, ${ASSETS}/cola-${slug}-web-1800.webp 1800w`}
      width={1800}
    />
  );
}
