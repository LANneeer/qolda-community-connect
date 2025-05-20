
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { categories } from "@/data/mockData";

interface ServiceFilterProps {
  onFilterChange: (filters: any) => void;
}

export default function ServiceFilter({ onFilterChange }: ServiceFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pricingType, setPricingType] = useState<string[]>([]);
  
  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      categories: selectedCategories,
      pricingType,
    });
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPricingType([]);
    onFilterChange({});
  };
  
  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cat) => cat !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search services..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <Badge 
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Pricing Type</h3>
            <ToggleGroup 
              type="multiple" 
              variant="outline"
              value={pricingType}
              onValueChange={setPricingType}
              className="justify-start"
            >
              <ToggleGroupItem value="free">Free</ToggleGroupItem>
              <ToggleGroupItem value="exchange">Exchange</ToggleGroupItem>
              <ToggleGroupItem value="fee">Paid</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={clearFilters} className="gap-1">
              <X className="h-4 w-4" />
              Clear
            </Button>
            <Button size="sm" onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
