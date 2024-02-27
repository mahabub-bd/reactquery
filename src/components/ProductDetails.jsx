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

  if (isLoading)
    return (
      <div className="text-2xl text-center w-1/2">
        Fetching Product Details ...
      </div>
    );

  if (error)
    return (
      <div className=" text-2xl text-center  w-1/2">
        An error occured: {error.message}
      </div>
    );
  return (
    <div className="w-1/5 p-2 ">
      <h1 className="text-3xl my-2 text-center">Product Details</h1>
      <div className="border border-gray-300 bg-gray-100  rounded-md flex flex-col items-center p-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-[400px] h-[220px] mb-4 rounded-md"
        />
        <p className="text-xl font-semibold">{product.title}</p>
        <p className="text-gray-700">{product.description}</p>
        <div className="mt-2 flex items-center">
          <p className="text-gray-900 font-semibold mr-2">Price:</p>
          <p className="text-blue-600">${product.price}</p>
        </div>
        <div className="flex items-center my-2">
          <p className="text-gray-900 font-semibold mr-2">Rating:</p>
          <p className="text-yellow-600">{product.rating}/5</p>
        </div>
      </div>
    </div>
  );
}
