import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function Orders() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const orders = await getMyOrders(userId);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-8">My Orders</h1>
                {orders.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">
                        <p>You have not placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.orderNumber}
                                className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
                            >
                                <div className="p-5 sm:p-6 border-b border-gray-200 bg-gray-50">
                                    <div className="flex flex-col sm:flex-row justify-between items-center">
                                        <div>
                                        <p className="text-xs text-gray-500 uppercase sm:text-left text-center">Order Number</p>

                                            <p className="text-lg font-medium text-gray-800">{order.orderNumber}</p>
                                        </div>
                                        <div className="text-right mt-4 sm:mt-0">
                                            <p className="text-xs text-gray-500 uppercase">Order Date</p>
                                            <p className="text-lg font-medium text-gray-800">
                                                {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-semibold text-gray-600">Status:</span>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    order.status === "paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="text-right mt-4 sm:mt-0">
                                            <p className="text-xs text-gray-500 uppercase">Total Amount</p>
                                            <p className="text-xl font-semibold text-gray-800">
                                                {formatCurrency({ amount: order.totalPrice ?? 0, currencyCode: order.currency })}
                                            </p>
                                        </div>
                                    </div>

                                    {order.amountDiscount? (
                                        <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg text-center sm:text-left">
                                            <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">
                                            Discount Subtotal: {" "}
                                            {formatCurrency({ amount: order.amountDiscount, currencyCode: order.currency })}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                            Original Subtotal: {" "}
                                            {formatCurrency({ amount: order.totalPrice ?? 0, currencyCode: order.currency })}
                                            </p>

                                            </div>
                                    ): null}
                                </div>

                                <div className="px-4 py-3 sm:px-6 sm:py-4">
                                    <p className="text-sm font-semibold text-gray-400 mb-3 sm:mb-4">
                                        Order Items
                                    </p>
                                    <div className="space-y-3 sm:space-y-4">
                                        {order.products?.map((product) =>
                                        (
                                            <div key={product.product?._id}
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-2 py-2 border-b last:border-b-8"
                                            >
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                {product.product?.image && (
                                                    <div className=" relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                                                        <Image
                                                        src={imageUrl(product.product.image).url()}
                                                        alt={product.product?.name ?? ""}
                                                        className="object-cover"
                                                        fill
                                                        />

                                                        </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">
                                                        {product.product?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Quantity: {product.quantity ?? "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-medium text-right">
                                            {product.product?.price && product.quantity
    ? formatCurrency({
        amount: product.product.price * product.quantity, // Amount to format
        currencyCode: order.currency // Currency code
    })
    : "N/A"
}

                                            </p>

                                            </div>
                                        ))}
                                        </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
