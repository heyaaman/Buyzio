import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  CircularProgress,
  Avatar,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items (from backend or localStorage if needed)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setCartItems(res.data.items); // Assumes backend sends { items: [...] }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        // Fallback to localStorage if needed
        const fallback = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(fallback);
      }
    };

    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      // Optional: clear cart
      localStorage.removeItem('cart');
      setLoading(false);
      navigate('/success');
    }, 2000); // Simulated delay
  };

  const handleCancel = () => {
    navigate('/cart');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
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
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Review Your Order
        </Typography>

        <Divider sx={{ my: 2 }} />

        {cartItems.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography>
              {item.name} x{item.quantity || 1}
            </Typography>
            <Typography>
              ${(item.price * (item.quantity || 1) / 100).toFixed(2)}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">
            ${(total / 100).toFixed(2)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
            bgcolor: theme.palette.mode === 'dark' ? '#2e2e2e' : '#f1f3f4',
            p: 1.5,
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <CreditCardIcon />
          </Avatar>
          <Typography>Demo Card - **** **** **** 4242</Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleConfirmPayment}
          disabled={loading}
          sx={{ fontWeight: 600, py: 1.2, mb: 1.5 }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
              Processing...
            </>
          ) : (
            'Confirm Payment'
          )}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
        >
          Back to Cart
        </Button>
      </Paper>
    </Box>
  );
};

export default Checkout;
