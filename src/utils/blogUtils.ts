// Utility functions for blog management and duplicate prevention

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string | null;
  date: string;
  readTime: string;
  featured: boolean;
  author: string;
}

// Get all used titles from existing blog posts
export const getUsedTitles = (posts: BlogPost[]): Set<string> => {
  return new Set(posts.map(post => post.title.toLowerCase().trim()));
};

// Get all used images from existing blog posts
export const getUsedImages = (posts: BlogPost[]): Set<string> => {
  return new Set(posts.map(post => post.image).filter(img => img && img.trim() !== ''));
};

// Check if a title is similar to existing titles
export const isTitleSimilar = (title: string, existingTitles: Set<string>): boolean => {
  const cleanTitle = title.toLowerCase().trim();
  
  // Check for exact matches
  if (existingTitles.has(cleanTitle)) {
    return true;
  }
  
  // Check for similar titles by comparing key words
  const titleWords = cleanTitle.split(/\s+/).filter(word => word.length > 3); // Only significant words
  
  for (const existingTitle of existingTitles) {
    const existingWords = existingTitle.split(/\s+/).filter(word => word.length > 3);
    
    // Calculate similarity based on common significant words
    const commonWords = titleWords.filter(word => existingWords.includes(word));
    const similarity = commonWords.length / Math.max(titleWords.length, existingWords.length);
    
    // If more than 60% of significant words match, consider it similar
    if (similarity > 0.6) {
      return true;
    }
  }
  
  return false;
};

// Check if a title is already used (case-insensitive)
export const isTitleUsed = (title: string, existingTitles: Set<string>): boolean => {
  return existingTitles.has(title.toLowerCase().trim());
};

// Check if an image is already used
export const isImageUsed = (image: string | null, existingImages: Set<string>): boolean => {
  if (!image || image.trim() === '') return false;
  return existingImages.has(image);
};

// Find an unused article from available templates
export const findUnusedArticle = (templates: any[], usedTitles: Set<string>): any | null => {
  // Create a pool of all available articles
  const availableArticles = [];
  templates.forEach(template => {
    template.templates.forEach((article: any) => {
      availableArticles.push({ ...article, category: template.category });
    });
  });

  // Shuffle to get random selection
  const shuffledArticles = [...availableArticles].sort(() => Math.random() - 0.5);

  // Find first unused article that's not similar to existing ones
  for (const article of shuffledArticles) {
    if (!isTitleUsed(article.title, usedTitles) && !isTitleSimilar(article.title, usedTitles)) {
      return article;
    }
  }

  return null; // No unused articles found
};

// Find an unused image from available images
export const findUnusedImage = (images: (string | null)[], usedImages: Set<string>): string | null => {
  const availableImages = images.filter(img => img && !isImageUsed(img, usedImages));
  
  if (availableImages.length === 0) {
    return null; // No unused images available, will use fallback
  }
  
  return availableImages[Math.floor(Math.random() * availableImages.length)];
};

// Generate a unique variation of a title if needed
export const generateUniqueTitle = (baseTitle: string, usedTitles: Set<string>): string => {
  if (!isTitleUsed(baseTitle, usedTitles) && !isTitleSimilar(baseTitle, usedTitles)) {
    return baseTitle;
  }

  const variations = [
    `${baseTitle}: An In-Depth Look`,
    `${baseTitle} - Caribbean Perspective`,
    `${baseTitle}: Latest Updates`, 
    `${baseTitle} - What You Need to Know`,
    `${baseTitle}: Behind the Scenes`,
    `${baseTitle} - Artist Focus`,
    `${baseTitle}: Community Impact`,
    `${baseTitle} - Cultural Analysis`,
    `${baseTitle}: Monthly Roundup`,
    `${baseTitle} - Industry Insights`,
    `${baseTitle}: Featured Story`,
    `${baseTitle} - Exclusive Coverage`
  ];

  for (const variation of variations) {
    if (!isTitleUsed(variation, usedTitles) && !isTitleSimilar(variation, usedTitles)) {
      return variation;
    }
  }

  // If all variations are used, add timestamp
  return `${baseTitle} - ${new Date().getTime()}`;
};