import React, { useState } from "react";
import { Link, useNavigate } from 'react-router'
import clothImage from '../../../assets/cloth1.jpg'
import { register, login } from "../service/auth.api";

import {
  Eye,
  EyeOff,
  Loader2

} from "lucide-react";

const Register = () => {

  // const {handleRegister}=useAuth()
  const navigate = useNavigate()
  const [form, setform] = useState({
    email: '',
    contact: '',
    username: '',
    password: '',
    isSeller: false
  })
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState({})
  const [showPassword, setShowPassword] = useState(false);


  // handle inputedData
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setform((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))

    if (error[name]) {
      seterror((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // validate form 
  const validateForm = () => {
    const newError = {}
    if (!form.email.trim()) {
      newError.email = 'Email is required!'
    }
    else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newError.email = 'Email is invalid!'
    }
    if (!form.username) newError.username = 'username is required'
    else if (form.username.length < 2) newError.username = 'username must be at least 2 character !'

    if (!form.contact.trim()) {
      newError.contact = 'Contact Number is required!'
    }
    else if (!/^\+?\d{10,13}$/.test(form.contact)) {
      newError.contact = 'Enter valid contact number'
    }
    if (!form.password) newError.password = 'Password is required!'
    else if (!/(?=.*[A-Z])(?=.*[!@#%^&*])/.test(form.password)) {
      newError.password = 'Password must be strong !'
    }
    return newError

  }

  // handle  submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (Object.keys(validationError).length > 0) {
      seterror(validationError);
      return;
    }

    try {
      setloading(true);

      await register({
        email: form.email,
        username: form.username,
        contact: form.contact,
        password: form.password,
        isSeller: form.isSeller
      });

      console.log('register successfully !', form);

      navigate("/login");

    } catch (error) {
      console.log(error.response?.data || error.message);
      seterror({
        general:
          error.response?.data?.message || 'Registration failed'
      });

    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex ">

      {/* LEFT SIDE */}

      <div className="cursor-pointer hidden overflow-hidden relative  lg:flex w-1/1.5">
        <img
          src={clothImage}
          alt="shopping"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="absolute bottom-16 left-12 text-white z-10 max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Discover OG Stylish Collection's
          </h1>

          <p className="mt-5 text-gray-200 text-md">
            Create your account and explore premium fashion,
            trending collections, and seamless online shopping.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10 bg-[#AEAEAE]">

        <div className=" max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-8 shadow-2xl">

          {/* Logo */}
          <div className="mb-4 text-center">
            <h2 className=" text-[25px] md:text-3xl font-bold text-[#674188]">
              Create Account
            </h2>

            <p className="mt-2 text-xs text-slate-700">
              Register to continue your shopping journey.
            </p>
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
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-[#470a7d62]"></div>
                <p className="text-sm text-[#470a7d] font-medium">OR</p>
                <div className="flex-1 h-px bg-[#470a7d62]"></div>
              </div>
            </div>
          </div>
          {
            error.general && (
              <div className="mb-6 p-3 text-center text-red-800">
                {error.general}
              </div>
            )
          }
          {/* FORM */}
          <form autoComplete="off" className="space-y-3" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              {/* <label className="text-md text-gray-900 mb-2 block">
                Full Name
              </label> */}


              <input
                type="text"
                name='username'
                onChange={handleChange}
                value={form.username}
                placeholder="sumi ahir"
                className={`w-full bg-transparent outline-none px-3 py-2 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-500
                           ${error.username
                    ? 'border-red-700'
                    : 'border-gray-600'
                  }
                          `}
              />
              {error.username && (
                <p className="mt-1 text-sm text-red-800">{error.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              {/* <label className="text-md text-gray-900 mb-2 block">
                Email
              </label> */}

              <input
                autoComplete="new-email"
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="sumi01@gmail.com"
                className={`w-full outline-none px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-500
    ${error.email ? 'border-red-700' : 'border-gray-600'}
  `}
              />

              {error.email && (
                <p className="mt-1 text-sm text-red-800">{error.email}</p>
              )}
            </div>
            <div>
              {/* <label className="text-md text-gray-900 mb-2 block">
                Contact
              </label> */}


              <input
                autoComplete="new-contact"
                type="text"
                name='contact'
                value={form.contact}
                onChange={handleChange}
                placeholder="9845674323"
                className={`w-full bg-transparent outline-none px-3 py-2 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-500
                           ${error.contact
                    ? 'border-red-700'
                    : 'border-gray-600'
                  }
                          `}
              />

              {error.contact && (
                <p className="mt-1 text-sm text-red-800">{error.contact}</p>
              )}

            </div>

            {/* Password */}
            <div>
              {/* <label className="text-md text-gray-900 mb-2 block">
                Password
              </label> */}


              <div className={`flex items-center bg-white/5 border border-gray-600 rounded-lg px-4
                                        ${error.password
                  ? 'border-red-700'
                  : 'border-gray-600'
                }
                      `}>
                <input
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="TheSumi@03"
                  className={`w-full bg-transparent outline-none px-3 py-2  rounded-lg text-gray-900 placeholder-gray-500
                    ${error.password ? 'border-[#C3ACD0] focus:ring-2 focus:ring-red-300' : ''}
                    `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff className=" cursor-pointer text-gray-700 w-5 h-5" />
                  ) : (
                    <Eye className="cursor-pointer text-gray-700 w-5 h-5" />
                  )}
                </button>

              </div>
              {error.password && (
                <p className="mt-1 text-sm text-red-800">{error.password}</p>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 text-sm text-[#6d3a9a]">
              <input
                type="checkbox" name="isSeller"
                checked={form.isSeller}
                onChange={handleChange}
                className="accent-purple-500"
              />

              <p>Register as a Seller</p>
            </div>

            {/* Button */}
            <button

              type="submit"
              disabled={loading}
              className={`mt-4 w-full bg-[#65388d] hover:opacity-90 transition-all duration-300 py-2  rounded-lg text-white font-semibold text-lg
                 flex items-center justify-center gap-2
                ${loading ? 'bg-[#665378e1]  opacity-70 cursor-not-allowed' : 'cursor-pointer '}
                `
              }
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 text-center animate-spin flex items-center" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )

              }

            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-900 mt-4 text-sm">
            Already have an account?{"   "}
            <span className="text-[#470a7d] hover:underline cursor-pointer">
              <Link to='/login'> Sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;