
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          filter: "brightness(0.8)"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-fashion-dark/40 to-transparent"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-white font-heading font-bold text-4xl md:text-6xl mb-6">
            Discover the Future of Fashion
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            Explore our AI-curated collections designed to enhance your unique style profile
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-fashion-purple hover:bg-fashion-purple/90 text-white font-medium px-8 py-6"
            >
              Shop Now <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              Watch Collection Preview
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Card */}
      <div className="hidden lg:block absolute bottom-16 right-16 glass-card p-6 rounded-lg shadow-lg max-w-xs animate-scale-in">
        <p className="font-medium text-fashion-dark mb-2">Next-Gen Fabric Technology</p>
        <p className="text-sm text-fashion-dark/80">
          Our garments feature climate-adaptive materials and sustainable production methods
        </p>
      </div>
    </div>
  );
};

export default Hero;
