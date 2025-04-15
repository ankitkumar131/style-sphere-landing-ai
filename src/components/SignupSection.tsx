
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignupSection: React.FC = () => {
  return (
    <section className="fashion-gradient py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
            Get Personalized Style Recommendations
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join our community and receive AI-curated fashion picks tailored to your preferences
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white"
            />
            <Button 
              type="submit" 
              className="bg-white text-fashion-purple hover:bg-white/90 font-medium"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-white/70 mt-4 text-sm">
            By subscribing, you agree to receive marketing communications from us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
