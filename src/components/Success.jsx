import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
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
      <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" color="success.main" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Your order is now being processed.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Box>
  );
};

export default Success;
