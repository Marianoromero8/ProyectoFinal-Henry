import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Reviews.module.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Reviews = () => {
  const { idProduct } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = useSelector((state) => state.auth.user?.uid); // Ajustado para usar uid
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://pf-henry-backend-ts0n.onrender.com/review/product/${idProduct}`
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [idProduct]);

  const handleAlertError = () => {
    MySwal.fire({
      text: "User ID is not available. Please log in again.",
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
  const handleAlertComplete = () => {
    MySwal.fire({
      text: "Review successfully!",
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
  const handleAlertinfo = () => {
    MySwal.fire({
      text: "You need to buy the product to review.",
      icon: "info",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      handleAlertError();
      navigate(`/details/${idProduct}`);
      return;
    }

    if (comment.length < 10 || comment.length > 500) {
      setError("The comment must be between 10 and 500 characters.");
      return;
    }

    // Verificar si el usuario ya hizo una reseña
    const userHasReviewed = reviews.some((review) => review.userId === userId);
    if (userHasReviewed) {
      ("Only 1 review per user.");
      return;
    }

    try {
      const response = await axios.post(
        `https://pf-henry-backend-ts0n.onrender.com/review/product/create/${idProduct}`,
        {
          userId,
          comment,
        }
      );
      setSuccess("Review submitted successfully!");
      setError("");
      setComment("");

      // Agregar la nueva reseña al estado de las reseñas
      setReviews([...reviews, response.data]);

      // Mostrar alerta y redirigir a la página de detalles
      handleAlertComplete();
      navigate(`/details/${idProduct}`);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "There was an error submitting your review.";

      if (errorMessage.includes("The user must purchase the product")) {
        handleAlertinfo();
        navigate(`/details/${idProduct}`);
      } else {
        setError(errorMessage);
        setSuccess("");
      }
    }
  };

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.container}>
        <h2>Product Reviews</h2>

        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <textarea
            className={styles.textarea}
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
          />
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <button type="submit" className={styles.backButton}>
            Submit Review
          </button>
        </form>

        <div className={styles.reviewList}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <p>
                  <strong>{review.user.email}</strong> -{" "}
                  <span>{review.createdAt.slice(0, 10)}</span>{" "}
                  {/* Mostrar la fecha de creación */}
                </p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet for this product.</p>
          )}
        </div>

        <Link to={`/details/${idProduct}`}>
          <button className={styles.backButton}>Back to Product</button>
        </Link>
      </div>
    </div>
  );
};

export default Reviews;
