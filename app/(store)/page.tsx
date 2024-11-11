import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProvideView from "@/components/ProvideView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";


export const dynamic = "force-static";
export const revalidate = 60;
export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <BlackFridayBanner />

      <div className="flex min-h-screen bg-gray-100 p-4 justify-start">
        <div className="w-4 sm:w-8 lg:w-12"></div>

        <div className="flex-1 w-full">
          <ProvideView products={products} categories={categories} />
        </div>
      </div>
    </div>
  );
}
