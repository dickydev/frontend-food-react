import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export const fetchProducts = (limit, category) => {
  return axios.get(API_URL, {
    params: { limit, category }
  });
};

export const createProduct = (product) => {
  return axios.post(API_URL, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
