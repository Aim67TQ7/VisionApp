// stripeService.ts
import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
});

interface PaymentResult {
  success: boolean;
  message: string;
}

export const processPayment = async (paymentToken: string, amount: number): Promise<PaymentResult> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert amount to cents
      currency: 'usd',
      payment_method: paymentToken,
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      return { success: true, message: 'Payment successful.' };
    } else {
      return { success: false, message: `Payment failed with status: ${paymentIntent.status}` };
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return { success: false, message: 'Payment processing error.' };
  }
};

// Description:
// This file provides a utility function `processPayment` that interacts with the Stripe API to handle payment processing.
// The function accepts a payment token and an amount, and uses Stripe to create and confirm a payment intent.
// The function returns a success flag and a message indicating the outcome of the transaction.
// The Stripe instance is configured using the secret key from environment variables for security.
// The `dotenv` package is used to load the secret key from a `.env` file, ensuring sensitive information remains secure.
