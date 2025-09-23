import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, User, Radio, Calendar, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/contexts/AudioContext";

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

const Schedule = () => {
  const [currentShow, setCurrentShow] = useState<Show | null>(null);
  const [nextShow, setNextShow] = useState<Show | null>(null);
  const { togglePlay, isPlaying, currentStream } = useAudio();

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
        { time: "6:00 AM - 10:00 AM", show: "Morning Vibes", host: "DJ Sunshine", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 2:00 PM", show: "Caribbean Mix", host: "MC Island", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("2:00 PM") },
        { time: "2:00 PM - 6:00 PM", show: "Afternoon Soul", host: "DJ Smooth", type: "rnb", startTime: timeToMinutes("2:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 10:00 PM", show: "Evening Rhythms", host: "DJ Spice", type: "soca", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("10:00 PM") },
        { time: "10:00 PM - 2:00 AM", show: "Night Grooves", host: "DJ Midnight", type: "hiphop", startTime: timeToMinutes("10:00 PM"), endTime: timeToMinutes("2:00 AM") + 24 * 60 },
        { time: "2:00 AM - 6:00 AM", show: "Late Night Vibes", host: "Auto DJ", type: "mix", startTime: timeToMinutes("2:00 AM") + 24 * 60, endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Tuesday", 
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Rise & Shine", host: "DJ Dawn", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 2:00 PM", show: "Island Breeze", host: "DJ Coconut", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("2:00 PM") },
        { time: "2:00 PM - 6:00 PM", show: "Soul Power", host: "DJ Revolution", type: "rnb", startTime: timeToMinutes("2:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 10:00 PM", show: "Carnival Time", host: "DJ Mas", type: "soca", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("10:00 PM") },
        { time: "10:00 PM - 2:00 AM", show: "Urban Heat", host: "DJ Fire", type: "hiphop", startTime: timeToMinutes("10:00 PM"), endTime: timeToMinutes("2:00 AM") + 24 * 60 },
        { time: "2:00 AM - 6:00 AM", show: "Night Shift", host: "Auto DJ", type: "mix", startTime: timeToMinutes("2:00 AM") + 24 * 60, endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Wednesday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Midweek Energy", host: "DJ Storm", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 2:00 PM", show: "Caribbean Heat", host: "DJ Blaze", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("2:00 PM") },
        { time: "2:00 PM - 6:00 PM", show: "Classic Soul", host: "DJ Vintage", type: "rnb", startTime: timeToMinutes("2:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 10:00 PM", show: "Soca Madness", host: "DJ Carnival", type: "soca", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("10:00 PM") },
        { time: "10:00 PM - 2:00 AM", show: "Hip Hop Nation", host: "DJ Beats", type: "hiphop", startTime: timeToMinutes("10:00 PM"), endTime: timeToMinutes("2:00 AM") + 24 * 60 },
        { time: "2:00 AM - 6:00 AM", show: "Overnight Mix", host: "Auto DJ", type: "mix", startTime: timeToMinutes("2:00 AM") + 24 * 60, endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Thursday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Thursday Vibes", host: "DJ Thunder", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 2:00 PM", show: "Dancehall Fever", host: "DJ Wicked", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("2:00 PM") },
        { time: "2:00 PM - 6:00 PM", show: "Smooth Operator", host: "DJ Silk", type: "rnb", startTime: timeToMinutes("2:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 10:00 PM", show: "Trini Vibes", host: "DJ Calypso", type: "soca", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("10:00 PM") },
        { time: "10:00 PM - 2:00 AM", show: "Rap City", host: "DJ Lyrical", type: "hiphop", startTime: timeToMinutes("10:00 PM"), endTime: timeToMinutes("2:00 AM") + 24 * 60 },
        { time: "2:00 AM - 6:00 AM", show: "Night Owl", host: "Auto DJ", type: "mix", startTime: timeToMinutes("2:00 AM") + 24 * 60, endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Friday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "TGIF Morning", host: "DJ Weekend", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 2:00 PM", show: "Friday Flex", host: "DJ Massive", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("2:00 PM") },
        { time: "2:00 PM - 6:00 PM", show: "Feel Good Friday", host: "DJ Happy", type: "rnb", startTime: timeToMinutes("2:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 10:00 PM", show: "Friday Night Live", host: "DJ Party", type: "soca", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("10:00 PM") },
        { time: "10:00 PM - 2:00 AM", show: "Weekend Warmup", host: "DJ Hype", type: "hiphop", startTime: timeToMinutes("10:00 PM"), endTime: timeToMinutes("2:00 AM") + 24 * 60 },
        { time: "2:00 AM - 6:00 AM", show: "Late Night Party", host: "Auto DJ", type: "mix", startTime: timeToMinutes("2:00 AM") + 24 * 60, endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Saturday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Saturday Sunrise", host: "DJ Early Bird", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 2:00 PM", show: "Weekend Warriors", host: "DJ Warrior", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("2:00 PM") },
        { time: "2:00 PM - 6:00 PM", show: "Saturday Soul", host: "DJ Soulful", type: "rnb", startTime: timeToMinutes("2:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 10:00 PM", show: "Saturday Night Fever", host: "DJ Fever", type: "soca", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("10:00 PM") },
        { time: "10:00 PM - 2:00 AM", show: "Saturday Night Live", host: "DJ Live", type: "hiphop", startTime: timeToMinutes("10:00 PM"), endTime: timeToMinutes("2:00 AM") + 24 * 60 },
        { time: "2:00 AM - 6:00 AM", show: "After Hours", host: "Auto DJ", type: "mix", startTime: timeToMinutes("2:00 AM") + 24 * 60, endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    },
    {
      day: "Sunday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Sunday Blessing", host: "DJ Blessed", type: "reggae", startTime: timeToMinutes("6:00 AM"), endTime: timeToMinutes("10:00 AM") },
        { time: "10:00 AM - 2:00 PM", show: "Sunday Vibes", host: "DJ Chill", type: "dancehall", startTime: timeToMinutes("10:00 AM"), endTime: timeToMinutes("2:00 PM") },
        { time: "2:00 PM - 6:00 PM", show: "Sunday Soul", host: "DJ Gospel", type: "rnb", startTime: timeToMinutes("2:00 PM"), endTime: timeToMinutes("6:00 PM") },
        { time: "6:00 PM - 10:00 PM", show: "Sunday Funday", host: "DJ Fun", type: "soca", startTime: timeToMinutes("6:00 PM"), endTime: timeToMinutes("10:00 PM") },
        { time: "10:00 PM - 2:00 AM", show: "Sunday Night", host: "DJ Night", type: "hiphop", startTime: timeToMinutes("10:00 PM"), endTime: timeToMinutes("2:00 AM") + 24 * 60 },
        { time: "2:00 AM - 6:00 AM", show: "Sunday Late", host: "Auto DJ", type: "mix", startTime: timeToMinutes("2:00 AM") + 24 * 60, endTime: timeToMinutes("6:00 AM") + 24 * 60 }
      ]
    }
  ];

  // Find current show based on current time
  const getCurrentShow = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todaySchedule = schedule.find(day => day.day === dayNames[dayOfWeek]);
    
    if (!todaySchedule) return null;

    // Handle shows that cross midnight
    let currentShow = todaySchedule.shows.find(show => {
      if (show.startTime > show.endTime) {
        // Show crosses midnight
        return currentMinutes >= show.startTime || currentMinutes < show.endTime - 24 * 60;
      } else {
        return currentMinutes >= show.startTime && currentMinutes < show.endTime;
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

  // Find next show
  const getNextShow = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todaySchedule = schedule.find(day => day.day === dayNames[dayOfWeek]);
    
    if (!todaySchedule) return null;

    const nextShow = todaySchedule.shows.find(show => 
      show.startTime > currentMinutes && show.startTime < 24 * 60
    );

    if (nextShow) return nextShow;

    // If no more shows today, get first show of tomorrow
    const tomorrowIndex = (dayOfWeek + 1) % 7;
    const tomorrowSchedule = schedule[tomorrowIndex];
    return tomorrowSchedule.shows[0];
  };

  useEffect(() => {
    const updateCurrentShow = () => {
      setCurrentShow(getCurrentShow());
      setNextShow(getNextShow());
    };

    updateCurrentShow();
    
    // Update every minute
    const interval = setInterval(updateCurrentShow, 60000);
    
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Currently On Air Section */}
      <section className="py-12 bg-gradient-to-r from-background via-primary/5 to-background border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Live Now</span>
              <span className="text-sm text-muted-foreground">{formatTime()}</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Current Radio Show</h1>
          </div>
          
          {currentShow ? (
            <div className="max-w-4xl mx-auto">
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
                        <div className="w-32 h-32 mx-auto bg-gradient-caribbean rounded-full flex items-center justify-center shadow-lg">
                          <Radio className="h-12 w-12 text-white animate-pulse" />
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
            <div className="text-center text-muted-foreground">
              <p>Schedule loading...</p>
            </div>
          )}
        </div>
      </section>

      {/* Coming Up Next Section */}
      {nextShow && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-wider">Coming Up Next</span>
              </div>
              <h2 className="text-2xl font-bold">Next Show</h2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Card className="bg-card/30 backdrop-blur-sm border-muted-foreground/20">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 space-y-3">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-3 py-1 ${getGenreColor(nextShow.type)}`}
                      >
                        {nextShow.type.toUpperCase()}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground">{nextShow.show}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                          <User className="h-3 w-3" />
                          <span>with {nextShow.host}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                          <Clock className="h-3 w-3" />
                          <span>Starts at {nextShow.time.split(' - ')[0]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-muted to-muted-foreground/20 rounded-full flex items-center justify-center shadow-md">
                        <Radio className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Up Next</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Weekly Schedule */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-3xl font-bold">Weekly Schedule</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your favorite Caribbean and urban music, 24/7. Check out our full programming schedule below.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-7 gap-6">
            {schedule.map((day) => {
              const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
              const isToday = day.day === today;
              
              return (
                <Card 
                  key={day.day} 
                  className={`transition-all duration-300 hover:shadow-caribbean ${
                    isToday ? 'ring-2 ring-primary/50 bg-primary/5' : ''
                  }`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-center text-lg font-bold ${
                      isToday 
                        ? 'text-primary' 
                        : 'bg-gradient-caribbean bg-clip-text text-transparent'
                    }`}>
                      {day.day}
                      {isToday && (
                        <Badge variant="outline" className="ml-2 text-xs">TODAY</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {day.shows.map((show, index) => {
                      const isCurrentShow = currentShow && 
                        show.show === currentShow.show && 
                        show.host === currentShow.host && 
                        isToday;
                      
                      return (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg transition-all duration-200 ${
                            isCurrentShow 
                              ? 'bg-primary/20 border border-primary/30 shadow-sm' 
                              : 'bg-muted/30 hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className={`h-4 w-4 ${isCurrentShow ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className={`text-xs font-medium ${
                              isCurrentShow ? 'text-primary' : 'text-muted-foreground'
                            }`}>
                              {show.time}
                            </span>
                            {isCurrentShow && (
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-red-500 font-bold">LIVE</span>
                              </div>
                            )}
                          </div>
                          <h4 className={`font-semibold text-sm mb-1 ${
                            isCurrentShow ? 'text-foreground' : 'text-foreground'
                          }`}>
                            {show.show}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">{show.host}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getGenreColor(show.type)}`}
                          >
                            {show.type.toUpperCase()}
                          </Badge>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Genre Legend */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Music Genres</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">REGGAE</Badge>
              <span className="text-sm text-muted-foreground">Roots & Conscious</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">DANCEHALL</Badge>
              <span className="text-sm text-muted-foreground">Modern Caribbean</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">R&B</Badge>
              <span className="text-sm text-muted-foreground">Soul & Neo-Soul</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">SOCA</Badge>
              <span className="text-sm text-muted-foreground">Carnival Vibes</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">HIPHOP</Badge>
              <span className="text-sm text-muted-foreground">Urban Beats</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">MIX</Badge>
              <span className="text-sm text-muted-foreground">All Genres</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;