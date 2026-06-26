
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderSuccess from "./OrderSucess";
import { useSelector, useDispatch } from "react-redux";
import useOrder from "../hook/useOrder";
import { clearCart } from "../../cart/state/cart.slice";
import { useRazorpay } from "react-razorpay";
const Payment = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Razorpay, error, isLoading } = useRazorpay();
  const { handleCreateOrder } = useOrder();

  const shippingData = useSelector(
    (state) => state.order.shippingAddress
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const cart = useSelector(
    (state) => state.cart.carts[user?._id] || []
  );


  const total = cart.reduce(
    (sum, item) => sum + item.price.amount * item.qty,
    0
  );


  const [paymentMethod, setPaymentMethod] = useState("COD");


  const handlePayment = async () => {
    const orderData = {
      shippingAddress: shippingData,
      products: cart,
      totalAmount: total,
      paymentMethod: paymentMethod
    };

    const response=await handleCreateOrder(orderData);
    if (!response) return;
    console.log(response);
    // COD CASE
    if(paymentMethod==='COD'){
      dispatch(clearCart({userId:user._id}));
      navigate("/order-success");
      return;
    }

    const razorpayOrder=response.razorpayOrder;
    const options= {
      key: "rzp_test_T6MhwyKAh1l8jo",
      amount: razorpayOrder.amount, // Amount in paise
      currency: razorpayOrder.currency,
      name: "OG Store",
      order_id: razorpayOrder.id, // Generate order_id on server
      handler: async (paymentResponse) => {
         console.log(paymentResponse);
        alert("Payment Successful!");
        dispatch(clearCart({ userId: user._id }));
      navigate("/order-success");
      },
    };
    console.log(response.razorpayOrder);
    if (error) {
  console.log(error);
  return;
}

if (isLoading) {
  console.log("Razorpay is loading...");
  return;
}

const rzp = new Razorpay(options);
rzp.open();
      // prefill: {
      //   name: user?.username,
      //   email: user?.email,
      //   contact: user?.contact,
      // },
      // theme: {
      //   color: tokens.primary,
      // },
  }
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Checkout
          </p>

          <h1 className=" text-xl md:text-3xl  font-bold text-[#3b274dc5] mt-2">
            Payment Details
          </h1>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">

          {/* PAYMENT METHODS */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">

            <h2 className="text-xl font-sans line-2 font-semibold text-[#2b2334be] mb-6">
              Choose Method
            </h2>

            {/* COD */}
            <label
              className={`
          flex items-center gap-4
          border-2
          rounded-2xl
          p-5
          mb-4
          cursor-pointer
          transition-all
          ${paymentMethod === "COD"
                  ? "border-[#2321250c] bg-[#23212519]"
                  : "border-slate-200 hover:border-slate-300"
                }
        `}
            >
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5"
              />

              <div>
                <h3 className="font-semibold text-lg text-[#3b274d]">
                  Cash On Delivery
                </h3>

                <p className="text-slate-500 text-sm">
                  Pay when your order arrives at your doorstep
                </p>
              </div>
            </label>

            {/* ONLINE */}
            <label
              className={`
          flex items-center gap-4
          border-2
          rounded-2xl
          p-5
          cursor-pointer
          transition-all
         ${paymentMethod === "ONLINE"
                  ? "border-[#23212511] bg-[#23212519]"
                  : "border-slate-200 hover:border-slate-300"
                }
        `}
            >
              <input
                type="radio"
                name="payment"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5"
              />

              <div>
                <h3 className="font-semibold text-lg text-[#3b274d]">
                  Online Payment
                </h3>

                <p className="text-slate-500 text-sm">
                  UPI, Debit Card, Credit Card & Net Banking
                </p>
              </div>
            </label>

          </div>

          {/* ORDER SUMMARY */}
          <div>
            <div className="bg-white shadow-sm shadow-black/20 rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-6">

              <h2 className="text-2xl font-semibold border-b border-[#3b274d71] pb-4 text-[#3b274d] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-slate-600">

                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{cart?.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>

                  <span className="font-semibold text-green-600">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Payment Method</span>

                  <span className="font-medium">
                    {paymentMethod === "COD"
                      ? "COD"
                      : "Online"}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span className="text-[#3b274d]">
                    ₹{total}
                  </span>
                </div>

              </div>

              <button

                onClick={handlePayment}
                className="
            w-fit p-4
            mt-8
            bg-[#3b274ddf]
            hover:bg-[#2f1f3dca]
            hover:shadow
            hover:shadow-xl
            shadow-black/40
            text-white
            py-2
            rounded-lg
            font-serif
            text-lg
            transition-all
            duration-300
            cursor-pointer
            "
              >
                {paymentMethod === "COD"
                  ? "Place Order"
                  : "Pay Securely"}
              </button>

              <p className="text-center text-xs text-slate-400 mt-4">
                Safe & Secure Payments
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Payment;



















