import React, { useState } from 'react';
import logo from '../assets/Buyzio.png'
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

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save user + token in localStorage
        localStorage.setItem('user', JSON.stringify(data));

        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });

        // Delay navigation for feedback
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Invalid email or password',
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Network error. Please try again.',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleContinueWithoutLogin = () => {
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
          <Box display="flex" justifyContent="center" mb={2}>
          <img
         src={logo}
         alt="Buyzio Logo"
        style={{
        height: '80px',
         borderRadius: '12px', // rounded edges
         backgroundColor: '#2196f3', // optional: adds white background padding
         padding: '4px', // space around logo
           boxShadow: '0 0 8px rgba(0,0,0,0.1)', // subtle shadow
          }}
      />
       </Box>


            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: '700', color: 'primary.main' }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              mb={3}
            >
              Login to your account
            </Typography>

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: '' });
              }}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: '600' }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>

            <Typography variant="body2" align="center">
              Don&apos;t have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/signup')}
                sx={{ fontWeight: '600' }}
              >
                Sign Up
              </Link>
            </Typography>

            <Button
              fullWidth
              variant="text"
              sx={{ mt: 3, fontWeight: 500, color: 'text.secondary' }}
              onClick={handleContinueWithoutLogin}
            >
              Continue without logging in
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <ThemeToggle />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;