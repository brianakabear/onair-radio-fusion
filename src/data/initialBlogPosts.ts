import { musicNewsTemplates, generateMusicNewsContent } from './musicNewsContent';
import { realNewsStories, expandMusicNewsTemplates } from './realNewsContent';

export const generateInitialBlogPosts = () => {
  const posts = [];
  const usedTitles = new Set<string>();
  const usedImages = new Set<string>();
  
  // Expanded image pool with more variety
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
    "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=800",
    "https://images.unsplash.com/photo-1487537708572-566e9436f1a0?w=800",
    "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800",
    "https://images.unsplash.com/photo-1558618047-b0c4c688d4d4?w=800",
    "https://images.unsplash.com/photo-1586252077859-c0bbf8b8e4a9?w=800",
    "https://images.unsplash.com/photo-1595020478707-c6748ca6b05a?w=800",
    "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=800",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1549834125-82d3c48159ee?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1567606384843-c13b1c7b329c?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
  ];

  const authors = [
    "Majestic Fyah Radio Team",
    "Marcus Thompson", 
    "Keisha Williams",
    "David Rodriguez",
    "Samantha Clarke",
    "Michael Brown"
  ];

  // Combine original templates with real news stories
  const allTemplates = [...musicNewsTemplates, ...expandMusicNewsTemplates()];
  
  // Create a pool of all available articles from both sources
  const availableArticles: any[] = [];
  allTemplates.forEach(template => {
    template.templates.forEach((article: any) => {
      availableArticles.push({ 
        ...article, 
        category: template.category,
        isRealNews: !!(article as any).source,
        source: (article as any).source || 'Majestic Fyah Radio Team',
        sourceUrl: (article as any).sourceUrl || ''
      });
    });
  });

  // Shuffle the available articles to ensure randomness
  const shuffledArticles = [...availableArticles].sort(() => Math.random() - 0.5);

  // Generate 80 unique posts (30 original + 50 more)
  for (let i = 0; i < 80 && i < shuffledArticles.length; i++) {
    const article = shuffledArticles[i];
    
    // Skip if we've already used this title or a similar one
    if (usedTitles.has(article.title.toLowerCase().trim())) {
      continue;
    }
    
    // Check for title similarity
    let titleToUse = article.title;
    let titleWords = titleToUse.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    let isSimilar = false;
    
    for (const existingTitle of Array.from(usedTitles)) {
      const existingWords = existingTitle.split(/\s+/).filter(word => word.length > 3);
      const commonWords = titleWords.filter(word => existingWords.includes(word));
      const similarity = commonWords.length / Math.max(titleWords.length, existingWords.length);
      
      if (similarity > 0.6) {
        isSimilar = true;
        break;
      }
    }
    
    if (isSimilar) {
      continue; // Skip similar titles
    }
    
    usedTitles.add(titleToUse.toLowerCase().trim());
    
    // Find a unique image or use fallback
    let imageToUse: string | null = null;
    if (images.length > 0) {
      // Find an unused image
      const availableImages = images.filter(img => !usedImages.has(img));
      if (availableImages.length > 0) {
        imageToUse = availableImages[Math.floor(Math.random() * availableImages.length)];
        usedImages.add(imageToUse);
      }
    }
    
    // Create dates between today and 12 days ago
    const today = new Date();
    const twelveAgo = new Date();
    twelveAgo.setDate(today.getDate() - 12);
    
    // Generate random date between today and 12 days ago
    const timeDiff = today.getTime() - twelveAgo.getTime();
    const randomTime = Math.random() * timeDiff;
    const postDate = new Date(twelveAgo.getTime() + randomTime);
    
    // Randomize the hour and minute for more realistic timestamps
    postDate.setHours(Math.floor(Math.random() * 24));
    postDate.setMinutes(Math.floor(Math.random() * 60));
    
    const post = {
      id: (1000 + i).toString(),
      title: titleToUse,
      excerpt: article.excerpt,
      content: article.isRealNews ? article.content : generateMusicNewsContent(article),
      category: article.category,
      image: imageToUse, // Will be unique image or null for fallback
      date: postDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: `${Math.floor(Math.random() * 8) + 3} min read`,
      featured: i === 0, // Only first post is featured
      author: article.isRealNews ? `Based on ${article.source} reporting` : authors[i % authors.length],
      source: article.source || undefined,
      sourceUrl: article.sourceUrl || undefined
    };
    
    posts.push(post);
  }
  
  return posts;
};