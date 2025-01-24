"use client";

import React, { useState, useEffect } from "react";
import ProductInfoModal from "../../../../components/productInfoModal";
import { ProductStore } from "../../../store/productStore";
import { useRouter } from "next/navigation";
import { Product } from "../../../../types/productTypes";

const ProductPage: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const router = useRouter();

  const { deleteProduct } = ProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const id: string = window.location.pathname.split("/").pop()!;
      const res = await fetch(`${baseUrl}api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [baseUrl]);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (product) {
      try {
        await deleteProduct(product.id);
        setShowModal(false);
        setShowDeleteModal(false);
        router.push("/");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleOnClose = () => {
    setShowModal(false);
    router.push("/");
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {showModal && (
        <ProductInfoModal
          product={product}
          onClose={handleOnClose}
          onDelete={handleDelete}
        />
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">
              Do you want to remove the product?
            </h2>
            <div className="mt-4 flex justify-center space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-[#0F16170D] rounded-lg"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-[#FF115C] rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
