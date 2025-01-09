// app/store/productStore.ts
import { create } from "zustand";
import { Product } from "../../types/productTypes";

interface ProductStoreState {
  products: Product[]; // State for storing products
  loading: boolean; // Loading state
  error: string | null; // Error state
  page: number; // Current page
  totalPages: number; // Total number of pages
  pageSize: number; // Number of products per page
  setProducts: (products: Product[]) => void; // Action to set products
  setPagination: (page: number, totalPages: number) => void; // Set pagination info
  fetchProducts: (page: number) => Promise<void>; // Fetch products based on page
}

export const ProductStore = create<ProductStoreState>((set) => ({
  products: [],
  loading: false,
  error: null,
  page: 1, // Default page
  totalPages: 1, // Default total pages
  pageSize: 6, // Products per page

  // Action to set products
  setProducts: (products: Product[]) => set({ products }),

  // Action to set pagination info
  setPagination: (page: number, totalPages: number) =>
    set({ page, totalPages }),

  // Action to fetch products from API based on the page
  fetchProducts: async (page: number) => {
    set({ loading: true, error: null }); // Start loading
    try {
      const res = await fetch(
        `http://localhost:3001/api/products?page=${page}&pageSize=6`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        const data = await res.json();
        set({ products: data.products, totalPages: data.totalPages });
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error: error.message || "An error occurred" });
    } finally {
      set({ loading: false }); // Stop loading
    }
  },
}));
