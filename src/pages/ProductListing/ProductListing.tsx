import { useEffect, useState } from "react";
import type { SearchFilters } from "../../components/SearchSideBar";
import ProductGrid from "../../components/ProductGrid";
import SearchSideBar from "../../components/SearchSideBar";
import { usePlaceOrder } from "../../hooks/usePlaceOrder";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { useProductStore } from "../../store/productStore";

export default function ProductListing() {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    name: "", categoryId: "", brandId: "", color: "",
  });

  const {
    nameInput, setNameInput,
    debouncedName,
    categoryId, setCategoryId,
    brandId, setBrandId,
    color, setColor,
    categories, brands, colors,
  } = useSearchFilters();

  const { products, totalPages, loading, error, fetchProducts } = useProductStore();
  const { placingOrder, placeOrder } = usePlaceOrder();

  useEffect(() => {
    fetchProducts({ ...activeFilters, page });
  }, [page, activeFilters]);

  function handleSearch() {
    const f = { name: debouncedName, categoryId, brandId, color };
    setActiveFilters(f);
    setPage(1);
  }

  return (
    <div className="d-flex gap-4 p-4">
      <SearchSideBar
        nameInput={nameInput}
        categoryId={categoryId}
        brandId={brandId}
        color={color}
        categories={categories}
        brands={brands}
        colors={colors}
        onNameChange={setNameInput}
        onCategoryChange={setCategoryId}
        onBrandChange={setBrandId}
        onColorChange={setColor}
        onSearch={handleSearch}
      />

      <div className="flex-grow-1">
        {error && <p className="text-danger">{error}</p>}
        <ProductGrid
          loading={loading}
          products={products}
          page={page}
          totalPages={totalPages}
          placingOrder={placingOrder}
          onPageChange={setPage}
          onPlaceOrder={placeOrder}
        />
      </div>
    </div>
  );
}
