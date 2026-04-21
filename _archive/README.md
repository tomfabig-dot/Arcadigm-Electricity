# _archive/

Code and assets that are no longer wired into the live app but kept for
reference.  Nothing in here is imported by anything under `src/` or built
into `dist/`.

## Contents

### `arcadigm_marketing_pack_V2/`
Source brand SVGs (icon + wordmark, light + dark). Superseded by the files
under `public/` which are the ones referenced from `src/components/Brand.tsx`.
Kept for re-export if brand variants are ever needed.

### `unused-data-utils.ts.bak`
Two number formatters (`compactKwh`, `kwhPerYear`) that were exported from
`src/lib/data.ts` but had no callers. Removed 2026-04-21 to keep the data
module lean. Dropped back in if/when we add kWh-first rollups on the
dashboard.
