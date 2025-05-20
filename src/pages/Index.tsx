
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/services/ServiceCard";
import CategoryCard from "@/components/services/CategoryCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { categories, services, communityStats } from "@/data/mockData";
import { Search, MapPin, ArrowRight, Users } from "lucide-react";

export default function Index() {
  const featuredServices = services.slice(0, 4);
  const displayedCategories = categories.slice(0, 8);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Exchange Services Within Your Community
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-md">
                  Connect with neighbors, share skills, and build a stronger local community through service exchange.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                    <Link to="/services">Find Services</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                    <Link to="/services/new">Offer a Service</Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <img 
                  src="/placeholder.svg" 
                  alt="Community members exchanging services" 
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>
        
        {/* Search Section */}
        <section className="py-12 relative z-10">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-3xl -mt-16 shadow-lg relative z-20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <input 
                      type="text" 
                      placeholder="What service are you looking for?" 
                      className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background"
                    />
                  </div>
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <input 
                      type="text" 
                      placeholder="Your neighborhood or zip code" 
                      className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background"
                    />
                  </div>
                  <Button className="h-12 px-6">Search</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-heading text-3xl font-semibold">Service Categories</h2>
                <p className="text-muted-foreground mt-2">Explore services by category</p>
              </div>
              <Link to="/services" className="flex items-center text-primary hover:underline">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {displayedCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Services Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-heading text-3xl font-semibold">Featured Services</h2>
                <p className="text-muted-foreground mt-2">Recently added services in your area</p>
              </div>
              <Link to="/services" className="flex items-center text-primary hover:underline">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Community Stats Section */}
        <section className="py-12 bg-gradient-to-r from-secondary/10 to-secondary/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-semibold">Our Community Impact</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Together we're building stronger community connections through local service exchange
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-heading text-3xl font-bold">{communityStats.totalMembers.toLocaleString()}</div>
                  <p className="text-muted-foreground">Community Members</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <div className="font-heading text-3xl font-bold">{communityStats.activeServices.toLocaleString()}</div>
                  <p className="text-muted-foreground">Active Services</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 6.1H3" />
                      <path d="M21 12.1H3" />
                      <path d="M15.1 18H3" />
                    </svg>
                  </div>
                  <div className="font-heading text-3xl font-bold">{communityStats.completedExchanges.toLocaleString()}</div>
                  <p className="text-muted-foreground">Completed Exchanges</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="font-heading text-3xl font-bold">{communityStats.neighborhoodsServed}</div>
                  <p className="text-muted-foreground">Neighborhoods Served</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-semibold">How Qolda Works</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Exchange services with your community in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-2xl text-primary">1</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-2">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Sign up and create your profile listing your skills, interests, and service offerings.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-2xl text-primary">2</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-2">Connect Locally</h3>
                <p className="text-muted-foreground">
                  Browse services in your neighborhood or post what you're looking for.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-2xl text-primary">3</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-2">Exchange Services</h3>
                <p className="text-muted-foreground">
                  Arrange meetups, exchange services, and build community connections.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link to="/register">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-semibold">Community Testimonials</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Hear from members who have connected through Qolda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <img src="/placeholder.svg" alt="User" className="w-12 h-12 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">Riverdale, CA</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground mb-4">
                    "Through Qolda, I found an amazing math tutor for my daughter and in exchange, I offered gardening advice. It's been a wonderful way to connect with neighbors!"
                  </p>
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <img src="/placeholder.svg" alt="User" className="w-12 h-12 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-medium">Michael Chen</h3>
                      <p className="text-sm text-muted-foreground">Riverdale, CA</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground mb-4">
                    "I moved to the neighborhood recently and Qolda helped me meet amazing people while getting help setting up my home. Now I offer web development services in return!"
                  </p>
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <img src="/placeholder.svg" alt="User" className="w-12 h-12 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-medium">Lakisha Williams</h3>
                      <p className="text-sm text-muted-foreground">Riverdale, CA</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground mb-4">
                    "Our community garden project would never have happened without Qolda connecting us with experienced gardeners. Now we share produce with the entire neighborhood!"
                  </p>
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Connect With Your Community?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join Qolda today and start exchanging services with your neighbors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/register">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
