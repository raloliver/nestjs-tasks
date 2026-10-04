# nestjs-tasks

A small REST API for managing tasks, built with [NestJS](https://nestjs.com) and PostgreSQL.

Each task has a title, a description and a status (`OPEN`, `IN_PROGRESS`, `DONE`). Tasks can be
created, fetched individually or as a list, filtered and searched, have their status changed, and
be deleted. New tasks always start as `OPEN`.

The project follows a four-layer structure — controller, service, repository and entity — where all
SQL is kept in the repository layer.

## Stack

| | |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript 6 |
| ORM | TypeORM 1.1 |
| Database | PostgreSQL 16 (via `pg` 8) |
| Validation | `class-validator` + `class-transformer` (global `ValidationPipe`) |
| Config | `@nestjs/config` 12 (reads `.env`) |
| Tests | Jest, Supertest |
| Docker | `Dockerfile` (multi-stage) + `docker-compose.yml` |

## Endpoints

All routes are prefixed with `/tasks`.

| Method | Route | Description |
|---|---|---|
| `GET` | `/tasks` | List tasks. Accepts optional `?status=OPEN` and `?search=milk` (case-insensitive, matches title or description) |
| `GET` | `/tasks/:id` | Fetch one task. `404` if it does not exist |
| `POST` | `/tasks` | Create a task. Body: `{ "title": "...", "description": "..." }` |
| `PATCH` | `/tasks/:id/status` | Change status. Body: `{ "status": "DONE" }` |
| `DELETE` | `/tasks/:id` | Delete a task. `404` if it does not exist |

Requests are validated automatically: a missing or empty `title` returns `400`, as does an
unrecognised `status` value.

```bash
curl -X POST http://localhost:3000/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Buy milk","description":"2 litres"}'
```

## Running locally with Docker

This is the recommended way: it starts the app and its database together, and no local PostgreSQL
install is needed.

```bash
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
docker compose up --build
```

The API is then available on <http://localhost:3000>.

```bash
docker compose logs -f app   # follow logs
docker compose down          # stop
docker compose down -v       # stop and delete the database volume
```

### Credentials

`.env.example` documents every variable and is copied to `.env`, which is where you set real values.
`.env` is git-ignored, so credentials are never committed.

The defaults (`postgres` / `postgres` / `task`) are throwaway local values and are fine as-is for
development. Two variables are worth understanding:

- **`DB_HOST`** — under Docker Compose this must stay `db`, the Compose service name. `localhost`
  inside the container refers to the app container itself, so the connection would fail.
- **`DB_HOST_PORT`** — the *host-side* port for PostgreSQL, used only by external tools such as
  `psql` or pgAdmin. It defaults to `5433` because a local PostgreSQL install usually already owns
  `5432`. Change it if you need a different one, or remove the `ports` entry from the `db` service to
  expose it only within the Compose network.

The app and the database both read from the same `.env`, so credentials only ever live in one file.

Note that `POSTGRES_PASSWORD` only applies when the database volume is first initialised. If you
change `DB_PASSWORD` later, run `docker compose down -v` to start from a clean database.

## Running locally without Docker

Requires Node.js 20+ and a PostgreSQL instance you can reach. If you do not have one locally, you
can still borrow the containerised database:

```bash
docker compose up -d db      # start only PostgreSQL
cp .env.example .env
```

Then edit `.env` so the app can reach it from your machine, and start the app:

```bash
# in .env, point the app at the published port and leave DB_HOST as localhost
DB_HOST=localhost
DB_PORT=5433
```

```bash
npm install
npm run start:dev     # watch mode on http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Start in watch mode |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start:prod` | Run the compiled build |
| `npm test` | Unit tests |
| `npm run test:e2e` | End-to-end tests |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

> **Note:** `npm run lint` currently fails, and `test/app.e2e-spec.ts` is still the unmodified
> scaffold test that expects a `Hello World!` root route the API does not define. Both are pending
> fixes.

## Project structure

```
src/
├── main.ts                     # bootstrap, global ValidationPipe, PORT
├── app.module.ts               # ConfigModule + TypeORM (config from env)
└── tasks/
    ├── tasks.controller.ts     # HTTP layer
    ├── tasks.service.ts        # business logic, 404 handling
    ├── tasks.repository.ts     # all database access
    ├── task.entity.ts          # Task entity
    ├── task-status.enum.ts     # OPEN | IN_PROGRESS | DONE
    └── dto/                    # validated request payloads
```

## License

UNLICENSED