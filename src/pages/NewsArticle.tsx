import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { FallbackBlogImage } from "@/components/FallbackBlogImage";
import ShareButtons from "@/components/ShareButtons";
import { allNewsStories, type NewsStory } from "@/data/newsStories";

const SOURCE_URLS: Record<string, string> = {
  "Jamaica Gleaner": "https://jamaica-gleaner.com",
  "Jamaica Observer": "https://www.jamaicaobserver.com",
  "Jamaica Star": "https://www.jamaicastar.com",
  "The Sunday Herald": "https://www.sundayherald.com",
  "CNN": "https://www.cnn.com",
  "CNN.com": "https://www.cnn.com",
  "BBC News": "https://www.bbc.com/news",
  "Reuters": "https://www.reuters.com",
  "The New York Times": "https://www.nytimes.com",
  "The Daily News": "https://www.nydailynews.com",
  "Daily News": "https://www.nydailynews.com",
  "DancehallMag": "https://www.dancehallmag.com",
  "EIN Presswire": "https://www.einpresswire.com"
};

const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [story, setStory] = useState<NewsStory | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const passedStory = (location.state as { story?: NewsStory } | null)?.story ?? null;
    const foundStory = passedStory ?? allNewsStories.find(s => s.id === id) ?? null;
    setStory(foundStory);
    setChecked(true);
  }, [id, location.state]);

  const relatedStories = story
    ? allNewsStories
        .filter(s => s.category === story.category && s.id !== story.id)
        .slice(0, 4)
    : [];

  const sourceUrl = story ? SOURCE_URLS[story.source] : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Button variant="outline" size="sm" asChild className="mb-8">
          <Link to="/news" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News</span>
          </Link>
        </Button>

        {!checked ? (
          <p className="text-muted-foreground">Loading story...</p>
        ) : !story ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-10 text-center">
              <h1 className="text-2xl font-bold mb-3 text-foreground">Story not available</h1>
              <p className="text-muted-foreground mb-6">
                We couldn't find that story. Browse the latest headlines on the News page.
              </p>
              <Button asChild>
                <Link to="/news">Go to News</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <article className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              {story.category.replace(" News", "")}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
              {story.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {story.date}
              </span>
              <span>Source: {story.source}</span>
            </div>

            <div className="mb-8">
              <ShareButtons title={story.title} slug={story.id} />
            </div>

            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 bg-gradient-to-br from-primary/10 to-accent/10">
              {story.image && story.image.trim() !== "" ? (
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className={`${story.image && story.image.trim() !== "" ? "hidden" : "flex"} w-full h-full items-center justify-center`}
              >
                <FallbackBlogImage
                  category={story.category}
                  title={story.title}
                  id={story.id}
                  excerpt={story.excerpt}
                />
              </div>
            </div>

            <p className="text-lg leading-relaxed text-foreground mb-6">{story.excerpt}</p>

            {sourceUrl ? (
              <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <span>Read more at {story.source}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Reporting from {story.source}.</p>
            )}

            {relatedStories.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6 text-foreground">More {story.category.replace(" News", "")} stories</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedStories.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent/10">
                        {item.image && item.image.trim() !== "" ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`${item.image && item.image.trim() !== "" ? "hidden" : "flex"} w-full h-full items-center justify-center`}
                        >
                          <FallbackBlogImage
                            category={item.category}
                            title={item.title}
                            id={item.id}
                            excerpt={item.excerpt}
                          />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                          <Link to={`/news/${item.id}`}>{item.title}</Link>
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.date}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </article>
        )}
      </main>
    </div>
  );
};

export default NewsArticle;
