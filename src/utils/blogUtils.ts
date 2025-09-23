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

// Check if a title is already used (case-insensitive)
export const isTitleUsed = (title: string, existingTitles: Set<string>): boolean => {
  return existingTitles.has(title.toLowerCase().trim());
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

  // Find first unused article
  for (const article of shuffledArticles) {
    if (!isTitleUsed(article.title, usedTitles)) {
      return article;
    }
  }

  return null; // No unused articles found
};

// Generate a unique variation of a title if needed
export const generateUniqueTitle = (baseTitle: string, usedTitles: Set<string>): string => {
  if (!isTitleUsed(baseTitle, usedTitles)) {
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
    `${baseTitle} - Cultural Analysis`
  ];

  for (const variation of variations) {
    if (!isTitleUsed(variation, usedTitles)) {
      return variation;
    }
  }

  // If all variations are used, add timestamp
  return `${baseTitle} - ${new Date().getTime()}`;
};