import { Button } from "@/components/ui/button";
import { Eye, Settings } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 gradient-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              White Label Opportunity: Premium Shotguns For Your Brand
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/80">
              Elevate your product line with our tactical and sporting shotguns under your own brand name. Our Turkish manufacturing facilities combine state-of-the-art engineering with generations of craftsmanship, offering market-ready firearms with exceptional margins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('catalog')}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Catalog
              </Button>
              <Button
                onClick={() => scrollToSection('builder')}
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                size="lg"
              >
                <Settings className="mr-2 h-5 w-5" />
                Build Custom
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://pixabay.com/get/gbe0a55cad8a6e7bbd962451f829662b45cd0839eaf2c5ae5b9dc435f42f9b9a9d47b6bf0e27a792b443ed203c1489de14ca1af6a5ace3bc706fb0cfc20c262d9_1280.jpg"
              alt="Premium Turkish shotgun display"
              className="rounded-xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
