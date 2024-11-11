"use client";
import userBasketStore from "@/app/(store)/store";
import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

const AddtoBasketButton = ({ product, disabled }: AddToBasketButtonProps) => {
  const { addItem, removeItem, getItemCount } = userBasketStore();
  const [isClient, setIsClient] = useState(false);
  const itemCount = getItemCount(product._id)

  useEffect(() => {
    setIsClient(true); // Ensures it's running on the client
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // Optionally show loading during client-side hydration
  }

  return (
    <div className="flex items-center justify-center space-x-2">
    <button 
    onClick={() => removeItem(product._id)}
    className={`w-8 h-8 rounded-full items-center justify-center transition-colors duration-200
      ${itemCount === 0 ?
        "bg-gray-100 cursor-not-allowed" :
        "bg-gray-200 hover:bg-gray-300"
      }  
        `}

        disabled={itemCount === 0 || disabled}

        >
            <span className={
                `
               text-xl font-bold ${itemCount === 0 ?
                "text-gray-400" :
                "text-gray-600"} 
                `
            }>
                    -
            </span>

        </button>
      <span className="w-8 text-center font-semibold">
        {itemCount}
      </span>
      <button
      onClick={() => addItem(product)}
      className={`w-8 h-8 rounded-full items-center justify-center transition-colors duration-200
        ${disabled ?
          "bg-gray-400 cursor-not-allowed" :
          "bg-blue-500 hover:bg-blue-600"
        }  
          `}

          disabled={disabled}
          >

            <span className="text-xl font-bold text-white">+</span>
          </button>
      {/* Add more logic to handle remove item, etc. */}
    </div>
  );
};

export default AddtoBasketButton;
