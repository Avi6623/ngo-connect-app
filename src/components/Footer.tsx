const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground text-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-lg">NGO Dev Platform</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Empowering NGOs through innovative technology solutions and mobile applications.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">App Development</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Maintenance</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Solutions</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Donation Management</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Volunteer Portal</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Impact Analytics</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cloud Integration</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">NTCC Project</h3>
            <p className="text-sm text-primary-foreground/80">
              Developed for National Technology Competition
            </p>
            <div className="text-sm text-primary-foreground/80">
              <p>📧 avneesh.amity@gmail.com</p>
              <p>📞 +91 7307890041</p>
              <p>📍 Lucknow, UP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 NGO Dev Platform. Developed for NTCC - App Development For NGOs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;