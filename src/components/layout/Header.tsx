import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "الرئيسية", path: "/" },
  { name: "من نحن", path: "/about" },
  { name: "خدماتنا", path: "/services" },
  { name: "مشاريعنا", path: "/projects" },
  { name: "فريقنا", path: "/team" },
  { name: "تواصل معنا", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-medium py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105",
              scrolled ? "bg-primary" : "bg-secondary"
            )}>
              <Building2 className={cn(
                "w-7 h-7",
                scrolled ? "text-primary-foreground" : "text-secondary-foreground"
              )} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-2xl font-tajawal font-bold transition-colors duration-300",
                scrolled ? "text-foreground" : "text-white"
              )}>
                الوعل
              </span>
              <span className={cn(
                "text-xs font-cairo transition-colors duration-300",
                scrolled ? "text-muted-foreground" : "text-white/70"
              )}>
                للعقارات والمقاولات
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg font-cairo text-sm transition-all duration-300 relative",
                  location.pathname === link.path
                    ? scrolled
                      ? "text-secondary font-semibold"
                      : "text-secondary font-semibold"
                    : scrolled
                      ? "text-foreground hover:text-secondary hover:bg-muted"
                      : "text-white/90 hover:text-secondary hover:bg-white/10"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 right-0 left-0 h-0.5 bg-secondary rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+96750000000"
              className={cn(
                "flex items-center gap-2 text-sm font-cairo transition-colors duration-300",
                scrolled ? "text-foreground" : "text-white"
              )}
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">+967 5 000 0000</span>
            </a>
            <Button
              variant="secondary"
              className="font-cairo font-semibold shadow-gold hover:scale-105 transition-transform"
              asChild
            >
              <Link to="/contact">احصل على استشارة</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "block px-4 py-3 rounded-lg font-cairo transition-all",
                      location.pathname === link.path
                        ? "bg-secondary text-secondary-foreground font-semibold"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4"
              >
                <Button
                  variant="secondary"
                  className="w-full font-cairo font-semibold"
                  asChild
                >
                  <Link to="/contact">احصل على استشارة مجانية</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
