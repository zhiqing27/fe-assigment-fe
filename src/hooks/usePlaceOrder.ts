import { useState } from "react";
import { apiFetch } from "../utils/api";
import { getClientId } from "../utils/clientId";

export function usePlaceOrder() {
  const [placingOrder, setPlacingOrder] = useState<string | null>(null);

  async function placeOrder(productId: string) {
    setPlacingOrder(productId);
    try {
      await apiFetch("order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productColorId: productId, clientId: getClientId() }),
      });
      alert("Order placed!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setPlacingOrder(null);
    }
  }

  return { placingOrder, placeOrder };
}
