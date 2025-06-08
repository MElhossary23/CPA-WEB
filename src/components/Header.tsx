
import { useState, useEffect } from "react";
import { Container } from "./ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkAuth = () => {
      const currentUser = localStorage.getItem("elhossary_currentUser");
      setIsLoggedIn(!!currentUser);
    };

    window.addEventListener("scroll", handleScroll);
    checkAuth();
    window.addEventListener("storage", checkAuth); // Listen for storage events for multi-tab support
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("elhossary_currentUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-4 backdrop-blur-lg",
        {
          "bg-background/80 shadow-sm": isScrolled,
          "bg-transparent": !isScrolled,
        }
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              ElHossary
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  Profile
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="font-medium"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#networks"
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  Networks
                </a>
                <a
                  href="#contact"
                  className="text-foreground/80 hover:text-primary font-medium transition-colors"
                >
                  Contact
                </a>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-6 transition-all duration-300 shadow-sm hover:shadow-md"
                  asChild
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-transform duration-300",
                {
                  "rotate-45 translate-y-2": isMobileMenuOpen,
                }
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-opacity duration-300",
                {
                  "opacity-0": isMobileMenuOpen,
                }
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-transform duration-300",
                {
                  "-rotate-45 -translate-y-2": isMobileMenuOpen,
                }
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden",
            {
              "max-h-64 border-t border-border": isMobileMenuOpen,
              "max-h-0": !isMobileMenuOpen,
            }
          )}
        >
          <nav className="flex flex-col py-4 px-6 space-y-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#networks"
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Networks
                </a>
                <a
                  href="#contact"
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full w-full transition-all duration-300"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
