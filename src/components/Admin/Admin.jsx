import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slice/authThunks";
import { useNavigate } from "react-router-dom";
import styles from './Admin.module.css'
import { CartContext } from "../../context/cart";

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth)
    const { clearCart } = useContext(CartContext)

    const handleLogout = () => {
        clearCart()
        dispatch(logoutUser())
            .then(() => navigate('/login'))
    }

    return (
        <div className={styles.containerGeneral}>
            <h1><strong>Hello</strong></h1>
            <div className={styles.containerButtons}>
                <button onClick={handleLogout} disabled={loading}>
                    {loading ? 'logging out ...' : 'Logout'}
                </button>
                <button onClick={() => { navigate('/Dashboard') }}>Dashboard</button>
            </div>
        </div>
    )
}

export default Admin;