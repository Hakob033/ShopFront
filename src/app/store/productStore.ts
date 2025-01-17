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
  fetchProducts: (page: number, status: any, search: any) => Promise<void>; // Fetch products based on page
  deleteProduct: (productId: string) => Promise<void>; // Delete product
}

export const ProductStore = create<ProductStoreState>((set) => ({
  products: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  pageSize: 6,

  // Action to set products
  setProducts: (products: Product[]) => set({ products }),

  // Action to set pagination info
  setPagination: (page: number, totalPages: number) =>
    set({ page, totalPages }),

  // Action to fetch products from API based on the page
  fetchProducts: async (page: number, status?: string, search?: string) => {
    set({ loading: true, error: null });
    try {
      const url = new URL("http://localhost:3001/api/products");
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", "6");

      // Add status if provided
      if (status) {
        url.searchParams.append("stockQuantity", status);
      }

      // Add search term if provided
      if (search) {
        url.searchParams.append("search", search);
      }

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

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
      set({ loading: false });
    }
  },

  // Action to delete a product from the API and update the state
  deleteProduct: async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productId
          ),
        }));
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
}));
