import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Radio, Play, Pause, Volume2, VolumeX, AudioLines, Loader2, Signal } from "lucide-react";
import Header from "@/components/Header";
import { useAudio } from "@/contexts/AudioContext";
import majesticLogo from "@/assets/majestic-fyah-logo.png";

const ListenLive = () => {
  const {
    currentStream,
    selectStream,
    isPlaying,
    isLoading,
    isMuted,
    volume,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    currentTrack,
  } = useAudio();

  const station = {
    id: '1',
    name: 'Majestic Fyah Radio',
    url: 'https://cast1.my-control-panel.com/proxy/majesticfyah/stream',
    genre: 'Caribbean Mix',
    description: 'The best in reggae, dancehall, soca and Caribbean music — broadcasting live 24/7.',
    bitrate: '128 kbps'
  };

  const isThisStation = currentStream?.id === station.id;

  const handleMainButton = () => {
    if (!isThisStation) {
      selectStream(station);
    } else {
      togglePlay();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-caribbean-50 via-caribbean-100 to-caribbean-200 pb-24">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Radio className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              On Air
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tune in to Majestic Fyah Radio — your music keeps playing as you browse the site.
          </p>
        </div>
      </section>

      {/* Modern Player */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-xl shadow-caribbean">
            {/* Glow accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-primary" />

            <div className="p-6 md:p-10">
              {/* Station identity */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="relative shrink-0">
                  <div className={`absolute inset-0 rounded-full bg-primary/20 blur-xl ${isThisStation && isPlaying ? 'animate-pulse' : ''}`} />
                  <img
                    src={majesticLogo}
                    alt="Majestic Fyah Radio Logo"
                    className="relative w-32 h-32 md:w-40 md:h-40 object-contain rounded-full ring-2 ring-primary/30"
                    loading="lazy"
                    width={160}
                    height={160}
                  />
                  {isThisStation && isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-primary" />
                    </span>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left space-y-3 min-w-0">
                  <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                    <Badge variant={isThisStation && isPlaying ? "default" : "secondary"} className="uppercase tracking-wider">
                      {isThisStation && isPlaying ? (
                        <>
                          <Signal className="h-3 w-3 mr-1 animate-pulse" />
                          Live
                        </>
                      ) : (
                        "Off Air"
                      )}
                    </Badge>
                    <Badge variant="outline">{station.genre}</Badge>
                    <Badge variant="outline">{station.bitrate}</Badge>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                    {station.name}
                  </h2>
                  <p className="text-muted-foreground">{station.description}</p>

                  {/* Now Playing */}
                  {isThisStation && currentTrack && (
                    <div className="bg-muted/40 rounded-xl p-4 border border-primary/20">
                      <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
                        <AudioLines className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Now Playing</span>
                      </div>
                      <p className="font-semibold text-foreground truncate">
                        {currentTrack.title || 'Unknown Track'}
                      </p>
                      {currentTrack.artist && (
                        <p className="text-sm text-muted-foreground truncate">
                          {currentTrack.artist}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Equalizer bars */}
              <div className="flex items-end justify-center gap-1 h-10 mt-8" aria-hidden="true">
                {[0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.65, 0.45, 0.8, 0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.85, 0.55].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1.5 rounded-full bg-gradient-to-t from-primary to-primary-glow ${isThisStation && isPlaying ? 'animate-pulse' : 'opacity-30'}`}
                    style={{
                      height: `${h * 100}%`,
                      animationDelay: `${i * 0.08}s`,
                      animationDuration: '0.9s',
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="mt-6 flex flex-col items-center gap-5">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="rounded-full"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>

                  <Button
                    onClick={handleMainButton}
                    size="icon"
                    className="h-16 w-16 rounded-full shadow-caribbean hover:scale-105 transition-transform"
                    aria-label={isThisStation && isPlaying ? "Pause" : "Play"}
                    disabled={isLoading && isThisStation}
                  >
                    {isThisStation && isLoading ? (
                      <Loader2 className="h-7 w-7 animate-spin" />
                    ) : isThisStation && isPlaying ? (
                      <Pause className="h-7 w-7" />
                    ) : (
                      <Play className="h-7 w-7 ml-1" />
                    )}
                  </Button>

                  <div className="w-9" />
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3 w-full max-w-xs">
                  <VolumeX className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Slider
                    value={volume}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.01}
                    className="flex-1"
                    aria-label="Volume"
                  />
                  <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>

                <p className="text-xs text-muted-foreground">
                  {isThisStation
                    ? isPlaying
                      ? "Streaming live — use the mini player at the bottom as you browse."
                      : "Paused — press play to resume the live stream."
                    : "Press play to start the live stream."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListenLive;
