import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../auth/state/auth.slice";
import { clearCart } from "../cart/state/cart.slice";
import Footer from "./Footer";
import logo from './og.png'
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenu, setmobileMenu] = useState(false)
  const [search, setsearch] = useState('')
  const user = useSelector((state) => state.auth.user);

  const cartItems = useSelector(
    (state) =>
      state.cart.carts?.[user?._id] || []
  );
  const wishlistItems = useSelector(state => state.wishlist.wishlist?.[user?._id] || [])//
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(clearCart());
    navigate("/login");
  };


  return (
    <div>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 text-white/70 bg-[#342543d2] shadow-md">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div onClick={() => navigate("/")}>
              <span
                onClick={() => navigate("/")}
                className="no-copy cursor-pointer font-bold text-2xl font-serif"> OG Store</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden  md:flex items-center gap-8 ">

              <button className="cursor-pointer text-lg hover:text-[#342147]" onClick={() => navigate("/")}>
                Home
              </button>

              <button className="cursor-pointer text-lg hover:text-[#342147]" onClick={() => navigate("/products")}>
                Products
              </button>

              {/* Category Dropdown */}
              <div className="relative group">
                <button className="cursor-pointer text-lg">
                  Categories
                </button>

                <div
                  className="
    absolute
    left-0
    top-full
    z-50
    hidden
    group-hover:flex
    flex-col
    bg-white
    shadow-xl
    rounded-xl
    min-w-[180px]
    overflow-hidden
    "
                >
                  <button
                    className="px-4 text-[#342147] cursor-pointer  py-3 text-left hover:bg-gray-100"
                    onClick={() => navigate("/category/men")}
                  >
                    Men
                  </button>

                  <button
                    className="px-4 text-[#342147] cursor-pointer py-3 text-left hover:bg-gray-100"
                    onClick={() => navigate("/category/women")}
                  >
                    Women
                  </button>
                </div>
              </div>

            </div>



            {/* Right Icons */}
            <div className="flex items-center gap-3">

              {user && (
                <button
                  onClick={() => navigate("/wishlist")}
                  className="hidden md:flex p-2 relative text-[#4b2e66] bg-white/50 rounded-full shadow cursor-pointer text-lg hover:text-[#342147]"
                >
                  <Heart size={20} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
              )}

              {user && (
                <button
                  onClick={() => navigate("/cart")}
                  className="hidden md:flex relative p-2 text-[#4b2e66] bg-white/50 rounded-full shadow cursor-pointer text-lg hover:text-[#342147]"
                >
                  <ShoppingCart size={20} />

                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500  text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              )}

              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="hidden md:flex p-2 rounded-full bg-white/50 shadow cursor-pointer text-lg hover:text-[#342147]"
                >
                  <User size={20} className="cursor-pointer text-[#4b2e66] text-lg hover:text-[#342147]" />
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="hidden md:flex p-2 bg-white/50 rounded-full shadow text-red-500"
                >
                  <LogOut size={20} className="cursor-pointer  text-lg hover:text-[#342147]" />
                </button>
              )}

              {/* Mobile Menu */}
              <button
                className="md:hidden cursor pointer"
                onClick={() => setmobileMenu(!mobileMenu)}
              >
                {mobileMenu ? <X /> : <Menu />}
              </button>

            </div>
          </div>
        </div>
      </nav>

      {mobileMenu && (
        <div className="
  md:hidden
  bg-white
  border-b 
  border-[#4b2e66]
  shadow-xl
  shadow-black/10
  animate-in
  slide-in-from-top
  duration-30 

  ">

          <div className="px-6 space-y-2">

            <button
              className="
        w-full
        text-left
        px-4
        pt-2
        rounded-xl
        text-[#4b2e66]
        hover:bg-[#f4f0f8]
        transition
        "
              onClick={() => {
                navigate("/");
                setmobileMenu(false);
              }}
            >
              Home
            </button>

            <button
              className="
        w-full
        text-left
        px-4
        rounded-xl
        text-[#4b2e66]
        hover:bg-[#f4f0f8]
        transition
        "
              onClick={() => {
                navigate("/products");
                setmobileMenu(false);
              }}
            >
              Products
            </button>

            <button
              className="
        w-full
        text-left
        px-4
        rounded-xl
        text-[#4b2e66]
        hover:bg-[#f4f0f8]
        transition
        "
              onClick={() => {
                navigate("/category/men");
                setmobileMenu(false);
              }}
            >
              Men Collection
            </button>

            <button
              className="
        w-full
        text-left
        px-4
        rounded-xl
        text-[#4b2e66]
        hover:bg-[#f4f0f8]
        transition
        "
              onClick={() => {
                navigate("/category/women");
                setmobileMenu(false);
              }}
            >
              Women Collection
            </button>

            {user && (
              <>
                <div className="border-t border-[#4b2e66] my-2" />

                <button
                  className="
            w-full
            flex
            justify-between
            items-center
            px-4
            rounded-xl
            text-[#4b2e66]
            font
            hover:bg-[#f4f0f8]
            transition
            "
                  onClick={() => {
                    navigate("/wishlist");
                    setmobileMenu(false);
                  }}
                >
                  <span>Wishlist</span>

                  <span className="
            bg-red-100
            text-red-600
            px-2
            py-1
            rounded-full
            text-xs
            font-semibold
            ">
                    {wishlistItems.length}
                  </span>
                </button>

                <button
                  className="
            w-full
            flex
            justify-between
            items-center
            px-4
            rounded-xl
            text-[#4b2e66]
            hover:bg-[#f4f0f8]
            transition
            "
                  onClick={() => {
                    navigate("/cart");
                    setmobileMenu(false);
                  }}
                >
                  <span>Cart</span>

                  <span className="
            bg-red-100
            text-red-600
            px-2
            py-1
            rounded-full
            text-xs
            font-semibold
            ">
                    {cartItems.length}
                  </span>
                </button>
              </>
            )}

            <div className="border-t border-[#4b2e66] my-3" />

            {user ? (
              <button
                className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-red-50
          text-red-600
          py-3
          rounded-xl
          font-semibold
          transition
          "
                onClick={() => {
                  handleLogout();
                  setmobileMenu(false);
                }}
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <button
                className="
          w-fit 
          flex
          items-center
          justify-center
          gap-2
          bg-[#342543d2]
          text-white
          p-2
          m-2
          rounded-xl
          font-semibold
          transition
          "
                onClick={() => {
                  navigate("/login");
                  setmobileMenu(false);
                }}
              >
                <User size={18} />
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Nav;