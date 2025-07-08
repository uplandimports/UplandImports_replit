import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info, Loader2, Eye, Star, Shield, Zap, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Product } from "@shared/schema";

export default function ProductCatalog() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [showPricingForm, setShowPricingForm] = useState<boolean>(false);
  const [pricingFormData, setPricingFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    productName: ""
  });
  
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const pricingMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/inquiries", {
        method: "POST",
        body: JSON.stringify({
          firstName: data.name.split(" ")[0] || data.name,
          lastName: data.name.split(" ").slice(1).join(" ") || "",
          company: data.company,
          email: data.email,
          phone: data.phone,
          inquiryType: "pricing",
          message: `Pricing inquiry for ${data.productName}: ${data.message}`,
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Pricing Request Sent",
        description: "We'll get back to you with pricing information soon.",
      });
      setShowPricingForm(false);
      setPricingFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        productName: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send pricing request. Please try again.",
        variant: "destructive",
      });
    },
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
        barrels: Array.isArray(specs.barrels) ? specs.barrels.join(" & ") : specs.barrels || specs.barrel || "N/A",
        choke: specs.choke || specs.action || "Multi-choke",
        stock: specs.stock || specs.features || "Standard"
      };
    } catch {
      return { barrels: "N/A", choke: "N/A", stock: "N/A" };
    }
  };

  const getProductGallery = (product: Product) => {
    // PE-701 has specific images in uploads folder
    if (product.name === "PE-701 Bullpup") {
      return [
        "/uploads/pe-701/pe701bronze.jpeg",
        "/uploads/pe-701/pe701black.jpeg", 
        "/uploads/pe-701/pe701-green.jpeg",
        "/uploads/pe-701/pe701camo.jpeg"
      ];
    }
    
    // For other products, use main image and generate placeholder paths
    const galleryImages = [
      product.imageUrl, // Main product image
      `/uploads/${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/detail-1.jpg`,
      `/uploads/${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/detail-2.jpg`,
      `/uploads/${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/detail-3.jpg`,
    ];
    
    return galleryImages.filter(Boolean);
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
            const galleryImages = getProductGallery(product);
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-contain bg-muted"
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
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-foreground">
                          {product.name}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Detailed specifications and gallery for {product.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                        {/* Product Gallery */}
                        <div className="space-y-4">
                          {/* Main Image */}
                          <div className="relative">
                            <img
                              src={galleryImages[selectedImageIndex]}
                              alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                              className="w-full h-80 object-contain bg-muted rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = `https://via.placeholder.com/600x400/374151/FFD700?text=${encodeURIComponent(product.name)}`;
                              }}
                            />
                            {galleryImages.length > 1 && (
                              <>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                                  onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1)}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                                  onClick={() => setSelectedImageIndex(selectedImageIndex === galleryImages.length - 1 ? 0 : selectedImageIndex + 1)}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                          
                          {/* Image Thumbnails */}
                          {galleryImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                              {galleryImages.map((image, index) => (
                                <button
                                  key={index}
                                  onClick={() => setSelectedImageIndex(index)}
                                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                                    selectedImageIndex === index 
                                      ? 'border-primary' 
                                      : 'border-muted hover:border-primary/50'
                                  }`}
                                >
                                  <img
                                    src={image}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    className="w-full h-full object-contain bg-muted"
                                    onError={(e) => {
                                      e.currentTarget.src = `https://via.placeholder.com/200x200/374151/FFD700?text=${index + 1}`;
                                    }}
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {/* Product Badges */}
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-sm">
                              {product.gauge} GA
                            </Badge>
                            <Badge variant="outline" className="text-sm">
                              {product.category}
                            </Badge>
                            <Badge variant="outline" className="text-sm">
                              {galleryImages.length} Photos
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2 text-foreground">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4 text-foreground">Specifications</h3>
                            <div className="grid grid-cols-1 gap-3">
                              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="font-medium">Barrel Configuration:</span>
                                <span className="text-muted-foreground">{specs.barrels}</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="font-medium">Choke System:</span>
                                <span className="text-muted-foreground">{specs.choke}</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="font-medium">Stock Material:</span>
                                <span className="text-muted-foreground">{specs.stock}</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="font-medium">Gauge:</span>
                                <span className="text-muted-foreground">{product.gauge} GA</span>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4 text-foreground">Pricing</h3>
                            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                              <p className="text-sm text-muted-foreground mb-4">
                                Custom pricing available based on volume, specifications, and branding requirements. 
                                Contact us for personalized quotes.
                              </p>
                              <Button 
                                className="w-full" 
                                onClick={() => {
                                  setPricingFormData(prev => ({ ...prev, productName: product.name }));
                                  setShowPricingForm(true);
                                }}
                              >
                                Contact Us for Pricing
                              </Button>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4 text-foreground">White Label Features</h3>
                            <div className="grid grid-cols-1 gap-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                  <Star className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm text-muted-foreground">Your brand engraving and customization</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                  <Shield className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm text-muted-foreground">Quality assurance and testing protocols</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                  <Zap className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm text-muted-foreground">Fast turnaround and reliable delivery</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                  <Target className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm text-muted-foreground">Flexible MOQ and scalable production</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <Button 
                              className="w-full" 
                              onClick={() => {
                                const contactElement = document.getElementById('contact');
                                if (contactElement) {
                                  contactElement.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              Request Quote for {product.name}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pricing Form Dialog */}
      <Dialog open={showPricingForm} onOpenChange={setShowPricingForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Pricing Information</DialogTitle>
            <DialogDescription>
              Get personalized pricing for {pricingFormData.productName}. We'll email you directly at chris@uplandimports.com
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={pricingFormData.name}
                onChange={(e) => setPricingFormData(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
                placeholder="Your full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={pricingFormData.email}
                onChange={(e) => setPricingFormData(prev => ({ ...prev, email: e.target.value }))}
                className="col-span-3"
                placeholder="your@email.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                value={pricingFormData.company}
                onChange={(e) => setPricingFormData(prev => ({ ...prev, company: e.target.value }))}
                className="col-span-3"
                placeholder="Your company name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={pricingFormData.phone}
                onChange={(e) => setPricingFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="col-span-3"
                placeholder="Your phone number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Details
              </Label>
              <Textarea
                id="message"
                value={pricingFormData.message}
                onChange={(e) => setPricingFormData(prev => ({ ...prev, message: e.target.value }))}
                className="col-span-3"
                placeholder="Volume requirements, customization needs, timeline..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowPricingForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => pricingMutation.mutate(pricingFormData)}
              disabled={pricingMutation.isPending || !pricingFormData.name || !pricingFormData.email}
            >
              {pricingMutation.isPending ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
