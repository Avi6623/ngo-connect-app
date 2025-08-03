import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const projects = [
    {
      title: "EcoAction NGO",
      description: "Environmental awareness app with carbon footprint tracking and volunteer coordination.",
      tech: ["React Native", "Node.js", "MongoDB"],
      impact: "5000+ users, 200+ volunteers",
      category: "Environmental"
    },
    {
      title: "HealthCare Connect",
      description: "Healthcare access app connecting rural communities with medical professionals.",
      tech: ["Flutter", "Firebase", "WebRTC"],
      impact: "3000+ consultations, 50+ doctors",
      category: "Healthcare"
    },
    {
      title: "EduBridge",
      description: "Education platform providing free courses and skill development for underprivileged youth.",
      tech: ["React", "Django", "PostgreSQL"],
      impact: "10000+ learners, 500+ courses",
      category: "Education"
    },
    {
      title: "FoodShare",
      description: "Food donation app connecting restaurants with local food banks and shelters.",
      tech: ["PWA", "Express.js", "MySQL"],
      impact: "2000+ meals donated, 30+ partners",
      category: "Social Welfare"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing impactful applications we've developed for NGOs across various sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2">Technology Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">Impact:</h4>
                  <p className="text-sm text-muted-foreground">{project.impact}</p>
                </div>

                <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-accent">
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;