# Perspective motion films

Three individual 8-second Full HD (1920 x 1080), 30 fps motion compositions:
- fortune-towers-hd.mp4: Mallampet, Fortune Towers original 1920px developer renders.
- the-harvest-hd.mp4: Kokapet, The Harvest architectural render and official brochure cover.
- lios-premium-villas-hd.mp4: Tukkuguda, LIOS villa and streetscape developer renders.

Rebuild all with `node scripts/render-perspective.mjs`, or one with `node scripts/render-perspective.mjs the-harvest`.

Original image dimensions are retained before composition. Portrait artwork stays in portrait panels rather than being enlarged into a landscape image. Every first frame already shows project imagery. Animation adds a restrained masked reveal, eased typography, inset panel movement, subtle parallax and a drawn connection line. CRF 16 encoding preserves fine detail. Full HD WebP posters are sampled at frame 120.

Desktop layout puts text, corridor tabs and project selection beside the film, allowing the complete section to fit below laptop navigation. Mobile retains a stacked layout. Playback pauses offscreen, in hidden tabs and on user request, with reduced-motion/data-saving defaults respected. The previous generated city skyline is not used by this section.

Typography: Newsreader display titles with Manrope supporting text, matching the website. The renderer configures a project-local font directory and cache before loading Sharp, so no system font installation is required.
