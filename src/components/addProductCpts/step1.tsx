import React from "react";
import ImageUpload from "./imageUpload";

interface Step1Props {
  formData: {
    name: string;
    sku: string;
    category: string;
    price: string;
    stockQuantity: string;
    imageUrl: string;
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onNext: () => void;
  onCancel: () => void;
}

const Step1: React.FC<Step1Props> = ({
  formData,
  onChange,
  onNext,
  onCancel,
}) => {
  const handleImageUpload = (imageUrl: string) => {
    onChange({
      target: { name: "imageUrl", value: imageUrl },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "" || (Number(value) >= 0 && !value.startsWith("-"))) {
      onChange(e);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <ImageUpload onImageUpload={handleImageUpload} />

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
            onChange={handleNumberChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
          />
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={formData.stockQuantity}
            onChange={handleNumberChange}
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
