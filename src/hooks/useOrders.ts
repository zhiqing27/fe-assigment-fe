import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { getClientId } from "../utils/clientId";

export interface Order {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productColor: string;
  status: "pending" | "completed";
  createdAt: string;
}

const PAGE_SIZE = 10;

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const paged = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    apiFetch<{ data: { data: Order[] } }>("order", { headers: { "x-client-id": getClientId() } })
      .then((res) => setOrders(res.data.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function setCompleted(orderId: string) {
    try {
      await apiFetch(`order/${orderId}/complete`, { method: "PATCH" });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "completed" } : o))
      );
    } catch (e: any) {
      alert(e?.message ?? "Failed to complete order");
    }
  }

  return { orders: paged, page, totalPages, setPage, setCompleted, loading };
}
