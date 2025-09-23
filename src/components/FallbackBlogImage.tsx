import linkupLogo from "@/assets/linkup-logo.png";

interface FallbackBlogImageProps {
  title: string;
  category: string;
  className?: string;
}

export const FallbackBlogImage = ({ title, category, className = "" }: FallbackBlogImageProps) => {
  // Generate different reggae-themed background variations based on category and title
  const getBackgroundVariation = (category: string, title: string) => {
    const safeTitle = title || '';
    const safeCategory = category || '';
    const hash = safeTitle.length + safeCategory.length;
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
      
      // Tropical vibes
      "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500",
      "bg-gradient-to-tr from-lime-500 via-green-500 to-emerald-600",
      "bg-gradient-to-bl from-yellow-400 via-orange-500 to-red-500",
      
      // Deep reggae tones
      "bg-gradient-to-br from-amber-600 via-orange-600 to-red-700",
      "bg-gradient-to-tr from-green-800 via-lime-600 to-yellow-500",
      "bg-gradient-to-bl from-red-700 via-orange-500 to-yellow-400"
    ];
    
    return variations[hash % variations.length];
  };

  const backgroundClass = getBackgroundVariation(category, title);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`w-full h-full ${backgroundClass} flex items-center justify-center p-8`}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Logo */}
        <div className="relative z-10 flex items-center justify-center">
          <img
            src={linkupLogo}
            alt="Link Up Radio"
            className="w-13 h-13 md:w-16 md:h-16 drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
            }}
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-6 left-8 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};