import { Category, Product } from "@/sanity.types";
import React from "react";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductViewProps {
    products: Product[];
    categories: Category[],
    
    
}



const ProvideView = ({products, categories}: ProductViewProps) => {
  return <div className="flex flex-col">
    <div className="w-full sm:w-[200px] max-w-[300px]">
    <CategorySelectorComponent categories={categories} />
</div>



    <div className="flex-1">
        <div>
            <ProductGrid products={products} />
            <hr className="w-1/2 sm:w-3/4" />
        </div>
    </div>

  </div>;
};

export default ProvideView;
