import axios from "axios";

const retriveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
  );
  return response.data;
};

const postNewProduct = (newProduct) => {
  return axios.post("http://localhost:3000/products", newProduct);
};

const deleteProduct = (productId) => {
  return axios.delete(`http://localhost:3000/products/${productId}`);
};

export { deleteProduct, postNewProduct, retrieveProducts, retriveProduct };
