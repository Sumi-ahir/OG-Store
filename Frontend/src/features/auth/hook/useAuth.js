import { setError,setLoading,setUser } from "../state/auth.slice";
import { register,login,getMe,logout} from "../service/auth.api";
import {useDispatch} from "react-redux";
 import { useNavigate } from "react-router";

export const useAuth=()=>{

    // const navigate = useNavigate();
    const dispatch=useDispatch()
    async function handleRegister({email,contact,fullname,password,isSeller=false}){
        const data=await register({email,contact,fullname,password})
        dispatch(setUser(data.user))
        return data.user
    }

    async function handleLogin({email,password}){
        const data=await login({email,password})
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        return data.user
    }
    // async function handleGetMe(){
    //     try{
    //     dispatch(setLoading(true))
    //     const data=await getMe()
    //      dispatch(setUser(data.user))
    //     }catch(error){
    //          console.log("GET ME ERROR:", error.response?.data);
    //         dispatch(setUser(null));
            
    //     }finally{
    //         dispatch(setLoading(false))
    //     }
        
    // }
    async function handleGetMe() {
  try {
    const data = await getMe();
    dispatch(setUser(data.user));
  } catch (error) {
    dispatch(setUser(null));
  }
}
    const handleLogout = async () => {
  try {
    await logout();

    dispatch(clearUser());

    navigate("/login");
  } catch (err) {
    console.log(err);
  }
};
    return {handleRegister,handleLogin,handleGetMe}
}
