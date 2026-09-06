package quran

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/Morizz00/Huda/services/api/internal/platform"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// Routes returns the /quran route group described in PLAN.md #10/#35.
func (h *Handler) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/surahs", h.listSurahs)
	r.Get("/surahs/{id}", h.getSurah)
	r.Get("/ayah/{id}", h.getAyah)
	r.Get("/search", h.searchAyahs)
	r.Get("/translations", h.listTranslations)
	r.Get("/reciters", h.listReciters)
	return r
}

func (h *Handler) listSurahs(w http.ResponseWriter, r *http.Request) {
	surahs, err := h.svc.ListSurahs(r.Context())
	if err != nil {
		platform.WriteError(w, http.StatusInternalServerError, "failed to list surahs")
		return
	}
	platform.WriteJSON(w, http.StatusOK, surahs)
}

func (h *Handler) getSurah(w http.ResponseWriter, r *http.Request) {
	id, err := parseInt32(chi.URLParam(r, "id"))
	if err != nil {
		platform.WriteError(w, http.StatusBadRequest, "invalid surah id")
		return
	}
	detail, err := h.svc.GetSurahDetail(r.Context(), id)
	if err != nil {
		writeServiceError(w, err, "surah not found", "failed to load surah")
		return
	}
	platform.WriteJSON(w, http.StatusOK, detail)
}

func (h *Handler) getAyah(w http.ResponseWriter, r *http.Request) {
	id, err := parseInt32(chi.URLParam(r, "id"))
	if err != nil {
		platform.WriteError(w, http.StatusBadRequest, "invalid ayah id")
		return
	}
	detail, err := h.svc.GetAyahDetail(r.Context(), id)
	if err != nil {
		writeServiceError(w, err, "ayah not found", "failed to load ayah")
		return
	}
	platform.WriteJSON(w, http.StatusOK, detail)
}

func (h *Handler) searchAyahs(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	if query == "" {
		platform.WriteError(w, http.StatusBadRequest, "missing required query param 'q'")
		return
	}
	limit, _ := parseInt32(r.URL.Query().Get("limit"))
	offset, _ := parseInt32(r.URL.Query().Get("offset"))

	results, err := h.svc.SearchAyahs(r.Context(), query, limit, offset)
	if err != nil {
		platform.WriteError(w, http.StatusInternalServerError, "search failed")
		return
	}
	platform.WriteJSON(w, http.StatusOK, results)
}

func (h *Handler) listTranslations(w http.ResponseWriter, r *http.Request) {
	translations, err := h.svc.ListTranslations(r.Context())
	if err != nil {
		platform.WriteError(w, http.StatusInternalServerError, "failed to list translations")
		return
	}
	platform.WriteJSON(w, http.StatusOK, translations)
}

func (h *Handler) listReciters(w http.ResponseWriter, r *http.Request) {
	reciters, err := h.svc.ListReciters(r.Context())
	if err != nil {
		platform.WriteError(w, http.StatusInternalServerError, "failed to list reciters")
		return
	}
	platform.WriteJSON(w, http.StatusOK, reciters)
}

func writeServiceError(w http.ResponseWriter, err error, notFoundMsg, internalMsg string) {
	if errors.Is(err, ErrNotFound) {
		platform.WriteError(w, http.StatusNotFound, notFoundMsg)
		return
	}
	platform.WriteError(w, http.StatusInternalServerError, internalMsg)
}

func parseInt32(s string) (int32, error) {
	if s == "" {
		return 0, nil
	}
	n, err := strconv.ParseInt(s, 10, 32)
	if err != nil {
		return 0, err
	}
	return int32(n), nil
}
