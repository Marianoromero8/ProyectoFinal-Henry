import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Reviews.module.css";

const Reviews = () => {
  const { idProduct } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = useSelector((state) => state.auth.user?.uid); // Ajustado para usar uid

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is not available. Please log in again.");
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
      alert("Only 1 review per user.");
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
      alert("Review successfully!");
      navigate(`/details/${idProduct}`);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "There was an error submitting your review.";

      if (errorMessage.includes("The user must purchase the product")) {
        alert("You need to buy the product to review.");
        navigate(`/details/${idProduct}`);
      } else {
        setError(errorMessage);
        setSuccess("");
      }
    }
  };

  return (
    <div className={styles.reviewsContainer}>
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
        <button type="submit" className={styles.submitButton}>
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

      <Link to={`/details/${idProduct}`} className={styles.backButton}>
        <button className={styles.menuButton}>Back to Product</button>
      </Link>
    </div>
  );
};

export default Reviews;
