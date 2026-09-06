package platform

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

// WriteJSON encodes v as JSON and writes it with the given status code.
func WriteJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if v == nil {
		return
	}
	if err := json.NewEncoder(w).Encode(v); err != nil {
		slog.Error("write json response", "error", err)
	}
}

// ErrorResponse is the JSON body returned for handled error conditions.
type ErrorResponse struct {
	Error string `json:"error"`
}

// WriteError writes a JSON error body with the given status code.
func WriteError(w http.ResponseWriter, status int, message string) {
	WriteJSON(w, status, ErrorResponse{Error: message})
}
