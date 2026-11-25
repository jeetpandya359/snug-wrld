# SNUG WRLD — Development Roadmap

The architecture pass is the current milestone. Do not start the storefront design until the next instruction.

## 1. Architecture

Done in this setup.

- Client and server folders, with separate package manifests
- Tailwind, React Router, Framer Motion, and Axios wired in the client
- Express server, MongoDB connection, product model, and product routes
- JWT and bcryptjs wired for account register, login, and the current user
- Empty image library and this documentation set

## 2. Asset production

- Generate the files named in `docs/IMAGE_ASSET_GUIDE.md`
- Save them into the matching `client/public` folders
- Add licensed font files only after the typefaces are chosen
- Confirm transparent garments composite cleanly on `paper`

## 3. Visual system

- Apply `docs/DESIGN_GUIDELINES.md` to a shared page frame
- Build the navbar and footer
- Add reduced-motion handling to the route transition

## 4. Homepage

- Hero
- Clothing rack
- Product showcase
- Collection and lifestyle sections

## 5. Catalog

- Shop grid using the product card
- Product detail with front, back, and detail images
- Read from `client/src/data/products.js` first, then from `GET /api/products` once MongoDB holds the same records

## 6. Purchase flow

- Cart state
- Checkout interface
- No payment provider until one is chosen

## 7. Accounts

- Login and registration screens on top of the existing auth API
- Persist the token and protect account-only actions

## 8. Release

- Production environment variables
- A real `JWT_SECRET`
- Client build and API hosting
- Image compression check
