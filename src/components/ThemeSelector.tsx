import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme, themes, type ThemeOption } from '@/contexts/ThemeContext';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(themes).map(([key, themeData]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key as ThemeOption)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className={theme === key ? 'font-semibold' : ''}>{themeData.name}</span>
            <div className="flex space-x-1">
              {themeData.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-border/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;