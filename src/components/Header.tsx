import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">N</span>
          </div>
          <span className="font-bold text-xl text-foreground">NGO Connect</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</a>
          <a href="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</a>
        </nav>

        <Button variant="default" className="hidden md:block">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;