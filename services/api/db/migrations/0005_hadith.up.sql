-- PLAN.md #19 names the top-level table "collections", but that name is
-- already used by 0003_personalization (a user's Quran bookmark
-- collections). Prefixed with hadith_ here to avoid the clash; everything
-- else follows PLAN.md #19 as written.

CREATE TABLE hadith_collections (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL, -- e.g. "Sahih al-Bukhari"
    name_arabic TEXT,
    compiler TEXT, -- e.g. "Imam al-Bukhari"
    hadith_count INTEGER
);

CREATE TABLE hadith_books (
    id TEXT PRIMARY KEY,
    collection_id TEXT NOT NULL REFERENCES hadith_collections (id),
    book_number INTEGER NOT NULL,
    name TEXT NOT NULL,
    name_arabic TEXT,
    UNIQUE (collection_id, book_number)
);

CREATE TABLE hadith_chapters (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL REFERENCES hadith_books (id),
    chapter_number INTEGER NOT NULL,
    name TEXT NOT NULL,
    name_arabic TEXT,
    UNIQUE (book_id, chapter_number)
);

CREATE TABLE hadith_sources (
    id TEXT PRIMARY KEY,
    reference TEXT NOT NULL, -- e.g. "Sahih al-Bukhari 1", canonical numbering
    url TEXT
);

CREATE TABLE hadith_grades (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- sahih | hasan | da'if | mawdu' ...
    description TEXT
);

CREATE TABLE hadith (
    id TEXT PRIMARY KEY,
    collection_id TEXT NOT NULL REFERENCES hadith_collections (id),
    book_id TEXT REFERENCES hadith_books (id),
    chapter_id TEXT REFERENCES hadith_chapters (id),
    source_id TEXT REFERENCES hadith_sources (id),
    grade_id TEXT REFERENCES hadith_grades (id),
    narrator TEXT,
    text_arabic TEXT NOT NULL,
    hadith_number INTEGER,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE hadith_translations (
    id TEXT PRIMARY KEY,
    hadith_id TEXT NOT NULL REFERENCES hadith (id),
    translation_id TEXT NOT NULL REFERENCES translations (id),
    text TEXT NOT NULL,
    UNIQUE (hadith_id, translation_id)
);
