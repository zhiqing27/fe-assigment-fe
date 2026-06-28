import { create } from "zustand";
import { apiFetch } from "../utils/api";
import type { Product } from "../components/ProductGrid";

const LIMIT = 8;

interface ProductState {
  products: Product[];
  total: number;
  loading: boolean;
  fetchProducts: (params: {
    name?: string;
    categoryId?: string;
    brandId?: string;
    color?: string;
    page?: number;
  }) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products:[],
  total: 1, 
  loading: false,

  fetchProducts: async ({ name, categoryId, brandId, color, page = 1 }) => {
    const query = new URLSearchParams();
    if (name) query.set("name", name);
    if (categoryId) query.set("categoryId", categoryId);
    if (brandId) query.set("brandId", brandId);
    if (color) query.set("color", color);
    query.set("limit", String(LIMIT));
    query.set("offset", String((page - 1) * LIMIT));

    set({ loading: true });
    try {
      const res = await apiFetch<{ data: Product[]; total: number }>(`products?${query}`);
      set({ products: res.data, total: res.total });
    } finally {
      set({ loading: false });
    }
  },
}));

export { LIMIT };
