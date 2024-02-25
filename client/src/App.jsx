import { useState } from "react";
import AddProducts from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  const [productId, setProductId] = useState(1);
  const handleClick = (productId) => {
    setProductId(Number(productId));
  };
  return (
    <div className="flex m-2">
      <AddProducts />
      <ProductList onProductChange={handleClick} />
      <ProductDetails id={productId} />
    </div>
  );
}

export default App;
