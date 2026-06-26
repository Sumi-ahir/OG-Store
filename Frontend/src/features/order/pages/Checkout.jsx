import React, { useState } from "react";
import OrderReview from "./OrderReview";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../state/order.slice";

const Checkout = () => {
  const dispatch = useDispatch()

  const [activeStep, setActiveStep] = useState(0);

  const shippingData = useSelector(
    (state) => state.order.shippingAddress
  );
  const handleChange = (e) => {
    dispatch(
      setShippingAddress({
        ...shippingData,
        [e.target.name]: e.target.value,
      })
    )
  };
  const handleNext = () => {
    setActiveStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full">
      {activeStep === 0 ? (
        <div className="flex justify-center items-center min-h-screen p-4">
          <div className="bg-white rounded-2xl p-6 md:p-10 w-full max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold text-[#342046cb] mb-8">
              Shipping Address
            </h1>

            <div className="grid md:grid-cols-2 gap-5">
              {Object.keys(shippingData).map((key) => (
                <input
                  key={key}
                  name={key}
                  value={shippingData[key]}
                  onChange={handleChange}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  className="border border-[#3d0f66ea] p-3 rounded-xl outline-none focus:ring-1 focus:ring-[#342046ea]"
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="mt-8 bg-[#342046d3] text-white px-8 py-3 cursor-pointer rounded-xl hover:bg-[#31213ccd]"
            >
              Continue Next
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full px-2 md:px-6 py-4">
          <OrderReview
            shippingData={shippingData}
            back={() => setActiveStep(0)}
          />
        </div>
      )}
    </div>
  );

};
export default Checkout;
