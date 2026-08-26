CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    display_name TEXT,
    auth_provider TEXT NOT NULL, -- email | google | apple | anonymous
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE user_devices (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id),
    platform TEXT NOT NULL, -- ios | android | web
    push_token TEXT,
    last_seen_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE user_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users (id),
    device_id TEXT,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE user_preferences (
    user_id TEXT PRIMARY KEY REFERENCES users (id),
    language TEXT NOT NULL DEFAULT 'en',
    translation_id TEXT,
    reciter_id TEXT,
    calculation_method TEXT,
    madhhab TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    timezone TEXT,
    theme TEXT NOT NULL DEFAULT 'system',
    font_size TEXT NOT NULL DEFAULT 'md',
    notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE user_settings (
    user_id TEXT PRIMARY KEY REFERENCES users (id),
    sync_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    analytics_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL
);
