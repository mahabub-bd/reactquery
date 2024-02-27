import { useState } from "react";
import AddProducts from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  const [productId, setProductId] = useState(6);
  const [editProduct, setEditProduct] = useState(null);
  const handleClick = (productId) => {
    setProductId(Number(productId));
  };

  const handleUpdateClick = (productData) => {
    setEditProduct(productData);
  };
  return (
    <div className="flex m-2 p-2">
      <AddProducts onEditData={editProduct} />
      <ProductList onProductChange={handleClick} onUpdate={handleUpdateClick} />
      <ProductDetails id={productId} />
    </div>
  );
}

export default App;
