import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import clothImage from "../../../assets/cloth1.jpg"
import { login } from "../service/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../state/auth.slice";
import { clearSellerProducts } from "../../product/state/product.slice";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [form, setform] = useState({
    email: '',
    password: ''
  })
  const [success, setsuccess] = useState('')
  const [error, seterror] = useState({})
  const [loading, setloading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  // handle inputedData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }))

    if (error[name]) {
      seterror((prev) => ({ ...prev, [name]: '' }))
    }
  }
  // validation
  const validateForm = () => {
    const newError = {}
    if (!form.email.trim()) newError.email = 'Email is Required'

    if (!form.password.trim()) newError.password = 'Password is Required'
    return newError
  }
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (Object.keys(validationError).length > 0) {
      seterror(validationError);
      return;
    }

    try {
      setloading(true);
      seterror({});
      setsuccess('');

      const data = await login({
        email: form.email,
        password: form.password
      });

      const user = data.user;

      setsuccess(data.message || 'Login successfully!');
      console.log("LOGIN USER:", user);
      console.log("ROLE:", user?.role);

      dispatch(clearSellerProducts());
      dispatch(setUser(user));
      if (user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.log(error.response?.data);

      setsuccess('');

      seterror({
        general: error.response?.data?.message || 'Invalid credentials'
      });

    } finally {
      setloading(false);
    }
  };

  return (
    <div className='min-h-screen flex  '>
      {/* LEFT SIDE */}
      <div className="cursor-pointer hidden overflow-hidden relative  lg:flex w-1/1.2">
        <img
          src={clothImage}
          alt="shopping"
          className="h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className='absolute bottom-16 left-12 text-white max-w-md'>

          <h1 className='text-5xl font-bold leading-tight  '>
            Discover OG Stylish Collection's
          </h1>
          <p className='mt-5 text-gray-200 text-md'>

            Create your account and explore premium fashion,
            trending collections, and seamless online shopping.
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/3 flex items-center justify-center px-6 py-10 bg-[#AEAEAE]">

        <div className=" max-w-lg bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-8 shadow-2xl">

          {/* Logo */}
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold text-[#674188]">
              Sign In
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              Sign In to continue your shopping journey.
            </p>
          </div>

          {/* google */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "http://localhost:5000/api/auth/google";
              }}
              className="w-full mt-2 flex items-center justify-center gap-3 rounded-lg py-2 cursor-pointer hover:underline transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />

              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-[#5f3b7e]"></div>
              <p className="text-sm text-[#470a7d] font-medium">OR</p>
              <div className="flex-1 h-px bg-[#470a7d62]"></div>
            </div>
          </div>
          {
            error.general && (
              <div className="mb-4 p-3  text-center text-red-700">
                {error.general}
              </div>
            )
          }
          {
            success && (
              <div className="mb-4 p-3  text-center text-green-700">
                {success}
              </div>
            )
          }


          {/* FORM */}
          <form className="space-y-2" onSubmit={handleSubmit}>

            {/* Email */}
            <div>


              <input
                type="text"
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="sumi01@gmail.com"
                className={`w-full bg-transparent outline-none px-3 py-2 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-500
                           ${error.email
                    ? 'border-red-700'
                    : 'border-gray-600'
                  }
                          `}
              />

              {error.email && (
                <p className="text-red-800 text-sm mt-1">
                  {error.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>


              <div className={`flex items-center bg-white/5 border border-gray-600 rounded-lg px-4
                                        ${error.password
                  ? 'border-red-700'
                  : 'border-gray-600'
                }
                      `}>

                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={form.password}
                  onChange={handleChange}
                  placeholder="TheSumi@05"
                  className={`w-full bg-transparent outline-none px-3 py-2 text-gray-900 placeholder-gray-500
         
                          `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-700 w-5 h-5" />
                  ) : (
                    <Eye className="text-gray-700 w-5 h-5" />
                  )}
                </button>
              </div>
              {error.password && (
                <p className="text-red-800 text-sm mt-1">
                  {error.password}
                </p>
              )}
            </div>

            {/* Checkbox */}
            <div className=" text-sm text-[#6d3a9a] text-end">
              <p>Forgot Passord</p>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-2 w-full bg-[#5f3b7e] hover:opacity-90 transition-all duration-300 py-2  rounded-lg text-white font-semibold text-lg
                      flex items-center justify-center gap-2
                      ${loading ? 'bg-[#665378e1] opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                      `}
            >
              {loading && (
                <Loader2 className="animate-spin" size={18} />
              )}
              {loading ? "Sign in..." : "Sign in"}
            </button>
          </form>


          {/* Footer */}
          <p className="text-center text-gray-900 mt-6 text-sm">
            Don't have an Account?{"   "}
            <span className="text-[#470a7d] hover:underline cursor-pointer">
              <Link to='/register'> Sign up</Link>
            </span>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Login