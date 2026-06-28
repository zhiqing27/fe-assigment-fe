import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import type { SearchFilters } from "../components/SearchSideBar";
import { useDebounce } from "./useDebounce";

interface Option {
  id: string;
  name: string;
}

type OptionResponse = Option[] | { data: Option[] };

export function useSearchFilters() {
  const [nameInput, setNameInput] = useState("");
  const debouncedName = useDebounce(nameInput);
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [color, setColor] = useState("");

  const [categories, setCategories] = useState<Option[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [colors, setColors] = useState<Option[]>([]);

  const toArray = (res: OptionResponse): Option[] =>
    Array.isArray(res) ? res : res.data ?? [];

  useEffect(() => {
    apiFetch<OptionResponse>("products/filters/categories").then((r) => setCategories(toArray(r))).catch(() => {});
    apiFetch<OptionResponse>("products/filters/colors").then((r) => setColors(toArray(r))).catch(() => {});
  }, []);

  useEffect(() => {
    const query = categoryId ? `?categoryId=${categoryId}` : "";
    setBrandId("");
    apiFetch<OptionResponse>(`products/filters/brands${query}`).then((r) => setBrands(toArray(r))).catch(() => {});
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
