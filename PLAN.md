# HUDA

> **هُدًى — Guidance, wherever you are.**

A full-scale, privacy-first, ad-free Muslim application bringing Quran, prayer, Qibla, Hadith, Duas, Adhkar, Islamic knowledge, worship tools, and eventually source-grounded Islamic AI into one unified ecosystem.

---

# 1. Core Principles

HUDA is built around:

* **No advertisements**
* **No selling user data**
* **Privacy by default**
* **Offline-first religious content**
* **Source-attributed Islamic information**
* **Fast and accessible UX**
* **No manipulative gamification**
* **Free access to the core religious experience**
* **Modular architecture**
* **Cloud-provider portability**

Religious content must be sourced, versioned, and auditable.

AI must never be treated as an authoritative religious source.

---

# 2. Platforms

## Web

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* PWA
* Responsive desktop/mobile interface

## Mobile

* React Native
* Expo
* TypeScript

Targets:

* Android
* iOS

## Backend

Primary:

* Cloudflare Workers
* TypeScript

AWS alternative for workloads that exceed Cloudflare's strengths.

## Infrastructure

Cloudflare:

* Workers
* D1
* R2
* KV
* Queues
* Durable Objects
* Pages
* CDN
* WAF
* Turnstile

AWS where useful:

* S3
* CloudFront
* Lambda
* ECS/Fargate
* RDS PostgreSQL
* SQS
* SNS
* Bedrock
* EC2

The application must not become tightly coupled to either provider.

---

# 3. High-Level Architecture

```text
                         ┌───────────────────┐
                         │      HUDA         │
                         │                   │
                         │ Web / PWA / Mobile│
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   API Gateway     │
                         │ Cloudflare Worker │
                         └─────────┬─────────┘
                                   │
        ┌──────────────┬───────────┼───────────┬──────────────┐
        │              │           │           │              │
        ▼              ▼           ▼           ▼              ▼
     Identity       Quran       Prayer      Content        User
      Service      Service      Service      Service       Service
        │              │           │           │              │
        └──────────────┴───────────┼───────────┴──────────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Data Layer        │
                         │ D1 / PostgreSQL   │
                         └─────────┬─────────┘
                                   │
                     ┌─────────────┴─────────────┐
                     │                           │
                     ▼                           ▼
              Object Storage                Cache
                  R2/S3                     KV/Redis

                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Async Processing  │
                         │ Queues / Workers  │
                         └─────────┬─────────┘
                                   │
              ┌────────────────────┼───────────────────┐
              │                    │                   │
              ▼                    ▼                   ▼
         Notifications         Audio Jobs          AI Pipeline
```

---

# 4. Repository Structure

Use a monorepo.

```text
huda/
│
├── apps/
│   ├── web/
│   ├── mobile/
│   └── admin/
│
├── services/
│   ├── api/
│   ├── auth/
│   ├── quran/
│   ├── prayer/
│   ├── hadith/
│   ├── duas/
│   ├── calendar/
│   ├── qibla/
│   ├── mosque/
│   ├── zakat/
│   ├── notifications/
│   ├── search/
│   ├── sync/
│   └── ai/
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── config/
│   ├── database/
│   ├── quran/
│   ├── prayer/
│   ├── islamic-calendar/
│   ├── audio/
│   └── validation/
│
├── data/
│   ├── quran/
│   ├── translations/
│   ├── tafsir/
│   ├── hadith/
│   ├── duas/
│   └── metadata/
│
├── infrastructure/
│   ├── cloudflare/
│   └── aws/
│
└── docs/
```

---

# 5. Frontend Architecture

## Shared Design System

Create a shared HUDA design system.

Components:

* Button
* Card
* Sheet
* Modal
* Bottom navigation
* Tabs
* Search
* Audio player
* Quran verse
* Hadith card
* Prayer card
* Dhikr counter
* Progress indicator
* Calendar
* Settings controls

Design goals:

* calm
* premium
* minimal
* highly readable
* Arabic-first typography
* accessible
* responsive

Avoid excessive:

* gradients
* neon colors
* gamification
* ornamental UI
* visual clutter

---

# 6. Web Application

## Routes

```text
/
 /quran
 /quran/[surah]
 /quran/[surah]/[ayah]
 /search
 /prayer
 /qibla
 /duas
 /adhkar
 /dhikr
 /hadith
 /calendar
 /ramadan
 /hajj
 /umrah
 /zakat
 /mosques
 /library
 /learn
 /profile
 /settings
```

Authenticated routes:

```text
/dashboard
/bookmarks
/notes
/history
/progress
/settings
```

---

# 7. Mobile Application

Bottom navigation:

```text
Home
Quran
Prayer
Explore
Profile
```

Home contains:

* Current prayer
* Next prayer countdown
* Quran progress
* Daily verse
* Daily dua
* Dhikr
* Hijri date

Mobile-specific functionality:

* push notifications
* background audio
* offline database
* local Quran storage
* widgets
* lock-screen information
* haptic feedback
* deep links
* share sheets
* background synchronization

---

# 8. Authentication Service

Support:

* Email
* Google
* Apple
* Passwordless authentication
* Optional anonymous/local mode

Anonymous mode should allow:

* Quran
* Prayer
* Qibla
* Duas
* Hadith
* Calendar

without requiring an account.

Authenticated users receive synchronization.

Authentication architecture:

```text
Client
  ↓
Auth Worker
  ↓
Identity Provider
  ↓
Session
  ↓
Secure token
```

Never store plaintext passwords.

---

# 9. User Service

User profile:

```text
users
user_preferences
user_devices
user_sessions
user_settings
```

Preferences:

* language
* translation
* reciter
* calculation method
* madhhab
* location
* notification preferences
* theme
* font size
* Quran display settings

Privacy controls:

* export data
* delete account
* disable synchronization
* clear history
* disable analytics

---

# 10. Quran Service

## Data

Store:

* Surahs
* Ayahs
* Juz
* Hizb
* Rub
* Sajdah markers
* Page numbers
* translations
* transliteration
* word segmentation
* Tajweed metadata
* Tafsir metadata

## API

```text
GET /quran/surahs
GET /quran/surahs/:id
GET /quran/ayah/:id
GET /quran/juz/:id
GET /quran/search
GET /quran/translations
GET /quran/tafsir
GET /quran/reciters
```

## Reading

Support:

* Mushaf mode
* verse mode
* translation mode
* split Arabic/translation
* word-by-word
* continuous scrolling

---

# 11. Quran Audio

Audio assets live in:

```text
R2 / S3
```

Structure:

```text
/audio/
    /reciters/
        /reciter-id/
            /001/
            /002/
            ...
```

Use CDN delivery.

Features:

* streaming
* offline downloads
* background playback
* playback speed
* repeat ayah
* repeat range
* auto-next
* sleep timer

---

# 12. Quran Personalization

Database:

```text
bookmarks
collections
notes
reading_history
reading_progress
khatm_plans
```

Features:

* bookmark ayah
* color/tag bookmark
* notes
* collections
* last-read position
* daily target
* Khatm target
* progress tracking

---

# 13. Prayer Service

Prayer calculations should primarily execute locally.

Inputs:

```text
latitude
longitude
date
timezone
calculation_method
madhhab
high_latitude_rule
manual_adjustments
```

Output:

```text
Fajr
Sunrise
Dhuhr
Asr
Sunset
Maghrib
Isha
Midnight
Last Third
```

Backend stores preferences and location when synchronization is enabled.

Do not require the backend for normal prayer calculations.

---

# 14. Prayer Notifications

Pipeline:

```text
Prayer Calculation
       ↓
Local Scheduler
       ↓
Device Notification
```

Backend notifications are used for:

* remote reminders
* configuration synchronization
* account-level events

Prayer notifications should continue working offline.

---

# 15. Qibla Service

Client-side calculation.

Inputs:

```text
latitude
longitude
device orientation
magnetometer
```

Features:

* compass
* Qibla bearing
* distance to Kaaba
* AR mode
* calibration
* offline support

No backend request required for basic Qibla.

---

# 16. Duas Service

Database:

```text
duas
dua_categories
dua_sources
dua_translations
dua_audio
```

Every dua must have provenance.

Example:

```text
Dua
 ├── Arabic
 ├── Transliteration
 ├── Translation
 ├── Source
 ├── Category
 └── Audio
```

No anonymous/generated religious text should enter the canonical database.

---

# 17. Adhkar Service

Collections:

```text
morning
evening
sleep
waking
after_prayer
travel
food
home
protection
ramadan
hajj
umrah
```

Support:

* ordered sessions
* completion
* repeat count
* audio
* sources
* offline access

---

# 18. Dhikr Service

Client-first.

Features:

* counter
* custom dhikr
* target count
* vibration
* haptic feedback
* session history

Do not require network connectivity.

---

# 19. Hadith Service

Database structure:

```text
collections
books
chapters
hadith
hadith_translations
hadith_grades
hadith_sources
```

API:

```text
GET /hadith/collections
GET /hadith/:collection
GET /hadith/:id
GET /hadith/search
```

Search:

* Arabic
* translation
* collection
* book
* chapter
* narrator where available

Every result displays its source.

---

# 20. Islamic Calendar

Client-side date calculations where possible.

Features:

* Hijri date
* Gregorian date
* Islamic months
* important dates
* fasting days
* Ramadan
* Dhul Hijjah
* Ashura
* Arafah

Backend provides:

* synchronized calendar data
* configurable regional observations
* user reminders

---

# 21. Ramadan Mode

Automatically activate during Ramadan.

Dashboard:

```text
Ramadan Day X

Fajr
Suhoor
Iftar

Quran
████████░░ 80%

Dhikr
██████░░░░

Daily Duas
✓
```

Features:

* fasting tracker
* Quran target
* Khatm
* Taraweeh
* daily duas
* adhkar
* Laylat al-Qadr tools
* charity tracking

---

# 22. Zakat Service

Inputs:

```text
cash
gold
silver
investments
business_assets
receivables
debts
```

Output:

* nisab
* zakatable wealth
* estimated zakat

Show methodology and assumptions clearly.

This is a calculator, not a substitute for qualified scholarly advice.

---

# 23. Mosque Service

Features:

* nearby mosques
* map
* prayer times
* Jumu'ah
* Taraweeh
* facilities
* user reports

Architecture:

```text
Location
   ↓
Mosque Search
   ↓
Geospatial Index
   ↓
Results
```

Use external map/geospatial providers where appropriate.

---

# 24. Search Service

Unified search:

```text
Quran
Hadith
Duas
Adhkar
Tafsir
Islamic Library
```

Search pipeline:

```text
Query
 ↓
Normalization
 ↓
Keyword Search
 ↓
Semantic Search
 ↓
Ranking
 ↓
Source Filtering
 ↓
Results
```

For initial version, use database full-text search.

Introduce vector search only when required.

---

# 25. Islamic Knowledge Library

Content types:

```text
Quran
Tafsir
Hadith
Seerah
Fiqh
Aqeedah
History
Duas
Adhkar
```

Every document requires:

```text
title
author
source
edition
language
publication
license
version
```

Content must be versioned.

---

# 26. Islamic AI

AI is NOT part of the canonical religious database.

Architecture:

```text
User Question
      ↓
Query Classification
      ↓
Retrieval
      ↓
Source Filtering
      ↓
Context Construction
      ↓
LLM
      ↓
Citation Validation
      ↓
Response
```

The AI should answer:

> "According to these sources..."

rather than:

> "Islam says..."

when evidence is uncertain.

Responses should provide:

* Quran references
* Hadith references
* Tafsir references
* scholarly sources
* confidence/context
* direct source navigation

No fabricated citations.

---

# 27. AI Infrastructure

Initial:

* external LLM API
* Cloudflare Worker orchestration
* RAG backend

Later:

AWS:

* Bedrock
* ECS
* GPU infrastructure
* dedicated embedding workers

AI should be isolated from the core API.

---

# 28. Database

## Initial

Cloudflare D1 for:

* users
* preferences
* Quran metadata
* Hadith metadata
* bookmarks
* history
* settings

## Scaled

PostgreSQL:

* AWS RDS
* or another managed PostgreSQL provider

Potential extensions:

* pgvector
* full-text search
* geospatial capabilities

Database access must occur through a repository/data-access layer so migration does not require rewriting services.

---

# 29. Object Storage

Primary:

```text
Cloudflare R2
```

Store:

* Quran audio
* Hadith audio
* Dua audio
* images
* static Islamic resources
* downloadable datasets

Alternative:

```text
AWS S3
```

Use CDN delivery.

Never serve large audio files directly through application workers.

---

# 30. Caching

Cloudflare KV:

* configuration
* popular Quran data
* metadata
* feature flags
* temporary cached responses

Durable Objects:

* real-time synchronization
* rate limiting where appropriate
* stateful coordination

Redis can be introduced later if PostgreSQL/AWS infrastructure requires it.

---

# 31. Async Processing

Cloudflare Queues:

```text
notification_jobs
audio_jobs
search_index_jobs
content_processing
analytics_jobs
sync_jobs
```

Workers consume queues.

Heavy workloads move to AWS workers when necessary.

---

# 32. Notifications

Mobile:

* Expo Notifications
* Firebase Cloud Messaging
* Apple Push Notification Service

Notification categories:

* prayer
* adhan
* Quran reminder
* dhikr
* fasting
* Ramadan
* personal reminders

Prayer alerts should remain functional offline.

---

# 33. Offline Architecture

HUDA should be usable without internet.

Offline:

* Quran
* translations
* downloaded audio
* duas
* adhkar
* hadith dataset
* prayer calculations
* Qibla
* Hijri calendar

Mobile storage:

```text
SQLite
```

Synchronization:

```text
Local
  ↓
Sync Queue
  ↓
API
  ↓
Server
```

Conflict resolution must be deterministic.

---

# 34. Sync Engine

Synchronize:

* bookmarks
* notes
* collections
* reading progress
* Khatm
* settings
* dhikr history

Use:

```text
updated_at
version
device_id
operation_id
```

Every mutation should be idempotent.

---

# 35. API

Use REST initially.

```text
/api/v1
```

Structure:

```text
/auth
/users
/quran
/audio
/hadith
/duas
/adhkar
/prayer
/qibla
/calendar
/mosques
/zakat
/search
/library
/sync
/notifications
/ai
```

Use OpenAPI for documentation.

Generate shared TypeScript API types.

---

# 36. Security

Cloudflare:

* WAF
* DDoS protection
* Turnstile
* rate limiting
* bot protection

Application:

* HTTPS
* secure sessions
* encrypted sensitive data
* strict CORS
* input validation
* request size limits
* rate limiting
* audit logging

Never expose:

* API keys
* database credentials
* service credentials
* LLM keys

to clients.

---

# 37. Privacy

Default:

```text
Anonymous
Local
Offline
```

Only collect what is required.

Optional account sync.

User controls:

* export data
* delete account
* clear history
* disable analytics
* disable personalization
* disable cloud sync

No selling religious or behavioral data.

No advertising SDKs.

---

# 38. Analytics

Avoid invasive analytics.

Track only aggregate product metrics such as:

* crashes
* performance
* feature usage
* retention
* API health

Do not log:

* Quran searches
* private notes
* religious questions
* personal worship data

unless explicitly required and consented to.

---

# 39. Admin Dashboard

Separate application:

```text
apps/admin
```

Features:

* content management
* Quran data management
* Hadith management
* Dua management
* translations
* source verification
* version management
* moderation
* user support
* system health
* analytics
* feature flags

Admin access:

* MFA
* role-based permissions
* audit logs

---

# 40. Content Pipeline

Canonical content follows:

```text
Source
 ↓
Import
 ↓
Validation
 ↓
Metadata
 ↓
Review
 ↓
Version
 ↓
Publish
 ↓
CDN
```

Never allow arbitrary AI-generated religious content to automatically become canonical content.

---

# 41. Observability

Use:

* structured logs
* metrics
* tracing
* error tracking
* uptime monitoring

Monitor:

```text
API latency
error rate
database latency
worker failures
queue depth
storage usage
notification failures
AI failures
```

Never log sensitive religious/user content unnecessarily.

---

# 42. Testing

## Frontend

* unit tests
* component tests
* accessibility tests
* E2E tests

## Backend

* unit tests
* integration tests
* API tests
* authentication tests
* authorization tests
* rate-limit tests

## Religious data

Automated validation:

* Surah count
* Ayah count
* ordering
* Arabic integrity
* translation mapping
* metadata integrity
* duplicate detection
* source presence

---

# 43. CI/CD

GitHub Actions.

Pipeline:

```text
Pull Request
 ↓
Lint
 ↓
Typecheck
 ↓
Unit Tests
 ↓
Integration Tests
 ↓
Build
 ↓
Security Scan
 ↓
Preview Deployment
 ↓
Production
```

Separate environments:

```text
development
staging
production
```

---

# 44. Deployment Strategy

## Phase 1 — Cloudflare

Deploy:

```text
Next.js
      ↓
Cloudflare
      ↓
Workers
      ↓
D1
      ↓
R2
      ↓
Queues
      ↓
KV
```

This keeps initial infrastructure extremely cheap.

---

# 45. AWS Escape Hatch

Move workloads to AWS when Cloudflare limits become relevant.

Potential architecture:

```text
Cloudflare
   │
   ├── CDN
   ├── DNS
   ├── WAF
   └── Edge
        │
        ▼
      AWS
        │
        ├── ECS
        ├── Lambda
        ├── RDS
        ├── S3
        ├── SQS
        └── Bedrock
```

Cloudflare remains the edge layer.

AWS becomes the compute/data layer.

---

# 46. Cost Strategy

Initial objective:

> **Spend almost nothing until real usage exists.**

Prioritize:

1. Cloudflare free/low-cost infrastructure
2. Existing AWS free credits
3. CDN caching
4. Offline clients
5. Static data
6. Serverless workloads
7. Queue-based processing

Avoid unnecessarily deploying:

* Kubernetes
* permanent EC2 servers
* GPU machines
* Redis clusters
* multiple databases
* microservices that don't need to exist yet

---

# 47. Service Boundaries

Start as a modular monolith.

```text
API
├── auth
├── quran
├── prayer
├── hadith
├── duas
├── calendar
├── users
├── sync
└── search
```

Split into independent services only when:

* scaling differs
* deployment differs
* resource requirements differ
* ownership differs
* failure isolation matters

AI and heavy processing should be isolated first.

---

# 48. Performance Targets

Target:

```text
Initial page load < 2 seconds
API p95 < 300ms
Cached API p95 < 100ms
Quran navigation < 100ms locally
Prayer calculation < 50ms
Qibla calculation < 50ms
```

Mobile:

* instant cached home screen
* offline Quran
* minimal network dependency
* aggressive audio caching

---

# 49. Accessibility

Support:

* large Arabic text
* adjustable fonts
* screen readers
* high contrast
* reduced motion
* RTL
* keyboard navigation
* dyslexia-friendly translation options where appropriate

Arabic rendering must be tested across Android, iOS, Windows, macOS and major browsers.

---

# 50. Localization

Initial:

* English
* Arabic
* Urdu

Architecture must support additional languages without rewriting UI.

All UI strings externalized.

RTL supported from day one.

---

# 51. Design System

Brand:

# HUDA

Arabic:

# هُدًى

Visual direction:

* minimal
* warm
* calm
* premium
* Islamic without excessive ornamentation

Avoid:

* generic green mosque imagery
* excessive gold
* neon gradients
* cluttered dashboards
* advertisement-like cards

Typography should prioritize Quranic Arabic readability.

---

# 52. Home Screen

Primary hierarchy:

```text
Good evening

Hijri Date

Next Prayer
     ASR
   01:42:17

Today's Quran
     24 / 30 pages

Continue Reading

Daily Ayah

Duas & Adhkar

Quick Actions
```

The home screen should feel like a peaceful dashboard, not a social feed.

---

# 53. Bottom Navigation

```text
Home
Quran
Prayer
Explore
Profile
```

Explore contains:

```text
Hadith
Duas
Adhkar
Dhikr
Calendar
Zakat
Mosques
Hajj
Umrah
Library
AI
```

---

# 54. Monetization

Core religious functionality remains free.

No ads.

Potential revenue:

* optional supporter subscription
* lifetime supporter purchase
* donations
* institutional partnerships
* premium cloud features
* premium AI usage

Never paywall:

* Quran
* prayer
* Qibla
* essential duas
* essential Islamic content

---

# 55. Development Phases

## Phase 0 — Foundation

* monorepo
* design system
* CI/CD
* authentication architecture
* database layer
* API conventions
* Cloudflare setup
* environments

## Phase 1 — Quran

* Quran database
* reader
* translations
* search
* bookmarks
* audio
* offline mode

## Phase 2 — Prayer

* location
* calculation engine
* prayer UI
* notifications
* settings
* Qibla

## Phase 3 — Islamic Content

* Duas
* Adhkar
* Hadith
* Calendar
* Dhikr

## Phase 4 — Accounts & Sync

* authentication
* profiles
* bookmarks sync
* reading sync
* notes
* settings sync

## Phase 5 — Mobile

* React Native
* offline database
* notifications
* widgets
* background audio

## Phase 6 — Discovery

* search
* library
* mosque finder
* Zakat
* Ramadan
* Hajj
* Umrah

## Phase 7 — Intelligence

* Islamic RAG
* citations
* source retrieval
* AI study assistant
* Hifz assistance
* recitation analysis

## Phase 8 — Scale

* performance optimization
* AWS migration where necessary
* CDN optimization
* database scaling
* observability
* disaster recovery

---

# 56. Definition of Done — V1

HUDA V1 is ready when a user can:

* open HUDA without an account
* read the entire Quran
* listen to recitations
* download Quran content
* search Quran
* bookmark verses
* track reading
* see accurate prayer times
* receive prayer notifications
* find Qibla
* browse duas
* browse adhkar
* read hadith
* view Hijri date
* use the app offline
* create an account
* synchronize personal data
* use HUDA without seeing a single advertisement

---

# 57. North Star

HUDA should eventually become:

> **The operating system for a Muslim's daily spiritual life.**

Not another Quran reader.

Not another prayer-time application.

Not an advertising platform.

One unified, beautiful, trustworthy place for:

**Quran → Prayer → Dhikr → Knowledge → Worship → Learning → Life.**

---

# 58. First Build

Start with:

```text
Next.js
React
TypeScript
Tailwind
shadcn/ui

React Native
Expo

Cloudflare Workers
Cloudflare D1
Cloudflare R2
Cloudflare KV
Cloudflare Queues

SQLite
Drizzle ORM

GitHub Actions
```

Keep the architecture provider-agnostic.

Use AWS credits selectively for workloads that genuinely benefit from AWS infrastructure.

The first milestone is not "build every feature."

The first milestone is:

> **A beautiful HUDA shell + production-grade Quran experience + prayer engine + offline foundation.**
