import axios from 'axios';

const API_URL = 'http://localhost:5100/api/products';

export const fetchProducts = async (filter, page) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                limit: filter.limit,
                category: filter.category,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


export const createProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};