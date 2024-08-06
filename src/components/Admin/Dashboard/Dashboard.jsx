import React, { useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../../store/slice/authThunks";
import { Form, Link, useNavigate } from "react-router-dom";
import styles from '../Dashboard/Dashboard.module.css'
import arrow from '../../../assets/flecha-17.png'
import { CartContext } from "../../../context/cart";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const { clearCart } = useContext(CartContext)

  useEffect(() => {
    dispatch(loginUser());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      clearCart()
      logoutUser();
      dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <p><strong>Type user: {user.role}</strong></p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <button onClick={handleLogout} className={styles.menuButton}>Log Out</button>
      <Link to="/form" className={styles.links}>
        <button className={styles.menuButton}>
          Add new product
        </button>
      </Link>
      <Link to='/home'>
        <button className={styles.menuButton}>Home</button>
      </Link>
    </div>
  );
}

export default Dashboard;