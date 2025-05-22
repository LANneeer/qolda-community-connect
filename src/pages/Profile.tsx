
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Check, MapPin, Calendar, Star, MessageCircle, User, PencilLine, LogOut, Shield, Bell, Cog } from "lucide-react";

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "I'm a passionate gardener and DIY enthusiast. I love helping my community with my skills and learning new things from others.",
    memberSince: "January 2023",
    skills: ["Gardening", "Home Repair", "Tutoring", "Pet Care"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    completedServices: 27,
    verifiedUser: true
  });
  
  const [profileForm, setProfileForm] = useState({...profile});
  
  const [notifications, setNotifications] = useState({
    messages: true,
    bookings: true,
    serviceUpdates: true,
    marketing: false
  });
  
  const services = [
    {
      id: "1",
      title: "Gardening & Plant Care",
      description: "I offer gardening services including plant care, garden design, and maintenance.",
      category: "Home & Garden",
      status: "active",
      views: 342,
      inquiries: 15
    },
    {
      id: "2",
      title: "Basic Home Repairs",
      description: "I can help with small home repairs, furniture assembly, and basic carpentry.",
      category: "Home Services",
      status: "active",
      views: 187,
      inquiries: 8
    },
    {
      id: "3",
      title: "Math Tutoring for Students",
      description: "Offering math tutoring for middle and high school students. Specializing in algebra and geometry.",
      category: "Education",
      status: "paused",
      views: 96,
      inquiries: 3
    }
  ];
  
  const bookings = [
    {
      id: "b1",
      serviceName: "Garden Cleanup",
      clientName: "Maria Lee",
      date: "May 25, 2025",
      time: "10:00 AM - 12:00 PM",
      status: "confirmed"
    },
    {
      id: "b2",
      serviceName: "Furniture Assembly",
      clientName: "James Wilson",
      date: "May 28, 2025",
      time: "2:00 PM - 4:00 PM",
      status: "pending"
    }
  ];
  
  const reviews = [
    {
      id: "r1",
      clientName: "Sarah Miller",
      rating: 5,
      date: "April 15, 2025",
      comment: "Alex was fantastic! He helped me redesign my entire garden and gave great advice on plant selection. Very knowledgeable and friendly.",
      service: "Garden Design Consultation"
    },
    {
      id: "r2",
      clientName: "Michael Chen",
      rating: 5,
      date: "March 22, 2025",
      comment: "Very professional and skilled. Fixed my cabinet doors quickly and they work perfectly now.",
      service: "Cabinet Repair"
    },
    {
      id: "r3",
      clientName: "Emily Roberts",
      rating: 4,
      date: "February 10, 2025",
      comment: "Great math tutor for my son. Very patient and explains concepts clearly. We'll definitely book more sessions.",
      service: "Math Tutoring"
    }
  ];
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setProfile(profileForm);
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    }, 1000);
  };
  
  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Notification settings updated",
      description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} notifications ${value ? 'enabled' : 'disabled'}.`
    });
  };
  
  const handleServiceStatusUpdate = (id: string, status: string) => {
    // In a real app, this would update the service status in the database
    toast({
      title: "Service status updated",
      description: `Service has been ${status === 'active' ? 'activated' : 'paused'}.`
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-2xl font-heading font-semibold">{profile.name}</h2>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <MapPin className="size-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>
                    
                    {profile.verifiedUser && (
                      <div className="mt-2 flex items-center">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center">
                          <Check className="size-3 mr-1" />
                          Verified Member
                        </Badge>
                      </div>
                    )}
                    
                    <div className="mt-4 text-sm text-muted-foreground flex items-center">
                      <Calendar className="size-4 mr-1" />
                      <span>Member since {profile.memberSince}</span>
                    </div>
                  
                    
                    <Separator className="my-4" />
                    
                    <div className="w-full">
                      <h3 className="font-medium mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/services/new">
                      <PencilLine className="mr-2 size-4" />
                      Create New Service
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/messages">
                      <MessageCircle className="mr-2 size-4" />
                      Messages
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/bookings">
                      <Calendar className="mr-2 size-4" />
                      My Bookings
                    </a>
                  </Button>
                  <Separator className="my-2" />
                  <Button variant="outline" className="w-full justify-start text-destructive">
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          
            {/* Main Content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="profile">
                    <User className="size-4 mr-2 md:mr-0 lg:mr-2" />
                    <span className="hidden md:inline-block">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="services">
                    <PencilLine className="size-4 mr-2 md:mr-0 lg:mr-2" />
                    <span className="hidden md:inline-block">Services</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          Manage your personal information and contact details
                        </CardDescription>
                      </div>
                      {!isEditing && (
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input 
                                id="name" 
                                value={profileForm.name}
                                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input 
                                id="phone" 
                                value={profileForm.phone}
                                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input 
                                id="location" 
                                value={profileForm.location}
                                onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea 
                              id="bio" 
                              rows={4}
                              value={profileForm.bio}
                              onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="skills">Skills (comma-separated)</Label>
                            <Input 
                              id="skills" 
                              value={profileForm.skills.join(", ")}
                              onChange={(e) => setProfileForm({
                                ...profileForm, 
                                skills: e.target.value.split(",").map(skill => skill.trim())
                              })}
                            />
                            <p className="text-xs text-muted-foreground">
                              Add skills that you can offer to your community
                            </p>
                          </div>
                          
                          <div className="flex justify-end gap-4 pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                setIsEditing(false);
                                setProfileForm({...profile});
                              }}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isSaving}>
                              {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                              <p>{profile.name}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                              <p>{profile.email}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                              <p>{profile.phone}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                              <p>{profile.location}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
                            <p>{profile.bio}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Bookings</CardTitle>
                      <CardDescription>
                        Services you're scheduled to provide
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {bookings.length > 0 ? (
                        <div className="space-y-4">
                          {bookings.map((booking) => (
                            <div 
                              key={booking.id} 
                              className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                            >
                              <div>
                                <h3 className="font-medium">{booking.serviceName}</h3>
                                <p className="text-sm text-muted-foreground">
                                  With {booking.clientName} • {booking.date} • {booking.time}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>
                                  {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">No upcoming bookings</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-center border-t pt-6">
                      <Button variant="outline" asChild>
                        <a href="/bookings">View All Bookings</a>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Services Tab */}
                <TabsContent value="services" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-heading font-semibold">My Services</h2>
                    <Button asChild>
                      <a href="/services/new">Create New Service</a>
                    </Button>
                  </div>
                  
                  {services.length > 0 ? (
                    <div className="space-y-4">
                      {services.map((service) => (
                        <Card key={service.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-start gap-2">
                                  <h3 className="text-xl font-medium">{service.title}</h3>
                                  <Badge variant={service.status === "active" ? "default" : "secondary"}>
                                    {service.status === "active" ? "Active" : "Paused"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{service.category}</p>
                                <p className="mb-4">{service.description}</p>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                  <span>{service.views} Views</span>
                                  <span>{service.inquiries} Inquiries</span>
                                </div>
                              </div>
                              <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                                {service.status === "active" ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleServiceStatusUpdate(service.id, "paused")}
                                  >
                                    Pause
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleServiceStatusUpdate(service.id, "active")}
                                  >
                                    Activate
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="py-12">
                          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                            <PencilLine className="size-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No services yet</h3>
                          <p className="text-muted-foreground max-w-md mx-auto mb-6">
                            Create your first service listing to start offering your skills to the community.
                          </p>
                          <Button asChild>
                            <a href="/services/new">Create Your First Service</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
