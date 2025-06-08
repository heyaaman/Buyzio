import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      setSnackbar({ open: true, message: 'Login successful', severity: 'success' });
      navigate('/admin');
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || 'Login failed', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Admin Login
          </Typography>
          <TextField
            fullWidth label="Email" margin="normal" value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth label="Password" margin="normal" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminLogin;
