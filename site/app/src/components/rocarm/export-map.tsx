import { WORLD_PATH, WORLD_VIEWBOX, lonLatToXY } from "@/lib/world-map";

/** Yerevan. Every route on this map starts here. */
const ORIGIN = { lat: 40.18, lon: 44.51 };

/** Shipping today. Sourced from the company's export profile. */
const SHIPPING = [
  { lat: 47.01, lon: 28.86, name: "Moldova" },
  { lat: 55.75, lon: 37.62, name: "Russia" },
  { lat: 50.45, lon: 30.52, name: "Ukraine" },
];

/** Priority markets the company is opening. */
const PRIORITY = [
  { lat: 40.71, lon: -74.01, name: "United States" },
  { lat: 52.52, lon: 13.4, name: "Germany" },
  { lat: 25.2, lon: 55.27, name: "United Arab Emirates" },
  { lat: 51.51, lon: -0.13, name: "United Kingdom" },
];

/** Open to enquiry. The rest of the declared export list. */
const ENQUIRY = [
  { lat: 48.21, lon: 16.37, name: "Austria" },
  { lat: 26.23, lon: 50.59, name: "Bahrain" },
  { lat: 53.9, lon: 27.57, name: "Belarus" },
  { lat: 50.85, lon: 4.35, name: "Belgium" },
  { lat: 42.7, lon: 23.32, name: "Bulgaria" },
  { lat: 43.65, lon: -79.38, name: "Canada" },
  { lat: 39.9, lon: 116.4, name: "China" },
  { lat: 35.17, lon: 33.36, name: "Cyprus" },
  { lat: 50.08, lon: 14.44, name: "Czech Republic" },
  { lat: 30.04, lon: 31.24, name: "Egypt" },
  { lat: 59.44, lon: 24.75, name: "Estonia" },
  { lat: 9.03, lon: 38.74, name: "Ethiopia" },
  { lat: 48.86, lon: 2.35, name: "France" },
  { lat: 41.72, lon: 44.79, name: "Georgia" },
  { lat: 22.32, lon: 114.17, name: "Hong Kong" },
  { lat: 47.5, lon: 19.04, name: "Hungary" },
  { lat: 64.15, lon: -21.94, name: "Iceland" },
  { lat: 28.61, lon: 77.21, name: "India" },
  { lat: -6.21, lon: 106.85, name: "Indonesia" },
  { lat: 35.69, lon: 51.39, name: "Iran" },
  { lat: 33.32, lon: 44.36, name: "Iraq" },
  { lat: 32.09, lon: 34.78, name: "Israel" },
  { lat: 41.9, lon: 12.5, name: "Italy" },
  { lat: 35.68, lon: 139.69, name: "Japan" },
  { lat: 29.38, lon: 47.99, name: "Kuwait" },
  { lat: 56.95, lon: 24.11, name: "Latvia" },
  { lat: 33.89, lon: 35.5, name: "Lebanon" },
  { lat: 54.69, lon: 25.28, name: "Lithuania" },
  { lat: 38.72, lon: -9.14, name: "Portugal" },
  { lat: 40.42, lon: -3.7, name: "Spain" },
  { lat: 33.51, lon: 36.29, name: "Syria" },
  { lat: 21.03, lon: 105.83, name: "Vietnam" },
];

const origin = lonLatToXY(ORIGIN.lon, ORIGIN.lat);

/** Great-circle-ish arc: a quadratic curve bowed away from the equator. */
function arcPath(lon: number, lat: number) {
  const to = lonLatToXY(lon, lat);
  const mx = (origin.x + to.x) / 2;
  const my = (origin.y + to.y) / 2;
  const dist = Math.hypot(to.x - origin.x, to.y - origin.y);
  const lift = Math.min(dist * 0.28, 90);
  return `M${origin.x.toFixed(1)},${origin.y.toFixed(1)} Q${mx.toFixed(1)},${(my - lift).toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
}

export function ExportMap() {
  return (
    <figure className="rc-map">
      <svg
        aria-labelledby="rc-map-title"
        className="rc-map__svg"
        role="img"
        viewBox={WORLD_VIEWBOX}
      >
        <title id="rc-map-title">
          Rocarm ships to Moldova, Russia and Ukraine, and is opening the United
          States, Germany, the United Arab Emirates and the United Kingdom.
        </title>

        <path className="rc-map__land" d={WORLD_PATH} />

        {ENQUIRY.map((m) => {
          const p = lonLatToXY(m.lon, m.lat);
          return (
            <circle
              className="rc-map__dot rc-map__dot--enquiry"
              cx={p.x}
              cy={p.y}
              key={m.name}
              r="3"
            >
              <title>{m.name}</title>
            </circle>
          );
        })}

        {PRIORITY.map((m, i) => (
          <path
            className="rc-map__arc rc-map__arc--priority"
            d={arcPath(m.lon, m.lat)}
            key={m.name}
            style={{ animationDelay: `${0.5 + i * 0.45}s` }}
          />
        ))}

        {SHIPPING.map((m, i) => (
          <path
            className="rc-map__arc rc-map__arc--live"
            d={arcPath(m.lon, m.lat)}
            key={m.name}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}

        {PRIORITY.map((m, i) => {
          const p = lonLatToXY(m.lon, m.lat);
          return (
            <circle
              className="rc-map__dot rc-map__dot--priority"
              cx={p.x}
              cy={p.y}
              key={m.name}
              r="4"
              style={{ animationDelay: `${1.4 + i * 0.45}s` }}
            >
              <title>{m.name}</title>
            </circle>
          );
        })}

        {SHIPPING.map((m, i) => {
          const p = lonLatToXY(m.lon, m.lat);
          return (
            <circle
              className="rc-map__dot rc-map__dot--live"
              cx={p.x}
              cy={p.y}
              key={m.name}
              r="4.5"
              style={{ animationDelay: `${0.9 + i * 0.35}s` }}
            >
              <title>{m.name}</title>
            </circle>
          );
        })}

        <circle className="rc-map__pulse" cx={origin.x} cy={origin.y} r="5" />
        <circle className="rc-map__origin" cx={origin.x} cy={origin.y} r="5" />
        <text className="rc-map__label" x={origin.x + 11} y={origin.y + 4}>
          Yerevan
        </text>
      </svg>

      <figcaption className="rc-map__legend">
        <span className="rc-map__key rc-map__key--live">
          Shipping today, 3 markets
        </span>
        <span className="rc-map__key rc-map__key--priority">
          Priority, opening now
        </span>
        <span className="rc-map__key rc-map__key--enquiry">
          Open to enquiry, 32 more
        </span>
      </figcaption>
    </figure>
  );
}
