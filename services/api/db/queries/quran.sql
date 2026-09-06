-- name: ListSurahs :many
SELECT * FROM surahs ORDER BY id;

-- name: GetSurah :one
SELECT * FROM surahs WHERE id = $1;

-- name: ListAyahsBySurah :many
SELECT * FROM ayahs WHERE surah_id = $1 ORDER BY ayah_number;

-- name: GetAyah :one
SELECT * FROM ayahs WHERE id = $1;

-- name: ListTranslations :many
SELECT * FROM translations ORDER BY language, name;

-- name: ListTranslationsForAyah :many
SELECT
    ayah_translations.id,
    ayah_translations.ayah_id,
    ayah_translations.translation_id,
    ayah_translations.text,
    translations.language,
    translations.name AS translation_name,
    translations.translator
FROM ayah_translations
JOIN translations ON translations.id = ayah_translations.translation_id
WHERE ayah_translations.ayah_id = $1;

-- name: SearchAyahs :many
SELECT ayahs.*
FROM ayahs
WHERE ayahs.text_arabic ILIKE '%' || sqlc.arg(query)::text || '%'
   OR ayahs.text_transliteration ILIKE '%' || sqlc.arg(query)::text || '%'
ORDER BY ayahs.id
LIMIT sqlc.arg(row_limit)::int
OFFSET sqlc.arg(row_offset)::int;

-- name: ListReciters :many
SELECT * FROM reciters ORDER BY name;

-- name: ListAudioForAyah :many
SELECT * FROM ayah_audio WHERE ayah_id = $1;
