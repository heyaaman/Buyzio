import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart, onRemove, onClose }) => {
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => {
    let price = item.price;
    if (typeof price === 'string') price = price.replace('$', '');
    const priceNumber = parseFloat(price);
    return total + (isNaN(priceNumber) ? 0 : priceNumber);
  }, 0);

  const handleMockCheckout = () => {
    // Simulate loading + payment delay
    setTimeout(() => {
      // Optional: clear cart
      setCart([]);
      navigate('/success');
    }, 1500); // 1.5 second fake "processing"
  };

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Your Cart</Typography>
        <IconButton onClick={onClose} aria-label="close cart">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 1 }} />

      {cart.length === 0 ? (
        <Typography sx={{ mt: 2, textAlign: 'center' }}>Your cart is empty.</Typography>
      ) : (
        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {cart.map((item, index) => (
            <ListItem
              key={`${item.id}-${index}`}
              secondaryAction={
                <Button color="error" size="small" onClick={() => onRemove(item.id)}>
                  Remove
                </Button>
              }
            >
              <ListItemText primary={item.name} secondary={item.price} />
            </ListItem>
          ))}
        </List>
      )}

      {cart.length > 0 && (
        <Box sx={{ mt: 'auto' }}>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="subtitle1">Total: ${totalPrice.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" onClick={handleMockCheckout}>
              Pay Now
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
