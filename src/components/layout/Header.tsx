
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, Bell } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Browse Services", href: "/services" },
    { name: "Offer a Service", href: "/services/new" },
    { name: "Community", href: "/community" },
    { name: "How It Works", href: "/how-it-works" },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative size-10 bg-primary rounded-xl flex items-center justify-center text-white font-heading font-bold text-2xl shadow-md shadow-primary/20">
            Q
          </div>
          <span className="font-heading font-semibold text-xl hidden sm:inline-block">
            Qolda
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-foreground/70 hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/notifications" className="p-2 text-foreground/70 hover:text-primary transition-colors rounded-full hover:bg-secondary/50">
            <Bell className="size-5" />
          </Link>
          <Link to="/profile" className="p-2 text-foreground/70 hover:text-primary transition-colors rounded-full hover:bg-secondary/50">
            <User className="size-5" />
          </Link>
          <Button asChild className="hidden md:flex">
            <Link to="/login">Sign In</Link>
          </Button>

          {/* Mobile menu button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                  <Link 
                    to="/" 
                    className="flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="relative size-8 bg-primary rounded-xl flex items-center justify-center text-white font-heading font-bold text-xl">
                      Q
                    </div>
                    <span className="font-heading font-semibold text-lg">Qolda</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="size-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-1 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="py-3 px-4 hover:bg-secondary rounded-lg transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pt-6 border-t">
                  <Button asChild className="w-full">
                    <Link 
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
