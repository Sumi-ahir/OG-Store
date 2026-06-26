import axios from 'axios';

const wishlistApi=axios.create({
     baseURL: "http://localhost:5000/api/wishlist",
  withCredentials: true, 
})

// ADD
export const addItemToWish=async(productId)=>{
    const res=await wishlistApi.post(`/add/${productId}`)
    return res.data
}
// GET
export const getWish=async(productId)=>{
    const res=await wishlistApi.get('/');
    return res.data
}
// REMOVE
export const removeWish=async(productId)=>{
    const res=await wishlistApi.delete(`/remove/${productId}`)
    return res.data
}