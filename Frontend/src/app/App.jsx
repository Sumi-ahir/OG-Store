import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { Loader } from "lucide-react";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../features/auth/hook/useAuth";
import { setLoading } from "../features/auth/state/auth.slice";
import { setCart } from "../features/cart/state/cart.slice";
import store from './app.store'
import { getCart } from "../features/cart/service/cart.api";
import { getWish } from "../features/wishlist/service/wishlist.api";
import { setWishlist } from "../features/wishlist/state/wishlist.slice";
// import { setItems } from "../features/cart/state/cart.slice";

const App = () => {
  const dispatch = useDispatch();
  const { handleGetMe } = useAuth();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const cartItems=useSelector((state) => state.cart.carts?.[user?._id] || [])
  // AUTH
  useEffect(() => {
  console.log("AUTH USER CHANGED:", user);
}, [user]);
useEffect(() => {
  console.log("APP LOADED");
  handleGetMe();
}, []);
// LOAD CART AFTER USER COMES
 useEffect(() => {
  async function loadCart() {
    if (!user) return;

  try {
  const data = await getCart();

const mappedItems = 
data?.cart?.items
?.filter(item => item.product)
.map((item) => ({
  productId: item.product._id,
  title: item.product.title,
  image: item.product.images?.[0]?.url,
  price: item.price,
  qty: item.qty,
})) || [];
  
  dispatch(
    setCart({
      userId:user._id,
      items:mappedItems
    })
  )
} catch (err) {
  console.log(err);
}
  }

  loadCart();
}, [user, dispatch]);

// WISHLIST
useEffect(() => {
  async function loadWishlist() {
    if (!user) return;

    try {
      const data = await getWish();

      console.log("WISHLIST RESPONSE:", data);
const mappedItems =
data?.wishlist?.items?.map((item) => ({
  productId: item.product._id,
  title: item.product.title,
  image: item.product.images?.[0]?.url,
  price: item.product.price,
})) || [];

      dispatch(
        setWishlist({
          userId: user._id,
          items: mappedItems,
        })
      );
    } catch (err) {
      console.log("Wishlist Error:", err);
    }
  }

  loadWishlist();
}, [user, dispatch]);

const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
  async function init() {
    await handleGetMe();
    setCheckingAuth(false);
  }
  init();
}, []);
if (checkingAuth) return (
  <div className="h-screen flex items-center justify-center bg-gradient-to-b from-white/60  to-[#4b2e66] text-white">
    <span className="animate-pulse tracking-widest">
      Loading your OG...
    </span>
  </div>
);
// if (loading) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100">
//       <div className="flex flex-col items-center gap-5">

//         {/* Spinner */}
//         <div className="relative">
//           <div className="w-10 h-10 border-4 border-purple-200 rounded-full"></div>
//           <div className="absolute top-0 left-0 w-10 h-10 border-4 border-[#4b2e6699] border-t-transparent rounded-full animate-spin"></div>
//         </div>


//         <p className="text-gray-600 font-medium tracking-wide">
//           Loading your experience...
//         </p>

//       </div>
//     </div>
//   );
// }

  return <RouterProvider router={routes} />;
};

export default App;