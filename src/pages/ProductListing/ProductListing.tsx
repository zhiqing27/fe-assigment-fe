import { useEffect, useState } from "react";
import ProductGrid from "../../components/ProductGrid";
import SearchSideBar from "../../components/SearchSideBar";
import { usePlaceOrder } from "../../hooks/usePlaceOrder";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { useProductStore } from "../../store/productStore";

export default function ProductListing() {
  const [page, setPage] = useState(1);

  const {
    nameInput, setNameInput,
    categoryId, setCategoryId,
    brandId, setBrandId,
    color, setColor,
    categories, brands, colors,
    getFilters,
  } = useSearchFilters();

  const { products, totalPages, loading, fetchProducts } = useProductStore();
  const { placingOrder, placeOrder } = usePlaceOrder();

  useEffect(() => {
    fetchProducts({ ...getFilters(), page });
  }, [page]);

  function handleSearch() {
    setPage(1);
    fetchProducts({ ...getFilters(), page: 1 });
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
