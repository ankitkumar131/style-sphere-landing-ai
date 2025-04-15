
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useShopContext, ProductType } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Grid2X2, 
  LayoutGrid, 
  Filter, 
  Heart, 
  ShoppingBag, 
  SlidersHorizontal 
} from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Catalog: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { products, addToCart, addToWishlist, wishlist } = useShopContext();

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter products by category
  const filteredProducts = products.filter(product => product.category === category);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    // default: featured (no sort)
    return 0;
  });

  // Check if product is in wishlist
  const isInWishlist = (product: ProductType) => {
    return wishlist.some(item => item.id === product.id);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="text-sm mb-6 text-gray-500">
            <Link to="/" className="hover:text-fashion-purple">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-fashion-dark">{capitalizeFirstLetter(category || '')}</span>
          </div>
          
          {/* Title */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-fashion-dark mb-2">
              {capitalizeFirstLetter(category || '')} Collection
            </h1>
            <p className="text-fashion-dark/70">
              Discover our latest {category} fashion pieces designed with style and comfort in mind.
            </p>
          </div>
          
          {/* Filters & Sorting */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} /> Filters <SlidersHorizontal size={16} />
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  className={`p-2 ${view === 'grid' ? 'bg-gray-100' : ''}`}
                  onClick={() => setView('grid')}
                >
                  <Grid2X2 size={20} />
                </button>
                <button
                  className={`p-2 ${view === 'list' ? 'bg-gray-100' : ''}`}
                  onClick={() => setView('list')}
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
              
              <select
                className="border rounded-md p-2 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Under $50
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    $50 - $100
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    $100 - $200
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Over $200
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {['black', 'white', 'red', 'blue', 'green', 'yellow', 'purple'].map(color => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      className="border rounded-md px-3 py-1 hover:bg-gray-100"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid/List */}
          {sortedProducts.length > 0 ? (
            <div className={`grid ${view === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6 mb-8`}>
              {sortedProducts.map(product => (
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
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white font-medium truncate">{product.name}</h3>
                    </div>
                  </Link>
                  
                  <CardContent className={`${view === 'list' ? 'flex justify-between items-center' : ''} p-4`}>
                    <div>
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="font-medium text-fashion-dark truncate">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-fashion-purple">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    
                    {view === 'list' && (
                      <p className="text-gray-500 my-2 line-clamp-2">{product.description}</p>
                    )}
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                    <Button 
                      className="flex-1"
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        addToWishlist(product);
                      }}
                    >
                      <Heart size={18} className={isInWishlist(product) ? "fill-fashion-purple text-fashion-purple" : ""} />
                    </Button>
                    <Button 
                      className="flex-1 bg-fashion-purple hover:bg-fashion-purple/90"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                    >
                      <ShoppingBag size={18} className="mr-1" /> Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium text-fashion-dark mb-2">No products found</h2>
              <p className="text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
          )}
          
          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
