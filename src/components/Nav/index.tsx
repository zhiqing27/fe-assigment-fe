import "./index.scss";

type Tab = "products" | "orders";

interface NavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export default function Nav({ active, onChange }: NavProps) {
  return (
    <nav className="nav">
      <button
        className={active === "products" ? "active" : ""}
        onClick={() => onChange("products")}
      >
        Product Listing
      </button>
      <button
        className={active === "orders" ? "active" : ""}
        onClick={() => onChange("orders")}
      >
        Order History
      </button>
    </nav>
  );
}

export type { Tab };
