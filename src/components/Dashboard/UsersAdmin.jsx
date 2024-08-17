import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL_USERS = "https://pf-henry-backend-ts0n.onrender.com/admin/user";

const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Users Admin</h1>
            <ul>
                {users.map(user => (
                    <li key={user.uid}>
                        {user.email} - {user.role} - {user.active ? 'Active' : 'Inactive'}
                        <button onClick={() => handleToggleUserStatus(user.uid)}>
                            {user.active ? 'Locked ' : 'Unlock'}
                        </button>
                        <select
                            value={user.role}
                            onChange={(e) => handleChangeUserRole(user.uid, e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="superAdmin">Super Admin</option>
                        </select>
                    </li>
                ))}
            </ul>
            <Link to="/Dashboard">
                <button>Back</button>
            </Link>
        </div>
    );
};

export default UsersAdmin;
