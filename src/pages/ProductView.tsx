
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShopContext } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Share2, MinusCircle, PlusCircle, Truck, RotateCcw, Shield, CreditCard } from "lucide-react";
import { toast } from "sonner";

const ProductView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist, wishlist } = useShopContext();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState(0);
  
  // Find the product
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="font-heading text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
            <Button onClick={() => navigate('/')}>Return to Homepage</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Check if product is in wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id);
  
  // Available sizes and colors (in a real app, these would come from the product data)
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Red", value: "#ef4444" }
  ];
  
  // Images
  const images = product.images || [product.imageUrl];
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    if (colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor
    }, quantity);
  };

  const handleBuyNow = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    if (colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    // Add to cart and navigate to checkout immediately
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor
    }, quantity);
    
    // Navigate to checkout
    navigate('/checkout');
  };
  
  const handleAddToWishlist = () => {
    addToWishlist(product);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success("Link copied to clipboard"))
        .catch(err => console.error('Error copying text:', err));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="text-sm mb-8 text-gray-500">
            <a href="/" className="hover:text-fashion-purple">Home</a>
            <span className="mx-2">/</span>
            <a href={`/catalog/${product.category}`} className="hover:text-fashion-purple">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </a>
            <span className="mx-2">/</span>
            <span className="font-medium text-fashion-dark">{product.name}</span>
          </div>
          
          {/* Product View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-xl border">
                <img 
                  src={images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button 
                      key={index}
                      className={`aspect-square border rounded-md overflow-hidden ${index === activeImage ? 'ring-2 ring-fashion-purple' : ''}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-fashion-dark">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className="w-4 h-4 fill-current text-yellow-500" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500">(24 reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-semibold text-2xl text-fashion-purple">
                  ${product.price.toFixed(2)}
                </span>
                
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-0.5 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                )}
              </div>
              
              <p className="text-gray-700">
                {product.description}
              </p>
              
              {/* Size Selection */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-fashion-dark">Size</span>
                  <a href="#size-guide" className="text-sm text-fashion-purple">Size guide</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`border rounded-md min-w-[3rem] py-2 px-3 flex items-center justify-center transition-colors ${
                        selectedSize === size 
                          ? 'bg-fashion-purple text-white border-fashion-purple' 
                          : 'hover:border-fashion-purple'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div>
                <span className="font-medium text-fashion-dark block mb-2">Color</span>
                <div className="flex flex-wrap gap-3">
                  {colors.map(color => (
                    <button
                      key={color.name}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                        selectedColor === color.name ? 'ring-2 ring-offset-2 ring-fashion-purple' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <span className={`text-${color.name === 'White' ? 'black' : 'white'}`}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-4 py-2 text-fashion-purple"
                    onClick={decreaseQuantity}
                  >
                    <MinusCircle size={20} />
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button 
                    className="px-4 py-2 text-fashion-purple"
                    onClick={increaseQuantity}
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
                
                <Button 
                  className="flex-1 bg-fashion-purple hover:bg-fashion-purple/90 py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} className="mr-2" /> Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="py-6"
                  onClick={handleAddToWishlist}
                >
                  <Heart size={20} className={isInWishlist ? "fill-fashion-purple text-fashion-purple" : ""} />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="py-6"
                  onClick={handleShare}
                >
                  <Share2 size={20} />
                </Button>
              </div>
              
              {/* Buy Now Button */}
              <Button 
                className="w-full bg-black hover:bg-black/90 py-6"
                onClick={handleBuyNow}
              >
                <CreditCard size={18} className="mr-2" /> Buy Now
              </Button>
              
              {/* Product Info */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Truck className="text-fashion-purple" />
                  <div>
                    <span className="font-medium block">Free Delivery</span>
                    <span className="text-sm text-gray-500">Free shipping on all orders over $100</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <RotateCcw className="text-fashion-purple" />
                  <div>
                    <span className="font-medium block">Easy Returns</span>
                    <span className="text-sm text-gray-500">30 days return policy</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Shield className="text-fashion-purple" />
                  <div>
                    <span className="font-medium block">Secure Shopping</span>
                    <span className="text-sm text-gray-500">Your data is protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold text-fashion-dark mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map(relatedProduct => (
                  <div 
                    key={relatedProduct.id} 
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-3">
                      <img 
                        src={relatedProduct.imageUrl} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-medium text-fashion-dark">{relatedProduct.name}</h3>
                    <p className="text-fashion-purple">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductView;
