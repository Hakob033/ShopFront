import { useState, useEffect } from "react";
import { ProductStore } from "../app/store/productStore";
import TableHeader from "./tableComponents/tableHeader";
import TableRow from "./tableComponents/tableRow";
import Pagination from "./tableComponents/pagination";
import DeleteModal from "./tableComponents/deleteModal";
import { Product } from "../types/productTypes";

const ProductTable = () => {
  const {
    products,
    loading,
    error,
    page,
    totalPages,
    fetchProducts,
    setPagination,
    deleteProduct,
  } = ProductStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts(page);
  }, [fetchProducts, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination(newPage, totalPages);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id); // Call deleteProduct from the store
      setIsModalOpen(false);
      setProductToDelete(null);
      fetchProducts(page); // Re-fetch products after deletion
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
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
      <div className="overflow-hidden border rounded-lg shadow">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <table className="min-w-full bg-white">
          <TableHeader />
          <tbody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        generatePagination={generatePagination}
      />
      <DeleteModal
        isModalOpen={isModalOpen}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
    </div>
  );
};

export default ProductTable;
