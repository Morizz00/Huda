package quran

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"

	"github.com/Morizz00/Huda/services/api/internal/db"
)

// ErrNotFound is returned when a requested surah/ayah does not exist.
var ErrNotFound = errors.New("quran: not found")

// Service exposes the Quran read operations the API handlers need,
// wrapping the sqlc-generated queries with basic error normalization.
type Service struct {
	q *db.Queries
}

func NewService(q *db.Queries) *Service {
	return &Service{q: q}
}

func (s *Service) ListSurahs(ctx context.Context) ([]db.Surah, error) {
	return s.q.ListSurahs(ctx)
}

func (s *Service) GetSurah(ctx context.Context, id int32) (db.Surah, error) {
	surah, err := s.q.GetSurah(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return db.Surah{}, ErrNotFound
		}
		return db.Surah{}, fmt.Errorf("quran: get surah %d: %w", id, err)
	}
	return surah, nil
}

func (s *Service) ListAyahsBySurah(ctx context.Context, surahID int32) ([]db.Ayah, error) {
	return s.q.ListAyahsBySurah(ctx, surahID)
}

// SurahDetail is a surah plus its full ayah text, returned by the
// GET /quran/surahs/{id} endpoint.
type SurahDetail struct {
	db.Surah
	Ayahs []db.Ayah `json:"ayahs"`
}

func (s *Service) GetSurahDetail(ctx context.Context, id int32) (SurahDetail, error) {
	surah, err := s.GetSurah(ctx, id)
	if err != nil {
		return SurahDetail{}, err
	}
	ayahs, err := s.ListAyahsBySurah(ctx, id)
	if err != nil {
		return SurahDetail{}, fmt.Errorf("quran: list ayahs for surah %d: %w", id, err)
	}
	return SurahDetail{Surah: surah, Ayahs: ayahs}, nil
}

// AyahDetail is an ayah plus its available translations, returned by the
// GET /quran/ayah/{id} endpoint.
type AyahDetail struct {
	db.Ayah
	Translations []db.ListTranslationsForAyahRow `json:"translations"`
}

func (s *Service) GetAyahDetail(ctx context.Context, id int32) (AyahDetail, error) {
	ayah, err := s.q.GetAyah(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return AyahDetail{}, ErrNotFound
		}
		return AyahDetail{}, fmt.Errorf("quran: get ayah %d: %w", id, err)
	}
	translations, err := s.q.ListTranslationsForAyah(ctx, id)
	if err != nil {
		return AyahDetail{}, fmt.Errorf("quran: list translations for ayah %d: %w", id, err)
	}
	return AyahDetail{Ayah: ayah, Translations: translations}, nil
}

func (s *Service) ListTranslations(ctx context.Context) ([]db.Translation, error) {
	return s.q.ListTranslations(ctx)
}

func (s *Service) ListReciters(ctx context.Context) ([]db.Reciter, error) {
	return s.q.ListReciters(ctx)
}

func (s *Service) ListAudioForAyah(ctx context.Context, ayahID int32) ([]db.AyahAudio, error) {
	return s.q.ListAudioForAyah(ctx, ayahID)
}

const (
	defaultSearchLimit = 20
	maxSearchLimit      = 100
)

func (s *Service) SearchAyahs(ctx context.Context, query string, limit, offset int32) ([]db.Ayah, error) {
	if limit <= 0 {
		limit = defaultSearchLimit
	}
	if limit > maxSearchLimit {
		limit = maxSearchLimit
	}
	if offset < 0 {
		offset = 0
	}
	return s.q.SearchAyahs(ctx, db.SearchAyahsParams{
		Query:     query,
		RowLimit:  limit,
		RowOffset: offset,
	})
}
