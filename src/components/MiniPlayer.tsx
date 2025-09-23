import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { useAudio } from "@/contexts/AudioContext";
import { cn } from "@/lib/utils";

const MiniPlayer = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    currentStream,
    isLoading,
    togglePlay,
    toggleMute,
    handleVolumeChange,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!currentStream || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <Card className={cn(
        "bg-player-bg/95 backdrop-blur-sm border-primary/20 shadow-caribbean transition-all duration-300",
        isExpanded ? "rounded-t-lg" : "rounded-none"
      )}>
        <CardContent className={cn(
          "p-3 transition-all duration-300",
          isExpanded ? "pb-4" : "pb-3"
        )}>
          {/* Mini Player Bar */}
          <div className="flex items-center justify-between">
            {/* Now Playing Info */}
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-primary font-medium">ON AIR</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm text-foreground truncate">
                  {currentStream.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {currentStream.genre} • {currentStream.bitrate}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={togglePlay}
                size="sm"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-8 w-8"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                ) : isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                <ChevronUp className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isExpanded ? "rotate-180" : ""
                )} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Expanded Controls */}
          {isExpanded && (
            <div className="mt-4 space-y-3">
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
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {Math.round((isMuted ? 0 : volume[0]) * 100)}%
                </span>
              </div>

              {/* Stream Info */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {currentStream.description}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniPlayer;