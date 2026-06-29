// import {useSelector,useDispatch} from 'react-redux'
// import { addItemToWish,removeWish,getWish } from '../service/wishlist.api'
// import { addToWishlistItem,removeWishlistItem,setWishlist } from '../state/wishlist.slice'

// const useWishlist = () => {
//     const dispatch=useDispatch();
//     const user=useSelector(state=>state.auth.user)
//     const items=useSelector(state=>state.wishlist.wishlist?.[user?._id] || [])//

//     // handle add to wishlist
//     const handleAddWishlist=async(product)=>{
        
//           console.log("PRODUCT:", product);
//         dispatch(addToWishlistItem({
//             userId:user._id,

//             product:{
//                 productId:product._id,
//                 title:product.title,
//                 image:product.images?.[0]?.url,
//                 price:product.price?.amount
//             }
//         }))
//         await addItemToWish(product._id)
//     }

//     // get wishlist
//     const handleGetWishlist = async () => {
//     const data = await getWish();

//     const mappedItems =
//         data?.wishlist?.items?.map((item) => ({
//             productId: item.product._id,
//             title: item.product.title,
//             image: item.product.images?.[0]?.url,
//             price: item.product.price?.amount,
//         })) || [];
//  console.log("MAPPED:", mappedItems);
//     dispatch(
//         setWishlist({
//             userId: user._id,
//             items: mappedItems,
//         })
//     );
// };
//     // handle remove to wishlist
//      const handleRemoveWishlist=async(productId)=>{
//         dispatch(removeWishlistItem({
//             userId:user._id,
//             productId

//         }))
//         await removeWish(productId)
//     }
//   return {items,handleAddWishlist,handleRemoveWishlist,handleGetWishlist}
// }

// export default useWishlist











import { useSelector, useDispatch } from "react-redux";
import {
  addItemToWish,
  removeWish,
  getWish,
} from "../service/wishlist.api";

import {
  addToWishlistItem,
  removeWishlistItem,
  setWishlist,
} from "../state/wishlist.slice";

const useWishlist = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const items = useSelector(
    (state) => state.wishlist.wishlist?.[user?._id] || []
  );

  const handleAddWishlist = async (product) => {
    if (!user) return;

    const exists = items.some(
      (item) => item.productId === product._id
    );

    if (exists) return;

    await addItemToWish(product._id);
     await handleGetWishlist();

    dispatch(
      addToWishlistItem({
        userId: user._id,
        product: {
          productId: product._id,
          title: product.title,
          image: product.images?.[0]?.url,
          price: product.price?.amount,
        },
      })
    );
  };

  const handleGetWishlist = async () => {
    if (!user) return;

    const data = await getWish();

    const mappedItems =
      data?.wishlist?.items?.map((item) => ({
        productId: item.product._id,
        title: item.product.title,
        image: item.product.images?.[0]?.url,
        price: item.product.price?.amount,
      })) || [];

    dispatch(
      setWishlist({
        userId: user._id,
        items: mappedItems,
      })
    );
  };

  const handleRemoveWishlist = async (productId) => {
    if (!user) return;

    await removeWish(productId);

    dispatch(
      removeWishlistItem({
        userId: user._id,
        productId,
      })
    );
  };

  return {
    items,
    handleAddWishlist,
    handleRemoveWishlist,
    handleGetWishlist,
  };
};

export default useWishlist;