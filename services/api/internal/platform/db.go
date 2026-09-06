package platform

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

// NewPool opens a pgx connection pool against the given Postgres DSN
// (e.g. "postgres://user:pass@host:5432/dbname?sslmode=disable").
func NewPool(ctx context.Context, dsn string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, fmt.Errorf("platform: create pool: %w", err)
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("platform: ping database: %w", err)
	}
	return pool, nil
}
