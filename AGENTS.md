# AGENTS
- News stories live in the `news_stories` table; the `fetch-daily-news` function adds 6 per day from source feeds via a daily scheduled job. Why: stories must persist and grow automatically; the bundled list is only a fallback.
