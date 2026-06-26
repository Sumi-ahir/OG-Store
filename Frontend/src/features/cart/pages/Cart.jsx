
import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "../state/cart.slice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.auth.user
  );

  const cartItems = useSelector(
    (state) =>
      state.cart.carts?.[user?._id] || []
  );
  console.log("USER", user);
  console.log("USER ID", user?._id);

  console.log(
    "REDUX CART",
    cartItems
  );
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      ((item.price?.amount || 0) * (item.qty || 1)),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100 px-6">

        <div className="text-center max-w-md">

          {/* Heading */}
          <p className="text-sm text-[#4e3a5fe5] tracking-[0.3em] mb-10">
            THE COLLECTION
          </p>

          <h1 className="text-4xl md:text-4xl font-semibold text-[#4e3a5fe5] mb-10">
            Empty Collection
          </h1>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Looks like you haven't added anything yet.
            Discover our latest collection and find something you love.
          </p>


          <button
            onClick={() => navigate('/')}
            className="
              mt-8
              px-4
              py-3
              bg-[#4e3a5fd5]
              text-white
              rounded-xl
              font-medium
              tracking-wide
              cursor-pointer
              hover:bg-[#3b2a4de0]
              hover:scale-105
              transition-all
              duration-300
              shadow-lg
              "
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 sm:px-6 py-10">

      <div className="max-w-5xl mx-auto mt-8 md:mt-12">

        <div className="flex flex-col gap-4">
          <p className=" text-sm text-[#4e3a5fe5] tracking-widest">THE COLLECTION </p>

          <h1 className="text-3xl font-semibold md:text-4xl text-[#4e3a5fe5]">
            Your Collection
          </h1>
        </div>

        <div className="grid mt-10 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12">

          {/* LEFT SECTION */}
          <div className="space-y-2">

            {cartItems.map((item, index) => (


              <div
                key={index}
                className="
                          bg-white
                          p-5
                          sm:p-6
                          rounded-3xl
                          border
                          border-slate-200
                          shadow-sm
                          hover:shadow-md
                          transition-all
                          duration-300
                          "
              >
                <div className="flex flex-col sm:flex-row gap-6">

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                    w-full
                    sm:w-40
                    h-56
                    sm:h-48
                    object-cover
                    rounded-2xl
                    bg-slate-100
                    "
                  />

                  {/* DETAILS */}
                  <div className="flex-1">

                    <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                      Premium Collection
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl sm:text-xl font-semibold text-[#3b274d]">
                          {item.title}
                        </h2>
                      </div>

                      <div>
                        {/* REMOVE */}
                        <button
                          onClick={() =>
                            dispatch(
                              removeItem({
                                userId: user._id,
                                productId: item.productId,
                              })
                            )
                          }
                          className="
                          flex
                          items-center
                          gap-2
                          text-red-500
                          hover:text-red-600
                          font-medium
                          cursor-pointer
                          transition
                          "
                        >
                          <RiDeleteBin6Line size={20} />

                        </button>
                      </div>
                    </div>

                    <p className="text-md font-bold text-[#3b274d] mt-3">
                      ₹{item.price?.amount}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-6 gap-4">

                      {/* QUANTITY */}
                      <div className="flex items-center w-fit  border border-slate-300 rounded-xl overflow-hidden">

                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQty({
                                userId: user._id,
                                productId: item.productId,
                              })
                            )
                          }
                          className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>

                        <span className="px-5 font-medium">
                          {item.qty}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              increaseQty({
                                userId: user._id,
                                productId: item.productId,
                              })
                            )
                          }
                          className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>

                      </div>



                    </div>
                  </div>
                </div>
              </div>



            ))}

          </div>

          {/* RIGHT SECTION */}
          <div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm sticky lg:top-10">
              <h2 className="text-xl font-semibold mb-8 text-[#4e3a5fe5]">
                Order Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>
                    ₹{subtotal}
                  </span>
                </div>

              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="
             mt-8
        px-4
        py-3
        bg-[#4e3a5fd5]
        shadow-md
        shadow-black/60
        text-white
        rounded-xl
        font-medium
        tracking-wide
        cursor-pointer
        hover:bg-[#3b2a4de0]
        hover:scale-105
        transition-all
        duration-300
        shadow-lg
            ">
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;

