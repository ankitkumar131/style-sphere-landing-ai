
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import SignupSection from "@/components/SignupSection";
import Footer from "@/components/Footer";

// Sample product data
const womenProducts = [
  {
    name: "Winter Coat",
    price: "$149.99",
    imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Silk Blouse",
    price: "$79.99",
    imageUrl: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
  },
  {
    name: "Designer Dress",
    price: "$129.99",
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80"
  }
];

const menProducts = [
  {
    name: "Premium Suit",
    price: "$299.99",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
  },
  {
    name: "Casual Shirt",
    price: "$49.99",
    imageUrl: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Leather Jacket",
    price: "$199.99",
    imageUrl: "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
];

const giftProducts = [
  {
    name: "Gift Set",
    price: "$99.99",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1140&q=80"
  },
  {
    name: "Luxury Watch",
    price: "$249.99",
    imageUrl: "https://images.unsplash.com/photo-1687460919908-da5138c61b36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    name: "Designer Bag",
    price: "$179.99",
    imageUrl: "https://images.unsplash.com/photo-1614179818511-73f5a0bbc6f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Features Banner */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-medium text-fashion-dark mb-2">AI Style Matching</h3>
              <p className="text-fashion-dark/70">Personalized recommendations based on your preferences</p>
            </div>
            <div>
              <h3 className="font-medium text-fashion-dark mb-2">Free Shipping</h3>
              <p className="text-fashion-dark/70">On orders over $100</p>
            </div>
            <div>
              <h3 className="font-medium text-fashion-dark mb-2">Sustainable Materials</h3>
              <p className="text-fashion-dark/70">Eco-friendly production for a better planet</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Sections */}
      <CategorySection 
        id="women"
        title="Women"
        description="Discover our curated collection of women's clothing, designed with the perfect blend of style, comfort, and innovation. From elegant evening wear to casual everyday essentials, our AI-powered fashion assistant helps you find pieces that complement your unique style profile."
        imageUrl="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        products={womenProducts}
      />
      
      <CategorySection 
        id="men"
        title="Men"
        description="Elevate your wardrobe with our men's collection, featuring premium craftsmanship and contemporary design. Whether you're looking for formal attire or casual streetwear, our adaptive sizing technology ensures the perfect fit every time."
        imageUrl="https://images.unsplash.com/photo-1550246140-29f40b909e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        products={menProducts}
        reverse={true}
      />
      
      <CategorySection 
        id="gifts"
        title="Gifts"
        description="Finding the perfect gift has never been easier. Our gift selection is thoughtfully curated to delight your loved ones, featuring luxurious accessories, beauty items, and statement pieces that make a lasting impression."
        imageUrl="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80"
        products={giftProducts}
      />
      
      <SignupSection />
      <Footer />
    </div>
  );
};

export default Index;
