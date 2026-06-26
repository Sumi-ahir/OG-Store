import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct";

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const { handleGetAllProduct } = useProduct();

  const products = useSelector(
    (state) => state.product.products
  );

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  console.log("URL Category:", category);
  console.log("Products:", products);

  const filteredProducts = products?.filter((product) => {
    console.log("Product Category:", product.category);
    return product.category === category;
  });

  return (
    <div className="px-7 md:px-20 py-10">
      <h1 className="text-3xl border-b pb-10 font-semibold tracking-wide  capitalize mb-8 text-[#4b2e66] ">
        {category} Products
      </h1>

      <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-col-6 gap-8">
        {filteredProducts?.map((product) => (
          <div
            key={product._id}
            onClick={() =>
              navigate(`/product/${product._id}`)
            }
            className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={product.images?.[0]?.url}
              alt={product.title}
              className="h-80 w-full object-cover"
            />

            <div className="p-4 s cursor-pointer  hover:shadow-2xl transition-all duration-300hover:shadow-2xl transition-all duration-300">


              <div className="flex justify-between">
                <h2 className="font-semibold text-slate-800 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-[#4b2e66] font-bold text-lg">
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
    </div>
  );
};

export default CategoryProducts;