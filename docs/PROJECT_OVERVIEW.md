# SNUG WRLD — Project Overview

SNUG WRLD is a premium t-shirt e-commerce website. The repository is a MERN application with a React storefront and an Express API. Visual design, product photography, and shopping flows are intentionally not built yet.

## Applications

`client/` is the public website. Vite serves it in development and builds static files for production. Product copy for the first ten shirts lives in `client/src/data/products.js` until those records are stored in MongoDB.

`server/` is the API. It connects to MongoDB when `MONGODB_URI` is available, and it keeps listening if the database is down so the rest of the project can still boot.

## Request path

The storefront calls the API through Axios. `VITE_API_URL` sets the base URL. When that variable is empty, requests go to `/api` and the Vite dev server proxies them to `http://localhost:5000`.

## Catalog contract

Each shirt uses a stable id from `tshirt-01` through `tshirt-10`. The same id is the URL slug, the MongoDB `slug`, and the image folder name. Image paths in the client catalog match `docs/IMAGE_ASSET_GUIDE.md`. Prices, colors, collection names, and descriptions are empty until the real catalog is written.

## Authentication

Accounts use a name, email, and password. Passwords are hashed with bcryptjs before they are stored. Login returns a JWT. Protected routes read a `Bearer` token from the `Authorization` header. There is no account interface in the website yet.

## What is not included

- Homepage and section design
- Generated or stock photography
- Cart state, checkout, and payments
- Admin tools
- Production hosting
