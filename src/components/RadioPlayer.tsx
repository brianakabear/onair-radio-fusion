import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.7]);
  const [currentTrack] = useState({
    title: "Love Too Serious",
    artist: "Lilly Wolf"
  });
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const streamUrl = "https://c2.radioboss.fm:8967/stream";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0];
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
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

  return (
    <Card className="w-full max-w-sm bg-player-bg border-primary/20 shadow-caribbean">
      <CardContent className="p-4">
        <audio
          ref={audioRef}
          src={streamUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={(e) => {
            console.error("Audio error:", e);
            setIsPlaying(false);
          }}
        />

        {/* Now Playing Info */}
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-primary font-medium uppercase tracking-wide">
              On Air
            </span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <h3 className="font-semibold text-sm text-foreground truncate">
            {currentTrack.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {currentTrack.artist}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button
            onClick={togglePlay}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 w-12 shadow-glow transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="h-8 w-8 p-0"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={isMuted ? [0] : volume}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.1}
            className="flex-1"
          />
        </div>

        {/* Stream Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Streaming live from Link Up Radio
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadioPlayer;