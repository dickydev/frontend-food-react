import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, onProductUpdate, onProductDelete }) => {
    return (
        <Grid container spacing={3}>
            {products && products.length > 0 ? (
                products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <ProductCard
                            product={product}
                            onProductUpdate={onProductUpdate}
                            onProductDelete={onProductDelete}
                        />
                    </Grid>
                ))
            ) : (
                <Typography variant="h6" align="center">No products available</Typography>
            )}
        </Grid>
    );
};

export default ProductList;
