import linkupLogo from "@/assets/linkup-logo.png";

interface FallbackBlogImageProps {
  title: string;
  category: string;
  id?: string;
  className?: string;
}

export const FallbackBlogImage = ({ title, category, id, className = "" }: FallbackBlogImageProps) => {
  // Generate different reggae-themed background variations based on category, title, and id
  const getBackgroundVariation = (category: string, title: string, id?: string) => {
    const safeTitle = title || '';
    const safeCategory = category || '';
    const safeId = id || '';
    // Create a more unique hash using multiple string properties
    const hash = safeTitle.length + safeCategory.length + safeId.length + 
                 (safeTitle.charCodeAt(0) || 0) + (safeId.charCodeAt(safeId.length - 1) || 0);
    
    const variations = [
      // Rasta colors combinations
      "bg-gradient-to-br from-red-600 via-yellow-500 to-green-600",
      "bg-gradient-to-tr from-green-700 via-yellow-400 to-red-500", 
      "bg-gradient-to-bl from-yellow-500 via-green-600 to-red-600",
      "bg-gradient-to-tl from-red-500 via-green-600 to-yellow-500",
      
      // Caribbean sunset variations
      "bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600",
      "bg-gradient-to-tr from-blue-600 via-teal-500 to-green-500",
      "bg-gradient-to-bl from-purple-600 via-blue-500 to-teal-500",
      "bg-gradient-to-tl from-teal-600 via-purple-500 to-orange-500",
      
      // Tropical vibes
      "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500",
      "bg-gradient-to-tr from-lime-500 via-green-500 to-emerald-600",
      "bg-gradient-to-bl from-yellow-400 via-orange-500 to-red-500",
      "bg-gradient-to-tl from-cyan-500 via-emerald-500 to-lime-600",
      
      // Deep reggae tones
      "bg-gradient-to-br from-amber-600 via-orange-600 to-red-700",
      "bg-gradient-to-tr from-green-800 via-lime-600 to-yellow-500",
      "bg-gradient-to-bl from-red-700 via-orange-500 to-yellow-400",
      "bg-gradient-to-tl from-yellow-600 via-amber-500 to-red-600",
      
      // Exotic combinations
      "bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500",
      "bg-gradient-to-tr from-rose-500 via-orange-400 to-amber-400",
      "bg-gradient-to-bl from-emerald-700 via-cyan-600 to-blue-500",
      "bg-gradient-to-tl from-violet-600 via-fuchsia-500 to-rose-400",
      
      // Ocean themes
      "bg-gradient-to-br from-blue-700 via-cyan-500 to-teal-400",
      "bg-gradient-to-tr from-slate-600 via-blue-500 to-cyan-400",
      "bg-gradient-to-bl from-sky-600 via-blue-400 to-indigo-500",
      "bg-gradient-to-tl from-teal-700 via-emerald-500 to-green-400"
    ];
    
    return variations[hash % variations.length];
  };

  // Generate unique decorative pattern based on id
  const getDecorativePattern = (id?: string) => {
    if (!id) return { positions: [], sizes: [] };
    
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const positions = [];
    const sizes = [];
    
    // Generate 4-8 decorative elements with unique positions and sizes
    const count = 4 + (seed % 5);
    for (let i = 0; i < count; i++) {
      const x = 10 + ((seed * (i + 1)) % 80);
      const y = 10 + ((seed * (i + 2)) % 80);
      const size = 1 + ((seed * (i + 3)) % 3);
      const opacity = 20 + ((seed * (i + 4)) % 20);
      
      positions.push({ x, y, size, opacity, delay: i * 200 });
    }
    
    return { positions };
  };

  const backgroundClass = getBackgroundVariation(category, title, id);
  const decorativePattern = getDecorativePattern(id);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`w-full h-full ${backgroundClass} flex items-center justify-center p-8`}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        {/* Unique decorative elements based on id */}
        {decorativePattern.positions.map((pos, index) => (
          <div
            key={index}
            className={`absolute bg-white/30 rounded-full animate-pulse`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${pos.size * 4}px`,
              height: `${pos.size * 4}px`,
              opacity: pos.opacity / 100,
              animationDelay: `${pos.delay}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};