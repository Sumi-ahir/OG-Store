import {createSlice} from '@reduxjs/toolkit';

const wishlistSlice=createSlice({
    name:'wishlist',

    initialState:{
        wishlist:{},
    },

    reducers:{

        setWishlist:(state,action)=>{
            const { userId, items } =action.payload
            state.wishlist[userId]=items;
        },

        addToWishlistItem:(state,action)=>{

            const {userId,product}=action.payload;
            if(!state.wishlist[userId]){
                state.wishlist[userId]=[];
            }
            // state.wishlist[userId].push(product);
             const exists = state.wishlist[userId].some(
        (item) => item.productId === product.productId
         );
              if (!exists) {
        state.wishlist[userId].push(product);
         }
        },


        // removeWishlistItem:(state,action)=>{

        //     const {userId,productId}=action.payload;
        //     state.wishlist[userId] =
        //     state.wishlist[userId].filter(
        //         (item)=>item.productId !== productId
        //     );
        // }
          removeWishlistItem: (state, action) => {
      const { userId, productId } = action.payload;

      if (!state.wishlist[userId]) return;

      state.wishlist[userId] = state.wishlist[userId].filter(
        (item) => item.productId !== productId
      );
    },

    resetWishlist: (state) => {
      state.wishlist = {};
    },
    }
})

export const {
    setWishlist,
    addToWishlistItem,
    removeWishlistItem,
    resetWishlist
}=wishlistSlice.actions;


export default wishlistSlice.reducer;