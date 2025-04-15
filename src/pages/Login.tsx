
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a login request
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Login successful!");
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-gray-100 shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-2xl font-bold text-fashion-dark">
                Welcome Back
              </CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-fashion-dark">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-fashion-dark">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-fashion-purple hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-fashion-purple hover:bg-fashion-purple/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H12.7031V12.0492H17.1046C16.9105 13.2911 16.1951 14.3898 15.1087 15.0879V17.5866H18.2037C19.9588 16.8449 21.2394 14.7463 21.2394 12.0492"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M12.7039 20.0991C15.401 20.0991 17.7094 19.1947 19.3167 17.5868L16.2216 15.0892C15.3649 15.6699 14.2161 16.0108 12.7039 16.0108C10.1018 16.0108 7.9241 14.3578 7.19357 12.1038H4.01578V14.6826C5.61356 17.8868 8.9134 20.0991 12.7039 20.0991Z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M7.1936 12.1042C6.80099 10.8711 6.80099 9.52812 7.1936 8.295V5.71638H4.01581C2.77954 7.74547 2.77954 10.6544 4.01581 12.6835L7.1936 10.1042"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M12.7039 4.59062C14.0358 4.59062 15.2636 5.03226 16.2193 5.92902L18.9536 3.19571C17.2146 1.57157 15.021 0.600098 12.7039 0.600098C8.9134 0.600098 5.61356 2.81235 4.01578 5.71651L7.19357 8.29514C7.9241 6.04117 10.1018 4.59062 12.7039 4.59062Z"
                    ></path>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"
                    ></path>
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center border-t p-6">
              <p className="text-sm text-fashion-dark">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-fashion-purple hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
