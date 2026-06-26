import React from 'react'
import hero from "../../../assets/hero.png"

const Hero = () => {
  return (
    <>
      <div className="flex flex-col-reverse  md:flex-row items-center justify-between md:py-12 md:pl-30 gap-10 px-8">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#4b2e66aa]  blur-3xl opacity-60"></div>
          <div className="absolute right-[-1%] top-[30%]  w-[40%] h-[60%] rounded-full bg-[#4b2e6648] blur-3xl opacity-60"></div>
          <div className="hidden lg:block absolute top-[40%] left-[20%] w-[40%] h-[50%] rounded-md bg-[#4b2e66aa] blur-3xl opacity-60"></div>
        </div>
        {/* Left Content */}
        <div className="flex-1">
          <p className="text-[#6d5b7b] tracking-[4px] uppercase font-medium">
            New Collection
          </p>
          <h1
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-4xl md:text-6xl font-bold text-[#4b2e66] leading-tight mt-3">
            Discover Your
            Style
          </h1>

          <p className="text-gray-600 mt-5 mx-w-lg md:max-w-sm text-sm md:text-md">
            Explore premium fashion, trendy outfits and timeless
            collections crafted for every occasion.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 600,
                behavior: "smooth",
              })
            }
            className="mt-5 mb-6 border border-[#4b2e66]  text-[#4b2e66] px-8 py-3 font-bold rounded-4xl hover:bg-[#37214d]  hover:text-white transition cursor-pointer"
          >
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={hero}
            alt="Fashion"
            className=" rounded-full object-cover"
          />
        </div>

      </div>
    </>
  )
}

export default Hero