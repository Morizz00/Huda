CREATE TABLE collections (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    -- Sync Engine fields (PLAN.md #34)
    version INTEGER NOT NULL DEFAULT 1,
    device_id TEXT,
    operation_id TEXT
);

CREATE TABLE bookmarks (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id),
    ayah_id INTEGER NOT NULL REFERENCES ayahs (id),
    collection_id TEXT REFERENCES collections (id),
    color TEXT,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    device_id TEXT,
    operation_id TEXT
);

CREATE TABLE notes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id),
    ayah_id INTEGER NOT NULL REFERENCES ayahs (id),
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    device_id TEXT,
    operation_id TEXT
);

CREATE TABLE reading_history (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id),
    ayah_id INTEGER NOT NULL REFERENCES ayahs (id),
    read_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE reading_progress (
    user_id TEXT PRIMARY KEY REFERENCES users (id),
    last_surah_id INTEGER REFERENCES surahs (id),
    last_ayah_id INTEGER REFERENCES ayahs (id),
    updated_at TIMESTAMPTZ NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    device_id TEXT,
    operation_id TEXT
);

CREATE TABLE khatm_plans (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id),
    start_date TIMESTAMPTZ NOT NULL,
    target_date TIMESTAMPTZ,
    daily_target_pages INTEGER,
    completed_pages INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active', -- active | completed | abandoned
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    device_id TEXT,
    operation_id TEXT
);
