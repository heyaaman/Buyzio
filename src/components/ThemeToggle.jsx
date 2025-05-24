import React, { useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../ThemeContext';

const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <IconButton
      onClick={toggleColorMode}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 999,
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        backgroundColor: theme.palette.background.paper,
        boxShadow: 3,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;
