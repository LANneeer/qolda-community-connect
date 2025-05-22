
import { useState, useEffect } from "react";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceFilter from "@/components/services/ServiceFilter";
import { Button } from "@/components/ui/button";
import { services } from "@/data/mockData";
import { Service } from "@/types";
import { Link, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Services() {
  const [searchParams] = useSearchParams();
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [filters, setFilters] = useState({
    searchTerm: "",
    categories: [] as string[],
    pricingType: [] as string[],
  });

  // Handle URL params for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    
    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoryParam],
      }));
      
      // Apply the filter directly
      const filtered = services.filter((service) => service.categoryId === categoryParam);
      setFilteredServices(filtered);
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    
    // Apply filters
    let results = [...services];
    
    // Search term filter
    if (newFilters.searchTerm) {
      const searchLower = newFilters.searchTerm.toLowerCase();
      results = results.filter(
        (service) => 
          service.title.toLowerCase().includes(searchLower) || 
          service.description.toLowerCase().includes(searchLower) ||
          service.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Category filter
    if (newFilters.categories && newFilters.categories.length > 0) {
      results = results.filter(
        (service) => newFilters.categories.includes(service.categoryId)
      );
    }
    
    // Pricing type filter
    if (newFilters.pricingType && newFilters.pricingType.length > 0) {
      results = results.filter(
        (service) => newFilters.pricingType.includes(service.pricingType)
      );
    }
    
    setFilteredServices(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold mb-2">Browse Services</h1>
                <p className="text-muted-foreground">
                  Discover services available in your community
                </p>
              </div>
              <Button asChild className="mt-4 md:mt-0 gap-2">
                <Link to="/services/new">
                  <Plus className="h-4 w-4" />
                  Offer a Service
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Services Content */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters */}
              <div className="lg:col-span-1">
                <ServiceFilter onFilterChange={handleFilterChange} />
              </div>
              
              {/* Services Grid */}
              <div className="lg:col-span-3">
                {filteredServices.length > 0 ? (
                  <>
                    <p className="text-muted-foreground mb-4">
                      Showing {filteredServices.length} services
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="font-heading text-xl mb-2">No services found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button onClick={() => handleFilterChange({})}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      

    </div>
  );
}
