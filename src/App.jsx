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
    <>
      <h1 className="text-3xl text-center font-bold mt-5">
        React CRUD Operation With Tanstack Query
      </h1>
      <div className="flex m-2 p-2">
        <AddEditProducts onEditData={editProduct} />
        <ProductList
          onProductChange={handleAddProduct}
          onUpdate={handleUpdateProduct}
        />
        <ProductDetails id={productId} />
      </div>
    </>
  );
}

export default App;
