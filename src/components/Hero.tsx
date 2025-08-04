import { Button } from "@/components/ui/button";
import heroImage from "@/assets/ngo-hero.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              NGO Connect
              <span className="block text-primary">Portal</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive management platform for non-profit organizations 
              to streamline operations, manage volunteers, track donations, and amplify their impact.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Custom Mobile Apps</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Donor Management Systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Volunteer Coordination</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-accent">
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 animate-pulse-glow"></div>
          <img 
            src={heroImage} 
            alt="NGO App Development" 
            className="relative w-full h-auto rounded-3xl shadow-elegant animate-float"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;