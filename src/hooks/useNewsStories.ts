import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { allNewsStories, type NewsStory } from "@/data/newsStories";

export type StoredNewsStory = NewsStory & { sourceUrl?: string };

// News lives in the database; the bundled list is only a fallback if it can't be reached.
export const useNewsStories = () =>
  useQuery({
    queryKey: ["news-stories"],
    queryFn: async (): Promise<StoredNewsStory[]> => {
      const { data, error } = await supabase
        .from("news_stories")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data ?? []).map((r) => {
        const d = new Date(r.published_at);
        return {
          id: r.id,
          title: r.title,
          excerpt: r.excerpt,
          category: r.category,
          source: r.source,
          image: r.image ?? undefined,
          sourceUrl: r.source_url ?? undefined,
          date: d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          readTime: "3 min read",
          dateTimestamp: d.getTime(),
        };
      });
    },
    placeholderData: allNewsStories,
    staleTime: 5 * 60 * 1000,
  });
