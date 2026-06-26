import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useOrder from "../../order/hook/useOrder";
import { useNavigate } from "react-router";
import {
  Package,
  User,
  CreditCard,
  CalendarDays,
  ArrowLeft
} from "lucide-react";

const SellerOrders = () => {
  const navigate = useNavigate();
  const { handleGetSellerOrders } = useOrder();
  const orders = useSelector(
    (state) => state.order.orders
  ) || [];
  useEffect(() => {
    handleGetSellerOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9fc] px-5 py-10">
      {/* Header */}

      <div className="max-w-6xl mx-auto mb-10">
        <button
          onClick={() => navigate("/seller/dashboard")}
          className="
  mb-5
  flex
  items-center
  gap-2
  text-gray-500
  hover:text-[#3d2455]
  transition
  cursor-pointer
  "
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">
            Back
          </span>
        </button>

        <h1 className="text-3xl font-semibold text-[#3d2455]">
          Customer Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and track your customer's purchases
        </p>

      </div>
      {
        orders.length === 0 ? (

          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm p-14 text-center">

            <Package
              size={45}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-semibold text-gray-600">
              No Orders Found
            </h2>

          </div>


        ) : (

          <div className="max-w-6xl mx-auto space-y-6">

            {
              orders.map((order) => (
                <div
                  key={order._id}
                  className="
                  bg-white 
                  rounded-3xl
                  shadow-sm
                  border
                  border-gray-100
                  overflow-hidden
                  hover:shadow-md
                  transition
                  "
                >
                  {/* Top Section */}

                  <div className="
                  flex 
                  justify-between
                  items-center
                  px-7
                  py-5
                  border-b
                  bg-gradient-to-r
                  from-[#faf7ff]
                  to-white
                  ">
                    <div className="flex gap-4 items-center">
                      <div className="
                      w-12 h-12 
                      rounded-full
                      bg-[#efe6fa]
                      flex items-center justify-center
                      ">
                        <User
                          size={22}
                          className="text-[#6b3fa0]"
                        />
                      </div>
                      <div>
                        <h3 className="
                        font-semibold 
                        text-[#3d2455]
                        ">
                          {order.user?.name || "Customer"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {order.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h2 className="
                      text-xl
                      font-bold
                      text-[#3d2455]
                      ">
                        ₹{order.totalAmount}
                      </h2>
                      <span
                        className={`
                      inline-block
                      mt-1
                      px-4
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${order.orderStatus === "Delivered"
                            ?
                            "bg-green-100 text-green-700"
                            :
                            "bg-yellow-100 text-yellow-700"
                          }
                      `}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  {/* Products */}

                  <div className="px-7 py-5">
                    <h4 className="
                    text-sm 
                    font-semibold
                    text-gray-400
                    uppercase
                    mb-4
                    ">
                      Products
                    </h4>
                    {
                      order.items?.map((item) => (
                        <div
                          key={item._id}
                          className="
                        flex
                        items-center
                        gap-5
                        py-4
                        border-b
                        last:border-none
                        "
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="
                          w-20
                          h-20
                          rounded-2xl
                          object-cover
                          border
                          "
                          />
                          <div className="flex-1">
                            <h3 className="
                            font-semibold
                            text-gray-800
                            ">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Quantity : {item.qty}
                            </p>
                          </div>
                          <p className="
                          font-bold
                          text-[#6b3fa0]
                          ">
                            ₹{item.price}
                          </p>
                        </div>
                      ))
                    }
                  </div>
                  {/* Bottom */}
                  <div className="
                  flex
                  justify-between
                  items-center
                  px-7
                  py-4
                  bg-gray-50
                  text-sm
                  text-gray-500
                  ">
                    <div className="flex gap-2 items-center">
                      <CreditCard size={16} />
                      Payment :
                      <span className="font-medium text-gray-700">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">

                      <CalendarDays size={16} />

                      {new Date(order.createdAt)
                        .toLocaleDateString()}

                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};
export default SellerOrders;