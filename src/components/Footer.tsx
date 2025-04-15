
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-fashion-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-2xl mb-4">
              STYLE<span className="text-fashion-purple">SPHERE</span>
            </h3>
            <p className="text-white/70 mb-4">
              The future of fashion is here - AI-curated style for the modern individual.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-fashion-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-fashion-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-fashion-purple transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h4 className="font-medium text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#women" className="text-white/70 hover:text-fashion-purple transition-colors">Women</a></li>
              <li><a href="#men" className="text-white/70 hover:text-fashion-purple transition-colors">Men</a></li>
              <li><a href="#gifts" className="text-white/70 hover:text-fashion-purple transition-colors">Gifts</a></li>
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">Sale</a></li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h4 className="font-medium text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">Our Story</a></li>
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">Press</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-medium text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">FAQs</a></li>
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-white/70 hover:text-fashion-purple transition-colors">Size Guide</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © 2025 StyleSphere. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 text-sm hover:text-fashion-purple transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 text-sm hover:text-fashion-purple transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/50 text-sm hover:text-fashion-purple transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
