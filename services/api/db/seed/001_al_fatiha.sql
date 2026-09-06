-- Development fixture: Surah Al-Fatiha (the only surah seeded so far).
-- Not canonical content — production data must go through the Content
-- Pipeline (PLAN.md #40) with proper source attribution before publishing.

INSERT INTO surahs (id, name_arabic, name_transliteration, name_translation, revelation_place, ayah_count, order_in_revelation)
VALUES (1, 'الفاتحة', 'Al-Fatiha', 'The Opening', 'meccan', 7, 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO ayahs (id, surah_id, ayah_number, text_arabic, text_transliteration, juz, hizb, rub, page, sajdah)
VALUES
    (1, 1, 1, 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'Bismillahi r-rahmani r-rahim', 1, 1, 1, 1, NULL),
    (2, 1, 2, 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 'Alhamdu lillahi rabbi l-alamin', 1, 1, 1, 1, NULL),
    (3, 1, 3, 'الرَّحْمَٰنِ الرَّحِيمِ', 'Ar-rahmani r-rahim', 1, 1, 1, 1, NULL),
    (4, 1, 4, 'مَالِكِ يَوْمِ الدِّينِ', 'Maliki yawmi d-din', 1, 1, 1, 1, NULL),
    (5, 1, 5, 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', 'Iyyaka na''budu wa iyyaka nasta''in', 1, 1, 1, 1, NULL),
    (6, 1, 6, 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', 'Ihdina s-sirata l-mustaqim', 1, 1, 1, 1, NULL),
    (7, 1, 7, 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', 'Sirata alladhina an''amta alayhim ghayril maghdubi alayhim wa la d-dallin', 1, 1, 1, 1, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO translations (id, language, name, translator, source)
VALUES ('seed-en-dev', 'en', 'Seed Translation (dev fixture)', NULL, 'Development fixture only — replace via Content Pipeline (PLAN.md #40) before production')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ayah_translations (id, ayah_id, translation_id, text)
VALUES
    ('seed-en-dev-1', 1, 'seed-en-dev', 'In the name of Allah, the Most Gracious, the Most Merciful.'),
    ('seed-en-dev-2', 2, 'seed-en-dev', 'All praise is due to Allah, Lord of all the worlds.'),
    ('seed-en-dev-3', 3, 'seed-en-dev', 'The Most Gracious, the Most Merciful.'),
    ('seed-en-dev-4', 4, 'seed-en-dev', 'Master of the Day of Judgment.'),
    ('seed-en-dev-5', 5, 'seed-en-dev', 'You alone we worship, and You alone we ask for help.'),
    ('seed-en-dev-6', 6, 'seed-en-dev', 'Guide us to the straight path.'),
    ('seed-en-dev-7', 7, 'seed-en-dev', 'The path of those You have blessed, not of those who have earned Your anger, nor of those who have gone astray.')
ON CONFLICT (id) DO NOTHING;
