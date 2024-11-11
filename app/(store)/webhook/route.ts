import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../basket/actions/creactCheckOutSession";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: NextRequest){
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    if(!sig){
        return NextResponse.json({error: "No Signature"}, {status: 404})
    }

    const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if(!webHookSecret){
        console.log("Stripe Webhook secret is not set.. ");
        return NextResponse.json({error: "Stripe Webhook secret is not set"}, {status: 404})
    };

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webHookSecret);
        
    } catch (error) {
        console.log("Webhooks signature verification failed. ", error);
        return NextResponse.json({error: "Webhook Erro"}, {status: 404});
        
    }
    if (event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const order = await createOrderInSanity(session);
            console.log("Order created successfully:", order)
            
        } catch (error) {
            console.log("Error Creating order in Sanity: ", error);
        return NextResponse.json({error: "Error creating order"}, {status: 500});
        }
    }

    return NextResponse.json({received: true });


}

async function createOrderInSanity(session: Stripe.Checkout.Session){
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details,

    } = session;

    const {orderNumber, customerName, customerEmail, clerkUserId,} = metadata as Metadata;

    const lineItemsInProduct = await stripe.checkout.sessions.listLineItems(
        id,{
            expand: ["data.price.product"],
        }
    );

    const sanityProducts = lineItemsInProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,
    }));
    

    const order = await backendClient.create({
        _type: 'order',
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
        products: sanityProducts,  // Changed to match schema’s 'products' array type
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
    });

    return order;

}