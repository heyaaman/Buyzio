import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Goodbye = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 2,
      }}
    >
      <Typography variant="h4" align="center">
        You've been logged out. See you soon!
      </Typography>
    </Box>
  );
};

export default Goodbye;
