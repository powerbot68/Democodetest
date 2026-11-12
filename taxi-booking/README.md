# Taxi Booking (Telegram Mini App)

A separate taxi-booking platform scaffold inside this repository. Existing KMovie files remain untouched.

## Apps
- `apps/api`: Node.js + Express + TypeScript API
- `apps/customer`: Customer Telegram Mini App (Vite + React)
- `apps/driver`: Driver Telegram Mini App (Vite + React)
- `apps/admin`: Admin dashboard (Next.js)

## Infrastructure
- PostgreSQL + Prisma
- Redis for realtime and dispatch coordination
- Socket.IO for booking and driver-location events

## Quick start
1. Copy `.env.example` to `.env` and fill secrets.
2. Run `docker compose up -d` from this folder.
3. Install dependencies with `npm install`.
4. Generate Prisma client: `npm run db:generate`.
5. Run migrations: `npm run db:migrate`.
6. Start the API: `npm run dev:api`.

Each frontend app has its own development script in its package.

## Security baseline
- Verify Telegram WebApp `initData` on the server; never trust client-supplied Telegram IDs.
- Calculate fares and validate booking state transitions on the server.
- Enforce customer, driver, and admin authorization on every protected endpoint.
- Authenticate driver GPS updates and throttle location writes.
- Keep credentials in environment variables; verify payment webhook signatures.
- Apply rate limits, request validation, CORS allowlists, and HTTPS in production.

## Initial operating area
Phnom Penh, Cambodia. Configure service zones and pricing in the database before accepting real bookings.

> This is the initial project foundation, not a production-ready dispatch or payment system. Add provider credentials, operational policies, tests, and deployment configuration before launch.
