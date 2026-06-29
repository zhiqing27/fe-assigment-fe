import { Button, Pagination, Spinner, Table } from "react-bootstrap";
import { useOrders } from "../../hooks/useOrders";

export default function OrderHistory() {
  const { orders, page, totalPages, setPage, setCompleted, loading, error } =
    useOrders();

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  if (error)
    return <p className="text-danger text-center mt-5">{error}</p>;
  if (orders.length === 0)
    return (
      <div className="d-flex justify-content-center mt-5">No order placed</div>
    );
  return (
    <div className="p-4">
      <Table bordered hover>
        <thead className="table-primary">
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Color</th>
            <th>Order Status</th>
            <th>Order Date Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.orderId}>
              <td>{o.orderId}</td>
              <td>{o.productCode}</td>
              <td>{o.productName}</td>
              <td>{o.productColor}</td>
              <td>{o.status}</td>
              <td>{new Date(new Date(o.createdAt.slice(0, 23).replace(' ', 'T') + 'Z').getTime() + 8 * 60 * 60 * 1000).toLocaleString('en-GB')}</td>
              <td>
                {o.status === "pending" && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setCompleted(o.id)}
                  >
                    Set Completed
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-end">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <Pagination.Item
            key={pg}
            active={pg === page}
            onClick={() => setPage(pg)}
          >
            {pg}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}
