import React, { useEffect, useState } from "react";
import { useProduct } from "../hook/useProduct";


const EditProduct = ({ product, onClose, refresh }) => {

    const { handleUpdateProduct } = useProduct();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount: "",
        category: ""
    });
    useEffect(() => {

        if (product) {
           setFormData({
                title: product.title || "",
                description: product.description || "",
                amount: product.price?.amount || "",
                category: product.category || ""
            })
        }
    }, [product])
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
       await handleUpdateProduct(
            product._id,
            formData
        );
        refresh();
        onClose();

    }
    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
           <div className="bg-white p-8 rounded-xl w-[500px]">
                <h2 className="text-2xl font-bold mb-5">
                    Edit Product
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-3 w-full mb-3"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-3 w-full mb-3"
                    />
                    <input
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="border p-3 w-full mb-3"
                    />
                    <button
                        className="bg-purple-600 text-white px-5 py-2 rounded"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-3 bg-gray-300 px-5 py-2 rounded"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}
export default EditProduct;