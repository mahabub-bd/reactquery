import { useState } from "react";
import AddEditProducts from "./components/AddEditProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  const [productId, setProductId] = useState(1);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = (productId) => {
    setProductId(productId);
  };

  const handleUpdateProduct = (productData) => {
    setEditProduct(productData);
  };
  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-5 p-4  text-gray-200 bg-slate-700 ">
        React CRUD Operation With Tanstack Query
      </h1>
      <div className="flex mt-2 p-2">
        <AddEditProducts onEditData={editProduct} />
        <ProductList
          onProductChange={handleAddProduct}
          onUpdate={handleUpdateProduct}
        />
        <ProductDetails id={productId} />
      </div>
      <p className="text-sm text-center font-thin p-1  text-gray-200 bg-slate-700 ">
        React CRUD Operation With Tanstack Query
      </p>
    </>
  );
}

export default App;
