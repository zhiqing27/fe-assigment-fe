import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import type { SearchFilters } from "../components/SearchSideBar";
import { useDebounce } from "./useDebounce";

interface Option {
  id: number;
  name: string;
}

export function useSearchFilters() {
  const [nameInput, setNameInput] = useState("");
  const debouncedName = useDebounce(nameInput);
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [color, setColor] = useState("");

  const [categories, setCategories] = useState<Option[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [colors, setColors] = useState<Option[]>([]);

  useEffect(() => {
    apiFetch<Option[]>("products/filters/categories").then(setCategories).catch(() => {});
    apiFetch<Option[]>("products/filters/colors").then(setColors).catch(() => {});
  }, []);

  useEffect(() => {
    const query = categoryId ? `?categoryId=${categoryId}` : "";
    setBrandId("");
    apiFetch<Option[]>(`products/filters/brands${query}`).then(setBrands).catch(() => {});
  }, [categoryId]);

  function getFilters(): SearchFilters {
    return { name: debouncedName, categoryId, brandId, color };
  }

  return {
    nameInput, setNameInput,
    debouncedName,
    categoryId, setCategoryId,
    brandId, setBrandId,
    color, setColor,
    categories,
    brands,
    colors,
    getFilters,
  };
}
