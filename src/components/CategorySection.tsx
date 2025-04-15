
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
  products: Array<{
    name: string;
    price: string;
    imageUrl: string;
  }>;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  id,
  title,
  description,
  imageUrl,
  reverse = false,
  products
}) => {
  return (
    <section id={id} className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12`}>
          {/* Image Column */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[500px] overflow-hidden rounded-xl">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fashion-dark/50 to-transparent flex items-end">
                <div className="p-8">
                  <h2 className="text-white font-heading font-bold text-3xl mb-2">{title}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-fashion-dark">
              {title} Collection
            </h2>
            <p className="text-fashion-dark/80 mb-8 text-lg">
              {description}
            </p>
            
            {/* Product Preview */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {products.map((product, index) => (
                <div key={index} className="group">
                  <div className="rounded-lg overflow-hidden bg-gray-100 mb-2 aspect-square">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-fashion-dark">{product.name}</h3>
                  <p className="text-fashion-purple">{product.price}</p>
                </div>
              ))}
            </div>
            
            <Button 
              className="self-start bg-fashion-purple hover:bg-fashion-purple/90 text-white"
            >
              View All {title} Items <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
