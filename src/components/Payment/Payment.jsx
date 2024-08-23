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
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../store/slice/productSlice";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const stripePromise = loadStripe(
  "pk_test_51Pj8ScIbsoegOUXclAD67Mt70fEPVz9HmiVOFCxTprozUZKmly3uRYFdihVhJayHP2mZZcuZ6MTPC7y5uyzygYXd00Wwpj4aCi"
);

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { clearCart, cart } = useCart();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.user?.email); // Getting email from Redux
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

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

    const handleAlertComplete = () => {
      MySwal.fire({
        text: "Buy successfully",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#134eff",
        background: "#ece8e8",
        color: "black",
        iconColor: "#026e55",
        customClass: {
          popup: "custom-pop  up",
        },
      });
    };
    const handleAlertFailed = () => {
      MySwal.fire({
        text: "Payment failed",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#134eff",
        background: "#ece8e8",
        color: "black",
        iconColor: "#ff6e1f",
        customClass: {
          popup: "custom-pop  up",
        },
      });
    };

    const handleAlertError = () => {
      MySwal.fire({
        text: "An error occurred",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#134eff",
        background: "#ece8e8",
        color: "black",
        iconColor: "#ff6e1f",
        customClass: {
          popup: "custom-pop  up",
        },
      });
    };

    const { id } = paymentMethod;

    const formattedCartItems = cart.map((item) => ({
      productId: item.id, // Asegúrate de que 'id' en cartItem sea 'productId' en el backend
      size: item.selectedSize,
      quantity: item.quantity,
    }));

    const dataToSend = {
      id,
      amount: total * 100, // Convertir en centavos el total
      email,
      cartItems: formattedCartItems,
    };

    console.log("Body:", dataToSend);

    try {
      const response = await axios.post(
        "https://pf-henry-backend-ts0n.onrender.com/product/checkout",
        dataToSend
      );

      if (response.status === 200) {
        for (const item of formattedCartItems) {
          const { productId, size, quantity } = item;

          const product = await axios.get(
            `https://pf-henry-backend-ts0n.onrender.com/product/${productId}`
          );
          const currentStock = product.data.stock;

          await dispatch(
            updateProduct({
              id: productId,
              product: {
                stock: {
                  [size]: currentStock[size] - quantity,
                },
              },
            })
          );
        }

        handleAlertComplete();
        elements.getElement(CardElement).clear();
        clearCart();
        navigate("/home");
      } else {
        handleAlertFailed();
        console.error("Payment failed:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
      handleAlertError();
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
