import React, { useState } from 'react'

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  return (
    <>
      <div className="flex justify-center gap-8 mb-10">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            1
          </div>
          <span>Shipping Address</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            2
          </div>
          <span>Payment Details</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            3
          </div>
          <span>Review Order</span>
        </div>

      </div>
      <div className="bg-white shadow rounded-lg p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Shipping Address
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            placeholder="First Name"
            className="border p-3 rounded"
          />

          <input
            placeholder="Last Name"
            className="border p-3 rounded"
          />

          <input
            placeholder="Address Line 1"
            className="border p-3 rounded md:col-span-2"
          />

          <input
            placeholder="Address Line 2"
            className="border p-3 rounded md:col-span-2"
          />

          <input
            placeholder="City"
            className="border p-3 rounded"
          />

          <input
            placeholder="State"
            className="border p-3 rounded"
          />

          <input
            placeholder="Zip Code"
            className="border p-3 rounded"
          />

          <input
            placeholder="Country"
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={() => setActiveStep(1)}
          className="mt-6 bg-purple-700 text-white px-6 py-3 rounded"
        >
          Next
        </button>

      </div>
    </>


  )
}

export default Checkout