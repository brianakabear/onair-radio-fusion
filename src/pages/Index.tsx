import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Music, Users, Calendar, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import RadioPlayer from "@/components/RadioPlayer";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import reggaeImage from "@/assets/reggae-section.jpg";
import hiphopImage from "@/assets/hiphop-section.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-caribbean bg-clip-text text-transparent">
              Tune in to Link Up Radio
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-8 max-w-2xl mx-auto">
              Caribbean Music Unleashed: Embrace the Vibrant Tunes of Reggae, Dancehall, Soca & more
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-caribbean animate-pulse-glow px-8 py-4 text-lg"
              >
                <a
                  href="https://c30.radioboss.fm/u/946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3"
                >
                  <Play className="h-6 w-6" />
                  <span>LISTEN NOW</span>
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Us</span>
                </Link>
              </Button>
            </div>

            {/* Radio Player Widget */}
            <div className="flex justify-center">
              <RadioPlayer />
            </div>
          </div>
        </div>
      </section>

      {/* Music Genres Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Music</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the best of Caribbean and Black American music traditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Reggae/Dancehall/Soca */}
            <Card className="overflow-hidden hover:shadow-caribbean transition-all duration-300 animate-slide-up">
              <div className="relative h-64">
                <img
                  src={reggaeImage}
                  alt="Caribbean Music - Reggae, Dancehall, Soca"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Reggae • Dancehall • Soca
                  </h3>
                  <p className="text-muted-foreground">
                    Caribbean Music Unleashed: Embrace the Vibrant Tunes of Reggae, Dancehall, Soca & more
                  </p>
                </div>
              </div>
            </Card>

            {/* R&B/Hip-Hop/Soul */}
            <Card className="overflow-hidden hover:shadow-caribbean transition-all duration-300 animate-slide-up">
              <div className="relative h-64">
                <img
                  src={hiphopImage}
                  alt="R&B, Hip Hop, Soul Music"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    R&B • Hip Hop • Soul
                  </h3>
                  <p className="text-muted-foreground">
                    Black American music has made immense contributions to the global music landscape
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Shows</h3>
              <p className="text-muted-foreground">24/7 live Caribbean and urban music</p>
            </div>
            
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert DJs</h3>
              <p className="text-muted-foreground">Professional DJs bringing you the best</p>
            </div>
            
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule</h3>
              <p className="text-muted-foreground">Check out our programming schedule</p>
            </div>
            
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="text-muted-foreground">Get in touch for advertising & partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-caribbean">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Advertise with Link Up Radio?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let Link Up Media help you grow your small business with powerful Radio and social media marketing.
            </p>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm"
            >
              <Link to="/contact">
                Contact Us for Media Kit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-caribbean bg-clip-text text-transparent">
                Link Up Radio
              </h3>
              <p className="text-muted-foreground text-sm">
                Your premier destination for Caribbean and urban music worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-muted-foreground hover:text-primary">Home</Link>
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary">About</Link>
                <Link to="/schedule" className="block text-sm text-muted-foreground hover:text-primary">Schedule</Link>
                <Link to="/team" className="block text-sm text-muted-foreground hover:text-primary">Team</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Music</h4>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Reggae</p>
                <p className="text-sm text-muted-foreground">Dancehall</p>
                <p className="text-sm text-muted-foreground">Soca</p>
                <p className="text-sm text-muted-foreground">R&B • Hip Hop • Soul</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary">Contact Form</Link>
                <Link to="/blog" className="block text-sm text-muted-foreground hover:text-primary">Blog</Link>
                <p className="text-sm text-muted-foreground">Media Kit Available</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Link Up Radio. All rights reserved. Streaming Caribbean music worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;