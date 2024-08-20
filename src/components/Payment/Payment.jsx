import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
import { useCart } from "../../hooks/useCart";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51Pj8ScIbsoegOUXclAD67Mt70fEPVz9HmiVOFCxTprozUZKmly3uRYFdihVhJayHP2mZZcuZ6MTPC7y5uyzygYXd00Wwpj4aCi"
);

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { clearCart, cartItem } = useCart();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.user?.email); // Getting email from Redux

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error("Stripe error:", error);
      setLoading(false);
      return;
    }

    const { id } = paymentMethod;

    try {
      const response = await axios.post(
        "https://pf-henry-backend-ts0n.onrender.com/product/checkout",
        {
          id,
          amount: total * 100, // Convertir en centavos el total
          email,
          cartItem,
        }
      );

      if (response.status === 200) {
        alert("Buy successfully");
        elements.getElement(CardElement).clear();
        clearCart();
        navigate("/home"); //Mas adelante a un recibo o algo
      } else {
        alert("Payment failed");
        console.error("Payment failed:", response.data);
      }
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        console.error("Error request:", error.request);
      } else {
        // Algo sucedió al configurar la solicitud
        console.error("Error message:", error.message);
      }
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.header}>Price: ${total.toFixed(2)}</h3>
        <div className={styles.cardElement}>
          <CardElement />
        </div>
        <button disabled={!stripe} className={styles.button}>
          {loading ? (
            <div className={styles.spinner} role="status">
              <span className={styles.visuallyHidden}>Loading...</span>
            </div>
          ) : (
            "Buy"
          )}
        </button>
      </form>
    </div>
  );
};

const Payment = () => {
  const location = useLocation();
  const { total } = location.state || { total: 0 };
  return (
    <Elements stripe={stripePromise}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <CheckoutForm total={total} />
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
