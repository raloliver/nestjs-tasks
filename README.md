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
| Docker | `docker-compose.yml` — PostgreSQL only, the app runs on the host |

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

## Running the project

Docker hosts **only the database**. The Nest app runs on your machine, so edits are picked up by
watch mode, stack traces point at your real source files, and the debugger works normally.

```bash
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env
npm install
docker compose up -d --wait  # start PostgreSQL and wait until it is healthy
npm run start:dev             # http://localhost:3000
```

```bash
docker compose logs -f db     # follow database logs
docker compose down           # stop the database
docker compose down -v        # stop and delete the database volume
```

`--wait` matters: TypeORM connects on app boot, so it waits for the `pg_isready` healthcheck to
report healthy instead of failing with `ECONNREFUSED`. If you drop it, just give the database a few
seconds before starting the app.

You can also point the app at any other PostgreSQL instance you can reach — skip
`docker compose up` entirely and just fill in `.env`.

### Credentials and ports

`.env.example` documents every variable and is copied to `.env`, which is where you set real values.
`.env` is git-ignored, so credentials are never committed. Compose and the app both read that same
file, so credentials only ever live in one place.

The defaults (`postgres` / `postgres` / `task`) are throwaway local values and are fine as-is for
development. Two variables are worth understanding:

- **`DB_HOST`** — `localhost`, because the app runs on your machine and connects to the published
  port. (It was the Compose service name `db` when the app ran in a container too.)
- **`DB_PORT`** — the port the app connects to, which is the *host* side of the `DB_PORT:5432`
  mapping in `docker-compose.yml`. It defaults to `5433` because a local PostgreSQL install usually
  already owns `5432`, which would make the bind fail with "port is already allocated". Postgres
  always listens on `5432` inside the container; only the host side is configurable. Change it here
  and both the container mapping and the app follow, since they read the same variable.

Note that `POSTGRES_PASSWORD` only applies when the database volume is first initialised. If you
change `DB_PASSWORD` later, run `docker compose down -v` to start from a clean database.

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