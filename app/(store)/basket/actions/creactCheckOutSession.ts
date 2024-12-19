"use server";

import stripe from "@/lib/stripe";
import {BasketItem} from "../../store"
import { imageUrl } from "@/sanity/lib/imageUrl";
export type Metadata = {
    orderNumber: string;
    customerName:string;
    customerEmail: string;
    clerkUserId: string;
    
};

export type GroupBasketItem = {
    product: BasketItem["product"];
    quantity: number;
};


export async function creactCheckOutSession(
    items: GroupBasketItem[],
    metadata: Metadata
){
    try {
        const itemWithoutPirce = items.filter((item) =>
            !item.product.price
        );
        if(itemWithoutPirce.length > 0) {
            throw new Error ("Some items do not have a price")

        }

        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        });

        let customerId: string | undefined;
        if(customers.data.length > 0) {
            customerId = customers.data[0].id;
        }

        const baseUrl = "https://my-shopr.netlify.app";

      
      const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
      

      const cancelUrl = `${baseUrl}/basket`;

        console.log(successUrl)

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: items.map((item) => ({
              price_data: {
                currency: "USD",
                unit_amount: Math.round(item.product.price! * 100),
                product_data: {
                  name: item.product.name || "Unnamed Product",
                  description: `Product ID: ${item.product._id}`,
                  metadata: {
                    id: item.product._id,
                  },
                  images: item.product.image
                    ? [imageUrl(item.product.image).url()]
                    : undefined,
                },
              },
              quantity: item.quantity,
            })),
          });
          
        return session.url;
        
    } catch (error) {
        console.error(error);
        throw error
    }
}
