# ROCARM — design brief

## Bottle identity constraint (2026-09-10)

The user explicitly requires the original bottle proportions and packaging design
to stay unchanged. Photo work may improve the background, lighting and clarity.
Preserve the source silhouette, height-to-width ratio, neck, shoulder, moulded ribs,
base, cap, label dimensions and placement, artwork, lettering and colours. Preserve
the card dimensions. The user's later request explicitly permits changing displayed
scale to distinguish volumes: use proportional scaling, ascending volume order
and a common baseline. The small formats should look smaller than the large ones.
This is an illustrative hierarchy, not a claim of measured physical dimensions.
Do not standardise
different volumes to one bottle shape or substitute another package design.
Source product photographs are the identity reference; generated studio photos are
lighting/background references only. Do not treat regenerated label artwork as a
new approved packaging design. Compare any future output to its source before use.

## Water page refinement (2026-09-10)

The `/water` page now presents Garni Crystalline as a complete brand collection:
a still-water basalt portrait, Fraunces display type, and a pale mineral-toned
catalogue between dark source and quality sections. Seven existing product photos
can be filtered by still, sparkling, or cooler format. Selecting a bottle carries
its volume and category into the on-page trade enquiry without clearing user input.
The supplied Garni Crystalline film loads from YouTube only after playback is
requested. Batch parameters remain available through a disclosure; numerical
composition values are supplied through the report request, never invented.

## Design read

For an import buyer at a distributor, retail chain or HoReCa group in the US, the EU,
Russia or the UAE, deciding whether an Armenian bottler is worth a container. The register
is ancient, cold and exact: a 1st-century temple and a lab report in the same room.
Not lifestyle, not "refreshment". Proof.

## Concept spine

**Proof, not journey.** *(Revised 2026-09-08 — superseded the `cinema` scroll-scrub
concept below. The scroll-driven chapter walk shipped, then read as unprofessional for a
B2B compliance buyer and was removed. Kept for the record, not as a target to rebuild.)*
The colonnade still opens the site — one static frame, one headline, one claim — but the
walk does not continue as a scrolling film. What follows it is the paperwork a distributor
actually asks for before the site's first line of trust talk: lab values, certificate
marks, real plant photography. The site earns the visitor's confidence with data they can
verify, not with a mood they have to take on faith.

**Visual execution, take two (2026-09-09).** The concept above (proof leads, same photos)
held; its first execution — a blue-accented table-and-card layout — did not, on the user's
explicit call for something radically different while keeping every photo. The homepage
(`index.tsx` + colocated `home.css`, scoped to `.rc-dossier`) now reads as an actual export
dossier: Fraunces serif display type, a letterhead strip, numbered "Exhibit A–E" sections,
hairline rules and dotted-leader manifest lines, cert marks and photos framed as captioned
exhibits ("Fig. 01", "Fig. 02"...), and a fill-in-the-blank application form.

That layout first shipped on a warm paper ground with dark ink type. The user preferred the
established dark palette, so **the dossier layout stays and the colours are the site's own**:
`home.css` consumes the global tokens (`--rc-ground`, `--rc-ink`, `--rc-muted`, `--rc-line`,
`--rc-accent`) rather than carrying a parallel set, and the shared components (nav, footer,
CTAs, form, export map) are left on their own defaults — those were written for this ground
and need no repainting. Locked palette above is unchanged and still governs.
`/water` and `/soft-drinks` were never touched: this is a homepage-only layout fork.

## Delivery tier

### Homepage refinement (2026-09-10)

The homepage now uses a quieter editorial composition: the temple, dark palette and
Fraunces headings remain; file numbers, exhibit labels and numbered clauses are removed.
The hero names both product categories and private label, with direct product and quote
links. Equal square product photographs lead into the seven-flavour Garni Cola family.
Quality is a compact block with native disclosures for tests and shipping documents,
paired with the plant photograph. Export map and ordering terms share a desktop row;
private label and enquiries have distinct split compositions.

The shared header includes a keyboard-accessible mobile disclosure menu. The enquiry form
has visible field boundaries, 16px inputs and optional order details behind a disclosure.
The home quality-report link carries that request into the submitted message without
replacing the buyer's own text. No sample report or analysis values are invented.

`static` — no scroll-scrub, no pinned chapters, no GSAP/Lenis dependency for the hero. One
full-bleed static hero, ordinary document-flow sections after it.

## Animation mode

`minimal` — CSS transitions on hover/focus states only. No scroll-linked motion on the home
page. *(Was `animated-website` / Tier-1 scroll-scrub at intake; reversed after shipping —
see Concept spine.)*

### What the hero keeps from the old journey

The five chapters' copy (source, composition, production, documents, logistics) was real
content, not decoration — it did not get deleted, it moved:

| # | Kicker | Headline | Where it lives now |
|---|---|---|---|
| 1 | Since 1999 | Water from a historical source | Home hero (`rc-home-hero`), static, single colonnade frame |
| 2 | Composition | What the rock leaves behind | Home "Composition and certificates" section — real `PARAMETERS` table |
| 3 | Production | European lines, Armenian water | Folded into the same section's lede copy |
| 4 | Documents | Cleared for your market | Same section — ISO/EAC cert badges + `DocCta` |
| 5 | Logistics | On a pallet, in a container | MOQ figure in the Export section's `FIGURES` strip; FOB/CIF in its lede |

### World grammar (hero frame only — no longer a film)

The hero image: the inner colonnade of the Garni Temple, wet near-black basalt columns
receding into darkness on both sides, hard cold dawn shafts from the upper left, wet
reflective floor, snow-capped Armenian mountains and a misty gorge glowing pale in the far
opening. One frame, not a sequence — no flicker, no cuts, no on-screen text baked into the
image (headline is real DOM text, overlaid).

**The image carries no product.** Generative models redraw small type, so the label would
come back wrong. Every bottle on this site is the company's own render, composited or used
directly. This is a hard rule, not a preference.

### Proof section imagery

The "Composition and certificates" section leans on real, non-generated photography: the
actual ISO 22000 / ISO 9001 / EAC certificate artwork, and real plant-floor photos
(`photo-crates.webp`, `photo-plant-tour.webp`) already in hand — not renders, not
generated plates. Proof-forward means the imagery itself has to be verifiable.

## Locked palette

Taken from the Garni Crystalline Brand Identity Guide. The brandbook's Pantone P 106-8 C is
the company's registered brand colour, which overrides the near-black-plus-blue ban; and it
is a true mid blue, not a neon cyan glow. The page carries cream and stone alongside it so
the result reads as basalt and daylight, not as dark SaaS.

| Token | Hex | Role |
|---|---|---|
| `--ground` | `#08131B` | page ground, basalt night |
| `--ground-2` | `#0E1F2C` | raised surfaces |
| `--accent` | `#006FBA` | the one accent, Pantone P 106-8 C |
| `--navy` | `#275689` | secondary structure |
| `--aqua` | `#BCE4E5` | data, table values |
| `--cream` | `#FFE7D1` | rim light, quiet emphasis |
| `--ink` | `#F2F6F8` | primary text |
| `--muted` | `#8AA0AE` | secondary text |
| `--cola` | `#DA2128` | Garni Cola section only, from its own brandbook |

One theme page-wide: dark throughout. No light section sandwiched in.

## Locked type

**Satoshi** (display + body) with **JetBrains Mono** for figures, spec tables and codes.

The brandbook specifies Neue Frutiger World and Mont, both commercial and unlicensed for
web here. Satoshi is the closest available humanist grotesk to Frutiger's proportions, and
the mono is not decoration: this site is mineral values, HS codes, pallet counts and MOQs,
and those belong in tabular figures. Serif is deliberately not used.

## Section plan

Each layout family appears once. Eyebrow ration: 6 sections, ceiling 2.

| # | Section | Layout family |
|---|---|---|
| 1 | Static hero, one frame | full-bleed static image, headline over a bottom scrim |
| 2 | Composition and certificates | data table plus real cert marks and plant photography |
| 3 | Two brands, one plant | asymmetric diptych, water left, cola right |
| 4 | Water range | horizontal scroll of real bottle renders |
| 5 | Cola flavours | gapless colour-blocked grid, 7 real renders |
| 6 | Export terms and request | oversized figures strip above a single form |

## Asset plan

- Film: one 15s 4K single-shot, Seedance 2.0, audio off. Desktop and mobile encodes plus exact-frame posters.
- Environment plates: generated, product-free.
- Product imagery: the company's own renders, already in hand. Never generated.
- Icons: generated set, one stroke weight, accent on ground.
- Logo: the company's existing marks.
- Cover and OG: generated once, alongside the film.

## CTA inventory

Each CTA is its own component with its own interaction identity. No shared button class.

| CTA | Where | Garment |
|---|---|---|
| Request a quote | nav, sticky | framed block, accent fill, arrow slides on hover |
| Download quality report | certificates | underlined inline link with a file-size tag |
| See the range | brands diptych | oversized headline whose baseline rule extends on hover |
| Talk to export | closing form | full-width banner CTA, ground inverts to accent |

One label per intent page-wide: it is "Request a quote" everywhere, never "Get in touch"
or "Contact us" as well.
