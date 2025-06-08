import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Divider, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [
      { name: 'Sneakers', price: 4999, quantity: 1 },
      { name: 'T-shirt', price: 1999, quantity: 2 },
    ];
    console.log('Cart from localStorage:', storedCart); // 🐞 Debug line
    setCartItems(storedCart);
  }, []);

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const handlePayNow = () => {
    navigate('/payment', { state: { cartItems, total } });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.background.default,
        p: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 500,
          width: '100%',
          borderRadius: 3,
          p: 4,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Review Your Order
        </Typography>
        <Divider sx={{ my: 2 }} />
        {cartItems.map((item, idx) => {
          const price = Number(item.price) || 0;
          const quantity = Number(item.quantity) || 0;

          return (
            <Box
              key={idx}
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>{item.name} x{quantity}</Typography>
              <Typography>${(price * quantity).toFixed(2)}</Typography>
            </Box>
          );
        })}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePayNow}
          sx={{ fontWeight: 600, py: 1.2 }}
        >
          Pay Now
        </Button>
      </Paper>
    </Box>
  );
};

export default Checkout;
