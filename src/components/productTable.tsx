import { useState } from "react";
import { Poppins } from "next/font/google";
import Info from "../app/icons/info";
import Edit from "../app/icons/edit";
import Delete from "../app/icons/delete";
import { useEffect } from "react";
import { ProductStore } from "../app/store/productStore"; // Import the store

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const ProductTable = () => {
  const {
    products,
    loading,
    error,
    page,
    totalPages,
    fetchProducts,
    setPagination,
    setProducts, // Add this if your store has a way to update products
  } = ProductStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products when the component mounts or page changes
  useEffect(() => {
    fetchProducts(page); // Fetch products for the current page
  }, [fetchProducts, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination(newPage, totalPages); // Update pagination state
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true); // Open modal
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/${productToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Remove the product from the local state after successful deletion
          setProducts(
            products.filter((product) => product.id !== productToDelete.id)
          );
          setIsModalOpen(false); // Close modal
          setProductToDelete(null); // Clear selected product

          // Reload the products for the current page
          fetchProducts(page);
        } else {
          const errorMessage = await response.text();
          console.error("Failed to delete product:", errorMessage);
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null); // Clear selected product
  };

  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 2) pages.push(page - 1);
      if (page !== 1 && page !== totalPages) pages.push(page);
      if (page < totalPages - 1) pages.push(page + 1);
      pages.push(totalPages);

      pages.sort((a, b) => a - b);
    }

    const finalPages = [];
    for (let i = 0; i < pages.length; i++) {
      if (i > 0 && pages[i] !== pages[i - 1] + 1) {
        finalPages.push("...");
      }
      finalPages.push(pages[i]);
    }
    return finalPages;
  };

  return (
    <div>
      {/* Table */}
      <div className="overflow-hidden border rounded-lg shadow">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b bg-gray-100">
              {/* Table headers */}
              <th
                className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}
              >
                Image
              </th>
              <th
                className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}
              >
                Product Name
              </th>
              <th
                className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}
              >
                SKU
              </th>
              <th
                className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}
              >
                Category
              </th>
              <th
                className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}
              >
                Price
              </th>
              <th
                className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}
              >
                Stock Quantity
              </th>
              <th
                className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}
              >
                Status
              </th>
              <th className="px-6 py-3 text-left">
                <button className="px-6 py-2 text-white bg-medium rounded-xl">
                  CSV
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-md"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.sku}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${product.price}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-700">
                  {product.stockQuantity}
                </td>
                <td className="px-6 py-4">
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
                </td>
                <td className="px-6 py-6 flex space-x-2">
                  <Info />
                  <Edit />
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-end items-center space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          &lt;
        </button>
        {generatePagination().map((p, index) =>
          p === "..." ? (
            <span key={index} className="px-4 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(Number(p))}
              disabled={page === p}
              className={`px-4 py-2 rounded-lg ${
                page === p
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          &gt;
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
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

export default ProductTable;
