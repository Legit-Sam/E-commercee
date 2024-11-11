"use client";

import { useSearchParams } from "next/navigation";
import userBasketStore from "../store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";



function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderNumber');
    const clearBasket = userBasketStore((state) => state.clearBasket);

    const sessionId = searchParams.get("session_id")

    useEffect(() => {
        if(orderNumber){
            clearBasket();
        }
    }, [orderNumber, clearBasket]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        <h1 className="text-4xl font-bold mb-6 text-center">
            Thank You For Your Order!
        </h1>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
            <p className="text-lg text-gray-700 mb-4">
                Your orders has been confirmed and will be shipped shortly.
            </p>
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-md max-w-md w-full mx-auto">
  {orderNumber && (
    <div className="bg-green-50 p-3 rounded-lg flex items-center justify-between">
      <span className="text-gray-700 font-semibold">Order Number:</span>
      <span className="font-mona text-base text-green-600">{orderNumber}</span>
    </div>
  )}
  {sessionId && (
    <div className="bg-blue-50 p-3 gap-3  rounded-lg flex items-center justify-between w-full">
      <span className="text-gray-700 font-semibold">Transaction ID:</span>
      <span className="font-mona w-[70%] text-base text-blue-600 break-words">{sessionId}</span>
    </div>
  )}
</div>



        </div>

        <div className="space-y-4">
            <p className="text-gray-600">
                A confirmation email has been sent to your registered email address.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-green-400 hover:bg-green-700">
                    <Link
                        href="/orders"
                    >View Order Detials</Link>
                </Button>

                <Button asChild variant="outline">
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </div>
        </div>
        </div>
      </div>
      
    )

}

export default SuccessPage