# ROCARM — design brief

## Design read

For an import buyer at a distributor, retail chain or HoReCa group in the US, the EU,
Russia or the UAE, deciding whether an Armenian bottler is worth a container. The register
is ancient, cold and exact: a 1st-century temple and a lab report in the same room.
Not lifestyle, not "refreshment". Proof.

## Concept spine

**Journey to the source.** The visitor walks the colonnade of the Garni Temple and arrives
at the opening where the water comes from. Every chapter is a waypoint on that walk, and
the commercial sections after it are the same walk continued: source, plant, certificate,
pallet, port. The brand's own logo is that colonnade, so the spine is not decoration.

## Delivery tier

`cinema` — Lenis + GSAP, Tier-1 scroll-scrub hero, scroll chapters.

## Animation mode

`animated-website` — user picked Animated at intake.

### Journey shape

`single-shot` — ONE continuous ~15s forward dolly down the temple colonnade, scrubbed end
to end. One subject, one move, no seams. The story is one place seen ever more closely, so
`multi-leg` would buy nothing but cost and risk.

### Journey (chapters over the one film)

| # | Kicker | Headline | Body | Tags |
|---|---|---|---|---|
| 1 | Since 1999 | Water from a historical source | The spring feeds the gorge below the Garni Temple, where basalt has filtered it since before the temple was built. | Armenia · Natural spring |
| 2 | Composition | What the rock leaves behind | Low mineralisation, stable year round, verified batch by batch in our own laboratory. | Lab verified |
| 3 | Production | European lines, Armenian water | Climaveneta, Kaeser, STM and Siat run the plant. The water never meets air between the source and the cap. | ISO 22000 · ISO 9001 |
| 4 | Documents | Cleared for your market | EAC for the Eurasian Union, ISO for everyone else, and a quality report you can hand to your own compliance team. | EAC · Downloadable |
| 5 | Logistics | On a pallet, in a container | From 1,000 units. PET and glass, still and sparkling, private label on request. | MOQ 1,000 · FOB / CIF |

### World grammar

One byte-identical preamble across every generated frame: the inner colonnade of the Garni
Temple, wet near-black basalt columns receding into darkness on both sides, hard cold dawn
shafts from the upper left, wet reflective floor, snow-capped Armenian mountains and a
misty gorge glowing pale in the far opening. Locked exposure, no flicker, no cuts, no
on-screen text. Perspective stays low and centred; the camera only ever moves forward.

**The film carries no product.** Generative models redraw small type, so the label would
come back wrong. Every bottle on this site is the company's own render, composited or used
directly. This is a hard rule, not a preference.

### Mobile framing

Every focal point stays inside the centre-safe area; the corridor's vanishing point is
centred so a 9:16 crop still reads as the same walk. Mobile encode capped at 720p.

### Delivery budget

≤32 MiB desktop clips, ≤16 MiB mobile clips.

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
| 1 | Scroll-scrub journey, 5 chapters | full-bleed film with overlaid semantic chapters |
| 2 | Two brands, one plant | asymmetric diptych, water left, cola right |
| 3 | Water range | horizontal scroll of real bottle renders |
| 4 | Composition and certificates | data table plus downloadable document list |
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
