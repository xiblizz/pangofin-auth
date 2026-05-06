# Pangofin-Auth - Jellyfin Pangolin Auth

A small SvelteKit + Bun app that authenticates Jellyfin users and automatically manages IP "pass" rules in Pangolin resources. The app tracks the last N IP addresses used by each user in a local SQLite database and, when a user authenticates from a new IP and has more than the configured limit, evicts the oldest IP and removes its associated Pangolin rules.

## Key features

- Authenticate users against Jellyfin (`/Users/AuthenticateByName`).
- Add IP-based "ACCEPT" rules to one or more Pangolin resources per successful login.
- Track the most recent IP addresses per user in a local SQLite DB and evict the oldest when exceeding the configured limit.
- Minimal stack: Bun, SvelteKit, SQLite.
- Docker-ready with a multi-stage `Dockerfile` and `docker-compose.yml` included.

## Usage (Docker Compose)

```bash
# copy and fill environment
cp .env.example .env

# build and start
docker compose up -d --build

# view logs
docker compose logs -f

# stop and remove
docker compose down
```

## Environment

Copy `.env.example` to `.env` and fill in values. Important environment variables:

- `JELLYFIN_URL` — base URL of your Jellyfin server (e.g. `http://localhost:8096`).
- `PANGOLIN_API_URL` — base URL of the Pangolin API (e.g. `https://api.pangolin.mydomain.com`).
- `PANGOLIN_API_KEY` — API key used to call Pangolin.
- `RESOURCE_IDS` — comma-separated Pangolin resource IDs to add IP rules to (e.g. `1,3,5`).
- `MAX_IPS_PER_USER` — maximum number of IPs to keep per user (default: `5`).

See `.env.example` for a template.

## How it works

1. Client posts `{ username, password }` to `POST /api/login`.
2. Server authenticates with Jellyfin. On success, it obtains the `userId`.
3. Server checks whether the request IP is already tracked for that `userId` in the local SQLite DB.
4. If the IP is new and the user already has `MAX_IPS_PER_USER` tracked, the server:
    - deletes the oldest IP entry from the DB,
    - removes any Pangolin rules previously created for that IP (via the Pangolin API),
    - then continues to add the new IP's rules.
5. The server adds IP ACCEPT rules to each configured `RESOURCE_ID` (if they don't already exist) and records the Pangolin rule IDs in the DB so they can be cleaned up later.

## Database

- The app creates a small SQLite database with two tables: `user_ips` and `ip_rules`.
- In Docker the DB is persisted in a volume at `/app/data`.

Implementation files of interest:

- `src/lib/db.js` — SQLite helpers and schema.
- `src/routes/api/login/+server.js` — Jellyfin auth, Pangolin calls, and IP tracking/eviction logic.

## Development

```bash
# install dependencies
bun install

# run dev server (hot reload)
bun run dev
```

## Development notes

- The project uses Bun as the package manager and runtime. Use `bun install` and `bun run` to manage and run the app locally.
- The Pangolin API endpoints used by the project may vary across Pangolin versions — verify the rule creation and deletion endpoints if you upgrade Pangolin.

## Security & operational notes

- Keep `PANGOLIN_API_KEY` secret and do not commit `.env` to version control.
- If running in production, consider restricting access to the Pangolin API and securing your Docker host.
- Monitor and rotate API keys as needed.

## AI Usage Declaration

This project has been created with the occasional help of Github Copilot to accelerate the development.
Generated code has been reviewed and tested by a human.

## License

MIT
