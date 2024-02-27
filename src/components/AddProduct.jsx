import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { postNewProduct, updateProduct } from "../queryFn";

export default function AddProducts({ onEditData }) {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  useEffect(() => {
    if (onEditData) {
      setState(onEditData);
    }
  }, [onEditData]);

  const mutation = useMutation({
    mutationFn: onEditData ? updateProduct : postNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    mutationKey: onEditData
      ? ["updateProduct", onEditData.id]
      : "postNewProduct",
  });

  const handleSubmitData = (event) => {
    event.preventDefault();
    const newData = { ...state };
    if (!onEditData) {
      newData.id = crypto.randomUUID().toString();
    }
    mutation.mutate(newData);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  if (mutation.error) {
    return <span>{mutation.error.message}</span>;
  }

  return (
    <div className="w-1/5 h-1/2 m-2 p-2">
      <h2 className="text-2xl  text-center">
        {onEditData ? "Edit Product" : "Add Product"}
      </h2>
      {mutation.isSuccess && <p>Product {onEditData ? "Updated" : "Added"}</p>}
      <form
        className="flex flex-col m-2 p-4  bg-gray-100"
        onSubmit={handleSubmitData}
      >
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
          className="p-2 my-2 border-rounded"
          placeholder="Enter Title"
        />

        <textarea
          value={state.description}
          name="description"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        />

        <input
          type="number"
          value={state.price}
          name="price"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="text"
          value={state.thumbnail}
          name="thumbnail"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail URL"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-md py-1 px-4 mt-5 rounded-md w-full"
        >
          {onEditData ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
