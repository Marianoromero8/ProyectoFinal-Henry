import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/slice/authThunks";


const Dashboard = () => {

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loginUser());
  }, [dispatch]);

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
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