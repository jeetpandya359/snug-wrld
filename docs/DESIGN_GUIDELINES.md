# SNUG WRLD — Design Guidelines

This is the visual direction for the storefront. It is not implemented yet. The current pages only confirm that routing, Tailwind, and page transitions boot.

## Character

SNUG WRLD should feel close, soft, and precise. The site is a premium fashion house, not a discount catalog and not a loud streetwear landing page. Space, photography, and type do the selling. Interface chrome stays quiet.

## Color

Use the tokens already declared in `client/src/index.css`.

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#121212` | Text, logo on light grounds, solid buttons |
| `paper` | `#f4f1ec` | Page background |
| `stone` | `#8a847c` | Secondary text and quiet labels |
| `line` | `#e4dfd8` | Hairline borders and dividers |

Photography can introduce the garment color. Do not add extra brand colors until a real palette review. Avoid pure white page backgrounds and high-saturation UI accents.

## Type

Headlines will use a high-contrast serif once the font files in `client/public/fonts/` are added. Interface text stays a neutral sans. Until those files exist, the UI uses Segoe UI so the project does not depend on a remote font.

- Brand lockup: wide letter-spacing, small size, uppercase
- Page titles: large, medium weight, sentence case
- Prices: tabular numbers, no decorative styling
- Body copy: short lines, comfortable measure

## Layout

- Desktop content sits in a wide editorial column with large outer margins.
- Product imagery is larger than the text block beside it.
- Sections stack with clear vertical rhythm. Do not fill every gap.
- The shop should be easy to scan: garment, name, price, then detail on request.
- Mobile keeps the same palette and type scale, with one column and full-width imagery.

## Motion

Framer Motion is configured in `client/src/components/animations/motion.js`.

- Route changes fade in about 350ms with an ease-out curve.
- Do not bounce, overshoot, or parallax the whole page.
- Hover states are small: a slight image shift or an underline, not a color flash.
- Motion must respect `prefers-reduced-motion` when the real pages are built.

## Components to design later

The empty folders under `client/src/components/` are reserved for the navbar, hero, clothing rack, product card, product showcase, footer, and shared controls. Build those when the photography exists. Do not fill them with placeholder marketing.

## Images

Follow `docs/IMAGE_ASSET_GUIDE.md`. Product shots that sit on the paper background or on a rack must be transparent PNG files. Do not hotlink external image URLs.
