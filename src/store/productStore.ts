import { create } from "zustand";
import { apiFetch } from "../utils/api";
import type { Product } from "../components/ProductGrid";

const LIMIT = 8;

interface ProductState {
  products: Product[];
  total: number;
  totalPages: number;
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
  products: [],
  total: 0,
  totalPages: 1,
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
      const res = await apiFetch<{
        success: boolean;
        data: { data: Product[]; total: number; totalPages: number };
      }>(`products?${query}`);
      set({
        products: res.data.data ?? [],
        total: res.data.total ?? 0,
        totalPages: res.data.totalPages ?? 1,
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export { LIMIT };
