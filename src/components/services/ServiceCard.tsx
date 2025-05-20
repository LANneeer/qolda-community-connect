
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const getServiceImage = () => {
    return service.images && service.images.length > 0 
      ? service.images[0] 
      : "/placeholder.svg";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(new Date(date));
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

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/services/${service.id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={getServiceImage()} 
            alt={service.title} 
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
              src={service.provider.avatar || "/placeholder.svg"} 
              alt={service.provider.name} 
              className="rounded-full size-10 object-cover"
            />
            <div>
              <h3 className="font-heading font-medium line-clamp-1">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.provider.name}
                {service.provider.verificationBadge && (
                  <span className="inline-block ml-1 bg-blue-500 text-white rounded-full size-4 text-xs flex items-center justify-center">✓</span>
                )}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {service.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
          <span>{service.location.neighborhood}, {service.location.city}</span>
          <span>Posted {formatDate(service.createdAt)}</span>
        </CardFooter>
      </Link>
    </Card>
  );
}
