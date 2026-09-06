package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/httpadapter"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/Morizz00/Huda/services/api/internal/db"
	"github.com/Morizz00/Huda/services/api/internal/platform"
	"github.com/Morizz00/Huda/services/api/internal/quran"
)

func newRouter(pool *pgxpool.Pool) http.Handler {
	queries := db.New(pool)
	quranHandler := quran.NewHandler(quran.NewService(queries))

	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(15 * time.Second))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		platform.WriteJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	r.Route("/api/v1", func(api chi.Router) {
		api.Mount("/quran", quranHandler.Routes())
	})

	return r
}

func main() {
	ctx := context.Background()

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		slog.Error("DATABASE_URL is not set")
		os.Exit(1)
	}

	pool, err := platform.NewPool(ctx, dsn)
	if err != nil {
		slog.Error("failed to connect to database", "error", err)
		os.Exit(1)
	}
	defer pool.Close()

	handler := newRouter(pool)

	// Running under Lambda: hand the chi router to API Gateway via the
	// HTTP API (payload format 2.0) adapter.
	if os.Getenv("AWS_LAMBDA_FUNCTION_NAME") != "" {
		adapter := httpadapter.NewV2(handler)
		lambda.Start(adapter.ProxyWithContext)
		return
	}

	// Local/dev: plain HTTP server.
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	slog.Info("starting HTTP server", "port", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		slog.Error("server stopped", "error", err)
		os.Exit(1)
	}
}
