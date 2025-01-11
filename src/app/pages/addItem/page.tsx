"use client";

import React, { useState } from "react";
import Image from "../../icons/image";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [step, setStep] = useState(1); // Step state
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stockQuantity: "",
    description: "",
  });

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(2); // Go to the next step
  const handleBack = () => setStep(1); // Go back to the previous step
  const handleAdd = () => {
    console.log("Product added:", formData);
  };
  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">New Product</h2>
          <button
            onClick={() => console.log("Modal closed")}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {step === 1 ? (
          // Step 1: Product Details
          <div>
            <div className="grid grid-cols-2 gap-6">
              {/* Image Upload Section */}
              <div className="flex flex-col items-center justify-center border rounded-lg p-6">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="flex flex-col items-center text-gray-400">
                    <Image />
                    <span className="mt-2 text-sm">Product Image</span>
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      console.log("Image uploaded:", e.target.files?.[0])
                    }
                  />
                </label>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
                />
                <input
                  type="text"
                  name="sku"
                  placeholder="SKU"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
                >
                  <option value="">Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                </select>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
                />
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="Stock Quantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-medium text-white rounded-lg hover:bg-dark"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          // Step 2: Description
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full h-40 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
            />
            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleAdd}
                className="px-6 py-2 bg-medium text-white rounded-lg hover:bg-dark"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
