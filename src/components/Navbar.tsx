
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingBag, User, X, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="font-heading font-bold text-2xl text-fashion-dark">
            STYLE<span className="text-fashion-purple">SPHERE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/catalog/women" className="text-fashion-dark hover:text-fashion-purple font-medium transition-colors">
            Women
          </Link>
          <Link to="/catalog/men" className="text-fashion-dark hover:text-fashion-purple font-medium transition-colors">
            Men
          </Link>
          <Link to="/catalog/gifts" className="text-fashion-dark hover:text-fashion-purple font-medium transition-colors">
            Gifts
          </Link>
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:text-fashion-purple">
            <Search size={20} />
          </Button>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="hover:text-fashion-purple">
              <Heart size={20} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="icon" className="hover:text-fashion-purple">
              <User size={20} />
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="hover:text-fashion-purple relative">
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 bg-fashion-purple text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            </Button>
          </Link>
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
            <Link to="/" className="font-heading font-bold text-2xl text-fashion-dark" onClick={() => setMobileMenuOpen(false)}>
              STYLE<span className="text-fashion-purple">SPHERE</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </Button>
          </div>
          <div className="flex flex-col space-y-4">
            <Link 
              to="/catalog/women" 
              className="text-xl font-medium p-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link 
              to="/catalog/men" 
              className="text-xl font-medium p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link 
              to="/catalog/gifts" 
              className="text-xl font-medium p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gifts
            </Link>
            <Link 
              to="/wishlist" 
              className="text-xl font-medium p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link 
              to="/cart" 
              className="text-xl font-medium p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart
            </Link>
            <Link 
              to="/login" 
              className="text-xl font-medium p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
          <div className="flex justify-around mt-8">
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" size="icon">
                <Heart size={20} />
              </Button>
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag size={20} />
                <span className="absolute top-0 right-0 bg-fashion-purple text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
