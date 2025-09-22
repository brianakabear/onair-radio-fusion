import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Schedule = () => {
  const schedule = [
    {
      day: "Monday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Morning Vibes", host: "DJ Sunshine", type: "reggae" },
        { time: "10:00 AM - 2:00 PM", show: "Caribbean Mix", host: "MC Island", type: "dancehall" },
        { time: "2:00 PM - 6:00 PM", show: "Afternoon Soul", host: "DJ Smooth", type: "rnb" },
        { time: "6:00 PM - 10:00 PM", show: "Evening Rhythms", host: "DJ Spice", type: "soca" },
        { time: "10:00 PM - 2:00 AM", show: "Night Grooves", host: "DJ Midnight", type: "hiphop" },
        { time: "2:00 AM - 6:00 AM", show: "Late Night Vibes", host: "Auto DJ", type: "mix" }
      ]
    },
    {
      day: "Tuesday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Rise & Shine", host: "DJ Dawn", type: "reggae" },
        { time: "10:00 AM - 2:00 PM", show: "Island Breeze", host: "DJ Coconut", type: "dancehall" },
        { time: "2:00 PM - 6:00 PM", show: "Soul Power", host: "DJ Revolution", type: "rnb" },
        { time: "6:00 PM - 10:00 PM", show: "Carnival Time", host: "DJ Mas", type: "soca" },
        { time: "10:00 PM - 2:00 AM", show: "Urban Heat", host: "DJ Fire", type: "hiphop" },
        { time: "2:00 AM - 6:00 AM", show: "Night Shift", host: "Auto DJ", type: "mix" }
      ]
    },
    {
      day: "Wednesday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Midweek Energy", host: "DJ Storm", type: "reggae" },
        { time: "10:00 AM - 2:00 PM", show: "Caribbean Heat", host: "DJ Blaze", type: "dancehall" },
        { time: "2:00 PM - 6:00 PM", show: "Classic Soul", host: "DJ Vintage", type: "rnb" },
        { time: "6:00 PM - 10:00 PM", show: "Soca Madness", host: "DJ Carnival", type: "soca" },
        { time: "10:00 PM - 2:00 AM", show: "Hip Hop Nation", host: "DJ Beats", type: "hiphop" },
        { time: "2:00 AM - 6:00 AM", show: "Overnight Mix", host: "Auto DJ", type: "mix" }
      ]
    },
    {
      day: "Thursday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Thursday Vibes", host: "DJ Thunder", type: "reggae" },
        { time: "10:00 AM - 2:00 PM", show: "Dancehall Fever", host: "DJ Wicked", type: "dancehall" },
        { time: "2:00 PM - 6:00 PM", show: "Smooth Operator", host: "DJ Silk", type: "rnb" },
        { time: "6:00 PM - 10:00 PM", show: "Trini Vibes", host: "DJ Calypso", type: "soca" },
        { time: "10:00 PM - 2:00 AM", show: "Rap City", host: "DJ Lyrical", type: "hiphop" },
        { time: "2:00 AM - 6:00 AM", show: "Night Owl", host: "Auto DJ", type: "mix" }
      ]
    },
    {
      day: "Friday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "TGIF Morning", host: "DJ Weekend", type: "reggae" },
        { time: "10:00 AM - 2:00 PM", show: "Friday Flex", host: "DJ Massive", type: "dancehall" },
        { time: "2:00 PM - 6:00 PM", show: "Feel Good Friday", host: "DJ Happy", type: "rnb" },
        { time: "6:00 PM - 10:00 PM", show: "Friday Night Live", host: "DJ Party", type: "soca" },
        { time: "10:00 PM - 2:00 AM", show: "Weekend Warmup", host: "DJ Hype", type: "hiphop" },
        { time: "2:00 AM - 6:00 AM", show: "Late Night Party", host: "Auto DJ", type: "mix" }
      ]
    },
    {
      day: "Saturday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Saturday Sunrise", host: "DJ Early Bird", type: "reggae" },
        { time: "10:00 AM - 2:00 PM", show: "Weekend Warriors", host: "DJ Warrior", type: "dancehall" },
        { time: "2:00 PM - 6:00 PM", show: "Saturday Soul", host: "DJ Soulful", type: "rnb" },
        { time: "6:00 PM - 10:00 PM", show: "Saturday Night Fever", host: "DJ Fever", type: "soca" },
        { time: "10:00 PM - 2:00 AM", show: "Saturday Night Live", host: "DJ Live", type: "hiphop" },
        { time: "2:00 AM - 6:00 AM", show: "After Hours", host: "Auto DJ", type: "mix" }
      ]
    },
    {
      day: "Sunday",
      shows: [
        { time: "6:00 AM - 10:00 AM", show: "Sunday Blessing", host: "DJ Blessed", type: "reggae" },
        { time: "10:00 AM - 2:00 PM", show: "Sunday Vibes", host: "DJ Chill", type: "dancehall" },
        { time: "2:00 PM - 6:00 PM", show: "Sunday Soul", host: "DJ Gospel", type: "rnb" },
        { time: "6:00 PM - 10:00 PM", show: "Sunday Funday", host: "DJ Fun", type: "soca" },
        { time: "10:00 PM - 2:00 AM", show: "Sunday Night", host: "DJ Night", type: "hiphop" },
        { time: "2:00 AM - 6:00 AM", show: "Sunday Late", host: "Auto DJ", type: "mix" }
      ]
    }
  ];

  const getGenreColor = (type: string) => {
    switch (type) {
      case "reggae": return "bg-accent text-accent-foreground";
      case "dancehall": return "bg-primary text-primary-foreground";
      case "rnb": return "bg-secondary text-secondary-foreground";
      case "soca": return "bg-destructive text-destructive-foreground";
      case "hiphop": return "bg-muted text-muted-foreground";
      default: return "bg-border text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-caribbean">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Programming Schedule</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            24/7 Caribbean and Urban music programming - Check out what's playing when
          </p>
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <a
              href="https://c30.radioboss.fm/u/946"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Listen Live Now</span>
            </a>
          </Button>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-7 gap-6">
            {schedule.map((day) => (
              <Card key={day.day} className="hover:shadow-caribbean transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center text-lg font-bold bg-gradient-caribbean bg-clip-text text-transparent">
                    {day.day}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {day.shows.map((show, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">
                          {show.time}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{show.show}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{show.host}</p>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getGenreColor(show.type)}`}
                      >
                        {show.type.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Genre Legend */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Music Genres</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-accent text-accent-foreground">REGGAE</Badge>
              <span className="text-sm text-muted-foreground">Roots & Conscious</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary text-primary-foreground">DANCEHALL</Badge>
              <span className="text-sm text-muted-foreground">Modern Caribbean</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-secondary text-secondary-foreground">R&B</Badge>
              <span className="text-sm text-muted-foreground">Soul & Neo-Soul</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-destructive text-destructive-foreground">SOCA</Badge>
              <span className="text-sm text-muted-foreground">Carnival Vibes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-muted text-muted-foreground">HIPHOP</Badge>
              <span className="text-sm text-muted-foreground">Urban Beats</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-border text-foreground">MIX</Badge>
              <span className="text-sm text-muted-foreground">All Genres</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;