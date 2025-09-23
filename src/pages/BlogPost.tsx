import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import { FallbackBlogImage } from "@/components/FallbackBlogImage";
import { generateInitialBlogPosts } from "@/data/initialBlogPosts";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  date: string;
  readTime: string;
  featured: boolean;
  author: string;
  source?: string;
  sourceUrl?: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Load blog posts from localStorage or generate them
    const savedPosts = localStorage.getItem('linkup-blog-posts');
    let allPosts: BlogPost[];
    
    if (savedPosts) {
      allPosts = JSON.parse(savedPosts);
    } else {
      allPosts = generateInitialBlogPosts();
      localStorage.setItem('linkup-blog-posts', JSON.stringify(allPosts));
    }
    
    setBlogPosts(allPosts);
    
    // Find the specific post
    const foundPost = allPosts.find(p => p.id === id);
    setPost(foundPost || null);
  }, [id]);

  // If no post found, redirect to blog page
  if (blogPosts.length > 0 && !post) {
    return <Navigate to="/blog" replace />;
  }

  // Loading state
  if (!post && blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Music History": return "bg-accent text-accent-foreground";
      case "Artist Spotlight": return "bg-primary text-primary-foreground";
      case "Culture": return "bg-secondary text-secondary-foreground";
      case "Behind the Scenes": return "bg-muted text-muted-foreground";
      case "Seasonal": return "bg-destructive text-destructive-foreground";
      case "Caribbean Culture": return "bg-secondary text-secondary-foreground";
      case "Industry Updates": return "bg-accent text-accent-foreground";
      default: return "bg-border text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/blog" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </Button>

          {/* Article Header */}
          <Card className="overflow-hidden mb-8">
            <div className="relative h-96">
              {post.image && post.image.trim() !== '' ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallbackDiv) {
                      fallbackDiv.style.display = 'block';
                    }
                  }}
                />
              ) : null}
              
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
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className={`mb-4 ${getCategoryColor(post.category)}`}>
                  {post.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-xl text-white/90 mb-4">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Card>

          {/* Article Meta */}
          <div className="mb-8 text-muted-foreground">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-medium">{post.author}</span>
              {post.source && (
                <div className="flex items-center space-x-2">
                  <span>•</span>
                  <span>Source: {post.source}</span>
                  {post.sourceUrl && (
                    <Button variant="ghost" size="sm" asChild className="h-auto p-0">
                      <a 
                        href={post.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">More Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-caribbean transition-all duration-300">
                    <div className="relative h-48">
                      {relatedPost.image && relatedPost.image.trim() !== '' ? (
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallbackDiv) {
                              fallbackDiv.style.display = 'block';
                            }
                          }}
                        />
                      ) : null}
                      
                      <div 
                        style={{ display: (relatedPost.image && relatedPost.image.trim() !== '') ? 'none' : 'block' }}
                        className="absolute inset-0"
                      >
                        <FallbackBlogImage 
                          title={relatedPost.title}
                          category={relatedPost.category}
                          className="w-full h-full"
                        />
                      </div>
                      
                      <Badge 
                        className={`absolute top-3 left-3 ${getCategoryColor(relatedPost.category)}`}
                      >
                        {relatedPost.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
                        <Link to={`/blog/${relatedPost.id}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;