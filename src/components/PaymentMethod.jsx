import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Paper,
} from '@mui/material';

const PaymentMethod = () => {
  const { method } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Simulate delay
    setTimeout(() => {
      localStorage.removeItem('cart');
      navigate('/success');
    }, 1000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
      <Paper sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>Pay with {method.toUpperCase()}</Typography>

        {(method === 'card' || method === 'upi') && (
          <>
            {method === 'card' && (
              <>
                <TextField label="Card Number" fullWidth margin="normal" />
                <TextField label="Expiry" fullWidth margin="normal" />
                <TextField label="CVV" fullWidth margin="normal" />
              </>
            )}
            {method === 'upi' && (
              <TextField label="UPI ID" fullWidth margin="normal" />
            )}
            <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
              Confirm Payment
            </Button>
          </>
        )}

        {method === 'cod' && (
          <>
            <Typography my={3}>You can pay in cash when the order is delivered.</Typography>
            <Button variant="contained" fullWidth onClick={handleSubmit}>Place Order</Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentMethod;
