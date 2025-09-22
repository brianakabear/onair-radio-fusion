import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Radio, Globe, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-caribbean">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Link Up Radio</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Connecting cultures through music - Your premier destination for Caribbean and urban music worldwide
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Link Up Radio was born from a passion for Caribbean music and culture. We recognized the need for a platform 
                that could bring together the vibrant sounds of the Caribbean with the rich traditions of Black American music, 
                creating a bridge between cultures and communities worldwide.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our mission is simple: to celebrate and promote the incredible diversity of Caribbean and urban music, 
                from the roots of reggae in Jamaica to the modern sounds of dancehall, soca, R&B, hip hop, and soul.
              </p>
              <p className="text-lg text-muted-foreground">
                Broadcasting 24/7, we bring you authentic Caribbean vibes mixed with the best of Black American musical 
                heritage, ensuring that these powerful cultural expressions reach audiences across the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-caribbean transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authentic Music</h3>
                <p className="text-muted-foreground">
                  We celebrate authentic Caribbean and urban sounds, from traditional roots to modern innovations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-caribbean transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
                <p className="text-muted-foreground">
                  Broadcasting worldwide, connecting Caribbean diaspora and music lovers everywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-caribbean transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Radio className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Broadcasting</h3>
                <p className="text-muted-foreground">
                  Professional DJs and high-quality streaming ensure the best listening experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-caribbean transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Love</h3>
                <p className="text-muted-foreground">
                  Building bridges between cultures and supporting artists and communities worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Music Focus */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Musical Heritage</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Caribbean Sounds</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">Reggae</h4>
                    <p className="text-muted-foreground">
                      From Bob Marley's revolutionary messages to modern conscious reggae, we honor the roots and evolution of Jamaica's gift to the world.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Dancehall</h4>
                    <p className="text-muted-foreground">
                      The energetic, bass-heavy evolution of reggae that dominates Caribbean dancefloors and influences global music.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Soca</h4>
                    <p className="text-muted-foreground">
                      Trinidad's carnival music that brings pure joy and celebration, perfect for festivals and good vibes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-secondary">Urban Heritage</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">R&B & Soul</h4>
                    <p className="text-muted-foreground">
                      The emotional depth and vocal excellence that defined generations of Black American musical expression.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Hip Hop</h4>
                    <p className="text-muted-foreground">
                      From the Bronx to the world, celebrating the culture, artistry, and social commentary of hip hop.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Neo-Soul</h4>
                    <p className="text-muted-foreground">
                      Modern soul music that blends traditional elements with contemporary innovation and artistic expression.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;