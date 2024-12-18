import ProvideView from "@/components/ProvideView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

async function CategoryPage(
    {params}: {params: Promise<{slug: string}>}
){
    const {slug } = await params; 

    const products = await getProductsByCategory(slug);
    const categoties = await getAllCategories();


    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">
             {slug
             .split("-")
             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
             .join(" ")
              }{" "}
    Collection
</h1>


                <ProvideView products={products} categories={categoties} />

            </div>
        </div>
    )
}

export default CategoryPage;