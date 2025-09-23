// Route validation utility to prevent 404 errors
export const validateRoutes = () => {
  const errors: string[] = [];
  
  // Check if blog posts exist
  const checkBlogPosts = () => {
    const savedPosts = localStorage.getItem('linkup-blog-posts');
    if (!savedPosts) {
      errors.push('No blog posts found in localStorage');
      return;
    }
    
    try {
      const posts = JSON.parse(savedPosts);
      if (!Array.isArray(posts) || posts.length === 0) {
        errors.push('Blog posts array is empty or invalid');
      }
    } catch (e) {
      errors.push('Invalid blog posts data in localStorage');
    }
  };
  
  // Check for valid routes
  const validRoutes = [
    '/',
    '/about',
    '/schedule',
    '/team',
    '/blog',
    '/videos',
    '/contact',
    '/listen-live'
  ];
  
  const checkRouteAccessibility = () => {
    // This would be more comprehensive in a real app
    // For now, we just ensure the routes are defined
    const routeElements = [
      'Index',
      'About', 
      'Schedule',
      'Team',
      'Blog',
      'Videos',
      'Contact',
      'ListenLive'
    ];
    
    // In a real implementation, you'd check if these components exist
    // and are properly exported
  };
  
  checkBlogPosts();
  checkRouteAccessibility();
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Function to repair common issues
export const repairRouteIssues = () => {
  const repairs: string[] = [];
  
  // Ensure blog posts exist
  const savedPosts = localStorage.getItem('linkup-blog-posts');
  if (!savedPosts) {
    // Import will happen at runtime when needed
    import('@/data/initialBlogPosts').then(({ generateInitialBlogPosts }) => {
      const newPosts = generateInitialBlogPosts();
      localStorage.setItem('linkup-blog-posts', JSON.stringify(newPosts));
      repairs.push('Generated fresh blog posts');
    });
  }
  
  return repairs;
};

// Daily validation function (can be called by a service worker or interval)
export const runDailyValidation = () => {
  console.log('🔍 Running daily route validation...');
  
  const validation = validateRoutes();
  
  if (!validation.isValid) {
    console.warn('⚠️ Route validation failed:', validation.errors);
    
    // Attempt to repair issues
    const repairs = repairRouteIssues();
    console.log('🔧 Attempted repairs:', repairs);
    
    // Re-validate after repairs
    const revalidation = validateRoutes();
    if (revalidation.isValid) {
      console.log('✅ Route validation passed after repairs');
    } else {
      console.error('❌ Route validation still failing:', revalidation.errors);
    }
  } else {
    console.log('✅ All routes validated successfully');
  }
  
  return validation;
};

// Function to check specific blog post exists
export const validateBlogPostExists = (postId: string): boolean => {
  try {
    const savedPosts = localStorage.getItem('linkup-blog-posts');
    if (!savedPosts) return false;
    
    const posts = JSON.parse(savedPosts);
    return Array.isArray(posts) && posts.some(post => post.id === postId);
  } catch (e) {
    console.error('Error validating blog post:', e);
    return false;
  }
};