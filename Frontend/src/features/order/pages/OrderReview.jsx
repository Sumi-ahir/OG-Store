
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const OrderReview = ({ shippingData, back }) => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const cart = useSelector(
        (state) => state.cart.carts[user?._id] || []
    );
    const total = cart.reduce(
        (sum, item) => sum + item.price.amount * item.qty,
        0
    );

    const confirmOrder = async () => {
        navigate('/payment')
    }
    return (
        <div className="min-h-screen bg-slate-50 py-4 md:py-8">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">

                <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_0.8fr] gap-6 lg:gap-8">

                    {/* LEFT SECTION */}
                    <div className="space-y-6">

                        {/* ADDRESS CARD */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">

                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-[#3b274d]">
                                    Delivery Address
                                </h2>

                                <button
                                    onClick={back}
                                    className="text-sm font-medium text-[#3b274d] hover:underline cursor-pointer"
                                >
                                    Change
                                </button>
                            </div>

                            <div className="space-y-2  text-slate-600">
                                <p className="font-semibold text-slate-800">
                                    {shippingData.firstName}{" "}
                                    {shippingData.lastName}
                                </p>

                                <p>{shippingData.address1}</p>

                                {shippingData.address2 && (
                                    <p>{shippingData.address2}</p>
                                )}

                                <p>
                                    {shippingData.city},{" "}
                                    {shippingData.state} -{" "}
                                    {shippingData.zip}
                                </p>

                                <p>{shippingData.country}</p>
                            </div>

                        </div>

                        {/* PRODUCTS CARD */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">

                            <h2 className="text-xl font-bold text-[#3b274d] mb-6">
                                Order Items ({cart.length})
                            </h2>

                            <div className="space-y-5">

                                {cart.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5"
                                    >
                                        <div className="flex items-center gap-4 flex-1">

                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-24 h-24 rounded-xl object-cover bg-slate-100"
                                            />

                                            <div>
                                                <h3 className="font-semibold text-slate-800 text-base">
                                                    {item.title}
                                                </h3>

                                                <p className="text-sm text-slate-500 mt-1">
                                                    Qty : {item.qty}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="text-right">
                                            <p className="text-xl font-bold text-[#3b274d]">
                                                ₹{item.price.amount}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                    {/* PRICE SUMMARY */}
                    <div className="w-full xl:max-w-md">

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 xl:sticky xl:top-6">

                            <h2 className="text-xl font-bold text-[#3b274d] mb-6">
                                Price Details
                            </h2>

                            <div className="space-y-4 text-slate-600">

                                <div className="flex justify-between">
                                    <span>
                                        Price ({cart.length} items)
                                    </span>

                                    <span>₹{total}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery</span>

                                    <span className="font-semibold text-green-600">
                                        FREE
                                    </span>
                                </div>

                                <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-bold text-slate-900">
                                    <span>Total Amount</span>

                                    <span className="text-[#3b274d]">
                                        ₹{total}
                                    </span>
                                </div>

                            </div>

                            <button
                                onClick={confirmOrder}
                                className="
                                w-fit 
                                p-4
                                mt-8
                                bg-[#3b274dc5]
                                hover:bg-[#2f1f3de4]
                                text-white
                                py-3.5
                                rounded-xl
                                font-semibold
                                transition-all
                                cursor-pointer
                                "
                            >
                                Continue Payment
                            </button>

                            <p className="text-xs text-slate-400 text-center mt-4">
                                Safe and secure payments
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default OrderReview;
