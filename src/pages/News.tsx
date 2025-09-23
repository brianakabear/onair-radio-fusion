import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ArrowRight, MapPin, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FallbackBlogImage } from "@/components/FallbackBlogImage";

const News = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [zipCode, setZipCode] = useState("");
  const [radius, setRadius] = useState("25");
  const [localNews, setLocalNews] = useState<any[]>([]);
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);

  // Load blog posts from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('linkup-blog-posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      setBlogPosts(parsedPosts);
    }
  }, []);

  // Filter news posts by category
  const newsCategories = [
    "Jamaica News",
    "Caribbean News", 
    "International News",
    "Entertainment News",
    "Sports News"
  ];

  const newsPosts = blogPosts.filter(post => 
    newsCategories.includes(post.category)
  );

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
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-caribbean">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">News Center</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Stay informed with the latest news from Jamaica, the Caribbean, and around the world
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all-news" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all-news">All News</TabsTrigger>
              <TabsTrigger value="local-news">Local News</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-news" className="mt-8">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar with categories */}
                <aside className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">News Categories</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {newsCategories.map((category) => {
                        const count = blogPosts.filter(p => p.category === category).length;
                        return (
                          <Button
                            key={category}
                            variant="ghost"
                            className="w-full justify-between hover:bg-primary/10"
                          >
                            <span className="text-sm">{category.replace(" News", "")}</span>
                            <Badge variant="secondary" className="text-xs">
                              {count}
                            </Badge>
                          </Button>
                        );
                      })}
                    </CardContent>
                  </Card>
                </aside>

                {/* Main News Content */}
                <main className="lg:col-span-3">
                  {newsPosts.length === 0 ? (
                    <Card className="p-8 text-center">
                      <h3 className="text-lg font-semibold mb-2">No News Available</h3>
                      <p className="text-muted-foreground">Check back later for the latest news updates.</p>
                    </Card>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {newsPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-caribbean transition-all duration-300">
                          <div className="relative h-48">
                            {post.image && post.image.trim() !== '' ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (fallbackDiv) {
                                    fallbackDiv.style.display = 'block';
                                  }
                                }}
                              />
                            ) : null}
                            
                            <div 
                              style={{ display: (post.image && post.image.trim() !== '') ? 'none' : 'block' }}
                              className="absolute inset-0"
                            >
                              <FallbackBlogImage 
                                title={post.title}
                                category={post.category}
                                className="w-full h-full"
                              />
                            </div>
                            <Badge 
                              className={`absolute top-3 left-3 text-xs ${getCategoryColor(post.category)}`}
                            >
                              {post.category.replace(" News", "")}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
                              <Link to={`/blog/${post.id}`}>
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground mb-3">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{post.date}</span>
                              <Clock className="h-3 w-3 ml-3 mr-1" />
                              <span>{post.readTime}</span>
                            </div>
                            {post.source && (
                              <p className="text-xs text-muted-foreground mb-3 italic">
                                Source: {post.source}
                              </p>
                            )}
                            <div className="flex justify-end">
                              <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                                <Link to={`/blog/${post.id}`}>
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </main>
              </div>
            </TabsContent>
            
            <TabsContent value="local-news" className="mt-8">
              <div className="max-w-4xl mx-auto">
                {/* Local News Search Controls */}
                <Card className="mb-8">
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Local News Settings
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enter your zip code to find news and events in your area
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipcode">Zip Code</Label>
                        <Input
                          id="zipcode"
                          placeholder="Enter zip code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          maxLength={5}
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
                      <div className="flex items-end">
                        <Button 
                          onClick={handleLocalNewsSearch}
                          disabled={!zipCode.trim() || isLoadingLocal}
                          className="w-full"
                        >
                          {isLoadingLocal ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                          ) : (
                            <Search className="h-4 w-4 mr-2" />
                          )}
                          Search Local News
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Local News Results */}
                {localNews.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                      Local News near {zipCode} (within {radius} miles)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {localNews.map((article) => (
                        <Card key={article.id} className="hover:shadow-caribbean transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <Badge variant="outline" className="text-xs">
                                Local News
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {article.distance}
                              </span>
                            </div>
                            <h4 className="font-semibold mb-2 hover:text-primary transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{article.date}</span>
                                <Clock className="h-3 w-3 ml-3 mr-1" />
                                <span>{article.readTime}</span>
                              </div>
                              <span className="italic">{article.source}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Default Local News Message */}
                {localNews.length === 0 && !isLoadingLocal && (
                  <Card className="text-center p-8">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Find Local News</h3>
                    <p className="text-muted-foreground mb-4">
                      Enter your zip code above to discover news and events happening in your area.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Stay connected with your local community and discover what's happening within {radius} miles of you.
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