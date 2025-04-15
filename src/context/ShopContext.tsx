
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

export type ProductType = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  imageUrl: string;
  images?: string[];
  size?: string;
  color?: string;
  quantity?: number;
};

type CartItemType = ProductType & {
  quantity: number;
};

type ShopContextType = {
  products: ProductType[];
  cart: CartItemType[];
  wishlist: ProductType[];
  addToCart: (product: ProductType, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Sample product data
const sampleProducts: ProductType[] = [
  // Women's products
  {
    id: 'w1',
    name: 'Winter Coat',
    price: 149.99,
    description: 'Stylish winter coat with faux fur trim, perfect for cold weather.',
    category: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    ]
  },
  {
    id: 'w2',
    name: 'Silk Blouse',
    price: 79.99,
    description: 'Elegant silk blouse with a modern cut, perfect for professional settings.',
    category: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    images: [
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
      'https://images.unsplash.com/photo-1618225747659-433d5a5c6af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
    ]
  },
  {
    id: 'w3',
    name: 'Designer Dress',
    price: 129.99,
    originalPrice: 179.99,
    description: 'Stunning designer dress with unique pattern and comfortable fit.',
    category: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
    ]
  },
  {
    id: 'w4',
    name: 'Summer Dress',
    price: 89.99,
    description: 'Light and airy summer dress with floral pattern.',
    category: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=746&q=80'
  },
  {
    id: 'w5',
    name: 'Casual Jeans',
    price: 59.99,
    description: 'Comfortable casual jeans with modern fit.',
    category: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 'w6',
    name: 'Leather Jacket',
    price: 199.99,
    description: 'Stylish leather jacket perfect for fall weather.',
    category: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
  },
  
  // Men's products
  {
    id: 'm1',
    name: 'Premium Suit',
    price: 299.99,
    description: 'Elegant premium suit with modern cut and high-quality fabric.',
    category: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1592878940526-0214b0f374f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=881&q=80'
    ]
  },
  {
    id: 'm2',
    name: 'Casual Shirt',
    price: 49.99,
    description: 'Comfortable casual shirt with modern design.',
    category: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1591504771094-a1ca4de142d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    ]
  },
  {
    id: 'm3',
    name: 'Leather Jacket',
    price: 199.99,
    originalPrice: 249.99,
    description: 'Stylish leather jacket with modern design, perfect for casual outings.',
    category: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=743&q=80'
    ]
  },
  {
    id: 'm4',
    name: 'Classic Jeans',
    price: 79.99,
    description: 'Classic jeans with comfortable fit for everyday wear.',
    category: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80'
  },
  {
    id: 'm5',
    name: 'Casual Sweater',
    price: 69.99,
    description: 'Comfortable casual sweater for everyday wear.',
    category: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1599577180394-7e36413f5f74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
  },
  {
    id: 'm6',
    name: 'Business Shirt',
    price: 59.99,
    description: 'Professional business shirt for formal occasions.',
    category: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  
  // Gifts products
  {
    id: 'g1',
    name: 'Gift Set',
    price: 99.99,
    description: 'Luxury gift set with assorted items perfect for any occasion.',
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1140&q=80',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1140&q=80',
      'https://images.unsplash.com/photo-1564202496302-37e31babc015?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
    ]
  },
  {
    id: 'g2',
    name: 'Luxury Watch',
    price: 249.99,
    description: 'Elegant luxury watch with Swiss movement, perfect gift for special occasions.',
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1687460919908-da5138c61b36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    images: [
      'https://images.unsplash.com/photo-1687460919908-da5138c61b36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1230&q=80'
    ]
  },
  {
    id: 'g3',
    name: 'Designer Bag',
    price: 179.99,
    originalPrice: 219.99,
    description: 'Stylish designer bag perfect for any occasion.',
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1614179818511-73f5a0bbc6f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    images: [
      'https://images.unsplash.com/photo-1614179818511-73f5a0bbc6f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1597633425046-08f5110420b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ]
  },
  {
    id: 'g4',
    name: 'Perfume Set',
    price: 119.99,
    description: 'Luxury perfume set with assorted fragrances.',
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1615219125905-230ba9573303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'g5',
    name: 'Jewelry Box',
    price: 89.99,
    description: 'Elegant jewelry box perfect for storing precious items.',
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
  },
  {
    id: 'g6',
    name: 'Gift Card',
    price: 50.00,
    description: 'Gift card for any occasion, perfect when you are not sure what to choose.',
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  useEffect(() => {
    // Load cart and wishlist from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);
  
  useEffect(() => {
    // Save cart and wishlist to localStorage when they change
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);
  
  const addToCart = (product: ProductType, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity of existing item
        const updatedCart = prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`Updated ${product.name} quantity in cart`);
        return updatedCart;
      } else {
        // Add new item to cart
        toast.success(`Added ${product.name} to cart`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === productId);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };
  
  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const addToWishlist = (product: ProductType) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      
      if (!isInWishlist) {
        toast.success(`Added ${product.name} to wishlist`);
        return [...prevWishlist, product];
      }
      
      return prevWishlist;
    });
  };
  
  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => {
      const itemToRemove = prevWishlist.find(item => item.id === productId);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from wishlist`);
      }
      return prevWishlist.filter(item => item.id !== productId);
    });
  };
  
  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };
  
  const value = {
    products: sampleProducts,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    clearCart,
    cartTotal,
    cartCount
  };
  
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShopContext must be used within a ShopProvider');
  }
  return context;
};
