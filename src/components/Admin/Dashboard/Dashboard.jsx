import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../../store/slice/authThunks";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loginUser());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      logoutUser();
      dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={handleLogout}>Log Out</button>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <p>Type user: {user.role}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Dashboard;