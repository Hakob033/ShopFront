// components/ProductTable.tsx
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
  } = ProductStore();

  // Fetch products when the component mounts or page changes
  useEffect(() => {
    fetchProducts(page); // Fetch products for the current page
  }, [fetchProducts, page]);

  const handlePageChange = (newPage: number) => {
    setPagination(newPage, totalPages); // Update pagination state
  };

  return (
    <div>
      <div className="overflow-hidden border rounded-lg shadow">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b bg-gray-100">
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
                    src={product.image || "https://via.placeholder.com/40"}
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
                <td className="px-6 py-4 text-sm text-gray-700">
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
                  <Delete />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
