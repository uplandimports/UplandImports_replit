import { Card, CardContent } from "@/components/ui/card";
import { Factory, Truck, Wrench, Check } from "lucide-react";

export default function ServicesOverview() {
  const services = [
    {
      icon: Factory,
      title: "White Label Manufacturing",
      description: "Custom branding and manufacturing of premium Turkish shotguns under your brand name with complete quality assurance.",
      features: [
        "Custom branding & engraving",
        "Quality control standards",
        "Flexible minimum orders"
      ]
    },
    {
      icon: Truck,
      title: "Import Services",
      description: "Complete import handling including documentation, customs, and compliance with all international regulations.",
      features: [
        "Customs documentation",
        "Compliance management",
        "Logistics coordination"
      ]
    },
    {
      icon: Wrench,
      title: "Custom Configuration",
      description: "Tailored specifications including barrel length, stock materials, finishes, and specialized features.",
      features: [
        "Barrel customization",
        "Stock & finish options",
        "Technical specifications"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive white label and import solutions for premium Turkish shotguns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colors = ["bg-primary", "bg-accent", "bg-secondary"];
            const iconColor = colors[index % colors.length];
            
            return (
              <Card key={service.title} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${iconColor} rounded-full flex items-center justify-center mb-6`}>
                    <IconComponent className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <Check className="text-accent mr-2 h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
