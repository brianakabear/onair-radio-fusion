import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

interface ClearCacheButtonProps {
  onCacheCleared?: () => void;
}

export const ClearCacheButton = ({ onCacheCleared }: ClearCacheButtonProps) => {
  const { toast } = useToast();

  const clearCache = () => {
    localStorage.removeItem('linkup-blog-posts');
    
    toast({
      title: "Cache Cleared",
      description: "Blog cache cleared successfully. Page will refresh to load all 80 stories.",
      duration: 2000,
    });

    // Refresh the page to reload with fresh data
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <Button
      onClick={clearCache}
      variant="outline"
      size="sm"
      className="text-xs"
    >
      <Trash2 className="h-3 w-3 mr-1" />
      Clear Cache & Reload Stories
    </Button>
  );
};