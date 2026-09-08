CREATE TABLE dua_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    parent_id TEXT REFERENCES dua_categories (id)
);

CREATE TABLE dua_sources (
    id TEXT PRIMARY KEY,
    reference TEXT NOT NULL, -- e.g. "Quran 2:201", "Sahih Bukhari 6345"
    grade TEXT,
    notes TEXT
);

CREATE TABLE duas (
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES dua_categories (id),
    source_id TEXT REFERENCES dua_sources (id),
    text_arabic TEXT NOT NULL,
    text_transliteration TEXT,
    sort_order INTEGER,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- Reuses the `translations` table from 0002_quran (language/name/translator metadata is generic).
CREATE TABLE dua_translations (
    id TEXT PRIMARY KEY,
    dua_id TEXT NOT NULL REFERENCES duas (id),
    translation_id TEXT NOT NULL REFERENCES translations (id),
    text TEXT NOT NULL,
    UNIQUE (dua_id, translation_id)
);

-- Reuses the `reciters` table from 0002_quran.
CREATE TABLE dua_audio (
    id TEXT PRIMARY KEY,
    dua_id TEXT NOT NULL REFERENCES duas (id),
    reciter_id TEXT NOT NULL REFERENCES reciters (id),
    audio_url TEXT NOT NULL,
    duration_ms INTEGER,
    UNIQUE (dua_id, reciter_id)
);
