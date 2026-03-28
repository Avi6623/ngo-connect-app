import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "Mobile-First Design",
      description: "Responsive applications that work seamlessly across all devices and platforms.",
      icon: "📱"
    },
    {
      title: "Donation Management",
      description: "Secure payment integration and donor tracking systems for transparent fundraising.",
      icon: "💳"
    },
    {
      title: "Volunteer Portal",
      description: "Comprehensive volunteer management with scheduling and communication tools.",
      icon: "🤝"
    },
    {
      title: "Impact Analytics",
      description: "Data visualization and reporting tools to showcase your organization's impact.",
      icon: "📊"
    },
    {
      title: "Cloud Integration",
      description: "Scalable cloud solutions ensuring reliable performance and data security.",
      icon: "☁️"
    },
    {
      title: "Custom Solutions",
      description: "Tailored features designed specifically for your NGO's unique requirements.",
      icon: "⚙️"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comprehensive NGO Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform provides everything your organization needs to digitize operations 
            and maximize social impact through technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;