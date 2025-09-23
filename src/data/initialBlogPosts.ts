import { musicNewsTemplates, generateMusicNewsContent } from './musicNewsContent';

export const generateInitialBlogPosts = () => {
  const posts = [];
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

  const authors = [
    "Link Up Radio Team",
    "Marcus Thompson", 
    "Keisha Williams",
    "David Rodriguez",
    "Samantha Clarke",
    "Michael Brown"
  ];

  // Generate 30 posts
  for (let i = 0; i < 30; i++) {
    const randomTemplate = musicNewsTemplates[Math.floor(Math.random() * musicNewsTemplates.length)];
    const randomArticle = randomTemplate.templates[Math.floor(Math.random() * randomTemplate.templates.length)];
    
    // Create dates going back in time
    const daysBack = i * 2; // One post every 2 days going back
    const postDate = new Date();
    postDate.setDate(postDate.getDate() - daysBack);
    postDate.setHours(postDate.getHours() - (i % 24)); // Spread throughout different hours
    
    const post = {
      id: (1000 + i).toString(),
      title: randomArticle.title,
      excerpt: randomArticle.excerpt,
      content: generateMusicNewsContent(randomArticle),
      category: randomTemplate.category,
      image: images[i % images.length],
      date: postDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: `${Math.floor(Math.random() * 8) + 3} min read`,
      featured: i === 0, // Only first post is featured
      author: authors[i % authors.length]
    };
    
    posts.push(post);
  }
  
  return posts;
};