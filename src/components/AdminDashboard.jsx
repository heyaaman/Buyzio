import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      console.log('📦 Products fetched:', res.data);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    const { name, price, description, image } = formData;
    if (!name || !price || !description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products', {
        name,
        price: Number(price),
        description,
        image: image || '',
      });

      fetchProducts();
      setFormData({ name: '', price: '', description: '', image: '' });
    } catch (err) {
      console.error('❌ Error adding product:', err);
      alert('Error adding product. See console for details.');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('❌ Error deleting product:', err);
      alert('Could not delete product.');
    }
  };

  const handleEditProduct = (product) => {
    console.log('✏️ Editing product:', product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setEditProductId(product._id);
  };

  const handleUpdateProduct = async () => {
    const { name, price, description, image } = formData;

    if (!name || !price || !description) {
      alert('Please fill in all required fields');
      return;
    }

    if (!editProductId || editProductId.length !== 24) {
      alert('Invalid product ID. Update failed.');
      console.error('❌ Invalid Product ID:', editProductId);
      return;
    }

    try {
      console.log('🔄 Updating product with ID:', editProductId);
      await axios.put(`http://localhost:5000/api/products/${editProductId}`, {
        name,
        price: Number(price),
        description,
        image: image || '',
      });
      fetchProducts();
      setFormData({ name: '', price: '', description: '', image: '' });
      setEditProductId(null);
    } catch (err) {
      console.error('❌ Error updating product:', err);
      alert('Could not update product.');
    }
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', price: '', description: '', image: '' });
    setEditProductId(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box component="form" sx={{ mb: 4 }} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Price"
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Description"
              fullWidth
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Image URL"
              fullWidth
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant="contained"
              onClick={editProductId ? handleUpdateProduct : handleAddProduct}
              fullWidth
              sx={{ height: '100%' }}
              color={editProductId ? 'warning' : 'primary'}
            >
              {editProductId ? 'Update' : 'Add'}
            </Button>
          </Grid>
          {editProductId && (
            <Grid item xs={12} sm={1}>
              <Button
                variant="outlined"
                onClick={handleCancelEdit}
                fullWidth
                sx={{ height: '100%' }}
              >
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="subtitle1">₹{product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button color="error" onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </Button>
                <Button color="primary" onClick={() => handleEditProduct(product)}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
