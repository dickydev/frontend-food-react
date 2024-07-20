import React, { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:5100/api/products';

const TambahProduct = ({ onAddProduct }) => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({
        title: '',
        slug: '',
        lang: 'en',
        auth_id: 18,
        status: 1,
        type: 6,
        count: 0,
        category_id: 22,
        term_id: 30,
        price: '',
        preview: '',
        stock: 10
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e) => {
        setProduct((prev) => ({ ...prev, category_id: e.target.value }));
    };

    const handleStatusChange = (e) => {
        setProduct((prev) => ({ ...prev, status: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(API_URL, product);
            onAddProduct(response.data);
            setProduct({
                title: '',
                slug: '',
                lang: '',
                auth_id: 18,
                status: 1,
                type: 6,
                count: 0,
                category_id: 22,
                term_id: 30,
                price: '',
                preview: '',
                stock: 10
            });
            handleClose();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Tambah Product
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tambah Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Nama Product"
                        type="text"
                        fullWidth
                        value={product.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="slug"
                        label="Slug"
                        type="text"
                        fullWidth
                        value={product.slug}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="lang"
                        label="Bahasa"
                        type="text"
                        fullWidth
                        value={product.lang}
                        onChange={handleChange}
                    />  
                    <TextField
                        margin="dense"
                        name="price"
                        label="Harga"
                        type="number"
                        fullWidth
                        value={product.price}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={product.status}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value={0}>Tidak Aktif</MenuItem>
                            <MenuItem value={1}>Aktif</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        name="stock"
                        label="Stock"
                        type="number"
                        fullWidth
                        value={product.stock}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Kategori</InputLabel>
                        <Select
                            name="category_id"
                            value={product.category_id}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={21}>Makanan</MenuItem>
                            <MenuItem value={22}>Snack</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="preview"
                        label="URL Gambar"
                        type="text"
                        fullWidth
                        value={product.preview}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Batal
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Tambah
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TambahProduct;
