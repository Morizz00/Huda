CREATE TABLE surahs (
    id INTEGER PRIMARY KEY, -- 1-114
    name_arabic TEXT NOT NULL,
    name_transliteration TEXT NOT NULL,
    name_translation TEXT NOT NULL,
    revelation_place TEXT NOT NULL, -- meccan | medinan
    ayah_count INTEGER NOT NULL,
    order_in_revelation INTEGER
);

CREATE TABLE ayahs (
    id INTEGER PRIMARY KEY, -- global ayah number, 1-6236
    surah_id INTEGER NOT NULL REFERENCES surahs (id),
    ayah_number INTEGER NOT NULL, -- number within surah
    text_arabic TEXT NOT NULL,
    text_uthmani TEXT,
    text_transliteration TEXT,
    juz INTEGER NOT NULL,
    hizb INTEGER NOT NULL,
    rub INTEGER NOT NULL,
    page INTEGER NOT NULL,
    sajdah TEXT, -- null | recommended | obligatory
    UNIQUE (surah_id, ayah_number)
);

CREATE TABLE translations (
    id TEXT PRIMARY KEY,
    language TEXT NOT NULL,
    name TEXT NOT NULL,
    translator TEXT,
    source TEXT
);

CREATE TABLE ayah_translations (
    id TEXT PRIMARY KEY,
    ayah_id INTEGER NOT NULL REFERENCES ayahs (id),
    translation_id TEXT NOT NULL REFERENCES translations (id),
    text TEXT NOT NULL,
    UNIQUE (ayah_id, translation_id)
);

CREATE TABLE reciters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    style TEXT
);

CREATE TABLE ayah_audio (
    id TEXT PRIMARY KEY,
    ayah_id INTEGER NOT NULL REFERENCES ayahs (id),
    reciter_id TEXT NOT NULL REFERENCES reciters (id),
    audio_url TEXT NOT NULL,
    duration_ms INTEGER,
    UNIQUE (ayah_id, reciter_id)
);
