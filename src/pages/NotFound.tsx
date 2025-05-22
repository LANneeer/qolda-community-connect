
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-heading text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, 
            or never existed in the first place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
