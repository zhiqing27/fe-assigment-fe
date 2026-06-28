import { Button, Card, Col, Pagination, Row, Spinner } from "react-bootstrap";
import "./index.scss";



export interface Product {
  productColorId: string;
  productId: string;
  name: string; 
  price: number;
  imageUrl: string;
  stock: number;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  limit: number;
  offset: number;
  totalPages: number;
}

interface Props {
  loading: boolean;
  products: Product[];
  page: number;
  totalPages: number;
  placingOrder: string | null;
  onPageChange: (page: number) => void;
  onPlaceOrder: (productId: string) => void;
}

export default function ProductGrid({
  loading,
  products,
  page,
  totalPages,
  placingOrder,
  onPageChange,
  onPlaceOrder,
}: Props) {
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-muted mt-5">No products found.</p>;
  }

  return (
    <>
      <Row xs={2} md={3} lg={4} className="g-3">
        {products.map((p) => (
          <Col key={p.productColorId}>
            <Card className="h-100 text-center">
              <Card.Img variant="top" src={p.imageUrl} alt={p.name} className="product-img" />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: "0.95rem" }}>{p.name}</Card.Title>
                <Card.Text className="mb-3">RM {p.price.toLocaleString()}</Card.Text>
                <Button
                  variant="link"
                  size="sm"
                  className="w-100 button-brand mt-auto"
                  disabled={placingOrder === p.productColorId || p.stock === 0}
                  onClick={() => onPlaceOrder(p.productColorId)}
                >
                  {placingOrder === p.productColorId
                    ? <><Spinner animation="border" size="sm" /> Placing...</>
                    : p.stock === 0 ? "Out of Stock" : "Place Order"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-end mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <Pagination.Item
            key={pg}
            active={pg === page}
            onClick={() => onPageChange(pg)}
          >
            {pg}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}
