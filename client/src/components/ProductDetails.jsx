import { useQuery } from "@tanstack/react-query";
import { retriveProduct } from "../queryFn";

export default function ProductDetails({ id }) {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retriveProduct,
  });

  if (isLoading) return <div>Fetching Product ...</div>;
  if (error) return <div>An error occours : {error.message}</div>;
  return (
    <div className="w-1/5 ">
      <h1 className="text-3xl my-2 text-center">Product Details</h1>
      <div className="border bg-gray-100 p-1 text-md rounded flex flex-col">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover  border  m-auto"
        />
        <p>{product.title}</p>
        <p>Description: {product.description}</p>
        <p>Price : USD {product.price}</p>
        <p> Rating : {product.rating}/5</p>
      </div>
    </div>
  );
}
