// app/store/productStore.ts
import { create } from "zustand";
import { Product } from "../../types/productTypes";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ProductStoreState {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  pageSize: number;
  setProducts: (products: Product[]) => void;
  setPagination: (page: number, totalPages: number) => void;
  fetchProducts: (
    page: number,
    status: string,
    search: string
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

export const ProductStore = create<ProductStoreState>((set) => ({
  products: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  pageSize: 6,

  setProducts: (products: Product[]) => set({ products }),

  setPagination: (page: number, totalPages: number) =>
    set({ page, totalPages }),

  fetchProducts: async (page: number, status?: string, search?: string) => {
    set({ loading: true, error: null });
    try {
      const url = new URL(`${baseUrl}api/products`);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", "6");

      if (status) {
        url.searchParams.append("stockQuantity", status);
      }

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

  deleteProduct: async (productId: string) => {
    try {
      const response = await fetch(`${baseUrl}api/products/${productId}`, {
        method: "DELETE",
      });

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
