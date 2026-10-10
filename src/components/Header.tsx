import { useState } from "react";
import { Menu, X, Radio, Play, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/majestic-fyah-logo.png";
import ThemeSelector from "@/components/ThemeSelector";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "On Air", href: "/listen-live" },
    { name: "About", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Videos", href: "/videos" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Majestic Fyah Radio" className="h-10 w-10" />
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-caribbean bg-clip-text text-transparent">
              MAJESTIC FYAH
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">RADIO</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href)
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section - Social & Listen Live */}
        <div className="flex items-center space-x-4">
          {/* Theme Selector */}
          <ThemeSelector />
          
          {/* Social Links */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="ghost" size="sm" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </Button>
          </div>

          {/* Listen Live Button */}
          <Button 
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-caribbean animate-pulse-glow"
          >
            <Link
              to="/listen-live"
              className="flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">On Air</span>
              <Radio className="h-4 w-4 animate-pulse" />
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-3 pb-6">
                  <img src={logo} alt="Majestic Fyah Radio" className="h-8 w-8" />
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-caribbean bg-clip-text text-transparent">
                      MAJESTIC FYAH RADIO
                    </h1>
                  </div>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(item.href)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Follow us</span>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" aria-label="Instagram">
                        <Instagram className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" aria-label="Facebook">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" aria-label="YouTube">
                        <Youtube className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;