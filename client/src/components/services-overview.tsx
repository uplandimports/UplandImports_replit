import { Card, CardContent } from "@/components/ui/card";
import { Factory, Truck, Wrench, Check } from "lucide-react";

export default function ServicesOverview() {
  const services = [
    {
      icon: Factory,
      title: "State-of-the-Art Manufacturing",
      description: "Our facilities feature the latest CNC machinery alongside skilled craftsmen who hand-finish critical components. Turkish firearms manufacturing combines European quality standards with competitive pricing advantages.",
      features: [
        "Latest CNC machinery",
        "Hand-finished components",
        "European quality standards"
      ]
    },
    {
      icon: Truck,
      title: "Diverse Product Range",
      description: "Our premium shotgun lineup includes tactical bullpup configurations, elegant over-under sporting models, versatile semi-automatic options, and reliable pump-action designs.",
      features: [
        "Tactical bullpup models",
        "Premium over-under designs",
        "Rigorous quality control testing"
      ]
    },
    {
      icon: Wrench,
      title: "Complete Branding Solutions",
      description: "As your white label partner, we offer flexible minimum order quantities, custom engraving services, proprietary finishes, and bespoke packaging solutions.",
      features: [
        "Custom engraving services",
        "Proprietary finishes",
        "Bespoke packaging solutions"
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
