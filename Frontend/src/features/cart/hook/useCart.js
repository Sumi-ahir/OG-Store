import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../state/cart.slice";
import { addItemToCart } from "../service/cart.api";

export const useCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // ADD
  async function handleAddItem(product) {
    if (!user) return;

    dispatch(
      addItem({
        userId: user._id,
        product: {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.images?.[0]?.url,
        },
      }),
    );

    try {
      const res = await addItemToCart(product._id);
      console.log("ADD TO CART API:", res);
    } catch (err) {
      console.log("API sync failed", err);
    }
  }

  return { handleAddItem };
};
