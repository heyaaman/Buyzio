import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
    address: '',
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
    address: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (!savedUser) {
      navigate('/login');
    } else {
      setUser(savedUser);
      setForm(savedUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(form));
    setUser(form);
    setEditMode(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
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
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          p: 3,
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <Avatar
              src={form.avatar}
              sx={{ width: 80, height: 80, mx: 'auto' }}
            >
              {!form.avatar && (user.name ? user.name[0].toUpperCase() : 'U')}
            </Avatar>
            {editMode && (
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: theme.palette.background.paper,
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  p: 0.5,
                }}
              >
                <EditIcon fontSize="small" />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </IconButton>
            )}
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            {editMode ? 'Edit Profile' : user.name || 'Profile'}
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ textAlign: 'left' }}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editMode}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editMode}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              disabled={!editMode}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      disabled={!editMode}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Shipping Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              disabled={!editMode}
              multiline
              rows={3}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            {editMode ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </Box>

          <Button
            variant="text"
            sx={{ mt: 3, fontWeight: 500 }}
            onClick={() => navigate('/')}
          >
            ⬅ Back to Home
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
