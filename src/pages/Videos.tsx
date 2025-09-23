import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Settings } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const PLAYLIST_ID = "PLIEahQKVNC2wTVti1enD_km8IDGkyupPw";

  useEffect(() => {
    const storedApiKey = localStorage.getItem("youtube_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      fetchPlaylistVideos(storedApiKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const fetchPlaylistVideos = async (key: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${key}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();
      const videoList: Video[] = data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        videoId: item.snippet.resourceId.videoId,
      }));

      // Randomize video order
      const shuffledVideos = [...videoList].sort(() => Math.random() - 0.5);
      setVideos(shuffledVideos);
      setFeaturedVideo(shuffledVideos[0]);

      toast({
        title: "Success",
        description: `Loaded ${shuffledVideos.length} music videos`,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast({
        title: "Error",
        description: "Failed to load videos. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem("youtube_api_key", apiKey.trim());
      setShowApiKeyInput(false);
      fetchPlaylistVideos(apiKey.trim());
    }
  };

  const playVideo = (video: Video) => {
    setFeaturedVideo(video);
  };

  if (showApiKeyInput) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">YouTube API Setup</h2>
              <p className="text-muted-foreground mb-4 text-sm">
                To display YouTube videos, please enter your YouTube Data API v3 key. 
                You can get one from the Google Cloud Console.
              </p>
              <form onSubmit={handleApiKeySubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter YouTube API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Save API Key
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-caribbean bg-clip-text text-transparent">
              Music Videos
            </h1>
            <p className="text-muted-foreground mt-2">
              Latest Caribbean music videos and performances
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiKeyInput(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="mt-4 text-muted-foreground">Loading videos...</p>
          </div>
        ) : (
          <>
            {/* Featured Video - Takes up 75% of page width */}
            {featuredVideo && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Featured Video</h2>
                <div className="aspect-video bg-card rounded-lg overflow-hidden shadow-caribbean">
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredVideo.videoId}?autoplay=0&rel=0`}
                    title={featuredVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {featuredVideo.description}
                  </p>
                </div>
              </div>
            )}

            {/* Video Grid */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">All Music Videos</h2>
                <Button
                  onClick={() => fetchPlaylistVideos(apiKey)}
                  variant="outline"
                  size="sm"
                >
                  Refresh
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className="group cursor-pointer hover:shadow-caribbean transition-all duration-300 hover:scale-105 overflow-hidden"
                    onClick={() => playVideo(video)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      {featuredVideo?.id === video.id && (
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                          Now Playing
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Videos;