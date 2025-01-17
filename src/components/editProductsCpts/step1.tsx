import React, { useRef } from "react";
import { Product } from "../../types/productTypes";
import Refresh from "../../app/icons/refresh";
import Image from "next/image";

interface Step1Props {
  formData: Product;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onImageUpload: (imageUrl: string) => void;
  onNext: () => void;
  onCancel: () => void;
}

const Step1: React.FC<Step1Props> = ({
  formData,
  onChange,
  onImageUpload,
  onNext,
  onCancel,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = await uploadImage(file);
        onImageUpload(imageUrl);
      }
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:3001/uploads", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.imageUrl;
    } else {
      throw new Error("Failed to upload image");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="relative">
          <Image
            height={250}
            width={350}
            src={
              formData.imageUrl
                ? `http://localhost:3001/${formData.imageUrl}`
                : "http://localhost:8080/images"
            }
            className=" h-auto w-auto"
            alt="Product"
            priority={true}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <Refresh />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
          />
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
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
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
          />
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={formData.stockQuantity}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-medium text-white rounded-lg hover:bg-dark"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
