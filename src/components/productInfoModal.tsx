import React, { useState } from "react";
import Edit from "../app/icons/edit";
import Delete from "../app/icons/delete";
import { Product } from "../types/productTypes";
import IconX from "../app/icons/iconX";
import Link from "next/link";

interface ProductInfoModalProps {
  product: Product;
  onClose: () => void;
  onDelete: () => void;
}

const ProductInfoModal: React.FC<ProductInfoModalProps> = ({
  product,
  onClose,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<
    "Details" | "Description" | "History"
  >("Details");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px] h-auto max-h-[70vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Product Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl font-bold"
          >
            <IconX />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b text-center">
          {["Details", "Description", "History"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as "Details" | "Description" | "History")
              }
              className={`flex-1 py-3 ${
                activeTab === tab
                  ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 h-[40vh] overflow-auto">
          {activeTab === "Details" && (
            <div className="flex gap-6">
              {/* Image */}
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-52 h-52 object-cover rounded-md border"
                />
              </div>

              {/* Details */}
              <div className="flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-sm font-semibold text-right">
                    {product.name}
                  </p>

                  <p className="text-sm text-gray-600">SKU</p>
                  <p className="text-sm font-semibold text-right">
                    {product.sku}
                  </p>

                  <p className="text-sm text-gray-600">Category</p>
                  <p className="text-sm font-semibold text-right">
                    {product.category}
                  </p>

                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-sm font-semibold text-right">
                    ${product.price}
                  </p>

                  <p className="text-sm text-gray-600">Stock Quantity</p>
                  <p className="text-sm font-semibold text-right">
                    {product.stockQuantity}
                  </p>

                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-sm font-semibold text-right">
                    <span
                      className={`px-3 py-1 text-xs text-nowrap text-center text-white rounded-full ${
                        product.stockQuantity > 10
                          ? "bg-green"
                          : product.stockQuantity > 0
                          ? "bg-orange"
                          : "bg-red"
                      }`}
                    >
                      {product.stockQuantity > 10
                        ? "In Stock"
                        : product.stockQuantity > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Description" && (
            <div>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          )}

          {activeTab === "History" && (
            <div>
              <p className="text-sm text-gray-600">
                Product history will go here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t">
          <Link href={`/pages/editProduct/${product.id}`}>
            <button className="px-2 py-2 rounded-full bg-gray-400 text-sm text-white ">
              <Edit />
            </button>
          </Link>
          <button
            onClick={onDelete}
            className="px-2 rounded-full bg-gray-400  py-2 text-sm text-white "
          >
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoModal;
