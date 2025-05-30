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

const Cart = ({ cart, setCart, onRemove, onClose }) => {
  const totalPrice = cart.reduce((total, item) => {
    const priceNumber = Number(item.price.replace('$', ''));
    return total + priceNumber;
  }, 0);

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          Your Cart
        </Typography>
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
                <Button
                  color="error"
                  size="small"
                  onClick={() => onRemove(item.id)}
                >
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
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
