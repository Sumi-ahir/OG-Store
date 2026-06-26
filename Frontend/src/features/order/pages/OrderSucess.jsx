import React from "react";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const { width, height } = useWindowSize();

  const orderId =
    "#" +
    Math.floor(
      100000 + Math.random() * 900000
    );

  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={250}
        recycle={false}
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-violet-100 px-4">

        <div
          className="
          bg-white
          max-w-2xl
          w-full
          shadow-lg
          rounded-3xl
          p-8
          md:p-12
          text-center
          animate-[bounceIn_0.8s_ease]
          "
        >

          <p className="text-sm tracking-[0.3em] uppercase text-slate-500">
            Thank You
          </p>

          <h1 className="text-4xl font-bold text-[#3b274d] mt-3">
            Order Confirmed
          </h1>

          <p className="text-slate-500 mt-4 leading-relaxed">
            Your order has been placed successfully.
            We are preparing your items for shipment.
          </p>

          {/* Order Details */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-5 border border-slate-200">

            <div className="flex justify-between mb-4">
              <span className="text-slate-500">
                Order ID
              </span>

              <span className="font-semibold">
                {orderId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Estimated Delivery
              </span>

              <span className="font-semibold text-green-600">
                3 - 5 Days
              </span>
            </div>

          </div>

          {/* Button */}
          <div className="mt-8 flex justify-center">

            <button
              onClick={() => navigate("/products")}
              className="
              px-6
              py-3
              rounded-xl
              bg-[#3b274dd7]
              text-white
              font-semibold
              hover:bg-[#2f1f3d]
              hover:scale-105
              transition-all
              duration-300
              cursor-pointer
              "
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default OrderSuccess;