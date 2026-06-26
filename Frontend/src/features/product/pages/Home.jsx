import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct";
import { Search, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import hero from "../../../assets/hero.png"

const Home = () => {
  const navigate = useNavigate()
  const { handleGetAllProduct } = useProduct();

  const products = useSelector((state) => state.product.products);

  const [search, setSearch] = useState("");

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  const filteredProducts = products?.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" px-7 md:pt-10 pb-8 min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100">
      {/* HERO SECTION */}
      <div className="flex mt-4 items-center border border-[#4e3a5fe5] md:mx-24 rounded-full px-6 py-2 max-w-md mb-8">
        <Search size={18} className="text-[#4e3a5fe5]" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-2 w-full outline-none bg-transparent"
        />
      </div>
      <span className="border h-[px] text-gray-200 flex mb-8"></span>

      {/* PRODUCTS GRID */}
      <div className="max-w-8xl mx-auto pb-16">

        {filteredProducts?.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">

            <div className="bg-white rounded-2xl  p-10 text-center max-w-md">

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                No Products Found
              </h2>

              <p className="text-gray-500 text-sm mb-6">
                We couldn't find any products matching your search.
                Try searching with different keywords.
              </p>

              <button
                onClick={() => setSearch("")}
                className="px-6 py-2 rounded-xl  shadow-lg shadow-[#6d5a7f50] cursor-pointer  border border-[#4b2e66c8] text-[#3d3247d6] hover:text-white transition-all duration-500 hover:bg-[#3b2352d6] transition"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          <div className="grid  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-col-6 gap-8">

            {filteredProducts?.map((product) => (
              <div onClick={() => navigate(`/product/${product._id}`)}
                key={product._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >

                {/* IMAGE */}
                <div className=" overflow-hidden cursor-pointer">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="h-52 w-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-3 s cursor-pointer  hover:shadow-2xl transition-all duration-300hover:shadow-2xl transition-all duration-300">


                  <div className="flex justify-between">
                    <h2 className="font-semibold text-slate-800 line-clamp-1">
                      {product.title}
                    </h2>
                    <p className="text-[#4b2e66] font-bold text-sm">
                      ₹{product.price?.amount}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Home;