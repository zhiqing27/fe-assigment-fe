import { Button, Form } from "react-bootstrap";
import "./index.scss";

export interface SearchFilters {
  name: string;
  categoryId: string;
  brandId: string;
  color: string;
}

interface Option {
  id: number;
  name: string;
}

interface Props {
  nameInput: string;
  categoryId: string;
  brandId: string;
  color: string;
  categories: Option[];
  brands: Option[];
  colors: Option[];
  onNameChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onBrandChange: (v: string) => void;
  onColorChange: (v: string) => void;
  onSearch: () => void;
}

export default function SearchSideBar({
  nameInput, categoryId, brandId, color,
  categories, brands, colors,
  onNameChange, onCategoryChange, onBrandChange, onColorChange,
  onSearch,
}: Props) {
  return (
    <div style={{ width: 220, flexShrink: 0 }}>
      <h5>Search Filter</h5>

      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          placeholder="Enter Product Name"
          value={nameInput}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select value={categoryId} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">Select Category Dropdown</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Brand</Form.Label>
        <Form.Select value={brandId} onChange={(e) => onBrandChange(e.target.value)}>
          <option value="">Select Brand Dropdown</option>
          {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Color</Form.Label>
        <Form.Select value={color} onChange={(e) => onColorChange(e.target.value)}>
          <option value="">Select Color Dropdown</option>
          {colors.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Form.Select>
      </Form.Group>

      <Button className="w-100 button-brand" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
}
