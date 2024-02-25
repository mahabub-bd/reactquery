import axios from "axios";

const retriveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

const retriveProducts = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:3000/${queryKey}`);
  return response.data;
};

export { retriveProduct, retriveProducts };
