import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteProduct, retrieveProducts } from "../queryFn";

export default function ProductList({ onProductChange, onUpdate }) {
  const queryclient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryclient.invalidateQueries(["products"]);
    },
  });

  const handleDeleteProduct = async (productId) => {
    await mutation.mutateAsync(productId);
  };

  if (isLoading)
    return (
      <div className="text-2xl text-center w-1/2">Fetching Products ...</div>
    );

  if (error)
    return (
      <div className=" text-2xl text-center  w-1/2">
        An error occured: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center w-3/5 ">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-3 border rounded-sm"
            >
              <img
                className="object-cover h-60 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="flex  items-center justify-around w-full">
                <p className="text-lg my-3">{product.title}</p>
                <p className="bg-gray-600 hover:bg-gray-700 text-white font-thin  px-2 rounded">
                  Rating: {product.rating}
                </p>
              </div>
              <div className="flex items-center justify-around w-full my-4">
                <button
                  onClick={() => onProductChange(product.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-thin  px-2 rounded"
                >
                  Show Details
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className=" font-bold py-0.5 px-2 rounded"
                >
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/color/20/cancel--v1.png"
                    alt="cancel--v1"
                  />
                </button>
                <button
                  onClick={() => onUpdate(product)}
                  className=" font-bold py-0.5 px-4 rounded"
                >
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/color/48/edit--v1.png"
                    alt="edit--v1"
                  />
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex gap-20 justify-center items-center my-5 w-1/4">
        {products.prev && (
          <button
            onClick={() => setPage(products.prev)}
            className="px-5 py-1 bg-gray-50 border cursor-pointer rounded-full"
          >
            Prev
          </button>
        )}

        {products.next && (
          <button
            onClick={() => setPage(products.next)}
            className="px-5 py-1 bg-gray-50 hover:bg-slate-100 border  cursor-pointer rounded-full"
          >
            Next
          </button>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <p className=" text-gray-800">Total Products : {products.items}</p>
        <p className=" text-gray-800">Page Number : {page}</p>
      </div>
    </div>
  );
}
