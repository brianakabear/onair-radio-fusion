import { musicNewsTemplates, generateMusicNewsContent } from './musicNewsContent';

export const generateInitialBlogPosts = () => {
  const posts = [];
  const usedTitles = new Set();
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
    "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    // Use fallback for remaining images by setting to null
    null, null, null, null, null, null, null, null, null, null, 
    null, null, null, null, null
  ];

  const authors = [
    "Link Up Radio Team",
    "Marcus Thompson", 
    "Keisha Williams",
    "David Rodriguez",
    "Samantha Clarke",
    "Michael Brown"
  ];

  // Create a pool of all available articles
  const availableArticles = [];
  musicNewsTemplates.forEach(template => {
    template.templates.forEach(article => {
      availableArticles.push({ ...article, category: template.category });
    });
  });

  // Shuffle the available articles to ensure randomness
  const shuffledArticles = [...availableArticles].sort(() => Math.random() - 0.5);

  // Generate 30 unique posts
  for (let i = 0; i < 30 && i < shuffledArticles.length; i++) {
    const article = shuffledArticles[i];
    
    // Skip if we've already used this title
    if (usedTitles.has(article.title)) {
      continue;
    }
    
    usedTitles.add(article.title);
    
    // Create dates going back in time
    const daysBack = i * 2; // One post every 2 days going back
    const postDate = new Date();
    postDate.setDate(postDate.getDate() - daysBack);
    postDate.setHours(postDate.getHours() - (i % 24)); // Spread throughout different hours
    
    const post = {
      id: (1000 + i).toString(),
      title: article.title,
      excerpt: article.excerpt,
      content: generateMusicNewsContent(article),
      category: article.category,
      image: images[i % images.length] || null, // null will trigger fallback image
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