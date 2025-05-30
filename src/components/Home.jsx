import React, { useState } from 'react';
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

import Cart from '../components/Cart'; // Import your Cart component

const mockItems = [
  { id: 1, name: 'Item 1', price: '$10.00' },
  { id: 2, name: 'Item 2', price: '$15.00' },
  { id: 3, name: 'Item 3', price: '$20.00' },
  { id: 4, name: 'Item 4', price: '$200.00' },
  { id: 5, name: 'Item 5', price: '$30.00' },
  { id: 6, name: 'Item 6', price: '$100.00' },
  { id: 7, name: 'Item 7', price: '$129.00' },
  { id: 8, name: 'Item 8', price: '$350.00' },
  { id: 9, name: 'Item 9', price: '$420.00' },
  { id: 10, name: 'Item 10', price: '$205.00' },
  { id: 11, name: 'Item 11', price: '$540.00' },
  { id: 12, name: 'Item 12', price: '$24.00' },
  { id: 13, name: 'Item 13', price: '$325.00' },
  { id: 14, name: 'Item 14', price: '$500.00' },
  { id: 15, name: 'Item 15', price: '$299.00' },
  { id: 16, name: 'Item 16', price: '$250.00' },
  { id: 17, name: 'Item 17', price: '$79.00' },
  { id: 18, name: 'Item 18', price: '$99.00' },
  { id: 19, name: 'Item 19', price: '$25.00' },
  { id: 20, name: 'Item 20', price: '$605.00' },
  { id: 21, name: 'Item 21', price: '$59.00' },
  { id: 22, name: 'Item 22', price: '$400.00' },
  { id: 23, name: 'Item 23', price: '$280.00' },
  { id: 24, name: 'Item 24', price: '$655.00' },
  { id: 25, name: 'Item 25', price: '$99.00' },
  { id: 26, name: 'Item 26', price: '$60.00' },
  { id: 27, name: 'Item 27', price: '$380.00' },
];

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Replace with your Stripe public key

const Home = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const cartItemsFormatted = cart.map((item) => ({
        name: item.name,
        price: Number(item.price.replace('$', '')) * 100,
        quantity: 1,
      }));

      const response = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', {
        cartItems: cartItemsFormatted,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Stripe checkout error:', error);
      alert('Payment failed. Try again later.');
    }
  };

  const filteredItems = mockItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLeftDrawer = (open) => () => {
    setLeftDrawerOpen(open);
  };

  const toggleRightDrawer = (open) => () => {
    setRightDrawerOpen(open);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const confirmLogout = () => {
    setLogoutDialogOpen(true);
  };

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

        {/* Drawer for menu */}
        <Drawer anchor="left" open={leftDrawerOpen} onClose={toggleLeftDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => {navigate('/profile'); setLeftDrawerOpen(false);}}>
                  <ListItemText primary="Profile" />
                  <Avatar
                    sx={{ width: 32, height: 32, ml: 1 }}
                    src={user?.avatar || ''}
                  >
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => {navigate('/login'); setLeftDrawerOpen(false);}}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => {navigate('/signup'); setLeftDrawerOpen(false);}}>
                  <ListItemText primary="Signup" />
                </ListItemButton>
              </ListItem>

              {user && (
                <ListItem disablePadding>
                  <ListItemButton onClick={() => {confirmLogout(); setLeftDrawerOpen(false);}}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>

        {/* Cart Drawer */}
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

        {/* Logout confirmation dialog */}
        <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to log out of your account?
            </DialogContentText>
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

        {/* Product section */}
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
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="text.secondary">{item.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleAddToCart(item)}
                    >
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
