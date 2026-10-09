# Typography assets

Newsreader: variable serif display family, regular and italic. Manrope: variable sans serif for body text, navigation, labels and forms.

Web font files are Latin WOFF2 subsets, self-hosted with `font-display: swap`. The main regular fonts are preloaded by the root layout. The original TTF files are retained for local motion-film rendering; they are not requested by the website.

Sources:
- https://github.com/google/fonts/tree/main/ofl/newsreader
- https://github.com/google/fonts/tree/main/ofl/manrope

License files are in `licenses/newsreader-OFL.txt` and `licenses/manrope-OFL.txt`.

The type hierarchy and responsive refinements are in `src/app/typography.css`. The film renderer uses the same font families through a project-local Fontconfig configuration and cache, without installing fonts on the computer.
