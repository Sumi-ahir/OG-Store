import React, { useEffect } from "react";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import useWishlist from "../hook/useWishlist";

const Wishlist = () => {
    const navigate = useNavigate();

    const {
        items,
        handleGetWishlist,
        handleRemoveWishlist,
    } = useWishlist();

    useEffect(() => {
        handleGetWishlist();
    }, []);

  // EMPTY STATE
if (!items || items.length === 0) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">

      <div className="max-w-md w-full text-center">

        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-[#4b2e66]/10 flex items-center justify-center">
          <Heart
            size={32}
            className="text-[#4b2e66]"
          />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-serif text-[#4b2e66]">
          Your Wishlist
        </h1>

        <p className="mt-2 text-lg text-gray-700">
          is currently empty
        </p>

        {/* Description */}
        <p className="mt-5 text-gray-500 leading-relaxed">
          Save products you love and keep track of
          your favourite styles all in one place.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/products")}
          className="
            mt-8
            px-8
            py-3
            rounded-full
            border
            border-[#4b2e66]
            text-[#4b2e66]
            font-medium
            hover:bg-[#4b2e66b3]
            hover:text-white
            transition-all
            duration-300
            cursor-pointer
          "
        >
          Explore Collection
        </button>

      </div>

    </div>
  );
}

    return (
    <div className="max-w-7xl mx-auto md:px-20 py-10 min-h-screen">

  {/* Header */}
  <div className="flex items-end p-4 justify-between mb-10 border-b border-[#4b2e66d9] pb-4">
    <div>
      <h1 className="text-4xl font-serif text-[#4b2e66]">
        Wishlist
      </h1>

      <p className="text-gray-500 mt-1">
        {items.length} saved item{items.length !== 1 ? "s" : ""}
      </p>
    </div>
  </div>

  {/* Products */}
  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer p-4">

    {items.map((product) => (
      
      <div
        key={product.productId}
          onClick={() =>
    navigate(`/product/${product.productId}`)
  }
        className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
      >

        {/* Image */}
        <div className="relative">

          <img
            src={product.image}
            alt={product.title}
            className="h-56 w-full object-cover"
          />

          {/* Remove Icon */}
          <button
            onClick={(e) =>{
               e.stopPropagation();
              handleRemoveWishlist(product.productId);
            }}
            className="absolute text-[#4b2e66d9] cursor-pointer top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition"
          >
            <Trash2 size={16} />
          </button>

        </div>

        {/* Content */}
        <div className="p-4 flex items-center justify-between">

          <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[42px]">
            {product.title}
          </h2>

          
            <span className="text-sm text-[#4b2e66]">
              ₹{product.price?.amount}
            </span>
         

        </div>

      </div>
    ))}

  </div>
</div>

    );
};

export default Wishlist;
