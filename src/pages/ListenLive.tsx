import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio, Music, Headphones, Play, AudioLines } from "lucide-react";
import Header from "@/components/Header";
import { useAudio } from "@/contexts/AudioContext";
import linkUpLogo from "@/assets/linkup-logo.png";

interface RadioStream {
  id: string;
  name: string;
  url: string;
  genre: string;
  description: string;
  bitrate: string;
}

const ListenLive = () => {
  const { currentStream, selectStream, isPlaying, getStreamMetadata, currentTrack } = useAudio();

  const streams: RadioStream[] = [
    {
      id: '1',
      name: 'Majestic Fyah Radio Main',
      url: 'https://cast1.my-control-panel.com/proxy/majesticfyah/stream',
      genre: 'Caribbean Mix',
      description: 'Main Caribbean music stream featuring reggae, dancehall, soca, and more',
      bitrate: '128 kbps'
    },
    {
      id: '2',
      name: 'WAVS Stream',
      url: 'https://c30.radioboss.fm:8946/stream',
      genre: 'Reggae',
      description: 'Classic and modern reggae music 24/7',
      bitrate: '128 kbps'
    },
    {
      id: '3',
      name: 'The Traffic Jam',
      url: 'https://c17.radioboss.fm:8576/stream',
      genre: 'Dancehall',
      description: 'The hottest dancehall tracks and riddims',
      bitrate: '128 kbps'
    },
    {
      id: '4',
      name: 'BrianAkaBear Radio',
      url: 'https://cast1.my-control-panel.com/proxy/bandoradio/stream',
      genre: 'Beats & Music',
      description: 'Beats and Music By Brian',
      bitrate: '128 kbps'
    },
    {
      id: '5',
      name: 'Soca Paradise',
      url: 'https://streams.radio.co/s9a8b7c6d5/listen',
      genre: 'Soca',
      description: 'Non-stop soca carnival vibes',
      bitrate: '192 kbps'
    },
    {
      id: '6',
      name: 'R&B Smooth',
      url: 'https://streams.radio.co/s1f2e3d4c5/listen',
      genre: 'R&B',
      description: 'Smooth R&B classics and contemporary hits',
      bitrate: '256 kbps'
    },
    {
      id: '7',
      name: 'Hip Hop Nation',
      url: 'https://streams.radio.co/s6g5f4e3d2/listen',
      genre: 'Hip Hop',
      description: 'Latest hip hop tracks and underground gems',
      bitrate: '320 kbps'
    }
  ];

  const featuredStream = streams.find(stream => stream.id === '1')!;
  const otherStreams = streams.filter(stream => stream.id !== '1');

  const handleStreamSelect = (stream: RadioStream) => {
    selectStream(stream);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-caribbean-50 via-caribbean-100 to-caribbean-200 pb-20">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Radio className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Listen Live
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose from our curated selection of Caribbean music streams. 
            Your music continues playing as you browse the site!
          </p>
          
          {currentStream && (
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Headphones className="h-5 w-5" />
              <span className="font-medium">
                Now {isPlaying ? 'Playing' : 'Selected'}: {currentStream.name}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Stream Selection */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Featured Stream */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Featured Station
              </h2>
              <p className="text-muted-foreground">
                Our flagship Caribbean music stream
              </p>
            </div>
            
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-caribbean hover:scale-[1.02] max-w-4xl mx-auto ${
                currentStream?.id === featuredStream.id 
                  ? 'ring-2 ring-primary shadow-caribbean' 
                  : ''
              }`}
              onClick={() => handleStreamSelect(featuredStream)}
            >
              <CardHeader className="pb-6">
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src={linkUpLogo} 
                    alt="Majestic Fyah Radio Logo" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Radio className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {featuredStream.bitrate}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold">{featuredStream.name}</CardTitle>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {featuredStream.genre}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <CardDescription className="text-lg max-w-2xl mx-auto">
                  {featuredStream.description}
                </CardDescription>
                
                {/* Current Track Info for Featured Stream */}
                {currentStream?.id === featuredStream.id && currentTrack && (
                  <div className="bg-muted/30 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <AudioLines className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-sm font-medium text-primary">Now Playing</span>
                    </div>
                    <h4 className="font-semibold text-foreground">
                      {currentTrack.title || 'Unknown Track'}
                    </h4>
                    {currentTrack.artist && (
                      <p className="text-sm text-muted-foreground mt-1">
                        by {currentTrack.artist}
                      </p>
                    )}
                  </div>
                )}
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStreamSelect(featuredStream);
                  }}
                  variant={currentStream?.id === featuredStream.id ? "default" : "outline"}
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {currentStream?.id === featuredStream.id ? (
                    isPlaying ? "Currently Playing" : "Selected"
                  ) : (
                    "Listen Now"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Other Streams */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              More Stations
            </h2>
            <p className="text-muted-foreground">
              Explore our variety of Caribbean music genres
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherStreams.map((stream) => (
              <Card 
                key={stream.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-caribbean hover:scale-105 ${
                  currentStream?.id === stream.id 
                    ? 'ring-2 ring-primary shadow-caribbean' 
                    : ''
                }`}
                onClick={() => handleStreamSelect(stream)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Music className="h-6 w-6 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {stream.bitrate}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{stream.name}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {stream.genre}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4">
                    {stream.description}
                  </CardDescription>
                  
                  {/* Current Track Info for Stream */}
                  {currentStream?.id === stream.id && currentTrack && (
                    <div className="bg-muted/20 rounded-md p-3 mb-4 border border-primary/10">
                      <div className="flex items-center space-x-2 mb-1">
                        <AudioLines className="h-3 w-3 text-primary animate-pulse" />
                        <span className="text-xs font-medium text-primary">Now Playing</span>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">
                        {currentTrack.title || 'Unknown Track'}
                      </p>
                      {currentTrack.artist && (
                        <p className="text-xs text-muted-foreground truncate">
                          by {currentTrack.artist}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStreamSelect(stream);
                    }}
                    variant={currentStream?.id === stream.id ? "default" : "outline"}
                    className="w-full"
                  >
                    {currentStream?.id === stream.id ? (
                      isPlaying ? "Currently Playing" : "Selected"
                    ) : (
                      "Select Stream"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListenLive;