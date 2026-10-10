import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeOption = 'caribbean-light' | 'caribbean' | 'ocean' | 'sunset' | 'nature' | 'electric' | 'pastel' | 'cream' | 'mint' | 'lavender' | 'coral';

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
  'caribbean-light': {
    name: 'Caribbean Light',
    colors: ['hsl(0 70% 45%)', 'hsl(45 90% 45%)', 'hsl(140 60% 40%)'], // Red, Yellow, Green on white
  },
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
  pastel: {
    name: 'Pastel',
    colors: ['hsl(220 30% 75%)', 'hsl(300 25% 80%)', 'hsl(160 25% 75%)'], // Soft Blue, Pink, Green
  },
  cream: {
    name: 'Cream',
    colors: ['hsl(45 35% 80%)', 'hsl(25 40% 75%)', 'hsl(60 30% 85%)'], // Warm Cream, Peach, Light Yellow
  },
  mint: {
    name: 'Mint',
    colors: ['hsl(150 25% 75%)', 'hsl(180 20% 80%)', 'hsl(120 20% 85%)'], // Soft Mint, Sage, Light Green
  },
  lavender: {
    name: 'Lavender',
    colors: ['hsl(260 25% 80%)', 'hsl(280 20% 85%)', 'hsl(240 30% 75%)'], // Soft Lavender, Light Purple, Periwinkle
  },
  coral: {
    name: 'Coral',
    colors: ['hsl(15 35% 75%)', 'hsl(35 30% 80%)', 'hsl(350 25% 80%)'], // Light Coral, Peach, Soft Pink
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeOption>(() => {
    const saved = localStorage.getItem('linkup-theme');
    return (saved as ThemeOption) || 'caribbean-light';
  });

  useEffect(() => {
    localStorage.setItem('linkup-theme', theme);
    
    // Apply theme to CSS custom properties
    const root = document.documentElement;
    const themeColors = themes[theme];
    
    // Update primary, secondary, and accent colors based on theme
    switch (theme) {
      case 'caribbean-light':
        root.style.setProperty('--primary', '0 70% 45%');
        root.style.setProperty('--secondary', '45 90% 45%');
        root.style.setProperty('--accent', '140 60% 40%');
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 10%');
        root.style.setProperty('--card', '0 0% 98%');
        root.style.setProperty('--card-foreground', '0 0% 15%');
        root.style.setProperty('--muted', '0 0% 96%');
        root.style.setProperty('--muted-foreground', '0 0% 45%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(0 70% 45%), hsl(45 90% 45%), hsl(140 60% 40%))');
        break;
      case 'caribbean':
        root.style.setProperty('--primary', '0 65% 55%');
        root.style.setProperty('--secondary', '45 90% 50%');
        root.style.setProperty('--accent', '140 60% 40%');
        root.style.setProperty('--background', '240 10% 3.9%');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--card', '240 10% 3.9%');
        root.style.setProperty('--card-foreground', '0 0% 98%');
        root.style.setProperty('--muted', '240 3.7% 15.9%');
        root.style.setProperty('--muted-foreground', '240 5% 64.9%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(0 65% 55%), hsl(45 90% 50%), hsl(140 60% 40%))');
        break;
      case 'ocean':
        root.style.setProperty('--primary', '200 80% 50%');
        root.style.setProperty('--secondary', '180 70% 45%');
        root.style.setProperty('--accent', '220 60% 40%');
        root.style.setProperty('--background', '240 10% 3.9%');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--card', '240 10% 3.9%');
        root.style.setProperty('--card-foreground', '0 0% 98%');
        root.style.setProperty('--muted', '240 3.7% 15.9%');
        root.style.setProperty('--muted-foreground', '240 5% 64.9%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(200 80% 50%), hsl(180 70% 45%), hsl(220 60% 40%))');
        break;
      case 'sunset':
        root.style.setProperty('--primary', '15 85% 55%');
        root.style.setProperty('--secondary', '35 90% 50%');
        root.style.setProperty('--accent', '320 70% 45%');
        root.style.setProperty('--background', '240 10% 3.9%');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--card', '240 10% 3.9%');
        root.style.setProperty('--card-foreground', '0 0% 98%');
        root.style.setProperty('--muted', '240 3.7% 15.9%');
        root.style.setProperty('--muted-foreground', '240 5% 64.9%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(15 85% 55%), hsl(35 90% 50%), hsl(320 70% 45%))');
        break;
      case 'nature':
        root.style.setProperty('--primary', '120 50% 40%');
        root.style.setProperty('--secondary', '85 60% 45%');
        root.style.setProperty('--accent', '30 40% 35%');
        root.style.setProperty('--background', '240 10% 3.9%');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--card', '240 10% 3.9%');
        root.style.setProperty('--card-foreground', '0 0% 98%');
        root.style.setProperty('--muted', '240 3.7% 15.9%');
        root.style.setProperty('--muted-foreground', '240 5% 64.9%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(120 50% 40%), hsl(85 60% 45%), hsl(30 40% 35%))');
        break;
      case 'electric':
        root.style.setProperty('--primary', '270 80% 55%');
        root.style.setProperty('--secondary', '300 70% 50%');
        root.style.setProperty('--accent', '190 90% 50%');
        root.style.setProperty('--background', '240 10% 3.9%');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--card', '240 10% 3.9%');
        root.style.setProperty('--card-foreground', '0 0% 98%');
        root.style.setProperty('--muted', '240 3.7% 15.9%');
        root.style.setProperty('--muted-foreground', '240 5% 64.9%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(270 80% 55%), hsl(300 70% 50%), hsl(190 90% 50%))');
        break;
      case 'pastel':
        root.style.setProperty('--primary', '220 30% 65%');
        root.style.setProperty('--secondary', '300 25% 70%');
        root.style.setProperty('--accent', '160 25% 65%');
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 10%');
        root.style.setProperty('--card', '0 0% 98%');
        root.style.setProperty('--card-foreground', '0 0% 15%');
        root.style.setProperty('--muted', '0 0% 96%');
        root.style.setProperty('--muted-foreground', '0 0% 45%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(220 30% 65%), hsl(300 25% 70%), hsl(160 25% 65%))');
        break;
      case 'cream':
        root.style.setProperty('--primary', '45 35% 60%');
        root.style.setProperty('--secondary', '25 40% 65%');
        root.style.setProperty('--accent', '60 30% 70%');
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 10%');
        root.style.setProperty('--card', '45 20% 98%');
        root.style.setProperty('--card-foreground', '0 0% 15%');
        root.style.setProperty('--muted', '45 15% 96%');
        root.style.setProperty('--muted-foreground', '0 0% 45%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(45 35% 60%), hsl(25 40% 65%), hsl(60 30% 70%))');
        break;
      case 'mint':
        root.style.setProperty('--primary', '150 25% 65%');
        root.style.setProperty('--secondary', '180 20% 70%');
        root.style.setProperty('--accent', '120 20% 75%');
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 10%');
        root.style.setProperty('--card', '150 10% 98%');
        root.style.setProperty('--card-foreground', '0 0% 15%');
        root.style.setProperty('--muted', '150 8% 96%');
        root.style.setProperty('--muted-foreground', '0 0% 45%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(150 25% 65%), hsl(180 20% 70%), hsl(120 20% 75%))');
        break;
      case 'lavender':
        root.style.setProperty('--primary', '260 25% 65%');
        root.style.setProperty('--secondary', '280 20% 70%');
        root.style.setProperty('--accent', '240 30% 65%');
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 10%');
        root.style.setProperty('--card', '260 10% 98%');
        root.style.setProperty('--card-foreground', '0 0% 15%');
        root.style.setProperty('--muted', '260 8% 96%');
        root.style.setProperty('--muted-foreground', '0 0% 45%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(260 25% 65%), hsl(280 20% 70%), hsl(240 30% 65%))');
        break;
      case 'coral':
        root.style.setProperty('--primary', '15 35% 65%');
        root.style.setProperty('--secondary', '35 30% 70%');
        root.style.setProperty('--accent', '350 25% 70%');
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 10%');
        root.style.setProperty('--card', '15 10% 98%');
        root.style.setProperty('--card-foreground', '0 0% 15%');
        root.style.setProperty('--muted', '15 8% 96%');
        root.style.setProperty('--muted-foreground', '0 0% 45%');
        root.style.setProperty('--gradient-caribbean', 'linear-gradient(135deg, hsl(15 35% 65%), hsl(35 30% 70%), hsl(350 25% 70%))');
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