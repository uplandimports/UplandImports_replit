import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mail } from "lucide-react";
import { formatPrice, calculateConfigurationPrice } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertConfiguration } from "@shared/schema";

interface ConfigurationState {
  actionType: string;
  gauge: string;
  barrelLength: string;
  stockMaterial: string;
  finish: string;
  customBranding: string;
  specialRequests: string;
}

export default function ShotgunBuilder() {
  const { toast } = useToast();
  const [config, setConfig] = useState<ConfigurationState>({
    actionType: "bullpup",
    gauge: "12",
    barrelLength: "18.5",
    stockMaterial: "walnut",
    finish: "blued",
    customBranding: "",
    specialRequests: ""
  });

  const basePrice = 850;
  const estimatedPrice = calculateConfigurationPrice(basePrice, config);

  const createConfigMutation = useMutation({
    mutationFn: async (configData: InsertConfiguration) => {
      const response = await apiRequest("POST", "/api/configurations", configData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Configuration Saved",
        description: "Your shotgun configuration has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateConfig = (key: keyof ConfigurationState, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveConfiguration = () => {
    const configData: InsertConfiguration = {
      productId: 1, // Default to first product
      actionType: config.actionType,
      gauge: config.gauge,
      barrelLength: config.barrelLength,
      stockMaterial: config.stockMaterial,
      finish: config.finish,
      customBranding: config.customBranding || null,
      specialRequests: config.specialRequests || null,
      estimatedPrice: estimatedPrice.toString()
    };

    createConfigMutation.mutate(configData);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const configOptions = {
    actionType: [
      { value: "bullpup", label: "Bullpup" },
      { value: "over-under", label: "Over/Under" },
      { value: "semi-auto", label: "Semi-Auto" },
      { value: "pump-action", label: "Pump Action" }
    ],
    gauge: [
      { value: "12", label: "12 GA" },
      { value: "16", label: "16 GA" },
      { value: "20", label: "20 GA" },
      { value: "28", label: "28 GA" }
    ],
    barrelLength: [
      { value: "18.5", label: "18.5\"" },
      { value: "20", label: "20\"" },
      { value: "24", label: "24\"" },
      { value: "27.95", label: "27.95\"" },
      { value: "28", label: "28\"" }
    ],
    stockMaterial: [
      { value: "walnut", label: "Turkish Walnut" },
      { value: "synthetic", label: "Synthetic" }
    ],
    finish: [
      { value: "blued", label: "Blued Steel" },
      { value: "nickel", label: "Nickel Plated" },
      { value: "case-hardened", label: "Case Hardened" }
    ]
  };

  const getDisplayValue = (key: keyof typeof configOptions, value: string) => {
    return configOptions[key].find(option => option.value === value)?.label || value;
  };

  return (
    <section id="builder" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Interactive Shotgun Builder
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Customize your shotgun specifications and see real-time pricing for white label manufacturing
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary mb-6">Configure Your Shotgun</h3>
              
              {Object.entries(configOptions).map(([key, options]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-foreground mb-3 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className={`grid gap-3 ${options.length <= 2 ? 'grid-cols-2' : options.length <= 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {options.map((option) => (
                      <Button
                        key={option.value}
                        variant={config[key as keyof ConfigurationState] === option.value ? "default" : "outline"}
                        className="p-3 text-sm font-medium"
                        onClick={() => updateConfig(key as keyof ConfigurationState, option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Custom Branding */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Custom Branding</label>
                <div className="space-y-3">
                  <Input
                    placeholder="Your Brand Name"
                    value={config.customBranding}
                    onChange={(e) => updateConfig('customBranding', e.target.value)}
                  />
                  <Textarea
                    placeholder="Special engraving or marking requests..."
                    rows={3}
                    value={config.specialRequests}
                    onChange={(e) => updateConfig('specialRequests', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Preview & Pricing Panel */}
            <div className="bg-muted rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-6">Configuration Preview</h3>
              
              {/* Shotgun Preview Image */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <img
                  src="https://pixabay.com/get/g501258b673a90f55407e759d4849b735cc56cd034c71b94eda1141c8091f12d7ebd7cc000a8aa53f7eef50c0e865e8b0d9e9e61a7b9c8b4dcbd4b81c371425cb_1280.jpg"
                  alt="Configured shotgun preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Configuration preview will update based on selections
                </p>
              </div>

              {/* Current Configuration */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-foreground">Current Configuration:</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(config).slice(0, 5).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium">
                        {getDisplayValue(key as keyof typeof configOptions, value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Estimate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Price:</span>
                    <span>{formatPrice(basePrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Custom Options:</span>
                    <span>{formatPrice(estimatedPrice - basePrice)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total per Unit:</span>
                    <span className="text-accent">{formatPrice(estimatedPrice)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    *Prices vary based on quantity. Contact for volume pricing.
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleSaveConfiguration}
                  disabled={createConfigMutation.isPending}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
                <Button 
                  className="w-full"
                  onClick={scrollToContact}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
