import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";
import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useCart } from "../../cart/hook/useCart";
import { useSelector } from "react-redux";
import { addItem } from "../../cart/state/cart.slice";
import useWishlist from "../../wishlist/hook/useWishlist";

const ProductDetail = () => {
  const { handleAddItem } = useCart();
  const { handleAddWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const { productId } = useParams();
  const { handleGetProductDetail } = useProduct();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const images = product?.images || [];
  const user = useSelector((state) => state.auth.user);
  const checkBuyer = () => {
      console.log("CHECK BUYER USER:", user);
    if (!user) {
      navigate("/login");
      return false;
    }
      console.log("ROLE:", user.role);
    if (user.role === "seller") {
      navigate("/login");
      return false;
    }
    return true;

  };
  const wishlistItem = useSelector((state) => state.wishlist.wishlist?.[user?._id] || [])
  const isWishlist = wishlistItem.some((item) => item.productId === product?._id)
  const cartItems = useSelector(
    (state) =>
      state.cart.carts[user?._id] || []
  );
  const isInCart = cartItems?.some(
    (item) => item.productId === product?._id
  );
  // fetch product
  const fetchProductDetails = async () => {
    const data = await handleGetProductDetail(productId);
    setProduct(data);
  };
  useEffect(() => {
    if (productId) fetchProductDetails();
  }, [productId]);

  // reset image index when product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [product]);
  const handleAddToCart = () => {
    if (!user) return navigate("/login");

    dispatch(addItem({
      userId: user._id,
      product: {
        productId: product._id,
        title: product.title,
        image: product.images?.[0]?.url,
        price: product.price,
      },
    }));
  };
  const nextImage = () => {
    if (!images.length) return;
    setActiveIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    if (!images.length) return;
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // BUY NOW FUNCTION
  const handleBuyNow = () => {
    if (!checkBuyer()) return;
    dispatch(addItem({
      userId: user._id,
      product: {
        productId: product._id,
        title: product.title,
        image: product.images?.[0]?.url,
        price: product.price,
      },
    }));

    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="h-screen  flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 py-2 md:px-4">
      <div className="px-16 pb-4 flex gap-2 items-center">
        <ChevronLeft
          onClick={() => navigate('/')}
          size={20} className="cursor-pointer" />
        <p className=" cursor-pointertracking-widest text text-[#4e3a5fe5] ">BACK</p>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT SECTION */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 md:mt-20 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt=""
                  onClick={() => setActiveIndex(index)}
                  className={`w-30 h-30  rounded-xl object-cover cursor-pointer border-2 transition
                ${activeIndex === index
                      ? "border-[#4e3a5fe5] scale-105"
                      : "border-gray-200"
                    }`}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="relative flex items-center justify-center overflow-hidden">

              <img
                src={images[activeIndex]?.url}
                alt={product.title}
                className=" h-[550px] object-cover rounded-xl"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer bg-white/20 shadow-lg p-3 rounded-full hover:scale-105 transition"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 bg-white/20 shadow-lg p-3 rounded-full hover:scale-105 transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col md:p-6 lg:mt-16">

            <span className="text-sm  uppercase text-gray-400 tracking-widest mb-2">
              Premium Collection
            </span>

            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-[#4e3a5fe5]">
                {product.title}
              </h1>
              <Heart
                onClick={() => {
                  console.log("Heart Clicked");
                  if (!checkBuyer()) return;
                  handleAddWishlist(product);
                }}
                className={`cursor-pointer  w-7 h-7 text-[#4e3a5fe5] hover:fill-[#4e3a5fe5] hover:text-[#4e3a5f] transition-all  duration-300 hover:scale-110 rounded-full
                ${isWishlist ? "fill-[#4e3a5fe5] text-[#4e3a5fe5]" : "text-[#4e3a5fe5]"
                  }`}
              />
            </div>
            <p className="text-gray-600 leading-relaxed mt-3">
              {product.description}
            </p>
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900">
                ₹{product.price?.amount}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-[#4e3a5fe5] mb-3">
                Select Size
              </h3>

              <div className="flex gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 transition cursor-pointer
                    ${selectedSize === size
                        ? "bg-[#4e3a5fe5] text-white border-[#4e3a5fe5]"
                        : "border-gray-300"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>




            {/* Features */}
            <div className="grid grid-cols-2 mt-4 mb-2">


              <div className="bg-slate-50 p-2 text-[#4e3a5fe5] rounded-xl">
                Free Delivery
              </div>

              <div className="bg-slate-50 p-2 text-[#4e3a5fe5] rounded-xl">
                Easy Returns
              </div>

              <div className="bg-slate-50 p-2 text-[#4e3a5fe5]  rounded-xl">
                Secure Payment
              </div>

              <div className="bg-slate-50 p-2 text-[#4e3a5fe5] rounded-xl">
                Genuine Product
              </div>

            </div>

            {/* Buttons */}
            <div className="flex w-50 gap-4 mt-10">
              {isInCart ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 cursor-pointer py-3 bg-[#4e3a5fe5] text-white rounded-xl "
                >
                  View
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (!checkBuyer()) return;
                    handleAddItem(product);
                  }}
                  className="flex-1 border-2 px-1 border-[#4e3a5fe5] text-[#4e3a5fe5] cursor-pointer rounded-xl hover:bg-[#4e3a5fe5] hover:text-white"
                >
                  Add Cart
                </button>
              )}
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 rounded-xl bg-[#4e3a5fe5] cursor-pointer text-white font-semibold hover:opacity-90 transition"
              >
                Buy
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-10 border-t border-[#4e3a5fe5] pt-6">

              <div className="flex gap-4">
                <span className="text-[#4e3a5fe5] font-semibold">
                  Product ID
                </span>
                <span className="">
                  {product._id}
                </span>
              </div>
              <div className="flex gap-4 py-2">
                <span className="text-[#4e3a5fe5] font-semibold">
                  Currency
                </span>
                <span className="">
                  {product.price?.currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;