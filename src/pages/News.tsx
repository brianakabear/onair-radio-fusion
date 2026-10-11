import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FallbackBlogImage } from "@/components/FallbackBlogImage";
import { useNewsStories } from "@/hooks/useNewsStories";

const News = () => {
  const { data: allNewsStories = [] } = useNewsStories();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [radius, setRadius] = useState("25");
  const [localNews, setLocalNews] = useState<any[]>([]);
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  
  const itemsPerPage = 25;

  // Filter news posts by category
  const newsCategories = [
    "Jamaica News",
    "Caribbean News", 
    "International News",
    "Entertainment News",
    "Sports News"
  ];

  // Filter stories by selected category
  const filteredStories = selectedCategory 
    ? allNewsStories.filter(story => story.category === selectedCategory)
    : allNewsStories;

  // Calculate pagination
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStories = filteredStories.slice(startIndex, endIndex);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Jamaica News": return "bg-accent text-accent-foreground";
      case "Caribbean News": return "bg-primary text-primary-foreground";
      case "International News": return "bg-secondary text-secondary-foreground";
      case "Entertainment News": return "bg-muted text-muted-foreground";
      case "Sports News": return "bg-destructive text-destructive-foreground";
      default: return "bg-border text-foreground";
    }
  };

  const handleLocalNewsSearch = async () => {
    if (!zipCode.trim()) {
      return;
    }

    setIsLoadingLocal(true);
    
    // Simulate API call for local news
    // In a real implementation, this would call a news API with geolocation
    setTimeout(() => {
      const mockLocalNews = [
        {
          id: "local-1",
          title: `Local Community Center Hosts Music Workshop in ${zipCode}`,
          excerpt: "Community music program brings together local artists and aspiring musicians for collaborative learning experience.",
          category: "Local News",
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          readTime: "3 min read",
          source: "Local News Network",
          distance: `${Math.floor(Math.random() * parseInt(radius)) + 1} miles away`
        },
        {
          id: "local-2", 
          title: `${zipCode} Area High School Jazz Band Wins Regional Competition`,
          excerpt: "Local students showcase exceptional musical talent in statewide competition, earning recognition for their innovative performances.",
          category: "Local News",
          date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          readTime: "4 min read",
          source: "Education Weekly",
          distance: `${Math.floor(Math.random() * parseInt(radius)) + 5} miles away`
        }
      ];
      
      setLocalNews(mockLocalNews);
      setIsLoadingLocal(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-14 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">Fresh from the desk</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-10">News</h1>
          <Tabs defaultValue="all-news" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all-news">All News</TabsTrigger>
              <TabsTrigger value="local-news">Local News</TabsTrigger>
            </TabsList>

            <TabsContent value="all-news">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allNewsStories.map((story) => (
                  <Link key={story.id} to={`/news/${story.id}`} className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      {story.image ? (
                        <img src={story.image} alt={story.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <FallbackBlogImage category={story.category} title={story.title} id={story.id} excerpt={story.excerpt} />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {story.category}
                      </div>
                      <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-primary transition-colors">{story.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5">{story.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{story.source} · {story.date}</span>
                        <span className="font-semibold">Keep reading →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="local-news" className="mt-8">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Local News</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Find news stories specific to your area. Enter your zip code to discover what's happening in your community.
                  </p>
                </div>

                {/* Local News Search */}
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-center">Search Local News</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipcode">Zip Code</Label>
                      <Input
                        id="zipcode"
                        type="text"
                        placeholder="Enter your zip code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="text-center"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="radius">Search Radius</Label>
                      <Select value={radius} onValueChange={setRadius}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 miles</SelectItem>
                          <SelectItem value="25">25 miles</SelectItem>
                          <SelectItem value="50">50 miles</SelectItem>
                          <SelectItem value="100">100 miles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleLocalNewsSearch} 
                      className="w-full"
                      disabled={!zipCode.trim() || isLoadingLocal}
                    >
                      {isLoadingLocal ? (
                        <>
                          <Search className="h-4 w-4 mr-2 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Search Local News
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Local News Results */}
                {localNews.length > 0 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        Local News in {zipCode}
                      </h3>
                      <p className="text-muted-foreground">
                        Found {localNews.length} stories within {radius} miles
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {localNews.map((story) => (
                        <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                            <div className="text-center">
                              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                              <Badge variant="outline" className="text-xs">
                                {story.distance}
                              </Badge>
                            </div>
                          </div>
                          <div className="p-2">
                            <h3 className="font-semibold text-[10px] line-clamp-2 mb-1">
                              {story.title}
                            </h3>
                            <div className="flex items-center text-[9px] text-muted-foreground mb-2">
                              <Calendar className="h-2.5 w-2.5 mr-1" />
                              {new Date().toLocaleDateString()}
                            </div>
                            <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                              <Link to={`/news/${story.id}`} state={{ story }}>
                                Read Now
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {localNews.length === 0 && zipCode && !isLoadingLocal && (
                  <Card className="p-8 text-center max-w-2xl mx-auto">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Local News Found</h3>
                    <p className="text-muted-foreground">
                      We couldn't find any local news stories for {zipCode} within {radius} miles. 
                      Try expanding your search radius or check back later.
                    </p>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default News;