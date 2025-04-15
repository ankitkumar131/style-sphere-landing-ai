
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="font-heading font-bold text-2xl text-fashion-dark">
            STYLE<span className="text-fashion-purple">SPHERE</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#women" className="text-fashion-dark hover:text-fashion-purple font-medium transition-colors">
            Women
          </a>
          <a href="#men" className="text-fashion-dark hover:text-fashion-purple font-medium transition-colors">
            Men
          </a>
          <a href="#gifts" className="text-fashion-dark hover:text-fashion-purple font-medium transition-colors">
            Gifts
          </a>
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:text-fashion-purple">
            <Search size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-fashion-purple">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-fashion-purple relative">
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 bg-fashion-purple text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-heading font-bold text-2xl text-fashion-dark">
              STYLE<span className="text-fashion-purple">SPHERE</span>
            </span>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </Button>
          </div>
          <div className="flex flex-col space-y-4">
            <a 
              href="#women" 
              className="text-xl font-medium p-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </a>
            <a 
              href="#men" 
              className="text-xl font-medium p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </a>
            <a 
              href="#gifts" 
              className="text-xl font-medium p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gifts
            </a>
          </div>
          <div className="flex justify-around mt-8">
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 bg-fashion-purple text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
