
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    Platform: [
      { name: "How It Works", href: "/how-it-works" },
      { name: "Browse Services", href: "/services" },
      { name: "Offer Services", href: "/services/new" },
    ],
    Support: [
      { name: "Help Center", href: "/about" },
      { name: "Terms of Service", href: "/about" },
      { name: "Privacy Policy", href: "/about" },
    ],
  };
  
  return (
    <footer className="bg-muted mt-12">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative size-10 bg-primary rounded-lg flex items-center justify-center text-white font-heading font-bold text-2xl">
                Q
              </div>
              <span className="font-heading font-semibold text-xl">Qolda</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Qolda connects community members to exchange services, share skills, and build stronger local ties through collaboration.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading font-medium text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Qolda. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="text-muted-foreground">
              Follow Us
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
