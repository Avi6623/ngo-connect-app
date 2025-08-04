import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
