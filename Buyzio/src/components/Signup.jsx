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
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ThemeToggle from './ThemeToggle';

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleContinueWithoutSignup = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        position: 'relative',
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        style={{ width: '100%', maxWidth: 420 }}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 6,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: '700', color: 'primary.main' }}>
              Create Account
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" mb={3}>
              Sign up to get started
            </Typography>

            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

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

            <Button
              fullWidth
              variant="text"
              sx={{ mt: 3, fontWeight: 500, color: 'text.secondary' }}
              onClick={handleContinueWithoutSignup}
            >
              Continue without signing up
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <ThemeToggle />
    </Box>
  );
};

export default Signup;
