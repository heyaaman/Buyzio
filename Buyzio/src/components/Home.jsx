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
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const mockItems = [
  { id: 1, name: 'Item 1', price: '$10.00' },
  { id: 2, name: 'Item 2', price: '$15.00' },
  { id: 3, name: 'Item 3', price: '$20.00' },
];

const Home = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const filteredItems = mockItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* Left: Cart Icon */}
          <IconButton color="inherit">
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Center: Search Bar */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
                width: '100%',
                maxWidth: 400,
              }}
            />
          </Box>

          {/* Right: (Theme toggle icon removed) */}
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                }}
              >
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography color="text.secondary">{item.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
