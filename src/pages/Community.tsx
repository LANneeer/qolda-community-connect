
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityStats, categories, services } from "@/data/mockData";

export default function Community() {
  const [activeTab, setActiveTab] = useState("statistics");
  
  const renderPieChart = () => {
    const total = communityStats.topCategories.reduce((acc, cat) => acc + cat.percentage, 0);
    let currentRotation = 0;
    
    return (
      <div className="relative w-60 h-60 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {communityStats.topCategories.map((category, index) => {
            const startAngle = currentRotation;
            const angle = (category.percentage / total) * 360;
            currentRotation += angle;
            const endAngle = currentRotation;
            
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            
            const x1 = 50 + 50 * Math.cos(startRad);
            const y1 = 50 + 50 * Math.sin(startRad);
            const x2 = 50 + 50 * Math.cos(endRad);
            const y2 = 50 + 50 * Math.sin(endRad);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const getColor = () => {
              const colors = [
                "fill-primary", "fill-secondary", "fill-blue-400", 
                "fill-green-400", "fill-purple-400", "fill-yellow-400"
              ];
              return colors[index % colors.length];
            };
            
            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                className={getColor()}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted py-8">
          <div className="container px-4 md:px-6">
            <h1 className="font-heading text-3xl font-bold mb-2">Community Dashboard</h1>
            <p className="text-muted-foreground">
              Explore statistics and insights about our local service exchange network
            </p>
          </div>
        </section>
        
        {/* Dashboard Content */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="statistics" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="neighborhoods">Neighborhoods</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="statistics" className="space-y-8">
                {/* Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-heading text-3xl font-bold mb-1 text-primary">
                        {communityStats.totalMembers.toLocaleString()}
                      </h3>
                      <p className="text-muted-foreground">Community Members</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-heading text-3xl font-bold mb-1 text-primary">
                        {communityStats.activeServices.toLocaleString()}
                      </h3>
                      <p className="text-muted-foreground">Active Services</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-heading text-3xl font-bold mb-1 text-primary">
                        {communityStats.completedExchanges.toLocaleString()}
                      </h3>
                      <p className="text-muted-foreground">Completed Exchanges</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-heading text-3xl font-bold mb-1 text-primary">
                        {communityStats.neighborhoodsServed}
                      </h3>
                      <p className="text-muted-foreground">Neighborhoods Served</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Categories Distribution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-heading text-xl font-semibold mb-6 text-center">
                        Service Categories Distribution
                      </h3>
                      {renderPieChart()}
                      <div className="grid grid-cols-2 gap-2 mt-6">
                        {communityStats.topCategories.map((category) => (
                          <div key={category.name} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-primary`}></div>
                            <span className="text-sm">{category.name} ({category.percentage}%)</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-heading text-xl font-semibold mb-6 text-center">
                        Monthly Service Exchanges
                      </h3>
                      <div className="h-60 flex items-end justify-between gap-1">
                        {communityStats.exchangesByMonth.map((item) => {
                          const height = (item.exchanges / 305) * 100; // normalize to percentage (305 is max value)
                          
                          return (
                            <div key={item.month} className="flex flex-col items-center gap-1">
                              <div 
                                className="w-6 bg-primary rounded-t" 
                                style={{ height: `${height}%` }}
                              ></div>
                              <span className="text-xs">{item.month}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="trends">
                <Card>
                  <CardContent className="p-6 text-center py-12">
                    <h3 className="font-heading text-xl font-semibold mb-4">
                      Trending Skills & Services
                    </h3>
                    <p className="text-muted-foreground">
                      Detailed trend analytics will be available in the next update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="neighborhoods">
                <Card>
                  <CardContent className="p-6 text-center py-12">
                    <h3 className="font-heading text-xl font-semibold mb-4">
                      Neighborhood Activity Map
                    </h3>
                    <p className="text-muted-foreground">
                      Detailed neighborhood analytics will be available in the next update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="leaderboard">
                <Card>
                  <CardContent className="p-6 text-center py-12">
                    <h3 className="font-heading text-xl font-semibold mb-4">
                      Community Leaderboard
                    </h3>
                    <p className="text-muted-foreground">
                      Community leaderboard will be available in the next update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Community Stories Section */}
        <section className="py-8 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="font-heading text-2xl font-semibold mb-6 text-center">
              Community Success Stories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-medium mb-2">
                    Neighborhood Garden Transformation
                  </h3>
                  <p className="text-muted-foreground">
                    "Through Qolda, our community connected with local gardeners to transform an abandoned lot into a thriving community garden that now provides fresh produce to local families."
                  </p>
                  <p className="text-sm mt-4 text-right font-medium">
                    - Riverdale Community Association
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-medium mb-2">
                    Tech Skills Workshop Series
                  </h3>
                  <p className="text-muted-foreground">
                    "What started as individual tech support services on Qolda turned into a regular workshop series teaching digital skills to seniors in our neighborhood."
                  </p>
                  <p className="text-sm mt-4 text-right font-medium">
                    - Downtown Digital Collective
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-medium mb-2">
                    Youth Tutoring Network
                  </h3>
                  <p className="text-muted-foreground">
                    "Qolda helped us build a network of volunteer tutors that has supported over 150 students in our community with homework help and test preparation."
                  </p>
                  <p className="text-sm mt-4 text-right font-medium">
                    - Riverside Education Initiative
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
