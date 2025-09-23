import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ArrowRight, MapPin, Search, Settings, ChevronLeft, ChevronRight, Play, Pause, Volume2, SkipForward } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FallbackBlogImage } from "@/components/FallbackBlogImage";
import { allNewsStories, type NewsStory } from "@/data/newsStories";

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [radius, setRadius] = useState("25");
  const [localNews, setLocalNews] = useState<any[]>([]);
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoStory, setCurrentVideoStory] = useState(0);
  const [videoStories, setVideoStories] = useState<(NewsStory & { youtubeId: string })[]>([]);

  // Initialize video news stories with YouTube video IDs
  useEffect(() => {
    const videoNewsStories = [
      {
        id: "video-1",
        title: "Breaking: Major Hurricane Approaches Caribbean Islands",
        excerpt: "Emergency services prepare as Category 4 hurricane threatens multiple Caribbean nations with dangerous winds and flooding.",
        category: "Caribbean News",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: "2 min read",
        source: "Caribbean Weather Center",
        dateTimestamp: Date.now(),
        youtubeId: "jNQXAC9IVRw" // Sample nature/weather video
      },
      {
        id: "video-2", 
        title: "Jamaica's Prime Minister Announces Economic Recovery Plan",
        excerpt: "Comprehensive strategy unveiled to boost tourism, agriculture, and technology sectors following recent challenges.",
        category: "Jamaica News",
        date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: "5 min read",
        source: "Jamaica Information Service",
        dateTimestamp: Date.now() - 86400000,
        youtubeId: "dQw4w9WgXcQ" // Sample news-style video
      },
      {
        id: "video-3",
        title: "Bob Marley Museum Unveils New Interactive Experience",
        excerpt: "State-of-the-art technology brings reggae legend's story to life with immersive exhibits and rare archival footage.",
        category: "Entertainment News", 
        date: new Date(Date.now() - 172800000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: "3 min read",
        source: "Culture Jamaica",
        dateTimestamp: Date.now() - 172800000,
        youtubeId: "YQHsXMglC9A" // Sample music/culture video
      },
      {
        id: "video-4",
        title: "Caribbean Athletes Dominate World Championships",
        excerpt: "Track and field stars from across the region secure multiple gold medals in international competition.",
        category: "Sports News",
        date: new Date(Date.now() - 259200000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: "4 min read", 
        source: "Sports Caribbean",
        dateTimestamp: Date.now() - 259200000,
        youtubeId: "kffacxfA7G4" // Sample sports video
      },
      {
        id: "video-5",
        title: "Climate Summit: Small Island States Unite for Action",
        excerpt: "Caribbean nations lead global initiative demanding urgent climate action and support for vulnerable communities.",
        category: "International News",
        date: new Date(Date.now() - 345600000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: "6 min read",
        source: "International Climate News",
        dateTimestamp: Date.now() - 345600000,
        youtubeId: "oHg5SJYRHA0" // Sample documentary/news video
      },
      {
        id: "video-6",
        title: "Jamaican Dancehall Artist Breaks Streaming Records",
        excerpt: "Local musician's latest release becomes most-streamed Caribbean song globally within 24 hours.",
        category: "Entertainment News",
        date: new Date(Date.now() - 432000000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: "3 min read",
        source: "Music World",
        dateTimestamp: Date.now() - 432000000,
        youtubeId: "L_jWHffIx5E" // Sample music video
      }
    ];
    
    setVideoStories(videoNewsStories);
  }, []);

  // Auto-advance video stories (longer duration for YouTube videos)
  useEffect(() => {
    if (isPlaying && videoStories.length > 0) {
      const interval = setInterval(() => {
        setCurrentVideoStory(prev => (prev + 1) % videoStories.length);
      }, 45000); // Change story every 45 seconds
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, videoStories.length]);

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextVideoStory = () => {
    setCurrentVideoStory(prev => (prev + 1) % videoStories.length);
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

      {/* Video Player Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">News Video Player</h2>
            
            {videoStories.length > 0 && (
              <Card className="overflow-hidden bg-black">
                <div className="relative aspect-video">
                  {/* YouTube Video Embed */}
                  <iframe
                    key={videoStories[currentVideoStory]?.youtubeId}
                    src={`https://www.youtube.com/embed/${videoStories[currentVideoStory]?.youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Video Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 pointer-events-none">
                    <div className="text-white">
                      <Badge className="mb-3 bg-primary/90 text-primary-foreground pointer-events-auto">
                        {videoStories[currentVideoStory]?.category.replace(" News", "")}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                        {videoStories[currentVideoStory]?.title}
                      </h3>
                      <p className="text-white/90 mb-4 line-clamp-2">
                        {videoStories[currentVideoStory]?.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-white/80">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{videoStories[currentVideoStory]?.date}</span>
                        <span className="mr-4">•</span>
                        <span>{videoStories[currentVideoStory]?.source}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play/Pause Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handlePlayPause}
                      className="bg-black/50 hover:bg-black/70 text-white border-white/20 w-16 h-16 rounded-full"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8 ml-1" />
                      )}
                    </Button>
                  </div>
                  
                  {/* YouTube Attribution */}
                  <div className="absolute top-3 right-3 pointer-events-none">
                    <Badge variant="outline" className="bg-red-600 text-white border-red-600 text-xs">
                      YouTube
                    </Badge>
                  </div>
                </div>
                
                {/* Video Controls */}
                <CardContent className="bg-black/90 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="text-white hover:bg-white/10"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNextVideoStory}
                        className="text-white hover:bg-white/10"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <Volume2 className="h-4 w-4 text-white/60" />
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-white/80">
                      <span>{currentVideoStory + 1} / {videoStories.length}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Link to={`/blog/${videoStories[currentVideoStory]?.id}`}>
                          Read Full Story
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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
                      <Button
                        variant={selectedCategory === null ? "default" : "ghost"}
                        className="w-full justify-between hover:bg-primary/10"
                        onClick={() => setSelectedCategory(null)}
                      >
                        <span className="text-sm">All Categories</span>
                        <Badge variant="secondary" className="text-xs">
                          {allNewsStories.length}
                        </Badge>
                      </Button>
                      {newsCategories.map((category) => {
                        const count = allNewsStories.filter(story => story.category === category).length;
                        return (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "ghost"}
                            className="w-full justify-between hover:bg-primary/10"
                            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
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
                  {currentStories.length === 0 ? (
                    <Card className="p-8 text-center">
                      <h3 className="text-lg font-semibold mb-2">No News Available</h3>
                      <p className="text-muted-foreground">
                        {selectedCategory 
                          ? `No stories found in ${selectedCategory} category.`
                          : "Check back later for the latest news updates."
                        }
                      </p>
                    </Card>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentStories.map((story) => (
                          <Card key={story.id} className="overflow-hidden hover:shadow-caribbean transition-all duration-300">
                            <div className="relative h-48">
                              {story.image && story.image.trim() !== '' ? (
                                <img
                                  src={story.image}
                                  alt={story.title}
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
                                style={{ display: (story.image && story.image.trim() !== '') ? 'none' : 'block' }}
                                className="absolute inset-0"
                              >
                                <FallbackBlogImage 
                                  title={story.title}
                                  category={story.category}
                                  className="w-full h-full"
                                />
                              </div>
                              <Badge 
                                className={`absolute top-3 left-3 text-xs ${getCategoryColor(story.category)}`}
                              >
                                {story.category.replace(" News", "")}
                              </Badge>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
                                <Link to={`/blog/${story.id}`}>
                                  {story.title}
                                </Link>
                              </h3>
                              <p className="text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-3">
                                {story.excerpt}
                              </p>
                              <div className="flex items-center text-xs text-muted-foreground mb-3">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{story.date}</span>
                                <Clock className="h-3 w-3 ml-3 mr-1" />
                                <span>{story.readTime}</span>
                              </div>
                              {story.source && (
                                <p className="text-xs text-muted-foreground mb-3 italic">
                                  Source: {story.source}
                                </p>
                              )}
                              <div className="flex justify-end">
                                <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                                  <Link to={`/blog/${story.id}`}>
                                    <ArrowRight className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-8">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                          </Button>
                          
                          <div className="flex items-center space-x-2">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              
                              return (
                                <Button
                                  key={pageNum}
                                  variant={currentPage === pageNum ? "default" : "outline"}
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={() => setCurrentPage(pageNum)}
                                >
                                  {pageNum}
                                </Button>
                              );
                            })}
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                      
                      <div className="text-center text-sm text-muted-foreground mt-4">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredStories.length)} of {filteredStories.length} stories
                        {selectedCategory && ` in ${selectedCategory}`}
                      </div>
                    </>
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