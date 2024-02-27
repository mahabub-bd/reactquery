import { useState } from "react";
import AddEditProducts from "./components/AddEditProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  const [productId, setProductId] = useState(1);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = (productId) => {
    setProductId(Number(productId));
  };

  const handleUpdateProduct = (productData) => {
    setEditProduct(productData);
  };
  return (
    <div className="flex m-2 p-2">
      <AddEditProducts onEditData={editProduct} />
      <ProductList
        onProductChange={handleAddProduct}
        onUpdate={handleUpdateProduct}
      />
      <ProductDetails id={productId} />
    </div>
  );
}

export default App;
