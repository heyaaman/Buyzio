import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cartItems, total } = state || {};

  const chooseMethod = (method) => {
    navigate(`/payment/${method}`, { state: { cartItems, total } });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
      <Paper elevation={4} sx={{ maxWidth: 500, width: '100%', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Select Payment Method</Typography>
        <Button onClick={() => chooseMethod('card')} fullWidth variant="outlined" sx={{ mt: 2 }}>Credit/Debit Card</Button>
        <Button onClick={() => chooseMethod('upi')} fullWidth variant="outlined" sx={{ mt: 2 }}>UPI</Button>
        <Button onClick={() => chooseMethod('cod')} fullWidth variant="outlined" sx={{ mt: 2 }}>Cash on Delivery</Button>
      </Paper>
    </Box>
  );
};

export default Payment;
