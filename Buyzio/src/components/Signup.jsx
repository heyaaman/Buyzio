import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  Link,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name) newErrors.name = 'Name is required';
    if (!emailRegex.test(form.email)) newErrors.email = 'Invalid email format';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSignup = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('user', JSON.stringify(form));
      setSnackbar({ open: true, message: 'Account created successfully!', severity: 'success' });
      navigate('/login');
    }, 1200);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d0e6fb 0%, #bae0ff 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        position: 'relative',
      }}
    >
      <ThemeToggle />
      <Card
        sx={{
          width: 420,
          maxWidth: '100%',
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: 'background.paper',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: '700', color: 'primary.main' }}>
            Create Account
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" mb={3}>
            Sign up to get started
          </Typography>

          {['name', 'email', 'password', 'confirmPassword'].map((field) => (
            <TextField
              key={field}
              fullWidth
              margin="normal"
              label={field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
              type={field.toLowerCase().includes('password') ? 'password' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              error={Boolean(errors[field])}
              helperText={errors[field]}
            />
          ))}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontWeight: '600' }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>

          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/login')}
              sx={{ fontWeight: '600' }}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
