
import React from "react";
import { useShopContext } from "@/context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, addToCart, removeFromWishlist } = useShopContext();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-fashion-dark mb-8">
            My Wishlist
          </h1>
          
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="font-heading text-2xl font-semibold text-fashion-dark mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Browse our collections and add items you love to your wishlist.
              </p>
              <Button 
                className="bg-fashion-purple hover:bg-fashion-purple/90"
                onClick={() => navigate('/')}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map(product => (
                <Card key={product.id} className="group overflow-hidden border-gray-100">
                  <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.originalPrice && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        SALE
                      </span>
                    )}
                  </Link>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-medium text-fashion-dark truncate">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-fashion-purple">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </Button>
                    <Button 
                      className="flex-1 bg-fashion-purple hover:bg-fashion-purple/90"
                      size="sm"
                      onClick={() => {
                        addToCart(product);
                        removeFromWishlist(product.id);
                      }}
                    >
                      <ShoppingBag size={16} className="mr-1" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
