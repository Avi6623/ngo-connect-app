import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      title: "App Development",
      description: "Full-stack mobile and web application development with modern frameworks and technologies.",
      features: ["React Native", "Progressive Web Apps", "Cross-platform Solutions", "API Integration"],
      price: "Starting from ₹50,000"
    },
    {
      title: "UI/UX Design",
      description: "User-centered design approach focusing on accessibility and intuitive user experiences.",
      features: ["Wireframing", "Prototyping", "User Research", "Accessibility Compliance"],
      price: "Starting from ₹25,000"
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing technical support, updates, and feature enhancements for your applications.",
      features: ["24/7 Support", "Regular Updates", "Bug Fixes", "Performance Optimization"],
      price: "₹10,000/month"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive development services tailored for non-profit organizations 
            to help them achieve their mission through technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border border-border shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-lg font-semibold text-primary mb-4">{service.price}</p>
                  <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    Get Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;