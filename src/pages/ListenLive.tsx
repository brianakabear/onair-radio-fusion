import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

interface RadioStream {
  id: string;
  name: string;
  url: string;
  genre: string;
  description: string;
  bitrate: string;
}

const ListenLive = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.7]);
  const [currentStream, setCurrentStream] = useState<RadioStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample streams - you can replace these with your actual streams
  const streams: RadioStream[] = [
    {
      id: "main",
      name: "Link Up Radio - Main Stream",
      url: "https://c2.radioboss.fm:8967/stream",
      genre: "Caribbean Mix",
      description: "Our main Caribbean radio stream featuring reggae, dancehall, soca, and more",
      bitrate: "128kbps"
    },
    {
      id: "reggae",
      name: "Reggae Channel",
      url: "https://example.com/reggae-stream", // Replace with actual stream
      genre: "Reggae",
      description: "Classic and modern reggae music 24/7",
      bitrate: "128kbps"
    },
    {
      id: "dancehall",
      name: "Dancehall Channel",
      url: "https://example.com/dancehall-stream", // Replace with actual stream
      genre: "Dancehall",
      description: "The hottest dancehall tracks and riddims",
      bitrate: "128kbps"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0];
    }
  }, [volume]);

  const selectStream = (stream: RadioStream) => {
    if (currentStream?.id === stream.id) return;
    
    setIsLoading(true);
    setIsPlaying(false);
    setCurrentStream(stream);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = stream.url;
      audioRef.current.load();
    }
  };

  const togglePlay = () => {
    if (!currentStream) {
      // Select first stream if none selected
      selectStream(streams[0]);
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsLoading(true);
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsLoading(false);
        });
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0];
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleError = () => {
    setIsPlaying(false);
    setIsLoading(false);
    console.error("Audio stream error");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Radio className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Listen Live</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of live radio streams and enjoy the best Caribbean music
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Player Section */}
          <div className="space-y-6">
            <Card className="bg-player-bg border-primary/20 shadow-caribbean">
              <CardHeader>
                <CardTitle className="text-center">
                  {currentStream ? currentStream.name : "Select a Stream"}
                </CardTitle>
                {currentStream && (
                  <div className="text-center space-y-2">
                    <Badge variant="secondary">{currentStream.genre}</Badge>
                    <p className="text-sm text-muted-foreground">
                      {currentStream.description}
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <audio
                  ref={audioRef}
                  onCanPlay={handleCanPlay}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onError={handleError}
                  preload="none"
                />

                {/* Status Indicator */}
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-muted'}`}></div>
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {isLoading ? 'Loading...' : isPlaying ? 'Live' : 'Stopped'}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-muted'}`}></div>
                </div>

                {/* Play Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={togglePlay}
                    disabled={isLoading}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-16 w-16 shadow-glow transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-foreground border-t-transparent"></div>
                    ) : isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" />
                    )}
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="h-10 w-10 p-0"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                  <Slider
                    value={isMuted ? [0] : volume}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-12">
                    {Math.round((isMuted ? 0 : volume[0]) * 100)}%
                  </span>
                </div>

                {/* Stream Info */}
                {currentStream && (
                  <div className="text-center pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Quality: {currentStream.bitrate} • Format: MP3
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stream Selection */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Available Streams</h2>
            <div className="space-y-3">
              {streams.map((stream) => (
                <Card
                  key={stream.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    currentStream?.id === stream.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => selectStream(stream)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">{stream.name}</h3>
                          {currentStream?.id === stream.id && (
                            <Badge variant="default" className="text-xs">Current</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{stream.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Genre: {stream.genre}</span>
                          <span>Quality: {stream.bitrate}</span>
                        </div>
                      </div>
                      <Radio className={`h-5 w-5 ${currentStream?.id === stream.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListenLive;