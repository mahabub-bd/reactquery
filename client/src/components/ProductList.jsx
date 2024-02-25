import { useQuery } from "@tanstack/react-query";
import { retriveProducts } from "../queryFn";

export default function ProductList({ onProductChange }) {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retriveProducts,
  });

  if (isLoading) return <div>Fetching Products ...</div>;
  if (error) return <div>An error occours : {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center w-3/5 ">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products &&
          products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 border rounded-sm"
            >
              <img
                className="object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="flex  items-center justify-around w-full">
                <p className="text-lg my-3">{product.title}</p>
                <button
                  onClick={() => onProductChange(product.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded"
                >
                  Show Details
                </button>
              </div>
            </li>
          ))}
        .5
      </ul>
    </div>
  );
}
