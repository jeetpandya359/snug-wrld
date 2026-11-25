# SNUG WRLD — Image Asset Guide

All website images will be generated separately and saved into `client/public/`. Nothing in that library has been generated yet. Do not reference remote image URLs in the app. Vite serves `client/public` from the site root, so a file at `client/public/images/hero/hero-desktop.jpg` is used as `/images/hero/hero-desktop.jpg`.

Export in sRGB. Use lowercase filenames with hyphens. Keep product PNG files under about 1.5 MB and photographs under about 500 KB.

## Formats

| Kind of image | Format | Background |
| --- | --- | --- |
| Logo and monogram | SVG, plus one PNG fallback | Transparent |
| Isolated garment, front and back | PNG | Transparent |
| Detail crops and on-rack garment | PNG | Transparent |
| Hanger and clothing rail | PNG | Transparent |
| Hero, lifestyle, collection banners, rack scene | JPG | Photographic, not transparent |
| Paper texture | JPG | Photographic, tileable |
| Film grain overlay | PNG | Transparent |

Transparent files need a real alpha channel. Do not fake transparency with a white or cream background. Center the garment and leave roughly 8% padding on every side so it can be placed on the rack and on the paper page.

## Dimensions

| Asset | Pixels | Notes |
| --- | --- | --- |
| `front.png`, `back.png` | 2000 × 2400 | Full garment, straight-on |
| `detail-01.png`, `detail-02.png` | 1600 × 2000 | Fabric, collar, print, or hem |
| `on-rack.png` | 1600 × 2200 | Same shirt on a hanger, isolated |
| `hero-desktop.jpg` | 2400 × 1500 | Homepage hero, 16:10 |
| `hero-mobile.jpg` | 1200 × 1600 | Homepage hero, portrait |
| `rack-scene.jpg` | 2400 × 1600 | Photographed rail for the rack section |
| `rail.png` | 2400 × 600 | Isolated rail for compositing |
| `hanger.png` | 800 × 1200 | Single hanger |
| Collection banners | 2400 × 1200 | One banner per collection slot |
| Lifestyle portraits | 1800 × 2400 | Worn or styled photography |
| `logo-mark.png` | 1024 × 1024 | PNG fallback of the monogram |
| `paper-texture.jpg` | 2000 × 2000 | Subtle, tileable |
| `grain.png` | 1200 × 1200 | Very light overlay, tileable |

## Branding — `client/public/images/branding/`

| File | Used in |
| --- | --- |
| `logo-wordmark.svg` | Navbar and footer on the paper background |
| `logo-wordmark-on-dark.svg` | Wordmark when it sits on photography or ink |
| `logo-mark.svg` | Favicon source, mobile nav, small lockups |
| `logo-mark.png` | Fallback where SVG is inconvenient |

The browser tab currently uses `client/public/favicon.svg`, a simple monogram. Replace it with the final `logo-mark.svg` when that file exists.

## Hero — `client/public/images/hero/`

| File | Used in |
| --- | --- |
| `hero-desktop.jpg` | Homepage hero, wide screens |
| `hero-mobile.jpg` | Homepage hero, narrow screens |

## Rack — `client/public/images/rack/`

| File | Used in |
| --- | --- |
| `rack-scene.jpg` | Homepage clothing-rack scene |
| `rail.png` | Composited rack if shirts are hung in code |
| `hanger.png` | Single hanger used with isolated shirts |

## Products — `client/public/images/products/`

Create one folder per shirt. The folder name is the product id.

`tshirt-01` `tshirt-02` `tshirt-03` `tshirt-04` `tshirt-05` `tshirt-06` `tshirt-07` `tshirt-08` `tshirt-09` `tshirt-10`

Each folder uses the same five names:

| File | Used in |
| --- | --- |
| `front.png` | Product card, rack, and the default product view |
| `back.png` | Product detail, back view |
| `detail-01.png` | Product detail gallery |
| `detail-02.png` | Product detail gallery |
| `on-rack.png` | Rack or showcase when the shirt is shown hanging |

`client/src/data/products.js` already points at these paths. `front.png` and `back.png` are required before a shirt can be shown. The other three can arrive with the product page.

## Collections — `client/public/images/collections/`

| File | Used in |
| --- | --- |
| `collection-01.jpg` | Collection banner |
| `collection-02.jpg` | Collection banner |
| `collection-03.jpg` | Collection banner |

These are empty slots. Collection titles will be added with the catalog, not invented in the image names.

## Lifestyle — `client/public/images/lifestyle/`

| File | Used in |
| --- | --- |
| `lifestyle-01.jpg` | Homepage or about editorial |
| `lifestyle-02.jpg` | Homepage or about editorial |
| `lifestyle-03.jpg` | Homepage or about editorial |

## Backgrounds — `client/public/images/backgrounds/`

| File | Used in |
| --- | --- |
| `paper-texture.jpg` | Optional page texture behind the paper color |
| `grain.png` | Optional overlay on photography |

## Icons — `client/public/images/icons/`

Interface icons come from Lucide React. Use this folder only for a brand mark that Lucide does not provide.

## Fonts — `client/public/fonts/`

Add licensed files later, then register them in CSS:

- `display-regular.woff2`
- `display-medium.woff2`
- `sans-regular.woff2`
- `sans-medium.woff2`

Do not download fonts into the repo until the licenses are chosen.
