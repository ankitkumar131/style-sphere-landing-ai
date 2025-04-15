
import React from "react";
import { useShopContext } from "@/context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, MinusCircle, PlusCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useShopContext();

  // Calculate shipping (free over $100)
  const shippingCost = cartTotal >= 100 ? 0 : 9.99;
  const totalWithShipping = cartTotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-fashion-dark mb-8">
            Shopping Cart
          </h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto mb-6 text-gray-300" size={60} />
              <h2 className="font-heading text-2xl font-semibold text-fashion-dark mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button 
                className="bg-fashion-purple hover:bg-fashion-purple/90"
                onClick={() => navigate('/')}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cart.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <Link 
                            to={`/product/${item.id}`}
                            className="sm:w-36 h-36 overflow-hidden"
                          >
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          
                          <div className="p-4 flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <Link 
                                  to={`/product/${item.id}`}
                                  className="font-medium text-fashion-dark hover:text-fashion-purple transition-colors"
                                >
                                  {item.name}
                                </Link>
                                <div className="text-sm text-gray-500 mt-1">
                                  {item.size && <span className="mr-2">Size: {item.size}</span>}
                                  {item.color && <span>Color: {item.color}</span>}
                                </div>
                              </div>
                              <span className="font-semibold text-fashion-dark">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center border rounded-md">
                                <button 
                                  className="px-2 py-1 text-fashion-purple"
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  aria-label="Decrease quantity"
                                >
                                  <MinusCircle size={16} />
                                </button>
                                <span className="px-4 text-sm">{item.quantity}</span>
                                <button 
                                  className="px-2 py-1 text-fashion-purple"
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                >
                                  <PlusCircle size={16} />
                                </button>
                              </div>
                              
                              <button 
                                className="text-gray-500 hover:text-red-500 transition-colors"
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-heading text-xl font-semibold text-fashion-dark mb-4">
                      Order Summary
                    </h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span className="font-medium">
                          {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold text-fashion-purple">${totalWithShipping.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-fashion-purple hover:bg-fashion-purple/90 mb-3"
                      onClick={() => navigate('/checkout')}
                    >
                      Checkout <ArrowRight size={16} className="ml-2" />
                    </Button>
                    
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
