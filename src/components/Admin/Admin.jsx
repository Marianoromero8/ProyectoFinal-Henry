import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slice/authThunks";
import { useNavigate } from "react-router-dom";
import styles from './Admin.module.css'

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => navigate('/login'))
    }

    return (
        <div className={styles.containerGeneral}>
            <h1><strong>Hello Admin</strong></h1>
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