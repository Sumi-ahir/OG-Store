import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearEditProduct } from "../state/product.slice";
import { Upload, X } from "lucide-react";
import { useProduct } from '../hook/useProduct'
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {
    handleCreateProduct,
    handleUpdateProduct,
    handleGetSellerProduct
  } = useProduct();

  const editProduct = useSelector(
    state => state.product.editProduct
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('INR')
  const [error, seterror] = useState({})
  const [sizes, setsizes] = useState([])
  const [category, setCategory] = useState("");

  const [images, setImages] = useState([]);

  

    // Validation 
const validateForm = () => {
  let newError = {};

  if (!title.trim()) {
    newError.title = "Title is required";
  }

  if (!description.trim()) {
    newError.description = "Description is required";
  }

  if (!price || price <= 0) {
    newError.price = "Valid price is required";
  }

  if (!category) {
    newError.category = "Category is required";
  }

  if (sizes.length === 0) {
    newError.sizes = "Select at least one size";
  }

if (images.length === 0) {
  newError.images = "Upload at least one image";
} else if (images.length > 7) {
  newError.images = "You can upload maximum 7 images only";
}

  seterror(newError);
  return Object.keys(newError).length === 0;
};
  useEffect(() => {
    if (editProduct) {

      setTitle(editProduct.title || "");
      setDescription(editProduct.description || "");
      setPrice(editProduct.price?.amount || "");
      setCurrency(editProduct.price?.currency || "INR");
      setCategory(editProduct.category || "");
      setsizes(editProduct.sizes || []);

      setImages(
        editProduct.images?.map(img => ({
          file: null,
          preview: img.url
        })) || []
      );

    }

  }, [editProduct]);


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
     for (let file of files) {
    if (file.size > MAX_SIZE) {
      seterror((prev) => ({
        ...prev,
        images: "Each image must be less than 2MB"
      }));
      return;
    }
  }

    if (images.length + files.length > 7) {
  seterror((prev) => ({
    ...prev,
    images: "Maximum 7 images allowed"
  }));
  return;
}

    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imagePreviews]);
     seterror((prev) => ({ ...prev, images: "" }));
  };

  const removeImage = (index) => {
    const updateImage = [...images];
    updateImage.splice(index, 1)
    setImages(updateImage)
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

     if (!validateForm()) { return;}

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("priceAmount", price);
    formData.append("priceCurrency", currency);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("category", category);

    images.forEach((image) => {

      if (image.file) {
        formData.append("images", image.file);
      }

    });

    try {

      if (editProduct) {

        await handleUpdateProduct(
          editProduct._id,
          formData
        );

        dispatch(clearEditProduct());

        alert("Product Updated Successfully");

      } else {
        await handleCreateProduct(formData);

        // refresh dashboard products
        await handleGetSellerProduct();

        alert("Product Created Successfully");
      }

      navigate("/seller/dashboard");

    } catch (error) {

      console.log(error);

    }

  };

  return (


    <div className="min-h-screen  hide-scrollbar bg-gradient-to-br from-slate-100 via-purple-50 to-violet-100 ">

      <div className="  md:mx-auto max-w-6xl md:px-20 px-4 py-12">

        {/* FORM CARD */}
        <form onSubmit={handleSubmit}
          className="rounded-3xl bg-white/80 backdrop-blur-xl border border-purple-100 shadow-lg shadow-purple-400">
          <div className="flex border-b p-4 border-[#4b2e6626] flex-col md:flex-row mb-7 md:mb-0 items-center md:items-start md:justify-between px-10 pt-5">
            <div className=" mb-5 md:mb-8">
              <h2 className="text-2xl font-semibold text-slate-800">
                {editProduct ? "Edit Product" : "Create New Product"}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Fill in the details carefully for better product visibility.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/seller/dashboard')}
              className="rounded-xl  cursor-pointer   tracking-wide bg-[#482a63ab] px-8  w-50 text-lg font-medium text-white/80 shadow-lg shadow-[#5f3b7e3b] h-12 transition hover:-translate-y-0.5 hover:bg-[#4f2f6bd1]"
            >
              Go Products
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT SECTION */}
            <div className="border-b lg:border-b-0 lg:border-r border-[#452a5e26] px-6 md:px-10">

              <div className="mt-4 md:mt-24 ">
                <h2 className="text-2xl font-semibold text-slate-800">
                  Product Information
                </h2>
              </div>

              <div className="space-y-3 mt-4 md:mt-6">

                {/* Product Title */}
                <div>
                  <label className=" block text-md font-medium text-gray-700">
                    Product Title
                  </label>

                {error.title && (
              <p className="text-red-500 text-sm">{error.title}</p>
              )}

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter product title"
                    className="w-full rounded-lg border border-[#d8c9e6] bg-white/80 px-4 py-3 text-gray-800 outline-none transition focus:border-[#7d5a9e] focus:ring-4 focus:ring-[#7d5a9e1e]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="m-2 block text-md font-medium text-gray-700">
                    Description
                  </label>

                   {error.description && (
                    <p className="text-red-500 text-sm">{error.description}</p>
                  )}

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    placeholder="Write detailed product description..."
                    className="w-full resize-none rounded-2xl border border-[#d8c9e6] bg-white/80 px-4 py-3 text-gray-800 outline-none transition focus:border-[#7d5a9e] focus:ring-4 focus:ring-[#7d5a9e1e]"
                  />
                </div>

                {/* Price + Currency */}
                <div className="grid grid-cols-2 gap-5">

                  <div>
                    <label className="m-2 block text-md font-medium text-gray-700">
                      Price
                    </label>

                    {error.price && (
                      <p className="text-red-500 text-sm">{error.price}</p>
                    )}

                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      placeholder="0.00"
                      className="w-full rounded-xl border border-[#d8c9e6] bg-white/80 px-4 py-3 text-gray-800 outline-none transition focus:border-[#7d5a9e] focus:ring-4 focus:ring-[#7d5a9e1e]"
                    />
                  </div>

                  <div>
                    <label className="m-2 block text-md font-medium text-gray-700">
                      Currency
                    </label>

                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full cursor-pointer rounded-xl border border-[#d8c9e6] bg-white/80 px-4 py-3 text-gray-800 outline-none transition  focus:border-[#7d5a9e] focus:ring-4 focus:ring-[#7d5a9e1e]">

                      <option value="INR" className="cursor-pointer hover: bg-[#d8c9e661] rounded">
                        INR
                      </option>

                      <option value="USD" className="cursor-pointer bg-[#d8c9e661] rounded">
                        USD
                      </option>

                      <option value="EUR" className="cursor-pointer bg-[#d8c9e661] rounded">
                        EUR
                      </option>

                    </select>
                  </div>

                </div>

                {/* category */}
                <div>
                  <label className="m-2 block text-md font-medium text-gray-700">
                    Category
                  </label>

                  {error.category && (
                    <p className="text-red-500 text-sm">{error.category}</p>
                  )}

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#d8c9e6] bg-white/80 px-4 py-3 text-gray-800 outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                </div>

                {/* SIZE */}
                <div>
                  <label className="m-2 block text-md font-medium text-gray-700">
                    Available Sizes
                  </label>

                   {error.sizes && (
                    <p className="text-red-500 text-sm">{error.sizes}</p>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() =>
                          setsizes((prev) =>
                            prev.includes(size)
                              ? prev.filter((s) => s !== size)
                              : [...prev, size]
                          )
                        }
                        className={`px-4 py-2 rounded-lg border transition cursor-pointer
        ${sizes.includes(size)
                            ? "bg-[#5f3b7e] text-white border-[#5f3b7e]"
                            : "border-gray-300"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* IMAGES ERROR */}
                {error.images && (
                  <p className="text-red-500 text-sm">{error.images}</p>
                )}

              </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="p-6 md:p-10 mb-6">

              <div className="mb-4">
                <h2 className="text-2xl  text-slate-800">
                  Product Images
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Upload up to 7 high-quality images.
                </p>
              </div>

              {/* Upload Box */}
              <label className="group flex h-50 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#cfbddf] bg-[#faf7fd] transition hover:border-[#7d5a9e] hover:bg-[#f6f0fb]">

                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#eee4f7] transition group-hover:scale-110">

                  <Upload className="h-6 w-6 text-[#6d3a9a]" />

                </div>

                <p className="mt-3 text-lg font-semibold text-[#4b2e66]">
                  Click to upload images
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  PNG, JPG, WEBP supported
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* Live priew */}
              <div className="mt-8 rounded-2xl border border-purple-100 bg-[#eee4f7] p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4b2e66]">
                  Live Preview
                </h3>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800">
                    {title || "Product Title"}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {description || "Product description preview"}
                  </p>

                  <p className="mt-4 text-2xl font-bold text-[#5f3b7e]">
                    ₹{price || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE PREVIEW */}
          {images.length > 0 && (
            <div className="border-t border-[#4b2e6626] px-6 py-8 md:px-10">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h3 className="text-xl font-semibold text-[#4b2e66]">
                    Uploaded Images
                  </h3>

                  <p className="text-sm text-gray-500">
                    Preview your selected product images.
                  </p>
                </div>

                <span className="rounded-full bg-[#efe7f7] px-4 py-1 text-sm font-medium text-[#6d3a9a]">
                  {images.length}/7
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

                {images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-[#ddd] bg-white shadow-lg shadow-purple-100"
                  >

                    <img
                      src={image.preview}
                      alt="preview"
                      className=" cursor-pointer h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="cursor-pointer absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow transition hover:bg-[#5b446fb0] hover:text-white"
                    >
                      <X className="h-4 w-4 text-gray-700 hover:text-white" />
                    </button>

                  </div>
                ))}

              </div>
            </div>
            
          )}

          {/* FOOTER */}
          <div className="flex flex-col gap-4 border-t border-[#4b2e6626] bg-white/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">

            <p className="text-sm text-gray-500">
              Make sure all product details are accurate before publishing.
            </p>

            <button
              type="submit"
              className="rounded-xl cursor-pointer bg-[#482a63c6] px-8 py-3 text-lg font-medium text-white shadow-lg shadow-[#5f3b7e3b] transition hover:-translate-y-0.5 hover:bg-[#4f2f6bdc]"
            >
              {editProduct ? "Update Product" : "Create Product"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateProduct;