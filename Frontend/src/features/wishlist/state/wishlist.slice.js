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
            state.wishlist[userId].push(product);
        },


        removeWishlistItem:(state,action)=>{

            const {userId,productId}=action.payload;
            state.wishlist[userId] =
            state.wishlist[userId].filter(
                (item)=>item.productId !== productId
            );
        }
    }
})

export const {
    setWishlist,
    addToWishlistItem,
    removeWishlistItem
}=wishlistSlice.actions;


export default wishlistSlice.reducer;