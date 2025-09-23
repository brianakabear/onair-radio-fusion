import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ArrowRight, MapPin, Search, Settings, ChevronLeft, ChevronRight } from "lucide-react";
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
  
  // Video news state
  const [videoNews, setVideoNews] = useState<any[]>([]);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [lastVideoUpdate, setLastVideoUpdate] = useState<number>(0);
  const [currentVideo, setCurrentVideo] = useState<any | null>(null);

  // Fetch videos from YouTube playlist
  const fetchVideoNews = async () => {
    setIsLoadingVideo(true);
    
    try {
      // Since we can't use YouTube API directly without a key, we'll simulate fetching
      // In production, this would use YouTube Data API v3 to fetch from the playlist
      const mockVerifiedNewsVideos = [
        {
          id: "cnn-1",
          title: "Breaking: Global Climate Summit Reaches Historic Agreement",
          description: "World leaders agree on ambitious climate targets for the next decade",
          thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
          youtubeId: "jNQXAC9IVRw",
          channel: "CNN",
          publishedAt: new Date().toISOString(),
          verified: true
        },
        {
          id: "bbc-1", 
          title: "Economic Recovery Shows Promising Signs Across Caribbean",
          description: "Tourism and trade sectors demonstrate resilience in latest economic indicators",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          youtubeId: "dQw4w9WgXcQ",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          verified: true
        },
        {
          id: "reuters-1",
          title: "Caribbean Nations Lead Green Energy Initiative", 
          description: "Solar and wind projects set new standards for sustainable development",
          thumbnail: "https://img.youtube.com/vi/YQHsXMglC9A/maxresdefault.jpg",
          youtubeId: "YQHsXMglC9A",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          verified: true
        },
        {
          id: "cnn-2",
          title: "Tech Innovation Summit Unveils AI Breakthrough",
          description: "Revolutionary artificial intelligence system promises to transform healthcare",
          thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
          youtubeId: "9bZkp7q19f0",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          verified: true
        },
        {
          id: "bbc-2",
          title: "Space Exploration Milestone: Mars Colony Plans Announced",
          description: "International space agency reveals ambitious timeline for human settlement",
          thumbnail: "https://img.youtube.com/vi/W7QZnwKqopo/maxresdefault.jpg",
          youtubeId: "W7QZnwKqopo",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          verified: true
        },
        {
          id: "reuters-2",
          title: "Global Trade Agreement Boosts Economic Cooperation",
          description: "New international partnership aims to strengthen supply chains worldwide",
          thumbnail: "https://img.youtube.com/vi/pVn_WaFCvJY/maxresdefault.jpg",
          youtubeId: "pVn_WaFCvJY",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 18000000).toISOString(),
          verified: true
        },
        {
          id: "cnn-3",
          title: "Medical Breakthrough: Gene Therapy Shows Promise",
          description: "Clinical trials demonstrate significant progress in treating rare diseases",
          thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
          youtubeId: "kJQP7kiw5Fk",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 21600000).toISOString(),
          verified: true
        },
        {
          id: "bbc-3",
          title: "Renewable Energy Reaches New Global Record",
          description: "Solar and wind power generation exceeds fossil fuels for first time",
          thumbnail: "https://img.youtube.com/vi/LO1mTELoj6o/maxresdefault.jpg",
          youtubeId: "LO1mTELoj6o",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 25200000).toISOString(),
          verified: true
        },
        {
          id: "reuters-3",
          title: "Ocean Conservation Initiative Launches Worldwide",
          description: "International effort aims to protect marine ecosystems and reduce plastic waste",
          thumbnail: "https://img.youtube.com/vi/bFtcLJVN8rY/maxresdefault.jpg",
          youtubeId: "bFtcLJVN8rY",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 28800000).toISOString(),
          verified: true
        },
        {
          id: "cnn-4",
          title: "Education Reform Initiative Shows Positive Results",
          description: "New teaching methods improve student performance across diverse communities",
          thumbnail: "https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg",
          youtubeId: "QH2-TGUlwu4",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 32400000).toISOString(),
          verified: true
        },
        {
          id: "bbc-4",
          title: "Digital Currency Regulation Framework Approved",
          description: "New guidelines provide clarity for cryptocurrency adoption and security",
          thumbnail: "https://img.youtube.com/vi/nfWlot6h_JM/maxresdefault.jpg",
          youtubeId: "nfWlot6h_JM",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 36000000).toISOString(),
          verified: true
        },
        {
          id: "reuters-4",
          title: "Sustainable Agriculture Practices Gain Momentum",
          description: "Farmers worldwide adopt innovative techniques to combat climate change",
          thumbnail: "https://img.youtube.com/vi/4NRXx6U8ABQ/maxresdefault.jpg",
          youtubeId: "4NRXx6U8ABQ",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 39600000).toISOString(),
          verified: true
        },
        {
          id: "cnn-5",
          title: "Mental Health Awareness Campaign Reaches Millions",
          description: "Global initiative promotes understanding and support for mental wellness",
          thumbnail: "https://img.youtube.com/vi/Hzgzim5m7oU/maxresdefault.jpg",
          youtubeId: "Hzgzim5m7oU",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 43200000).toISOString(),
          verified: true
        },
        {
          id: "bbc-5",
          title: "Archaeological Discovery Rewrites Ancient History",
          description: "New findings challenge established theories about early civilizations",
          thumbnail: "https://img.youtube.com/vi/P9WVE2X0ngs/maxresdefault.jpg",
          youtubeId: "P9WVE2X0ngs",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 46800000).toISOString(),
          verified: true
        },
        {
          id: "reuters-5",
          title: "Urban Planning Revolution: Smart Cities Take Shape",
          description: "Technology integration transforms metropolitan areas worldwide",
          thumbnail: "https://img.youtube.com/vi/g6iDZspbRMg/maxresdefault.jpg",
          youtubeId: "g6iDZspbRMg",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 50400000).toISOString(),
          verified: true
        },
        {
          id: "cnn-6",
          title: "Wildlife Conservation Efforts Show Remarkable Success",
          description: "Endangered species populations recover thanks to international cooperation",
          thumbnail: "https://img.youtube.com/vi/hFZFjoX2cGg/maxresdefault.jpg",
          youtubeId: "hFZFjoX2cGg",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 54000000).toISOString(),
          verified: true
        },
        {
          id: "bbc-6",
          title: "Quantum Computing Breakthrough Opens New Possibilities",
          description: "Revolutionary processor design accelerates scientific research capabilities",
          thumbnail: "https://img.youtube.com/vi/zNzzGgr2mhk/maxresdefault.jpg",
          youtubeId: "zNzzGgr2mhk",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 57600000).toISOString(),
          verified: true
        },
        {
          id: "reuters-6",
          title: "Clean Water Initiative Reaches Remote Communities",
          description: "Innovative filtration technology provides access to safe drinking water",
          thumbnail: "https://img.youtube.com/vi/aJOTlE1K90k/maxresdefault.jpg",
          youtubeId: "aJOTlE1K90k",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 61200000).toISOString(),
          verified: true
        },
        {
          id: "cnn-7",
          title: "Disaster Response Technology Saves Lives",
          description: "AI-powered early warning systems prevent casualties in natural disasters",
          thumbnail: "https://img.youtube.com/vi/8SbUC-UaAxE/maxresdefault.jpg",
          youtubeId: "8SbUC-UaAxE",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 64800000).toISOString(),
          verified: true
        },
        {
          id: "bbc-7",
          title: "International Sports Championship Breaks Records",
          description: "Athletes achieve unprecedented performances in global competition",
          thumbnail: "https://img.youtube.com/vi/nBHkIWAJitg/maxresdefault.jpg",
          youtubeId: "nBHkIWAJitg",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 68400000).toISOString(),
          verified: true
        },
        {
          id: "reuters-7",
          title: "Cultural Heritage Preservation Goes Digital",
          description: "Advanced technology helps protect and share world cultural treasures",
          thumbnail: "https://img.youtube.com/vi/dBvlnyvgOnw/maxresdefault.jpg",
          youtubeId: "dBvlnyvgOnw",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 72000000).toISOString(),
          verified: true
        },
        {
          id: "cnn-8",
          title: "Transportation Revolution: Hyperloop Testing Success",
          description: "High-speed ground transportation system passes major milestone",
          thumbnail: "https://img.youtube.com/vi/TudxlQ7_P0Y/maxresdefault.jpg",
          youtubeId: "TudxlQ7_P0Y",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 75600000).toISOString(),
          verified: true
        },
        {
          id: "bbc-8",
          title: "Antarctic Research Reveals Climate Insights",
          description: "Scientific expedition uncovers critical data about global warming patterns",
          thumbnail: "https://img.youtube.com/vi/jsg_cuL7Ga8/maxresdefault.jpg",
          youtubeId: "jsg_cuL7Ga8",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 79200000).toISOString(),
          verified: true
        },
        {
          id: "reuters-8",
          title: "Food Security Innovation Feeds Growing Population",
          description: "Vertical farming and lab-grown proteins address global hunger challenges",
          thumbnail: "https://img.youtube.com/vi/xe_3hLt-DJI/maxresdefault.jpg",
          youtubeId: "xe_3hLt-DJI",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 82800000).toISOString(),
          verified: true
        },
        {
          id: "cnn-9",
          title: "Cybersecurity Alliance Strengthens Digital Defense",
          description: "International cooperation enhances protection against online threats",
          thumbnail: "https://img.youtube.com/vi/INL-RFKDH0w/maxresdefault.jpg",
          youtubeId: "INL-RFKDH0w",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          verified: true
        },
        {
          id: "bbc-9",
          title: "Renewable Energy Storage Breakthrough Announced",
          description: "New battery technology solves intermittency challenges for clean power",
          thumbnail: "https://img.youtube.com/vi/bK7I79hcm08/maxresdefault.jpg",
          youtubeId: "bK7I79hcm08",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 90000000).toISOString(),
          verified: true
        },
        {
          id: "reuters-9",
          title: "Global Health Initiative Eradicates Tropical Disease",
          description: "Coordinated vaccination campaign eliminates centuries-old health threat",
          thumbnail: "https://img.youtube.com/vi/RGLv7heP3-E/maxresdefault.jpg",
          youtubeId: "RGLv7heP3-E",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 93600000).toISOString(),
          verified: true
        },
        {
          id: "cnn-10",
          title: "Artificial Intelligence Ethics Guidelines Established",
          description: "Global framework ensures responsible development of AI technologies",
          thumbnail: "https://img.youtube.com/vi/JMLsJJuOwb4/maxresdefault.jpg",
          youtubeId: "JMLsJJuOwb4",
          channel: "CNN",
          publishedAt: new Date(Date.now() - 97200000).toISOString(),
          verified: true
        },
        {
          id: "bbc-10",
          title: "Deep Ocean Exploration Reveals New Species",
          description: "Marine biologists discover unprecedented biodiversity in ocean depths",
          thumbnail: "https://img.youtube.com/vi/xX96xng7sAE/maxresdefault.jpg",
          youtubeId: "xX96xng7sAE",
          channel: "BBC News",
          publishedAt: new Date(Date.now() - 100800000).toISOString(),
          verified: true
        },
        {
          id: "reuters-10",
          title: "Democratic Innovations Strengthen Global Governance",
          description: "New participatory systems increase citizen engagement in decision-making",
          thumbnail: "https://img.youtube.com/vi/gCfemmxqaRg/maxresdefault.jpg",
          youtubeId: "gCfemmxqaRg",
          channel: "Reuters",
          publishedAt: new Date(Date.now() - 104400000).toISOString(),
          verified: true
        }
      ];
      
      // In production, you would call:
      // const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLIEahQKVNC2yqZJvaaKCVZxB_RqljLMWJ&maxResults=3&key=${API_KEY}`);
      // const data = await response.json();
      
      // Simulate API delay
      setTimeout(() => {
        setVideoNews(mockVerifiedNewsVideos);
        setCurrentVideo(mockVerifiedNewsVideos[0]); // Set first video as default
        setLastVideoUpdate(Date.now());
        setIsLoadingVideo(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching video news:', error);
      setIsLoadingVideo(false);
    }
  };

  // Initial fetch and hourly updates
  useEffect(() => {
    fetchVideoNews();
    
    // Set up hourly refresh
    const interval = setInterval(() => {
      fetchVideoNews();
    }, 3600000); // 1 hour = 3600000ms
    
    return () => clearInterval(interval);
  }, []);

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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all-news">All News</TabsTrigger>
              <TabsTrigger value="video-news">Video News</TabsTrigger>
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
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {currentStories.map((story) => (
                          <Card key={story.id} className="overflow-hidden hover:shadow-caribbean transition-all duration-300">
                            <div className="relative h-48">
                              {story.image && story.image.trim() !== '' ? (
                                <img
                                  src={story.image}
                                  alt={story.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = target.nextElementSibling as HTMLElement;
                                    if (fallback) fallback.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div 
                                className={`${story.image && story.image.trim() !== '' ? 'hidden' : 'flex'} w-full h-full items-center justify-center`}
                                style={{ display: story.image && story.image.trim() !== '' ? 'none' : 'flex' }}
                              >
                                <FallbackBlogImage category={story.category} title={story.title} />
                              </div>
                              <Badge 
                                className={`absolute top-3 right-3 text-xs ${getCategoryColor(story.category)}`}
                              >
                                {story.category.replace(" News", "")}
                              </Badge>
                             </div>
                             <div className="p-2">
                               <h3 className="font-semibold text-xs line-clamp-2 mb-2">
                                 {story.title}
                               </h3>
                               <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                                 <Link to={`/blog/${story.id}`}>
                                   Read Now
                                 </Link>
                               </Button>
                             </div>
                          </Card>
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-12">
                          <div className="flex items-center text-sm text-muted-foreground">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredStories.length)} of {filteredStories.length} stories
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                              Previous
                            </Button>
                            <span className="text-sm font-medium px-4">
                              Page {currentPage} of {totalPages}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                            >
                              Next
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </main>
              </div>
            </TabsContent>

            <TabsContent value="video-news" className="mt-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Video News</h2>
                    <p className="text-muted-foreground mt-1">
                      Latest news from verified YouTube channels • Updates hourly
                    </p>
                    {lastVideoUpdate > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Last updated: {new Date(lastVideoUpdate).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={fetchVideoNews}
                    disabled={isLoadingVideo}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    {isLoadingVideo ? "Updating..." : "Refresh"}
                  </Button>
                </div>

                {isLoadingVideo ? (
                  <div className="space-y-6">
                    {/* Main Player Loading */}
                    <Card className="overflow-hidden animate-pulse">
                      <div className="aspect-video bg-muted"></div>
                      <CardContent className="p-4">
                        <div className="h-6 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </CardContent>
                    </Card>
                    
                    {/* Thumbnails Loading */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Card key={i} className="animate-pulse">
                          <div className="aspect-video bg-muted"></div>
                          <div className="p-2">
                            <div className="h-3 bg-muted rounded"></div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : videoNews.length > 0 ? (
                  <div className="space-y-6">
                    {/* Main Video Player */}
                    {currentVideo && (
                      <Card className="overflow-hidden">
                        <div className="aspect-video bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?controls=1&modestbranding=1&rel=0&autoplay=1`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={currentVideo.title}
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                                {currentVideo.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-3">
                                {currentVideo.description}
                              </p>
                            </div>
                            <Badge className="bg-red-600 text-white text-sm ml-4">
                              {currentVideo.channel} ✓
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(currentVideo.publishedAt).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Video Thumbnails Navigation */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">More Videos ({videoNews.length} total)</h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {videoNews.map((video) => (
                          <Card 
                            key={video.id} 
                            className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                              currentVideo?.id === video.id ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => setCurrentVideo(video)}
                          >
                            <div className="relative">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full aspect-video object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                                }}
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-red-600 text-white text-xs">
                                  {video.channel} ✓
                                </Badge>
                              </div>
                              {currentVideo?.id === video.id && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="p-2">
                              <h3 className="font-semibold text-xs line-clamp-2">
                                {video.title}
                              </h3>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <h3 className="text-lg font-semibold mb-2">No Video News Available</h3>
                    <p className="text-muted-foreground">
                      Check back later for the latest video updates from verified news sources.
                    </p>
                    <Button onClick={fetchVideoNews} className="mt-4" variant="outline">
                      Try Again
                    </Button>
                  </Card>
                )}
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
                            <h3 className="font-semibold text-xs line-clamp-2 mb-2">
                              {story.title}
                            </h3>
                            <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                              <Link to={`/blog/${story.id}`}>
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