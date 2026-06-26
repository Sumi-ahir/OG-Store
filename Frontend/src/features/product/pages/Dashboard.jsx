import React, { useState } from 'react'
import { useEffect } from 'react'
import { useProduct } from '../hook/useProduct'
import useOrder from '../../order/hook/useOrder'
import { useSelector, useDispatch } from 'react-redux'
import { setEditProduct, clearSellerProducts } from '../state/product.slice'
import CreateProduct from './createProduct'
import { useNavigate } from 'react-router'
import EditProduct from './EditProduct'
import { setOrders } from '../../order/state/order.slice'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  IndianRupee,
  Plus,
  Eye,
  Pencil,
  Star,
  TrendingUp,
  Bell,
  Search,
  Trash2
} from "lucide-react";


const SellerDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { handleGetSellerProduct, handleDeleteProduct } = useProduct()
  const { handleGetSellerOrders } = useOrder()
  const sellerProducts = useSelector(state => state.product.sellerProducts) || [];

  const user = useSelector(state => state.auth.user);
  console.log("USER:", user);
  console.log("USER _id:", user?._id);
  console.log("USER id:", user?.id);
  const orders = useSelector(
    state => state.order.orders
  ) || [];

  useEffect(() => {
    if (!user) return;

    handleGetSellerProduct();
    handleGetSellerOrders();
  }, [user]);

  const totalProduct = sellerProducts.length;
  const totalRevenue = sellerProducts.reduce(
    (total, product) =>
      total + (product.price?.amount || 0),
    0
  );
  // handle delete product
  const deleteProduct = (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;
    handleDeleteProduct(id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-violet-50 to-purple-100  p-4 md:py-10 md:px-15">
      {/* Header */}
      <div className="mb-10 overflow-hidden] rounded-2xl bg-[#4e3a5fe5] p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between">
          <div> <p className="text-sm uppercase tracking-[3px] text-white/70"> Seller Portal </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold"> Welcome Back  </h1>
            <p className="mt-3 max-w-2xl text-white/80"> Manage products, track your growth, and keep your store updated with the latest inventory. </p>
          </div>
          <div className="flex gap-3 mt-6 lg:mt-0">
            <button
              onClick={() => navigate("/seller/createProduct")}
              className="flex items-center gap-2 rounded-xl cursor-pointer bg-white/60 shadow shadow-lg shadow-black/10 px-6 py-3 font-semibold text-[#5f3b7e]"
            >
              <Plus size={18} />
              {/* Create Product */}
            </button>

            <button
              onClick={() => navigate("/seller/orders")}
              className="flex items-center gap-2 rounded-xl cursor-pointer bg-white/60 shadow shadow-lg shadow-black/10  px-6 py-3 font-semibold text-[#5f3b7e]"
            >
              <ShoppingCart size={18} />
              {/* View Orders */}
            </button>
          </div>
        </div>

      </div>

      {/* Stats Card */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">

        {/* total products */}
        <div
          className=" bg-white rounded-2xl p-6 border border-violet-100 shadow-md shadow-violet-300 hover:-translate-y-1v transition"
        >
          <Package className="mb-4 text-[#4b2e66]" />
          <p className="text-gray-700">Total Products</p>

          <h2 className="text-3xl font-bold text-[#4b2e66] mt-2">
            {totalProduct}
          </h2>
        </div>

        {/* orders */}
        <div
          className="bg-white rounded-2xl p-6 border border-violet-100 shadow-md shadow-violet-300 hover:-translate-y-1 transition">
          <ShoppingCart className="mb-4 text-[#4b2e66]" />
          <p className="text-gray-700">Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-[#4b2e66]">
            {orders?.length || 0}
          </h2>
        </div>

        {/* reventue */}
        <div
          className="bg-white rounded-2xl p-6 border border-violet-100 shadow-md shadow-violet-300 hover:-translate-y-1 transition">
          <IndianRupee className="mb-4 text-[#4b2e66]" />
          <p className="text-gray-700">Total Products</p>

          <h2 className="text-3xl font-bold text-[#4b2e66] mt-2">
            ₹{totalRevenue}
          </h2>
        </div>

      </div>

      {/* Product Section */}
      <div>

        <div className="flex items-center gap-2 m-4  mb-6">
          {/* <Package className="text-[#5f3b7e]" /> */}

          <h2 className="text-2xl font-semibold text-[#4b2e66]">
            Products Collection
          </h2>
          <span className="px-3 py-1 rounded-full bg-violet-100 text-[#4b2e66] text-sm">
            {sellerProducts.length}
          </span>
        </div>

        {sellerProducts.length === 0 ? (
          <div className="rounded-3xl bg-white
              border border-violet-100 shadow-xl shadow-[#4b2e6638] p-12 text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Products Found
            </h3>

            <p className="mt-2 text-gray-500">
              Create your first product and start selling today.
            </p>

            <button
              onClick={() => navigate("/seller/createProduct")}
              className="mt-6 cursor-pointer rounded-xl bg-[#472d5dd0] px-6 py-3 text-white hover:bg-[#4d2f67]"
            >
              Create Product
            </button>

          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {sellerProducts.map((product) => (
              <div
                // onClick={()=>navigate(`/seller/product/${product._id}`)}
                key={product._id}
                className="bg-white  border border-[#4937581f]  shadow-black/20 cursor-pointer transition hover:translate-y-[5px] shadow-lg rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
              >

                <img
                  src={product.images?.[0]?.url}
                  alt={product.title}
                  className="h-75 w-full object-cover"
                />

                <div className="p-5">

                  <h3 className="text-lg font-semibold text-[#4b2e66]">
                    {product.title}
                  </h3>

                  <p className="text-gray-700 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">

                    <span className="font-bold text-xl text-[#5f3b7e]">
                      ₹ {product.price?.amount}
                    </span>

                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          dispatch(setEditProduct(product));
                          navigate("/seller/createProduct");
                        }}
                        className="px-3 py-2 cursor-pointer rounded-lg bg-[#604e7050] text-[green]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteProduct(product._id)
                        }}
                        className="px-3 py-2 rounded-lg bg-[#604e7050] text-red-900 hover:bg-[#61363663]"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default SellerDashboard;

