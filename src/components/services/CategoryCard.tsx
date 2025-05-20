
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCategory } from "@/types";

interface CategoryCardProps {
  category: ServiceCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/services?category=${category.id}`}>
      <Card className="hover:shadow-md transition-all h-full hover:border-primary/20">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">{getIconEmoji(category.icon)}</span>
          </div>
          <h3 className="font-heading text-lg mb-2">{category.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {category.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function getIconEmoji(icon?: string): string {
  const iconMap: Record<string, string> = {
    tools: "🔧",
    book: "📚",
    heart: "❤️",
    briefcase: "💼",
    palette: "🎨",
    laptop: "💻",
    car: "🚗",
    users: "👥",
  };

  return icon ? iconMap[icon] || "📋" : "📋";
}
