import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getUsedTitles, isTitleUsed, isTitleSimilar } from "@/utils/blogUtils";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  author: string;
}

interface BlogManagerProps {
  onPostsUpdate: (posts: BlogPost[]) => void;
  initialPosts: BlogPost[];
}

export const BlogManager = ({ onPostsUpdate, initialPosts }: BlogManagerProps) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Music News',
    image: '',
    author: 'Majestic Fyah Radio Team',
    featured: false
  });

  const { toast } = useToast();

  const musicCategories = [
    'Music News',
    'Caribbean Culture',
    'Artist Spotlight',
    'Album Reviews',
    'Industry Updates',
    'Festival News',
    'Behind the Scenes',
    'Music Technology',
    'Community Events',
    'DJ Features'
  ];

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const savePost = () => {
    if (!newPost.title || !newPost.excerpt || !newPost.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate or similar titles (only for new posts, not edits)
    if (!editingPost) {
      const usedTitles = getUsedTitles(posts);
      if (isTitleUsed(newPost.title!, usedTitles)) {
        toast({
          title: "Error",
          description: "A post with this title already exists. Please choose a different title.",
          variant: "destructive",
        });
        return;
      }
      
      if (isTitleSimilar(newPost.title!, usedTitles)) {
        toast({
          title: "Error", 
          description: "A similar title already exists. Please choose a more unique title.",
          variant: "destructive",
        });
        return;
      }
    }

    const postToSave: BlogPost = {
      id: editingPost?.id || generateId(),
      title: newPost.title!,
      excerpt: newPost.excerpt!,
      content: newPost.content!,
      category: newPost.category || 'Music News',
      image: newPost.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: calculateReadTime(newPost.content!),
      featured: newPost.featured || false,
      author: newPost.author || 'Majestic Fyah Radio Team'
    };

    let updatedPosts;
    if (editingPost) {
      updatedPosts = posts.map(post => 
        post.id === editingPost.id ? postToSave : post
      );
    } else {
      updatedPosts = [postToSave, ...posts];
    }

    setPosts(updatedPosts);
    onPostsUpdate(updatedPosts);
    
    // Save to localStorage
    localStorage.setItem('linkup-blog-posts', JSON.stringify(updatedPosts));
    
    setIsEditing(false);
    setEditingPost(null);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      category: 'Music News',
      image: '',
      author: 'Majestic Fyah Radio Team',
      featured: false
    });

    toast({
      title: "Success",
      description: editingPost ? "Post updated!" : "New post created!",
    });
  };

  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    onPostsUpdate(updatedPosts);
    localStorage.setItem('linkup-blog-posts', JSON.stringify(updatedPosts));
    
    toast({
      title: "Success",
      description: "Post deleted!",
    });
  };

  const editPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({ ...post });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingPost(null);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      category: 'Music News',
      image: '',
      author: 'Majestic Fyah Radio Team',
      featured: false
    });
  };

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('linkup-blog-posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      setPosts(parsedPosts);
      onPostsUpdate(parsedPosts);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button 
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title *</label>
              <Input
                value={newPost.title || ''}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Enter post title..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                {musicCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Excerpt *</label>
              <Textarea
                value={newPost.excerpt || ''}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                placeholder="Brief description of the post..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Content *</label>
              <Textarea
                value={newPost.content || ''}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Write your full post content here..."
                rows={8}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Image URL</label>
              <Input
                value={newPost.image || ''}
                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={newPost.featured || false}
                onChange={(e) => setNewPost({ ...newPost, featured: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured Post
              </label>
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button onClick={savePost} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{editingPost ? 'Update' : 'Save'} Post</span>
              </Button>
              <Button variant="outline" onClick={cancelEdit} className="flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Posts ({posts.length})</h3>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant={post.featured ? "default" : "secondary"}>
                      {post.category}
                    </Badge>
                    {post.featured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                  </div>
                  <h4 className="font-semibold mb-1">{post.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </span>
                    <span>{post.readTime}</span>
                    <span>by {post.author}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editPost(post)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePost(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};