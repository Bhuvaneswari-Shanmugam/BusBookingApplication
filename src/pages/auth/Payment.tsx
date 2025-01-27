import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51NDi2uSIeHGLmxdBXJaV2FhWJkT3MOwkff67QkcgQnjZCzZGnY6egJQ0jY7m9cRFMZXsAOT40U8JNVFAi4xyTClo00iZfLzxR9");


const Payment = () => {
  const [loading, setLoading] = useState(false);
  const {state} = useLocation();
  const total = state.total;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8082/stripe-payment/create-checkout-session");
      const { sessionId } = response.data;

      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe.js failed to load.");
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Stripe Payment Integration</h2>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
