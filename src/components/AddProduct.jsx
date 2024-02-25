import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postNewProduct } from "../queryFn";

export default function AddProducts() {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: postNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleSubmitData = (event) => {
    event.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
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
    <div className="w-1/5 h-1/2 m-2 p-2 bg-gray-100">
      <h2 className="text-2xl my-2 text-center">Add Product</h2>
      {mutation.isSuccess && <p>Product is Added</p>}
      <form
        className="flex flex-col m-2
      "
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
          Add Product
        </button>
      </form>
    </div>
  );
}
