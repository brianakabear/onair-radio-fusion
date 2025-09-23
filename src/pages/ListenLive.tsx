import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio, Music, Headphones, Play, AudioLines, Clock, User, Volume2 } from "lucide-react";
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

interface Show {
  time: string;
  show: string;
  host: string;
  type: string;
  startTime: number;
  endTime: number;
}

interface ScheduleDay {
  day: string;
  shows: Show[];
}

const ListenLive = () => {
  const { currentStream, selectStream, isPlaying, getStreamMetadata, currentTrack, togglePlay } = useAudio();
  const [currentShow, setCurrentShow] = useState<Show | null>(null);

  // Convert time string to minutes from midnight
  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
    if (period === 'AM' && hours === 12) totalMinutes = minutes;
    
    return totalMinutes;
  };

  const schedule: ScheduleDay[] = [
    {
      day: "Monday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Bro Gary Radio Sponsored By Bio Life", host: "Bro Gary", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 11:00 AM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("11:00 AM") },
        { time: "11:00 AM - 3:00 PM", show: "The Jamz", host: "DJ Jamz", type: "mix", startTime: timeToMinutes("11:00 AM"), endTime: timeToMinutes("3:00 PM") },
        { time: "3:00 PM - 5:00 PM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("3:00 PM"), endTime: timeToMinutes("5:00 PM") },
        { time: "5:00 PM - 6:00 PM", show: "Evening Transition", host: "Auto DJ", type: "mix", startTime: timeToMinutes("5:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 6:00 AM", show: "Link Up Radio Live", host: "DJ Live", type: "mix", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Tuesday", 
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Bro Gary Radio Sponsored By Bio Life", host: "Bro Gary", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 11:00 AM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("11:00 AM") },
        { time: "11:00 AM - 3:00 PM", show: "The Jamz", host: "DJ Jamz", type: "mix", startTime: timeToMinutes("11:00 AM"), endTime: timeToMinutes("3:00 PM") },
        { time: "3:00 PM - 5:00 PM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("3:00 PM"), endTime: timeToMinutes("5:00 PM") },
        { time: "5:00 PM - 6:00 PM", show: "Evening Transition", host: "Auto DJ", type: "mix", startTime: timeToMinutes("5:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 6:00 AM", show: "Link Up Radio Live", host: "DJ Live", type: "mix", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Wednesday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Bro Gary Radio Sponsored By Bio Life", host: "Bro Gary", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 11:00 AM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("11:00 AM") },
        { time: "11:00 AM - 3:00 PM", show: "The Jamz", host: "DJ Jamz", type: "mix", startTime: timeToMinutes("11:00 AM"), endTime: timeToMinutes("3:00 PM") },
        { time: "3:00 PM - 5:00 PM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("3:00 PM"), endTime: timeToMinutes("5:00 PM") },
        { time: "5:00 PM - 6:00 PM", show: "Evening Transition", host: "Auto DJ", type: "mix", startTime: timeToMinutes("5:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 6:00 AM", show: "Link Up Radio Live", host: "DJ Live", type: "mix", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Thursday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Bro Gary Radio Sponsored By Bio Life", host: "Bro Gary", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 11:00 AM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("11:00 AM") },
        { time: "11:00 AM - 3:00 PM", show: "The Jamz", host: "DJ Jamz", type: "mix", startTime: timeToMinutes("11:00 AM"), endTime: timeToMinutes("3:00 PM") },
        { time: "3:00 PM - 5:00 PM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("3:00 PM"), endTime: timeToMinutes("5:00 PM") },
        { time: "5:00 PM - 6:00 PM", show: "Evening Transition", host: "Auto DJ", type: "mix", startTime: timeToMinutes("5:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 6:00 AM", show: "Link Up Radio Live", host: "DJ Live", type: "mix", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Friday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Bro Gary Radio Sponsored By Bio Life", host: "Bro Gary", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 11:00 AM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("11:00 AM") },
        { time: "11:00 AM - 3:00 PM", show: "The Jamz", host: "DJ Jamz", type: "mix", startTime: timeToMinutes("11:00 AM"), endTime: timeToMinutes("3:00 PM") },
        { time: "3:00 PM - 5:00 PM", show: "The Irie Link", host: "DJ Irie", type: "dancehall", startTime: timeToMinutes("3:00 PM"), endTime: timeToMinutes("5:00 PM") },
        { time: "5:00 PM - 6:00 PM", show: "Evening Transition", host: "Auto DJ", type: "mix", startTime: timeToMinutes("5:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 6:00 AM", show: "Link Up Radio Live", host: "DJ Live", type: "mix", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Saturday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Saturday Sunrise", host: "DJ Early Bird", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 2:00 PM", show: "Weekend Warriors", host: "DJ Warrior", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("2:00 PM") },
        { time: "2:00 PM - 6:00 PM", show: "Caribbean Vibes", host: "DJ Vibes", type: "soca", startTime: timeToMinutes("2:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 10:00 PM", show: "Saturday Night Mix", host: "DJ Night", type: "mix", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("10:00 PM") },
        { time: "10:00 PM - 6:00 AM", show: "Late Night Grooves", host: "DJ Midnight", type: "rnb", startTime: timeToMinutes("10:00 PM"), endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Sunday",
      shows: [
        { time: "6:00 AM - 9:00 AM", show: "Gospel Morning", host: "Minister Praise", type: "gospel", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("9:00 AM") },
        { time: "9:00 AM - 12:00 PM", show: "Roots & Culture", host: "Cultural Ambassador", type: "reggae", startTime: timeToMinutes("9:00 AM"), endTime: timeToMinutes("12:00 PM") },
        { time: "12:00 PM - 4:00 PM", show: "Sunday Selection", host: "DJ Select", type: "mix", startTime: timeToMinutes("12:00 PM"), endTime: timeToMinutes("4:00 PM") },
        { time: "4:00 PM - 8:00 PM", show: "Caribbean Classics", host: "DJ Classic", type: "oldies", startTime: timeToMinutes("4:00 PM"), endTime: timeToMinutes("8:00 PM") },
        { time: "8:00 PM - 6:00 AM", show: "Sunday Night Chill", host: "DJ Chill", type: "rnb", startTime: timeToMinutes("8:00 PM"), endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    }
  ];

  // Find current show
  const getCurrentShow = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todaySchedule = schedule.find(day => day.day === dayNames[dayOfWeek]);
    
    if (!todaySchedule) return null;

    let currentShow = todaySchedule.shows.find(show => {
      if (show.startTime < show.endTime) {
        return currentMinutes >= show.startTime && currentMinutes < show.endTime;
      } else {
        return currentMinutes >= show.startTime || currentMinutes < show.endTime;
      }
    });

    // If no current show found and we're in early morning, check previous day's late shows
    if (!currentShow && currentMinutes < 360) { // Before 6 AM
      const yesterdayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const yesterdaySchedule = schedule[yesterdayIndex];
      currentShow = yesterdaySchedule.shows.find(show => 
        show.startTime > show.endTime && currentMinutes < show.endTime - 24 * 60
      );
    }

    return currentShow;
  };

  const getGenreColor = (type: string) => {
    switch (type) {
      case "reggae": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "dancehall": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "rnb": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "soca": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "hiphop": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  useEffect(() => {
    const updateCurrentShow = () => {
      setCurrentShow(getCurrentShow());
    };

    updateCurrentShow();
    
    // Update every minute
    const interval = setInterval(updateCurrentShow, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const streams: RadioStream[] = [
    {
      id: '1',
      name: 'Link Up Radio Main',
      url: 'https://c2.radioboss.fm:8967/stream',
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
      
      {/* Currently On Air Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-background via-primary/5 to-background border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Live Now</span>
              <span className="text-sm text-muted-foreground">{formatTime()}</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Currently On Air</h1>
          </div>
          
          {currentShow ? (
            <div className="max-w-4xl mx-auto mb-12">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-caribbean">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <Badge 
                        variant="outline" 
                        className={`text-sm px-4 py-2 ${getGenreColor(currentShow.type)}`}
                      >
                        {currentShow.type.toUpperCase()}
                      </Badge>
                      <h2 className="text-3xl font-bold text-foreground">{currentShow.show}</h2>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>with {currentShow.host}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{currentShow.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="w-32 h-32 mx-auto bg-gradient-caribbean rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                          <img 
                            src={linkUpLogo} 
                            alt="Link Up Radio" 
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                        {isPlaying && (
                          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
                        )}
                      </div>
                      <Button 
                        onClick={togglePlay}
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-caribbean px-8"
                      >
                        {isPlaying ? (
                          <>
                            <Volume2 className="h-5 w-5 mr-2" />
                            Listening Live
                          </>
                        ) : (
                          <>
                            <Play className="h-5 w-5 mr-2" />
                            Listen Live
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        {currentStream?.name || "Link Up Radio Main"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center text-muted-foreground mb-12">
              <p>Schedule loading...</p>
            </div>
          )}
        </div>
      </section>
      
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
                    alt="Link Up Radio Logo" 
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