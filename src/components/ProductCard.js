import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Dialog, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProduct, updateProduct } from '../api.js';

const ProductCard = ({ product, onProductUpdate, onProductDelete }) => {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editProduct, setEditProduct] = useState(product);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setEditProduct(product);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleDelete = async () => {
        console.log(product.id)
        await deleteProduct(product.id);
        onProductDelete(product.id);
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const updatedProduct = await updateProduct(product.id, editProduct);
        onProductUpdate(updatedProduct);
        setEditMode(false);
        setOpen(false);
    };

    return (
        <>
            <Card onClick={handleClickOpen}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.preview || "placeholder.jpg"}
                    alt={product.title}
                />
                <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {product.price}
                    </Typography>
                    <IconButton aria-label="edit" onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? "Edit Product" : product.title}</DialogTitle>
                <DialogContent>
                    {editMode ? (
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField label="Title" name="title" value={editProduct.title} onChange={handleChange} />
                            <TextField label="Price" name="price" value={editProduct.price} onChange={handleChange} />
                            <TextField label="Stock" name="stock" value={editProduct.stock} onChange={handleChange} />
                            <TextField label="Category ID" name="category_id" value={editProduct.category_id} onChange={handleChange} />
                            <TextField label="Preview" name="preview" value={editProduct.preview} onChange={handleChange} />
                            <Button variant="contained" onClick={handleSave}>Save</Button>
                        </Box>
                    ) : (
                        <>
                            <img src={product.preview || "placeholder.jpg"} alt={product.title} style={{ width: '100%' }} />
                            <Typography variant="body2">
                                <strong>Price:</strong> {product.price}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Stock:</strong> {product.stock}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Category ID:</strong> {product.category_id}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Created At:</strong> {new Date(product.created_at).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Updated At:</strong> {new Date(product.updated_at).toLocaleDateString()}
                            </Typography>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCard;
