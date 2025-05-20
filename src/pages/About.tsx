
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalendarCheck, HandshakeIcon, Globe, HeartHandshake, Trophy, UsersRound } from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Sarah founded Qolda with a vision to strengthen communities through skill-sharing and local connections.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David Chen",
      role: "Chief Community Officer",
      bio: "David leads our community engagement efforts, ensuring Qolda serves the needs of diverse communities.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Leila Patel",
      role: "Head of Product",
      bio: "Leila shapes our platform's development, ensuring a seamless experience for all community members.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const values = [
    {
      title: "Community First",
      icon: <UsersRound className="size-8 text-primary" />,
      description: "We believe in the power of local connections to transform neighborhoods and improve lives."
    },
    {
      title: "Inclusivity",
      icon: <Globe className="size-8 text-primary" />,
      description: "Our platform is designed to be accessible and welcoming to people from all backgrounds."
    },
    {
      title: "Mutual Benefit",
      icon: <HeartHandshake className="size-8 text-primary" />,
      description: "We create space for equitable exchanges where everyone's skills are valued."
    },
    {
      title: "Trust & Safety",
      icon: <Trophy className="size-8 text-primary" />,
      description: "We prioritize building a secure environment where community members can connect with confidence."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Qolda</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Connecting communities through service exchange and skill sharing since 2023.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-semibold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Qolda was founded with a simple yet powerful mission: to strengthen local communities 
                  by facilitating the exchange of services and skills between neighbors.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe that everyone has valuable skills to offer, and that by creating a platform 
                  for neighbors to connect and help one another, we can build more resilient, connected,
                  and vibrant communities.
                </p>
                <p className="text-lg text-muted-foreground">
                  Whether it's teaching a skill, offering a helping hand, or sharing expertise, 
                  Qolda makes it easy for community members to connect and contribute to their local area.
                </p>
              </div>
              <div className="bg-muted/20 p-8 rounded-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <CalendarCheck className="size-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Founded</h3>
                    <p>2023</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <UsersRound className="size-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Communities</h3>
                    <p>50+</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <HandshakeIcon className="size-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Exchanges</h3>
                    <p>10,000+</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Trophy className="size-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Satisfaction</h3>
                    <p>98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-heading font-semibold mb-6">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                These core principles guide everything we do at Qolda, from product development to community outreach.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-background p-6 rounded-xl shadow-sm border">
                  <div className="mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-heading font-medium mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-heading font-semibold mb-6">Our Team</h2>
              <p className="text-lg text-muted-foreground">
                Meet the passionate individuals behind Qolda who are dedicated to our mission of community connection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-medium mb-2">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
