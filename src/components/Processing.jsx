import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/success');
    }, 2500); // simulate a 2.5 second "payment processing" delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f4f4f4',
        textAlign: 'center',
        px: 2,
      }}
    >
      <CircularProgress sx={{ mb: 3 }} />
      <Typography variant="h5" fontWeight="bold">
        Processing Payment...
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Please wait while we confirm your order.
      </Typography>
    </Box>
  );
};

export default Processing;
