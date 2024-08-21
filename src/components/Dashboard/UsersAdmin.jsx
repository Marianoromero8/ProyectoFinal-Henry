import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./UsersAdmin.module.css";

const API_URL_USERS = "https://pf-henry-backend-ts0n.onrender.com/admin/user";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const superAdmin = useSelector((state) => state.auth.user);

  // Function to fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL_USERS);
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle user status toggle
  const handleToggleUserStatus = async (id) => {
    try {
      await axios.put(`${API_URL_USERS}/delete/${id}`);
      // Refetch the list of users to reflect the change
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to handle user role change
  const handleChangeUserRole = async (id, newRole) => {
    try {
      await axios.put(`${API_URL_USERS}/edit/${id}`, { role: newRole });
      // Refetch the list of users to reflect the change
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredUsers =
    superAdmin.role === "superAdmin"
      ? users
      : users.filter((user) => user.role !== "superAdmin");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={style.containerGeneral}>
      <div className={style.containerDatos}>
        <h1>Users Admin</h1>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.uid} className={style.ulProduct}>
              {user.email} - {user.role} - {user.active ? "Active" : "Inactive"}
              <button onClick={() => handleToggleUserStatus(user.uid)}>
                {user.active ? "Locked " : "Unlock"}
              </button>
              <select
                value={user.role}
                onChange={(e) => handleChangeUserRole(user.uid, e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                {superAdmin.role === "superAdmin" && (
                  <option value="superAdmin">Super Admin</option>
                )}
              </select>
            </li>
          ))}
        </ul>
        <Link to="/Dashboard" className={style.buttonProduct}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default UsersAdmin;
