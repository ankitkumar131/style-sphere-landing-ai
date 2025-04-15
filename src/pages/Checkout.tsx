
import React, { useState } from "react";
import { useShopContext } from "@/context/ShopContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useShopContext();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Contact, 2: Shipping, 3: Payment
  
  // Calculate shipping (free over $100)
  const shippingCost = cartTotal >= 100 ? 0 : 9.99;
  const totalWithShipping = cartTotal + shippingCost;
  
  // Form states
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: ""
  });
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiration: "",
    cvv: ""
  });
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.email || !contactInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep(2);
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check all required fields
    const { firstName, lastName, address, city, state, zipCode } = shippingInfo;
    if (!firstName || !lastName || !address || !city || !state || !zipCode) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep(3);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check all required fields
    const { cardNumber, cardName, expiration, cvv } = paymentInfo;
    if (!cardNumber || !cardName || !expiration || !cvv) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Simulate payment processing
    toast.loading("Processing payment...");
    
    setTimeout(() => {
      clearCart();
      toast.dismiss();
      toast.success("Order placed successfully!");
      navigate('/');
    }, 2000);
  };
  
  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-semibold text-fashion-dark mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              You need to add items to your cart before checking out.
            </p>
            <Button 
              className="bg-fashion-purple hover:bg-fashion-purple/90"
              onClick={() => navigate('/')}
            >
              Start Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-fashion-dark mb-8">
            Checkout
          </h1>
          
          {/* Checkout Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 1 ? 'bg-fashion-purple text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`w-20 h-1 ${step >= 2 ? 'bg-fashion-purple' : 'bg-gray-200'}`}></div>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 2 ? 'bg-fashion-purple text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`w-20 h-1 ${step >= 3 ? 'bg-fashion-purple' : 'bg-gray-200'}`}></div>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 3 ? 'bg-fashion-purple text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-heading text-xl font-semibold text-fashion-dark mb-4">
                      Contact Information
                    </h2>
                    
                    <form onSubmit={handleContactSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block mb-1 text-sm font-medium text-fashion-dark">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                            placeholder="Your email address"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block mb-1 text-sm font-medium text-fashion-dark">
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                            placeholder="Your phone number"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button 
                          type="submit"
                          className="bg-fashion-purple hover:bg-fashion-purple/90"
                        >
                          Continue to Shipping
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
              
              {step === 2 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-heading text-xl font-semibold text-fashion-dark mb-4">
                      Shipping Address
                    </h2>
                    
                    <form onSubmit={handleShippingSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-fashion-dark">
                            First Name *
                          </label>
                          <Input
                            id="firstName"
                            value={shippingInfo.firstName}
                            onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                            placeholder="First name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-fashion-dark">
                            Last Name *
                          </label>
                          <Input
                            id="lastName"
                            value={shippingInfo.lastName}
                            onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                            placeholder="Last name"
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block mb-1 text-sm font-medium text-fashion-dark">
                            Address *
                          </label>
                          <Input
                            id="address"
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                            placeholder="Street address"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="city" className="block mb-1 text-sm font-medium text-fashion-dark">
                            City *
                          </label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                            placeholder="City"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block mb-1 text-sm font-medium text-fashion-dark">
                            State/Province *
                          </label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                            placeholder="State"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="zipCode" className="block mb-1 text-sm font-medium text-fashion-dark">
                            Zip/Postal Code *
                          </label>
                          <Input
                            id="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                            placeholder="Zip code"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block mb-1 text-sm font-medium text-fashion-dark">
                            Country *
                          </label>
                          <select
                            id="country"
                            value={shippingInfo.country}
                            onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            required
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            {/* Add more countries as needed */}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-between">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                        >
                          Back to Contact
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-fashion-purple hover:bg-fashion-purple/90"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
              
              {step === 3 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-heading text-xl font-semibold text-fashion-dark mb-4">
                      Payment Information
                    </h2>
                    
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block mb-1 text-sm font-medium text-fashion-dark">
                            Card Number *
                          </label>
                          <Input
                            id="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block mb-1 text-sm font-medium text-fashion-dark">
                            Name on Card *
                          </label>
                          <Input
                            id="cardName"
                            value={paymentInfo.cardName}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                            placeholder="Cardholder name"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiration" className="block mb-1 text-sm font-medium text-fashion-dark">
                              Expiration Date *
                            </label>
                            <Input
                              id="expiration"
                              value={paymentInfo.expiration}
                              onChange={(e) => setPaymentInfo({...paymentInfo, expiration: e.target.value})}
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block mb-1 text-sm font-medium text-fashion-dark">
                              CVV *
                            </label>
                            <Input
                              id="cvv"
                              value={paymentInfo.cvv}
                              onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-between">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setStep(2)}
                        >
                          Back to Shipping
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-fashion-purple hover:bg-fashion-purple/90"
                        >
                          Complete Order
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-xl font-semibold text-fashion-dark mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <span className="font-medium truncate">{item.name}</span>
                          <div className="text-gray-500 text-sm">
                            {item.size && <span className="mr-2">Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm">{item.quantity} x ${item.price.toFixed(2)}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3 border-t pt-4">
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
