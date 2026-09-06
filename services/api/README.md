# HUDA API (Go)

Modular monolith per [PLAN.md #47](../../PLAN.md); deploys to AWS Lambda in
production, runs as a plain HTTP server locally.

## Local setup

1. Start a local Postgres and create a `huda_dev` database.
2. Copy `.env.example` to `.env` and adjust `DATABASE_URL` if needed.
3. Apply migrations and seed data:
   ```sh
   make migrate-up
   make seed
   ```
4. Regenerate sqlc code after changing anything in `db/migrations` or `db/queries`:
   ```sh
   make sqlc
   ```
5. Run the API:
   ```sh
   make run
   ```

## Layout

- `cmd/api` — entrypoint; runs as a Lambda handler when `AWS_LAMBDA_FUNCTION_NAME`
  is set, otherwise a plain `net/http` server.
- `internal/db` — sqlc-generated data access code (do not hand-edit).
- `internal/platform` — DB pool setup, shared HTTP response helpers.
- `internal/<domain>` — one package per route group from PLAN.md #35. Only
  `quran` is implemented so far.
- `db/migrations` — versioned schema (`golang-migrate` style `.up`/`.down` pairs).
- `db/queries` — sqlc query definitions.
- `db/seed` — dev-only fixtures. Not canonical content (PLAN.md #40).

## Try it

```sh
curl localhost:8080/health
curl localhost:8080/api/v1/quran/surahs
curl localhost:8080/api/v1/quran/surahs/1
curl "localhost:8080/api/v1/quran/search?q=الله"
```
