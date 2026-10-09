# BestMark website

A responsive Next.js App Router website with a static export, the supplied BestMark logo, blue/navy/ivory styling, project pages, an animated SVG corridor diagram, project filters and a browser-only enquiry draft flow.

## Run

```sh
npm install
npm run dev
```

## Build and preview the actual static export

```sh
npm run build
npm run typecheck
npm run check:export
npm run preview
```

Open http://127.0.0.1:3000. Upload the **contents of `out/`** to the public document root of a static hosting plan (for example GoDaddy's `public_html`). Keep `_next`, images and route directories intact. No Node.js process is required in production. Routes export as folders containing `index.html`, so the host must support directory index files. Configure the host's custom 404 page to use `404.html`.

## Content and launch preparation

- Project data and contact information live in `src/lib/content.ts`. Fortune Towers, LIOS and The Harvest are updated from the official sites supplied by the user; their amenities, location links and image galleries live in `src/lib/project-information.ts`. Confirm current availability and specifications before publishing.
- Financial return claims and unverified testimonials/team portraits were deliberately excluded.
- The original user-supplied logo is in `public/images/bestmark-logo-original.jpeg`. CSS crops its surrounding whitespace without recolouring or altering the source image.
- Fortune Towers uses its logo, aerial render, clubhouse render, construction photo, five official floor plans and exact embedded Google map from `https://fortunetowers.co.in/`. LIOS uses the Grupe Nayan developer logo, villa/clubhouse/landscape renders and official location diagram from `https://grupenayan.com/`. The exact image source URLs are recorded in `scripts/project-assets.json`. The Harvest uses the Pooja Crafted Homes logo, gold-facade tower render, brochure cover, amenity renders and site/typical-floor plans from `https://theharvestkokapet.in/`, plus its embedded map coordinates.
- Fortune location travel times and registration references are attributed to its official website; LIOS travel times are attributed to Grupe Nayan. Harvest displays approximate distances from the supplied connectivity page. Its supplied homepage states 35 floors, differing from the earlier 31-floor reference; current approved plans should establish specifications before publication. Approximate drive times are not guarantees. The earlier LIOS acreage and villa count were removed because the supplied developer page does not establish them. Fortune's inconsistent price display was omitted; enquiries request current pricing.
- The native image viewer supports Escape, previous/next controls and arrow keys. Floor-plan tabs load each tower's plan. The gallery distinguishes architectural renders from actual site photography.
- Brochure buttons request the latest brochure through the enquiry flow; no unprovided brochures are fabricated.
- The form validates inputs and generates a WhatsApp/email draft. It does **not** collect submissions, send email automatically, or store leads. The visitor reviews and sends the message. A future server or approved form service is needed for automatic submissions or CRM integration.
- The homepage city section uses separate Full HD motion films for Mallampet, Kokapet and Tukkuguda, with developer renders and a labelled connection diagram. The Fortune and Harvest detail pages additionally load the official Google Maps embed; Google may process connection information. The LIOS location diagram is locally hosted and links to a named Google Maps search rather than an invented coordinate.
- Update `metadataBase`, the sitemap and robots URL if the final domain differs from `https://bestmark.in`.
- Fonts are self-hosted in `public/fonts`. No runtime font service or external images are needed.
- Motion respects `prefers-reduced-motion`; the site works without animation and uses native scrolling. There are no analytics or advertising cookies.

## Design

Blue `#0868A5`, navy `#10283F`, ivory `#F7F5F0`, slate `#65717B`, red `#DC291D`. Newsreader variable serif headings and italic accents with Manrope variable sans-serif body text, navigation and labels. Self-hosted Latin WOFF2 files, font licenses and original rendering fonts live in public/fonts. The hierarchy and responsive type refinements are in src/app/typography.css. The city films use the same type families, rendered locally at Full HD / 30 fps with playback controlled by IntersectionObserver.

## Business positioning

Homepage hero, track-record figures, developer services and investor advisory copy are adapted from the user-confirmed reference at https://property-nexus-53.preview.emergentagent.com/?utm_source=share (6 October 2026). BestMark is presented as a strategic sales and marketing partner for selected projects, established in 2009, with 17+ years of experience, ₹1,200 Cr+ merchandise value marketed and 40+ projects advised and driven. Official project sites remain the sources for project imagery and technical details.

## Cinematic hero film

The homepage uses all four user-supplied AdobeStock MOV clips in `public/video`. `npm run prepare:video` creates a 21.44-second, silent H.264 8-bit MP4 montage with dissolves and a transition back to the opening frame. Desktop footage is 1600×900 (~7.8 MB); mobile is 960×540 (~2.5 MB). A locally hosted poster appears immediately and remains available if playback fails. The hero supports four scene selectors, pause/play, reduced-motion and data-saver preferences, and pauses when offscreen or the browser is hidden. City footage is labelled separately from project imagery. The generated static export excludes the original MOV source files; the source files remain in `public/video`. Video conversion is a separate preparation step, so normal builds do not require re-encoding. The static preview server supports MP4 content types and HTTP byte ranges for seeking.

