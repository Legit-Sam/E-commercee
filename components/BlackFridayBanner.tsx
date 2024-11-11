import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import React from "react";

const  BlackFridayBanner = async () => {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY)

    if(!sale?.isActive){
      return null;
    }

    

  return (

    <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
    <div className="container mx-auto flex flex-col items-start">
      <div className="flex-1 mb-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-left">{sale.title}</h2>
      </div>
      <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
        {sale.description}
      </p>
      <div className="flex">
       <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
        <span className="font-bold text-base sm:text-xl">Use code: {""}</span>
        <span className="text-red-600">
          {sale.couponCode}
        </span>
        <span className="ml-2 font-bold text-base sm:text-xl">
      for {sale.discountAmount} % OFF

        </span>
       </div>
      </div>
    </div>
  </div>
  
  )
};

export default BlackFridayBanner;
