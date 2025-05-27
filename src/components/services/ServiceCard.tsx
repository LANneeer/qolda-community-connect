
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Add safety checks for undefined properties
  if (!service) {
    return null;
  }

  const getServiceImage = () => {
    return service.images && service.images.length > 0 
      ? service.images[0] 
      : "/placeholder.svg";
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return 'Recently';
      }
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }).format(dateObj);
    } catch (error) {
      return 'Recently';
    }
  };

  const getPricingBadgeVariant = () => {
    switch (service.pricingType) {
      case 'free':
        return 'default';
      case 'exchange':
        return 'secondary';
      case 'fee':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getPricingLabel = () => {
    switch (service.pricingType) {
      case 'free':
        return 'Free';
      case 'exchange':
        return 'Skill Exchange';
      case 'fee':
        return 'Paid Service';
      default:
        return '';
    }
  };

  // Safety checks for provider
  const provider = service.provider || {};
  const providerName = provider.name || 'Unknown Provider';
  const providerAvatar = provider.avatar || "/placeholder.svg";
  const hasVerificationBadge = provider.verificationBadge || false;

  // Safety checks for location
  const location = service.location || {};
  const neighborhood = location.neighborhood || 'Unknown';
  const city = location.city || 'Unknown';

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/services/${service.id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={getServiceImage()} 
            alt={service.title || 'Service'} 
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge variant={getPricingBadgeVariant()}>
              {getPricingLabel()}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <img 
              src={providerAvatar} 
              alt={providerName} 
              className="rounded-full size-10 object-cover"
            />
            <div>
              <h3 className="font-heading font-medium line-clamp-1">
                {service.title || 'Untitled Service'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {providerName}
                {hasVerificationBadge && (
                  <span className="inline-block ml-1 bg-blue-500 text-white rounded-full size-4 text-xs flex items-center justify-center">✓</span>
                )}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {service.description || 'No description available'}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
          <span>{neighborhood}, {city}</span>
          <span>Posted {formatDate(service.createdAt)}</span>
        </CardFooter>
      </Link>
    </Card>
  );
}
