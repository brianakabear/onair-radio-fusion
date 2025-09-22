import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Music, Users, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of Caribbean Music: From Calypso to Modern Dancehall",
      excerpt: "Explore the rich history of Caribbean music and how it has shaped global culture, from the traditional calypso of Trinidad to the modern dancehall sounds dominating today's charts.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      category: "Music History",
      date: "December 15, 2024",
      readTime: "8 min read",
      featured: true
    },
    {
      id: 2,
      title: "Top 10 Reggae Artists You Need to Know in 2024",
      excerpt: "Discover the rising stars and established legends keeping reggae music alive and thriving in the modern era.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      category: "Artist Spotlight",
      date: "December 12, 2024",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Carnival Season 2024: The Best Soca Releases",
      excerpt: "Get ready for carnival season with our curated list of the hottest soca tracks that will dominate the festivities.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
      category: "Seasonal",
      date: "December 10, 2024",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "The Influence of Hip Hop on Caribbean Music",
      excerpt: "How hip hop culture has influenced and been influenced by Caribbean music, creating new fusion genres and collaborations.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      category: "Culture",
      date: "December 8, 2024",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Behind the Scenes: Life at Link Up Radio",
      excerpt: "Take a peek behind the curtain and see what goes on during a typical day at Link Up Radio studios.",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
      category: "Behind the Scenes",
      date: "December 5, 2024",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Neo-Soul Revival: The New Generation of R&B Artists",
      excerpt: "Examining the resurgence of neo-soul and how young artists are reimagining classic R&B for modern audiences.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      category: "Music Trends",
      date: "December 3, 2024",
      readTime: "6 min read"
    }
  ];

  const categories = [
    { name: "All Posts", count: blogPosts.length, icon: Music },
    { name: "Music History", count: 2, icon: Clock },
    { name: "Artist Spotlight", count: 1, icon: Users },
    { name: "Behind the Scenes", count: 1, icon: Mic },
    { name: "Culture", count: 1, icon: Music },
    { name: "Seasonal", count: 1, icon: Calendar }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Music History": return "bg-accent text-accent-foreground";
      case "Artist Spotlight": return "bg-primary text-primary-foreground";
      case "Culture": return "bg-secondary text-secondary-foreground";
      case "Behind the Scenes": return "bg-muted text-muted-foreground";
      case "Seasonal": return "bg-destructive text-destructive-foreground";
      default: return "bg-border text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-caribbean">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Link Up Radio Blog</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Stay connected with the latest in Caribbean and urban music culture, artist features, and industry insights
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Categories</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Button
                        key={category.name}
                        variant="ghost"
                        className="w-full justify-between hover:bg-primary/10"
                      >
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {/* Featured Post */}
              {blogPosts.filter(post => post.featured).map((post) => (
                <Card key={post.id} className="mb-12 overflow-hidden hover:shadow-caribbean transition-all duration-300">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}
                      >
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge 
                        className={`w-fit mb-4 ${getCategoryColor(post.category)}`}
                      >
                        {post.category}
                      </Badge>
                      <h2 className="text-2xl font-bold mb-4 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/blog/${post.id}`} className="flex items-center space-x-1">
                            <span>Read More</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}

              {/* Regular Posts Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.filter(post => !post.featured).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-caribbean transition-all duration-300 animate-slide-up">
                    <div className="relative h-48">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${post.id}`} className="flex items-center space-x-1">
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="px-8">
                  Load More Posts
                </Button>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest music updates, exclusive content, and behind-the-scenes stories from Link Up Radio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;