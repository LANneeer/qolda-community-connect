
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted py-12">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">How Qolda Works</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Qolda connects people in your community who want to exchange services and skills.
              Learn how to participate and make the most of our platform.
            </p>
          </div>
        </section>
        
        {/* Core Process Steps */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h2 className="font-heading text-3xl font-semibold text-center mb-12">
              The Qolda Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading font-bold text-3xl text-primary">1</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-3">Join the Community</h3>
                <p className="text-muted-foreground">
                  Create your profile, list your skills, and specify the services you can offer to others in your community.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading font-bold text-3xl text-primary">2</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-3">Connect & Communicate</h3>
                <p className="text-muted-foreground">
                  Browse available services or post what you need. Use our messaging system to discuss details with potential service providers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading font-bold text-3xl text-primary">3</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-3">Exchange Services</h3>
                <p className="text-muted-foreground">
                  Arrange to meet, exchange services, and build community connections. After completion, leave a review to help others.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link to="/register">Join Now</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Exchange Types */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="font-heading text-3xl font-semibold text-center mb-6">
              Types of Exchanges
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Qolda supports various ways to exchange services based on your preferences
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">🤝</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-3">Skill Exchange</h3>
                <p className="text-muted-foreground">
                  Trade your skills for other services. For example, exchange gardening help for language lessons.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">💝</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-3">Volunteer Services</h3>
                <p className="text-muted-foreground">
                  Offer your skills to the community for free, building goodwill and strong neighborhood connections.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">💵</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-3">Paid Services</h3>
                <p className="text-muted-foreground">
                  Charge for professional services at rates that are fair and transparent for the community.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust & Safety */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl font-semibold mb-6">
                  Trust & Safety
                </h2>
                <p className="text-muted-foreground mb-6">
                  At Qolda, we prioritize building a safe community where members can exchange services with confidence. 
                  Our platform includes several features to promote trust and security.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m8 12 3 3 6-6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Verified Profiles</h3>
                      <p className="text-sm text-muted-foreground">
                        Optional identity verification to earn a trusted badge on your profile.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m8 12 3 3 6-6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Rating System</h3>
                      <p className="text-sm text-muted-foreground">
                        Transparent reviews and ratings help you choose trusted service providers.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m8 12 3 3 6-6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Secure Messaging</h3>
                      <p className="text-sm text-muted-foreground">
                        All communication is recorded within our platform for security.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m8 12 3 3 6-6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Community Reporting</h3>
                      <p className="text-sm text-muted-foreground">
                        Easy reporting process if you encounter any issues with a service or user.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Trust and safety illustration" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="font-heading text-3xl font-semibold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-medium mb-3">
                  How much does it cost to use Qolda?
                </h3>
                <p className="text-muted-foreground">
                  Qolda is free to join and use for basic service exchange. We believe in building stronger communities through accessible service exchange.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-medium mb-3">
                  Who can offer services on Qolda?
                </h3>
                <p className="text-muted-foreground">
                  Anyone in the community can offer services, from professional skills to casual help. We encourage a diverse range of offerings.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-medium mb-3">
                  How local is the service area?
                </h3>
                <p className="text-muted-foreground">
                  Qolda focuses on your immediate neighborhood and surrounding areas, typically within a 5-mile radius to keep exchanges local.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-medium mb-3">
                  What happens if I'm not satisfied with a service?
                </h3>
                <p className="text-muted-foreground">
                  We encourage open communication first. If issues persist, our community guidelines provide a reporting process for resolution.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-medium mb-3">
                  Can I offer professional services that require licensing?
                </h3>
                <p className="text-muted-foreground">
                  Yes, but you must clearly indicate your professional qualifications and licensing in your profile and service descriptions.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-medium mb-3">
                  How do I build my reputation on the platform?
                </h3>
                <p className="text-muted-foreground">
                  Complete your profile, verify your identity, provide quality services, and accumulate positive reviews to build your community reputation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-primary text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Ready to Join Your Local Service Exchange Network?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Connect with your neighbors, share skills, and strengthen your community today.
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
