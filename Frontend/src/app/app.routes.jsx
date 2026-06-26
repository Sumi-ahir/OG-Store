import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login"
import Home from "../features/product/pages/Home";
import CreateProduct from "../features/product/pages/createProduct";
import Dashboard from "../features/product/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import ProductDetail from '../features/product/pages/ProductDetail'
import Cart from "../features/cart/pages/Cart";
import Nav from '../features/shared/Nav'
import CategoryProducts from "../features/product/pages/CatagoryProducts";
import Hom from "../features/product/pages/Hom";
import Checkout from "../features/order/pages/Checkout";
import EditProduct from '../features/product/pages/EditProduct'
import Wishlist from "../features/wishlist/pages/Wishlist";
import Payment from '../features/order/pages/Payment'
import OrderSuccess from "../features/order/pages/OrderSucess";
import SellerOrders from "../features/product/pages/SellerOrders";
export const routes = createBrowserRouter([
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Nav />,
        children: [
            {
                path: '/products',
                element: <Home />
            },
            {
                path: '/',
                element: <Hom />
            },

            {
                path: '/seller/createProduct',
                element:
                    // <Protected role='seller'>
                    <CreateProduct />
                // </Protected>

            },
            {
                path: '/product/:productId',
                element: <ProductDetail />
            },
            {
                path: '/seller/dashboard',
                element:
                    //  <Protected role='seller'>
                    <Dashboard />
                // </Protected>
            },
            {
                path: '/cart',
                element:
                    // <Protected>
                    <Cart />
                // </Protected>
            },
            {
                path: '/wishlist',
                element: <Wishlist />

            },
            {
                path: '/payment',
                element: <Payment />
            },
            {
                path: '/category/:category',
                element: <CategoryProducts />
            },
            {
                path: '/oreder',
                element: <Checkout />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/order-success',
                element: <OrderSuccess />
            },
            {
                path: '/seller/orders',
                element: <SellerOrders />
            }

        ]
    }
])