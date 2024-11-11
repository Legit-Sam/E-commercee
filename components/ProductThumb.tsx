import { Product } from "@/sanity.types";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductThumb = ({ product }: { product: Product }) => {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link 
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""} w-full`}
    >
      <div className="relative w-full h-64 overflow-hidden">
        {product.image && (
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product Image"}
            layout="fill"
            sizes="(max-width:768px) 100vw, (max-height:1200px) 50vw, 33vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Name */}
      <div className="p-2">
        <h1 className="text-lg font-semibold text-gray-700 truncate">{product.name}</h1>
      </div>

      {/* Product Description */}
      <p className="p-2 text-sm text-gray-600 line-clamp-2">
        {product.description
          ?.map((block) => 
            block._type === "block"
              ? block.children?.map((child) => child.text).join(" ")
              : ""
          )
          .join(" ") || "No description available"
        }
      </p>

      {/* Product Price */}
      <p className="p-2 text-lg font-bold text-gray-900">
        ${product.price?.toFixed(2)}
      </p>
    </Link>
  );
};

export default ProductThumb;
