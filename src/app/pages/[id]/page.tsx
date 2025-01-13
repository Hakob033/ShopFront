"use client";

import React, { useState, useEffect } from "react";
import ProductInfoModal from "../../../components/productInfoModal";
import { ProductStore } from "../../store/productStore"; // Import the store
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Product } from "../../../types/productTypes";

const ProductPage: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing delete confirmation modal
  const [product, setProduct] = useState<Product | null>(null);

  const router = useRouter(); // Initialize useRouter

  // Access deleteProduct from the store
  const { deleteProduct } = ProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const id: string = window.location.pathname.split("/").pop()!;
      const res = await fetch(`http://localhost:3001/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, []);

  const handleEdit = () => {
    alert("Edit product functionality here.");
  };

  const handleDelete = () => {
    setShowDeleteModal(true); // Open the delete confirmation modal
  };

  const confirmDelete = async () => {
    if (product) {
      try {
        await deleteProduct(product.id); // Call deleteProduct from the store
        setShowModal(false); // Close the product info modal after deletion
        setShowDeleteModal(false); // Close the delete modal
        router.push("/"); // Redirect to the homepage after successful deletion
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
    setShowDeleteModal(false); // Close the delete confirmation modal
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {showModal && (
        <ProductInfoModal
          product={product}
          // onClose={() => setShowModal(false)}
          onClose={handleOnClose}
          onEdit={handleEdit}
          onDelete={handleDelete} // Open delete confirmation modal on delete button click
        />
      )}

      {/* Delete Confirmation Modal */}
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
