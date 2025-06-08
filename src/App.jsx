import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ThemeToggle from './components/ThemeToggle';
import Profile from './components/Profile';
import Goodbye from './components/Goodbye'; 
import Checkout from './components/Checkout';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Processing from './components/Processing';
import Payment from './components/Payment';
import PaymentMethod from './components/PaymentMethod';

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
          <Route path="/checkout" element={<Checkout/>} /> 
          <Route path="/success" element={<Success/>} /> 
          <Route path="/cancel" element={<Cancel/>} /> 
          <Route path="/cart" element={<Cart/>} /> 
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/:method" element={<PaymentMethod />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
