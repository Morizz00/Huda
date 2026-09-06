.PHONY: run build sqlc migrate-up migrate-down seed

DATABASE_URL ?= postgres://postgres@localhost:5432/huda_dev?sslmode=disable

run:
	DATABASE_URL=$(DATABASE_URL) go run ./cmd/api

build:
	go build -o bin/api ./cmd/api

sqlc:
	sqlc generate

migrate-up:
	for f in db/migrations/*.up.sql; do psql "$(DATABASE_URL)" -v ON_ERROR_STOP=1 -f "$$f"; done

migrate-down:
	for f in $$(ls -r db/migrations/*.down.sql); do psql "$(DATABASE_URL)" -v ON_ERROR_STOP=1 -f "$$f"; done

seed:
	for f in db/seed/*.sql; do psql "$(DATABASE_URL)" -v ON_ERROR_STOP=1 -f "$$f"; done
