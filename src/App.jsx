import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ThemeToggle from './components/ThemeToggle';
import Profile from './components/Profile';
import Goodbye from './components/Goodbye'; 

const App = () => {
  const location = useLocation(); 

  return (
    <>
      <ThemeToggle />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/goodbye" element={<Goodbye />} /> 
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
