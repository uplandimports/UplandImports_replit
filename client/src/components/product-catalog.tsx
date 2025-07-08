import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@shared/schema";

export default function ProductCatalog() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filterOptions = [
    { value: "all", label: "All Models" },
    { value: "bullpup", label: "Bullpup" },
    { value: "over-under", label: "Over/Under" },
    { value: "semi-auto", label: "Semi-Auto" },
    { value: "pump-action", label: "Pump Action" }
  ];

  const filteredProducts = products?.filter(product => 
    activeFilter === "all" || product.category === activeFilter
  ) || [];

  const getSpecificationDisplay = (specifications: string) => {
    try {
      const specs = JSON.parse(specifications);
      return {
        barrels: Array.isArray(specs.barrels) ? specs.barrels.join(" & ") : specs.barrels || "N/A",
        choke: specs.choke || specs.action || "Multi-choke",
        stock: specs.stock || specs.features || "Standard"
      };
    } catch {
      return { barrels: "N/A", choke: "N/A", stock: "N/A" };
    }
  };

  if (isLoading) {
    return (
      <section id="catalog" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            PE-Series: Your White Label Product Line
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leverage our premium Turkish-manufactured shotgun line under your own brand. Our PE-series firearms offer complete access to proven designs with your company's branding, allowing immediate market entry without manufacturing investment.
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              variant={activeFilter === option.value ? "default" : "outline"}
              className="mb-2"
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const specs = getSpecificationDisplay(product.specifications);
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/600x400/374151/FFD700?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary font-semibold">
                      Starting at {formatPrice(product.basePrice)}
                    </span>
                    <Badge variant="secondary">{product.gauge} GA</Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex justify-between">
                      <span>Barrel:</span>
                      <span>{specs.barrels}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Choke:</span>
                      <span>{specs.choke}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stock:</span>
                      <span>{specs.stock}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <Info className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
