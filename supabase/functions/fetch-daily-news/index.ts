import { createClient } from "npm:@supabase/supabase-js@2";

const FEEDS = [
  { url: "https://www.dancehallmag.com/feed", source: "DancehallMag", category: "Entertainment News" },
  { url: "https://www.jamaicaobserver.com/category/entertainment/feed/", source: "Jamaica Observer", category: "Jamaica News" },
];
const DAILY_LIMIT = 6;
const UA = "Mozilla/5.0 (compatible; MajesticFyahRadio/1.0)";

const decode = (s: string) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ").trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? m[1] : "";
};

type Item = { title: string; link: string; excerpt: string; image: string | null; date: Date; source: string; category: string };

async function readFeed(f: typeof FEEDS[number]): Promise<Item[]> {
  try {
    const res = await fetch(f.url, { headers: { "User-Agent": UA } });
    if (!res.ok) return [];
    const xml = await res.text();
    return xml.split("<item>").slice(1).map((raw) => {
      const media = raw.match(/<media:content[^>]+url="([^"]+)"/)?.[1] ??
        raw.match(/<enclosure[^>]+url="([^"]+)"/)?.[1] ??
        tag(raw, "content:encoded").match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null;
      let excerpt = decode(tag(raw, "description")).replace(/The post .* appeared first on .*$/, "").trim();
      if (excerpt.length > 260) excerpt = excerpt.slice(0, 257).replace(/\s+\S*$/, "") + "…";
      return {
        title: decode(tag(raw, "title")),
        link: decode(tag(raw, "link")),
        excerpt,
        image: media,
        date: new Date(decode(tag(raw, "pubDate")) || Date.now()),
        source: f.source,
        category: f.category,
      };
    }).filter((i) => i.title && i.link);
  } catch {
    return [];
  }
}

async function ogImage(url: string): Promise<string | null> {
  try {
    const html = await (await fetch(url, { headers: { "User-Agent": UA } })).text();
    return html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i)?.[1] ?? null;
  } catch {
    return null;
  }
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);

Deno.serve(async () => {
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // Only one batch per day, even if triggered more than once.
  const since = new Date(); since.setUTCHours(0, 0, 0, 0);
  const { count: todayCount } = await db.from("news_stories").select("id", { count: "exact", head: true })
    .not("source_url", "is", null).gte("created_at", since.toISOString());
  const remaining = DAILY_LIMIT - (todayCount ?? 0);
  if (remaining <= 0) return Response.json({ added: 0, reason: "daily limit reached" });

  const feeds = await Promise.all(FEEDS.map(readFeed));
  const all = feeds.flat();
  const { data: existing } = await db.from("news_stories").select("source_url,title")
    .in("source_url", all.map((i) => i.link));
  const { data: recentTitles } = await db.from("news_stories").select("title").order("published_at", { ascending: false }).limit(300);
  const seen = new Set([...(existing ?? []).map((e) => e.source_url), ...(recentTitles ?? []).map((t) => t.title.toLowerCase())]);

  // Alternate between sources, newest first.
  const queues = feeds.map((f) => f.filter((i) => !seen.has(i.link) && !seen.has(i.title.toLowerCase())).sort((a, b) => +b.date - +a.date));
  const picked: Item[] = [];
  while (picked.length < remaining && queues.some((q) => q.length)) {
    for (const q of queues) if (q.length && picked.length < remaining) picked.push(q.shift()!);
  }

  const usedImages = new Set<string>();
  const rows = [];
  for (const i of picked) {
    let image = i.image ?? (await ogImage(i.link));
    if (image && usedImages.has(image)) image = null;
    if (image) usedImages.add(image);
    rows.push({
      id: `${slug(i.title)}-${crypto.randomUUID().slice(0, 6)}`,
      title: i.title, excerpt: i.excerpt, category: i.category, source: i.source,
      source_url: i.link, image, published_at: new Date().toISOString(),
    });
  }
  if (rows.length) {
    const { error } = await db.from("news_stories").upsert(rows, { onConflict: "source_url", ignoreDuplicates: true });
    if (error) return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ added: rows.length, titles: rows.map((r) => r.title) });
});
