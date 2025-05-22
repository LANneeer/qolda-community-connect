
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, MessageCircle, Calendar, Heart, User, Clock, Check, X } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState({
    all: [
      {
        id: 1,
        type: "message",
        title: "New message from Sarah",
        description: "Hi, I'm interested in your gardening service...",
        time: "2 hours ago",
        read: false
      },
      {
        id: 2,
        type: "booking",
        title: "Booking confirmed",
        description: "Your appointment with James for 'Home Repair' has been confirmed",
        time: "Yesterday",
        read: true
      },
      {
        id: 3,
        type: "like",
        title: "Your service was liked",
        description: "Michael liked your 'Piano Lessons' service",
        time: "2 days ago",
        read: true
      },
      {
        id: 4,
        type: "system",
        title: "Profile verified",
        description: "Your profile has been successfully verified",
        time: "3 days ago",
        read: true
      },
      {
        id: 5,
        type: "message",
        title: "New message from David",
        description: "Hello, is your tutoring service still available?",
        time: "4 days ago",
        read: false
      },
      {
        id: 6,
        type: "booking",
        title: "Booking request",
        description: "You have a new booking request from Lisa for 'Dog Walking'",
        time: "5 days ago",
        read: true
      }
    ]
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => ({
      all: prev.all.map(notification => 
        notification.id === id ? {...notification, read: true} : notification
      )
    }));
  };

  const markAllAsRead = () => {
    setNotifications(prev => ({
      all: prev.all.map(notification => ({...notification, read: true}))
    }));
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => ({
      all: prev.all.filter(notification => notification.id !== id)
    }));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case "message":
        return <MessageCircle className="size-5" />;
      case "booking":
        return <Calendar className="size-5" />;
      case "like":
        return <Heart className="size-5" />;
      case "system":
        return <Bell className="size-5" />;
      default:
        return <Bell className="size-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch(type) {
      case "message":
        return "bg-blue-100 text-blue-600";
      case "booking":
        return "bg-green-100 text-green-600";
      case "like":
        return "bg-red-100 text-red-600";
      case "system":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const unreadCount = notifications.all.filter(n => !n.read).length;
  const messages = notifications.all.filter(n => n.type === "message");
  const bookings = notifications.all.filter(n => n.type === "booking");
  const system = notifications.all.filter(n => n.type === "system");

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-heading font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                All
                {unreadCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground px-2 py-0.5 text-xs rounded-full">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="messages">
                Messages
                {messages.filter(m => !m.read).length > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground px-2 py-0.5 text-xs rounded-full">
                    {messages.filter(m => !m.read).length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="bookings">
                Bookings
                {bookings.filter(b => !b.read).length > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground px-2 py-0.5 text-xs rounded-full">
                    {bookings.filter(b => !b.read).length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {notifications.all.length > 0 ? (
                notifications.all.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border flex items-start gap-4 ${!notification.read ? 'bg-muted/50' : ''}`}
                  >
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="size-3 mr-1" />
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="size-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => clearNotification(notification.id)}
                          >
                            <X className="size-4" />
                            <span className="sr-only">Clear notification</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Bell className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You're all caught up! You'll receive notifications for messages, bookings, and updates here.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4">
              {messages.length > 0 ? (
                messages.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border flex items-start gap-4 ${!notification.read ? 'bg-muted/50' : ''}`}
                  >
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="size-3 mr-1" />
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="size-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => clearNotification(notification.id)}
                          >
                            <X className="size-4" />
                            <span className="sr-only">Clear notification</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No messages</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You don't have any message notifications. When someone messages you, you'll see it here.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="bookings" className="space-y-4">
              {bookings.length > 0 ? (
                bookings.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border flex items-start gap-4 ${!notification.read ? 'bg-muted/50' : ''}`}
                  >
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="size-3 mr-1" />
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="size-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => clearNotification(notification.id)}
                          >
                            <X className="size-4" />
                            <span className="sr-only">Clear notification</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Calendar className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No bookings</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You don't have any booking notifications yet. Booking requests and confirmations will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="system" className="space-y-4">
              {system.length > 0 ? (
                system.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border flex items-start gap-4 ${!notification.read ? 'bg-muted/50' : ''}`}
                  >
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="size-3 mr-1" />
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="size-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => clearNotification(notification.id)}
                          >
                            <X className="size-4" />
                            <span className="sr-only">Clear notification</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Bell className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No system notifications</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You don't have any system notifications. Updates about your account and the platform will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

    </div>
  );
}
