import { useState } from "react";
import Nav, { type Tab } from "./components/Nav";
import { useInitializeApp } from "./hooks/useInitializeApp";
import ProductListing from "./pages/ProductListing/ProductListing";
import "./App.css";

function App() {
  useInitializeApp();
  const [tab, setTab] = useState<Tab>("products");

  return (
    <>
      <Nav active={tab} onChange={setTab} />
      <main>
        {tab === "products" ? (
          <ProductListing />
        ) : (
          <p>Order History page</p>
        )}
      </main>
    </>
  );
}

export default App;
