// Checkout.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@mui/material'; // Assuming you're using MUI
import axios from 'axios';

// Replace this with your actual Stripe public key
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

const Checkout = () => {
  const cartItems = [
    { name: 'Sneakers', price: 4999, quantity: 1 },
    { name: 'T-shirt', price: 1999, quantity: 2 },
  ];

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', {
        cartItems,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Payment failed. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Review Your Order</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          {item.name} x{item.quantity} - ${(item.price * item.quantity / 100).toFixed(2)}
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Pay with Stripe
      </Button>
    </div>
  );
};

export default Checkout;
