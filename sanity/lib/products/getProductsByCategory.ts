import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"



export const getProductsByCategory = async( categorySlug :string) => {
    const PRODUCTS_BY_CATEGORIES_QUERY = defineQuery(
        `
            *[
            _type == "product"
            && references(*[_type == "category" && slug.current == $categorySlug]._id)
    ] | order(name asc)
        `
    );

    try {
        const categories = await sanityFetch({
            query: PRODUCTS_BY_CATEGORIES_QUERY,
            params:{
                categorySlug,
            },
        });

        return categories.data || [];
        
    } catch (error) {
        console.log("Error fetching products", error);
        return [];
    }
}