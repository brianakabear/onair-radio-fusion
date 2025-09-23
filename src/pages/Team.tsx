import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, Twitter, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const teamMembers = [
    {
      name: "David 'Squeeze' Annakie",
      role: "Morning Show Host & Media Personality",
      bio: "Veteran broadcaster and media personality bringing authentic Caribbean culture and music to Link Up Radio. Known for his engaging personality and deep connection to the community.",
      specialties: ["Caribbean Culture", "Morning Radio", "Community Connection", "Media Production"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      social: {
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "MC Island",
      role: "Caribbean Mix Host",
      bio: "Your guide through the hottest Caribbean sounds and island culture.",
      specialties: ["Dancehall", "Caribbean Culture", "Island Vibes"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      social: {
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "DJ Smooth",
      role: "Afternoon Soul",
      bio: "Smooth operator bringing you the finest R&B, soul, and neo-soul selections.",
      specialties: ["R&B", "Soul", "Neo-Soul"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      social: {
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "DJ Spice",
      role: "Evening Rhythms",
      bio: "Spicing up your evenings with the hottest soca and carnival vibes.",
      specialties: ["Soca", "Carnival", "Party Vibes"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      social: {
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "DJ Midnight",
      role: "Night Grooves Host",
      bio: "Late night hip hop and urban beats to keep the energy flowing.",
      specialties: ["Hip Hop", "Urban", "Late Night"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      social: {
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "DJ Revolution",
      role: "Soul Power Host",
      bio: "Revolutionary sounds and conscious music that moves your soul.",
      specialties: ["Conscious Hip Hop", "Revolutionary Music", "Social Commentary"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
      social: {
        instagram: "#",
        twitter: "#"
      }
    }
  ];

  const getSpecialtyColor = (specialty: string) => {
    if (specialty.includes("Reggae") || specialty.includes("Conscious")) return "bg-accent text-accent-foreground";
    if (specialty.includes("Dancehall") || specialty.includes("Caribbean")) return "bg-primary text-primary-foreground";
    if (specialty.includes("R&B") || specialty.includes("Soul")) return "bg-secondary text-secondary-foreground";
    if (specialty.includes("Soca") || specialty.includes("Carnival")) return "bg-destructive text-destructive-foreground";
    if (specialty.includes("Hip Hop") || specialty.includes("Urban")) return "bg-muted text-muted-foreground";
    return "bg-border text-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-caribbean">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Our DJ Team</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Meet the passionate voices behind Link Up Radio - bringing you the best Caribbean and urban music 24/7
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover:shadow-caribbean transition-all duration-300 animate-slide-up"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, i) => (
                          <Badge 
                            key={i}
                            className={`text-xs ${getSpecialtyColor(specialty)}`}
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <a 
                            href={member.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} Instagram`}
                          >
                            <Instagram className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a 
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} Twitter`}
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <Music className="h-4 w-4 mr-2" />
                        Listen Live
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Want to Join Our Team?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for passionate DJs and radio personalities who love Caribbean and urban music. 
              If you have the skills and the passion, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Submit Demo
              </Button>
              <Button variant="outline" size="lg">
                View Open Positions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Makes Our DJs Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Music Knowledge</h3>
              <p className="text-muted-foreground">
                Deep understanding of Caribbean and urban music history, culture, and contemporary trends.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cultural Connection</h3>
              <p className="text-muted-foreground">
                Authentic connection to Caribbean and urban cultures, bringing real stories and experiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Excellence</h3>
              <p className="text-muted-foreground">
                Professional broadcasting skills with the ability to engage and entertain global audiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;