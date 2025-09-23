import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeOption = 'caribbean' | 'ocean' | 'sunset' | 'nature' | 'electric';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  caribbean: {
    name: 'Caribbean',
    colors: ['hsl(0 65% 55%)', 'hsl(45 90% 50%)', 'hsl(140 60% 40%)'], // Red, Yellow, Green
  },
  ocean: {
    name: 'Ocean',
    colors: ['hsl(200 80% 50%)', 'hsl(180 70% 45%)', 'hsl(220 60% 40%)'], // Blue, Teal, Navy
  },
  sunset: {
    name: 'Sunset',
    colors: ['hsl(15 85% 55%)', 'hsl(35 90% 50%)', 'hsl(320 70% 45%)'], // Orange, Coral, Pink
  },
  nature: {
    name: 'Nature',
    colors: ['hsl(120 50% 40%)', 'hsl(85 60% 45%)', 'hsl(30 40% 35%)'], // Forest Green, Lime, Brown
  },
  electric: {
    name: 'Electric',
    colors: ['hsl(270 80% 55%)', 'hsl(300 70% 50%)', 'hsl(190 90% 50%)'], // Purple, Magenta, Cyan
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeOption>(() => {
    const saved = localStorage.getItem('linkup-theme');
    return (saved as ThemeOption) || 'caribbean';
  });

  useEffect(() => {
    localStorage.setItem('linkup-theme', theme);
    
    // Apply theme to CSS custom properties
    const root = document.documentElement;
    const themeColors = themes[theme];
    
    // Update primary, secondary, and accent colors based on theme
    switch (theme) {
      case 'caribbean':
        root.style.setProperty('--primary', '0 65% 55%');
        root.style.setProperty('--secondary', '45 90% 50%');
        root.style.setProperty('--accent', '140 60% 40%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(0 65% 55%), hsl(45 90% 50%), hsl(140 60% 40%))');
        break;
      case 'ocean':
        root.style.setProperty('--primary', '200 80% 50%');
        root.style.setProperty('--secondary', '180 70% 45%');
        root.style.setProperty('--accent', '220 60% 40%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(200 80% 50%), hsl(180 70% 45%), hsl(220 60% 40%))');
        break;
      case 'sunset':
        root.style.setProperty('--primary', '15 85% 55%');
        root.style.setProperty('--secondary', '35 90% 50%');
        root.style.setProperty('--accent', '320 70% 45%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(15 85% 55%), hsl(35 90% 50%), hsl(320 70% 45%))');
        break;
      case 'nature':
        root.style.setProperty('--primary', '120 50% 40%');
        root.style.setProperty('--secondary', '85 60% 45%');
        root.style.setProperty('--accent', '30 40% 35%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(120 50% 40%), hsl(85 60% 45%), hsl(30 40% 35%))');
        break;
      case 'electric':
        root.style.setProperty('--primary', '270 80% 55%');
        root.style.setProperty('--secondary', '300 70% 50%');
        root.style.setProperty('--accent', '190 90% 50%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(270 80% 55%), hsl(300 70% 50%), hsl(190 90% 50%))');
        break;
    }
    
    // Update shadow colors to match primary
    root.style.setProperty('--shadow-caribbean', `0 10px 40px -10px hsl(var(--primary) / 0.4)`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};