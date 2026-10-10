// Fallback artwork is generated in CSS; no logo image is drawn on it.

interface FallbackBlogImageProps {
  title: string;
  category: string;
  id?: string;
  excerpt?: string;
  className?: string;
}

export const FallbackBlogImage = ({ title, category, id, excerpt, className = "" }: FallbackBlogImageProps) => {
  // Generate different landscape background variations based on all story properties
  const getBackgroundVariation = (category: string, title: string, id?: string, excerpt?: string) => {
    const safeTitle = title || '';
    const safeCategory = category || '';
    const safeId = id || '';
    const safeExcerpt = excerpt || '';
    
    // Create a comprehensive hash using all available story properties
    const titleHash = safeTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const categoryHash = safeCategory.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const idHash = safeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const excerptHash = safeExcerpt.slice(0, 20).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const hash = titleHash + categoryHash * 2 + idHash * 3 + excerptHash * 4 + safeTitle.length * 5;
    
    const variations = [
      // Tropical paradise landscapes
      "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600",
      "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600",
      "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600",
      "bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600",
      
      // Caribbean sunset horizons
      "bg-gradient-to-r from-orange-400 via-red-500 to-pink-600",
      "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600",
      "bg-gradient-to-r from-amber-400 via-orange-500 to-pink-600",
      "bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600",
      
      // Ocean and sky blends
      "bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600",
      "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600",
      "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600",
      "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600",
      
      // Rasta-inspired landscapes
      "bg-gradient-to-r from-red-500 via-yellow-400 to-green-500",
      "bg-gradient-to-r from-green-500 via-yellow-400 to-red-500",
      "bg-gradient-to-r from-yellow-400 via-red-500 to-green-600",
      "bg-gradient-to-r from-green-600 via-red-500 to-yellow-400",
      
      // Exotic rainforest themes
      "bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400",
      "bg-gradient-to-r from-green-700 via-emerald-500 to-teal-400",
      "bg-gradient-to-r from-teal-600 via-green-500 to-yellow-400",
      "bg-gradient-to-r from-lime-600 via-emerald-500 to-cyan-400",
      
      // Volcanic and earth tones
      "bg-gradient-to-r from-slate-600 via-gray-500 to-orange-500",
      "bg-gradient-to-r from-stone-600 via-amber-500 to-red-500",
      "bg-gradient-to-r from-gray-600 via-slate-500 to-yellow-500",
      "bg-gradient-to-r from-zinc-600 via-stone-500 to-orange-500",
      
      // Mystical and dreamy
      "bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400",
      "bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400",
      "bg-gradient-to-r from-violet-500 via-fuchsia-400 to-pink-400",
      "bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-400",
      
      // Warm tropical evenings
      "bg-gradient-to-r from-amber-600 via-orange-500 to-rose-400",
      "bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400",
      "bg-gradient-to-r from-red-600 via-orange-500 to-amber-400",
      "bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400"
    ];
    
    return variations[hash % variations.length];
  };

  // Generate landscape-oriented decorative elements
  const getLandscapePattern = (id?: string, title?: string) => {
    if (!id || !title) return { elements: [] };
    
    const seed = (id + title).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const elements = [];
    
    // Generate horizontal landscape elements
    const count = 6 + (seed % 8); // More elements for landscape
    for (let i = 0; i < count; i++) {
      const x = 5 + ((seed * (i + 1)) % 90); // More horizontal spread
      const y = 20 + ((seed * (i + 2)) % 60); // Keep in middle area
      const width = 8 + ((seed * (i + 3)) % 16); // Wider elements
      const height = 2 + ((seed * (i + 4)) % 6); // Shorter elements
      const opacity = 15 + ((seed * (i + 5)) % 25);
      const rotation = -15 + ((seed * (i + 6)) % 30);
      
      elements.push({ x, y, width, height, opacity, rotation, delay: i * 150 });
    }
    
    return { elements };
  };

  const backgroundClass = getBackgroundVariation(category, title, id, excerpt);
  const landscapePattern = getLandscapePattern(id, title);

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <div className={`w-full h-full ${backgroundClass} flex items-center justify-center`}>
        {/* Landscape atmosphere overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(ellipse_80%_40%_at_50%_60%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        </div>
        
        {/* Unique landscape decorative elements */}
        {landscapePattern.elements.map((element, index) => (
          <div
            key={index}
            className="absolute bg-white/20 rounded-sm animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              opacity: element.opacity / 100,
              transform: `rotate(${element.rotation}deg)`,
              animationDelay: `${element.delay}ms`
            }}
          />
        ))}

        {/* Subtle horizon line effect */}
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/10"></div>
        
        {/* Light rays effect */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              background: `linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)`
            }}
          />
        </div>
      </div>
    </div>
  );
};