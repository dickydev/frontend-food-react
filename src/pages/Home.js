import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Pagination } from '@mui/material';
import axios from 'axios';
import Filter from '../components/Filter';
import ProductList from '../components/ProductList';
import ExportButtons from '../components/ExportButtons';
import PaginationComponent from '../components/Pagination';
// import TambahProduct from '../components/TambahProduct';
import { fetchProducts, createProduct, deleteProduct, updateProduct } from '../api';

const Home = () => {
    const [filter, setFilter] = useState({ limit: 50, category: '' });
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(10); // Total pages for pagination
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const data = await fetchProducts(filter, page);
                setProducts(data);
                setTotalProducts(data.total);
                // If you have a way to get total count of products, set it here
                // setTotalProducts(totalCount);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };

        fetchProductsData();
    }, [filter, page]);

    console.log(totalProducts)

    const handleFilter = (newFilter) => {
        setFilter(newFilter);
        setPage(1); // Reset page to 1 when filter changes
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleAddProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            const updated = await updateProduct(updatedProduct.id, updatedProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product.id === updated.id ? updated : product))
            );
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        console.log(id);
        try {
            await deleteProduct(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Box width="100%">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Filter onFilter={handleFilter} />
                <ExportButtons data={products} handleAddProduct={handleAddProduct} />
            </Box>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                <ProductList
                        products={products}
                        onProductUpdate={handleUpdateProduct}
                        onProductDelete={handleDeleteProduct}
                    />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={4}>
                <PaginationComponent
                    page={page}
                    count={totalPages} // Use totalPages from API response
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default Home;
