import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Music, Users, Mic, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BlogManager } from "@/components/BlogManager";
import { musicNewsTemplates, generateMusicNewsContent } from "@/data/musicNewsContent";
import { generateInitialBlogPosts } from "@/data/initialBlogPosts";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { FallbackBlogImage } from "@/components/FallbackBlogImage";
import { getUsedTitles, findUnusedArticle, generateUniqueTitle, getUsedImages, findUnusedImage, isTitleSimilar } from "@/utils/blogUtils";

const Blog = () => {
  const [showManager, setShowManager] = useState(false);
  const [blogPosts, setBlogPosts] = useState(generateInitialBlogPosts());
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 25;

  // Load saved posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('linkup-blog-posts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Auto-generate content every hour
  useEffect(() => {
    const generateContent = () => {
      // Get current used titles and images
      const usedTitles = getUsedTitles(blogPosts);
      const usedImages = getUsedImages(blogPosts);
      
      // Find an unused article
      const unusedArticle = findUnusedArticle(musicNewsTemplates, usedTitles);
      
      // If no unused article found, don't generate new content
      if (!unusedArticle) {
        console.log('No unused articles available for generation');
        return;
      }
      
      const images = [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", 
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=800",
        "https://images.unsplash.com/photo-1549834125-82d3c48159ee?w=800",
        "https://images.unsplash.com/photo-1567606384843-c13b1c7b329c?w=800",
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800"
      ];
      
      const authors = ["Link Up Radio Team", "Marcus Thompson", "Keisha Williams", "David Rodriguez"];
      
      // Ensure title is unique and not similar
      let uniqueTitle = unusedArticle.title;
      if (isTitleSimilar(uniqueTitle, usedTitles)) {
        uniqueTitle = generateUniqueTitle(uniqueTitle, usedTitles);
      }
      
      // Find a unique image
      const uniqueImage = findUnusedImage(images, usedImages);
      
      const newPost = {
        id: Date.now().toString(),
        title: uniqueTitle,
        excerpt: unusedArticle.excerpt,
        content: generateMusicNewsContent(unusedArticle),
        category: unusedArticle.category,
        image: uniqueImage, // Will be unique image or null for fallback
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        readTime: `${Math.floor(Math.random() * 6) + 3} min read`,
        featured: false,
        author: authors[Math.floor(Math.random() * authors.length)]
      };

      setBlogPosts(prevPosts => {
        const updatedPosts = [newPost, ...prevPosts];
        localStorage.setItem('linkup-blog-posts', JSON.stringify(updatedPosts));
        return updatedPosts;
      });
    };

    // Generate new content every hour
    const interval = setInterval(generateContent, 3600000); // 1 hour
    
    return () => clearInterval(interval);
  }, [blogPosts]); // Add blogPosts as dependency to get updated titles

  const handlePostsUpdate = (newPosts: any[]) => {
    setBlogPosts(newPosts);
    setCurrentPage(1); // Reset to first page when posts are updated
  };

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);
  const featuredPosts = currentPosts.filter(post => post.featured);
  const regularPosts = currentPosts.filter(post => !post.featured);

  const categories = [
    { name: "All Posts", count: blogPosts.length, icon: Music },
    { name: "Music History", count: blogPosts.filter(p => p.category === "Music History").length, icon: Clock },
    { name: "Artist Spotlight", count: blogPosts.filter(p => p.category === "Artist Spotlight").length, icon: Users },
    { name: "Behind the Scenes", count: blogPosts.filter(p => p.category === "Behind the Scenes").length, icon: Mic },
    { name: "Caribbean Culture", count: blogPosts.filter(p => p.category === "Caribbean Culture").length, icon: Music },
    { name: "Industry Updates", count: blogPosts.filter(p => p.category === "Industry Updates").length, icon: Calendar }
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
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <h1 className="text-5xl font-bold text-white mb-6">Link Up Radio Blog</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Stay connected with the latest in Caribbean and urban music culture, artist features, and industry insights
              </p>
            </div>
            <Button
              onClick={() => setShowManager(!showManager)}
              variant="outline"
              className="ml-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4 mr-2" />
              {showManager ? 'Hide' : 'Manage'}
            </Button>
          </div>
        </div>
      </section>

      {showManager && (
        <section className="py-8 bg-card/50">
          <div className="container mx-auto px-4">
            <BlogManager 
              onPostsUpdate={handlePostsUpdate}
              initialPosts={blogPosts}
            />
          </div>
        </section>
      )}

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
              {featuredPosts.map((post) => (
                <Card key={post.id} className="mb-12 overflow-hidden hover:shadow-caribbean transition-all duration-300">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      {post.image && post.image.trim() !== '' ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Hide the broken image and show fallback instead
                            e.currentTarget.style.display = 'none';
                            const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallbackDiv) {
                              fallbackDiv.style.display = 'block';
                            }
                          }}
                        />
                      ) : null}
                      
                      {/* Fallback image - always present but hidden if real image loads */}
                      <div 
                        style={{ display: (post.image && post.image.trim() !== '') ? 'none' : 'block' }}
                        className="absolute inset-0"
                      >
                        <FallbackBlogImage 
                          title={post.title}
                          category={post.category}
                          className="w-full h-full"
                        />
                      </div>
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
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-caribbean transition-all duration-300 animate-slide-up">
                    <div className="relative h-32">
                      {post.image && post.image.trim() !== '' ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Hide the broken image and show fallback instead
                            e.currentTarget.style.display = 'none';
                            const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallbackDiv) {
                              fallbackDiv.style.display = 'block';
                            }
                          }}
                        />
                      ) : null}
                      
                      {/* Fallback image - always present but hidden if real image loads */}
                      <div 
                        style={{ display: (post.image && post.image.trim() !== '') ? 'none' : 'block' }}
                        className="absolute inset-0"
                      >
                        <FallbackBlogImage 
                          title={post.title}
                          category={post.category}
                          className="w-full h-full"
                        />
                      </div>
                      <Badge 
                        className={`absolute top-2 left-2 text-xs ${getCategoryColor(post.category)}`}
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground mb-3 text-xs leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-2.5 w-2.5" />
                            <span className="truncate">{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-2.5 w-2.5" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild className="h-6 w-6 p-0">
                          <Link to={`/blog/${post.id}`}>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="cursor-pointer"
                          />
                        </PaginationItem>
                      )}
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="cursor-pointer"
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
              
              {/* Posts Stats */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, blogPosts.length)} of {blogPosts.length} posts
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