/** Product data shared by the home page and the two brand pages. */

export const ASSETS = "/assets/rocarm";

export const WATER = [
  { img: "water-033.webp", meta: "PET, still. Sport cap available.", vol: "0.33 L" },
  { img: "water-05.webp", meta: "PET, still. The export volume.", vol: "0.5 L" },
  { img: "water-05-gas.webp", meta: "PET, sparkling.", vol: "0.5 L" },
  { img: "water-05-glass.webp", meta: "Glass, still.", vol: "0.5 L" },
  { img: "water-05-glass-gas.webp", meta: "Glass, sparkling.", vol: "0.5 L" },
  { img: "water-10.webp", meta: "PET, still. Table and HoReCa.", vol: "1.0 L" },
  { img: "water-10-gas.webp", meta: "PET, sparkling.", vol: "1.0 L" },
  { img: "water-15.webp", meta: "PET, still. Family format.", vol: "1.5 L" },
  { img: "water-6l.webp", meta: "PET, still. Large format.", vol: "6 L" },
  { img: "water-10l.webp", meta: "PET, still. Large format.", vol: "10 L" },
  { img: "water-189.webp", meta: "Returnable, for coolers.", vol: "18.9 L" },
];

/**
 * Flavour accents live in styles.css as .rc-flavour--<slug>.
 * `img` is the 0.5 L bottle, `img15` the 1.5 L one. Both are rendered so the
 * bottle fills the same share of the canvas, so their CSS heights compare
 * directly — see FORMAT_SCALE in the soft drinks route.
 */
export const FLAVOURS = [
  {
    fruit: "cherry",
    img: "cola-cola.webp",
    img15: "cola-15-cola.webp",
    name: "Cola",
    note: "The classic, dark and dry.",
    slug: "cola",
  },
  {
    fruit: "orange",
    img: "cola-orange.webp",
    img15: "cola-15-orange.webp",
    name: "Orange",
    note: "Narinj. The best seller.",
    slug: "orange",
  },
  {
    fruit: "cherry",
    img: "cola-cherry.webp",
    img15: "cola-15-cherry.webp",
    name: "Cherry",
    note: "Deep red, low on sugar.",
    slug: "cherry",
  },
  {
    fruit: "pear",
    img: "cola-pear.webp",
    img15: "cola-15-pear.webp",
    name: "Pear",
    note: "Tandz. Amber and soft.",
    slug: "pear",
  },
  {
    fruit: "tarragon",
    img: "cola-tarragon.webp",
    img15: "cola-15-tarragon.webp",
    name: "Tarragon",
    note: "Tarkhun. A Caucasus staple.",
    slug: "tarragon",
  },
  {
    fruit: "lime",
    img: "cola-lime.webp",
    img15: "cola-15-lime.webp",
    name: "Lime",
    note: "Sharp and green.",
    slug: "lime",
  },
  {
    fruit: "pineapple",
    img: "cola-tropic.webp",
    img15: "cola-15-tropic.webp",
    name: "Tropic",
    note: "Pineapple, banana, mango.",
    slug: "tropic",
  },
];

export const PARAMETERS = [
  { name: "Total dissolved solids", unit: "mg/l" },
  { name: "Calcium", unit: "mg/l" },
  { name: "Magnesium", unit: "mg/l" },
  { name: "Sodium", unit: "mg/l" },
  { name: "Potassium", unit: "mg/l" },
  { name: "Bicarbonates", unit: "mg/l" },
  { name: "Chlorides", unit: "mg/l" },
  { name: "Sulphates", unit: "mg/l" },
  { name: "pH", unit: "pH" },
];

export const FIGURES = [
  { k: "Bottling in Yerevan since", n: "1999" },
  { k: "Minimum order, units", n: "1,000" },
  { k: "Markets shipping today", n: "3" },
  { k: "Markets open to enquiry", n: "35" },
];
