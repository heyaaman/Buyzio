import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={item.name} secondary={item.price} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Cart;
