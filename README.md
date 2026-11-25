# SNUG WRLD

Premium interactive t-shirt storefront. The client and API are separated, and this repository currently contains the project architecture and starter code only.

## Stack

| App | Technology |
| --- | --- |
| Client | React, Vite, JavaScript, Tailwind CSS, React Router, Framer Motion, Axios, Lucide React |
| Server | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs |

## Run locally

Use two terminals. Commands are written for Windows PowerShell.

```powershell
cd "D:\t-shirt brand\client"
npm install
npm run dev
```

```powershell
cd "D:\t-shirt brand\server"
copy .env.example .env
npm install
npm run dev
```

A local `.env` is already present in both apps and is ignored by git. Replace `JWT_SECRET` before any shared or production use.

- Storefront: http://localhost:5173
- API health: http://localhost:5000/api/health

The API still starts when MongoDB is not running. Product and account routes then respond with `503` until `MONGODB_URI` points at a running database.

## Routes prepared

- `/`
- `/shop`
- `/product/:id`
- `/cart`
- `/checkout`
- `/about`
- `/contact`

These pages are route shells. The storefront design comes in a later pass.

## API prepared

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Documentation

- `docs/PROJECT_OVERVIEW.md`
- `docs/DESIGN_GUIDELINES.md`
- `docs/IMAGE_ASSET_GUIDE.md`
- `docs/DEVELOPMENT_ROADMAP.md`
