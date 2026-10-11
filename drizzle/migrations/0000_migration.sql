CREATE TABLE public.news_stories (
  id text PRIMARY KEY,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Entertainment News',
  source text NOT NULL,
  source_url text UNIQUE,
  image text,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news_stories TO anon, authenticated;
GRANT ALL ON public.news_stories TO service_role;
ALTER TABLE public.news_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read news" ON public.news_stories FOR SELECT USING (true);
CREATE INDEX news_stories_published_idx ON public.news_stories (published_at DESC);
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;