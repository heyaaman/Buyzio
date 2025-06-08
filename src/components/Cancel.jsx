import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <CancelIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" color="error" gutterBottom>
        Payment Cancelled
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={3}>
        No worries — you can complete your purchase anytime.
      </Typography>
      <Button variant="outlined" color="primary" onClick={() => navigate('/cart')}>
        Back to Cart
      </Button>
    </Box>
  );
};

export default Cancel;
