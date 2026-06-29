import { setError,setLoading,setUser } from "../state/auth.slice";
import { register,login,getMe} from "../service/auth.api";
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

   
    // localStorage.setItem("token", data.token)
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        return data.user
    }
    async function handleGetMe(){
        try{
        console.log("GET ME CALLED");
        dispatch(setLoading(true))
        const data=await getMe()
         console.log("GET ME RESPONSE:", data);
         dispatch(setUser(data.user))
        }catch(error){
             console.log("GET ME ERROR:", error.response?.data);
            dispatch(setUser(null));
            
        }finally{
            dispatch(setLoading(false))
        }
        
    }
    return {handleRegister,handleLogin,handleGetMe}
}
