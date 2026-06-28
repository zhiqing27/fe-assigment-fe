import { useState } from "react";
import Nav, { type Tab } from "./components/Nav";
import ProductListing from "./pages/ProductListing/ProductListing";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import "./App.css";

function App() {
  const [tab, setTab] = useState<Tab>("products");
  const [productKey, setProductKey] = useState(0);

  function handleTabChange(t: Tab) {
    if (t === "products") setProductKey((k) => k + 1);
    setTab(t);
  }

  return (
    <>
      <Nav active={tab} onChange={handleTabChange} />
      <main>
        {tab === "products" ? (
          <ProductListing key={productKey} />
        ) : (
          <OrderHistory />
        )}
      </main>
    </>
  );
}

export default App;
