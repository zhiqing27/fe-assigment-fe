import { useState } from "react";
import { apiFetch } from "../utils/api";

export function usePlaceOrder() {
  const [placingOrder, setPlacingOrder] = useState<string | null>(null);

  async function placeOrder(productId: string) {
    setPlacingOrder(productId);
    try {
      await apiFetch("/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      alert("Order placed!");
    } catch {
      // error already logged in apiFetch
    } finally {
      setPlacingOrder(null);
    }
  }

  return { placingOrder, placeOrder };
}
