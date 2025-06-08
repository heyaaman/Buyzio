import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  TextField,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
} from '@mui/material';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import Cart from '../components/Cart';

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

const Home = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Allow duplicate items
  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // ✅ Remove only one instance of item
  const handleRemoveFromCart = (itemId) => {
    const index = cart.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1); // Remove just one instance
      setCart(newCart);
    }
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const cartItemsFormatted = cart.map((item) => {
        let price = item.price;
        if (typeof price === 'string') price = price.replace('₹', '');
        return {
          name: item.name,
          price: Number(price) * 100,
          quantity: 1,
        };
      });

      const response = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', {
        cartItems: cartItemsFormatted,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Stripe checkout error:', error);
      alert('Payment failed. Try again later.');
    }
  };

  const filteredItems = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLeftDrawer = (open) => () => setLeftDrawerOpen(open);
  const toggleRightDrawer = (open) => () => setRightDrawerOpen(open);

  const user = JSON.parse(localStorage.getItem('user'));

  const confirmLogout = () => setLogoutDialogOpen(true);

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    localStorage.removeItem('user');
    navigate('/goodbye');
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[4],
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit" edge="start" onClick={toggleLeftDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Buyzio
              </Typography>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 1,
                  width: '100%',
                  maxWidth: 400,
                  input: { color: theme.palette.text.primary },
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit" onClick={toggleRightDrawer(true)}>
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              {cart.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleCheckout}
                  sx={{ fontWeight: 600 }}
                >
                  Pay Now
                </Button>
              )}
              <ThemeToggle floating={false} />
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={leftDrawerOpen} onClose={toggleLeftDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate('/profile');
                    setLeftDrawerOpen(false);
                  }}
                >
                  <ListItemText primary="Profile" />
                  <Avatar sx={{ width: 32, height: 32, ml: 1 }} src={user?.avatar || ''}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate('/login');
                    setLeftDrawerOpen(false);
                  }}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate('/signup');
                    setLeftDrawerOpen(false);
                  }}
                >
                  <ListItemText primary="Signup" />
                </ListItemButton>
              </ListItem>

              {user && (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      confirmLogout();
                      setLeftDrawerOpen(false);
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>

        <Drawer
          anchor="right"
          open={rightDrawerOpen}
          onClose={toggleRightDrawer(false)}
          PaperProps={{ sx: { width: 350 } }}
        >
          <Cart
            cart={cart}
            setCart={setCart}
            onRemove={handleRemoveFromCart}
            onClose={toggleRightDrawer(false)}
          />
        </Drawer>

        <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to log out of your account?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogout} color="error">
              Logout
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        maxHeight: 180,
                        objectFit: 'contain',
                        mb: 1,
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 48 }}>
                      {item.description}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ₹{Number(item.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" fullWidth onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Home;
