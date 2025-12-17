# Sambad

A modern real‑time chat app with servers, channels, DMs, file uploads, and built‑in voice/video powered by LiveKit. Built with Next.js App Router, Prisma, and TailwindCSS.

## Features
- Real‑time chat for channels and direct messages
- Voice/video calls via LiveKit `VideoConference`
- Servers, channels, invites, members and roles
- File uploads (images/files) via UploadThing
- Dark mode with persistent theme
- Custom email/password authentication (JWT)
- Landing page, loading and error fallbacks

## Tech Stack
- Next.js 13 App Router, React, TypeScript, TailwindCSS
- Prisma ORM (MySQL)
- LiveKit (WebRTC voice/video)
- UploadThing (file storage)
- Socket.io for realtime messaging

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Configure environment
Create a `.env` file at the project root with the following keys. Values shown are examples; replace with your own.
```env
# Database
DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<db>?ssl-mode=REQUIRED

# Auth (custom JWT)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars

# LiveKit (Cloud dashboard → Settings → Keys)
LIVEKIT_API_KEY=your-livekit-api-key
LIVEKIT_API_SECRET=your-livekit-api-secret
NEXT_PUBLIC_LIVEKIT_URL=wss://<your-project>.livekit.cloud

# UploadThing
UPLOADTHING_APP_ID=your-app-id
UPLOADTHING_SECRET=your-uploadthing-secret

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PORT=3000
```

3) Prisma setup
```bash
npx prisma generate
npx prisma db push
```

4) Run the app
```bash
npm run dev
```
Open http://localhost:3000

## Authentication
- Clerk has been fully removed. The app uses custom email/password auth stored in the `Profile` model and JWT cookies.
- Public pages: landing (`/`), auth (`/sign-in`, `/sign-up`). Protected routes enforce auth via middleware.

## LiveKit (Voice/Video)
- The token endpoint is at [app/api/livekit/route.ts](app/api/livekit/route.ts). Tokens include a 1‑hour TTL and publish/subscribe grants.
- The media UI is in [components/media-room.tsx](components/media-room.tsx) using `@livekit/components-react`.
- Required env: `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `NEXT_PUBLIC_LIVEKIT_URL`.
- If you see “invalid token / error in cryptographic primitive”, ensure the API key/secret pair matches your LiveKit dashboard, then restart the server after updating `.env`.

## File Uploads
- UploadThing config is in [app/api/uploadthing/core.ts](app/api/uploadthing/core.ts).
- Set `UPLOADTHING_APP_ID` and `UPLOADTHING_SECRET` in `.env`.

## Common Scripts
- `npm run dev` – Start development server
- `npm run build` – Build production bundle
- `npm run start` – Start production server

## Troubleshooting
- Next.js cache issues (missing `.next` files)
	- Stop the server and clear cache:
		```bash
		rm -rf .next
		npm run dev
		```
- LiveKit disconnects immediately
	- Verify `LIVEKIT_API_KEY` and `LIVEKIT_API_SECRET` are correct/matching
	- Ensure `NEXT_PUBLIC_LIVEKIT_URL` uses `wss://<project>.livekit.cloud`
- Radix UI hydration warning: `Prop id did not match`
	- We suppress hydration warnings on `html` and `body` in [app/layout.tsx](app/layout.tsx). This warning is harmless.

## Project Structure (high‑level)
- App Router pages under [app](app)
- API routes under [app/api](app/api)
- UI components under [components](components)
- Hooks under [hooks](hooks)
- Server utilities under [lib](lib)
- Prisma schema under [prisma/schema.prisma](prisma/schema.prisma)

---
Built with ❤️ for learning and real‑time collaboration.
