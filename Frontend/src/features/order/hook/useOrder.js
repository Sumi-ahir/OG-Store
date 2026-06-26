import { useDispatch } from "react-redux";
import { createOrder, getSellerOrder } from "../service/order.api";
import { setOrders } from "../state/order.slice";

const useOrder = () => {
  const dispatch = useDispatch();

  // Create Order
  const handleCreateOrder = async (orderData) => {
    try {
      const data = await createOrder(orderData);
      console.log("ORDER RESPONSE:", data);
      return data;
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };
  // Seller Orders
  const handleGetSellerOrders = async () => {
    try {
      const data = await getSellerOrder();

      dispatch(setOrders(data.orders || []));

      console.log("SELLER ORDERS:", data.orders);

      return data.orders;
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  return {
    handleCreateOrder,
    handleGetSellerOrders,
  };
};

export default useOrder;
